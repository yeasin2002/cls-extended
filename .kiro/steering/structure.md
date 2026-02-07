---
inclusion: always
---

# Project Structure

## Overview

This is a **Turborepo monorepo** with **pnpm workspaces**, migrated from a monolithic structure for better organization, scalability, and development experience.

## Monorepo Layout

```
cls-extended/
├── packages/
│   └── cls-extended/                      # Main plugin package (PUBLISHABLE)
│       ├── src/
│       │   ├── adapters/          # Build tool adapters
│       │   │   ├── vite.ts        # Vite integration
│       │   │   └── webpack.ts     # Webpack integration
│       │   ├── core/              # Core transformation logic
│       │   │   ├── options.ts     # Configuration system
│       │   │   ├── parser.ts      # AST parsing (Babel)
│       │   │   └── transform.ts   # Code transformation
│       │   ├── index.ts           # Main entry point
│       │   ├── api.ts             # Runtime tw() function
│       │   └── unplugin-factory.ts # Unplugin factory
│       ├── tests/
│       │   ├── fixtures/          # Test input files
│       │   │   └── basic.js       # Sample fixture
│       │   ├── __snapshots__/     # Vitest snapshots
│       │   └── rollup.test.ts     # Unit tests (8 tests)
│       ├── dist/                  # Build output (generated)
│       │   ├── *.js               # Compiled JavaScript
│       │   └── *.d.ts             # TypeScript declarations
│       ├── package.json           # Package configuration
│       ├── tsconfig.json          # TypeScript config (extends root)
│       ├── tsdown.config.ts       # Build configuration
│       ├── eslint.config.js       # ESLint configuration
│       └── README.md              # Package documentation
│
├── tooling/
│   ├── eslint-config/             # Shared ESLint configuration
│   └── typescript-config/         # Shared TypeScript configuration
│
├── examples/
│   ├── nextjs/                    # Next.js demo (PRIVATE)
│   │   ├── app/
│   │   │   ├── page.tsx           # Landing page demo
│   │   │   ├── layout.tsx         # Root layout
│   │   │   ├── globals.css        # Global styles
│   │   │   └── favicon.ico        # Favicon
│   │   ├── public/                # Static assets
│   │   ├── package.json           # Uses cls-extended from npm
│   │   ├── next.config.ts         # Next.js configuration
│   │   ├── tsconfig.json          # TypeScript config
│   │   └── postcss.config.mjs     # PostCSS config
│   │
│   └── vite-react/                # Vite + React demo (PRIVATE)
│       ├── src/
│       │   ├── App.tsx            # Landing page demo
│       │   ├── main.tsx           # Entry point
│       │   └── index.css          # Styles
│       ├── public/                # Static assets
│       ├── dist/                  # Build output
│       ├── package.json           # Uses cls-extended from npm
│       ├── vite.config.ts         # Vite configuration
│       ├── tsconfig.json          # TypeScript config
│       └── index.html             # HTML template
│
├── tooling/
│   ├── eslint-config/             # Shared ESLint configuration
│   │   ├── base.js                # Base ESLint config
│   │   ├── next.js                # Next.js specific config
│   │   ├── react-internal.js      # React internal config
│   │   ├── package.json           # Package configuration
│   │   └── README.md              # Documentation
│   │
│   └── typescript-config/         # Shared TypeScript configuration
│       ├── base.json              # Base TypeScript config
│       ├── nextjs.json            # Next.js specific config
│       ├── react-library.json     # React library config
│       └── package.json           # Package configuration
│
├── tutorial/                      # Educational content
│   ├── README.md                  # Tutorial overview
│   ├── 01-introduction.md         # Unplugin basics
│   ├── 02-unplugin-api.md         # API understanding
│   ├── 03-project-setup.md        # Project structure
│   ├── 04-package-config.md       # Package configuration
│   ├── 05-cls-extended-implementation.md  # cls-extended logic
│   ├── 06-ast-transformation.md   # AST techniques
│   ├── 07-build-tool-exports.md   # Integration patterns
│   ├── 08-testing.md              # Testing strategies
│   ├── 09-typescript-config.md    # TypeScript setup
│   ├── 10-build-publish.md        # Publishing workflow
│   └── SUMMARY.md                 # Complete summary
│
├── .github/
│   ├── workflows/                 # CI/CD automation
│   │   ├── ci.yml                 # Main CI pipeline
│   │   ├── unit-test.yml          # Multi-version testing
│   │   ├── release.yml            # NPM publishing
│   │   ├── release-commit.yml     # Preview publishing
│   │   ├── turborepo-cache.yml    # Cache demonstration
│   │   └── example-build.yml      # Example validation
│   ├── WORKFLOWS.md               # Workflow documentation
│   ├── WORKFLOW-UPDATES.md        # Migration summary
│   ├── BADGES.md                  # Status badges
│   └── MONOREPO-CHECKLIST.md      # Migration checklist
│
├── .kiro/
│   └── steering/                  # AI assistant context
│       ├── product.md             # Product overview
│       ├── structure.md           # This file
│       └── tech.md                # Technology stack
│
├── .turbo/                        # Turborepo cache (gitignored)
├── node_modules/                  # Dependencies (gitignored)
├── package.json                   # Root package (PRIVATE)
├── pnpm-workspace.yaml            # Workspace configuration
├── pnpm-lock.yaml                 # Dependency lock file
├── turbo.json                     # Turborepo configuration
├── tsconfig.json                  # Base TypeScript config
├── README.md                      # Project overview
├── PROJECT-DETAILS.md             # Business analysis
├── WORKFLOWS-COMPLETE.md          # Workflow summary
├── LICENSE                        # MIT license
└── .gitignore                     # Git ignore rules
```

