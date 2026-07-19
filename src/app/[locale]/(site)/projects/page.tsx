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
		<div className="flex h-full w-full flex-col items-center gap-8 px-4 py-8 sm:gap-12 sm:px-6 sm:py-12 lg:gap-16 lg:px-20 lg:py-20">
			<HeaderSection />
			<ProjectListSection />
		</div>
	);
}
