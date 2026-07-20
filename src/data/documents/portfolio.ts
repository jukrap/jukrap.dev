import { links as aboutLinks } from '@/data/about/links';
import { personalInfo } from '@/data/about/personalInfo';
import { dictionaries } from '@/data/i18n/dictionaries';
import type {
	DocumentContentItem,
	DocumentMetric,
	PortfolioPageDefinition,
} from '@/types/documents';
import type { ProfessionalStory } from '@/types/work';
import { recruitingDocumentSkillGroups } from './documentSkills';
import {
	formatKoreanPeriod,
	getProject,
	getWorkStory,
	projectEvidence,
	toMetric,
	visibleProjectLinks,
	workCaseEvidence,
	workStoryEvidence,
} from './sourceSelectors';

const logistics = getWorkStory('delivery-output-flow');
const logisticsWeb = logistics.chapters.find(
	({ id }) => id === 'delivery-operations-web',
)!;
const logisticsMobile = logistics.chapters.find(
	({ id }) => id === 'mobile-output-bridge',
)!;
const logisticsWebResult = logistics.resultSections.find(
	({ id }) => id === 'delivery-operations-web',
)!;
const logisticsMobileResult = logistics.resultSections.find(
	({ id }) => id === 'mobile-output-bridge',
)!;

const chartEditor = getWorkStory('structured-editor-ui');
const aiDocumentation = getWorkStory('ai-kickoff-documentation-tool');
const lifeInformation = getWorkStory('hybrid-life-info-platform');
const compactStories = [
	'legacy-mobile-compatibility',
	'react-admin-state-migration',
	'hybrid-security-boundary',
	'field-terminal-android',
	'legacy-panel-baseline',
].map(getWorkStory);

const captainDonghae = getProject('captain-donghae');
const shareBBy = getProject('sharebby');
const aiAgentPlaybook = getProject('ai-agent-playbook');
const itzip = getProject('itzip');
const postureTeacher = getProject('posture-teacher');

const publicLinks = [
	{ label: '이메일', href: 'mailto:' + personalInfo.email },
	...aboutLinks
		.filter(({ type }) => type !== 'email')
		.map(({ text, url }) => ({ label: text, href: url })),
	{ label: '개인 사이트', href: 'https://jukrap.vercel.app' },
];

const portfolioMetricCopy: Record<string, Partial<DocumentMetric>> = {
	'2,405.50 → 616.59 kB': {
		label: '초기 JavaScript',
		detail: '약 74% 감소. 페이지와 스프레드시트 코드 지연 로딩 결과',
	},
	'815.10 → 204.38 kB': {
		label: 'gzip 압축 기준',
		detail: '약 75% 감소. 같은 초기 진입 파일 비교',
	},
	'상태 동기화': {
		label: '데이터·미리보기·설정',
	},
	'재렌더 조건 축소': {
		label: '혼합 차트 미리보기',
		value: '다시 그리는 범위 축소',
		detail: '불필요한 화면 재생성과 스크롤 흔들림을 줄인 범위로 한정',
	},
	'근거 우선': {
		label: '자료 수집 → 미리보기',
	},
	'workbook 검수': {
		value: '검수용 워크북',
	},
	'약 2.85초 → 0.11초': {
		label: '기본 정보 운영 점검',
		detail: '2026-07-08 당시 첫 요청과 캐시 응답 비교',
	},
	'약 2.02초 → 0.07초': {
		label: '대기질 운영 점검',
		detail: '2026-07-08 당시 첫 요청과 캐시 응답 비교',
	},
};

const portfolioStoryCopy: Partial<
	Record<string, { summary?: string; problem?: string; area?: string }>
> = {
	'structured-editor-ui': {
		summary:
			'데이터 역할과 설정 화면이 실제 미리보기와 어긋나지 않는 편집 흐름을 설계했습니다.',
		problem:
			'모든 차트에 같은 옵션을 강제하면 설정 화면이 복잡해집니다. 미리보기와 편집 상태가 따로 움직이면 사용자가 현재 결과를 믿기도 어렵습니다.',
	},
	'ai-kickoff-documentation-tool': {
		area: 'AI API / 문서 도구',
	},
	'hybrid-life-info-platform': {
		summary:
			'레거시 웹과 Android WebView 위에서 외부 API, 캐시, 위치 흐름과 운영 반영 절차를 손봤습니다.',
	},
};

