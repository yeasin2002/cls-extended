# cls-extended

[![npm version](https://img.shields.io/npm/v/cls-extended.svg)](https://www.npmjs.com/package/cls-extended)
[![npm downloads](https://img.shields.io/npm/dm/cls-extended.svg)](https://www.npmjs.com/package/cls-extended)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Zero-runtime Tailwind CSS responsive utilities with better developer experience.

Transform responsive Tailwind classes at build time with cleaner syntax and zero runtime overhead.

## ✨ Features

- ⚡ **Zero Runtime Overhead** - Build-time transformations (0KB runtime for most tools, tiny runtime for Next.js 16+)
- 🎨 **Better DX** - Cleaner, more maintainable responsive syntax
- 🔒 **Type Safe** - Full TypeScript support with autocomplete
- 🔧 **Universal** - Works with Vite, Webpack, and more
- 📦 **Tiny** - ~8KB package

## 🚀 Quick Start

### Installation

```bash
npm install -D cls-extended
# or
pnpm add -D cls-extended
# or
yarn add -D cls-extended
```

### Setup

**Vite:**

```ts
// vite.config.ts
import clsExtended from "cls-extended/adapters/vite";

export default defineConfig({
  plugins: [clsExtended()],
});
```

**Webpack:**

```js
// webpack.config.js
import clsExtended from "cls-extended/adapters/webpack";

export default {
  plugins: [clsExtended()],
};
```

### Usage

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
<div className="text-xl font-bold md:text-2xl lg:text-3xl">
  Responsive Text
</div>
```

## 📖 How It Works

The plugin uses AST transformation to detect `tw()` calls during the build process and compiles them into static Tailwind class strings:

1. **Build Time**: Plugin scans your code for `tw()` calls
2. **AST Transform**: Parses and transforms using Babel
3. **Output**: Generates standard Tailwind classes with zero runtime code

This means:
- ✅ No runtime JavaScript added to your bundle
- ✅ Transformation happens once during build
- ✅ Production code contains only plain strings
- ✅ Full compatibility with Tailwind's JIT mode

## 📚 Documentation

For detailed configuration, advanced usage, and more examples, see the [package documentation](./packages/cls-extended/README.md).

## 🛠️ Development

This is a monorepo managed with [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/).

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

### Project Structure

```
cls-extended/
├── packages/
│   └── cls-extended/       # Main plugin package
├── examples/
│   ├── nextjs/            # Next.js example
│   └── vite-react/        # Vite + React example
└── .github/
    └── workflows/         # CI/CD automation
```

### Development Workflow

```bash
# Build the plugin
pnpm --filter cls-extended build

# Run example in dev mode
pnpm --filter vite-react dev

# Run tests in watch mode
pnpm --filter cls-extended test
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `BREAKING CHANGE:` - Breaking changes (major version bump)

### Release Process

Releases are automated via GitHub Actions. Simply push a version tag:

```bash
# Create and push a tag
git tag v1.0.1
git push origin v1.0.1
```

The workflow will automatically:
- ✨ Publish to npm with provenance
- 📦 Create GitHub release with changelog
- 📝 Update CHANGELOG.md

See [RELEASE-IT-GUIDE.md](./RELEASE-IT-GUIDE.md) for more details.

## 📄 License

[MIT](./LICENSE) License © 2025-PRESENT [Yeasin](https://github.com/yeasin2002)

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/cls-extended)
- [GitHub Repository](https://github.com/yeasin2002/cls-extended)
- [Issues](https://github.com/yeasin2002/cls-extended/issues)
