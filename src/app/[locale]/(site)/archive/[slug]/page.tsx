import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailPage } from '@/components/manuscript/pages';
import { getProjectRecord, projectRecords } from '@/data/manuscript';
import { isLocale, locales } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
	return locales.flatMap((locale) =>
		projectRecords.map((record) => ({ locale, slug: record.slug })),
	);
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const record = getProjectRecord(slug);
	if (!isLocale(locale) || !record) return {};
	return {
		title: `${record.title[locale]} | ${locale === 'ko' ? '박주철' : 'Ju-cheol Park'}`,
		description: record.summary[locale],
	};
}

export default async function ProjectDetail({ params }: PageProps) {
	const { locale, slug } = await params;
	const record = getProjectRecord(slug);
	if (!isLocale(locale) || !record) notFound();
	return <ProjectDetailPage locale={locale} record={record} />;
}
