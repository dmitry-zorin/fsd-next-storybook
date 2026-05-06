import type { Preview } from '@storybook/nextjs-vite'
import {
	DocsContainer,
	type DocsContainerProps,
} from '@storybook/addon-docs/blocks'
import { useEffect, type ReactNode } from 'react'
import { useDarkMode } from 'storybook-dark-mode'

import { ThemeProvider, useTheme } from '@/features/theme'
import '../app/globals.css'
import { storybookDarkTheme, storybookLightTheme } from './themes'

function StorybookThemeSync() {
	const isDark = useDarkMode()
	const { setMode } = useTheme()

	useEffect(() => {
		setMode(isDark ? 'dark' : 'light')
	}, [isDark, setMode])

	return null
}

function StorybookThemeProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<StorybookThemeSync />
			<div className="bg-background text-foreground p-6 transition-colors">
				{children}
			</div>
		</ThemeProvider>
	)
}

function ThemedDocsContainer(props: DocsContainerProps) {
	const isDark = useDarkMode()

	return (
		<DocsContainer
			{...props}
			theme={isDark ? storybookDarkTheme : storybookLightTheme}
		/>
	)
}

const preview: Preview = {
	decorators: [
		(Story) => (
			<StorybookThemeProvider>
				<Story />
			</StorybookThemeProvider>
		),
	],
	parameters: {
		darkMode: {
			classTarget: 'html',
			dark: storybookDarkTheme,
			darkClass: 'dark',
			light: storybookLightTheme,
			lightClass: 'light',
			stylePreview: true,
		},
		docs: {
			container: ThemedDocsContainer,
			theme: storybookLightTheme,
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
}

export default preview
