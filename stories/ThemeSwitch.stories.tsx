import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { expect, userEvent, within } from 'storybook/test';

import { ThemeSwitch } from '@/features/theme';

const meta: Meta<typeof ThemeSwitch> = {
  title: 'Theme/ThemeSwitch',
  component: ThemeSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeSwitch>;

export const Default: Story = {};

export const ToggleTheme: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const themeSwitch = canvas.getByRole('switch', { name: /toggle dark theme/i });
    const initialState = themeSwitch.getAttribute('aria-checked');

    await userEvent.click(themeSwitch);

    await expect(themeSwitch).toHaveAttribute(
      'aria-checked',
      initialState === 'true' ? 'false' : 'true',
    );
  },
};
