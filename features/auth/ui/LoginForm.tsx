'use client'

import { useId, useState } from 'react'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.email('Enter a valid email address.'),
	password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export type LoginCredentials = z.infer<typeof loginSchema>

export interface LoginFormProps {
	onSubmit: (credentials: LoginCredentials) => void | Promise<void>
	initialEmail?: string
	submitLabel?: string
	disabled?: boolean
}

const resolver: Resolver<LoginCredentials> = async (values) => {
	const result = loginSchema.safeParse(values)

	if (result.success) {
		return {
			values: result.data,
			errors: {},
		}
	}

	const fieldErrors = z.flattenError(result.error).fieldErrors

	return {
		values: {},
		errors: {
			...(fieldErrors.email?.[0] ?
				{
					email: {
						type: 'validation',
						message: fieldErrors.email[0],
					},
				}
			:	{}),
			...(fieldErrors.password?.[0] ?
				{
					password: {
						type: 'validation',
						message: fieldErrors.password[0],
					},
				}
			:	{}),
		},
	}
}

export function LoginForm({
	onSubmit,
	initialEmail = '',
	submitLabel = 'Sign in',
	disabled = false,
}: LoginFormProps) {
	const emailId = useId()
	const passwordId = useId()
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<LoginCredentials>({
		resolver,
		defaultValues: {
			email: initialEmail,
			password: '',
		},
		mode: 'onSubmit',
	})

	const isDisabled = disabled || isSubmitting

	const submit = handleSubmit(async (credentials) => {
		setSuccessMessage(null)
		clearErrors('root')

		try {
			await onSubmit(credentials)
			setSuccessMessage('Signed in successfully.')
		} catch (error) {
			setError('root', {
				type: 'server',
				message:
					error instanceof Error ?
						error.message
					:	'We could not sign you in. Try again.',
			})
		}
	})

	return (
		<form
			className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900"
			onSubmit={submit}
			noValidate
			aria-label="Login form"
		>
			<div className="space-y-1">
				<h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
					Welcome back
				</h2>
				<p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
					Sign in with your email and password.
				</p>
			</div>

			<div className="mt-6 space-y-4">
				<div className="space-y-2">
					<label
						className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
						htmlFor={emailId}
					>
						Email
					</label>
					<input
						id={emailId}
						type="email"
						autoComplete="email"
						disabled={isDisabled}
						aria-invalid={errors.email ? 'true' : 'false'}
						aria-describedby={errors.email ? `${emailId}-error` : undefined}
						className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 transition outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-200/10 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
						{...register('email')}
					/>
					{errors.email?.message ?
						<p
							className="text-sm text-red-600 dark:text-red-400"
							id={`${emailId}-error`}
						>
							{errors.email.message}
						</p>
					:	null}
				</div>

				<div className="space-y-2">
					<label
						className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
						htmlFor={passwordId}
					>
						Password
					</label>
					<input
						id={passwordId}
						type="password"
						autoComplete="current-password"
						disabled={isDisabled}
						aria-invalid={errors.password ? 'true' : 'false'}
						aria-describedby={
							errors.password ? `${passwordId}-error` : undefined
						}
						className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 transition outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-200/10 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
						{...register('password')}
					/>
					{errors.password?.message ?
						<p
							className="text-sm text-red-600 dark:text-red-400"
							id={`${passwordId}-error`}
						>
							{errors.password.message}
						</p>
					:	null}
				</div>
			</div>

			{errors.root?.message ?
				<p
					className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
					role="alert"
				>
					{errors.root.message}
				</p>
			:	null}

			{successMessage ?
				<p
					className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
					role="status"
				>
					{successMessage}
				</p>
			:	null}

			<button
				className="mt-6 h-10 w-full rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
				disabled={isDisabled}
				type="submit"
			>
				{isSubmitting ? 'Signing in...' : submitLabel}
			</button>
		</form>
	)
}
