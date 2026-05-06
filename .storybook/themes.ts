import { create } from 'storybook/theming'

const fontBase =
	'Arial, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
const fontCode = '"SFMono-Regular", Consolas, "Liberation Mono", monospace'

export const storybookLightTheme = create({
	base: 'light',
	brandTitle: 'FSD Next Storybook',
	appBg: '#ffffff',
	appContentBg: '#ffffff',
	appPreviewBg: '#ffffff',
	appBorderColor: '#e4e4e7',
	appBorderRadius: 6,
	barBg: '#ffffff',
	barTextColor: '#52525b',
	barSelectedColor: '#2563eb',
	barHoverColor: '#18181b',
	colorPrimary: '#2563eb',
	colorSecondary: '#2563eb',
	fontBase,
	fontCode,
	inputBg: '#ffffff',
	inputBorder: '#d4d4d8',
	inputBorderRadius: 6,
	inputTextColor: '#18181b',
	textColor: '#18181b',
	textInverseColor: '#ffffff',
})

export const storybookDarkTheme = create({
	base: 'dark',
	brandTitle: 'FSD Next Storybook',
	appBg: '#18181b',
	appContentBg: '#09090b',
	appPreviewBg: '#09090b',
	appBorderColor: '#3f3f46',
	appBorderRadius: 6,
	barBg: '#18181b',
	barTextColor: '#d4d4d8',
	barSelectedColor: '#60a5fa',
	barHoverColor: '#f4f4f5',
	colorPrimary: '#60a5fa',
	colorSecondary: '#60a5fa',
	fontBase,
	fontCode,
	inputBg: '#09090b',
	inputBorder: '#3f3f46',
	inputBorderRadius: 6,
	inputTextColor: '#fafafa',
	textColor: '#fafafa',
	textInverseColor: '#18181b',
})
