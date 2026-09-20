import { workCases } from '@/data/workCases';
import type { Locale, Localized } from '@/types/locale';
import type {
	ProfessionalStory,
	WorkCaseRecord,
	WorkStoryCopy,
	WorkStoryDefinition,
	WorkstreamId,
} from '@/types/work';

export const workStoryDefinitions = [
	{
		id: 'delivery-output-flow',
		tier: 'featured',
		caseIds: ['delivery-operations-web', 'mobile-output-bridge'],
		includeInAbout: true,
	},
	{
		id: 'structured-editor-ui',
		tier: 'compact',
		caseIds: ['structured-editor-ui'],
		includeInAbout: false,
	},
	{
		id: 'settlement-operations-platform',
		tier: 'featured',
		caseIds: ['settlement-operations-platform'],
		includeInAbout: true,
	},
	{
		id: 'react-admin-state-migration',
		tier: 'featured',
		caseIds: ['react-admin-state-migration'],
		includeInAbout: true,
	},
	{
		id: 'multi-role-hybrid-platform',
		tier: 'compact',
		caseIds: ['multi-role-hybrid-platform'],
		includeInAbout: false,
	},
	{
		id: 'ai-kickoff-documentation-tool',
		tier: 'compact',
		caseIds: ['ai-kickoff-documentation-tool'],
		includeInAbout: false,
	},
	{
		id: 'mobile-operations-platform',
		tier: 'compact',
		caseIds: ['mobile-operations-platform'],
		includeInAbout: false,
	},
	{
		id: 'legacy-support-web',
		tier: 'compact',
		caseIds: ['legacy-support-web'],
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
			platform: 'Web / Android',
			area: '조회·예약·Excel 등록 화면과 PC·Android 라벨 출력 개발',
			role: '물류 업무 웹과 출력 앱 개발',
			headline:
				'조회·예약·Excel 등록부터 PC·Android 라벨 출력까지 이어지는 물류 업무 시스템.',
			summary:
				'반복되는 표·입력 폼·모달을 공통화하고 API 응답을 화면과 출력 흐름에 연결했습니다. 페이지와 Excel 처리 코드의 지연 로딩으로 초기 JavaScript 엔트리 파일 크기를 2,405.50 kB에서 616.59 kB로 약 74% 줄였습니다(빌드 산출물 기준).',
			context:
				'조회·예약·Excel 등록·출력 화면에서 공통 UI와 API 연동이 필요했습니다. 초기 화면에 필요하지 않은 페이지와 Excel 라이브러리까지 함께 포함되어 초기 JavaScript 엔트리 파일이 커진 상태였습니다.',
			editorial: {
				decision:
					'표·폼·모달을 공통화하고 페이지와 Excel 코드를 필요한 시점에 불러오도록 했습니다. 인증과 공통 초기화 흐름은 유지했습니다.',
				outcome:
					'코드 분리 후 페이지 이동·Excel 처리·PC 라벨 출력 동작 확인. Android 실기기의 Bluetooth 연결과 실제 라벨 출력 확인.',
			},
			resultSections: ['delivery-operations-web', 'mobile-output-bridge'].map(
				(chapterId) => {
					const record = workCases.ko.find(({ id }) => id === chapterId)!;
					return { chapterId, impact: record.impact, checks: record.checks };
				},
			),
			aboutSummary:
				'조회·예약·Excel 등록 화면의 공통 UI와 API 연동, Android 라벨 출력 기능을 개발했습니다. 페이지와 Excel 코드를 분리해 초기 JavaScript 엔트리 파일 크기를 약 74% 줄였습니다(빌드 산출물 기준).',
		},
		'structured-editor-ui': {
			summary:
				'개발 중인 사이트의 차트 설정 패널·데이터 필드 연결·드래그 조작과 Chart.js 미리보기 기능 개발.',
			editorial: {
				decision:
					'차트 종류에 맞는 옵션과 데이터 역할을 제공하고 설정 상태와 렌더러 생명주기를 분리했습니다.',
				outcome:
					'데이터 필드와 옵션을 설정 패널에서 선택하고 Chart.js 미리보기로 확인하는 편집 화면을 구현했습니다.',
			},
			aboutSummary: '차트 설정 패널과 데이터 연결, 미리보기 화면을 구현했습니다.',
		},
		'settlement-operations-platform': {
			headline: '차량·기사 정보부터 운송료 청구·정산까지 관리하는 업무 시스템.',
			editorial: {
				decision:
					'공통 편집표에 키보드 조작과 초안 보존 기능을 넣었습니다. Excel 등록 전에는 서버에서 자료를 다시 검증하고 한 트랜잭션으로 저장했습니다. 현재 담당 관계와 과거 정산 정보는 따로 관리했습니다.',
				outcome:
					'정산 저장 기능은 개발 환경에 반영. 작업 내용 중심으로 개편한 로그 화면은 실제 관리자 업무에서 사용 중.',
			},
			aboutSummary:
				'차량·기사·운송료·정산을 관리하는 웹 전반과 주요 서버 API, 데이터 저장 기능을 개발했습니다. 공통 입력 화면과 정산 이력을 구현하고 관리자 작업 로그를 개편했습니다.',
		},
		'react-admin-state-migration': {
			headline: '계좌·종목·주문 정보를 조회하고 등록·수정하는 주식 업무 관리 웹.',
			context:
				'여러 업무 화면에 목록·검색·입력 처리가 반복돼 공통 UI가 필요했습니다. 실제 백엔드에 연결하지 않고도 화면을 개발하고 동작을 확인할 수 있어야 했습니다.',
			editorial: {
				decision:
					'컬럼 조작·필터·모달은 공통 컴포넌트로 만들고 화면별 컬럼과 동작은 따로 정의했습니다. MSW로 모의 응답을 구성해 실제 백엔드 연결 없이 화면을 개발했습니다.',
				outcome:
					'MSW 모의 응답을 사용하는 로컬 환경에서 컬럼 조작·스크롤·검색 모달과 로딩·빈 결과 등 화면 상태 확인.',
			},
			aboutSummary:
				'MSW 모의 API로 계좌·종목·주문 화면의 React 프론트엔드 전체를 구축했습니다. 테이블·필터·모달을 공통화하고, 선택 중인 필터와 실제 조회 조건을 구분했습니다.',
		},
		'multi-role-hybrid-platform': {
			role: '기존 솔루션의 웹·Android 기능 개발·개선',
			workType: '솔루션 기능 확장·개선',
			area: '회원 관리와 문의·첨부 기능 개발, Android 파일 선택 연동',
			headline:
				'기존 웹과 Android 앱의 회원 관리, 문의·첨부 기능을 개발하고 개선했습니다.',
			summary:
				'회원 검색·수정·중복 통합과 문의·첨부 기능 개발. Android 파일 선택·이미지 미리보기 연동.',
		},
		'ai-kickoff-documentation-tool': {
			summary:
				'저장소·업로드 자료의 검토부터 요구사항·문서 작성까지 단계별 화면 개발. 표 편집과 선택한 시트·셀의 AI 수정 기능 구현.',
		},
		'mobile-operations-platform': {
			summary:
				'지도 선택·화면 복귀 동작 수정과 오프라인 저장·재전송 보완. 앱 재실행 후 전송 대기 요청 복원.',
		},
		'legacy-support-web': {
			summary:
				'Excel 업로드의 파일 분석·입력 검증·통신 오류를 구분하는 안내 구현. 대량 등록의 반복 DB 조회 비용 조사와 개선안 제안.',
		},
		'hybrid-life-info-platform': {
			summary:
				'공공 데이터 API 기반 날씨·대기질·기상특보 기능 확장. 핵심 정보 우선 표시, 지역·정보별 서버 캐시와 동시 요청 통합 구현.',
		},
		'legacy-mobile-compatibility': {
			summary:
				'WebView 기반 Android 앱의 빌드 환경 업데이트와 OS별 권한·파일 접근·뒤로가기 처리 수정. 로그인·초기 동기화 문제 보완.',
		},
		'hybrid-security-boundary': {
			summary:
				'외부 API를 이용한 딥페이크 이미지·개인정보 유출 검사 기능 개발. 이미지·파일 선택부터 검사 요청·결과 표시와 Android WebView 연동까지 구현.',
		},
		'field-terminal-android': {
			summary:
				'기존 PDA 앱의 빌드 환경·저장소·업데이트 처리 정비. 입고 조회 조건과 수량 입력, QR·바코드 스캔 기능 개발.',
		},
	},
	en: {
		'delivery-output-flow': {
			title: 'Logistics Operations Web and Printing App',
			platform: 'Web / Android',
			area: 'Search, reservations, Excel imports, and PC/Android label printing',
			role: 'Logistics web and printing app development',
			headline:
				'A logistics system connecting search, reservations and Excel imports to PC and Android label printing.',
			summary:
				'Created shared tables, forms and modals and connected API responses to screen and print flows. Lazy-loaded pages and Excel code to reduce the initial JavaScript entry file size from 2,405.50 kB to 616.59 kB, about 74% (build output size).',
			context:
				'Lookup, booking, Excel imports and printing needed shared UI and API integration. Pages and spreadsheet libraries that were not needed at startup were included in a large initial JavaScript entry.',
			editorial: {
				decision:
					'Built shared tables, forms and modals and loaded pages and Excel code on demand, keeping authentication and shared initialization intact.',
				outcome:
					'Verified navigation, Excel processing and PC label printing after code splitting. Checked Bluetooth connection and physical label output on an Android device.',
			},
			resultSections: ['delivery-operations-web', 'mobile-output-bridge'].map(
				(chapterId) => {
					const record = workCases.en.find(({ id }) => id === chapterId)!;
					return { chapterId, impact: record.impact, checks: record.checks };
				},
			),
			aboutSummary:
				'Built shared UI and API integration for search, reservations and Excel imports, plus Android label printing. Split pages and Excel code to reduce the initial JavaScript entry file size by about 74% (build output size).',
		},
		'structured-editor-ui': {
			summary:
				'Built chart settings, data-field connections, drag interactions and Chart.js previews within a website under development.',
			editorial: {
				decision:
					'Exposed valid chart options and data roles and separated editing state from the renderer lifecycle.',
				outcome:
					'Built an editing interface for selecting data fields and options and viewing them in a Chart.js preview.',
			},
			aboutSummary:
				'Built chart settings panels, data connections and preview interfaces.',
		},
		'settlement-operations-platform': {
			headline:
				'A business system for vehicle and driver records, transport fees, billing and settlement.',
			editorial: {
				decision:
					'Built keyboard editing and draft preservation into shared tables. Used server revalidation and one transaction for Excel confirmation, separating current assignments from historical settlements.',
				outcome:
					'Delivered settlement persistence to the development environment. Administrators use the revised work-log screen.',
			},
			aboutSummary:
				'Built the administrator web interface, key server APIs and data persistence for vehicles, drivers, transport fees and settlement, including shared inputs, settlement history and revised work logs.',
		},
		'react-admin-state-migration': {
			headline:
				'A web app for searching and editing account, stock and order records.',
			context:
				'Repeated list, search and input interfaces needed shared components. The screens also needed to be developed and checked without a real backend connection.',
			editorial: {
				decision:
					'Built shared column controls, filters and modals with screen-specific columns and actions. Used MSW responses to develop the UI without a real backend connection.',
				outcome:
					'Verified column controls, scrolling, search modals, loading and empty states locally with MSW mock responses.',
			},
			aboutSummary:
				'Built the complete React frontend for account, stock and order screens using MSW mock APIs. Created shared tables, filters and modals, keeping draft filters separate from applied query conditions.',
		},
		'multi-role-hybrid-platform': {
			role: 'Web and Android feature development for an existing solution',
			workType: 'Solution feature development and improvements',
			area:
				'Member management, inquiries, attachments, and Android file selection',
			headline:
				'Developed and improved member management, inquiries and attachments across an existing web solution and Android app.',
			summary:
				'Built member search, editing, merging, inquiries and attachments, with Android file selection and image previews.',
		},
		'ai-kickoff-documentation-tool': {
			summary:
				'Built staged screens for reviewing repositories or uploaded material and drafting requirements and documents. Added table editing and targeted AI revisions for selected sheets and cells.',
		},
		'mobile-operations-platform': {
			summary:
				'Updated map selection and return navigation, offline saves and retries. Restored queued requests after app restarts.',
		},
		'legacy-support-web': {
			summary:
				'Added distinct messages for parsing, input and network errors in Excel imports. Investigated repeated database queries in bulk imports and proposed changes.',
		},
		'hybrid-life-info-platform': {
			summary:
				'Extended weather, air quality and alerts with public-data APIs. Prioritized core information and built server caches and shared in-flight requests.',
		},
		'legacy-mobile-compatibility': {
			summary:
				'Updated a legacy WebView-based Android app for build tools and OS-specific permissions, file access and back navigation. Fixed login and initial synchronization issues.',
		},
		'hybrid-security-boundary': {
			summary:
				'Built deepfake image and personal-data breach checks using external APIs, from file selection to requests and results, including Android WebView integration.',
		},
		'field-terminal-android': {
			summary:
				'Updated an existing PDA app’s build, storage and update handling. Added receiving filters, quantity entry and QR/barcode scanning.',
		},
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
	if (workStoryDefinitions.length !== 12) {
		throw new Error('Work story manifest must contain exactly twelve stories.');
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
				`${locale} work records must contain exactly thirteen public cases.`,
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
		featuredStories.length !== 3 ||
		aboutStories.length !== featuredStories.length ||
		aboutStories.some((story, index) => story.id !== featuredStories[index].id)
	) {
		throw new Error('About must contain exactly three featured work stories.');
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

	return workStoryDefinitions
		.map((definition) =>
			resolveStory(definition, storyCopies[locale][definition.id], recordsById),
		)
		.sort((a, b) => {
			if (a.tier !== b.tier) return a.tier === 'featured' ? -1 : 1;
			const aDates = a.period.match(/\d{4}\.\d{2}/g) ?? [];
			const bDates = b.period.match(/\d{4}\.\d{2}/g) ?? [];
			return (
				(bDates.at(-1) ?? '').localeCompare(aDates.at(-1) ?? '') ||
				(bDates[0] ?? '').localeCompare(aDates[0] ?? '')
			);
		});
}

validateWorkData();

export const workStories: Localized<ProfessionalStory[]> = {
	ko: resolveWorkStories('ko'),
	en: resolveWorkStories('en'),
};
