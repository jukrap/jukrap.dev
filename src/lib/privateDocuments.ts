import type { PrivateDocumentContact } from '@/types/documents';

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
	const birthYear = process.env.PRIVATE_RESUME_BIRTH_YEAR;

	if (!email || !phone || !birthYear) {
		return null;
	}

	return {
		name: '박주철',
		email,
		phone,
		birthYear,
		photoSrc: '/images/profileFront.png',
		links: [
			{ label: 'jukrap.vercel.app', href: 'https://jukrap.vercel.app' },
			{ label: 'github.com/jukrap', href: 'https://github.com/jukrap' },
		],
	};
}
