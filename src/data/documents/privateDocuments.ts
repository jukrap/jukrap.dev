// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-privateDocuments.json';

import type { CareerBriefCopy, ResumeDocumentCopy } from '@/types/documents';

import type { Locale } from '@/types/locale';

export function getDocumentSkillGroups(locale: Locale): (
	| {
			label: string;
			items: readonly ['TypeScript', 'JavaScript', 'Java', 'Python', 'Dart'];
	  }
	| {
			label: string;
			items: readonly [
				'React',
				'Next.js',
				'Vite',
				'TanStack Query',
				'Zustand',
				'Django',
			];
	  }
	| {
			label: string;
			items: readonly ['React Native', 'Expo', 'Flutter', 'Android', 'Gradle'];
	  }
	| {
			label: string;
			items: readonly ['Vitest', 'MSW', 'Storybook', 'Sentry', 'Ragas'];
	  }
	| {
			label: string;
			items: readonly ['GitHub Actions', 'Jenkins', 'Docker', 'MariaDB', 'SQLite'];
	  }
)[] {
	return readCareerCall<
		(
			| {
					label: string;
					items: readonly ['TypeScript', 'JavaScript', 'Java', 'Python', 'Dart'];
			  }
			| {
					label: string;
					items: readonly [
						'React',
						'Next.js',
						'Vite',
						'TanStack Query',
						'Zustand',
						'Django',
					];
			  }
			| {
					label: string;
					items: readonly ['React Native', 'Expo', 'Flutter', 'Android', 'Gradle'];
			  }
			| {
					label: string;
					items: readonly ['Vitest', 'MSW', 'Storybook', 'Sentry', 'Ragas'];
			  }
			| {
					label: string;
					items: readonly [
						'GitHub Actions',
						'Jenkins',
						'Docker',
						'MariaDB',
						'SQLite',
					];
			  }
		)[]
	>(snapshot, 'getDocumentSkillGroups', locale);
}

export function getResumeDocument(locale: Locale): ResumeDocumentCopy {
	return readCareerCall<ResumeDocumentCopy>(
		snapshot,
		'getResumeDocument',
		locale,
	);
}

export function getCareerBriefDocument(locale: Locale): CareerBriefCopy {
	return readCareerCall<CareerBriefCopy>(
		snapshot,
		'getCareerBriefDocument',
		locale,
	);
}

export const resumeDocument: ResumeDocumentCopy =
	readCareerValue<ResumeDocumentCopy>(snapshot, 'resumeDocument');

export const careerBriefDocument: CareerBriefCopy =
	readCareerValue<CareerBriefCopy>(snapshot, 'careerBriefDocument');
