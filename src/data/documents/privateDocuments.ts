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
		'최신 빌드 도구를 적용한 뒤에도 오래된 Android에서 실행되는지 따로 점검했습니다.',
	'react-admin-state-migration':
		'기존 주식 업무 흐름을 React로 새로 구현하고 서버 상태와 화면 편집 상태를 따로 관리했습니다.',
	'hybrid-security-boundary':
		'외부 인증 정보는 서버 프록시에만 두고 WebView에는 필요한 응답만 전달했습니다.',
	'field-terminal-android':
		'개발용 빌드와 운영 서명 빌드가 섞이지 않도록 설치 경로를 나눴습니다.',
	'legacy-panel-baseline':
		'화면을 떼어내기 전에 함께 쓰는 팝업, 선택자, API 요청 순서를 먼저 기록했습니다.',
};

const careerPlatformByStory: Record<string, string> = {
	'delivery-output-flow': '웹·모바일',
	'structured-editor-ui': '웹',
	'ai-kickoff-documentation-tool': '사내 도구',
	'hybrid-life-info-platform': '하이브리드',
};

const careerGoalByStory: Partial<Record<string, string>> = {
	'structured-editor-ui':
		'데이터 역할과 설정 상태가 실제 미리보기와 어긋나지 않는 편집 흐름을 설계했습니다.',
	'hybrid-life-info-platform':
		'레거시 웹과 Android WebView를 유지보수하며 외부 API 응답, 캐시, 위치 처리와 운영 배포를 고쳤습니다.',
};

const supportingResultByStory: Record<string, string> = {
	'legacy-mobile-compatibility': '빌드 기준선 복구',
	'react-admin-state-migration': 'React Query로 서버 상태 갱신',
	'hybrid-security-boundary': '인증 정보는 서버에서 관리',
	'field-terminal-android': '개발·운영 빌드 경로 분리',
	'legacy-panel-baseline': '변경 전 영향 지점 지도화',
};

const captainDonghae = getProject('captain-donghae');
const shareBBy = getProject('sharebby');
const aiAgentPlaybook = getProject('ai-agent-playbook');

const contributionByStory: Record<string, string> = {
	'delivery-output-flow':
		'조회, 예약, Excel, 출력 요청을 React 업무 웹에 구현하고 WebView 메시지 뒤의 권한, Bluetooth, 프린터 명령은 Android 앱에서 처리했습니다.',
	'structured-editor-ui':
		'차트 종류에 맞는 설정만 보여주고 데이터 필드, 미리보기, 여섯 영역의 설정 화면을 하나의 편집 흐름으로 연결했습니다.',
	'ai-kickoff-documentation-tool':
		'저장소 자료를 규칙으로 모아 먼저 보여주고, AI 초안은 검수용 워크북에서 선택한 시트와 셀만 다시 고치도록 구현했습니다.',
	'hybrid-life-info-platform':
		'첫 화면에 필요한 정보부터 불러오도록 순서를 바꾸고 최신·만료 캐시를 나눴습니다. 운영에는 바뀐 파일만 올렸습니다.',
};

const decisionByStory: Record<string, string> = {
	'delivery-output-flow':
		'브라우저의 요청 성공과 프린터의 실제 출력은 다른 완료 조건으로 다뤘습니다.',
	'structured-editor-ui':
		'모든 차트에 같은 옵션을 붙이지 않고 차트별 설정과 미리보기 갱신 조건을 따로 두었습니다.',
	'ai-kickoff-documentation-tool':
		'AI가 문서를 완성한다고 가정하지 않고 입력 자료, 초안, 사람 검수, 부분 수정을 각각 볼 수 있게 했습니다.',
	'hybrid-life-info-platform':
		'외부 API 실패가 첫 화면 전체를 막지 않게 로딩 순서를 바꾸고, 배포 작업마다 파일 수와 해시를 따로 남겼습니다.',
};

