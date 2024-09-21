'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingScreen from '@/components/loadingScreen';
import MobileWarningModal from '@/components/mobileWarningModal';
import useIsMobile from '@/hook/useIsMobile';
import AlertBanner from '@/components/AlertBanner';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [showMobileWarning, setShowMobileWarning] = useState(false);
	const isMobile = useIsMobile();

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
				<Navbar />
        <AlertBanner message="😭 *[깃허브 계정 정지]*:__https://valur.tistory.com/entry/Github-Organization%EC%9D%98-%EB%A9%A4%EB%B2%84-%EC%B4%88%EB%8C%80%EC%97%90%EC%84%9C-You-cant-do-that-at-this-time-%EA%B2%BD%EA%B3%A0__(섀도밴)로 인해, 깃허브 관련 링크가 작동하지 않는 상황입니다. 불편을 드려 죄송합니다." />
				<main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{children}
				</main>
				<Footer />
			</div>
			<MobileWarningModal
				isOpen={showMobileWarning}
				onClose={handleCloseMobileWarning}
			/>
		</>
	);
};

export default LayoutWrapper;
