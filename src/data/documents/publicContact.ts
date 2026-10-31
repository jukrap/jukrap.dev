// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-publicContact.json';

export const portfolioPublicEmails: readonly [
	{
		readonly label: '이메일';
		readonly address: string;
	},
] = readCareerValue<
	readonly [
		{
			readonly label: '이메일';
			readonly address: string;
		},
	]
>(snapshot, 'portfolioPublicEmails');

export const publicDocumentContact: {
	readonly name: '박주철';
	readonly email: string;
	readonly links: readonly [
		{
			readonly label: 'jukrap.vercel.app';
			readonly href: 'https://jukrap.vercel.app';
		},
		{
			readonly label: 'github.com/jukrap';
			readonly href: 'https://github.com/jukrap';
		},
	];
} = readCareerValue<{
	readonly name: '박주철';
	readonly email: string;
	readonly links: readonly [
		{
			readonly label: 'jukrap.vercel.app';
			readonly href: 'https://jukrap.vercel.app';
		},
		{
			readonly label: 'github.com/jukrap';
			readonly href: 'https://github.com/jukrap';
		},
	];
}>(snapshot, 'publicDocumentContact');
