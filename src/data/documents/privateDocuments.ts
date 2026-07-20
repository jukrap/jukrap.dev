import type { CareerBriefCopy, ResumeDocumentCopy } from '@/types/documents';
import { recruitingDocumentSkillGroups } from './documentSkills';
import {
	formatKoreanPeriod,
	getProject,
	getWorkStory,
	projectEvidence,
	workStoryEvidence,
} from './sourceSelectors';
import {
	tisCareerEvidence,
	triphosCareerEvidence,
	universityEducationEvidence,
} from './profileEvidence';

const featuredStories = [
	'delivery-output-flow',
	'structured-editor-ui',
	'ai-kickoff-documentation-tool',
	'hybrid-life-info-platform',
].map(getWorkStory);

const supportingStories = [
	'legacy-mobile-compatibility',
	'react-admin-state-migration',
	'hybrid-security-boundary',
	'field-terminal-android',
	'legacy-panel-baseline',
].map(getWorkStory);

const supportingDecisionByStory: Record<string, string> = {
	'legacy-mobile-compatibility':
		'빌드 성공과 런타임 호환성을 별도 기준으로 분리',
	'react-admin-state-migration': '서버 상태 갱신과 화면 상태를 분리',
	'hybrid-security-boundary': '인증 정보는 server-side proxy에만 배치',
	'field-terminal-android': '운영 서명과 개발 빌드 경로를 분리',
	'legacy-panel-baseline': '분리 전에 coupling과 API contract를 지도화',
};

const captainDonghae = getProject('captain-donghae');
const shareBBy = getProject('sharebby');
const aiAgentPlaybook = getProject('ai-agent-playbook');

const skillGroups = recruitingDocumentSkillGroups;

const contributionByStory: Record<string, string> = {
	'delivery-output-flow':
		'React 운영 웹의 조회, 예약, Excel, 출력 흐름을 React Native WebView와 Android Bluetooth 출력까지 연결했습니다.',
	'structured-editor-ui':
		'차트 타입, field mapping, preview lifecycle, 여섯 영역의 설정 패널을 하나의 편집 흐름으로 구성했습니다.',
	'ai-kickoff-documentation-tool':
		'저장소 scanner, AI 초안, workbook 검수, 선택 범위 수정과 export를 연결한 내부 도구를 구축했습니다.',
	'hybrid-life-info-platform':
		'레거시 웹과 Android WebView의 외부 API, 위치 fallback, 기준 데이터 cache와 파일 단위 운영 배포를 정리했습니다.',
};

const careerBriefEvidenceByStory: Record<string, readonly string[]> = {
	'delivery-output-flow': [
		'웹 초기 JS entry 2,405.50 → 616.59 kB와 Android 16/API 36 권한, Bluetooth, 실물 출력을 각각 확인',
	],
	'structured-editor-ui': [
		'mapping, preview, settings 상태 동기화와 preview rendering, option change, panel collapse 흐름 확인',
	],
	'ai-kickoff-documentation-tool': [
		'scanner → preview → AI 초안 → workbook 검수 → 선택 sheet/cell 수정 순서 확인',
	],
	'hybrid-life-info-platform': [
		'2026-07-08 운영 smoke에서 cold 요청과 cache HIT를 비교해 core 약 2.85초 → 0.11초를 확인',
		'최종 mvn test에서 131 tests / skipped 1을 확인하고, 운영 반영 후에는 hash와 smoke를 별도로 확인',
	],
};

