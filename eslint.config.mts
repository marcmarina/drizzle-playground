import js from "@eslint/js";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, "simple-import-sort": simpleImportSort },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Copied from https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping
            // Side effect imports.
            ["^\\u0000"],
            // Node.js builtins prefixed with `node:`.
            ["^node:"],
            // React
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^@?\\w"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],
            // Relative imports.
            ["^\\.\\."],
            ["^\\."],
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
]);
