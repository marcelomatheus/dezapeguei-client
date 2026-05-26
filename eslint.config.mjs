import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "app/**/*.ts", "app/**/*.tsx"],
    rules: {
      "no-warning-comments": [
        "error",
        {
          terms: ["todo", "fixme", "xxx"],
          location: "anywhere",
        },
      ],
      "no-inline-comments": "error",
    },
  },
  {
    files: ["src/**/*.js", "src/**/*.jsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program",
          message: "Use TypeScript files only inside src/.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
