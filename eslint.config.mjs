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
				{ type: 'widgets', pattern: 'widgets/*', capture: ['slice'] },
				{ type: 'features', pattern: 'features/*', capture: ['slice'] },
				{ type: 'entities', pattern: 'entities/*', capture: ['slice'] },
				{ type: 'shared', pattern: 'shared/**' },
				{ type: 'stories', pattern: 'stories/**' },
			],
		},
		rules: {
			'boundaries/dependencies': [
				'error',
				{
					default: 'disallow',
					rules: [
						{
							from: { type: 'app' },
							allow: {
								to: { type: ['widgets', 'features', 'entities', 'shared'] },
							},
						},
						{
							from: { type: 'widgets' },
							allow: {
								to: { type: ['widgets', 'features', 'entities', 'shared'] },
							},
						},
						{
							from: { type: 'features' },
							allow: { to: { type: ['features', 'entities', 'shared'] } },
						},
						{
							from: { type: 'entities' },
							allow: { to: { type: ['entities', 'shared'] } },
						},
						{
							from: { type: 'shared' },
							allow: { to: { type: 'shared' } },
						},
						{
							from: { type: 'stories' },
							allow: {
								to: { type: ['widgets', 'features', 'entities', 'shared'] },
							},
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
								'@/widgets/*/ui/*',
								'@/widgets/*/model/*',
								'@/widgets/*/lib/*',
								'@/entities/*/ui/*',
								'@/entities/*/model/*',
								'@/entities/*/lib/*',
								'@/shared/*',
							],
							message:
								"Import feature, widget, and entity slices through their public API, for example '@/features/auth', '@/widgets/login-page', or '@/entities/user', and import shared through '@/shared'.",
						},
					],
				},
			],
		},
	},
	...storybook.configs['flat/recommended'],
])

export default eslintConfig
