import MagicString from "magic-string";
import type { OptionsResolved } from "./options";
import { findClsCalls, type ClsCallExpression } from "./parser";

export interface TransformResult {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
}

export function transformClsCalls(
  code: string,
  _id: string,
  options: OptionsResolved,
): TransformResult | null {
  const clsCalls = findClsCalls(code);
  if (clsCalls.length === 0) return null;

  const s = new MagicString(code);

  for (const call of clsCalls) {
    const transformedString = generateClassString(call, options);

    // Replace the entire cls() call with a static string
    s.overwrite(call.start, call.end, `"${transformedString}"`);
  }

  return {
    code: s.toString(),
    map: options.sourcemap ? s.generateMap({ hires: true }) : null,
  };
}

/**
 * Extract all expanded class names from cls() calls in the code.
 * Used to generate a safelist file that Tailwind's scanner can detect.
 */
export function extractExpandedClasses(
  code: string,
  options: OptionsResolved,
): string[] {
  const clsCalls = findClsCalls(code);
  if (clsCalls.length === 0) return [];

  const classes: string[] = [];
  for (const call of clsCalls) {
    const classString = generateClassString(call, options);
    classes.push(...classString.split(/\s+/).filter(Boolean));
  }
  return classes;
}

function generateClassString(
  call: ClsCallExpression,
  options: OptionsResolved,
): string {
  const { baseClasses, responsiveClasses } = call;
  const parts: string[] = [baseClasses];

  // Process responsive classes
  for (const [breakpoint, classes] of Object.entries(responsiveClasses)) {
    // Validate breakpoint
    if (!options.breakpoints[breakpoint] && !options.enableVariants) {
      console.warn(`Unknown breakpoint: ${breakpoint}`);
      continue;
    }

    // Split classes and prefix each one
    const prefixedClasses = classes
      .split(/\s+/)
      .filter(Boolean)
      .map((cls) => `${breakpoint}:${cls}`)
      .join(" ");

    parts.push(prefixedClasses);
  }

  return parts.filter(Boolean).join(" ");
}

