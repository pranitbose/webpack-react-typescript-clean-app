import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";
import pluginJsDoc from "eslint-plugin-jsdoc";
import pluginReactJsxRuntimeConfig from "eslint-plugin-react/configs/jsx-runtime.js";
import pluginReactRecommendedConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import path from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
    recommendedConfig: pluginJs.configs.recommended
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    { ignores: ["node_modules/**", "dist/**", "build/**"] },
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.es2021, ...globals.node }
        }
    },
    ...compat.extends(
        "love",
        "plugin:sonarjs/recommended",
        "plugin:deprecation/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:promise/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended"
    ),
    ...compat.plugins(
        "sonarjs",
        "deprecation",
        "import",
        "promise",
        "jsx-a11y"
    ),
    ...tseslint.configs.recommended,
    pluginJsDoc.configs["flat/recommended"],
    pluginReactRecommendedConfig,
    pluginReactJsxRuntimeConfig,
    eslintConfigPrettier,
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx",
            "**/*.mjs",
            "**/*.cjs"
        ],
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                project: "./tsconfig.eslint.json",
                projectRootDir: dirname,
                sourceType: "module"
            }
        },
        rules: {
            "import/no-unresolved": 0,
            "@typescript-eslint/consistent-type-definitions": [2, "type"]
        },
        settings: {
            react: {
                version: "detect"
            },
            "import/ignore": [
                "html-webpack-plugin",
                "css-minimizer-webpack-plugin",
                "mini-css-extract-plugin",
                "webpack"
            ]
        }
    },
    {
        files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": 0
        }
    },
    {
        files: [
            "**/__tests__/**/*.[jt]s?(x)",
            "**/?(*.)+(spec|test).[jt]s?(x)"
        ],
        ...pluginJest.configs["flat/recommended"]
    }
];
