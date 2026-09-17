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
		<div className="home-page">
			<WelcomeSection />
			<LinksSection />
			<PortfolioSection />
		</div>
	);
}
