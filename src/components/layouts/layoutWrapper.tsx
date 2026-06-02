'use client';

import { useState, useEffect } from 'react';
import useIsMobile from '@/hook/useIsMobile';
import { LocaleProvider, useLocale } from '@/contexts/localeContext';
import Footer from '@/components/layouts/footer';
import { NavigationBar } from './navigationBar';
import LoadingScreen from '@/components/common/loadingScreen';
import AlertTopBanner from '@/components/common/alertTopBanner';
import { Locale } from '@/types/locale';
//import MobileWarningModal from '@/components/mobileWarningModal';

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [showMobileWarning, setShowMobileWarning] = useState(false);
	const isMobile = useIsMobile();
	const { dictionary } = useLocale();

	useEffect(() => {
		const lastDismissed = localStorage.getItem('mobileWarningDismissed');
		const showWarning =
			isMobile &&
			(!lastDismissed ||
				new Date(lastDismissed).getTime() + 86400000 < Date.now());
		setShowMobileWarning(showWarning);
	}, [isMobile]);

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	const handleCloseMobileWarning = () => {
		setShowMobileWarning(false);
	};

	return (
		<>
			{isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
			<div
				className={`flex flex-col min-h-screen transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
			>
				<NavigationBar />
				<AlertTopBanner
					message={dictionary.alerts.aiAgentPlaybook}
					closeLabel={dictionary.alerts.close}
				/>
				<main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{children}
				</main>
				<Footer />
			</div>
			{/* <MobileWarningModal
				isOpen={showMobileWarning}
				onClose={handleCloseMobileWarning}
			/> */}
		</>
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
