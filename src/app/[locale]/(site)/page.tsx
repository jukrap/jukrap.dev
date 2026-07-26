import { Metadata } from 'next';
import { IndexPage } from '@/components/manuscript/pages';
import { dictionaries } from '@/data/i18n/dictionaries';
import { isLocale } from '@/lib/locale';

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

export default async function LocalizedHomePage({ params }: LocalePageProps) {
	const { locale } = await params;
	if (!isLocale(locale)) return null;

	return <IndexPage locale={locale} />;
}
