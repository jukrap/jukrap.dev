import { workCases } from '@/data/workCases';
import type { Locale, Localized } from '@/types/locale';
import type {
	ProfessionalStory,
	WorkCaseRecord,
	WorkImpact,
	WorkStoryCopy,
	WorkStoryDefinition,
	WorkstreamId,
} from '@/types/work';

export const workStoryDefinitions = [
	{
		id: 'settlement-operations-platform',
		tier: 'featured',
		caseIds: ['settlement-operations-platform'],
		includeInAbout: true,
	},
	{
		id: 'multi-role-hybrid-platform',
		tier: 'featured',
		caseIds: ['multi-role-hybrid-platform'],
		includeInAbout: true,
	},
	{
		id: 'delivery-output-flow',
		tier: 'featured',
		caseIds: ['delivery-operations-web', 'mobile-output-bridge'],
		includeInAbout: true,
	},
	{
		id: 'ai-kickoff-documentation-tool',
		tier: 'featured',
		caseIds: ['ai-kickoff-documentation-tool'],
		includeInAbout: true,
	},
	{
		id: 'mobile-operations-platform',
		tier: 'compact',
		caseIds: ['mobile-operations-platform'],
		includeInAbout: false,
	},
	{
		id: 'operations-admin-web',
		tier: 'compact',
		caseIds: ['operations-admin-web'],
		includeInAbout: false,
	},
	{
		id: 'legacy-support-web',
		tier: 'compact',
		caseIds: ['legacy-support-web'],
		includeInAbout: false,
	},
	{
		id: 'structured-editor-ui',
		tier: 'compact',
		caseIds: ['structured-editor-ui'],
		includeInAbout: false,
	},
	{
		id: 'hybrid-life-info-platform',
		tier: 'compact',
		caseIds: ['hybrid-life-info-platform'],
		includeInAbout: false,
	},
	{
		id: 'legacy-mobile-compatibility',
		tier: 'compact',
		caseIds: ['legacy-mobile-compatibility'],
		includeInAbout: false,
	},
	{
		id: 'react-admin-state-migration',
		tier: 'compact',
		caseIds: ['react-admin-state-migration'],
		includeInAbout: false,
	},
	{
		id: 'hybrid-security-boundary',
		tier: 'compact',
		caseIds: ['hybrid-security-boundary'],
		includeInAbout: false,
	},
	{
		id: 'field-terminal-android',
		tier: 'compact',
		caseIds: ['field-terminal-android'],
		includeInAbout: false,
	},
] as const satisfies readonly WorkStoryDefinition[];

type WorkStoryId = (typeof workStoryDefinitions)[number]['id'];
type WorkStoryCopies = Record<WorkStoryId, WorkStoryCopy>;

