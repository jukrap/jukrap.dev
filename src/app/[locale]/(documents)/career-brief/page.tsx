import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { CareerBriefDocument } from '@/components/documents/private';
import {
	getPrivateDocumentContact,
	isPrivateDocumentRequestHost,
} from '@/lib/privateDocuments';

interface CareerBriefPageProps {
	params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: '경력기술서 | 박주철',
	description: '로컬에서만 열리는 비공개 경력기술서',
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
	const requestHeaders = await headers();
	const contact =
		locale === 'ko' && isPrivateDocumentRequestHost(requestHeaders.get('host'))
			? getPrivateDocumentContact()
			: null;

	if (!contact) {
		notFound();
	}

	return <CareerBriefDocument contact={contact} />;
}
