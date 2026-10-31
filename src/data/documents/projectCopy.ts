// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-projectCopy.json';

import type { Locale } from '@/types/locale';

import type { PortfolioPageImage } from '@/types/documents';

interface ProjectDocumentCopy {
	title: string;
	role: string;
	summary: string;
	problem: string;
	actions: {
		title: string;
		description: string;
	}[];
	result: string;
	images: PortfolioPageImage[];
}

export const projectDocumentCopy: Record<
	Locale,
	Record<string, ProjectDocumentCopy>
> = readCareerValue<Record<Locale, Record<string, ProjectDocumentCopy>>>(
	snapshot,
	'projectDocumentCopy',
);

export {};
