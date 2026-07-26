import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { CareerBriefDocument } from '@/components/documents/private';
import { careerBriefDocumentDefinition } from '@/data/documents/manifest';
import {
	getPrivateDocumentContact,
	isPrivateDocumentRequestHost,
} from '@/lib/privateDocuments';

interface CareerBriefPageProps {
	params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

const deniedMetadata: Metadata = {
	title: 'Not Found',
	robots: {
		index: false,
		follow: false,
		noarchive: true,
		googleBot: { index: false, follow: false, noarchive: true },
	},
};

async function resolveAccess(params: CareerBriefPageProps['params']) {
	const { locale } = await params;
	const requestHeaders = await headers();
	return locale === 'ko' &&
		isPrivateDocumentRequestHost(requestHeaders.get('host'))
		? getPrivateDocumentContact()
		: null;
}

export async function generateMetadata({
	params,
}: CareerBriefPageProps): Promise<Metadata> {
	const contact = await resolveAccess(params);
	if (!contact) return deniedMetadata;
	return {
		title: `${careerBriefDocumentDefinition.title} | 박주철`,
		description: careerBriefDocumentDefinition.description,
		robots: deniedMetadata.robots,
	};
}

export default async function CareerBriefPage({
	params,
}: CareerBriefPageProps) {
	const contact = await resolveAccess(params);
	if (!contact) notFound();
	return <CareerBriefDocument contact={contact} />;
}