const compactWorkCopy: Partial<
	Record<string, { description?: string; value?: string }>
> = {
	'hybrid-security-boundary': {
		value: '인증 정보는 서버에서 관리',
	},
	'legacy-panel-baseline': {
		description:
			'레거시 화면을 바로 나누기 전에 공유 코드, API 규약과 브라우저 지원 범위를 먼저 확인했습니다.',
		value: '변경 전 영향 지점 지도화',
	},
};

function toPortfolioMetric(
	impact: Parameters<typeof toMetric>[0],
): DocumentMetric {
	const metric = toMetric(impact);
	return { ...metric, ...portfolioMetricCopy[metric.value] };
}

function featuredWorkPage(
	pageNumber: number,
	eyebrow: string,
	story: ProfessionalStory,
	actions: readonly DocumentContentItem[],
	resultBody: readonly string[],
	decisionBody?: readonly string[],
): PortfolioPageDefinition {
	const copy = portfolioStoryCopy[story.id];
	return {
		id: story.id,
		pageNumber,
		kind: 'case',
		eyebrow,
		title: story.title,
		summary: copy?.summary ?? story.headline,
		metadata: [
			{ label: '기간', value: story.period },
			{ label: '담당', value: copy?.area ?? story.area },
			{ label: '직무', value: story.role },
		],
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [copy?.problem ?? story.context],
			},
			{
				id: 'decision',
				title: '내가 한 일',
				body:
					decisionBody ?? (story.editorial ? [story.editorial.decision] : undefined),
				items: actions,
				technologies: story.stack,
			},
			{
				id: 'result',
				title: '결과',
				body: resultBody,
				metrics: story.impact.map(toPortfolioMetric),
			},
		],
		evidence: [workStoryEvidence(story.id)],
	};
}

