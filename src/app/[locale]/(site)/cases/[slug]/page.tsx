import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseDetailPage } from '@/components/manuscript/pages';
import { caseStudyRecords, getCaseStudy } from '@/data/manuscript';
import { isLocale, locales } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
	return locales.flatMap((locale) =>
		caseStudyRecords.map((record) => ({ locale, slug: record.slug })),
	);
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const record = getCaseStudy(slug);
	if (!isLocale(locale) || !record) return {};
	return {
		title: `${record.title[locale]} | ${locale === 'ko' ? '박주철' : 'Ju-cheol Park'}`,
		description: record.summary[locale],
	};
}

export default async function CaseDetail({ params }: PageProps) {
	const { locale, slug } = await params;
	const record = getCaseStudy(slug);
	if (!isLocale(locale) || !record) notFound();
	return <CaseDetailPage locale={locale} record={record} />;
}
