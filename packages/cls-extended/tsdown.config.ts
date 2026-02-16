import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**/*.ts"],
  platform: "node",
  exports: true,
  dts: true,
  inlineOnly: false,
});
