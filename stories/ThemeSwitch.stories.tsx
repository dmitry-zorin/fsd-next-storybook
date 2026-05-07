import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { expect, userEvent, within } from 'storybook/test'

import { ThemeSwitch } from '@/features/theme'

const meta: Meta<typeof ThemeSwitch> = {
	title: 'Theme/ThemeSwitch',
	component: ThemeSwitch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ThemeSwitch>

export const Default: Story = {}

export const SelectTheme: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		const darkOption = canvas.getByRole('radio', {
			name: /dark/i,
		})
		const systemOption = canvas.getByRole('radio', {
			name: /system/i,
		})

		await userEvent.click(darkOption)
		await expect(darkOption).toHaveAttribute('aria-checked', 'true')

		await userEvent.click(systemOption)

		await expect(systemOption).toHaveAttribute('aria-checked', 'true')
	},
}
