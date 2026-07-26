import type { Metadata } from 'next';
import { CasesPage } from '@/components/manuscript/pages';
import { isLocale } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: locale === 'ko' ? 'CASES | 박주철' : 'CASES | Ju-cheol Park',
		description:
			locale === 'ko'
				? '웹과 모바일 프론트엔드 업무 사례'
				: 'Selected web and mobile frontend case studies',
	};
}

export default async function Cases({ params }: PageProps) {
	const { locale } = await params;
	if (!isLocale(locale)) return null;
	return <CasesPage locale={locale} />;
}
