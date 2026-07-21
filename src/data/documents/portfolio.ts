import { links as aboutLinks } from '@/data/about/links';
import { dictionaries } from '@/data/i18n/dictionaries';
import type {
	DocumentContentItem,
	DocumentMetric,
	PortfolioPageDefinition,
} from '@/types/documents';
import type { ProfessionalStory } from '@/types/work';
import { recruitingDocumentSkillGroups } from './documentSkills';
import { portfolioPublicEmails } from './publicContact';
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
	...portfolioPublicEmails.map(({ label, address }) => ({
		label,
		href: 'mailto:' + address,
	})),
	...aboutLinks
		.filter(({ type }) => type !== 'email')
		.map(({ text, url }) => ({ label: text, href: url })),
	{ label: '개인 사이트', href: 'https://jukrap.vercel.app' },
];

const moreLinks = [
	{ label: 'Work', href: 'https://jukrap.vercel.app/ko/work' },
	{ label: 'Projects', href: 'https://jukrap.vercel.app/ko/projects' },
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
			'레거시 웹과 Android WebView를 유지보수하며 외부 API 응답, 캐시, 위치 처리와 운영 배포를 고쳤습니다.',
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
		technologies: story.stack,
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [copy?.problem ?? story.context],
			},
			{
				id: 'decision',
				title: '구현과 판단',
				body:
					decisionBody ?? (story.editorial ? [story.editorial.decision] : undefined),
				items: actions,
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
		nickname: 'Jukrap',
		summary: '웹과 모바일이 한 흐름으로 이어지는 업무 도구를 개발해 왔습니다.',
		metadata: [
			{ label: '직무', value: '웹/모바일 프론트엔드 엔지니어' },
			{ label: '주요 경험', value: '웹, 하이브리드 앱, Android 연동' },
		],
		sections: [
			{
				id: 'positioning',
				body: [
					'네 가지 업무와 다섯 프로젝트에서 문제를 어떻게 파악했고 무엇을 구현했는지, 결과를 어디까지 직접 확인했는지 담았습니다.',
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
						title: '생활정보 서비스 유지보수',
						description:
							'첫 화면의 로딩과 캐시를 고치고, 바뀐 파일만 배포한 뒤 해시와 주요 화면을 다시 실행했습니다.',
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
		technologies: logisticsWeb.stack,
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
				title: '구현과 판단',
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
		technologies: logisticsMobile.stack,
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
				title: '구현과 판단',
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
					{
						title: '실행 환경 구분',
						description:
							'개발·운영 URL과 앱 식별자, 설치 산출물을 나눠 테스트용 설치와 운영 설치가 섞이지 않게 했습니다.',
					},
				],
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
			'옵션 변경, 패널 접기, 드래그 앤 드롭, 툴팁까지 같은 편집 흐름에서 점검했습니다.',
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
			{
				title: '부분 실패 기록',
				description:
					'생성에 실패한 항목은 현재 결과와 실행 이력에서 구분했고, 근거가 부족한 내용은 사람이 결정할 항목으로 남겼습니다.',
			},
		],
		[
			'자료 수집부터 초안, 워크북 검수, 부분 수정까지 각 단계를 따로 실행해 볼 수 있게 했습니다. 지원하지 않는 항목은 임의로 채우지 않고 사람이 결정할 내용으로 남겼습니다.',
		],
		[],
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
			{
				title: 'WebView 위치 처리',
				description:
					'Android 앱에서는 네이티브 위치를 먼저 사용하고 저장된 위치와 브라우저 경로를 대체 수단으로 뒀습니다.',
			},
		],
		[
			'서로 다른 날 진행한 두 배포를 합산하지 않았습니다. 각 작업의 파일 수와 해시 결과를 따로 기록했고, 운영 스모크 테스트와 최종 테스트도 별도로 남겼습니다.',
		],
		[],
	),
	{
		id: 'supporting-work',
		pageNumber: 8,
		kind: 'compact-work',
		eyebrow: '업무 경험',
		title: '추가 업무',
		summary:
			'금융 업무 웹은 React로 새로 만들었습니다. Android 호환성, 하이브리드 보안, 현장 단말과 레거시 패널 작업은 기존 환경에서 필요한 범위를 고쳤습니다.',
		sections: [
			{
				id: 'work-list',
				items: compactStories.map((story, index) => {
					const copy = compactWorkCopy[story.id];
					return {
						label: String(index + 1).padStart(2, '0'),
						title: story.title,
						description: copy?.description ?? story.headline,
						metadata: [
							{ label: '업무 성격', value: story.workType },
							{ label: '기간', value: story.period },
							{ label: '플랫폼', value: story.platform },
						],
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
			{ label: '팀', value: '3명' },
			{ label: '결과', value: 'DIVE 2024 부산테크노파크원장상' },
		],
		technologies: captainDonghae.techStack,
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'72시간 안에 열차, 날씨, 주변 장소처럼 출처가 다른 정보를 지도 한 화면에 모아야 했습니다. 제한 시간 안에 API 선택, 연동과 모바일 상호작용도 함께 결정해야 했습니다.',
				],
			},
			{
				id: 'contribution',
				title: '구현과 판단',
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
			},
			{
				id: 'result',
				title: '결과',
				body: [
					'지도 중심 화면과 드래그형 바텀 시트를 완성해 DIVE 2024 부산테크노파크원장상을 받았습니다.',
				],
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
		technologies: shareBBy.techStack,
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'iOS 기준으로 먼저 만든 화면을 Android에서도 동작하게 고쳐야 했고, 게시글 이미지가 갱신되지 않는 캐시 문제도 있었습니다.',
				],
			},
			{
				id: 'contribution',
				title: '구현과 판단',
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
			},
			{
				id: 'result',
				title: '결과',
				body: [
					'Android 화면과 커뮤니티 기능을 구현하고 이미지 캐시 문제를 고쳤습니다. 팀 앱은 2024년 App Store에 배포됐습니다.',
				],
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
			'프로젝트 규칙과 이전 작업을 이어서 사용할 수 있도록 CLI, 스킬, 문서 틀과 점검 명령을 묶은 개인용 AI 에이전트 하네스입니다.',
		metadata: [
			{ label: '기간', value: formatKoreanPeriod(aiAgentPlaybook.duration) },
			{ label: '개발', value: '1인 개발' },
			{ label: '배포', value: 'npm 패키지와 GitHub 저장소' },
		],
		technologies: aiAgentPlaybook.techStack,
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'프로젝트마다 작업 규칙과 이전 기록이 흩어져 있으면 에이전트가 같은 내용을 다시 찾고, 파일을 바꾸는 명령의 영향도 실행 전에 알기 어렵습니다.',
				],
			},
			{
				id: 'contribution',
				title: '구현과 판단',
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
				],
			},
			{
				id: 'result',
				title: '결과',
				body: [
					'CLI와 읽기 전용 MCP 도구를 npm 패키지와 GitHub 저장소로 공개했습니다. 파일을 바꾸는 명령은 dry-run 결과를 먼저 보여줍니다.',
				],
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
		id: 'itzip',
		pageNumber: 12,
		kind: 'project',
		eyebrow: '프로젝트 04  웹',
		title: 'Itzip',
		summary:
			'15명 팀에서 블로그와 Markdown 편집 화면을 만들고, 테스트와 오류 관측 도구를 프론트엔드 개발 흐름에 더했습니다.',
		metadata: [
			{ label: '기간', value: formatKoreanPeriod(itzip.duration) },
			{ label: '팀', value: '15명' },
			{ label: '역할', value: '프론트엔드 팀장 / DevOps' },
		],
		technologies: [
			'TypeScript',
			'React',
			'Next.js',
			'Jest',
			'Storybook',
			'Sentry',
			'Jenkins',
			'Docker',
		],
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'블로그 목록과 편집 화면을 함께 만들면서 컴포넌트 동작과 배포 뒤 오류를 팀이 같은 방식으로 살펴볼 수 있어야 했습니다.',
				],
			},
			{
				id: 'contribution',
				title: '구현과 판단',
				items: [
					{
						title: 'Markdown 편집 화면',
						description:
							'본문을 쓰는 동안 결과를 바로 볼 수 있는 미리보기와 프로젝트 전용 Markdown 문법을 구현했습니다.',
					},
					{
						title: '테스트와 오류 관측',
						description:
							'Jest로 주요 동작을 점검하고 Storybook에 컴포넌트를 모았습니다. 배포 뒤 오류는 Sentry에서 볼 수 있게 구성했습니다.',
					},
					{
						title: '필요한 시점에 화면 코드 로드',
						description:
							'게시글 안의 무거운 컴포넌트는 Next.js dynamic import로 필요한 시점에 불러오도록 바꿨습니다.',
					},
				],
			},
			{
				id: 'result',
				title: '결과',
				body: [
					'블로그와 Markdown 편집 화면을 구현했고, 단위 테스트와 컴포넌트 문서, 배포 뒤 오류 관측 경로를 팀 프로젝트에 적용했습니다.',
				],
				links: visibleProjectLinks(itzip.id),
			},
		],
		images: [
			{
				src: '/images/itzip/image6.png',
				alt: 'Itzip Markdown 편집 화면',
				caption: 'Markdown 편집과 미리보기',
				layout: 'wide',
			},
		],
		evidence: [projectEvidence(itzip.id)],
	},
	{
		id: 'posture-teacher',
		pageNumber: 13,
		kind: 'project',
		eyebrow: '프로젝트 05  Android',
		title: 'Posture Teacher',
		summary:
			'카메라 프레임에서 신체 지점을 읽어 앉은 자세와 플랭크 자세를 판별하고 측정 기록을 남기는 Android 앱을 만들었습니다.',
		metadata: [
			{ label: '기간', value: formatKoreanPeriod(postureTeacher.duration) },
			{ label: '팀', value: '2명' },
			{ label: '역할', value: '팀장 / Android 개발' },
		],
		technologies: postureTeacher.techStack,
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'카메라 프레임을 계속 분석하면서도 화면이 멈추지 않아야 했고, MediaPipe를 Android 프로젝트에서 쓸 수 있는 형태로 직접 빌드해야 했습니다.',
				],
			},
			{
				id: 'contribution',
				title: '구현과 판단',
				items: [
					{
						title: 'MediaPipe Android 통합',
						description:
							'Docker와 MSYS2에서 이어가지 못한 빌드를 Ubuntu에서 다시 진행해 MediaPipe AAR를 만들고 앱에 넣었습니다.',
					},
					{
						title: '자세 판별과 타이머',
						description:
							'신체 지점의 각도와 길이로 앉은 자세와 플랭크 자세를 판별하고, 유지 시간과 어긋난 시간을 각각 기록했습니다.',
					},
					{
						title: '프레임 처리 분리',
						description:
							'분석 작업을 별도 스레드에서 실행해 구형 기기에서도 화면 입력과 프레임 처리가 서로 막지 않도록 했습니다.',
					},
				],
			},
			{
				id: 'result',
				title: '결과',
				body: [
					'프로젝트 당시 OpenCV 구현보다 프레임 처리 FPS가 5~10배 높았습니다. 자세 판별 정확도와는 별개로 측정했습니다.',
				],
				links: visibleProjectLinks(postureTeacher.id),
			},
		],
		images: [
			{
				src: '/images/posture-teacher/image5.png',
				alt: 'Posture Teacher 자세 분석 결과 화면',
				caption: '자세 분석 결과와 측정 기록',
				layout: 'phone',
			},
		],
		evidence: [projectEvidence(postureTeacher.id)],
	},
	{
		id: 'closing',
		pageNumber: 14,
		kind: 'closing',
		eyebrow: '프로필',
		title: '기술, 교육과 수상',
		summary: '앞선 사례에서 사용한 기술과 교육, 수상 이력을 한곳에 모았습니다.',
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
				id: 'education',
				title: '교육',
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
				],
			},
			{
				id: 'awards',
				title: '수상',
				items: [
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
				id: 'more',
				title: '더 보기',
				body: [
					'개인 사이트의 Work에는 업무별 구현과 점검 기록을, Projects에는 프로젝트 화면과 세부 작업을 남겼습니다.',
				],
				links: moreLinks,
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
