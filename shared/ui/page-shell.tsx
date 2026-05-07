import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface PageShellProps {
	children: ReactNode
	className?: string
}

export function PageShell({ children, className }: PageShellProps) {
	return (
		<main
			className={cn(
				'flex min-h-dvh flex-1 items-center justify-center bg-zinc-100 px-6 py-12 font-sans transition-colors dark:bg-zinc-950',
				className,
			)}
		>
			{children}
		</main>
	)
}
