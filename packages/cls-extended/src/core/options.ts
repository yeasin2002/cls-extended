import type { FilterPattern } from "unplugin";

export interface Options {
  /**
   * Files to include in processing
   * @default [/\.[jt]sx?$/]
   */
  include?: FilterPattern;

  /**
   * Files to exclude from processing
   * @default [/node_modules/]
   */
  exclude?: FilterPattern;

  /**
   * Enable source map generation
   * @default true
   */
  sourcemap?: boolean;

  /**
   * Custom Tailwind breakpoints
   * @default { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }
   */
  breakpoints?: Record<string, string>;

  /**
   * Enable additional variant support (hover, focus, dark, etc.)
   * @default false
   */
  enableVariants?: boolean;

  /**
   * Path to the safelist file that will be generated for Tailwind CSS to discover.
   * This file contains all expanded class names (e.g. md:text-2xl) so Tailwind
   * can generate the corresponding CSS.
   * @default '.cls-extended-safelist'
   */
  safelistPath?: string;
}

export type OptionsResolved = Required<Options>;

export function resolveOptions(options: Options = {}): OptionsResolved {
  return {
    include: options.include ?? [/\.[jt]sx?$/],
    exclude: options.exclude ?? [/node_modules/],
    sourcemap: options.sourcemap ?? true,
    breakpoints: options.breakpoints ?? {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    enableVariants: options.enableVariants ?? false,
    safelistPath: options.safelistPath ?? "cls-extended-safelist.html",
  };
}
