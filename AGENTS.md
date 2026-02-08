---
inclusion: always
---

# AI Agent Guidelines for cls-extended

## 1. Product Overview

### What is cls-extended?

cls-extended is a production-ready, universal build plugin that transforms responsive Tailwind CSS syntax at build time with zero runtime overhead. Built on the unplugin framework, it provides seamless compatibility across all major JavaScript build tools.

**Status**: ✅ Production Ready (v1.0.0)  
**Architecture**: Turborepo monorepo with pnpm workspaces  
**Repository**: https://github.com/yeasin2002/cls-extended-protoype

### Core Functionality

Performs AST-based transformations during build process, converting object-based syntax into standard Tailwind responsive classes at compile time.

**Example:**

```tsx
// Input (developer writes)
tw("text-xl font-bold", { md: "text-2xl", lg: "text-3xl" });

// Output (compiled at build time)
("text-xl font-bold md:text-2xl lg:text-3xl");
```

### Key Features

- **Zero Runtime Overhead**: All transformations at build time
- **Better DX**: Reduces code verbosity by ~40% for responsive designs
- **Type Safe**: Full TypeScript support with intelligent autocomplete
- **Universal Compatibility**: Single plugin for 7+ build tools
- **Source Maps**: Maintains accurate debugging information

### Build Tool Support

- ✅ Vite
- ✅ Webpack
- 🚧 Rollup (planned)
- 🚧 Rolldown (planned)
- 🚧 esbuild (planned)
- 🚧 Rspack (planned)
- 🚧 Farm (planned)

### Package Details

- **Name**: cls-extended
- **Version**: 1.0.0
- **Bundle Size**: ~8.26 KB (gzipped: ~3.5 KB)
- **Runtime Impact**: 0 KB (build-time only)
- **Dependencies**: 3 runtime dependencies (minimal)

### Use Cases

**Ideal For:**

- Extensive responsive designs
- Teams prioritizing code maintainability
- Applications requiring zero runtime overhead
- Multi-framework projects (React, Vue, Svelte)
- Design systems with consistent breakpoint usage

**Benefits:**

1. Readability: Object syntax clearer than long class strings
2. Maintainability: Easier to modify responsive behavior
3. Type Safety: Compile-time validation of breakpoints
4. Consistency: Enforces consistent breakpoint usage
5. Performance: Zero runtime cost

### Quick Start

```bash
npm install -D cls-extended
```

```typescript
// vite.config.ts
import twClassname from "cls-extended/adapters/vite";

export default defineConfig({
  plugins: [twClassname()],
});
```

```tsx
// Component usage
import { tw } from "cls-extended/api";

function Component() {
  return <div className={tw("p-4", { md: "p-6", lg: "p-8" })}>Content</div>;
}
```

## 2. Project Structure

### Monorepo Layout

```
cls-extended/
├── packages/
│   └── cls-extended/              # Main plugin package (PUBLISHABLE)
│       ├── src/
│       │   ├── adapters/          # Build tool adapters (vite.ts, webpack.ts)
│       │   ├── core/              # Core transformation logic
│       │   │   ├── options.ts     # Configuration system
│       │   │   ├── parser.ts      # AST parsing (Babel)
│       │   │   └── transform.ts   # Code transformation
│       │   ├── index.ts           # Main entry point
│       │   ├── api.ts             # Runtime tw() function
│       │   └── unplugin-factory.ts # Unplugin factory
│       ├── tests/
│       │   ├── fixtures/          # Test input files
│       │   ├── __snapshots__/     # Vitest snapshots
│       │   └── rollup.test.ts     # Unit tests (8 tests)
│       ├── dist/                  # Build output (generated)
│       ├── package.json           # Package configuration
│       ├── tsconfig.json          # TypeScript config
│       ├── tsdown.config.ts       # Build configuration
│       └── README.md              # Package documentation
│
├── tooling/
│   ├── eslint-config/             # Shared ESLint configuration
│   │   ├── base.js
│   │   ├── next.js
│   │   ├── react-internal.js
│   │   └── package.json
│   └── typescript-config/         # Shared TypeScript configuration
│       ├── base.json
│       ├── nextjs.json
│       ├── react-library.json
│       └── package.json
│
├── examples/
│   ├── nextjs/                    # Next.js demo (PRIVATE)
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── postcss.config.mjs
│   └── vite-react/                # Vite + React demo (PRIVATE)
│       ├── src/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css
│       ├── package.json
│       ├── vite.config.ts
│       └── index.html
│
├── tutorial/                      # 10-chapter educational content
│   ├── 01-introduction.md
│   ├── 02-unplugin-api.md
│   ├── 03-project-setup.md
│   ├── 04-package-config.md
│   ├── 05-cls-extended-implementation.md
│   ├── 06-ast-transformation.md
│   ├── 07-build-tool-exports.md
│   ├── 08-testing.md
│   ├── 09-typescript-config.md
│   └── 10-build-publish.md
│
├── .github/
│   ├── workflows/                 # CI/CD automation
│   │   ├── ci.yml                 # Main CI pipeline
│   │   ├── unit-test.yml          # Multi-version testing
│   │   ├── release.yml            # NPM publishing
│   │   ├── release-commit.yml     # Preview publishing
│   │   ├── turborepo-cache.yml    # Cache demonstration
│   │   └── example-build.yml      # Example validation
│   └── [documentation files]
│
├── package.json                   # Root package (PRIVATE)
├── pnpm-workspace.yaml            # Workspace configuration
├── turbo.json                     # Turborepo configuration
├── tsconfig.json                  # Base TypeScript config
└── README.md                      # Project overview
```