const storyCopies: Localized<WorkStoryCopies> = {
	ko: {
		'delivery-output-flow': {
			title: '물류 운영 웹·출력 앱',
			platform: 'Web / Mobile',
			area: '업무 운영 / WebView·Android 출력',
			period: '2026.04 ~ 2026.06',
			role: '신규 구축/출력 연동',
			workType: '신규 개발',
			headline:
				'조회·예약·Excel 등록 화면을 개발하고 Android 앱에서 Bluetooth 라벨 프린터로 출력하도록 연결했습니다.',
			summary:
				'React 운영 웹과 Android 출력 앱을 개발했습니다. 웹에서는 초기 다운로드 용량을 줄였고, 앱에서는 권한 요청·Bluetooth 연결·프린터 SDK 호출을 구현했습니다.',
			context:
				'운영자는 웹에서 예약을 조회·등록하고 Excel 자료를 처리하며, 모바일에서는 라벨을 출력해야 했습니다. Excel 라이브러리까지 처음에 불러와 웹 진입이 무거웠고, 모바일 출력에는 Android 권한과 프린터 연동이 필요했습니다.',
			editorial: {
				decision:
					'페이지와 Excel 라이브러리를 필요할 때 불러오도록 바꿨습니다. 웹이 보낸 출력 데이터를 Android에서 프린터 명령으로 변환하고, 권한 요청과 Bluetooth 연결을 처리했습니다.',
				outcome:
					'웹 초기 JavaScript 크기를 2,405.50 kB에서 616.59 kB로 줄였습니다. Android 16 실기기에서 권한 요청, Bluetooth 연결과 실제 라벨 출력을 확인했습니다.',
			},
			resultSections: [
				{
					chapterId: 'delivery-operations-web',
					impact: [
						{
							value: '2,405.50 → 616.59 kB',
							label: '웹 초기 JS entry',
							detail: '약 74% 감소. route·spreadsheet 지연 로딩 결과',
						},
						{
							value: '815.10 → 204.38 kB',
							label: '웹 gzip 기준',
							detail: '약 75% 감소. 동일 초기 entry 비교',
						},
					],
					checks: [
						'주요 viewport, 출력 formatter와 browser fallback, lint/test/build와 bundle 분석을 확인했습니다.',
					],
				},
				{
					chapterId: 'mobile-output-bridge',
					impact: [
						{
							value: 'Android 16 / API 36',
							label: '모바일 출력 검증',
							detail: '권한·Bluetooth 연결·실물 라벨 출력 흐름 확인',
						},
					],
					checks: [
						'Android 실기기의 권한, Bluetooth 장비 연결, WebView bridge 요청과 native 출력 응답을 확인했습니다.',
						'개발·운영 URL과 설치 산출물 기준을 분리해 각 실행 환경의 확인 범위를 남겼습니다.',
					],
				},
			],
			aboutSummary:
				'React 물류 운영 웹을 만들고 초기 JavaScript 용량을 줄였습니다. Android 앱의 Bluetooth 프린터 연동과 실물 라벨 출력도 확인했습니다.',
		},
		'structured-editor-ui': {
			headline:
				'데이터 역할과 설정 상태가 실제 프리뷰와 어긋나지 않는 편집 흐름을 설계했습니다.',
			summary:
				'직접 그리던 차트 미리보기를 Chart.js로 바꾸고 차트 종류별 설정 화면을 만들었습니다. 데이터 필드와 옵션을 변경하면 미리보기에 반영되도록 했습니다.',
			editorial: {
				decision:
					'차트 타입별 유효 옵션만 노출하고, field mapping·preview lifecycle·settings state를 분리해 같은 편집 모델을 바라보도록 했습니다.',
				outcome:
					'설정 상태와 실제 프리뷰를 하나의 회귀 범위로 연결해 편집 흐름이 어긋나지 않는지 확인했습니다.',
			},
			impact: [
				{
					value: '상태 동기화',
					label: 'mapping · preview · settings',
					detail:
						'사용자가 고른 데이터 역할과 설정이 실제 렌더 결과에 이어지도록 정렬',
				},
				{
					value: '재렌더 조건 축소',
					label: 'mixed chart preview',
					detail: '불필요한 remount와 스크롤 흔들림을 줄인 범위로 한정',
				},
			],
			aboutSummary:
				'차트별 설정과 field mapping·preview 상태를 하나의 흐름으로 맞춘 React 시각화 편집 도구.',
		},
		'ai-kickoff-documentation-tool': {
			stack: ['Node.js', 'TypeScript', 'React', 'AI API', 'xlsx', 'Vitest'],
			editorial: {
				decision:
					'스캔 결과를 미리보기로 제공하고 요구사항·기능·화면을 표로 나눴습니다. 재작성할 때는 선택한 시트·셀과 주변 문맥을 함께 전달해 이미 검토한 다른 부분을 유지하도록 했습니다.',
				outcome:
					'자료를 모아 문서 초안을 만들고, 표에서 검토·편집한 뒤 내보내도록 구현했습니다. 일부 생성이 실패해도 성공한 문서는 남겨 두고, 실패 기록과 선택 항목 재작성 기능을 확인했습니다.',
			},
			impact: [
				{
					value: '근거 우선',
					label: 'scanner → preview',
					detail: '규칙 기반 수집 결과를 먼저 확인한 뒤 AI 초안에 사용',
				},
				{
					value: '표로 검토·편집',
					label: '요구사항·기능·화면 문서',
					detail: '생성한 초안을 항목별로 수정한 뒤 내보내기',
				},
				{
					value: '선택 범위 수정',
					label: 'sheet / cell revision',
					detail: '전체 재생성 대신 수정 대상과 보존 문맥을 함께 전달',
				},
			],
			aboutSummary:
				'저장소 자료로 요구사항·기능·화면 문서 초안을 만드는 도구입니다. 사람이 표에서 검토·편집하고 선택한 항목만 AI로 다시 작성할 수 있도록 구현했습니다.',
			context:
				'기존 저장소를 바탕으로 프로젝트 문서를 작성하는 도구입니다. 사용자가 AI에 전달할 자료를 먼저 확인하고, 초안을 검토한 뒤 필요한 부분만 수정할 수 있어야 했습니다.',
			summary:
				'저장소에서 수집한 자료를 먼저 확인한 뒤, AI가 만든 요구사항과 기능·화면 문서를 표에서 편집하도록 했습니다. 검토한 내용은 그대로 두고 필요한 항목만 다시 작성할 수 있습니다.',
			headline:
				'저장소 자료로 문서 초안을 만들고, 사람이 표에서 검토·수정하는 AI 보조 도구를 개발했습니다.',
		},
		'hybrid-life-info-platform': {
			summary:
				'외부 API 응답이 늦어도 핵심 정보를 먼저 표시하도록 로딩 순서를 바꾸고 서버 캐시를 적용했습니다. Android 위치 조회를 보완하고 변경 파일을 운영 환경에 반영했습니다.',
			editorial: {
				decision:
					'핵심 정보를 먼저 표시하고, 외부 API가 실패하면 허용된 범위에서 이전 캐시를 사용하도록 했습니다. 운영에는 변경된 파일만 반영했습니다.',
				outcome:
					'최초 조회와 캐시 재사용, 외부 API 실패 시 이전 값 표시를 점검했습니다. 배포 파일과 주요 화면도 확인했습니다.',
			},
			impact: [
				{
					value: '캐시 응답 재사용',
					label: '외부 API 조회',
					detail: '유효한 캐시가 있으면 저장된 응답 사용',
				},
				{
					value: '이전 값으로 대체',
					label: '외부 API 실패',
					detail: '허용된 범위에서 이전 캐시를 사용해 정보 표시',
				},
				{
					value: '변경 파일만 배포',
					label: '운영 반영',
					detail: '변경 파일의 해시와 반영 후 주요 화면 확인',
				},
			],
			checks: [
				'배포할 파일과 이미 반영된 파일의 해시를 비교해 변경된 파일만 업로드했습니다.',
				'기준 데이터를 캐시에 반영하기 전에 필수값 누락 여부를 확인했습니다.',
				'최초 조회와 캐시 재사용, 외부 API 실패 시 이전 값 표시를 점검했습니다.',
			],
			aboutSummary:
				'공공 API·cache·WebView·파일 단위 운영 배포 경계를 안정화한 하이브리드 생활정보 서비스.',
		},
		'legacy-mobile-compatibility': {
			summary:
				'오래된 Android 앱의 빌드 오류를 해결하고 OS 버전에 따라 달라지는 권한·파일 URI·뒤로가기 처리를 보완했습니다. 로그인과 초기 데이터 동기화도 점검했습니다.',
		},
		'react-admin-state-migration': {
			summary:
				'기존 주식 업무 화면을 React로 다시 만들었습니다. 목록·검색·등록·수정 화면에 공통 테이블과 모달을 적용하고, React Query로 조회와 저장 후 갱신을 처리했습니다.',
		},
		'hybrid-security-boundary': {
			summary:
				'외부 API 인증 정보를 서버에서 관리하도록 프록시를 구현했습니다. 하이브리드 앱의 이미지 입력, 파일 선택과 화면 이동도 보완했습니다.',
		},
		'field-terminal-android': {
			summary:
				'Gradle·JDK·SDK 설정을 맞춰 현장 단말 앱을 다시 빌드할 수 있도록 했습니다. 운영 서명이 없는 개발 환경에서도 설치·실행할 수 있게 빌드 경로를 나눴습니다.',
		},
		'settlement-operations-platform': {
			impact: workCases.ko
				.find(({ id }) => id === 'settlement-operations-platform')!
				.impact.slice(0, 2),
			editorial: {
				decision:
					'미리보기에서 확인한 자료를 서버에 보관하고 등록 전에 다시 검사했습니다. 저장에 실패하면 전체를 되돌리고, 같은 요청을 다시 보내도 중복 등록되지 않도록 했습니다. 현재 담당 관계와 거래 당시의 정산 대상은 따로 관리했습니다.',
				outcome:
					'격리 DB에서 일부 행만 저장되거나 재시도로 중복 등록되지 않는지 확인했습니다. 개발 DB에서는 담당 관계를 바꾼 뒤에도 과거 정산 금액이 유지됐습니다. 개발 환경에 반영했습니다.',
			},
			aboutSummary:
				'React 화면과 Spring Boot API를 개발하고, DB 처리와 개발 환경 배포를 담당했습니다.',
		},
		'mobile-operations-platform': {
			impact: workCases.ko
				.find(({ id }) => id === 'mobile-operations-platform')!
				.impact.slice(0, 2),
			editorial: {
				decision:
					'처리 내용과 사진을 앱 저장소에 먼저 기록한 뒤 전송했습니다. 앱을 다시 실행하면 로그인 사용자와 대기 요청을 복원하고, 서버에 이미 반영된 내용인지 확인한 뒤 재전송하도록 했습니다.',
				outcome:
					'Android 실기기에서 API 연결을 끊고 앱을 다시 실행해도 요청이 남아 있었고, 연결 복구 후 서버에 반영되는 것을 확인했습니다. 응답 유실·사진 복원 실패 등 일부 조합은 추가 검증이 필요하며, 중복 전송 건은 원인 조사 단계입니다.',
			},
			aboutSummary:
				'기존 모바일 업무 앱을 유지보수하며 지도 선택·복귀와 오프라인 저장·재전송 동작을 보완했습니다.',
		},
		'multi-role-hybrid-platform': {
			headline: '기존 웹·앱의 회원 관리와 문의 기능을 확장했습니다.',
			editorial: {
				decision:
					'기존 회원 정보를 보존하며 중복 회원을 통합하고, 역할에 따라 문의 접근 권한을 확인하도록 했습니다.',
				outcome:
					'격리 DB에서 회원 정보 보존과 저장 실패 시 복구를 확인했습니다. Android 첨부는 실기기로 점검했으며 iOS 첨부는 지원하지 않습니다.',
			},
			aboutSummary: '기존 웹·앱의 회원 관리와 문의 기능을 확장했습니다.',
		},
		'operations-admin-web': {},
		'legacy-support-web': {},
	},
	en: {
		'delivery-output-flow': {
			title: 'Logistics Operations Web and Printing App',
			platform: 'Web / Mobile',
			area: 'Operations / WebView and Android output',
			period: '2026.04 ~ 2026.06',
			role: 'New build and output integration',
			workType: 'Build',
			headline:
				'Built lookup, booking and Excel import screens and connected an Android app to Bluetooth label printers.',
			summary:
				'Developed a React operations web app and an Android printing app. Reduced the web app’s initial download and implemented Android permissions, Bluetooth connection and printer SDK calls.',
			context:
				'Operators needed to look up bookings, process Excel data and print labels on mobile devices. Loading the spreadsheet library at startup made the web app heavy; mobile printing required Android permissions and printer integration.',
			editorial: {
				decision:
					'Loaded pages and the spreadsheet library on demand. Converted web print requests into printer commands on Android and handled permissions and Bluetooth connections.',
				outcome:
					'Reduced initial JavaScript from 2,405.50 kB to 616.59 kB. Verified permissions, Bluetooth connection and physical label printing on Android 16.',
			},
			resultSections: [
				{
					chapterId: 'delivery-operations-web',
					impact: [
						{
							value: '2,405.50 → 616.59 kB',
							label: 'web initial JS entry',
							detail: 'About 74% lower after route and spreadsheet lazy loading',
						},
						{
							value: '815.10 → 204.38 kB',
							label: 'web gzip size',
							detail: 'About 75% lower for the same initial entry',
						},
					],
					checks: [
						'Checked key viewports, output formatting and browser fallback, lint/test/build, and bundle analysis.',
					],
				},
				{
					chapterId: 'mobile-output-bridge',
					impact: [
						{
							value: 'Android 16 / API 36',
							label: 'mobile output check',
							detail:
								'Permissions, Bluetooth connection, and physical label output checked',
						},
					],
					checks: [
						'Checked Android-device permissions, Bluetooth connection, WebView bridge requests, and native output responses.',
						'Development and production URLs and install artifacts were kept as separate verification baselines.',
					],
				},
			],
			aboutSummary:
				'Built a React logistics web app and reduced its initial JavaScript size. Integrated Bluetooth printers in Android and verified physical label output.',
		},
		'structured-editor-ui': {
			headline:
				'Designed an editing flow that kept data roles and settings aligned with the rendered preview.',
			summary:
				'Replaced a custom chart preview with Chart.js and built settings for each chart type. Changes to data fields and options update the preview.',
			editorial: {
				decision:
					'Showed only valid options for each chart type and separated field mapping, preview lifecycle, and settings state around one editing model.',
				outcome:
					'Connected settings state and the rendered preview under one regression scope to check that the editing flow stayed aligned.',
			},
			impact: [
				{
					value: 'state alignment',
					label: 'mapping · preview · settings',
					detail:
						'kept selected data roles and settings connected to the rendered result',
				},
				{
					value: 'fewer remount conditions',
					label: 'mixed-chart preview',
					detail: 'limited to reducing unnecessary remounts and scroll movement',
				},
			],
			aboutSummary:
				'A React visualization editor aligning chart-specific settings, field mapping, and preview state in one flow.',
		},
		'ai-kickoff-documentation-tool': {
			stack: ['Node.js', 'TypeScript', 'React', 'AI API', 'xlsx', 'Vitest'],
			editorial: {
				decision:
					'Provided a scan preview and organized requirements, features and screens into tables. Sent selected cells or sheets with surrounding context for revision while retaining other reviewed content.',
				outcome:
					'Connected collection, drafting, table-based review and editing, and export. Checked scoped revisions and kept successful artifacts separate from failure logs when part of a generation failed.',
			},
			impact: [
				{
					value: 'evidence first',
					label: 'scanner → preview',
					detail:
						'reviewed deterministic scan results before using them for AI drafts',
				},
				{
					value: 'Review and edit in tables',
					label: 'Requirements, features and screens',
					detail:
						'reviewed requirements, features, and screens as tables before export',
				},
				{
					value: 'scoped revision',
					label: 'sheet / cell context',
					detail:
						'sent the intended edit and preserved context instead of regenerating everything',
				},
			],
			aboutSummary:
				'Built a tool that drafts requirements, features and screens from repository material, with table-based human review and editing, and AI revision of selected items.',
			context:
				'The tool creates project documentation from an existing repository. Users needed to review the input material and revise parts of a draft without rewriting sections they had already checked.',
			summary:
				'Showed scanned repository material before AI drafting, then organized requirements, features and screens in editable tables. Users can rewrite selected items while retaining reviewed content.',
			headline:
				'Built an AI-assisted tool for drafting project documents from repository files and reviewing them in editable tables.',
		},
		'hybrid-life-info-platform': {
			summary:
				'Prioritized core information when external APIs were slow and added server caching. Updated Android location lookup and deployed changed files to production.',
			editorial: {
				decision:
					'Displayed core information first and allowed previously cached values when external APIs failed. Deployed only changed files.',
				outcome:
					'Checked initial retrieval, cache reuse, and fallback to previous values when external APIs failed. Also verified deployed files and main screens.',
			},
			impact: [
				{
					value: 'Reuse cached responses',
					label: 'External API requests',
					detail: 'Serve stored responses while the cache is valid',
				},
				{
					value: 'Fallback to previous values',
					label: 'External API failure',
					detail: 'Use previous cached values within the allowed fallback rules',
				},
				{
					value: 'Deploy changed files only',
					label: 'Production rollout',
					detail:
						'Compare changed-file hashes and check main screens after deployment',
				},
			],
			checks: [
				'Compared hashes of deployment files with deployed versions and uploaded only changed files.',
				'Checked reference data for missing required values before updating the cache.',
				'Checked initial retrieval, cache reuse, and fallback to previous values when external APIs failed.',
			],
			aboutSummary:
				'A hybrid life-information service stabilizing public API, cache, WebView, and file-level production delivery boundaries.',
		},
		'legacy-mobile-compatibility': {
			summary:
				'Fixed build failures in an older Android app and updated OS-specific permissions, file URIs and back navigation. Also checked login and initial data synchronization.',
		},
		'react-admin-state-migration': {
			summary:
				'Rebuilt stock-management screens in React with shared tables and dialogs for lookup, search, creation and editing. Used React Query for fetching and refreshing data after saves.',
		},
		'hybrid-security-boundary': {
			summary:
				'Implemented a server proxy to keep external API credentials off the client. Updated image input, file selection and navigation in the hybrid app.',
		},
		'field-terminal-android': {
			summary:
				'Aligned Gradle, JDK and SDK settings to restore the field-device app build. Separated development builds so they could be installed without production signing credentials.',
		},
		'settlement-operations-platform': {
			impact: workCases.en
				.find(({ id }) => id === 'settlement-operations-platform')!
				.impact.slice(0, 2),
			editorial: {
				decision:
					'Kept reviewed data on the server and rechecked it at confirmation. Failed imports roll back the whole batch, and retries cannot create a second copy. Current assignments are stored separately from the recipient recorded on a settlement.',
				outcome:
					'Verified rollback and duplicate prevention in an isolated database, and retained historical amounts after assignment changes in the development database. Deployed to development.',
			},
			aboutSummary:
				'Developed React screens and Spring Boot APIs, implemented database operations, and deployed to the development environment.',
		},
		'mobile-operations-platform': {
			impact: workCases.en
				.find(({ id }) => id === 'mobile-operations-platform')!
				.impact.slice(0, 2),
			editorial: {
				decision:
					'Saved entered data and photos in app storage before sending. After restart, restored the signed-in user and pending requests, then checked for existing server records before retrying.',
				outcome:
					'On a physical Android device, requests survived an API outage and app restart and reached the server after reconnection. Response-loss and photo-recovery combinations need further checks; a duplicate-transmission incident remains under investigation.',
			},
			aboutSummary:
				'Maintained an existing mobile operations app, improving map selection and return behavior, offline storage and retries.',
		},
		'multi-role-hybrid-platform': {
			headline:
				'Extended member management and inquiries in an existing web and mobile app.',
			editorial: {
				decision:
					'Merged duplicate members while preserving existing records and applied role-based access checks to inquiries.',
				outcome:
					'Verified data preservation and rollback in an isolated database and attachments on Android hardware. iOS attachments are unsupported.',
			},
			aboutSummary:
				'Extended member management and inquiries in an existing web and mobile app.',
		},
		'operations-admin-web': {},
		'legacy-support-web': {},
	},
};

