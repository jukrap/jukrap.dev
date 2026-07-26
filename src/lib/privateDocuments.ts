import 'server-only';

import {
	canAccessPrivateDocument,
	isPrivateDocumentRequestHost,
} from '@/lib/privateDocumentPolicy';
import type { PrivateDocumentContact } from '@/types/documents';

export { isPrivateDocumentRequestHost };

export function getPrivateDocumentContact({
	locale,
	host,
}: {
	locale: string;
	host: string | null;
}): PrivateDocumentContact | null {
	const environment = {
		nodeEnv: process.env.NODE_ENV,
		vercel: process.env.VERCEL,
		enabled: process.env.PRIVATE_DOCUMENTS_ENABLED,
		email: process.env.PRIVATE_RESUME_EMAIL,
		phone: process.env.PRIVATE_RESUME_PHONE,
	};
	if (!canAccessPrivateDocument({ locale, host, environment })) {
		return null;
	}
	const email = environment.email!;
	const phone = environment.phone!;

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
