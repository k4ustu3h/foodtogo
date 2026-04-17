import path from "node:path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineFlatConfig } from "eslint-define-config";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
	baseDirectory,
	resolvePluginsRelativeTo: baseDirectory,
});

export default defineFlatConfig([
	compat.config({
		overrides: [{ extends: "next/core-web-vitals" }],
	}),
]);
