// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'
import storybook from 'eslint-plugin-storybook'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'storybook-static/**',
		'next-env.d.ts',
	]),
	{
		plugins: {
			boundaries,
		},
		settings: {
			'boundaries/elements': [
				{ type: 'app', pattern: 'app/**' },
				{ type: 'features', pattern: 'features/*', capture: ['slice'] },
				{ type: 'stories', pattern: 'stories/**' },
			],
		},
		rules: {
			'boundaries/dependencies': [
				'error',
				{
					default: 'disallow',
					rules: [
						{ from: { type: 'app' }, allow: { to: { type: 'features' } } },
						{
							from: { type: 'stories' },
							allow: { to: { type: 'features' } },
						},
						{
							from: { type: 'features' },
							disallow: [{ to: { type: 'app' } }, { to: { type: 'stories' } }],
						},
					],
				},
			],
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: [
								'@/features/*/ui/*',
								'@/features/*/model/*',
								'@/features/*/lib/*',
							],
							message:
								"Import feature slices through their public API, for example '@/features/auth'.",
						},
					],
				},
			],
		},
	},
	...storybook.configs['flat/recommended'],
])

export default eslintConfig
