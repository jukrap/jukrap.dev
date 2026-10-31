// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-editorialCopy.json';

import type { Locale } from '@/types/locale';

interface CaseCopy {
	summary: string;
	overviewDetail?: string;
	problem: string;
	actions: {
		title: string;
		description: string;
	}[];
	result: string;
	briefResult?: string;
	decision?: string;
}

export const workDocumentCopy: Record<
	Locale,
	Record<string, CaseCopy>
> = readCareerValue<Record<Locale, Record<string, CaseCopy>>>(
	snapshot,
	'workDocumentCopy',
);

export const supportingDocumentCopy: Record<
	Locale,
	Record<string, string>
> = readCareerValue<Record<Locale, Record<string, string>>>(
	snapshot,
	'supportingDocumentCopy',
);

export {};