export const portfolioDocument = [
	{
		id: 'cover',
		pageNumber: 1,
		kind: 'cover',
		eyebrow: '웹/모바일 프론트엔드 엔지니어',
		title: '박주철',
		summary:
			'업무 웹과 모바일 앱을 만들고 Android 장비 연동까지 다룹니다. 화면에서 시작한 사용자의 일이 실제 출력과 운영 배포까지 이어지도록 구현하고, 제가 확인한 범위를 수치와 실행 환경으로 남깁니다.',
		metadata: [
			{ label: '직무', value: '웹/모바일 프론트엔드 엔지니어' },
			{ label: '주요 경험', value: '업무 웹, 하이브리드 앱, Android 연동' },
		],
		sections: [
			{
				id: 'positioning',
				body: [
					'신규 화면을 만드는 일과 오래된 시스템을 고치는 일을 함께 경험했습니다. 기능을 한 번에 바꾸기보다 웹, WebView, Android가 맡을 일을 나누고 각 환경에서 직접 실행해 봅니다.',
				],
				links: publicLinks,
			},
		],
		evidence: [
			{ source: 'profile', id: 'personal-info' },
			{ source: 'profile', id: 'links' },
		],
	},
	{
		id: 'experience-overview',
		pageNumber: 2,
		kind: 'overview',
		eyebrow: '경력',
		title: '트리포스에서 맡은 일',
		summary:
			'신규 업무 웹을 구축하고 모바일 출력 앱을 연결했습니다. 차트 편집 도구와 AI 문서화 도구를 만들었고, 레거시 웹과 Android 앱의 오류를 고쳐 운영에 반영했습니다.',
		metadata: [
			{
				label: '회사와 기간',
				value:
					dictionaries.ko.about.careerSummary.company +
					'  ' +
					formatKoreanPeriod(dictionaries.ko.about.careerSummary.period),
			},
			{
				label: '직무',
				value: dictionaries.ko.about.careerSummary.role,
			},
		],
		sections: [
			{
				id: 'main-work',
				title: '주요 경험',
				items: [
					{
						title: '물류 운영 웹과 모바일 출력',
						description:
							'조회, 예약, Excel, 출력 요청을 웹에 구현하고 WebView 요청 뒤의 권한, Bluetooth, 라벨 출력은 Android 앱에서 처리했습니다.',
					},
					{
						title: '차트 편집 도구',
						description:
							'차트마다 쓸 수 있는 옵션을 나누고 데이터 필드, 미리보기, 설정 화면이 같은 편집 상태를 보도록 만들었습니다.',
					},
					{
						title: 'AI 문서화 도구',
						description:
							'저장소를 먼저 읽고 초안을 만든 뒤 검수용 워크북에서 필요한 부분만 다시 고치는 흐름을 구현했습니다.',
					},
					{
						title: '생활정보 서비스 운영',
						description:
							'필수 정보의 로딩과 캐시를 손보고, 바뀐 파일만 배포한 뒤 해시와 주요 화면으로 반영 결과를 점검했습니다.',
					},
				],
			},
			{
				id: 'additional-work',
				title: '추가 업무',
				body: [
					'Android 호환성, 금융 업무 웹, 하이브리드 보안, 현장 단말, 레거시 웹 패널 작업은 8쪽에 짧게 정리했습니다.',
				],
			},
		],
		evidence: [
			workStoryEvidence('delivery-output-flow'),
			workStoryEvidence('structured-editor-ui'),
			workStoryEvidence('ai-kickoff-documentation-tool'),
			workStoryEvidence('hybrid-life-info-platform'),
		],
	},
	{
		id: 'logistics-web',
		pageNumber: 3,
		kind: 'case',
		eyebrow: '주요 업무 01  웹',
		title: '물류 운영 웹',
		summary:
			'조회부터 예약, Excel, 출력 요청까지 이어지는 운영 화면을 만들고 첫 화면에 함께 실리던 무거운 코드를 덜어냈습니다.',
		metadata: [
			{ label: '기간', value: logisticsWeb.period },
			{ label: '담당', value: logisticsWeb.area },
			{ label: '직무', value: logisticsWeb.role },
		],
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'예약과 다건 처리, 주소록, Excel 미리보기, 출력 요청이 한 화면 흐름으로 이어졌습니다. 여기에 스프레드시트 코드까지 첫 진입에 포함돼 업무를 시작하기 전부터 내려받아야 할 JavaScript가 컸습니다.',
				],
			},
			{
				id: 'decision',
				title: '내가 한 일',
				items: [
					{
						title: '운영 흐름 구현',
						description:
							'공통 화면 틀과 표, 모달, 폼 위에 조회, 예약, 다건 처리, 주소 선택, Excel 미리보기와 출력 요청 변환을 연결했습니다.',
					},
					{
						title: '측정 뒤 지연 로딩 적용',
						description:
							'번들 분석 결과를 보고 페이지 라우트와 스프레드시트 라이브러리를 첫 진입에서 뺐습니다. 인증과 API 초기화까지 더 나누는 안은 첫 클릭 부담이 커 적용하지 않았습니다.',
					},
				],
				technologies: logisticsWeb.stack,
			},
			{
				id: 'evidence',
				title: '결과',
				body: [
					'초기 진입에 필요하지 않은 화면과 Excel 코드를 옮긴 뒤 같은 빌드 산출물에서 초기 JavaScript와 gzip 크기를 다시 비교했습니다.',
				],
				metrics: logisticsWebResult.impact.map(toPortfolioMetric),
			},
		],
		evidence: [
			workStoryEvidence(logistics.id),
			workCaseEvidence(logisticsWeb.id),
		],
	},
	{
		id: 'logistics-mobile',
		pageNumber: 4,
		kind: 'case',
		eyebrow: '주요 업무 01  모바일',
		title: '모바일 출력 브릿지 앱',
		summary:
			'웹의 출력 요청을 Android 앱으로 받아 권한, Bluetooth 연결, 프린터 명령을 거쳐 실제 라벨이 나오는 데까지 구현했습니다.',
		metadata: [
			{ label: '기간', value: logisticsMobile.period },
			{ label: '담당', value: 'WebView / Android 네이티브 모듈' },
			{ label: '직무', value: logisticsMobile.role },
		],
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'웹에서 출력 버튼이 동작해도 장비가 라벨을 출력했다는 뜻은 아닙니다. 웹과 앱의 메시지, Android 권한, Bluetooth 연결, 프린터 SDK 가운데 어디서 멈췄는지 알 수 있어야 했습니다.',
				],
			},
			{
				id: 'decision',
				title: '내가 한 일',
				items: [
					{
						title: '웹과 앱의 역할 구분',
						description:
							'업무 화면은 WebView에 두고 출력 데이터 변환, 장비 상태, 프린터 명령은 Android 네이티브 모듈이 맡도록 구현했습니다.',
					},
					{
						title: '실기기 출력 점검',
						description:
							'Android 16/API 36에서 장비 탐색 호출을 추적하고 취소 처리와 Bluetooth 권한을 보완한 뒤 실물 라벨을 출력했습니다.',
					},
				],
				technologies: logisticsMobile.stack,
			},
			{
				id: 'evidence',
				title: '결과',
				body: [
					'요청 수신과 장비 출력을 따로 점검해 웹 요청 성공이 물리 출력 성공으로 잘못 기록되지 않게 했습니다.',
				],
				metrics: logisticsMobileResult.impact.map(toPortfolioMetric),
			},
		],
		evidence: [
			workStoryEvidence(logistics.id),
			workCaseEvidence(logisticsMobile.id),
		],
	},
	featuredWorkPage(
		5,
		'주요 업무 02  웹 도구',
		chartEditor,
		[
			{
				title: '차트에 맞는 설정만 노출',
				description:
					'현재 차트에서 쓸 수 있는 옵션만 보여주고 여섯 영역의 설정 패널과 미리보기를 연결했습니다.',
			},
			{
				title: '편집 상태를 역할별로 구성',
				description:
					'데이터 필드, 미리보기 렌더링, 설정 상태가 서로 덮어쓰지 않도록 나누고 하나의 편집 모델을 바라보게 했습니다.',
			},
		],
		[
			'옵션 변경, 패널 접기, 드래그 앤 드롭, 툴팁까지 같은 편집 흐름에서 점검했습니다. 작업 속도 향상처럼 측정하지 않은 성과는 적지 않았습니다.',
		],
		[
			'모든 차트에 같은 옵션을 붙이는 대신 차트 종류에 따라 필요한 설정을 고르고, 데이터가 바뀔 때 미리보기와 설정 화면이 함께 갱신되게 만들었습니다.',
		],
	),
	featuredWorkPage(
		6,
		'주요 업무 03  사내 도구',
		aiDocumentation,
		[
			{
				title: '저장소를 읽고 먼저 미리보기',
				description:
					'규칙으로 모은 파일과 구조 정보를 AI에 보내기 전에 사용자가 확인하도록 했습니다.',
			},
			{
				title: '검수용 워크북에서 부분 수정',
				description:
					'확인한 자료로 요구사항, 기능, 화면 초안을 만들고 선택한 시트와 셀만 다시 작성하도록 구현했습니다.',
			},
		],
		[
			'자료 수집부터 초안, 워크북 검수, 부분 수정까지 각 단계를 따로 실행해 볼 수 있게 했습니다. 지원하지 않는 항목은 임의로 채우지 않고 사람이 결정할 내용으로 남겼습니다.',
		],
		[
			'AI가 처음부터 문서를 완성한다고 가정하지 않았습니다. 입력 자료와 생성 결과를 사람이 볼 수 있게 두고 수정 범위를 작게 제한했습니다.',
		],
	),
	featuredWorkPage(
		7,
		'주요 업무 04  하이브리드 서비스',
		lifeInformation,
		[
			{
				title: '필수 정보부터 표시',
				description:
					'첫 화면에 필요한 정보와 뒤에 불러올 정보를 나누고 최신 캐시, 만료 캐시, 기준 데이터를 각각 다뤘습니다.',
			},
			{
				title: '바뀐 파일만 운영 반영',
				description:
					'전체 파일을 덮어쓰지 않고 배포 목록과 SHA-256 해시로 대상을 좁힌 뒤 주요 화면을 다시 실행했습니다.',
			},
		],
		[
			'서로 다른 날 진행한 두 배포를 합산하지 않았습니다. 각 작업의 파일 수와 해시 결과를 따로 기록했고, 운영 스모크 테스트와 최종 테스트도 별도로 남겼습니다.',
		],
		[
			'외부 API가 느리거나 실패해도 첫 화면 전체가 멈추지 않도록 로딩 순서를 바꾸고, 캐시가 최신인지 만료됐는지에 따라 사용할 값을 골랐습니다.',
		],
	),
	{
		id: 'supporting-work',
		pageNumber: 8,
		kind: 'compact-work',
		eyebrow: '추가 업무',
		title: '유지보수에서 맡은 일',
		summary:
			'짧은 작업도 빌드가 되는지, 실제 실행이 되는지, 운영에서 되돌릴 수 있는지를 구분해 처리했습니다.',
		sections: [
			{
				id: 'work-list',
				items: compactStories.map((story, index) => {
					const copy = compactWorkCopy[story.id];
					return {
						label: String(index + 1).padStart(2, '0'),
						title: story.title,
						description: copy?.description ?? story.headline,
						meta: story.period + '  ' + story.platform,
						value:
							copy?.value ??
							(story.impact[0]
								? story.impact[0].label + ': ' + story.impact[0].value
								: undefined),
						technologies: story.stack,
						evidence: [workStoryEvidence(story.id)],
					};
				}),
			},
		],
		evidence: compactStories.map(({ id }) => workStoryEvidence(id)),
	},
	{
		id: 'captain-donghae',
		pageNumber: 9,
		kind: 'project',
		eyebrow: '프로젝트 01  웹',
		title: 'C. Donghae',
		summary:
			'72시간 동안 동해선 이용객이 열차와 주변 정보를 한 지도에서 볼 수 있는 웹 서비스를 만들었습니다.',
		metadata: [
			{ label: '기간', value: formatKoreanPeriod(captainDonghae.duration) },
			{ label: '팀', value: '3명, 유일한 프론트엔드 개발자' },
			{ label: '결과', value: 'DIVE 2024 부산테크노파크원장상' },
		],
		sections: [
			{
				id: 'contribution',
				title: '내가 한 일',
				items: [
					{
						title: '지도와 외부 데이터 연결',
						description:
							'Google Maps의 지도, 장소 검색, 대중교통 경로, 주소 변환과 날씨, 역 정보, 주변 장소 데이터를 한 화면에 연결했습니다.',
					},
					{
						title: '모바일 지도 화면 구현',
						description:
							'지도 정보를 가리지 않도록 드래그 거리와 속도에 따라 높이가 바뀌는 바텀 시트를 구현했습니다.',
					},
					{
						title: '제한 시간 안의 협업',
						description:
							'웹 지원 기능을 비교해 지도 API를 정하고 Swagger 문서를 보며 백엔드 API와 주요 화면을 연결했습니다.',
					},
				],
				technologies: captainDonghae.techStack,
				links: visibleProjectLinks(captainDonghae.id),
			},
		],
		images: [
			{
				src: '/images/captain-donghae/image1.png',
				alt: '동해선장 지도 중심 메인 화면',
				layout: 'split',
			},
			{
				src: '/images/captain-donghae/image3.png',
				alt: '동해선장 지도와 바텀 시트 정보 화면',
				layout: 'split',
			},
		],
		evidence: [
			projectEvidence(captainDonghae.id),
			{ source: 'award', id: 'DIVE 2024 해커톤' },
		],
	},
	{
		id: 'sharebby',
		pageNumber: 10,
		kind: 'project',
		eyebrow: '프로젝트 02  모바일',
		title: 'ShareBBy',
		summary:
			'취미 활동을 올리고 함께할 사람을 찾는 React Native 앱에서 Android 대응과 커뮤니티 기능을 맡았습니다.',
		metadata: [
			{ label: '기간', value: formatKoreanPeriod(shareBBy.duration) },
			{ label: '팀', value: '5명' },
			{ label: '배포', value: '2024년 App Store 배포 이력' },
		],
		sections: [
			{
				id: 'contribution',
				title: '내가 한 일',
				items: [
					{
						title: '게시글과 댓글 흐름',
						description:
							'게시글과 댓글 작성·수정·삭제, 위치 필터, 정렬, 당겨서 새로고침, 무한 스크롤을 구현했습니다.',
					},
					{
						title: 'Firebase 데이터 연결',
						description:
							'데이터 관계를 ERD로 정리하고 댓글, 좋아요, 여러 이미지가 연결되는 흐름을 만들었습니다.',
					},
					{
						title: '이미지 캐시 교체',
						description:
							'기본 이미지 컴포넌트의 캐시 문제를 재현하고 업데이트가 중단된 라이브러리 대신 유지되는 대안을 적용했습니다.',
					},
				],
				technologies: shareBBy.techStack,
				links: visibleProjectLinks(shareBBy.id),
			},
		],
		images: [
			{
				src: '/images/sharebby/image1.png',
				alt: 'ShareBBy 모바일 앱 화면',
				layout: 'phone',
			},
			{
				src: '/images/sharebby/image6.png',
				alt: 'ShareBBy 커뮤니티 화면',
				layout: 'phone',
			},
		],
		evidence: [projectEvidence(shareBBy.id)],
	},
	{
		id: 'ai-agent-playbook',
		pageNumber: 11,
		kind: 'project',
		eyebrow: '프로젝트 03  개발 도구',
		title: 'AI Agent Playbook',
		summary:
			'에이전트가 프로젝트 규칙과 이전 작업을 매번 처음부터 찾지 않도록 CLI, 문서 틀, 점검 명령을 묶은 공개 도구입니다.',
		metadata: [
			{ label: '기간', value: formatKoreanPeriod(aiAgentPlaybook.duration) },
			{ label: '개발', value: '1인 개발' },
			{ label: '배포', value: 'npm 패키지와 GitHub 저장소' },
		],
		sections: [
			{
				id: 'contribution',
				title: '만든 이유와 범위',
				items: [
					{
						title: '규칙과 프로젝트 메모리 분리',
						description:
							'반복해서 쓰는 작업 규칙은 스킬과 템플릿으로, 프로젝트에만 필요한 내용은 저장소 안의 메모리로 나눴습니다.',
					},
					{
						title: '실행 전 결과를 볼 수 있게 구성',
						description:
							'CLI 명령과 읽기 전용 MCP 도구를 만들고 파일을 바꾸는 명령에는 실행 전 결과를 보여주는 dry-run을 두었습니다.',
					},
					{
						title: '공개 배포',
						description:
							'npm에서 설치할 수 있는 패키지와 GitHub 저장소로 배포해 다른 프로젝트에서도 같은 흐름을 쓸 수 있게 했습니다.',
					},
				],
				technologies: aiAgentPlaybook.techStack,
				links: visibleProjectLinks(aiAgentPlaybook.id),
			},
		],
		images: [
			{
				src: '/images/ai-agent-playbook/npm-overview.png',
				alt: 'npm에 공개된 AI Agent Playbook 패키지 페이지',
				caption: 'npm 패키지 페이지',
				layout: 'wide',
			},
			{
				src: '/images/ai-agent-playbook/quick-start.png',
				alt: 'AI Agent Playbook 설치와 시작 명령 안내',
				caption: '설치와 초기 설정',
				layout: 'wide',
			},
		],
		evidence: [projectEvidence(aiAgentPlaybook.id)],
	},
	{
		id: 'selected-projects',
		pageNumber: 12,
		kind: 'project-collection',
		eyebrow: '프로젝트 04–05',
		title: 'Itzip과 Posture Teacher',
		summary:
			'팀 웹 서비스에서는 편집과 품질 도구를, Android 프로젝트에서는 카메라 프레임과 자세 분석을 맡았습니다.',
		sections: [
			{
				id: 'project-list',
				items: [
					{
						label: '웹',
						title: itzip.subtitle,
						meta: formatKoreanPeriod(itzip.duration),
						description:
							'15명 팀에서 프론트엔드 팀장을 맡아 블로그와 Markdown 편집 화면을 구현했습니다. Jest, Storybook, Sentry를 도입해 주요 화면과 오류를 살펴볼 수 있게 했습니다.',
						technologies: itzip.techStack,
						links: visibleProjectLinks(itzip.id),
						evidence: [projectEvidence(itzip.id)],
					},
					{
						label: 'Android',
						title: postureTeacher.subtitle,
						meta: formatKoreanPeriod(postureTeacher.duration),
						description:
							'MediaPipe AAR를 Ubuntu에서 빌드해 Android 앱에 넣었습니다. 프로젝트 당시 OpenCV 구현과 비교한 프레임 처리에서 5~10배 높은 FPS 범위를 확인했습니다.',
						technologies: postureTeacher.techStack,
						links: visibleProjectLinks(postureTeacher.id),
						evidence: [projectEvidence(postureTeacher.id)],
					},
				],
			},
		],
		images: [
			{
				src: '/images/itzip/image6.png',
				alt: 'Itzip Markdown 편집 화면',
				caption: 'Itzip 편집 화면',
				layout: 'wide',
			},
			{
				src: '/images/posture-teacher/image5.png',
				alt: 'Posture Teacher 자세 분석 결과 화면',
				caption: 'Posture Teacher 분석 결과',
				layout: 'phone',
			},
		],
		evidence: [projectEvidence(itzip.id), projectEvidence(postureTeacher.id)],
	},
	{
		id: 'closing',
		pageNumber: 13,
		kind: 'closing',
		eyebrow: '프로필',
		title: '기술과 연락처',
		summary:
			'웹 화면과 모바일 앱을 함께 만들었고, Android 장비와 레거시 시스템도 필요한 만큼 직접 다뤘습니다. 기술 이름보다 어느 작업에서 어떻게 썼는지를 포트폴리오와 개인 사이트에 남겼습니다.',
		sections: [
			{
				id: 'skills',
				title: '기술',
				items: recruitingDocumentSkillGroups.map(({ label, items }) => ({
					title: label,
					description: items.join(', '),
				})),
			},
			{
				id: 'education-and-awards',
				title: '교육과 수상',
				items: [
					{
						title: '경상국립대학교 컴퓨터과학과',
						meta: '2023.02 졸업',
						description: '학점 3.64 / 4.5',
						evidence: [{ source: 'profile', id: 'education-university' }],
					},
					{
						title: '프로그래머스 데브코스',
						meta: '2023.12 ~ 2024.05',
						description: 'Cloud Application Engineering 과정 수료',
						evidence: [{ source: 'activity', id: 'programmers-devcourse-student' }],
					},
					{
						title: 'DIVE 2024 글로벌 데이터 해커톤',
						meta: '2024.10',
						description: '부산테크노파크원장상 수상',
						evidence: [{ source: 'award', id: 'DIVE 2024 해커톤' }],
					},
					{
						title: '경남소프트웨어 경진대회',
						meta: '2021.10',
						description: '최우수상 수상',
						evidence: [{ source: 'award', id: '경남소프트웨어 경진대회' }],
					},
				],
			},
			{
				id: 'contact',
				title: '연락처',
				body: [
					'업무의 세부 구현과 점검 기록은 개인 사이트 Work에서, 프로젝트별 화면과 구현 내용은 Projects에서 볼 수 있습니다.',
				],
				links: publicLinks,
			},
		],
		evidence: [
			{ source: 'profile', id: 'skills' },
			{ source: 'profile', id: 'education-university' },
			{ source: 'activity', id: 'programmers-devcourse-student' },
			{ source: 'award', id: 'DIVE 2024 해커톤' },
			{ source: 'award', id: '경남소프트웨어 경진대회' },
		],
	},
] as const satisfies readonly PortfolioPageDefinition[];
