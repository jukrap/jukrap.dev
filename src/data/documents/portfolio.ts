import { links as aboutLinks } from '@/data/about/links';
import { personalInfo } from '@/data/about/personalInfo';
import { skills } from '@/data/about/skills';
import { dictionaries } from '@/data/i18n/dictionaries';
import type {
	DocumentContentItem,
	PortfolioPageDefinition,
} from '@/types/documents';
import type { ProfessionalStory } from '@/types/work';
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
	{ label: 'Email', href: `mailto:${personalInfo.email}` },
	...aboutLinks
		.filter(({ type }) => type !== 'email')
		.map(({ text, url }) => ({ label: text, href: url })),
	{ label: 'Website', href: 'https://jukrap.vercel.app' },
];

function featuredWorkPage(
	pageNumber: number,
	eyebrow: string,
	story: ProfessionalStory,
	implementation: readonly DocumentContentItem[],
	resultBody: readonly string[],
): PortfolioPageDefinition {
	return {
		id: story.id,
		pageNumber,
		kind: 'case',
		eyebrow,
		title: story.title,
		summary: story.headline,
		metadata: [
			{ label: 'Period', value: story.period },
			{ label: 'Scope', value: story.area },
			{ label: 'Role', value: story.role },
		],
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [story.context],
			},
			{
				id: 'decision',
				title: '핵심 판단과 실행',
				body: story.editorial ? [story.editorial.decision] : undefined,
				items: implementation,
				technologies: story.stack,
			},
			{
				id: 'result',
				title: '결과와 남긴 기준',
				body: resultBody,
				metrics: story.impact.map(toMetric),
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
		eyebrow: 'Portfolio 2026',
		title: '박주철',
		summary:
			'React 웹 화면과 React Native 및 Android 연동을 함께 다룹니다. 사용자의 작업이 브라우저를 넘어 장비와 운영까지 이어질 때 책임을 나누고 각 환경에서 결과를 확인합니다.',
		metadata: [
			{ label: 'Role', value: '웹/모바일 프론트엔드 엔지니어' },
			{ label: 'Focus', value: '사용자 흐름, 시스템 경계, 검증 가능한 결과' },
		],
		sections: [
			{
				id: 'positioning',
				body: [
					'React 기반 업무 화면과 모바일 WebView, Android 연동처럼 하나의 사용자 흐름이 여러 실행 환경을 지날 때 책임과 실패 경계를 먼저 나눕니다.',
					'기능이 동작한다는 설명에서 멈추지 않고, 번들, 테스트, 실기기, 운영 배포처럼 사례에 맞는 기준으로 확인한 범위를 남깁니다.',
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
		eyebrow: 'Experience Overview',
		title: '웹 화면에서 장비와 운영까지',
		summary:
			'신규 웹 구축부터 모바일 출력, Android 호환성, 레거시 운영 개선까지 맡은 범위를 네 가지 기준으로 요약했습니다.',
		metadata: [
			{
				label: 'Career',
				value: `${dictionaries.ko.about.careerSummary.company}  ${formatKoreanPeriod(dictionaries.ko.about.careerSummary.period)}`,
			},
			{
				label: 'Role',
				value: dictionaries.ko.about.careerSummary.role,
			},
		],
		sections: [
			{
				id: 'principles',
				title: '업무를 정리하는 네 가지 기준',
				items: [
					{
						title: '사용자 흐름부터 나눕니다',
						description:
							'화면 단위보다 조회, 입력, 저장, 출력처럼 사용자가 완료하려는 흐름을 먼저 확인합니다.',
					},
					{
						title: '브라우저와 장비 책임을 섞지 않습니다',
						description:
							'웹 상태, WebView contract, Android 권한과 장비 SDK를 각각 확인할 수 있는 경계로 둡니다.',
					},
					{
						title: '측정한 범위만 결과로 씁니다',
						description:
							'번들 크기, 테스트, 실기기 출력, 배포 hash처럼 당시 남긴 조건을 함께 적습니다.',
					},
					{
						title: 'AI 결과에도 사람의 검수 지점을 둡니다',
						description:
							'근거 수집, AI 초안, workbook 검수, 선택 범위 수정을 분리해 자동화의 한계를 드러냅니다.',
					},
				],
			},
			{
				id: 'contents',
				title: '사례 구성',
				items: [
					{
						title: '대표 업무 4개',
						description:
							'물류 Web과 Mobile, 차트 편집기, AI 문서화, 생활정보 하이브리드 서비스',
					},
					{
						title: '함께 정리한 업무 5개',
						description:
							'Android 호환성, 금융 운영 웹, 보안 경계, 현장 단말, 레거시 패널 기준선',
					},
					{
						title: '선별 프로젝트 5개',
						description:
							'C. Donghae, ShareBBy, AI Agent Playbook, Itzip, Posture Teacher',
					},
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
		eyebrow: 'Work 01 / Web',
		title: '물류 운영 웹',
		summary: logisticsWeb.headline,
		metadata: [
			{ label: 'Period', value: logisticsWeb.period },
			{ label: 'Scope', value: logisticsWeb.area },
			{ label: 'Role', value: logisticsWeb.role },
		],
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'조회부터 예약, Excel, 출력 요청까지 한 흐름으로 이어졌지만, 초기 화면에 spreadsheet 처리가 함께 묶여 첫 진입 비용이 컸습니다.',
					'PC 출력, 모바일 브라우저 fallback, WebView/native 출력은 서로 다른 실패 조건을 가지므로 같은 완료 기준으로 다룰 수 없었습니다.',
				],
			},
			{
				id: 'decision',
				title: '판단과 실행',
				items: [
					{
						title: '업무 흐름과 출력 경계를 먼저 연결',
						description:
							'공통 shell, table, modal, form 위에 조회, 예약, 다건 처리, 주소록, Excel 미리보기, 출력 payload 변환을 연결했습니다.',
					},
					{
						title: '측정 뒤 지연 로딩 범위를 결정',
						description:
							'route와 spreadsheet library를 초기 진입에서 분리했습니다. 더 깊은 분리안은 인증 및 API 초기화와 첫 클릭 부담이 커 채택하지 않았습니다.',
					},
				],
				technologies: logisticsWeb.stack,
			},
			{
				id: 'evidence',
				title: '확인한 결과',
				metrics: logisticsWebResult.impact.map(toMetric),
				body: logisticsWebResult.checks,
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
		eyebrow: 'Work 01 / Mobile',
		title: '모바일 출력 브릿지 앱',
		summary: logisticsMobile.headline,
		metadata: [
			{ label: 'Period', value: logisticsMobile.period },
			{ label: 'Scope', value: logisticsMobile.area },
			{ label: 'Role', value: logisticsMobile.role },
		],
		sections: [
			{
				id: 'problem',
				title: '문제',
				body: [
					'웹 버튼이 출력 요청을 보냈다는 사실과 실제 장비가 라벨을 출력했다는 사실은 다릅니다. WebView, 권한, Bluetooth, native module, 프린터 SDK를 단계별로 확인해야 했습니다.',
				],
			},
			{
				id: 'decision',
				title: '판단과 실행',
				items: [
					{
						title: '화면과 장비 책임을 분리',
						description:
							'업무 화면은 WebView에 두고, 출력 payload 변환, 장비 상태, 출력 명령은 Android native module 경계로 옮겼습니다.',
					},
					{
						title: '요청 수락과 물리 출력을 따로 확인',
						description:
							'Android 16/API 36에서 장비 탐색 호출을 추적하고 취소 처리와 Bluetooth 권한을 보완했습니다.',
					},
				],
				technologies: logisticsMobile.stack,
			},
			{
				id: 'evidence',
				title: '확인한 결과',
				metrics: logisticsMobileResult.impact.map(toMetric),
				body: logisticsMobileResult.checks,
			},
		],
		evidence: [
			workStoryEvidence(logistics.id),
			workCaseEvidence(logisticsMobile.id),
		],
	},
	featuredWorkPage(
		5,
		'Work 02 / Web Tool',
		chartEditor,
		[
			{
				title: '차트별 유효 옵션',
				description:
					'현재 차트 타입에 필요한 설정 그룹만 보여주고 여섯 영역의 설정 패널과 preview 흐름을 구성했습니다.',
			},
			{
				title: '서로 다른 상태 경계',
				description:
					'field mapping, preview rendering, settings state를 분리해 같은 편집 모델을 보도록 맞췄습니다.',
			},
		],
		[chartEditor.editorial!.outcome, chartEditor.editorial!.takeaway],
	),
	featuredWorkPage(
		6,
		'Work 03 / Internal Tool',
		aiDocumentation,
		[
			{
				title: 'Scanner → Preview',
				description:
					'규칙 기반 저장소 근거를 수집하고 AI에 보내기 전에 결과를 먼저 확인합니다.',
			},
			{
				title: 'AI 초안 → Workbook 검수',
				description:
					'확인한 근거로 요구사항, 기능, 화면 후보를 만들고 선택한 sheet와 cell만 수정합니다.',
			},
		],
		[
			aiDocumentation.editorial!.outcome,
			'지원하지 않는 항목은 임의로 채우지 않고 사람이 결정할 항목으로 남겼습니다.',
			aiDocumentation.editorial!.takeaway,
		],
	),
	featuredWorkPage(
		7,
		'Work 04 / Hybrid Operations',
		lifeInformation,
		[
			{
				title: '읽기 경로',
				description:
					'즉시 필요한 core와 보조 정보를 나누고 fresh cache, stale cache, 기준 데이터 cache를 분리했습니다.',
			},
			{
				title: '운영 반영',
				description:
					'넓은 교체 대신 manifest와 SHA-256 hash로 변경 범위를 좁히고 핵심 화면 smoke를 함께 확인했습니다.',
			},
		],
		[
			'2026-07-02 runtime 배포에서는 111개 파일의 target hash 111/111 일치를 확인했습니다.',
			'2026-07-08 manifest 배포에서는 42개 중 39개를 업로드하고, 동일 hash 3개는 별도로 건너뛰었습니다.',
			'AirKorea 673행과 법정동 20,560행의 필수값을 확인하고, 변경 범위와 계약, fallback, 배포 증거를 함께 남겼습니다.',
		],
	),
	{
		id: 'supporting-work',
		pageNumber: 8,
		kind: 'compact-work',
		eyebrow: 'Supporting Work',
		title: '함께 정리한 업무',
		summary:
			'기능 확장과 유지보수에서도 변경 범위, 실패 경계, 회귀 기준을 먼저 확인했습니다.',
		sections: [
			{
				id: 'work-list',
				items: compactStories.map((story, index) => ({
					title: `${String(index + 1).padStart(2, '0')}  ${story.title}`,
					description: story.headline,
					meta: `${story.period}  ${story.platform}`,
					value: story.impact[0]
						? `${story.impact[0].label}: ${story.impact[0].value}`
						: undefined,
					technologies: story.stack,
					evidence: [workStoryEvidence(story.id)],
				})),
			},
		],
		evidence: compactStories.map(({ id }) => workStoryEvidence(id)),
	},
	{
		id: 'captain-donghae',
		pageNumber: 9,
		kind: 'project',
		eyebrow: 'Project 01 / Web',
		title: 'C. Donghae',
		summary:
			'72시간 동안 동해선 이용객에게 실시간 교통과 주변 정보를 연결한 지도 기반 웹 서비스를 구현했습니다.',
		metadata: [
			{ label: 'Period', value: formatKoreanPeriod(captainDonghae.duration) },
			{ label: 'Team', value: '3명, 유일한 프론트엔드 개발자' },
			{ label: 'Result', value: 'DIVE 2024 부산테크노파크원장상' },
		],
		sections: [
			{
				id: 'contribution',
				title: '맡은 범위',
				items: [
					{
						title: '지도와 외부 데이터 통합',
						description:
							'Google Maps의 지도, 장소 검색, 대중교통 경로, 주소 변환과 날씨, 역 정보, 주변 장소 데이터를 연결했습니다.',
					},
					{
						title: '제한 시간 안의 선택',
						description:
							'웹 지원 기능과 요구사항을 비교해 지도 API를 정하고, Swagger 문서를 기준으로 백엔드 API와 주요 화면을 연결했습니다.',
					},
					{
						title: '모바일 지도 탐색 UI',
						description:
							'지도 정보를 가리지 않도록 드래그 거리와 속도에 따라 단계가 바뀌는 바텀 시트 모달을 구현했습니다.',
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
		eyebrow: 'Project 02 / Mobile',
		title: 'ShareBBy',
		summary:
			'취미 활동을 공유하고 참여하는 React Native 앱에서 Android 대응과 커뮤니티 데이터 흐름을 맡았습니다.',
		metadata: [
			{ label: 'Period', value: formatKoreanPeriod(shareBBy.duration) },
			{ label: 'Team', value: '5명' },
			{ label: 'Release', value: 'App Store 배포' },
		],
		sections: [
			{
				id: 'contribution',
				title: '맡은 범위',
				items: [
					{
						title: '커뮤니티 흐름',
						description:
							'게시글 및 댓글 CRUD, 위치 기반 필터, 정렬, Pull to Refresh, Infinite Scroll을 구현했습니다.',
					},
					{
						title: '데이터 구조와 실시간 기능',
						description:
							'Firebase 데이터 관계를 ERD로 정리하고 댓글, 좋아요, 다중 이미지 흐름을 연결했습니다.',
					},
					{
						title: '이미지 캐시 경계',
						description:
							'기본 이미지 컴포넌트의 캐시 문제를 확인하고, 업데이트가 중단된 fast-image 대신 faster-image를 선택했습니다.',
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
		id: 'selected-projects',
		pageNumber: 11,
		kind: 'project-collection',
		eyebrow: 'Selected Projects',
		title: '도구, 팀 웹, Android 앱에서 넓힌 경험',
		summary:
			'프로젝트마다 기술 수보다 직접 맡은 경계와 확인 가능한 결과를 중심으로 남겼습니다.',
		sections: [
			{
				id: 'project-list',
				items: [
					{
						title: aiAgentPlaybook.title,
						meta: formatKoreanPeriod(aiAgentPlaybook.duration),
						description:
							'반복되는 작업 규칙과 프로젝트 메모리를 CLI, 스킬, 템플릿으로 나누고, 읽기 전용 MCP 도구와 dry-run 경계를 구성했습니다. npm 패키지와 GitHub 저장소로 공개했습니다.',
						technologies: aiAgentPlaybook.techStack,
						links: visibleProjectLinks(aiAgentPlaybook.id),
						evidence: [projectEvidence(aiAgentPlaybook.id)],
					},
					{
						title: itzip.subtitle,
						meta: formatKoreanPeriod(itzip.duration),
						description:
							'15명 팀의 프론트엔드 팀장으로 블로그와 Markdown 편집 흐름을 구현하고, Jest, Storybook, Sentry를 활용한 확인 범위를 정리했습니다.',
						technologies: itzip.techStack,
						links: visibleProjectLinks(itzip.id),
						evidence: [projectEvidence(itzip.id)],
					},
					{
						title: postureTeacher.subtitle,
						meta: formatKoreanPeriod(postureTeacher.duration),
						description:
							'MediaPipe AAR를 Ubuntu에서 빌드해 Android 앱에 통합했습니다. 프로젝트 당시 OpenCV 기반 구현과 비교한 프레임 처리에서 5~10배 높은 FPS 범위를 확인했습니다.',
						technologies: postureTeacher.techStack,
						links: visibleProjectLinks(postureTeacher.id),
						evidence: [projectEvidence(postureTeacher.id)],
					},
				],
			},
		],
		images: [
			{
				src: '/images/ai-agent-playbook/logo-wide.png',
				alt: 'AI Agent Playbook 로고와 이름',
				layout: 'wide',
			},
		],
		evidence: [
			projectEvidence(aiAgentPlaybook.id),
			projectEvidence(itzip.id),
			projectEvidence(postureTeacher.id),
		],
	},
	{
		id: 'closing',
		pageNumber: 12,
		kind: 'closing',
		eyebrow: 'Profile & Contact',
		title: '웹과 모바일에서 맡을 수 있는 범위',
		summary:
			'React 웹 화면과 React Native 및 Android 연동을 함께 다뤄 왔습니다. 처음 보는 시스템에서도 바꿀 곳과 지킬 계약을 나누고 코드, 실기기, 운영 환경에서 결과를 확인해 왔습니다.',
		sections: [
			{
				id: 'skills',
				title: '기술 적용 범위',
				items: skills.map(({ category, items }) => ({
					title: category,
					description: items,
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
				title: '더 자세한 근거',
				body: [
					'개인 사이트의 Work에는 9개 업무 이야기와 10개 원자료 흐름을, Projects에는 프로젝트별 구현 기록을 정리했습니다.',
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
