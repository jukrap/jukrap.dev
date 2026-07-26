import type { Metadata } from 'next';
import { ProjectsIndexPage } from '@/components/graphic/pages/projectsIndexPage';
import { dictionaries } from '@/data/i18n/dictionaries';
import { isLocale } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string }>;
}
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? dictionaries[locale].metadata.projects : {};
}
export default function Page() {
	return <ProjectsIndexPage />;
}