const resultByStory: Record<string, string> = {
	'delivery-output-flow':
		'같은 빌드에서 초기 JavaScript를 2,405.50 → 616.59 kB, gzip 압축 파일을 815.10 → 204.38 kB로 줄였습니다. Android 16/API 36 실기기에서는 권한과 Bluetooth 연결 뒤 실물 라벨을 출력했습니다.',
	'structured-editor-ui':
		'옵션 변경, 미리보기 렌더링, 패널 접기, 드래그 앤 드롭과 툴팁 흐름을 점검했습니다.',
	'ai-kickoff-documentation-tool':
		'자료 수집부터 초안, 워크북 검수, 선택 범위 수정까지 각 단계를 따로 실행할 수 있게 했습니다.',
	'hybrid-life-info-platform':
		'2026-07-08 운영 점검에서 첫 요청 약 2.85초와 캐시 응답 약 0.11초를 비교했습니다. 최종 테스트 결과와 날짜별 배포 내역도 따로 기록했습니다.',
};

const careerBriefEvidenceByStory: Record<string, readonly string[]> = {
	'delivery-output-flow': [
		'초기 JavaScript 2,405.50 → 616.59 kB, gzip 815.10 → 204.38 kB',
		'Android 16/API 36 실기기에서 권한, Bluetooth 연결, 실물 라벨 출력',
	],
	'structured-editor-ui': [
		'미리보기 렌더링, 옵션 변경, 패널 접기, 드래그 앤 드롭, 툴팁 점검',
	],
	'ai-kickoff-documentation-tool': [
		'저장소 자료 미리보기 → AI 초안 → 검수용 워크북 → 선택 범위 수정 순서 점검',
	],
	'hybrid-life-info-platform': [
		'2026-07-08 운영 스모크 테스트에서 첫 요청 약 2.85초, 캐시 응답 약 0.11초',
		'최종 mvn test 131 tests / skipped 1, 운영 반영 뒤 해시와 주요 화면 별도 점검',
	],
};

