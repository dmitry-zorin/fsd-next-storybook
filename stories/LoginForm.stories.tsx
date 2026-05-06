import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { LoginForm } from '@/features/auth'

const successfulSubmit = fn()

const meta: Meta<typeof LoginForm> = {
	title: 'Auth/LoginForm',
	component: LoginForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onSubmit: fn(),
		submitLabel: 'Sign in',
		disabled: false,
	},
	argTypes: {
		onSubmit: {
			control: false,
		},
	},
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Empty: Story = {}

export const FilledValid: Story = {
	args: {
		initialEmail: 'demo@example.com',
	},
}

export const Loading: Story = {
	args: {
		disabled: true,
		initialEmail: 'demo@example.com',
		submitLabel: 'Signing in...',
	},
}

export const ValidationErrors: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		await userEvent.click(canvas.getByRole('button', { name: /sign in/i }))

		await expect(
			canvas.getByText('Enter a valid email address.'),
		).toBeInTheDocument()
		await expect(
			canvas.getByText('Password must be at least 8 characters.'),
		).toBeInTheDocument()
	},
}

export const ServerError: Story = {
	args: {
		onSubmit: async () => {
			throw new Error('Invalid email or password.')
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)

		await userEvent.type(canvas.getByLabelText(/email/i), 'demo@example.com')
		await userEvent.type(canvas.getByLabelText(/password/i), 'password123')
		await userEvent.click(canvas.getByRole('button', { name: /sign in/i }))

		await expect(canvas.getByRole('alert')).toHaveTextContent(
			'Invalid email or password.',
		)
	},
}

export const SuccessfulSubmit: Story = {
	args: {
		onSubmit: successfulSubmit,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)

		await userEvent.type(canvas.getByLabelText(/email/i), 'demo@example.com')
		await userEvent.type(canvas.getByLabelText(/password/i), 'password123')
		await userEvent.click(canvas.getByRole('button', { name: /sign in/i }))

		await waitFor(() => {
			expect(successfulSubmit).toHaveBeenCalledWith({
				email: 'demo@example.com',
				password: 'password123',
			})
		})
		await expect(canvas.getByRole('status')).toHaveTextContent(
			'Signed in successfully.',
		)
	},
}
