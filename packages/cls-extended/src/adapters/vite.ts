import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import type { Options } from "../core/options";
import { resolveOptions } from "../core/options";
import { extractExpandedClasses } from "../core/transform";
import unplugin from "../unplugin-factory";

/* eslint-disable no-console */

/**
 * Recursively walk a directory and return all file paths matching a filter.
 */
function walkDir(dir: string, filter: (filePath: string) => boolean): string[] {
  const results: string[] = [];
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      results.push(...walkDir(fullPath, filter));
    } else if (entry.isFile() && filter(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Check if a file path matches the include/exclude filters.
 */
function matchesFilters(
  filePath: string,
  include: (string | RegExp)[],
  exclude: (string | RegExp)[],
): boolean {
  const matchesPattern = (p: string, pattern: string | RegExp) =>
    typeof pattern === "string" ? p.includes(pattern) : pattern.test(p);
  const included = include.some((pattern) => matchesPattern(filePath, pattern));
  const excluded = exclude.some((pattern) => matchesPattern(filePath, pattern));
  return included && !excluded;
}

/**
 * Vite plugin for cls-extended.
 * Returns an array of Vite plugins:
 * 1. JS/TS transform — replaces cls() calls with static strings
 * 2. CSS transform — injects @source directive so Tailwind v4 generates
 *    CSS for all expanded class names.
 */
export default function clsExtendedVite(rawOptions?: Options): Plugin[] {
  const options = resolveOptions(rawOptions);
  const allClasses = new Set<string>();
  let viteConfig: ResolvedConfig;

  // The unplugin-based JS transform plugin
  const jsPlugin = unplugin.vite(rawOptions) as Plugin;

  // CSS plugin that injects @source for Tailwind v4
  const cssPlugin: Plugin = {
    name: "cls-extended:css",
    enforce: "pre",

    configResolved(config: ResolvedConfig) {
      viteConfig = config;
      // Pre-scan all source files from the project root
      const root = config.root;
      console.log(
        `[cls-extended] configResolved - Scanning from root: ${root}`,
      );

      const includePatterns = (
        Array.isArray(options.include) ? options.include : [options.include]
      ) as (string | RegExp)[];
      const excludePatterns = (
        Array.isArray(options.exclude) ? options.exclude : [options.exclude]
      ) as (string | RegExp)[];

      const sourceFiles = walkDir(root, (filePath) =>
        matchesFilters(filePath, includePatterns, excludePatterns),
      );
      console.log(`[cls-extended] Found ${sourceFiles.length} source files`);

      allClasses.clear();
      for (const filePath of sourceFiles) {
        try {
          const code = fs.readFileSync(filePath, "utf-8");
          if (!code.includes("cls(")) continue;
          const classes = extractExpandedClasses(code, options);
          if (classes.length > 0) {
            console.log(
              `[cls-extended] Found ${classes.length} classes in ${path.relative(root, filePath)}: ${classes.join(", ")}`,
            );
          }
          for (const cls of classes) {
            allClasses.add(cls);
          }
        } catch {
          // Skip files that can't be read
        }
      }
      console.log(
        `[cls-extended] Total unique expanded classes: ${allClasses.size}`,
      );

      // Write the safelist file immediately so it's available for @source
      if (allClasses.size > 0) {
        // Use .html extension to ensure Tailwind's scanner picks it up correctly
        const safelistPath = path.join(root, "cls-extended-safelist.html");
        // Format based on file extension (html is safest for Tailwind scanner)
        // We wrap in a div to ensure Tailwind definitely sees them as classes
        const content = `<div class="${[...allClasses].join(" ")}"></div>`;
        fs.writeFileSync(safelistPath, content, "utf-8");
        console.log(`[cls-extended] Wrote safelist to: ${safelistPath}`);
      }
    },

    transform(code: string, id: string) {
      // Only process CSS files that import tailwindcss
      if (!id.endsWith(".css") && !id.includes(".css?")) return null;
      if (!code.includes("@import") || !code.includes("tailwindcss")) {
        return null;
      }

      console.log(`[cls-extended] Transforming CSS file: ${path.basename(id)}`);

      if (allClasses.size === 0) {
        console.log(
          `[cls-extended] No classes to inject (allClasses is empty)`,
        );
        return null;
      }

      // Calculate relative path to the safelist file
      const safelistPath = path.join(
        viteConfig.root,
        "cls-extended-safelist.html",
      );
      if (!fs.existsSync(safelistPath)) {
        console.log(
          `[cls-extended] Safelist file not found at ${safelistPath}`,
        );
        return null;
      }

      // Create a relative path from the CSS file to the safelist file
      // Tailwind's @source directive resolves paths relative to the CSS file
      let relativePath = path.relative(path.dirname(id), safelistPath);
      // Ensure it starts with ./ or ../
      if (!relativePath.startsWith(".")) {
        relativePath = "./" + relativePath;
      }
      // Normalize path separators to forward slashes for CSS string
      relativePath = relativePath.split(path.sep).join("/");

      const sourceDirective = `@source "${relativePath}";\n`;
      console.log(`[cls-extended] Injecting: ${sourceDirective.trim()}`);

      // Prepend the source directive so it is seen before @import tailwindcss
      return {
        code: sourceDirective + "\n" + code,
        map: null,
      };
    },
  };

  return [jsPlugin, cssPlugin];
}
