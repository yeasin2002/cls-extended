import { parse } from "@babel/parser";
import type * as t from "@babel/types";

export interface ClsCallExpression {
  baseClasses: string;
  responsiveClasses: Record<string, string>;
  start: number;
  end: number;
}

export function findClsCalls(code: string): ClsCallExpression[] {
  let ast: t.File;
  try {
    ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
  } catch {
    return [];
  }

  const clsCalls: ClsCallExpression[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverse(node: any) {
    if (!node || typeof node !== "object") return;

    // Check if it's a CallExpression
    if (node.type === "CallExpression") {
      const callee = node.callee;

      // Check if it's tw() or tw.something()
      const isTwCall =
        (callee.type === "Identifier" && callee.name === "tw") ||
        (callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "tw");

      if (isTwCall) {
        const args = node.arguments;

        // Must have at least 1 argument (base classes)
        if (args.length === 0) return;

        // First argument: base classes (string literal)
        const baseArg = args[0];
        if (baseArg.type !== "StringLiteral") return;

        const baseClasses = baseArg.value;

        // Second argument: responsive classes (object expression)
        const responsiveClasses: Record<string, string> = {};

        if (args.length > 1) {
          const responsiveArg = args[1];

          if (responsiveArg.type === "ObjectExpression") {
            for (const prop of responsiveArg.properties) {
              if (
                prop.type === "ObjectProperty" &&
                prop.value.type === "StringLiteral"
              ) {
                let key: string | undefined;
                if (prop.key.type === "Identifier") {
                  key = prop.key.name;
                } else if (prop.key.type === "StringLiteral") {
                  key = prop.key.value;
                }
                if (key) {
                  responsiveClasses[key] = prop.value.value;
                }
              }
            }
          }
        }

        clsCalls.push({
          baseClasses,
          responsiveClasses,
          start: node.start!,
          end: node.end!,
        });
      }
    }

    // Traverse all properties
    for (const key in node) {
      if (key === "loc" || key === "range" || key === "tokens") continue;
      const value = node[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          traverse(item);
        }
      } else if (value && typeof value === "object") {
        traverse(value);
      }
    }
  }

  traverse(ast);
  return clsCalls;
}
