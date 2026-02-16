import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import clsExtended from "cls-extended/adapters/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), clsExtended(), tailwindcss()],
  server: {
    port: 3100,
    strictPort: false,
  },
});