const expectedWorkstreams: readonly WorkstreamId[] = [
	'WS01',
	'WS02',
	'WS03',
	'WS04',
	'WS05',
	'WS06',
	'WS07',
	'WS08',
	'WS10',
	'WS11',
	'WS12',
	'WS13',
	'WS14',
	'WS15',
];

function assertUnique(values: readonly string[], label: string) {
	const duplicates = values.filter(
		(value, index) => values.indexOf(value) !== index,
	);

	if (duplicates.length > 0) {
		throw new Error(
			`${label} contains duplicate values: ${duplicates.join(', ')}`,
		);
	}
}

function validateWorkData() {
	if (workStoryDefinitions.length !== 13) {
		throw new Error('Work story manifest must contain exactly thirteen stories.');
	}

	assertUnique(
		workStoryDefinitions.map(({ id }) => id),
		'Work story IDs',
	);

	const referencedCaseIds = workStoryDefinitions.flatMap(
		({ caseIds }) => caseIds,
	);
	assertUnique(referencedCaseIds, 'Work story chapter IDs');

	for (const locale of ['ko', 'en'] as const) {
		const records = workCases[locale];
		const recordIds = records.map(({ id }) => id);
		const workstreamIds = records.map(({ workstreamId }) => workstreamId);

		if (records.length !== expectedWorkstreams.length) {
			throw new Error(
				`${locale} work records must contain exactly fourteen cases.`,
			);
		}

		assertUnique(recordIds, `${locale} work record IDs`);
		assertUnique(workstreamIds, `${locale} workstream IDs`);

		for (const workstreamId of expectedWorkstreams) {
			if (!workstreamIds.includes(workstreamId)) {
				throw new Error(`${locale} is missing ${workstreamId}.`);
			}
		}

		if (
			referencedCaseIds.length !== recordIds.length ||
			referencedCaseIds.some((caseId) => !recordIds.includes(caseId))
		) {
			throw new Error(
				`${locale} work stories must reference every work record exactly once.`,
			);
		}

		for (const definition of workStoryDefinitions) {
			const copy = storyCopies[locale][definition.id];
			const definitionCaseIds: readonly string[] = definition.caseIds;
			const resultChapterIds =
				copy.resultSections?.map(({ chapterId }) => chapterId) ?? [];

			assertUnique(
				resultChapterIds,
				`${locale} story ${definition.id} result chapters`,
			);
			if (
				resultChapterIds.some((chapterId) => !definitionCaseIds.includes(chapterId))
			) {
				throw new Error(
					`${locale} story ${definition.id} contains a result for an unrelated chapter.`,
				);
			}
			if (
				copy.resultSections &&
				(resultChapterIds.length !== definition.caseIds.length ||
					definition.caseIds.some((caseId) => !resultChapterIds.includes(caseId)))
			) {
				throw new Error(
					`${locale} story ${definition.id} must attribute results to every chapter exactly once.`,
				);
			}

			if (definition.includeInAbout && !copy.aboutSummary) {
				throw new Error(`${locale} story ${definition.id} needs an About summary.`);
			}
			if (definition.tier === 'featured' && !copy.editorial) {
				throw new Error(
					`${locale} featured story ${definition.id} needs editorial copy.`,
				);
			}
		}
	}

	const koIdentities = workCases.ko.map(
		({ id, workstreamId }) => `${id}:${workstreamId}`,
	);
	const enIdentities = workCases.en.map(
		({ id, workstreamId }) => `${id}:${workstreamId}`,
	);
	if (koIdentities.some((identity, index) => enIdentities[index] !== identity)) {
		throw new Error(
			'Korean and English work record IDs and workstream mappings must match in order.',
		);
	}

	for (const definition of workStoryDefinitions) {
		const koResultChapters =
			storyCopies.ko[definition.id].resultSections?.map(
				({ chapterId }) => chapterId,
			) ?? [];
		const enResultChapters =
			storyCopies.en[definition.id].resultSections?.map(
				({ chapterId }) => chapterId,
			) ?? [];

		if (
			koResultChapters.length !== enResultChapters.length ||
			koResultChapters.some(
				(chapterId, index) => enResultChapters[index] !== chapterId,
			)
		) {
			throw new Error(
				`Korean and English result chapter order must match for ${definition.id}.`,
			);
		}
	}

	const aboutStories = workStoryDefinitions.filter(
		({ includeInAbout }) => includeInAbout,
	);
	const featuredStories = workStoryDefinitions.filter(
		({ tier }) => tier === 'featured',
	);
	if (
		featuredStories.length !== 4 ||
		aboutStories.length !== featuredStories.length ||
		aboutStories.some((story, index) => story.id !== featuredStories[index].id)
	) {
		throw new Error('About must contain exactly four featured work stories.');
	}
}

