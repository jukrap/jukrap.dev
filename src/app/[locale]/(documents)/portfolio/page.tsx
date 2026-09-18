import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/locale';
import { getRecruitingDocumentManifest } from '@/data/documents/manifest';
import { PortfolioDocument } from '@/components/documents/portfolio';
interface PageProps {
	params: Promise<{ locale: string }>;
}
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const definition = getRecruitingDocumentManifest(locale).documents.find(
		(document) => document.id === 'portfolio',
	)!;
	return {
		title: `${definition.title} | ${locale === 'ko' ? '박주철' : 'Ju-cheol Park'}`,
		description: definition.description,
		alternates: {
			canonical: `https://jukrap.vercel.app${definition.slug}`,
			languages: {
				ko: 'https://jukrap.vercel.app/ko/portfolio',
				en: 'https://jukrap.vercel.app/en/portfolio',
			},
		},
		robots: { index: true, follow: true },
	};
}
export default async function PortfolioPage({ params }: PageProps) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	return <PortfolioDocument locale={locale} />;
}
