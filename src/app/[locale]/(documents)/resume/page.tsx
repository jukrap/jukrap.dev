import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { ResumeDocument } from '@/components/documents/private';
import { resumeDocumentDefinition } from '@/data/documents/manifest';
import { getRecruitingDocumentContact } from '@/lib/privateDocuments';

interface ResumePageProps {
	params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `${resumeDocumentDefinition.title} | 박주철`,
	description: resumeDocumentDefinition.description,
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

export default async function ResumePage({ params }: ResumePageProps) {
	const { locale } = await params;
	if (locale !== 'ko') {
		notFound();
	}
	const requestHeaders = await headers();
	const contact = getRecruitingDocumentContact(requestHeaders.get('host'));

	return <ResumeDocument contact={contact} />;
}
