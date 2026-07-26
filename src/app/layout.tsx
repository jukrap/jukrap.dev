import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { ThemeProvider } from '@/contexts/themeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteMetadata } from '@/data/meta/siteMetaData';
import '@fontsource-variable/noto-serif-kr/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './pretendard.css';
import './globals.css';
import './manuscript.css';
import './manuscript-theme.css';

const themeBootScript = `
(() => {
	try {
		const key = 'jukrap.theme.manuscript';
		const stored = localStorage.getItem(key);
		const preference = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
		const dark = preference === 'dark' || (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
		document.documentElement.dataset.themePreference = preference;
		document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
	} catch {}
})();
`;

export const metadata = siteMetadata;

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	userScalable: true,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const requestHeaders = await headers();
	const locale =
		requestHeaders.get('x-jukrap-site-locale') === 'en' ? 'en' : 'ko';

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
			</head>
			<body>
				<ThemeProvider>
					{children}
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
