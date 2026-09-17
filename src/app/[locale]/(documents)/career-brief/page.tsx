import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { CareerBriefDocument } from '@/components/documents/private';
import { careerBriefDocumentDefinition } from '@/data/documents/manifest';
import { getRecruitingDocumentContact } from '@/lib/privateDocuments';

interface CareerBriefPageProps {
	params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `${careerBriefDocumentDefinition.title} | 박주철`,
	description: careerBriefDocumentDefinition.description,
	robots: {
		index: false,
		follow: false,
		noarchive: true,
		googleBot: {
			index: false,
			follow: false,
			noarchive: true,
		},
	},
};

export default async function CareerBriefPage({
	params,
}: CareerBriefPageProps) {
	const { locale } = await params;
	if (locale !== 'ko') {
		notFound();
	}
	const requestHeaders = await headers();
	const contact = getRecruitingDocumentContact(requestHeaders.get('host'));

	return <CareerBriefDocument contact={contact} />;
}
