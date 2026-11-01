// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-manifest.json';

import type { RecruitingDocumentManifest } from '@/types/documents';

import type { Locale } from '@/types/locale';

export const portfolioPageIds: readonly ['cover', ...string[], 'closing'] =
	readCareerValue<readonly ['cover', ...string[], 'closing']>(
		snapshot,
		'portfolioPageIds',
	);

export function getPortfolioPageNumber(id: string): number {
	return readCareerCall<number>(snapshot, 'getPortfolioPageNumber', id);
}

export const recruitingDocumentManifest: {
	readonly locale: 'ko';
	readonly role: '웹·모바일 개발자';
	readonly documents: readonly [
		{
			readonly id: 'portfolio';
			readonly title: '포트폴리오';
			readonly description: '주요 업무와 개인 프로젝트에서 내린 판단, 검증 과정과 결과를 소개합니다.';
			readonly slug: '/ko/portfolio';
			readonly visibility: 'public';
			readonly pageCount: number;
			readonly indexable: true;
			readonly showOnHome: true;
		},
		{
			readonly id: 'resume';
			readonly title: '이력서';
			readonly description: '경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.';
			readonly slug: '/ko/resume';
			readonly visibility: 'public';
			readonly pageCount: 2;
			readonly indexable: false;
			readonly showOnHome: true;
		},
		{
			readonly id: 'career-brief';
			readonly title: '경력기술서';
			readonly description: '트리포스에서 맡은 개발, 유지보수 업무와 주요 결과를 두 쪽에 정리한 경력기술서입니다.';
			readonly slug: '/ko/career-brief';
			readonly visibility: 'public';
			readonly pageCount: 2;
			readonly indexable: false;
			readonly showOnHome: true;
		},
	];
	readonly selection: {
		readonly featuredWorkStoryIds: readonly [
			'ai-document-analysis',
			'settlement-operations-platform',
			'delivery-output-flow',
		];
		readonly supportingWorkStoryIds: readonly [
			'react-admin-state-migration',
			'multi-role-hybrid-platform',
			'mobile-operations-platform',
			'legacy-support-web',
			'hybrid-life-info-platform',
			'structured-editor-ui',
		];
		readonly portfolioDetailedWorkStoryIds: readonly [
			'react-admin-state-migration',
			'hybrid-life-info-platform',
			'hybrid-security-boundary',
			'ai-kickoff-documentation-tool',
		];
		readonly portfolioSupportingWorkStoryIds: readonly [
			'multi-role-hybrid-platform',
			'mobile-operations-platform',
			'structured-editor-ui',
			'field-terminal-android',
			'legacy-mobile-compatibility',
		];
		readonly portfolioProjectIds: readonly [
			'ai-agent-playbook',
			'captain-donghae',
			'sharebby',
			'itzip',
			'posture-teacher',
		];
		readonly resumeProjectIds: readonly [
			'ai-agent-playbook',
			'captain-donghae',
			'sharebby',
			'posture-teacher',
		];
	};
} = readCareerValue<{
	readonly locale: 'ko';
	readonly role: '웹·모바일 개발자';
	readonly documents: readonly [
		{
			readonly id: 'portfolio';
			readonly title: '포트폴리오';
			readonly description: '주요 업무와 개인 프로젝트에서 내린 판단, 검증 과정과 결과를 소개합니다.';
			readonly slug: '/ko/portfolio';
			readonly visibility: 'public';
			readonly pageCount: number;
			readonly indexable: true;
			readonly showOnHome: true;
		},
		{
			readonly id: 'resume';
			readonly title: '이력서';
			readonly description: '경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.';
			readonly slug: '/ko/resume';
			readonly visibility: 'public';
			readonly pageCount: 2;
			readonly indexable: false;
			readonly showOnHome: true;
		},
		{
			readonly id: 'career-brief';
			readonly title: '경력기술서';
			readonly description: '트리포스에서 맡은 개발, 유지보수 업무와 주요 결과를 두 쪽에 정리한 경력기술서입니다.';
			readonly slug: '/ko/career-brief';
			readonly visibility: 'public';
			readonly pageCount: 2;
			readonly indexable: false;
			readonly showOnHome: true;
		},
	];
	readonly selection: {
		readonly featuredWorkStoryIds: readonly [
			'ai-document-analysis',
			'settlement-operations-platform',
			'delivery-output-flow',
		];
		readonly supportingWorkStoryIds: readonly [
			'react-admin-state-migration',
			'multi-role-hybrid-platform',
			'mobile-operations-platform',
			'legacy-support-web',
			'hybrid-life-info-platform',
			'structured-editor-ui',
		];
		readonly portfolioDetailedWorkStoryIds: readonly [
			'react-admin-state-migration',
			'hybrid-life-info-platform',
			'hybrid-security-boundary',
			'ai-kickoff-documentation-tool',
		];
		readonly portfolioSupportingWorkStoryIds: readonly [
			'multi-role-hybrid-platform',
			'mobile-operations-platform',
			'structured-editor-ui',
			'field-terminal-android',
			'legacy-mobile-compatibility',
		];
		readonly portfolioProjectIds: readonly [
			'ai-agent-playbook',
			'captain-donghae',
			'sharebby',
			'itzip',
			'posture-teacher',
		];
		readonly resumeProjectIds: readonly [
			'ai-agent-playbook',
			'captain-donghae',
			'sharebby',
			'posture-teacher',
		];
	};
}>(snapshot, 'recruitingDocumentManifest');

