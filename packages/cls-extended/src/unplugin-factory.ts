import { createUnplugin, type UnpluginInstance } from "unplugin";
import { resolveOptions, type Options } from "./core/options";
import { transformClsCalls } from "./core/transform";

const unplugin: UnpluginInstance<Options | undefined, false> = createUnplugin(
  (rawOptions = {}) => {
    const options = resolveOptions(rawOptions);

    const name = "cls-extended";
    return {
      name,

      transform: {
        filter: {
          id: { include: options.include, exclude: options.exclude },
        },
        handler(code, id) {
          // Only process files that might contain tw()
          if (!code.includes("tw(")) {
            return null;
          }

          // Perform transformation
          return transformClsCalls(code, id, options);
        },
      },
    };
  },
);

export default unplugin;
export type { Options } from "./core/options";
