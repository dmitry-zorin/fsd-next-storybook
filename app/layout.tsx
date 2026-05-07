import { ThemeProvider, themeBootScript } from '@/features/theme'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'FSD Storybook Auth',
	description:
		'A Next.js and Storybook playground using Feature-Sliced Design.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="h-full antialiased" suppressHydrationWarning>
			<body className="flex min-h-full flex-col">
				<script id="theme-boot">{themeBootScript}</script>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	)
}
