'use client'

import { useState } from 'react'

import { LoginForm, type LoginCredentials } from '@/features/auth'
import { ThemeSwitch } from '@/features/theme'
import { PageShell } from '@/shared'

export function LoginPage() {
	const [lastLoginEmail, setLastLoginEmail] = useState<string | null>(null)

	const handleSubmit = async (credentials: LoginCredentials) => {
		await new Promise((resolve) => setTimeout(resolve, 500))
		setLastLoginEmail(credentials.email)
	}

	return (
		<PageShell>
			<section className="grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_400px] md:items-center">
				<div className="space-y-6">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<p className="text-sm font-medium tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
							FSD Storybook
						</p>
						<ThemeSwitch />
					</div>
					<div className="space-y-4">
						<h1 className="max-w-xl text-4xl font-semibold text-zinc-950 sm:text-5xl dark:text-zinc-50">
							Auth UI built as a feature slice.
						</h1>
						<p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
							The app route composes the public widget API, while Storybook
							captures the form states and interaction tests.
						</p>
					</div>

					<div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
						{lastLoginEmail ?
							<p>
								Last submitted email:{' '}
								<span className="font-medium text-zinc-950 dark:text-zinc-50">
									{lastLoginEmail}
								</span>
							</p>
						:	<p>No login attempt submitted yet.</p>}
					</div>
				</div>

				<LoginForm
					initialEmail="demo@example.com"
					onSubmit={handleSubmit}
					submitLabel="Continue"
				/>
			</section>
		</PageShell>
	)
}
