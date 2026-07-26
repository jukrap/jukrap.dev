import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { ThemeProvider } from '@/contexts/themeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteMetadata } from '@/data/meta/siteMetaData';
import '@fontsource-variable/archivo';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './pretendard.css';
import './globals.css';
import './graphic.css';

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

const themeBootScript = `
(() => {
	try {
		const key = 'jukrap.theme.graphic';
		const stored = localStorage.getItem(key);
		const preference = stored === 'light' || stored === 'dark' ? stored : 'system';
		const resolved = preference === 'system'
			? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
			: preference;
		const root = document.documentElement;
		root.dataset.theme = resolved;
		root.dataset.themePreference = preference;
		root.classList.toggle('dark', resolved === 'dark');
		root.style.colorScheme = resolved;
	} catch {
		const root = document.documentElement;
		root.dataset.theme = 'dark';
		root.dataset.themePreference = 'system';
		root.classList.add('dark');
		root.style.colorScheme = 'dark';
	}
})();`;

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const requestHeaders = await headers();
	const locale = requestHeaders.get('x-site-locale') === 'en' ? 'en' : 'ko';

	return (
		<html
			lang={locale}
			data-theme="dark"
			data-theme-preference="system"
			data-scroll-behavior="smooth"
			data-design-branch="restrained-graphic-realism"
			suppressHydrationWarning
		>
			<head>
				<script
					id="graphic-theme-boot"
					dangerouslySetInnerHTML={{ __html: themeBootScript }}
				/>
			</head>
			<body className="graphic-body">
				<ThemeProvider>
					{children}
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
