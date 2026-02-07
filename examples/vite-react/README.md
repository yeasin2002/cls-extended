# @cls-extended/core - Vite + React Example

This example demonstrates `@cls-extended/core` in action with Vite and React, showcasing zero-runtime responsive Tailwind CSS transformations.

## What This Example Shows

- ✅ Build-time transformation of responsive Tailwind classes
- ✅ Clean, maintainable syntax for responsive designs
- ✅ Zero runtime JavaScript overhead
- ✅ Full TypeScript support with type safety
- ✅ Integration with Vite + React + SWC

## Quick Start

```bash
# Install dependencies (from monorepo root)
pnpm install

# Build the core package first
pnpm --filter @cls-extended/core build

# Run the example
pnpm --filter vite-react dev
```

## How It Works

### 1. Plugin Configuration

```ts
// vite.config.ts
import clsExtended from '@cls-extended/core/adapters/vite'

export default defineConfig({
  plugins: [react(), clsExtended()],
})
```

### 2. Component Usage

```tsx
// src/App.tsx
import { cls as tw } from '@cls-extended/core/api'

function App() {
  return (
    <div className={tw('text-xl font-bold', { 
      md: 'text-2xl', 
      lg: 'text-3xl' 
    })}>
      Responsive Text
    </div>
  )
}
```

### 3. Build-Time Transformation

**Before (what you write):**
```tsx
tw('text-xl font-bold', { md: 'text-2xl', lg: 'text-3xl' })
```

**After (what gets compiled):**
```tsx
"text-xl font-bold md:text-2xl lg:text-3xl"
```

## Example Features

The demo app showcases:

- **Responsive Typography** - Text sizes that adapt across breakpoints
- **Responsive Spacing** - Padding and margins that scale with screen size
- **Responsive Layouts** - Grid systems that change columns per breakpoint
- **Responsive Components** - Buttons, cards, and sections with breakpoint-specific styles

## Key Benefits

1. **Cleaner Code** - Object syntax is more readable than long class strings
2. **Better Maintainability** - Easy to see and modify responsive behavior
3. **Zero Runtime Cost** - All transformations happen at build time
4. **Type Safety** - TypeScript validates breakpoint names
5. **Standard Output** - Generates regular Tailwind classes

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool with HMR
- **TypeScript 5.9** - Type safety
- **@vitejs/plugin-react-swc** - Fast Refresh with SWC
- **@cls-extended/core** - Build-time class transformation

## Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## Learn More

- [Core Package Documentation](../../packages/core/README.md)
- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
