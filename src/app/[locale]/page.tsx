import { Metadata } from 'next';
import { dictionaries } from '@/data/i18n/dictionaries';
import { isLocale } from '@/lib/locale';
import { LinksSection } from '@/components/pages/home/linksSection';
import { PortfolioSection } from '@/components/pages/home/portfolioSection';
import { WelcomeSection } from '@/components/pages/home/welcomeSection';

interface LocalePageProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? dictionaries[locale].metadata.home : {};
}

export default function LocalizedHomePage() {
	return (
		<div className="flex flex-col items-center gap-8 px-4 py-8 sm:px-6 md:gap-16 md:py-16 lg:gap-24 lg:px-8 lg:pb-24 lg:pt-36">
			<WelcomeSection />
			<LinksSection />
			<PortfolioSection />
		</div>
	);
}
