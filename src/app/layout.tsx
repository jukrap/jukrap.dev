import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-context';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LayoutWrapper from '@/components/layoutWrapper';
import './globals.css';

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
});

export const metadata: Metadata = {
	title: 'Ju-cheol Park | Frontend engineer',
	description: "Frontend engineer, This is Jukrap's website.",
	icons: {
		icon: '/favicon.ico',
	},
	viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body
				className={`${pretendard.className} bg-background transition-colors duration-500`}
			>
				<ThemeProvider>
					<div className="flex flex-col min-h-screen">
						<LayoutWrapper>{children}</LayoutWrapper>
					</div>
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
