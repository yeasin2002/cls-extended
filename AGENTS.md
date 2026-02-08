---
inclusion: always
---

# Product Overview

cls-extended is a zero-runtime Tailwind CSS responsive utilities transformer that improves developer experience through cleaner syntax.

## Core Value Proposition

- Build-time transformation of responsive Tailwind classes (0KB runtime for Vite/Webpack)
- Cleaner, more maintainable responsive syntax that reduces code verbosity by ~40%
- Universal compatibility with major bundlers (Vite, Webpack, Rollup, esbuild, Rspack, Rolldown, Farm)

## Key Features

- Zero runtime overhead through AST-based build-time transformations
- Type-safe with full TypeScript support and autocomplete
- Tiny package size (~8KB)
- Works with Tailwind JIT mode and all utility classes

## How It Works

The `cls()` function accepts base classes and a responsive object:

```tsx
cls("text-xl font-bold", {
  md: "text-2xl",
  lg: "text-3xl",
});
```

This compiles at build time to:

```tsx
"text-xl font-bold md:text-2xl lg:text-3xl";
```

The plugin uses Babel parser to detect `cls()` calls, transforms them via AST manipulation, and replaces them with static strings before the code reaches production.





# Project Structure

## Monorepo Layout

```
cls-extended/
├── .kiro/                    # Kiro AI assistant configuration
│   └── steering/            # AI steering rules
├── packages/                # Shared packages
│   ├── cls-extended/        # Main plugin package
│   ├── eslint-config/       # Shared ESLint configs
│   └── typescript-config/   # Shared TypeScript configs
├── examples/                # Example implementations
│   ├── nextjs/             # Next.js example
│   └── vite-react/         # Vite + React example
└── apps/                    # Applications (currently empty)
```

## Main Package Structure

```
packages/cls-extended/
├── src/
│   ├── adapters/           # Bundler-specific adapters
│   │   ├── vite.ts
│   │   └── webpack.ts
│   ├── core/               # Core transformation logic
│   │   ├── options.ts      # Plugin options
│   │   ├── parser.ts       # AST parsing
│   │   └── transform.ts    # Code transformation
│   ├── api.ts              # Public API (cls function)
│   ├── unplugin-factory.ts # Universal plugin factory
│   └── index.ts            # Main entry point
├── dist/                   # Build output (gitignored)
├── tests/                  # Test files
└── package.json
```

## Configuration Files

### Root Level

- `turbo.json` - Turborepo task configuration
- `pnpm-workspace.yaml` - Workspace and catalog definitions
- `package.json` - Root scripts and shared devDependencies
- `.gitignore` - Git ignore patterns
- `.editorconfig` - Editor configuration
- `.npmrc` - npm/pnpm configuration

### Package Level

- `package.json` - Package metadata, scripts, dependencies
- `tsconfig.json` - TypeScript configuration (extends shared config)
- `eslint.config.ts` - ESLint configuration (extends shared config)
- `tsdown.config.ts` - Build configuration

## Shared Configurations

### ESLint Config Package

```
packages/eslint-config/
├── base.js              # Base config for all packages
├── next.js              # Next.js specific config
└── react-internal.js    # React library config
```

### TypeScript Config Package

```
packages/typescript-config/
├── base.json            # Base TypeScript config
├── nextjs.json          # Next.js specific config
└── react-library.json   # React library config
```

## Build Outputs

- `dist/` - Compiled JavaScript and type definitions (main package)
- `.next/` - Next.js build output (examples)
- `.turbo/` - Turborepo cache and logs
- `node_modules/` - Dependencies (per package and root)

## Key Conventions

### File Naming

- TypeScript source files use `.ts` extension
- React components use `.tsx` extension
- Config files use appropriate extensions (`.js`, `.ts`, `.json`, `.yaml`)
- Test files use `.test.ts` or `.spec.ts` suffix

### Module System

- All packages use ESM (`"type": "module"`)
- Imports use explicit extensions where required
- Exports defined via `exports` field in package.json

### Workspace References

- Shared configs referenced via `workspace:*` protocol
- Catalog dependencies referenced via `catalog:` protocol
- Example: `"@repo/eslint-config": "workspace:*"`

## Development Workflow

1. Make changes in `packages/cls-extended/src/`
2. Build with `pnpm --filter cls-extended build`
3. Test in examples with `pnpm --filter vite-react dev`
4. Run tests with `pnpm --filter cls-extended test`
5. Type check with `pnpm typecheck`
6. Lint with `pnpm lint`

## Distribution

- Only `dist/` folder is published to npm
- Source maps maintained for debugging
- Type definitions generated alongside JavaScript
- Multiple entry points via conditional exports



# Technology Stack

## Build System

- **Monorepo Manager**: Turborepo with pnpm workspaces
- **Package Manager**: pnpm (v10.28.2)
- **Node Version**: >=18 (main package requires >=20.19.0)

## Core Technologies

### Main Package (cls-extended)

- **Language**: TypeScript (v5.9.2)
- **Module System**: ESM (type: "module")
- **Build Tool**: tsdown with tsdown-preset-sxzz
- **Testing**: Vitest (v4.0.18)
- **Key Dependencies**:
  - `@babel/parser` - AST parsing
  - `magic-string` - Source transformations
  - `unplugin` - Universal plugin system

### Shared Packages

- `@repo/eslint-config` - Shared ESLint configuration
- `@repo/typescript-config` - Shared TypeScript configuration

### Examples

- Next.js example (App Router)
- Vite + React example

## Code Quality Tools

### Linting

- ESLint v9 with flat config
- TypeScript ESLint
- Prettier integration (eslint-config-prettier)
- Turbo plugin for monorepo-specific rules
- Only-warn plugin (all errors as warnings)

### Formatting

- Prettier v3.8.1

### Type Checking

- TypeScript strict mode enabled
- `noUnusedLocals: true` in main package

## Common Commands

### Root Level

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all tests
pnpm test

# Type check all packages
pnpm typecheck

# Lint all packages
pnpm lint

# Format code
pnpm format

# Run dev mode for all packages
pnpm dev
```

### Package-Specific

```bash
# Build specific package
pnpm --filter cls-extended build

# Run tests in watch mode
pnpm --filter cls-extended test

# Run example in dev mode
pnpm --filter vite-react dev
pnpm --filter nextjs dev

# Lint and fix
pnpm --filter cls-extended lint:fix
```

### Release

- Uses `release-it` with conventional changelog
- Semantic versioning with conventional commits
- Auto-changelog generation

## Turborepo Configuration

### Task Pipeline

- `build`: Depends on `^build` (dependencies first), outputs to `dist/` and `.next/`
- `lint`: Depends on `^lint`
- `typecheck`: Depends on `^typecheck`
- `test`: Depends on `^build`
- `dev`: No cache, persistent task

## Dependency Management

### Catalogs

Uses pnpm catalogs for shared dependency versions across packages:

- ESLint ecosystem packages
- TypeScript and type definitions
- Utilities (globals)

### Build Restrictions

- `allowBuilds.esbuild: false` - Prevents esbuild from building from source
- `onlyBuiltDependencies` list for specific packages that require building

## Export Strategy

Main package uses conditional exports for different adapters:

- `./adapters/vite` - Vite plugin
- `./adapters/webpack` - Webpack plugin
- `./api` - Core API
- `./core/*` - Core modules
- `./unplugin-factory` - Universal plugin factory
