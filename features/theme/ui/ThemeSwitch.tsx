'use client'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '../model/theme'

export function ThemeSwitch() {
	const { mode, resolvedTheme, toggleTheme } = useTheme()
	const isDark = resolvedTheme === 'dark'
	const modeLabel =
		mode === 'system' ? 'System'
		: mode === 'dark' ? 'Dark'
		: 'Light'

	return (
		<button
			type="button"
			role="switch"
			aria-checked={isDark}
			aria-label="Toggle dark theme"
			onClick={toggleTheme}
			className="inline-flex h-10 items-center gap-3 rounded-full border border-zinc-300 bg-white py-1 pr-3 pl-1 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500"
		>
			<span
				className={`flex h-8 w-14 items-center rounded-full p-1 transition ${
					isDark ? 'bg-zinc-950 dark:bg-zinc-50' : 'bg-zinc-100'
				}`}
				aria-hidden
			>
				<span
					className={`grid size-6 place-items-center rounded-full bg-white text-zinc-800 shadow-sm transition dark:bg-zinc-950 dark:text-zinc-100 ${
						isDark ? 'translate-x-6' : 'translate-x-0'
					}`}
				>
					{isDark ?
						<Moon size={14} />
					:	<Sun size={14} />}
				</span>
			</span>
			<span>{modeLabel}</span>
		</button>
	)
}
