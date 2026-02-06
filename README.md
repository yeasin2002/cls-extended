# tw-compose

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Zero-runtime Tailwind CSS responsive utilities with better developer experience.

## Features

- ✅ **Zero Runtime Overhead** - Compiles to static strings at build time
- ✅ **Better DX** - Cleaner responsive class syntax
- ✅ **Type Safe** - Full TypeScript support
- ✅ **Universal** - Works with Vite, Webpack, Rollup, esbuild, Rspack, Rolldown, and Farm

## How It Works

Write this:

```tsx
tw("text-xl font-bold", { md: "text-2xl", lg: "text-3xl" });
```

Get this at build time:

```tsx
"text-xl font-bold md:text-2xl lg:text-3xl";
```

No runtime overhead, just static strings.

## Installation

```bash
npm i -D tw-compose
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import TwClassname from "tw-compose/vite";

export default defineConfig({
  plugins: [TwClassname()],
});
```

<br></details>

<details>
<summary>Next.js</summary><br>

```js
// next.config.mjs
import TwClassname from "tw-compose/webpack";

export default {
  webpack: (config) => {
    config.plugins.push(TwClassname());
    return config;
  },
};
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import TwClassname from "tw-compose/rollup";

export default {
  plugins: [TwClassname()],
};
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.ts
import TwClassname from "tw-compose/rolldown";

export default {
  plugins: [TwClassname()],
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from "esbuild";
import TwClassname from "tw-compose/esbuild";

build({
  plugins: [TwClassname()],
});
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import TwClassname from "tw-compose/webpack";

export default {
  plugins: [TwClassname()],
};
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import TwClassname from "tw-compose/rspack";

export default {
  plugins: [TwClassname()],
};
```

<br></details>

<details>
<summary>Farm</summary><br>

```ts
// farm.config.ts
import TwClassname from "tw-compose/farm";

export default {
  plugins: [TwClassname()],
};
```

<br></details>

## Usage

```tsx
import { tw } from "tw-compose";

function Component() {
  return (
    <div
      className={tw("container mx-auto px-4", {
        md: "px-6 max-w-4xl",
        lg: "px-8 max-w-6xl",
        xl: "max-w-7xl",
      })}
    >
      Content
    </div>
  );
}
```

The `tw()` function is compiled away at build time, leaving only the static class string.

## Configuration

```ts
TwClassname({
  // Files to include (default: JS/TS/JSX/TSX files)
  include: [/\.[jt]sx?$/],

  // Files to exclude (default: node_modules)
  exclude: [/node_modules/],

  // Custom Tailwind breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
});
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the plugin
pnpm build

# Development mode with watch
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix
```

## How It Works

The plugin uses AST transformation to detect `tw()` calls during the build process and compiles them into static Tailwind class strings. This means:

1. No runtime JavaScript is added to your bundle
2. The transformation happens once during build
3. Your production code contains only plain strings
4. Full compatibility with Tailwind's JIT mode and purging

See [PROJECT-DETAILS.md](./PROJECT-DETAILS.md) for complete implementation details.

## License

[MIT](./LICENSE) License © 2025-PRESENT [Kevin Deng](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/tw-compose.svg
[npm-version-href]: https://npmjs.com/package/tw-compose
[npm-downloads-src]: https://img.shields.io/npm/dm/tw-compose
[npm-downloads-href]: https://www.npmcharts.com/compare/tw-compose?interval=30
[unit-test-src]: https://github.com/sxzz/tw-compose/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/sxzz/tw-compose/actions/workflows/unit-test.yml
