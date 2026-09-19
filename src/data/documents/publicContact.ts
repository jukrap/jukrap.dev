import { personalInfo } from '@/data/about/personalInfo';
import type { DocumentContact } from '@/types/documents';

export const portfolioPublicEmails = [
	{
		label: '이메일',
		address: personalInfo.email,
	},
	{
		label: '보조 이메일',
		address: 'valurauta628@gmail.com',
	},
] as const;

export const publicDocumentContact = {
	name: '박주철',
	email: personalInfo.email,
	links: [
		{
			label: 'jukrap.vercel.app',
			href: 'https://jukrap.vercel.app',
		},
		{ label: 'github.com/jukrap', href: 'https://github.com/jukrap' },
	],
} as const satisfies DocumentContact;
