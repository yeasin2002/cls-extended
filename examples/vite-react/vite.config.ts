import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import clsExtended from "cls-extended/adapters/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react(), clsExtended() as any, tailwindcss()],
  server: {
    port: 3100,
    strictPort: false,
  },
});
