import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/contexts/themeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteMetadata } from '@/data/meta/siteMetaData';
import './globals.css';

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
});

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
			<body
				className={`${pretendard.className} bg-background transition-colors duration-500`}
			>
				<ThemeProvider>
					{children}
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
