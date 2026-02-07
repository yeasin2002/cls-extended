import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: cls-extended plugin integration for Next.js 16+ with Turbopack
  // is not yet supported. For now, use the runtime tw() function.
  // The plugin works with Next.js + Webpack (Next.js 15 and earlier).
  turbopack: {},
};

export default nextConfig;
