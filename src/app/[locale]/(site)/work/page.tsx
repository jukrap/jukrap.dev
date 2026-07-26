import type { Metadata } from 'next';
import { WorkIndexPage } from '@/components/graphic/pages/workIndexPage';
import { dictionaries } from '@/data/i18n/dictionaries';
import { isLocale } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string }>;
}
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? dictionaries[locale].metadata.work : {};
}
export default function Page() {
	return <WorkIndexPage />;
}
