import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResumeDocument } from '@/components/documents/private';
import { resumeDocumentDefinition } from '@/data/documents/manifest';
import {
	getAuthorizedPrivateDocumentContact,
	getPrivateDocumentMetadata,
} from '@/lib/privateDocumentRequest';

interface ResumePageProps {
	params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
	params,
}: ResumePageProps): Promise<Metadata> {
	const { locale } = await params;
	const contact = await getAuthorizedPrivateDocumentContact(locale);
	return getPrivateDocumentMetadata({
		authorized: Boolean(contact),
		title: `${resumeDocumentDefinition.title} | 박주철`,
		description: resumeDocumentDefinition.description,
	});
}

export default async function ResumePage({ params }: ResumePageProps) {
	const { locale } = await params;
	const contact = await getAuthorizedPrivateDocumentContact(locale);

	if (!contact) {
		notFound();
	}

	return <ResumeDocument contact={contact} />;
}
