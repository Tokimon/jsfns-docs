import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.ts';

const svelteFiles = ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'];

export default ts.config(
	{ ignores: ['docs/**', '.svelte-kit/**'] },
	{
		files: svelteFiles,
		extends: [js.configs.recommended, ...ts.configs.recommended, ...svelte.configs.recommended],
		languageOptions: {
			globals: { ...globals.browser },
			parserOptions: {
				parser: ts.parser,
				extraFileExtensions: ['.svelte'],
				svelteConfig,
			},
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
			// {@html} renders typedoc/markdown output generated at build time, not user input
			'svelte/no-at-html-tags': 'off',
		},
	},
);
