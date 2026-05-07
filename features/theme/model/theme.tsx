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

export type Theme = 'light' | 'dark'
export type ThemeMode = Theme | 'system'

const defaultStorageKey = 'fsd-next-storybook-theme'
const themeModeChangeEvent = 'fsd-theme-mode-change'

const subscribeToSystemTheme = (onStoreChange: () => void) => {
	const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')
	mediaQueryList.addEventListener('change', onStoreChange)
	return () => {
		mediaQueryList.removeEventListener('change', onStoreChange)
	}
}

const getSystemThemeSnapshot = (): Theme => {
	const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')
	return mediaQueryList.matches ? 'dark' : 'light'
}

const useSystemTheme = () => {
	return useSyncExternalStore<Theme>(
		subscribeToSystemTheme,
		getSystemThemeSnapshot,
		() => 'light',
	)
}

const useThemeMode = (storageKey: string, changeEvent: string) => {
	const subscribeToStoredMode = useCallback(
		(onStoreChange: () => void) => {
			addEventListener('storage', onStoreChange)
			addEventListener(changeEvent, onStoreChange)
			return () => {
				removeEventListener('storage', onStoreChange)
				removeEventListener(changeEvent, onStoreChange)
			}
		},
		[changeEvent],
	)

	const getThemeModeSnapshot = useCallback((): ThemeMode => {
		try {
			const storedMode = localStorage.getItem(storageKey)
			return storedMode === 'light' || storedMode === 'dark' ?
					storedMode
				:	'system'
		} catch {
			return 'system'
		}
	}, [storageKey])

	return useSyncExternalStore<ThemeMode>(
		subscribeToStoredMode,
		getThemeModeSnapshot,
		() => 'system',
	)
}

const applyTheme = (theme: Theme) => {
	document.documentElement.classList.toggle('dark', theme === 'dark')
	document.documentElement.style.colorScheme = theme
}

interface ThemeContextValue {
	mode: ThemeMode
	theme: Theme
	setMode: (mode: ThemeMode) => void
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
	children: ReactNode
	storageKey?: string
}

export function ThemeProvider({
	children,
	storageKey = defaultStorageKey,
}: ThemeProviderProps) {
	const changeEvent =
		storageKey === defaultStorageKey ? themeModeChangeEvent : (
			`${themeModeChangeEvent}:${storageKey}`
		)

	const mode = useThemeMode(storageKey, changeEvent)
	const systemTheme = useSystemTheme()

	const theme = mode === 'system' ? systemTheme : mode

	useEffect(() => {
		applyTheme(theme)
	}, [theme])

	const setMode = useCallback(
		(nextMode: ThemeMode) => {
			try {
				if (nextMode === 'system') {
					localStorage.removeItem(storageKey)
				} else {
					localStorage.setItem(storageKey, nextMode)
				}
			} catch {}

			dispatchEvent(new Event(changeEvent))
		},
		[changeEvent, storageKey],
	)

	const toggleTheme = useCallback(() => {
		setMode(theme === 'dark' ? 'light' : 'dark')
	}, [theme, setMode])

	const value = useMemo(
		() => ({
			mode,
			theme,
			setMode,
			toggleTheme,
		}),
		[mode, theme, setMode, toggleTheme],
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

const applyInitialTheme = (storageKey: string) => {
	try {
		const storedMode = localStorage.getItem(storageKey)

		const systemTheme =
			matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

		const theme =
			storedMode === 'light' || storedMode === 'dark' ? storedMode : systemTheme

		document.documentElement.classList.toggle('dark', theme === 'dark')
		document.documentElement.style.colorScheme = theme
	} catch {}
}

export const themeBootScript = `(${applyInitialTheme.toString()})('${defaultStorageKey}')`
