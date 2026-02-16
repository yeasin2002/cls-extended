export type ResponsiveBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
export type ResponsiveClasses = Partial<Record<ResponsiveBreakpoint, string>>;

/**
 * Transform responsive Tailwind classes at build time
 * Runtime fallback for development without the plugin
 *
 * @example
 * cls('text-xl font-bold', { md: 'text-2xl', lg: 'text-3xl' })
 * // Compiles to: "text-xl font-bold md:text-2xl lg:text-3xl"
 */
export function cls(
  baseClasses: string,
  responsiveClasses?: ResponsiveClasses,
): string {
  if (!responsiveClasses) return baseClasses;

  const parts = [baseClasses];
  for (const [breakpoint, classes] of Object.entries(responsiveClasses)) {
    const prefixed = classes
      .split(/\s+/)
      .filter(Boolean)
      .map((cls) => `${breakpoint}:${cls}`)
      .join(" ");
    parts.push(prefixed);
  }
  return parts.join(" ");
}
