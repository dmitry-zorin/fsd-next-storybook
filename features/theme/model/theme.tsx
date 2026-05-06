'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useSyncExternalStore,
	type ReactNode,
} from 'react'

export type ThemeMode = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const storageKey = 'fsd-next-storybook-theme'
const themeModeChangeEvent = 'fsd-theme-mode-change'

interface ThemeContextValue {
	mode: ThemeMode
	resolvedTheme: ResolvedTheme
	setMode: (mode: ThemeMode) => void
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const getSystemTheme = (): ResolvedTheme => {
	if (typeof window === 'undefined') {
		return 'light'
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ?
			'dark'
		:	'light'
}

const getStoredMode = (): ThemeMode => {
	if (typeof window === 'undefined') {
		return 'system'
	}

	let storedMode: string | null = null

	try {
		storedMode = window.localStorage.getItem(storageKey)
	} catch {
		return 'system'
	}

	return storedMode === 'light' || storedMode === 'dark' ? storedMode : 'system'
}

const applyTheme = (theme: ResolvedTheme) => {
	document.documentElement.classList.toggle('dark', theme === 'dark')
	document.documentElement.style.colorScheme = theme
}

const subscribeToSystemTheme = (onStoreChange: () => void) => {
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

	mediaQuery.addEventListener('change', onStoreChange)

	return () => {
		mediaQuery.removeEventListener('change', onStoreChange)
	}
}

const subscribeToThemeMode = (onStoreChange: () => void) => {
	window.addEventListener('storage', onStoreChange)
	window.addEventListener(themeModeChangeEvent, onStoreChange)

	return () => {
		window.removeEventListener('storage', onStoreChange)
		window.removeEventListener(themeModeChangeEvent, onStoreChange)
	}
}

const getServerSystemTheme = (): ResolvedTheme => 'light'
const getServerThemeMode = (): ThemeMode => 'system'

export function ThemeProvider({ children }: { children: ReactNode }) {
	const mode = useSyncExternalStore(
		subscribeToThemeMode,
		getStoredMode,
		getServerThemeMode,
	)
	const systemTheme = useSyncExternalStore(
		subscribeToSystemTheme,
		getSystemTheme,
		getServerSystemTheme,
	)

	const resolvedTheme = mode === 'system' ? systemTheme : mode

	useEffect(() => {
		applyTheme(resolvedTheme)
	}, [resolvedTheme])

	const setMode = useCallback((nextMode: ThemeMode) => {
		try {
			if (nextMode === 'system') {
				window.localStorage.removeItem(storageKey)
			} else {
				window.localStorage.setItem(storageKey, nextMode)
			}
		} catch {
			// Storage may be unavailable in private or embedded contexts.
		}

		window.dispatchEvent(new Event(themeModeChangeEvent))
	}, [])

	const toggleTheme = useCallback(() => {
		setMode(resolvedTheme === 'dark' ? 'light' : 'dark')
	}, [resolvedTheme, setMode])

	const value = useMemo(
		() => ({
			mode,
			resolvedTheme,
			setMode,
			toggleTheme,
		}),
		[mode, resolvedTheme, setMode, toggleTheme],
	)

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider.')
	}

	return context
}

export const themeBootScript = `
(() => {
  try {
    const storageKey = '${storageKey}';
    const storedMode = window.localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = storedMode === 'light' || storedMode === 'dark' ? storedMode : systemTheme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`
