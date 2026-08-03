// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
    { ignores: ["dist/**", "node_modules/**"] }, // flat-config replacement for .eslintignore
    js.configs.recommended, // core JS rules
    tseslint.configs.recommended, // TypeScript parser + TS-aware rules
    prettier, // MUST be last: turns off rules that clash with Prettier
    {
        rules: {
            // your overrides — e.g. allow intentionally-unused args prefixed with _
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
);
