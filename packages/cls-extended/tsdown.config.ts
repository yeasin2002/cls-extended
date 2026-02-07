import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ["src/**/*.ts"],
  platform: "neutral",
  exports: true,
  dts: true,
});
