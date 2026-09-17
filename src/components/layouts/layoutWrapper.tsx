'use client';

import { useLocale } from '@/contexts/localeContext';
import { usePathname } from 'next/navigation';
import Footer from '@/components/layouts/footer';
import { NavigationBar } from './navigationBar';
import AlertTopBanner from '@/components/common/alertTopBanner';

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { dictionary, locale } = useLocale();
	const pathname = usePathname();
	const isHome = pathname === `/${locale}` || pathname === '/';

	return (
		<div className="site-shell flex min-h-screen flex-col">
			<NavigationBar />
			<AlertTopBanner
				message={dictionary.alerts.aiAgentPlaybook}
				closeLabel={dictionary.alerts.close}
			/>
			<main
				className={
					isHome
						? 'site-home-main mx-auto w-full flex-grow'
						: 'mx-auto w-full max-w-7xl flex-grow px-4 sm:px-6 lg:px-8'
				}
			>
				{children}
			</main>
			<Footer />
		</div>
	);
};

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => <LayoutContent>{children}</LayoutContent>;

export default LayoutWrapper;
