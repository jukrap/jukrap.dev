// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-documentSkills.json';

export const recruitingDocumentSkillGroups: readonly [
	{
		readonly label: '언어';
		readonly items: readonly [
			'TypeScript',
			'JavaScript',
			'Java',
			'Python',
			'Dart',
		];
	},
	{
		readonly label: '웹';
		readonly items: readonly [
			'React',
			'Next.js',
			'Vite',
			'TanStack Query',
			'Zustand',
			'Django',
		];
	},
	{
		readonly label: '모바일·하이브리드';
		readonly items: readonly [
			'React Native',
			'Expo',
			'Flutter',
			'Android',
			'Gradle',
		];
	},
	{
		readonly label: '테스트·관측';
		readonly items: readonly ['Vitest', 'MSW', 'Storybook', 'Sentry', 'Ragas'];
	},
	{
		readonly label: '도구와 데이터';
		readonly items: readonly [
			'GitHub Actions',
			'Jenkins',
			'Docker',
			'MariaDB',
			'SQLite',
		];
	},
] = readCareerValue<
	readonly [
		{
			readonly label: '언어';
			readonly items: readonly [
				'TypeScript',
				'JavaScript',
				'Java',
				'Python',
				'Dart',
			];
		},
		{
			readonly label: '웹';
			readonly items: readonly [
				'React',
				'Next.js',
				'Vite',
				'TanStack Query',
				'Zustand',
				'Django',
			];
		},
		{
			readonly label: '모바일·하이브리드';
			readonly items: readonly [
				'React Native',
				'Expo',
				'Flutter',
				'Android',
				'Gradle',
			];
		},
		{
			readonly label: '테스트·관측';
			readonly items: readonly ['Vitest', 'MSW', 'Storybook', 'Sentry', 'Ragas'];
		},
		{
			readonly label: '도구와 데이터';
			readonly items: readonly [
				'GitHub Actions',
				'Jenkins',
				'Docker',
				'MariaDB',
				'SQLite',
			];
		},
	]
>(snapshot, 'recruitingDocumentSkillGroups');
