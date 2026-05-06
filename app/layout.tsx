import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider, themeBootScript } from '@/features/theme'
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
				<Script
					id="theme-boot"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{ __html: themeBootScript }}
				/>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	)
}
