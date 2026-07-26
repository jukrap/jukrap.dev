import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { ResumeDocument } from '@/components/documents/private';
import { resumeDocumentDefinition } from '@/data/documents/manifest';
import {
	getPrivateDocumentContact,
	isPrivateDocumentRequestHost,
} from '@/lib/privateDocuments';

interface ResumePageProps {
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

async function resolveAccess(params: ResumePageProps['params']) {
	const { locale } = await params;
	const requestHeaders = await headers();
	return locale === 'ko' &&
		isPrivateDocumentRequestHost(requestHeaders.get('host'))
		? getPrivateDocumentContact()
		: null;
}

export async function generateMetadata({
	params,
}: ResumePageProps): Promise<Metadata> {
	const contact = await resolveAccess(params);
	if (!contact) return deniedMetadata;
	return {
		title: `${resumeDocumentDefinition.title} | 박주철`,
		description: resumeDocumentDefinition.description,
		robots: deniedMetadata.robots,
	};
}

export default async function ResumePage({ params }: ResumePageProps) {
	const contact = await resolveAccess(params);
	if (!contact) notFound();
	return <ResumeDocument contact={contact} />;
}
