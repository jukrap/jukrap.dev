import type { RecruitingDocumentManifest } from '@/types/documents';
import type { Locale } from '@/types/locale';

const featuredWorkStoryIds = [
	'ai-document-analysis',
	'settlement-operations-platform',
	'delivery-output-flow',
] as const;
const supportingWorkStoryIds = [
	'react-admin-state-migration',
	'multi-role-hybrid-platform',
	'mobile-operations-platform',
	'legacy-support-web',
	'hybrid-life-info-platform',
	'structured-editor-ui',
] as const;

const portfolioProjectIds = [
	'ai-agent-playbook',
	'captain-donghae',
	'sharebby',
	'itzip',
	'posture-teacher',
] as const;
const portfolioDetailedWorkStoryIds = [
	'react-admin-state-migration',
	'hybrid-life-info-platform',
	'hybrid-security-boundary',
	'ai-kickoff-documentation-tool',
] as const;
export const portfolioPageIds = [
	'cover',
	...featuredWorkStoryIds.flatMap((id) =>
		id === 'delivery-output-flow'
			? ['logistics-web', 'logistics-mobile']
			: id === 'settlement-operations-platform'
				? [id, 'erp-mobile-workflow']
				: [id],
	),
	'ai-agent-playbook',
	'react-admin-state-migration',
	'weather-feature',
	'hybrid-security-boundary',
	'ai-kickoff-documentation-tool',
	'supporting-work',
	...portfolioProjectIds.filter((id) => id !== 'ai-agent-playbook'),
	'closing',
] as const;
export function getPortfolioPageNumber(id: string) {
	const index = portfolioPageIds.indexOf(id);
	if (index < 0) throw new Error(`Unknown portfolio page: ${id}`);
	return index + 1;
}

export const recruitingDocumentManifest = {
	locale: 'ko',
	role: '웹·모바일 개발자',
	documents: [
		{
			id: 'portfolio',
			title: '포트폴리오',
			description:
				'주요 업무와 개인 프로젝트에서 내린 판단, 검증 과정과 결과를 소개합니다.',
			slug: '/ko/portfolio',
			visibility: 'public',
			pageCount: portfolioPageIds.length,
			indexable: true,
			showOnHome: true,
		},
		{
			id: 'resume',
			title: '이력서',
			description:
				'경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.',
			slug: '/ko/resume',
			visibility: 'public',
			pageCount: 2,
			indexable: false,
			showOnHome: true,
		},
		{
			id: 'career-brief',
			title: '경력기술서',
			description:
				'트리포스에서 담당한 개발·유지보수 업무와 확인한 결과를 두 쪽으로 정리했습니다.',
			slug: '/ko/career-brief',
			visibility: 'public',
			pageCount: 2,
			indexable: false,
			showOnHome: true,
		},
	],
	selection: {
		featuredWorkStoryIds,
		supportingWorkStoryIds,
		portfolioDetailedWorkStoryIds,
		portfolioSupportingWorkStoryIds: [
			'multi-role-hybrid-platform',
			'mobile-operations-platform',
			'structured-editor-ui',
			'field-terminal-android',
			'legacy-mobile-compatibility',
		],
		portfolioProjectIds,
		resumeProjectIds: [
			'ai-agent-playbook',
			'captain-donghae',
			'sharebby',
			'posture-teacher',
		],
	},
} as const satisfies RecruitingDocumentManifest;

export const portfolioDocumentDefinition =
	recruitingDocumentManifest.documents[0];
export const resumeDocumentDefinition = recruitingDocumentManifest.documents[1];
export const careerBriefDocumentDefinition =
	recruitingDocumentManifest.documents[2];

export function getRecruitingDocumentManifest(
	locale: Locale,
): RecruitingDocumentManifest {
	if (locale === 'ko') return recruitingDocumentManifest;
	const titles = ['Portfolio', 'Resume', 'Career Brief'];
	const descriptions = [
		'Frontend case studies, implementation decisions, and selected personal projects.',
		'A two-page summary of experience, skills, and selected projects.',
		'A two-page account of implementation work and outcomes at Triphos.',
	];
	return {
		...recruitingDocumentManifest,
		locale,
		role: 'Web & Mobile Developer',
		documents: recruitingDocumentManifest.documents.map((document, index) => ({
			...document,
			title: titles[index],
			description: descriptions[index],
			slug: `/${locale}/${document.id}`,
		})),
	};
}
