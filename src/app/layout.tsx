import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/contexts/themeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteMetadata } from '@/data/meta/siteMetaData';
import './pretendard.css';
import './globals.css';

export const metadata = siteMetadata;

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: true,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className="bg-background transition-colors duration-500">
				<ThemeProvider>
					{children}
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
