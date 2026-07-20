import type { DocumentSkillGroup } from '@/types/documents';
import { skills } from '@/data/about/skills';
import { projectsDetailData } from '@/data/projectsDetailData';

export const recruitingDocumentSkillGroups = [
	{
		label: '언어',
		items: ['TypeScript', 'JavaScript', 'Java'],
	},
	{
		label: '웹 프론트엔드',
		items: [
			'React',
			'Next.js',
			'Vite',
			'TanStack Query',
			'Zustand',
			'Tailwind CSS',
		],
	},
	{
		label: '모바일 및 Android',
		items: ['React Native', 'Expo', 'Android Java', 'Gradle'],
	},
	{
		label: '테스트와 관측',
		items: ['Vitest', 'Jest', 'Storybook', 'Sentry'],
	},
	{
		label: '개발과 배포',
		items: ['Node.js', 'Firebase', 'GitHub Actions', 'AWS', 'Jenkins', 'Docker'],
	},
] as const satisfies readonly DocumentSkillGroup[];

const documentedSkills = new Set([
	...skills.flatMap(({ items }) => items.split(',').map((item) => item.trim())),
	...projectsDetailData.flatMap(({ techStack }) => techStack),
]);

const unsupportedSkills = recruitingDocumentSkillGroups
	.flatMap(({ items }) => items)
	.filter((item) => !documentedSkills.has(item));

if (unsupportedSkills.length > 0) {
	throw new Error(
		`Recruiting document skills require source evidence: ${unsupportedSkills.join(', ')}`,
	);
}
