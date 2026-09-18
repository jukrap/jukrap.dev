import type { Locale } from '@/types/locale';
import 'server-only';

import type {
	DocumentContact,
	PrivateDocumentContact,
} from '@/types/documents';
import { publicDocumentContact } from '@/data/documents/publicContact';

const isProductionRuntime =
	process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);

export function arePrivateDocumentsEnabled(): boolean {
	return (
		!isProductionRuntime && process.env.PRIVATE_DOCUMENTS_ENABLED === 'true'
	);
}

export function isPrivateDocumentRequestHost(host: string | null): boolean {
	if (!host) {
		return false;
	}

	const normalizedHost = host.toLowerCase();
	return (
		normalizedHost === 'localhost' ||
		normalizedHost.startsWith('localhost:') ||
		normalizedHost === '127.0.0.1' ||
		normalizedHost.startsWith('127.0.0.1:') ||
		normalizedHost === '[::1]' ||
		normalizedHost.startsWith('[::1]:')
	);
}

export function getPrivateDocumentContact(): PrivateDocumentContact | null {
	if (!arePrivateDocumentsEnabled()) {
		return null;
	}

	const email = process.env.PRIVATE_RESUME_EMAIL;
	const phone = process.env.PRIVATE_RESUME_PHONE;

	if (!email || !phone) {
		return null;
	}

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

export function getRecruitingDocumentContact(
	host: string | null,
	locale: Locale = 'ko',
): DocumentContact {
	const contact = isPrivateDocumentRequestHost(host)
		? (getPrivateDocumentContact() ?? publicDocumentContact)
		: publicDocumentContact;
	return {
		...contact,
		name: locale === 'ko' ? contact.name : 'Ju-cheol Park',
		links: contact.links.map((link) => ({
			...link,
			label: link.label.replace('/ko/', `/${locale}/`),
			href: link.href.replace('/ko/', `/${locale}/`),
		})),
	};
}
