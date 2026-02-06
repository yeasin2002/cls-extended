---
inclusion: always
---

# Project Structure

## Overview

This is a **Turborepo monorepo** with **pnpm workspaces**, migrated from a monolithic structure for better organization, scalability, and development experience.

## Monorepo Layout

```
tw-compose/
├── packages/
│   └── core/                      # Main plugin package (PUBLISHABLE)
│       ├── src/
│       │   ├── core/              # Core transformation logic
│       │   │   ├── options.ts     # Configuration system
│       │   │   ├── parser.ts      # AST parsing (Babel)
│       │   │   └── transform.ts   # Code transformation
│       │   ├── index.ts           # Main unplugin factory
│       │   ├── api.ts             # Runtime tw() function
│       │   ├── vite.ts            # Vite integration
│       │   ├── webpack.ts         # Webpack integration
│       │   ├── rollup.ts          # Rollup integration
│       │   ├── rolldown.ts        # Rolldown integration
│       │   ├── esbuild.ts         # esbuild integration
│       │   ├── rspack.ts          # Rspack integration
│       │   └── farm.ts            # Farm integration
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
├── examples/
│   └── vite-react-example/        # Vite + React demo (PRIVATE)
│       ├── src/
│       │   ├── App.tsx            # Landing page demo
│       │   ├── main.tsx           # Entry point
│       │   └── index.css          # Styles
│       ├── public/                # Static assets
│       ├── dist/                  # Build output
│       ├── package.json           # Uses workspace:* protocol
│       ├── vite.config.ts         # Vite configuration
│       ├── tsconfig.json          # TypeScript config
│       └── index.html             # HTML template
│
├── docs/
│   └── monorepo-migration.md      # Migration documentation
│
├── tutorial/                      # Educational content
│   ├── README.md                  # Tutorial overview
│   ├── 01-introduction.md         # Unplugin basics
│   ├── 02-unplugin-api.md         # API understanding
│   ├── 03-project-setup.md        # Project structure
│   ├── 04-package-config.md       # Package configuration
│   ├── 05-core-implementation.md  # Core logic
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

**packages/core (Publishable)**

- Purpose: Main plugin implementation
- Type: Public (publishable to npm)
- Version: 1.0.0
- Exports: 9 entry points (main + 7 build tools + API)

**examples/ (Private)**

- Purpose: Demonstration and integration testing
- Type: Private (not publishable)
- Dependencies: Uses `workspace:*` protocol for local plugin

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
│   Core Transformation Engine         │
│   (parser.ts, transform.ts)        │
└─────────────────────────────────────┘
```

**Component Responsibilities:**

- **index.ts**: Main plugin factory using `createUnplugin()`
- **api.ts**: Runtime tw() function with fallback behavior
- **core/options.ts**: Configuration resolution and validation
- **core/parser.ts**: AST parsing and tw() call detection
- **core/transform.ts**: Code transformation and generation
- **[tool].ts**: Build tool-specific exports (thin wrappers)

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

The plugin uses a "shallow" entry mode with 9 separate entry points:

```json
{
  "exports": {
    ".": "./dist/index.js", // Main plugin factory
    "./api": "./dist/api.js", // Runtime tw() function
    "./vite": "./dist/vite.js", // Vite integration
    "./webpack": "./dist/webpack.js", // Webpack integration
    "./rollup": "./dist/rollup.js", // Rollup integration
    "./rolldown": "./dist/rolldown.js", // Rolldown integration
    "./esbuild": "./dist/esbuild.js", // esbuild integration
    "./rspack": "./dist/rspack.js", // Rspack integration
    "./farm": "./dist/farm.js" // Farm integration
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
import twClassname from "tw-compose/vite";

// In application code
import { tw } from "tw-compose/api";
```

### 5. Workspace Protocol

**Example Package Dependencies:**

```json
{
  "dependencies": {
    "tw-compose": "workspace:*"
  }
}
```

**Benefits:**

- Always uses local version during development
- Automatic linking without manual npm link
- Proper version resolution on publish
- Turborepo understands dependencies

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
packages/core/tsconfig.json    # Package-specific
  ↓ includes
packages/core/src/**/*.ts      # Source files
```

**Build Configuration:**

- Root: Turborepo task pipeline
- Package: tsdown build configuration
- Tool-specific: Handled by unplugin

### 8. Testing Strategy

**Test Organization:**

- Unit tests in `packages/core/tests/`
- Fixtures for integration testing
- Snapshot tests for complex transformations
- Example apps as integration tests

**Test Coverage:**

- 8 unit tests covering core logic
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
pnpm --filter tw-compose build

# Run example
pnpm --filter @examples/vite-react dev

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
cd packages/core
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
