# cls-extended Next.js Example

Example of using cls-extended with Next.js 16 and Tailwind CSS v4.

## Configuration

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
};

export default nextConfig;
```

## Usage

```tsx
import { cls } from "cls-extended";

export default function Component() {
  return (
    <div className={cls("p-4", { md: "p-6", lg: "p-8" })}>
      Content
    </div>
  );
}
```

> **Note:** Next.js 16 with Turbopack uses runtime `cls()` function (~0.5KB). For build-time transformation with 0KB runtime, use Next.js 15 with Webpack or try the Vite example.
