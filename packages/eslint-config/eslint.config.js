import reactConfig from "eslint-plugin-react";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextConfig from "eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
import turboConfig from "eslint-config-turbo";

import { nextJsConfig } from './next-js.js';
import { reactInternalConfig } from './react-internal.js';
import { baseConfig } from './base.js';

export const baseConfig = [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export const reactInternalConfig = [
  ...baseConfig,
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: reactConfig,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactConfig.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];

export const nextJsConfig = [
  ...reactInternalConfig,
  {
    files: [
      "app/**/*.{js,ts,jsx,tsx}",
      "pages/**/*.{js,ts,jsx,tsx}",
      "components/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: {
      next: nextConfig,
    },
    rules: {
      ...nextConfig.configs.recommended.rules,
    },
  },
];

export { nextJsConfig, reactInternalConfig, baseConfig };
export default baseConfig;
