import { skills } from '@/data/about/skills';
import { projectsDetailData } from '@/data/projectsDetailData';
import { workCases } from '@/data/workCases';
import type { DocumentSkillGroup } from '@/types/documents';

export const recruitingDocumentSkillGroups = [
	{
		label: '언어',
		items: ['TypeScript', 'JavaScript', 'Java'],
	},
	{
		label: '웹',
		items: ['React', 'Next.js', 'Vite', 'TanStack Query', 'Zustand'],
	},
	{
		label: '모바일·하이브리드',
		items: ['React Native', 'Expo', 'Android', 'Gradle'],
	},
	{
		label: '테스트·관측',
		items: ['Vitest', 'MSW', 'Storybook', 'Sentry'],
	},
	{
		label: '도구와 데이터',
		items: ['GitHub Actions', 'Jenkins', 'Docker', 'MariaDB', 'SQLite'],
	},
] as const satisfies readonly DocumentSkillGroup[];

const documentedSkills = new Set([
	...skills.flatMap(({ items }) => items.split(',').map((item) => item.trim())),
	...projectsDetailData.flatMap(({ techStack }) => techStack),
	...workCases.ko.flatMap(({ stack }) => stack),
]);

const unsupportedSkills = recruitingDocumentSkillGroups
	.flatMap(({ items }) => items)
	.filter((item) => !documentedSkills.has(item));

if (unsupportedSkills.length > 0) {
	throw new Error(
		`Recruiting document skills require source evidence: ${unsupportedSkills.join(', ')}`,
	);
}
