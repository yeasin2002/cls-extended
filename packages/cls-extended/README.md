# @cls-extended/core

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Zero-runtime Tailwind CSS responsive class transformer. Write cleaner responsive syntax that compiles to standard Tailwind classes at build time.

## Features

- ⚡ **Zero Runtime Overhead** - All transformations happen at build time
- 🎨 **Better DX** - Cleaner, more maintainable responsive class syntax
- 🔧 **Universal** - Works with Vite, Webpack, Rollup, esbuild, Rspack, Rolldown, and Farm
- 📦 **Tiny Bundle** - ~8KB total, 0KB runtime impact
- 🔒 **Type Safe** - Full TypeScript support

## Installation

```bash
npm i -D @cls-extended/core
```

## Usage

### Setup Plugin

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import clsExtended from '@cls-extended/core/adapters/vite'

export default defineConfig({
  plugins: [clsExtended()],
})
```

</details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import clsExtended from '@cls-extended/core/adapters/webpack'

export default {
  plugins: [clsExtended()],
}
```

</details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import clsExtended from '@cls-extended/core/adapters/rollup'

export default {
  plugins: [clsExtended()],
}
```

</details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import clsExtended from '@cls-extended/core/adapters/esbuild'

build({
  plugins: [clsExtended()],
})
```

</details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import clsExtended from '@cls-extended/core/adapters/rspack'

export default {
  plugins: [clsExtended()],
}
```

</details>

### In Your Components

```tsx
import { cls } from '@cls-extended/core/api'

function Component() {
  return (
    <div className={cls('text-xl font-bold', { 
      md: 'text-2xl', 
      lg: 'text-3xl' 
    })}>
      Responsive Text
    </div>
  )
}
```

**Compiles to:**

```tsx
<div className="text-xl font-bold md:text-2xl lg:text-3xl">
  Responsive Text
</div>
```

## API

### `cls(baseClasses, responsiveClasses?)`

Transform responsive Tailwind classes at build time.

**Parameters:**
- `baseClasses` (string) - Base Tailwind classes
- `responsiveClasses` (object, optional) - Responsive breakpoint classes

**Supported Breakpoints:**
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

**Example:**

```ts
cls('p-4 bg-white', { 
  md: 'p-6', 
  lg: 'p-8 shadow-lg' 
})
// → "p-4 bg-white md:p-6 lg:p-8 lg:shadow-lg"
```

## How It Works

1. **Build Time**: Plugin scans your code for `cls()` calls
2. **AST Transform**: Parses and transforms the syntax using Babel
3. **Output**: Generates standard Tailwind classes with zero runtime code

## License

[MIT](./LICENSE) License © 2025 [Yeasin](https://github.com/yeasin2002)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@cls-extended/core.svg
[npm-version-href]: https://npmjs.com/package/@cls-extended/core
[npm-downloads-src]: https://img.shields.io/npm/dm/@cls-extended/core
[npm-downloads-href]: https://www.npmcharts.com/compare/@cls-extended/core?interval=30
