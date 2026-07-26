import 'server-only';

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import type { PrivateDocumentContact } from '@/types/documents';
import { getPrivateDocumentContact } from './privateDocuments';

const deniedMetadata: Metadata = {
	title: 'Not Found',
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

export async function getAuthorizedPrivateDocumentContact(
	locale: string,
): Promise<PrivateDocumentContact | null> {
	const requestHeaders = await headers();
	return getPrivateDocumentContact({
		locale,
		host:
			requestHeaders.get('x-jukrap-request-host') ?? requestHeaders.get('host'),
	});
}

export const getPrivateDocumentMetadata = ({
	authorized,
	title,
	description,
}: {
	authorized: boolean;
	title: string;
	description: string;
}): Metadata =>
	authorized
		? {
				title,
				description,
				robots: deniedMetadata.robots,
			}
		: deniedMetadata;
