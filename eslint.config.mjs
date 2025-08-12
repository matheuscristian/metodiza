import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: ["node_modules/**", "**/prisma/**", ".next/**"],
    },

    ...compat.extends("next/core-web-vitals", "next/typescript"),

    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
        rules: {
            // Custom rule to block relative imports
            "no-restricted-imports": [
                "error",
                {
                    patterns: ["../*", "./*"],
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                    argsIgnorePattern: "^_$", // ignore args named "_"
                    varsIgnorePattern: "^_$", // ignore variables named "_"
                },
            ],
        },
    },
];

export default eslintConfig;
