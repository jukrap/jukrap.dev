'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingScreen from '@/components/loadingScreen';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
			<div
				className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
			>
				<Navbar />
				{children}
				<Footer />
			</div>
		</>
	);
};

export default LayoutWrapper;