## Key Architectural Patterns

### 1. Monorepo Structure

**Root Level (Private)**

- Purpose: Orchestration and shared configuration
- Type: Private (not publishable)
- Contains: Workspace configuration, shared dev dependencies
- Scripts: Turborepo commands (build, test, lint, typecheck)

**packages/cls-extended (Publishable)**

- Purpose: Main plugin implementation
- Type: Public (publishable to npm)
- Version: 1.0.0
- Exports: Multiple entry points (main, adapters, core modules, API)

**examples/ (Private)**

- Purpose: Demonstration and integration testing
- Type: Private (not publishable)
- Examples:
  - `nextjs/`: Next.js 16 + App Router demo
  - `vite-react/`: Vite + React 19 demo
- Dependencies: Uses published cls-extended package from npm

### 2. Plugin Architecture

**Three-Layer Design:**

```
┌─────────────────────────────────────┐
│   Build Tool Integration Layer      │
│   (vite.ts, webpack.ts, etc.)      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Unplugin Abstraction Layer        │
│   (index.ts - createUnplugin)      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   cls-extended Transformation Engine         │
│   (parser.ts, transform.ts)        │
└─────────────────────────────────────┘
```

**Component Responsibilities:**

- **index.ts**: Main entry point and exports
- **unplugin-factory.ts**: Main plugin factory using `createUnplugin()`
- **api.ts**: Runtime tw() function with fallback behavior
- **core/options.ts**: Configuration resolution and validation
- **core/parser.ts**: AST parsing and tw() call detection
- **core/transform.ts**: Code transformation and generation
- **adapters/[tool].ts**: Build tool-specific integrations

### 3. File Naming Conventions

**Source Files:**

- `.ts` extension for TypeScript source
- Lowercase with hyphens for multi-word files
- Build tool exports match tool name exactly

**Test Files:**

- `.test.ts` suffix for test files
- Collocated with source in `tests/` directory
- Fixtures in `tests/fixtures/`
- Snapshots in `tests/__snapshots__/`

**Configuration Files:**

- `tsconfig.json` for TypeScript
- `tsdown.config.ts` for build
- `eslint.config.js` for linting
- `turbo.json` for Turborepo

### 4. Export Strategy

