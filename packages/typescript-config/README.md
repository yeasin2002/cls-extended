# @repo/typescript-config

Shared TypeScript configurations for the cls-extended monorepo.

## Configurations

### Base Config

Base TypeScript configuration with modern ESNext settings and strict mode.

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

**Features:**

- Strict mode enabled
- ESNext module system
- Bundler module resolution
- Declaration files generation
- Isolated modules
- Verbatim module syntax

### React Library Config

TypeScript configuration for React libraries and Vite applications.

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

**Features:**

- Extends base config
- React JSX transform
- DOM and DOM.Iterable types
- Optimized for React development

### Next.js Config

TypeScript configuration for Next.js applications.

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

**Features:**

- Extends base config
- Next.js TypeScript plugin
- JSX preserve mode
- No emit (Next.js handles compilation)
- Incremental compilation
- AllowJs enabled

## Usage

1. Install the package in your workspace:

```json
{
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "typescript": "catalog:"
  }
}
```

2. Create a `tsconfig.json` file:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    // Your package-specific overrides
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
}
```

## Examples

### Library Package

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "types": ["node"],
    "noUnusedLocals": true
  },
  "include": ["src", "tests"],
  "exclude": ["dist"]
}
```

### React/Vite Application

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "types": ["vite/client"],
    "noEmit": true
  },
  "include": ["src"]
}
```

### Next.js Application

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Compiler Options

### Base Configuration

| Option                   | Value   | Description                               |
| ------------------------ | ------- | ----------------------------------------- |
| target                   | ES2022  | Target ECMAScript version                 |
| module                   | ESNext  | Module system                             |
| moduleResolution         | Bundler | Module resolution strategy                |
| lib                      | ES2022  | Standard library to include               |
| strict                   | true    | Enable all strict type checking           |
| declaration              | true    | Generate .d.ts files                      |
| declarationMap           | true    | Generate source maps for declarations     |
| isolatedModules          | true    | Each file can be transpiled independently |
| verbatimModuleSyntax     | true    | Preserve import/export syntax             |
| skipLibCheck             | true    | Skip type checking of declaration files   |
| esModuleInterop          | true    | Emit additional JS for CommonJS interop   |
| resolveJsonModule        | true    | Allow importing JSON files                |
| noUncheckedIndexedAccess | true    | Add undefined to index signatures         |

### React Library Additions

| Option | Value                     | Description                 |
| ------ | ------------------------- | --------------------------- |
| jsx    | react-jsx                 | Use React 17+ JSX transform |
| lib    | ES2022, DOM, DOM.Iterable | Include browser APIs        |

### Next.js Additions

| Option      | Value                | Description                           |
| ----------- | -------------------- | ------------------------------------- |
| jsx         | preserve             | Preserve JSX for Next.js              |
| allowJs     | true                 | Allow JavaScript files                |
| noEmit      | true                 | Don't emit files (Next.js handles it) |
| incremental | true                 | Enable incremental compilation        |
| plugins     | [{ "name": "next" }] | Next.js TypeScript plugin             |

## Best Practices

1. **Extend, Don't Override**: Use the shared configs as a base and only override what's necessary
2. **Package-Specific Types**: Add package-specific types in your local config
3. **Include/Exclude**: Define appropriate include and exclude patterns
4. **Strict Mode**: Keep strict mode enabled for maximum type safety
5. **No Unused Locals**: Enable `noUnusedLocals` for cleaner code

## Updating Configurations

To update the shared configurations:

1. Edit the appropriate file in `packages/typescript-config/`
2. Run `pnpm typecheck` to verify changes
3. Update this README if adding new configurations

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
