# cls-extended Vite + React Example

Example of using cls-extended with Vite, React, and Tailwind CSS v4.

## Configuration

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import clsExtended from "cls-extended/adapters/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), clsExtended()],
});
```

## Usage

```tsx
import { cls } from "cls-extended";

function Component() {
  return (
    <div className={cls("text-xl", { md: "text-2xl", lg: "text-3xl" })}>
      Responsive Text
    </div>
  );
}
```

> **Note:** All transformations happen at build time with zero runtime overhead.