**Multi-Entry Point Package:**

The plugin uses a "shallow" entry mode with multiple entry points:

```json
{
  "exports": {
    ".": "./dist/index.js", // Main entry point
    "./adapters/vite": "./dist/adapters/vite.js", // Vite integration
    "./adapters/webpack": "./dist/adapters/webpack.js", // Webpack integration
    "./api": "./dist/api.js", // Runtime tw() function
    "./core/options": "./dist/core/options.js", // Configuration
    "./core/parser": "./dist/core/parser.js", // Parser
    "./core/transform": "./dist/core/transform.js", // Transform
    "./unplugin-factory": "./dist/unplugin-factory.js", // Factory
    "./package.json": "./package.json"
  }
}
```

**Benefits:**

- Tree-shaking optimization
- Smaller bundle sizes
- Clear import paths
- Better IDE autocomplete

**Usage Examples:**

```typescript
// In build config
import twClassname from "cls-extended/adapters/vite";

// In application code
import { tw } from "cls-extended/api";
```

### Workspace Protocol

**Example Package Dependencies:**

```json
{
  "dependencies": {
    "cls-extended": "^1.1.1"
  }
}
```

**Note**: Examples use the published npm package rather than workspace protocol for realistic testing.

### 6. Transform Pattern

**Filter Configuration:**

```typescript
{
  include: [/\.[jt]sx?$/],  // JS, TS, JSX, TSX files
  exclude: [/node_modules/]  // Skip dependencies
}
```

**Transformation Pipeline:**

1. **Filter**: Check if file should be processed
2. **Quick Scan**: Look for 'tw(' string
3. **Parse**: Generate AST with Babel
4. **Transform**: Replace tw() calls with strings
5. **Generate**: Output code with source maps

### 7. Configuration Hierarchy

**TypeScript Configuration:**

```
tsconfig.json (root)           # Base configuration
  ↓ extends
packages/cls-extended/tsconfig.json    # Package-specific
  ↓ includes
packages/cls-extended/src/**/*.ts      # Source files
```

**Build Configuration:**

- Root: Turborepo task pipeline
- Package: tsdown build configuration
- Tool-specific: Handled by unplugin

### 8. Testing Strategy

**Test Organization:**

- Unit tests in `packages/cls-extended/tests/`
- Fixtures for integration testing
- Snapshot tests for complex transformations
- Example apps as integration tests

**Test Coverage:**

- 8 unit tests covering cls-extended logic
- 100% coverage of transformation pipeline
- Multi-version testing (Node 20, 22)
- Build verification in CI

### 9. Documentation Structure

**Four Documentation Tiers:**

1. **Quick Start**: README.md files
2. **Tutorial**: Step-by-step learning (10 chapters)
3. **Reference**: API documentation and guides
4. **Analysis**: PROJECT-DETAILS.md (business perspective)

### 10. CI/CD Integration

**Workflow Organization:**

- Separate workflows for different concerns
- Parallel execution where possible
- Turborepo cache integration
- Multi-version testing matrix

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Build plugin
pnpm --filter cls-extended build

# Run example
pnpm --filter vite-react dev

# Run tests
pnpm test

# Type check
pnpm typecheck
```

### Adding New Packages

1. Create directory in `packages/` or `examples/`
2. Add `package.json` with proper name
3. Run `pnpm install` from root
4. Add to workspace if needed

### Publishing

```bash
cd packages/cls-extended
pnpm build
pnpm test --run
pnpm publish
```

## Best Practices

### File Organization

- Keep related files together
- Minimize directory nesting
- Use clear, descriptive names
- Separate concerns logically

### Dependency Management

- Shared dev dependencies at root
- Package-specific deps in package
- Use workspace protocol for internal deps
- Keep dependencies minimal

### Build Optimization

- Leverage Turborepo caching
- Use parallel execution
- Filter packages when possible
- Clean builds when needed

### Code Quality

- Strict TypeScript mode
- ESLint with preset rules
- Prettier for formatting
- Comprehensive testing