export const resumeDocument = {
	title: '이력서',
	role: '웹/모바일 프론트엔드 엔지니어',
	profile:
		'업무 웹을 만들고 모바일 앱을 Android 장비 출력과 연결했습니다. 신규 구축과 레거시 유지보수를 함께 맡으며 번들, 테스트, 실기기, 운영 환경에서 결과를 직접 점검했습니다.',
	competencies: [
		{
			title: '업무 웹 구현',
			detail:
				'조회, 예약, 입력, Excel, 출력으로 이어지는 화면과 상태를 React로 구현했습니다.',
			evidence: [workStoryEvidence('delivery-output-flow')],
		},
		{
			title: '모바일 장비 연동',
			detail:
				'WebView 요청을 Android 권한, Bluetooth, 프린터 출력까지 연결했습니다.',
			evidence: [
				workStoryEvidence('delivery-output-flow'),
				workStoryEvidence('legacy-mobile-compatibility'),
			],
		},
		{
			title: '레거시 유지보수',
			detail:
				'오래된 웹과 Android 앱을 작은 단위로 고치고 테스트와 운영 화면으로 다시 점검했습니다.',
			evidence: [
				workStoryEvidence('hybrid-life-info-platform'),
				workStoryEvidence('legacy-panel-baseline'),
			],
		},
		{
			title: 'AI 보조 도구',
			detail:
				'입력 자료와 AI 초안, 사람의 검수와 부분 수정을 나눠 볼 수 있는 도구를 만들었습니다.',
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
			summary:
				'React 업무 웹, 모바일 앱과 Android 장비 연동, 레거시 웹·앱 유지보수를 맡았습니다.',
			highlights: [
				'물류 운영 웹의 초기 JavaScript를 2,405.50 → 616.59 kB, gzip을 815.10 → 204.38 kB로 줄이고, Android 16/API 36 실기기에서 권한과 Bluetooth 연결 뒤 실물 라벨을 출력했습니다.',
				'차트마다 쓸 수 있는 옵션을 나누고 데이터 필드, 미리보기, 설정 화면이 같은 편집 상태를 보도록 React 도구를 구현했습니다.',
				'저장소 자료를 먼저 보여준 뒤 AI 초안을 만들고, 검수용 워크북에서 선택한 시트와 셀만 다시 고치는 사내 도구를 만들었습니다.',
				'생활정보 서비스의 로딩과 캐시를 손보고 바뀐 파일만 배포한 뒤 테스트, 해시, 주요 화면을 작업 날짜별로 점검했습니다.',
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
			role: '대학생 현장실습(기획·데이터 자동화)',
			summary:
				'공장 에너지 관리 시스템의 화면과 데이터 구조를 정리하고 에너지 데이터 수집을 보조했습니다.',
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
				'동해선 이용객이 실시간 교통과 주변 정보를 한 지도에서 볼 수 있는 웹 서비스입니다.',
			highlights: [
				'백엔드 개발자 2명과 Swagger 문서를 보며 API를 연결하고, 72시간 안에 Google Maps와 주요 화면, 드래그형 바텀 시트를 구현했습니다.',
			],
			technologies: captainDonghae.techStack,
			evidence: [projectEvidence(captainDonghae.id)],
		},
		{
			id: shareBBy.id,
			title: 'ShareBBy',
			period: formatKoreanPeriod(shareBBy.duration),
			role: 'React Native와 Firebase 개발',
			summary:
				'취미 활동을 올리고 함께할 사람을 찾는 앱으로 2024년 App Store에 배포했습니다.',
			highlights: [
				'Android 대응과 게시글·댓글 작성 및 수정, 위치 필터, 목록 새로고침과 무한 스크롤을 구현했습니다.',
				'Firebase 데이터 관계를 ERD로 정리하고 이미지 캐시 문제를 재현해 대체 라이브러리를 적용했습니다.',
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
				'프로젝트 규칙과 이전 작업을 이어서 쓰기 위한 개인용 AI 에이전트 하네스입니다.',
			highlights: [
				'CLI, 스킬, 템플릿, 읽기 전용 MCP 도구를 만들고 파일을 바꾸는 명령에는 dry-run을 두었습니다.',
				'npm 패키지와 GitHub 저장소로 공개했습니다.',
			],
			technologies: aiAgentPlaybook.techStack,
			evidence: [projectEvidence(aiAgentPlaybook.id)],
		},
	],
	skillGroups: recruitingDocumentSkillGroups,
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
			detail: 'Cloud Application Engineering 과정, React와 React Native',
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
			'React 업무 웹을 새로 만들고 모바일 WebView와 Android 장비를 연결했습니다. 레거시 웹과 앱 유지보수, 운영 반영도 함께 맡았습니다.',
		responsibilities: [
			'조회, 예약, 입력, Excel, 출력으로 이어지는 업무 화면과 상태 구현',
			'WebView 메시지, Android 권한, Bluetooth, 프린터 SDK 연동',
			'레거시 웹·앱 오류 수정, 테스트, 운영 파일 배포와 주요 화면 점검',
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
		platform: careerPlatformByStory[story.id] ?? story.platform,
		goal: careerGoalByStory[story.id] ?? story.headline,
		contribution: contributionByStory[story.id],
		decision: decisionByStory[story.id],
		result: resultByStory[story.id],
		evidence: careerBriefEvidenceByStory[story.id],
		technologies: story.stack,
		evidenceRefs: [workStoryEvidence(story.id)],
	})),
	supportingWork: supportingStories.map((story) => ({
		id: story.id,
		title: story.title,
		period: story.period,
		decision: supportingDecisionByStory[story.id],
		result: supportingResultByStory[story.id] ?? story.checks[0],
		evidenceRef: workStoryEvidence(story.id),
	})),
	practices: [],
	skillGroups: [],
} as const satisfies CareerBriefCopy;
