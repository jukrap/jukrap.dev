import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/locale';
import { getRecruitingDocumentManifest } from '@/data/documents/manifest';
import { CareerBriefDocument } from '@/components/documents/private';
import { headers } from 'next/headers';
import { getRecruitingDocumentContact } from '@/lib/privateDocuments';
export const dynamic = 'force-dynamic';
interface PageProps {
	params: Promise<{ locale: string }>;
}
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const definition = getRecruitingDocumentManifest(locale).documents.find(
		(document) => document.id === 'career-brief',
	)!;
	return {
		title: `${definition.title} | ${locale === 'ko' ? '박주철' : 'Ju-cheol Park'}`,
		description: definition.description,
		alternates: {
			canonical: `https://jukrap.vercel.app${definition.slug}`,
			languages: {
				ko: 'https://jukrap.vercel.app/ko/career-brief',
				en: 'https://jukrap.vercel.app/en/career-brief',
			},
		},
		robots: {
			index: false,
			follow: false,
			noarchive: true,
			googleBot: { index: false, follow: false, noarchive: true },
		},
	};
}
export default async function CareerBriefPage({ params }: PageProps) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const requestHeaders = await headers();
	const contact = getRecruitingDocumentContact(
		requestHeaders.get('host'),
		locale,
	);
	return <CareerBriefDocument locale={locale} contact={contact} />;
}
