import type { Metadata } from 'next';
import { WorkPage } from '@/components/pages/work/workPage';
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
	return isLocale(locale) ? dictionaries[locale].metadata.work : {};
}

export default function Work() {
	return <WorkPage />;
}
