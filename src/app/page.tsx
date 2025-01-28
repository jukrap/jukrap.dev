import React from 'react';
import { WelcomeSection } from '@/components/pages/home/welcomeSection';
import { LinksSection } from '@/components/pages/home/linksSection';
import { PortfolioSection } from '@/components/pages/home/portfolioSection';

export default function HomePage() {
	return (
		<main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:pt-36 lg:pb-24 gap-8 md:gap-16 lg:gap-24">
			<WelcomeSection />
			<LinksSection />
			<PortfolioSection />
		</main>
	);
}
