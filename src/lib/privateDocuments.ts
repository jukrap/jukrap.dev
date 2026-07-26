import 'server-only';

import type { PrivateDocumentContact } from '@/types/documents';
import {
	canAccessPrivateDocument,
	isLocalPrivateDocumentHost,
} from '@/lib/privateDocumentPolicy';

export function arePrivateDocumentsEnabled(): boolean {
	return canAccessPrivateDocument({
		nodeEnv: process.env.NODE_ENV,
		vercel: process.env.VERCEL,
		enabled: process.env.PRIVATE_DOCUMENTS_ENABLED,
		host: 'localhost',
		locale: 'ko',
		email: process.env.PRIVATE_RESUME_EMAIL,
		phone: process.env.PRIVATE_RESUME_PHONE,
	});
}

export function isPrivateDocumentRequestHost(host: string | null): boolean {
	return isLocalPrivateDocumentHost(host);
}

export function getPrivateDocumentContact(): PrivateDocumentContact | null {
	if (!arePrivateDocumentsEnabled()) return null;

	const email = process.env.PRIVATE_RESUME_EMAIL;
	const phone = process.env.PRIVATE_RESUME_PHONE;
	if (!email || !phone) return null;

	return {
		name: '박주철',
		email,
		phone,
		links: [
			{
				label: 'jukrap.vercel.app/ko/portfolio',
				href: 'https://jukrap.vercel.app/ko/portfolio',
			},
			{ label: 'github.com/jukrap', href: 'https://github.com/jukrap' },
		],
	};
}
