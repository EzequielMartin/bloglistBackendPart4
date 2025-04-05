import { defineConfig } from "eslint/config"
import globals from "globals"
import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin-js"


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  {
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/indent": [
        "error",
        2
      ],
      "@stylistic/quotes": [
        "error",
        "double"
      ],
      "@stylistic/semi": [
        "error",
        "never"
      ],
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
        "error", "always"
      ],
      "eqeqeq": "error",
      "arrow-spacing": [
        "error", { "before": true, "after": true }
      ]
    }
  },
  {
    ignores: ["dist"]
  },
])