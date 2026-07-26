import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDetailPage } from '@/components/graphic/pages/workDetailPage';
import { caseStudyRecords } from '@/data/graphicPortfolio';
import { isLocale } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
	return caseStudyRecords.flatMap((record) =>
		['ko', 'en'].map((locale) => ({ locale, slug: record.slug })),
	);
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!isLocale(locale)) return {};
	const record = caseStudyRecords.find((candidate) => candidate.slug === slug);
	return record
		? {
				title: `${record.title[locale]} | Work`,
				description: record.summary[locale],
			}
		: {};
}

export default async function Page({ params }: PageProps) {
	const { locale, slug } = await params;
	if (!isLocale(locale)) notFound();
	const record = caseStudyRecords.find((candidate) => candidate.slug === slug);
	if (!record) notFound();
	return <WorkDetailPage record={record} locale={locale} />;
}
