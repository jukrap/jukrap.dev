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
		id: 'delivery-output-flow',
		tier: 'featured',
		caseIds: ['delivery-operations-web', 'mobile-output-bridge'],
		includeInAbout: true,
	},
	{
		id: 'structured-editor-ui',
		tier: 'featured',
		caseIds: ['structured-editor-ui'],
		includeInAbout: true,
	},
	{
		id: 'ai-kickoff-documentation-tool',
		tier: 'featured',
		caseIds: ['ai-kickoff-documentation-tool'],
		includeInAbout: true,
	},
	{
		id: 'hybrid-life-info-platform',
		tier: 'featured',
		caseIds: ['hybrid-life-info-platform'],
		includeInAbout: true,
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
	{
		id: 'legacy-panel-baseline',
		tier: 'compact',
		caseIds: ['legacy-panel-baseline'],
		includeInAbout: false,
	},
] as const satisfies readonly WorkStoryDefinition[];

type WorkStoryId = (typeof workStoryDefinitions)[number]['id'];
type WorkStoryCopies = Record<WorkStoryId, WorkStoryCopy>;

const storyCopies: Localized<WorkStoryCopies> = {
	ko: {
		'delivery-output-flow': {
			title: '물류 운영·출력 흐름',
			platform: 'Web / Mobile',
			area: '업무 운영 / WebView·Android 출력',
			period: '2026.04 ~ 2026.06',
			role: '신규 구축/출력 연동',
			workType: '신규 개발',
			headline:
				'조회부터 예약·Excel·라벨 출력까지 이어지는 업무 흐름을 웹과 모바일 장비 경계로 연결했습니다.',
			summary:
				'서로 다른 저장소와 앱으로 구축된 React 운영 웹과 모바일 출력 앱을 하나의 사용자 흐름으로 설명하되, 화면 상태와 장비 SDK의 책임은 섞지 않았습니다.',
			context:
				'예약 접수, 다건 처리, Excel 미리보기, 출력은 같은 업무 흐름이지만 PC 브라우저와 모바일 장비는 별도 앱·저장소와 실행 조건을 가졌습니다. 웹의 초기 로딩 비용을 줄이는 일과 Android 권한·Bluetooth·프린터 SDK를 다루는 일을 분리하면서도 요청 데이터와 실패 기준은 이어져야 했습니다.',
			editorial: {
				decision:
					'웹은 조회·예약·Excel·출력 요청의 상태와 초기 로딩을 책임지고, 모바일은 WebView contract 이후의 권한·Bluetooth·프린터 출력을 책임지도록 경계를 나눴습니다.',
				outcome:
					'웹 초기 진입 비용과 모바일 출력 완료를 서로 다른 실행 환경과 검증 기준으로 확인했습니다.',
				takeaway:
					'하나의 사용자 흐름이어도 브라우저 성능과 장비 출력은 같은 완료 기준으로 묶지 않는다는 원칙.',
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
				'조회·예약·Excel·라벨 출력을 웹 상태와 Android 장비 책임으로 나눈 물류 운영 사례.',
		},
		'structured-editor-ui': {
			headline:
				'데이터 역할과 설정 상태가 실제 프리뷰와 어긋나지 않는 편집 흐름을 설계했습니다.',
			summary:
				'수제 프리뷰의 확장 한계를 Chart.js 전환으로 풀고, field mapping·preview lifecycle·차트별 설정 책임을 분리했습니다.',
			editorial: {
				decision:
					'차트 타입별 유효 옵션만 노출하고, field mapping·preview lifecycle·settings state를 분리해 같은 편집 모델을 바라보도록 했습니다.',
				outcome:
					'설정 상태와 실제 프리뷰를 하나의 회귀 범위로 연결해 편집 흐름이 어긋나지 않는지 확인했습니다.',
				takeaway:
					'편집 도구의 신뢰도는 옵션 수보다 입력 상태와 실제 렌더 결과의 일치에서 나온다는 기준.',
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
			editorial: {
				decision:
					'규칙 기반 scanner 결과를 preview한 뒤 AI 초안에 사용하고, workbook을 검수 원장으로 두며 수정 범위는 선택한 sheet와 cell로 제한했습니다.',
				outcome:
					'근거 수집부터 사람 검수와 선택 범위 수정까지 각 단계를 분리된 검증 경로로 확인했습니다.',
				takeaway:
					'AI 보조는 근거 입력, 사람 검수, 부분 수정의 경계를 명시해 검토 가능한 산출물을 남긴다는 기준.',
			},
			impact: [
				{
					value: '근거 우선',
					label: 'scanner → preview',
					detail: '규칙 기반 수집 결과를 먼저 확인한 뒤 AI 초안에 사용',
				},
				{
					value: 'workbook 검수',
					label: '사람 중심 산출물',
					detail: '요구사항·기능·화면 단위를 표로 검토하고 export',
				},
				{
					value: '선택 범위 수정',
					label: 'sheet / cell revision',
					detail: '전체 재생성 대신 수정 대상과 보존 문맥을 함께 전달',
				},
			],
			aboutSummary:
				'저장소 근거·AI 초안·workbook 검수·부분 수정을 분리한 프로젝트 문서화 도구.',
		},
		'hybrid-life-info-platform': {
			editorial: {
				decision:
					'핵심·보조 loading, fresh·stale cache, 기준 데이터 cache를 분리하고 운영 반영은 manifest와 SHA-256 hash 단위로 좁혔습니다.',
				outcome:
					'캐시 성능, 회귀 테스트, 날짜별 운영 배포를 서로 다른 기준으로 확인하고 기록했습니다.',
				takeaway:
					'레거시 운영 개선은 바꾼 범위뿐 아니라 보존한 계약과 fallback·배포 증거까지 함께 남겨야 한다는 기준.',
			},
			impact: [
				{
					value: '약 2.85초 → 0.11초',
					label: 'core 운영 smoke',
					detail: '2026-07-08 당시 cold 요청과 cache HIT 비교',
				},
				{
					value: '약 2.02초 → 0.07초',
					label: '대기질 운영 smoke',
					detail: '2026-07-08 당시 cold 요청과 cache HIT 비교',
				},
				{
					value: '131 tests / skipped 1',
					label: '최종 회귀',
					detail: '운영 반영 전후의 같은 회귀 기준으로 확인',
				},
			],
			checks: [
				'2026-07-02 배포에서 runtime 111개 파일의 target SHA-256 111/111 일치를 확인했습니다.',
				'2026-07-08 배포에서는 manifest 42개 중 39개를 업로드하고 동일 hash 3개를 별도로 skip했습니다.',
				'AirKorea 측정소 673행과 법정동 20,560행을 수집해 필수값 누락 없이 기준 데이터 cache로 검증했습니다.',
			],
			aboutSummary:
				'공공 API·cache·WebView·파일 단위 운영 배포 경계를 안정화한 하이브리드 생활정보 서비스.',
		},
		'legacy-mobile-compatibility': {},
		'react-admin-state-migration': {},
		'hybrid-security-boundary': {},
		'field-terminal-android': {},
		'legacy-panel-baseline': {},
	},
	en: {
		'delivery-output-flow': {
			title: 'Logistics Operations and Output Flow',
			platform: 'Web / Mobile',
			area: 'Operations / WebView and Android output',
			period: '2026.04 ~ 2026.06',
			role: 'New build and output integration',
			workType: 'Build',
			headline:
				'Connected lookup, reservation, Excel, and label output across web and mobile-device boundaries.',
			summary:
				'Presented a React operations web app and a mobile output app from separate repositories as one user workflow while keeping screen-state and device-SDK responsibilities distinct.',
			context:
				'Reservation intake, batch work, Excel preview, and output belonged to one workflow, but desktop browsers and mobile devices lived in separate apps and repositories with different runtime constraints. Web loading cost and Android permission, Bluetooth, and printer-SDK behavior needed separate boundaries while sharing request data and failure criteria.',
			editorial: {
				decision:
					'The web app owned lookup, reservation, Excel, output-request state, and initial loading, while mobile owned permissions, Bluetooth, and printer output after the WebView contract.',
				outcome:
					'Verified web entry cost and mobile output completion against separate runtime and validation criteria.',
				takeaway:
					'Even one user journey needs separate completion criteria for browser performance and physical-device output.',
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
				'A logistics operations case separating web state from Android-device responsibility across lookup, reservation, Excel, and label output.',
		},
		'structured-editor-ui': {
			headline:
				'Designed an editing flow that kept data roles and settings aligned with the rendered preview.',
			summary:
				'Replaced a limited hand-built preview with Chart.js and separated field mapping, preview lifecycle, and chart-specific settings responsibilities.',
			editorial: {
				decision:
					'Showed only valid options for each chart type and separated field mapping, preview lifecycle, and settings state around one editing model.',
				outcome:
					'Connected settings state and the rendered preview under one regression scope to check that the editing flow stayed aligned.',
				takeaway:
					'Editor trust comes from keeping input state aligned with the rendered result, not from offering more options.',
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
			editorial: {
				decision:
					'Previewed deterministic scanner evidence before AI drafting, kept the workbook as the review record, and limited revisions to selected sheets and cells.',
				outcome:
					'Verified each stage from evidence collection through human review and scoped revision as a distinct path.',
				takeaway:
					'AI assistance should leave reviewable artifacts by keeping evidence input, human review, and scoped revision boundaries explicit.',
			},
			impact: [
				{
					value: 'evidence first',
					label: 'scanner → preview',
					detail:
						'reviewed deterministic scan results before using them for AI drafts',
				},
				{
					value: 'workbook review',
					label: 'human-readable artifact',
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
				'A project documentation tool separating repository evidence, AI drafts, workbook review, and scoped revision.',
		},
		'hybrid-life-info-platform': {
			editorial: {
				decision:
					'Separated core and secondary loading, fresh and stale caches, and reference-data caches, then limited production delivery to manifest and SHA-256 hash scopes.',
				outcome:
					'Verified cache behavior, regression coverage, and dated production deliveries against separate baselines.',
				takeaway:
					'Legacy production improvements should record preserved contracts, fallbacks, and deployment evidence alongside the changed scope.',
			},
			impact: [
				{
					value: 'about 2.85s → 0.11s',
					label: 'core production smoke',
					detail: 'cold request versus cache hit observed on 2026-07-08',
				},
				{
					value: 'about 2.02s → 0.07s',
					label: 'air-quality production smoke',
					detail: 'cold request versus cache hit observed on 2026-07-08',
				},
				{
					value: '131 tests / 1 skipped',
					label: 'final regression',
					detail: 'checked against the same regression baseline around rollout',
				},
			],
			checks: [
				'On 2026-07-02, all 111 deployed runtime files matched their target SHA-256 hashes.',
				'On 2026-07-08, 39 of 42 manifest files were uploaded and three identical hashes were skipped separately.',
				'Validated 673 AirKorea station rows and 20,560 legal-district rows without missing required values before caching them as reference data.',
			],
			aboutSummary:
				'A hybrid life-information service stabilizing public API, cache, WebView, and file-level production delivery boundaries.',
		},
		'legacy-mobile-compatibility': {},
		'react-admin-state-migration': {},
		'hybrid-security-boundary': {},
		'field-terminal-android': {},
		'legacy-panel-baseline': {},
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
	'WS09',
	'WS10',
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
	if (workStoryDefinitions.length !== 9) {
		throw new Error('Work story manifest must contain exactly nine stories.');
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
			throw new Error(`${locale} work records must contain exactly ten cases.`);
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
	if (aboutStories.length !== 4) {
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
