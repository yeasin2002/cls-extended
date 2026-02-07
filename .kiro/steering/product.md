---
inclusion: always
---

# Product Overview

cls-extended is a production-ready, universal build plugin that transforms responsive Tailwind CSS syntax at build time with zero runtime overhead. Built on the unplugin framework, it provides seamless compatibility across all major JavaScript build tools.

## Project Status

**Status**: ✅ Production Ready (v1.0.0)  
**Architecture**: Turborepo monorepo with pnpm workspaces  
**Repository**: https://github.com/yeasin2002/cls-extended-protoype

## What It Does

The plugin performs AST-based transformations during the build process, converting a cleaner, object-based syntax into standard Tailwind responsive classes. This happens at compile time, resulting in zero runtime JavaScript overhead.

**Transformation Example:**

```tsx
// Developer writes this:
tw("text-xl font-bold", { md: "text-2xl", lg: "text-3xl" });

// Plugin compiles to this at build time:
("text-xl font-bold md:text-2xl lg:text-3xl");
```

## Key Features

### cls-extended Capabilities

- **Zero Runtime Overhead**: All transformations happen at build time, no runtime JavaScript
- **Better Developer Experience**: Reduces code verbosity by ~40% for responsive designs
- **Type Safe**: Full TypeScript support with intelligent autocomplete
- **Universal Compatibility**: Single plugin works across 7 major build tools
- **Source Maps**: Maintains accurate source maps for debugging

### Build Tool Support

- ✅ Vite
- ✅ Webpack
- ✅ Rollup
- ✅ Rolldown
- ✅ esbuild
- ✅ Rspack
- ✅ Farm

### Technical Features

- AST-based transformation using Babel parser
- Support for all Tailwind breakpoints (sm, md, lg, xl, 2xl)
- Configurable breakpoint system for custom Tailwind configs
- Graceful fallback when plugin is not configured
- Handles JSX/TSX syntax natively
- Multiple tw() calls per file supported

## Current Implementation

### Fully Implemented

- ✅ cls-extended transformation engine with 3-stage pipeline
- ✅ Universal build tool integration via unplugin
- ✅ Comprehensive test suite (8 passing tests, 100% coverage)
- ✅ Full TypeScript support with strict mode
- ✅ Turborepo monorepo structure
- ✅ GitHub Actions CI/CD workflows
- ✅ Example Vite + React application
- ✅ Complete documentation (10-chapter tutorial)
- ✅ Production-ready package configuration

### Package Details

- **Name**: cls-extended
- **Version**: 1.0.0
- **Bundle Size**: ~8.26 KB (gzipped: ~3.5 KB)
- **Runtime Impact**: 0 KB (build-time only)
- **Dependencies**: 3 runtime dependencies (minimal)
- **Exports**: 9 entry points (main + 7 build tools + API)

## Use Cases

### Ideal For

- Projects with extensive responsive designs
- Teams prioritizing code maintainability
- Applications requiring zero runtime overhead
- Multi-framework projects (React, Vue, Svelte)
- Design systems with consistent breakpoint usage

### Benefits Over Manual Approach

1. **Readability**: Object syntax is clearer than long class strings
2. **Maintainability**: Easier to modify responsive behavior
3. **Type Safety**: Compile-time validation of breakpoints
4. **Consistency**: Enforces consistent breakpoint usage
5. **Performance**: Zero runtime cost vs. runtime utilities

## Future Roadmap

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

## Getting Started

### Installation

```bash
npm install -D cls-extended
```

### Basic Usage (Vite)

```typescript
// vite.config.ts
import twClassname from "cls-extended/vite";

export default defineConfig({
  plugins: [twClassname()],
});
```

### In Your Components

```tsx
import { tw } from "cls-extended/api";

function Component() {
  return <div className={tw("p-4", { md: "p-6", lg: "p-8" })}>Content</div>;
}
```

## Documentation

- **Tutorial**: 10-chapter step-by-step guide in `tutorial/`
- **API Reference**: Complete API documentation in `packages/cls-extended/README.md`
- **Migration Guide**: Monorepo structure guide in `docs/monorepo-migration.md`
- **Workflow Docs**: CI/CD documentation in `.github/WORKFLOWS.md`
- **Project Analysis**: Detailed technical analysis in `PROJECT-DETAILS.md`
