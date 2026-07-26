import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CareerBriefDocument } from '@/components/documents/private';
import { careerBriefDocumentDefinition } from '@/data/documents/manifest';
import {
	getAuthorizedPrivateDocumentContact,
	getPrivateDocumentMetadata,
} from '@/lib/privateDocumentRequest';

interface CareerBriefPageProps {
	params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
	params,
}: CareerBriefPageProps): Promise<Metadata> {
	const { locale } = await params;
	const contact = await getAuthorizedPrivateDocumentContact(locale);
	return getPrivateDocumentMetadata({
		authorized: Boolean(contact),
		title: `${careerBriefDocumentDefinition.title} | 박주철`,
		description: careerBriefDocumentDefinition.description,
	});
}

export default async function CareerBriefPage({
	params,
}: CareerBriefPageProps) {
	const { locale } = await params;
	const contact = await getAuthorizedPrivateDocumentContact(locale);

	if (!contact) {
		notFound();
	}

	return <CareerBriefDocument contact={contact} />;
}
