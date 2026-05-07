'use client'

import { Monitor, Moon, Sun } from 'lucide-react'

import { cn } from '@/shared'
import { useTheme } from '../model/theme'

const themeModes = [
	{ icon: Monitor, label: 'System', value: 'system' },
	{ icon: Sun, label: 'Light', value: 'light' },
	{ icon: Moon, label: 'Dark', value: 'dark' },
] as const

export function ThemeSwitch() {
	const { mode, setMode } = useTheme()

	return (
		<div
			role="radiogroup"
			aria-label="Theme"
			className="inline-flex h-10 items-center rounded-full border border-zinc-300 bg-white p-1 text-sm font-medium text-zinc-700 shadow-sm transition dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
		>
			{themeModes.map(({ icon: Icon, label, value }) => {
				const isSelected = mode === value

				return (
					<button
						key={value}
						title={label}
						type="button"
						role="radio"
						aria-checked={isSelected}
						aria-label={label}
						onClick={() => setMode(value)}
						className={cn(
							'h-8 rounded-full px-3 transition',
							'inline-flex items-center gap-2',
							isSelected ?
								'bg-zinc-950 text-white shadow-sm dark:bg-zinc-50 dark:text-zinc-950'
							:	'cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800',
						)}
					>
						<Icon size={14} aria-hidden />
					</button>
				)
			})}
		</div>
	)
}
