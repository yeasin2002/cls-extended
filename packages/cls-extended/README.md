# cls-extended

[![npm version](https://img.shields.io/npm/v/cls-extended.svg)](https://www.npmjs.com/package/cls-extended)
[![npm downloads](https://img.shields.io/npm/dm/cls-extended.svg)](https://www.npmjs.com/package/cls-extended)

Zero-runtime Tailwind CSS responsive class transformer. Write cleaner responsive syntax that compiles to standard Tailwind classes at build time.

## Features

- ⚡ **Zero Runtime Overhead** - Build-time transformations for Vite/Webpack (0KB runtime). Next.js 16+ with Turbopack uses tiny runtime fallback (~0.5KB)
- 🎨 **Better DX** - Reduces code verbosity by ~40% for responsive designs
- 🔧 **Universal** - Works with Vite, Webpack, Rollup, esbuild, Rspack, Rolldown, and Farm
- 📦 **Tiny Bundle** - ~8KB package
- 🔒 **Type Safe** - Full TypeScript support with intelligent autocomplete

## Installation

```bash
npm install -D cls-extended
# or
pnpm add -D cls-extended
# or
yarn add -D cls-extended
```

## Setup

### Vite + Tailwind CSS v4

```ts
// vite.config.ts
import { defineConfig } from "vite";
import clsExtended from "cls-extended/adapters/vite";

export default defineConfig({
  plugins: [clsExtended()],
});
```

That's it! The plugin automatically:
1. Transforms `cls()` calls to static strings at build time
2. Extracts all class names from your code
3. Injects them into your CSS file using Tailwind v4's `@source inline()` directives

No configuration needed - just install the plugin and it works!

### Next.js (Webpack) - Before Next.js 16

```js
// next.config.mjs
import clsExtended from "cls-extended/adapters/webpack";

export default {
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(clsExtended());
    return config;
  },
};
```

### Next.js (Webpack) - After Next.js 16

```js
// next.config.mjs
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: cls-extended plugin integration for Next.js 16+ with Turbopack is not yet supported.
  // For now, use the runtime cls() function directly.
  // leave the config as it is!
  turbopack: {},
};

export default nextConfig;
```

<details>
  <summary> <h3 style="display: inline;" > Check Other Adapters (rspack, rolldown, farm etc.)  </h3> </summary>

### Webpack

```js
// webpack.config.js
import clsExtended from "cls-extended/adapters/webpack";

export default {
  plugins: [clsExtended()],
};
```

### Rollup

```ts
// rollup.config.js
import clsExtended from "cls-extended/adapters/rollup";

export default {
  plugins: [clsExtended()],
};
```

### esbuild

```ts
import { build } from "esbuild";
import clsExtended from "cls-extended/adapters/esbuild";

build({
  plugins: [clsExtended()],
});
```

### Rspack

```ts
// rspack.config.js
import clsExtended from "cls-extended/adapters/rspack";

export default {
  plugins: [clsExtended()],
};
```

</details>

## Usage

### Basic Usage

```tsx
import { cls } from "cls-extended";

function Component() {
  return (
    <div
      className={cls("text-xl font-bold", {
        md: "text-2xl",
        lg: "text-3xl",
      })}
    >
      Responsive Text
    </div>
  );
}
```

**Compiles to:**

```tsx
<div className="text-xl font-bold md:text-2xl lg:text-3xl">Responsive Text</div>
```

### Multiple Responsive Classes

```tsx
cls("p-4 bg-white", {
  md: "p-6 bg-gray-50",
  lg: "p-8 shadow-lg",
  xl: "max-w-7xl",
});

// Compiles to:
// "p-4 bg-white md:p-6 md:bg-gray-50 lg:p-8 lg:shadow-lg xl:max-w-7xl"
```

### Complex Layouts

```tsx
function Card() {
  return (
    <div
      className={cls("container mx-auto px-4", {
        sm: "px-6",
        md: "px-8 max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl px-12",
      })}
    >
      <h1
        className={cls("text-2xl font-bold text-gray-900", {
          md: "text-3xl",
          lg: "text-4xl",
          xl: "text-5xl",
        })}
      >
        Heading
      </h1>
      <p
        className={cls("text-base text-gray-600", {
          md: "text-lg",
          lg: "text-xl",
        })}
      >
        Description
      </p>
    </div>
  );
}
```

### Conditional Classes

```tsx
function Button({ variant, size }) {
  return (
    <button
      className={cls(
        "rounded font-medium",
        variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200",
        {
          md: size === "large" ? "px-6 py-3 text-lg" : "px-4 py-2",
          lg: "px-8 py-4 text-xl",
        },
      )}
    >
      Click me
    </button>
  );
}
```

### Grid Layouts

```tsx
function Grid() {
  return (
    <div
      className={cls("grid grid-cols-1 gap-4", {
        sm: "grid-cols-2 gap-6",
        md: "grid-cols-3",
        lg: "grid-cols-4 gap-8",
        xl: "grid-cols-6",
      })}
    >
      {/* Grid items */}
    </div>
  );
}
```

## API Reference

### `cls(baseClasses, responsiveClasses?)`

Transform responsive Tailwind classes at build time.

**Parameters:**

- `baseClasses` (string) - Base Tailwind classes applied at all breakpoints
- `responsiveClasses` (object, optional) - Responsive breakpoint classes

**Supported Breakpoints:**

| Breakpoint | Min Width | Description         |
| ---------- | --------- | ------------------- |
| `sm`       | 640px     | Small devices       |
| `md`       | 768px     | Medium devices      |
| `lg`       | 1024px    | Large devices       |
| `xl`       | 1280px    | Extra large devices |
| `2xl`      | 1536px    | 2X extra large      |

**Returns:**

- At build time: Static string with all classes
- At runtime (fallback): Same string generated dynamically

**Examples:**

```ts
// Single breakpoint
cls("p-4", { md: "p-6" });
// → "p-4 md:p-6"

// Multiple breakpoints
cls("text-base", { md: "text-lg", lg: "text-xl" });
// → "text-base md:text-lg lg:text-xl"

// Multiple classes per breakpoint
cls("p-4 bg-white", { md: "p-6 shadow-lg" });
// → "p-4 bg-white md:p-6 md:shadow-lg"

// Only base classes
cls("container mx-auto");
// → "container mx-auto"

// Only responsive classes
cls("", { md: "hidden", lg: "block" });
// → "md:hidden lg:block"
```

## Configuration

### Plugin Options

```ts
clsExtended({
  // Files to include (default: JS/TS/JSX/TSX files)
  include: [/\.[jt]sx?$/],

  // Files to exclude (default: node_modules)
  exclude: [/node_modules/],

  // Custom Tailwind breakpoints (optional)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
});
```

### Custom Breakpoints

If you're using custom Tailwind breakpoints, configure them in the plugin:

```ts
// tailwind.config.js
export default {
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
};
```

```ts
// vite.config.ts
clsExtended({
  breakpoints: {
    tablet: "640px",
    laptop: "1024px",
    desktop: "1280px",
  },
});
```

```tsx
// Usage
cls("p-4", { tablet: "p-6", laptop: "p-8" });
// → "p-4 tablet:p-6 laptop:p-8"
```

## How It Works

The plugin performs AST-based transformations during the build process:

1. **Parse**: Scans source files for `cls()` function calls
2. **Transform**: Uses Babel parser to analyze the AST
3. **Generate**: Converts object syntax to standard Tailwind classes
4. **Replace**: Replaces `cls()` calls with static strings
5. **Source Maps**: Maintains accurate debugging information

### Build-Time Transformation

**Input (what you write):**

```tsx
cls("text-xl font-bold", { md: "text-2xl", lg: "text-3xl" });
```

**Output (what gets compiled):**

```tsx
"text-xl font-bold md:text-2xl lg:text-3xl";
```

### Zero Runtime Cost

- ✅ No `cls()` function in production bundle
- ✅ No runtime parsing or string manipulation
- ✅ No additional JavaScript overhead
- ✅ Just plain, static class strings

### Compatibility

- ✅ Works with Tailwind JIT mode
- ✅ Compatible with Tailwind's purge/content configuration
- ✅ Supports all Tailwind utility classes
- ✅ Maintains source maps for debugging

## TypeScript Support

Full TypeScript support with intelligent autocomplete:

```ts
import { cls } from "cls-extended";

// Type-safe breakpoints
const classes = cls("p-4", {
  md: "p-6", // ✅ Valid breakpoint
  lg: "p-8", // ✅ Valid breakpoint
  // @ts-expect-error - Invalid breakpoint
  invalid: "p-10",
});
```

## Performance

### Package Size

[![npm bundle size](https://img.shields.io/bundlephobia/min/cls-extended?style=flat-square&label=Package%20Size)](https://bundlephobia.com/package/cls-extended)
[![npm bundle size (gzip)](https://img.shields.io/bundlephobia/minzip/cls-extended?style=flat-square&label=Gzipped)](https://bundlephobia.com/package/cls-extended)
[![npm package minimized gzipped size](https://badgen.net/bundlephobia/minzip/cls-extended)](https://bundlephobia.com/package/cls-extended)

> **Runtime Impact:** 0 KB for Vite/Webpack (build-time transformation) · ~0.5 KB for Next.js 16+ Turbopack (runtime fallback)

### Build Performance

- **File transformation**: <1ms per file
- **AST parsing**: ~0.3ms per file
- **Source map generation**: ~0.1ms per file
- **Memory usage**: <10MB for typical projects

## Examples

Check out the working examples:

- [Vite + React](../../examples/vite-react) - Basic Vite setup
- [Next.js](../../examples/nextjs) - Next.js integration

## Contributing

Contributions are welcome! See the [Root README](../../README.md) for development setup and contribution guidelines.

## License

[MIT](./LICENSE) License © 2025-PRESENT [Yeasin](https://github.com/yeasin2002)

---

**Links:**

- [npm Package](https://www.npmjs.com/package/cls-extended)
- [GitHub Repository](https://github.com/yeasin2002/cls-extended)
- [Report Issues](https://github.com/yeasin2002/cls-extended/issues)
