import type { Metadata } from 'next';
import { ArchivePage } from '@/components/manuscript/pages';
import { isLocale } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: locale === 'ko' ? 'ARCHIVE | 박주철' : 'ARCHIVE | Ju-cheol Park',
		description:
			locale === 'ko'
				? '웹, 모바일, 개발 도구 개인 프로젝트 기록'
				: 'Personal work across web, mobile, and developer tooling',
	};
}

export default async function Archive({ params }: PageProps) {
	const { locale } = await params;
	if (!isLocale(locale)) return null;
	return <ArchivePage locale={locale} />;
}