export const resumeDocument = {
	title: '이력서',
	role: '웹/모바일 프론트엔드 엔지니어',
	profile:
		'React 기반 업무 화면과 React Native WebView 및 Android 장비 연동을 구현했습니다. 신규 구축과 레거시 개선을 함께 경험했고, 번들, 테스트, 실기기, 운영 배포 중 업무에 맞는 방법으로 결과를 확인합니다.',
	competencies: [
		{
			title: '업무 흐름과 상태 경계',
			detail:
				'조회, 예약, 입력, Excel, 출력처럼 이어지는 흐름을 서버 상태와 화면 상태로 나눠 React 화면에 연결합니다.',
			evidence: [workStoryEvidence('delivery-output-flow')],
		},
		{
			title: '웹과 모바일 장비 연동',
			detail:
				'WebView contract 이후의 Android 권한, Bluetooth, native module과 실물 출력까지 단계별로 확인합니다.',
			evidence: [
				workStoryEvidence('delivery-output-flow'),
				workStoryEvidence('legacy-mobile-compatibility'),
			],
		},
		{
			title: '레거시 변경과 운영 검증',
			detail:
				'바꿀 범위와 보존할 계약을 먼저 나누고 build, 회귀 테스트, smoke, manifest와 hash로 결과를 확인합니다.',
			evidence: [
				workStoryEvidence('hybrid-life-info-platform'),
				workStoryEvidence('legacy-panel-baseline'),
			],
		},
		{
			title: '사람 검수를 전제로 한 AI 보조',
			detail:
				'규칙 기반 근거 수집, AI 초안, workbook 검수, 부분 수정을 분리해 자동화의 입력과 한계를 드러냅니다.',
			evidence: [
				workStoryEvidence('ai-kickoff-documentation-tool'),
				projectEvidence('ai-agent-playbook'),
			],
		},
	],
	careers: [
		{
			company: triphosCareerEvidence.company,
			period: triphosCareerEvidence.period,
			officialTitle: triphosCareerEvidence.officialTitle,
			role: triphosCareerEvidence.role,
			summary: triphosCareerEvidence.summary,
			highlights: [
				'물류 운영 웹의 초기 JS entry 2,405.50→616.59 kB와 gzip 815.10→204.38 kB를 동일 기준으로 확인했습니다.',
				'WebView와 Android native 책임을 나누고 Android 16/API 36 실기기에서 권한, Bluetooth, 실물 라벨 출력을 확인했습니다.',
				'차트별 유효 옵션과 field mapping, preview, settings 상태가 어긋나지 않는 React 편집 흐름을 구축했습니다.',
				'저장소 근거 수집, AI 초안, workbook 검수, 선택 범위 수정을 분리한 프로젝트 문서화 도구를 만들었습니다.',
				'생활정보 하이브리드 서비스의 loading, cache, 기준 데이터, 운영 배포 경계를 나누고 날짜별 smoke와 hash를 별도 기준으로 확인했습니다.',
			],
			evidence: [
				{
					source: 'profile',
					id: triphosCareerEvidence.id,
					visibility: 'private',
				},
				...featuredStories.map(({ id }) => workStoryEvidence(id)),
			],
		},
		{
			company: tisCareerEvidence.company,
			period: tisCareerEvidence.period,
			officialTitle: tisCareerEvidence.officialTitle,
			role: tisCareerEvidence.role,
			summary: tisCareerEvidence.summary,
			highlights: tisCareerEvidence.highlights,
			evidence: [
				{ source: 'profile', id: tisCareerEvidence.id, visibility: 'private' },
			],
		},
	],
	projects: [
		{
			id: captainDonghae.id,
			title: 'C. Donghae',
			period: formatKoreanPeriod(captainDonghae.duration),
			role: '3명 팀의 유일한 프론트엔드 개발자',
			summary:
				'동해선 이용객에게 실시간 교통과 주변 정보를 제공하는 지도 기반 웹 서비스입니다.',
			highlights: [
				'백엔드 2명과 Swagger 문서를 기준으로 API를 연결하고, 72시간 안에 Google Maps와 주요 화면, 드래그형 바텀 시트를 구현했습니다.',
			],
			technologies: captainDonghae.techStack,
			evidence: [projectEvidence(captainDonghae.id)],
		},
		{
			id: shareBBy.id,
			title: 'ShareBBy',
			period: formatKoreanPeriod(shareBBy.duration),
			role: 'React Native 및 Firebase 개발',
			summary:
				'취미 활동을 공유하고 참여하는 크로스플랫폼 앱으로 2024년 App Store에 배포했습니다.',
			highlights: [
				'Android 대응과 게시글 및 댓글 CRUD, 위치 기반 필터, 목록 갱신과 페이지네이션을 구현했습니다.',
				'Firebase 데이터 구조를 정리하고 이미지 캐시 문제의 대체 라이브러리를 검토해 적용했습니다.',
			],
			technologies: shareBBy.techStack,
			evidence: [projectEvidence(shareBBy.id)],
		},
		{
			id: aiAgentPlaybook.id,
			title: aiAgentPlaybook.title,
			period: formatKoreanPeriod(aiAgentPlaybook.duration),
			role: '1인 개발',
			summary:
				'AI 에이전트의 작업 규칙, 프로젝트 메모리, 점검 흐름을 재사용하기 위한 개발 도구입니다.',
			highlights: [
				'CLI, 스킬, 템플릿, 읽기 전용 MCP 도구와 dry-run 경계를 구성했습니다.',
				'npm 패키지와 GitHub 저장소로 공개했습니다.',
			],
			technologies: aiAgentPlaybook.techStack,
			evidence: [projectEvidence(aiAgentPlaybook.id)],
		},
	],
	skillGroups,
	education: [
		{
			title: universityEducationEvidence.title,
			period: universityEducationEvidence.period,
			detail: universityEducationEvidence.detail,
			evidence: [
				{
					source: 'profile',
					id: universityEducationEvidence.id,
					visibility: 'public',
				},
			],
		},
		{
			title: '프로그래머스 데브코스',
			period: '2023.12 ~ 2024.05',
			detail: 'Cloud Application Engineering 과정, React 및 React Native',
			evidence: [{ source: 'activity', id: 'programmers-devcourse-student' }],
		},
	],
	awards: [
		{
			title: 'DIVE 2024 글로벌 데이터 해커톤',
			period: '2024.10',
			detail: '부산테크노파크원장상(3등)',
			evidence: [{ source: 'award', id: 'DIVE 2024 해커톤' }],
		},
		{
			title: '경남소프트웨어 경진대회',
			period: '2021.10',
			detail: 'ESD HotDeal, 최우수상',
			evidence: [{ source: 'award', id: '경남소프트웨어 경진대회' }],
		},
	],
} as const satisfies ResumeDocumentCopy;