### Architecture Patterns

**Workspace Structure:**

- **packages/**: Publishable packages (cls-extended)
- **tooling/**: Internal shared configurations
- **examples/**: Demo applications (private)
- **tutorial/**: Documentation and guides

**Key Principles:**

1. Turborepo for intelligent caching and parallel execution
2. pnpm workspaces for dependency management
3. Shared tooling configs to ensure consistency
4. Examples link to published npm package (not workspace)

## 3. Technology Stack

### Core Dependencies

#### unplugin (v3.0.0)

**Purpose**: Universal plugin framework  
**Why**: Enables single codebase for 7+ build tools

**Features:**

- Abstract build tool API
- Virtual modules support
- Load/transform hooks
- Source map handling

#### @babel/parser (v7.26.3)

**Purpose**: AST parsing  
**Why**: Industry standard for JavaScript/TypeScript parsing

**Features:**

- JSX/TSX support
- Source location tracking
- Plugin system
- Error recovery

#### magic-string (v0.30.17)

**Purpose**: String manipulation with source maps  
**Why**: Efficient code transformation with accurate debugging

**Features:**

- Fast string replacement
- Source map generation
- Efficient memory usage
- Zero-copy operations

### Build Tools

#### tsdown (v3.0.0)

**Purpose**: TypeScript bundler  
**Why**: Modern, fast, excellent ESM output

**Features:**

- Multiple entry points
- Declaration generation
- Tree-shaking
- Fast incremental builds

**Configuration:**

```typescript
// tsdown.config.ts
export default {
  entry: "src/**/*.ts",
  format: "esm",
  dts: true,
  clean: true,
};
```

#### Turborepo (v3.10.0)

**Purpose**: Monorepo task orchestration  
**Why**: Intelligent caching (75% faster rebuilds)

**Features:**

- Task dependency graph
- Parallel execution
- Remote caching
- Incremental builds

**Performance:**

- Cold build: ~2.0s
- Warm build: ~0.5s (with cache)

### Testing Framework

#### Vitest (v3.1.1)

**Purpose**: Unit testing  
**Why**: Vite-native, fast, excellent DX

**Current Coverage:**

- 8 tests passing
- 100% coverage
- Snapshot testing
- Watch mode

**Performance:**

- Test suite: ~200ms
- Coverage: ~50ms

### Code Quality

#### ESLint (v9.39.2)

**Configuration**: @sxzz/eslint-config preset  
**Purpose**: Linting and style enforcement

**Rules:**

- TypeScript best practices
- Import/export conventions
- Code complexity limits
- Unused variable detection

#### Prettier (v3.8.1)

**Configuration**: @sxzz/prettier-config preset  
**Purpose**: Code formatting

**Formats:**

- TypeScript/JavaScript
- JSON
- Markdown
- YAML

#### TypeScript (v5.x)

**Mode**: Strict  
**Purpose**: Type checking

**Checks:**

- Type safety
- Unused locals
- Implicit any detection
- Module resolution

### Module System

**Decision**: ESM-only package

**Rationale:**

- Modern standard
- Better tree-shaking
- Native browser support
- Future-proof

**Configuration:**

```json
{
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./adapters/*": "./dist/adapters/*.js",
    "./api": "./dist/api.js"
  }
}
```

**Target:**

- ESNext
- Bundler module resolution
- Minimum Node.js: 20.19.0

## 4. Common Commands

### Monorepo Commands

```bash
# Build all packages with Turborepo caching
pnpm build

# Run tests in all packages
pnpm test

# Type check all packages
pnpm typecheck

# Lint all packages
pnpm lint

# Clean all build outputs and caches
pnpm clean

# Format all code
pnpm format
```

### Package-Specific Commands

```bash
# Build only the plugin
pnpm --filter cls-extended build

# Run example in dev mode
pnpm --filter vite-react dev

# Run plugin tests (single run)
pnpm --filter cls-extended test --run

# Run plugin tests (watch mode)
pnpm --filter cls-extended test

# Type check plugin only
pnpm --filter cls-extended typecheck

# Lint plugin only
pnpm --filter cls-extended lint
```

### Development Workflow

```bash
# 1. Install dependencies
pnpm install

# 2. Build plugin
pnpm --filter cls-extended build

# 3. Start example (requires plugin build first)
pnpm --filter vite-react dev

# 4. Run tests in watch mode
pnpm --filter cls-extended test

# 5. Build everything
pnpm build
```

### Publishing Workflow

```bash
# Navigate to package
cd packages/cls-extended

# Bump version
pnpm bumpp

# Build
pnpm build

# Test
pnpm test --run

# Publish to NPM
pnpm publish
```

## 5. Performance Characteristics

### Build Performance

- **Cold build**: ~2.0 seconds (full monorepo)
- **Warm build**: ~0.5 seconds (with Turborepo cache)
- **Plugin build**: ~500-700ms
- **Example build**: ~1.5 seconds

### Runtime Performance

- **File transformation**: <1ms per file
- **AST parsing**: ~0.3ms per file
- **Source map generation**: ~0.1ms per file
- **Memory usage**: <10MB for typical projects

### Test Performance

- **Test suite**: ~200ms (8 tests)
- **Coverage generation**: ~50ms
- **Watch mode**: Instant feedback

### CI/CD Performance

- **Lint + Type Check**: ~30 seconds
- **Test**: ~20 seconds
- **Build**: ~40 seconds
- **Total CI time**: ~90 seconds

## 6. Future Roadmap

### Planned Features (Phase 2)

- **Variant Support**: hover, focus, dark mode variants
- **Custom Breakpoints**: User-defined breakpoint configurations
- **Group/Peer Variants**: Advanced Tailwind variant support
- **IDE Extensions**: VS Code and WebStorm plugins

### Extensibility

- Plugin architecture designed for extension
- Monorepo structure supports additional packages
- Community contribution opportunities
- Framework-specific preset packages

### Potential Technology Additions

- **Changesets**: For versioning and changelogs
- **Codecov**: For coverage reporting
- **Remote Turborepo cache**: For team caching
- **Renovate**: For dependency updates

## 7. Agent Working Guidelines

### Code Style

- Follow existing TypeScript patterns
- Use strict mode TypeScript
- Prefer composition over inheritance
- Keep functions pure where possible
- Write self-documenting code

### Testing Strategy

- Write tests for all new features
- Maintain 100% coverage
- Use snapshot testing for transformations
- Test edge cases and error handling

### Documentation

- Update README.md for API changes
- Add JSDoc comments for public APIs
- Update tutorial chapters if architecture changes
- Keep examples in sync with API changes

### Pull Request Process

1. Create feature branch
2. Write tests first (TDD)
3. Implement feature
4. Run full test suite
5. Update documentation
6. Create PR with clear description

### Debugging Tips

- Use `DEBUG=cls-extended:*` for verbose logging
- Check AST output with `console.log(JSON.stringify(ast, null, 2))`
- Test transformations in isolation
- Use Vitest UI for interactive debugging

### Common Pitfalls

- Don't modify AST nodes in-place (clone first)
- Always handle undefined/null in transforms
- Remember source map offsets
- Test with real-world code examples
- Consider performance for large files

### Best Practices

- Keep adapters thin (logic in core)
- Cache expensive operations
- Use magic-string for all code modifications
- Validate plugin options early
- Provide helpful error messages