function uniqueStrings(values: readonly string[]) {
	return Array.from(new Set(values));
}

function resolveStory(
	definition: (typeof workStoryDefinitions)[number],
	copy: WorkStoryCopy,
	recordsById: ReadonlyMap<string, WorkCaseRecord>,
): ProfessionalStory {
	const records = definition.caseIds.map((caseId) => {
		const record = recordsById.get(caseId);
		if (!record) {
			throw new Error(`Missing work record for story chapter: ${caseId}`);
		}
		return record;
	});
	const first = records[0];

	const chapters = records.map((record) => ({
		workstreamId: record.workstreamId,
		id: record.id,
		title: record.title,
		platform: record.platform,
		area: record.area,
		period: record.period,
		role: record.role,
		workType: record.workType,
		stack: record.stack,
		headline: record.headline,
		summary: record.summary,
		context: record.problem,
		decisions: record.thinking,
		execution: record.solution,
		impact: record.impact,
		checks: record.checks,
		additionalEvidence: record.process,
	}));
	const fallbackImpact =
		copy.impact ??
		(records.length === 1
			? first.impact
			: records.flatMap(({ impact }) => impact));
	const fallbackChecks =
		copy.checks ??
		(records.length === 1
			? first.checks
			: records.flatMap(({ checks }) => checks));
	const resultSections = copy.resultSections
		? copy.resultSections.map((section) => {
				const chapter = chapters.find(({ id }) => id === section.chapterId);
				if (!chapter) {
					throw new Error(
						`Missing work chapter for result section: ${section.chapterId}`,
					);
				}

				return {
					id: section.chapterId,
					title: chapter.title,
					impact: section.impact,
					checks: section.checks,
				};
			})
		: [
				{
					id: definition.id,
					impact: fallbackImpact,
					checks: fallbackChecks,
				},
			];
	const impact = resultSections.flatMap((section) => section.impact);
	const checks = resultSections.flatMap((section) => section.checks);

	return {
		id: definition.id,
		tier: definition.tier,
		caseIds: [...definition.caseIds],
		includeInAbout: definition.includeInAbout,
		title: copy.title ?? first.title,
		platform: copy.platform ?? first.platform,
		area: copy.area ?? first.area,
		period: copy.period ?? first.period,
		role: copy.role ?? first.role,
		workType: copy.workType ?? first.workType,
		stack: copy.stack ?? uniqueStrings(records.flatMap(({ stack }) => stack)),
		headline: copy.headline ?? first.headline,
		summary: copy.summary ?? first.summary,
		context: copy.context ?? first.problem,
		chapters,
		impact,
		checks,
		resultSections,
		editorial: copy.editorial,
		aboutSummary: copy.aboutSummary,
	};
}

export function resolveWorkStories(locale: Locale): ProfessionalStory[] {
	const recordsById = new Map(
		workCases[locale].map((record) => [record.id, record]),
	);

	return workStoryDefinitions.map((definition) =>
		resolveStory(definition, storyCopies[locale][definition.id], recordsById),
	);
}

validateWorkData();

export const workStories: Localized<ProfessionalStory[]> = {
	ko: resolveWorkStories('ko'),
	en: resolveWorkStories('en'),
};