export const careerBriefDocument = {
	title: '경력기술서',
	role: '웹/모바일 프론트엔드 엔지니어',
	company: {
		name: triphosCareerEvidence.company,
		period: triphosCareerEvidence.period,
		officialTitle: triphosCareerEvidence.officialTitle,
		role: triphosCareerEvidence.role,
		summary:
			'React 기반 업무 웹, 모바일 WebView와 Android 장비 연동, 레거시 웹과 앱 안정화 및 운영 반영을 다룹니다.',
		responsibilities: [
			'조회, 예약, 입력, Excel, 출력처럼 이어지는 업무 흐름의 화면과 상태 구현',
			'WebView contract, Android 권한, Bluetooth, native module과 장비 SDK 연동',
			'레거시 웹과 Android의 build, 회귀, fallback, 운영 배포 기준 정리',
			'저장소 근거와 사람 검수 지점을 남기는 내부 개발 도구 구축',
		],
		evidenceRefs: [
			{
				source: 'profile',
				id: triphosCareerEvidence.id,
				visibility: 'private',
			},
			...featuredStories.map(({ id }) => workStoryEvidence(id)),
		],
	},
	featuredWork: featuredStories.map((story) => ({
		id: story.id,
		title: story.title,
		period: story.period,
		platform: story.platform,
		goal: story.headline,
		contribution: contributionByStory[story.id],
		decision: story.editorial!.decision,
		result: story.editorial!.outcome,
		evidence: careerBriefEvidenceByStory[story.id],
		technologies: story.stack,
		evidenceRefs: [workStoryEvidence(story.id)],
	})),
	supportingWork: supportingStories.map((story) => ({
		id: story.id,
		title: story.title,
		period: story.period,
		decision: supportingDecisionByStory[story.id],
		result: story.impact[0]
			? `${story.impact[0].label}: ${story.impact[0].value}`
			: story.checks[0],
		evidenceRef: workStoryEvidence(story.id),
	})),
	practices: [
		{
			title: '상태와 시스템 경계',
			items: [
				'서버, 화면, WebView contract, native 장비 상태를 섞지 않고 브라우저 성능과 물리 출력의 완료 기준을 나눕니다.',
			],
		},
		{
			title: '검증과 운영 반영',
			items: [
				'build, 테스트, viewport, 실기기, 운영 smoke 중 필요한 기준을 고르고 날짜, manifest, hash를 따로 기록합니다.',
			],
		},
		{
			title: 'AI 보조 도구',
			items: [
				'입력 근거, AI 초안, 사람 검수, 선택 수정을 분리하고 미지원 판단과 남은 제한을 표시합니다.',
			],
		},
	],
	skillGroups,
} as const satisfies CareerBriefCopy;
