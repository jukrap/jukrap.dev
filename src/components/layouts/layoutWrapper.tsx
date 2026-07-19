'use client';

import { LocaleProvider, useLocale } from '@/contexts/localeContext';
import Footer from '@/components/layouts/footer';
import { NavigationBar } from './navigationBar';
import AlertTopBanner from '@/components/common/alertTopBanner';
import { Locale } from '@/types/locale';

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { dictionary } = useLocale();

	return (
		<div className="flex min-h-screen flex-col">
			<NavigationBar />
			<AlertTopBanner
				message={dictionary.alerts.aiAgentPlaybook}
				closeLabel={dictionary.alerts.close}
			/>
			<main className="mx-auto w-full max-w-7xl flex-grow px-4 sm:px-6 lg:px-8">
				{children}
			</main>
			<Footer />
		</div>
	);
};

const LayoutWrapper: React.FC<{
	children: React.ReactNode;
	locale: Locale;
}> = ({ children, locale }) => (
	<LocaleProvider locale={locale}>
		<LayoutContent>{children}</LayoutContent>
	</LocaleProvider>
);

export default LayoutWrapper;
