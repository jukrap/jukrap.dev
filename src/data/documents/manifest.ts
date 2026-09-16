import type { RecruitingDocumentManifest } from '@/types/documents';

export const recruitingDocumentManifest = {
	locale: 'ko',
	role: '웹·모바일 개발자',
	documents: [
		{
			id: 'portfolio',
			title: '포트폴리오',
			description:
				'주요 업무에서 개발한 기능과 개인 프로젝트의 화면·구현 내용을 소개합니다.',
			slug: '/ko/portfolio',
			visibility: 'public',
			pageCount: 14,
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
				'트리포스에서 담당한 개발·유지보수 업무와 확인한 결과를 두 쪽으로 정리했습니다.',
			slug: '/ko/career-brief',
			visibility: 'private',
			pageCount: 2,
			indexable: false,
			showOnHome: false,
		},
	],
	selection: {
		featuredWorkStoryIds: [
			'settlement-operations-platform',
			'multi-role-hybrid-platform',
			'delivery-output-flow',
			'ai-kickoff-documentation-tool',
		],
		supportingWorkStoryIds: [
			'mobile-operations-platform',
			'operations-admin-web',
			'legacy-support-web',
			'structured-editor-ui',
			'hybrid-life-info-platform',
		],
		portfolioProjectIds: [
			'captain-donghae',
			'sharebby',
			'ai-agent-playbook',
			'itzip',
			'posture-teacher',
		],
		resumeProjectIds: [
			'captain-donghae',
			'sharebby',
			'posture-teacher',
			'ai-agent-playbook',
		],
	},
} as const satisfies RecruitingDocumentManifest;

export const portfolioDocumentDefinition =
	recruitingDocumentManifest.documents[0];
export const resumeDocumentDefinition = recruitingDocumentManifest.documents[1];
export const careerBriefDocumentDefinition =
	recruitingDocumentManifest.documents[2];
