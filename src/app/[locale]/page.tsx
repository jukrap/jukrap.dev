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
		<main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:pt-36 lg:pb-24 gap-8 md:gap-16 lg:gap-24">
			<WelcomeSection />
			<LinksSection />
			<PortfolioSection />
		</main>
	);
}