export const portfolioDocumentDefinition: {
	readonly id: 'portfolio';
	readonly title: '포트폴리오';
	readonly description: '주요 업무와 개인 프로젝트에서 내린 판단, 검증 과정과 결과를 소개합니다.';
	readonly slug: '/ko/portfolio';
	readonly visibility: 'public';
	readonly pageCount: number;
	readonly indexable: true;
	readonly showOnHome: true;
} = readCareerValue<{
	readonly id: 'portfolio';
	readonly title: '포트폴리오';
	readonly description: '주요 업무와 개인 프로젝트에서 내린 판단, 검증 과정과 결과를 소개합니다.';
	readonly slug: '/ko/portfolio';
	readonly visibility: 'public';
	readonly pageCount: number;
	readonly indexable: true;
	readonly showOnHome: true;
}>(snapshot, 'portfolioDocumentDefinition');

export const resumeDocumentDefinition: {
	readonly id: 'resume';
	readonly title: '이력서';
	readonly description: '경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.';
	readonly slug: '/ko/resume';
	readonly visibility: 'public';
	readonly pageCount: 2;
	readonly indexable: false;
	readonly showOnHome: true;
} = readCareerValue<{
	readonly id: 'resume';
	readonly title: '이력서';
	readonly description: '경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.';
	readonly slug: '/ko/resume';
	readonly visibility: 'public';
	readonly pageCount: 2;
	readonly indexable: false;
	readonly showOnHome: true;
}>(snapshot, 'resumeDocumentDefinition');

export const careerBriefDocumentDefinition: {
	readonly id: 'career-brief';
	readonly title: '경력기술서';
	readonly description: '트리포스에서 맡은 개발, 유지보수 업무와 주요 결과를 두 쪽에 정리한 경력기술서입니다.';
	readonly slug: '/ko/career-brief';
	readonly visibility: 'public';
	readonly pageCount: 2;
	readonly indexable: false;
	readonly showOnHome: true;
} = readCareerValue<{
	readonly id: 'career-brief';
	readonly title: '경력기술서';
	readonly description: '트리포스에서 맡은 개발, 유지보수 업무와 주요 결과를 두 쪽에 정리한 경력기술서입니다.';
	readonly slug: '/ko/career-brief';
	readonly visibility: 'public';
	readonly pageCount: 2;
	readonly indexable: false;
	readonly showOnHome: true;
}>(snapshot, 'careerBriefDocumentDefinition');

export function getRecruitingDocumentManifest(
	locale: Locale,
): RecruitingDocumentManifest {
	return readCareerCall<RecruitingDocumentManifest>(
		snapshot,
		'getRecruitingDocumentManifest',
		locale,
	);
}
