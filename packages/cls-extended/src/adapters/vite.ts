import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import type { Options } from "../core/options";
import { resolveOptions } from "../core/options";
import { extractExpandedClasses } from "../core/transform";
import unplugin from "../unplugin-factory";

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
 * 1. JS/TS transform — replaces cls() calls with static strings for the final bundle.
 * 2. CSS/JS Watcher — tracks classes in JS/TS files and generates a safelist file for Tailwind v4.
 */
export default function clsExtendedVite(rawOptions?: Options): Plugin[] {
  const options = resolveOptions(rawOptions);

  // Track classes per file to handle updates (HMR) correctly
  // Map<filePath, extractedClasses[]>
  const fileClasses = new Map<string, string[]>();

  let viteConfig: ResolvedConfig;
  let updateTimer: NodeJS.Timeout | null = null;

  // Helper to write the safelist file (debounced)
  const updateSafelist = () => {
    if (updateTimer) clearTimeout(updateTimer);
    updateTimer = setTimeout(() => {
      const allUniqueClasses = new Set<string>();
      for (const classes of fileClasses.values()) {
        for (const cls of classes) {
          allUniqueClasses.add(cls);
        }
      }

      if (viteConfig && allUniqueClasses.size > 0) {
        // Use .html extension to ensure Tailwind's scanner picks it up correctly
        const safelistPath = path.join(
          viteConfig.root,
          "cls-extended-safelist.html",
        );
        const content = `<div class="${[...allUniqueClasses].join(" ")}"></div>`;
        try {
          fs.writeFileSync(safelistPath, content, "utf-8");
        } catch {
          // Non-fatal: safelist write failure
        }
      }
    }, 50); // 50ms debounce
  };

  const includePatterns = (
    Array.isArray(options.include) ? options.include : [options.include]
  ) as (string | RegExp)[];
  const excludePatterns = (
    Array.isArray(options.exclude) ? options.exclude : [options.exclude]
  ) as (string | RegExp)[];

  // The unplugin-based JS transform plugin (handles the actual runtime transformation)
  const jsPlugin = unplugin.vite(rawOptions) as Plugin;

  // Integration plugin: handles file scanning, HMR updates, and CSS injection
  const integrationPlugin: Plugin = {
    name: "cls-extended:integration",
    enforce: "pre",

    configResolved(config: ResolvedConfig) {
      viteConfig = config;
      const root = config.root;

      const sourceFiles = walkDir(root, (filePath) =>
        matchesFilters(filePath, includePatterns, excludePatterns),
      );

      fileClasses.clear();
      for (const filePath of sourceFiles) {
        try {
          const code = fs.readFileSync(filePath, "utf-8");
          if (!code.includes("cls(")) continue;
          const classes = extractExpandedClasses(code, options);
          if (classes.length > 0) {
            fileClasses.set(filePath, classes);
          }
        } catch {
          // Skip
        }
      }

      updateSafelist();
    },

    transform(code: string, id: string) {
      // 1. Handle JS/TS updates (Watch Mode / HMR)
      if (matchesFilters(id, includePatterns, excludePatterns)) {
        // We scan for classes even if unplugin will transform them later usage
        // This ensures the safelist is up to date *before* Tailwind sees the file (or coincidentally)
        if (code.includes("cls(")) {
          const classes = extractExpandedClasses(code, options);
          if (classes.length > 0) {
            const prev = fileClasses.get(id);
            // Only update if changed (simple JSON comparison for quick check)
            if (JSON.stringify(prev) !== JSON.stringify(classes)) {
              fileClasses.set(id, classes);
              updateSafelist();
            }
          } else if (fileClasses.has(id)) {
            // If classes were removed
            fileClasses.delete(id);
            updateSafelist();
          }
        } else if (fileClasses.has(id)) {
          // cls() calls removed entirely
          fileClasses.delete(id);
          updateSafelist();
        }
        // Return null to allow other plugins (like our jsPlugin) to process the code
        return null;
      }

      // 2. Handle CSS Injection
      // Only process CSS files that import tailwindcss
      if (!id.endsWith(".css") && !id.includes(".css?")) return null;
      if (!code.includes("@import") || !code.includes("tailwindcss")) {
        return null;
      }

      // Calculate relative path to the safelist file
      const safelistPath = path.join(
        viteConfig.root,
        "cls-extended-safelist.html",
      );

      // Even if file doesn't exist yet (race condition), we point to it.
      // Tailwind will pick it up when created.

      let relativePath = path.relative(path.dirname(id), safelistPath);
      if (!relativePath.startsWith(".")) {
        relativePath = "./" + relativePath;
      }
      relativePath = relativePath.split(path.sep).join("/");

      const sourceDirective = `@source "${relativePath}";\n`;
      return {
        code: sourceDirective + "\n" + code,
        map: null,
      };
    },
  };

  return [jsPlugin, integrationPlugin];
}
