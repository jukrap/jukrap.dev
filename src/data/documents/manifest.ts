import type { RecruitingDocumentManifest } from '@/types/documents';

export const recruitingDocumentManifest = {
	locale: 'ko',
	role: '웹/모바일 프론트엔드 엔지니어',
	documents: [
		{
			id: 'portfolio',
			title: '포트폴리오',
			description:
				'문제를 나눈 기준과 구현·검증 과정을 대표 업무와 프로젝트 사례로 설명합니다.',
			slug: '/ko/portfolio',
			visibility: 'public',
			pageCount: 12,
			indexable: true,
			showOnHome: true,
		},
		{
			id: 'resume',
			title: '이력서',
			description:
				'경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.',
			slug: '/ko/resume',
			visibility: 'private',
			pageCount: 2,
			indexable: false,
			showOnHome: false,
		},
		{
			id: 'career-brief',
			title: '경력기술서',
			description:
				'트리포스에서 맡은 업무 범위, 판단, 결과와 검증 기준을 두 쪽으로 정리한 문서입니다.',
			slug: '/ko/career-brief',
			visibility: 'private',
			pageCount: 2,
			indexable: false,
			showOnHome: false,
		},
	],
	selection: {
		featuredWorkStoryIds: [
			'delivery-output-flow',
			'structured-editor-ui',
			'ai-kickoff-documentation-tool',
			'hybrid-life-info-platform',
		],
		supportingWorkStoryIds: [
			'legacy-mobile-compatibility',
			'react-admin-state-migration',
			'hybrid-security-boundary',
			'field-terminal-android',
			'legacy-panel-baseline',
		],
		portfolioProjectIds: [
			'captain-donghae',
			'sharebby',
			'ai-agent-playbook',
			'itzip',
			'posture-teacher',
		],
		resumeProjectIds: ['captain-donghae', 'sharebby', 'ai-agent-playbook'],
	},
} as const satisfies RecruitingDocumentManifest;

export const portfolioDocumentDefinition =
	recruitingDocumentManifest.documents[0];
export const resumeDocumentDefinition = recruitingDocumentManifest.documents[1];
export const careerBriefDocumentDefinition =
	recruitingDocumentManifest.documents[2];
