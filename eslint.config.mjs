import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ ignores: ['dist', 'node_modules', 'coverage'] },
	{
		settings: {
			react: { version: 'detect' },
		},
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'no-async-promise-executor': 'off',
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
