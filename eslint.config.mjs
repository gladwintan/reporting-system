import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "import": eslintPluginImport,
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "indent": ["error", 2],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], 
            ["internal"],
            ["parent"], 
            ["sibling", "index"], 
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always"
        },
        
      ],
      "import/newline-after-import": "error", 
      "import/no-duplicates": "error",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "dist/**"],
  },  
];

export default eslintConfig;
