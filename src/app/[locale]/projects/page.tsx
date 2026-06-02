import type { Metadata } from 'next';
import { HeaderSection } from '@/components/pages/projects/headerSection';
import { ProjectListSection } from '@/components/pages/projects/projectListSection';
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
	return isLocale(locale) ? dictionaries[locale].metadata.projects : {};
}

export default function Projects() {
	return (
		<div className="flex flex-col items-center px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-20 w-full h-full gap-8 sm:gap-12 lg:gap-16">
			<HeaderSection />
			<ProjectListSection />
		</div>
	);
}
