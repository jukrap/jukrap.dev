import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/contexts/themeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteMetadata } from '@/data/meta/siteMetaData';
import { themeInitializationScript } from '@/lib/themeInitialization';
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
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
				<link
					rel="preload"
					href="/fonts/documents/Freesentation-400.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/documents/Paperlogy-700.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
			</head>
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
