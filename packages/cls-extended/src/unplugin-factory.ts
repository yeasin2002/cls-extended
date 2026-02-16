import { createUnplugin, type UnpluginInstance } from "unplugin";
import { resolveOptions, type Options } from "./core/options";
import { transformClsCalls } from "./core/transform";

const unplugin: UnpluginInstance<Options | undefined, false> = createUnplugin(
  (rawOptions = {}) => {
    const options = resolveOptions(rawOptions);

    return {
      name: "cls-extended",
      enforce: "pre",
      transform: {
        filter: { id: { include: options.include, exclude: options.exclude } },
        handler(code, id) {
          if (!code.includes("cls(")) return null;
          return transformClsCalls(code, id, options);
        },
      },
    };
  },
);

export default unplugin;
export type { Options } from "./core/options";
