# cls-extended Next.js Example

This example demonstrates using cls-extended with Next.js 16 and Tailwind CSS v4.

## Features

- Next.js 16 with App Router
- Tailwind CSS v4
- TypeScript
- cls-extended for responsive class management

## Current Status

This example uses the **runtime version** of cls-extended (`cls()` function) because Next.js 16 uses Turbopack by default, and unplugin doesn't yet support Turbopack transformations.

The `cls()` function provides a runtime fallback that:
- Works without build-time transformation
- Provides the same developer experience
- Has minimal runtime overhead (~0.5KB)

## Build-Time Transformation

For build-time transformation with zero runtime overhead, you can:

1. **Use Next.js 15 or earlier** with Webpack
2. **Wait for Turbopack support** in unplugin (coming soon)
3. **Use the Vite example** for full build-time transformation

## Getting Started

```bash
# Install dependencies (from monorepo root)
pnpm install

# Build the core package
pnpm --filter @cls-extended/core build

# Run development server
pnpm --filter nextjs dev

# Build for production
pnpm --filter nextjs build
```

## Usage

```tsx
import { cls } from "@cls-extended/core/api";

export default function Component() {
  return (
    <div className={cls("p-4 text-base", {
      md: "p-6 text-lg",
      lg: "p-8 text-xl"
    })}>
      Responsive content
    </div>
  );
}
```

## Configuration

The Next.js config is minimal since Turbopack doesn't support custom plugins yet:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
};

export default nextConfig;
```

## Learn More

- [cls-extended Documentation](../../packages/core/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
