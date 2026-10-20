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
		id: 'ai-document-analysis',
		tier: 'featured',
		caseIds: ['ai-document-analysis'],
		includeInAbout: true,
	},
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
		caseIds: ['settlement-operations-platform', 'erp-mobile-workflow'],
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
		'ai-document-analysis': {
			editorial: {
				decision:
					'검색된 문장의 앞뒤 문맥을 함께 전달하고, 답변의 근거와 질문별 응답 여부를 각각 검증했습니다. 긴 답변은 나누어 평가하고, 반복 계산을 줄여 애플리케이션 처리 시간을 단축했습니다.',
				outcome:
					'입력 한도를 넘어서 중단되던 긴 답변의 평가를 완료할 수 있게 됐습니다. 반복 계산을 줄여 문서 분석 시간을 단축했고, 사용자가 품질 평가가 끝나기 전에도 답변을 확인할 수 있게 했습니다.',
			},
			aboutSummary:
				'문서 검색과 질문 응답을 제공하는 AI 플랫폼을 풀스택으로 개발했습니다. 답변의 근거를 찾는 과정과 Ragas 평가 기능을 개선하고, 반복 계산으로 생기던 지연을 줄였습니다.',
		},
		'delivery-output-flow': {
			title: '물류 운영 웹·출력 앱',
			platform: 'Web / Android',
			area: '프론트엔드 전체 개발·Android 출력 앱 개발',
			role: '물류 업무 웹과 출력 앱 개발',
			headline:
				'조회·예약·Excel 등록부터 PC·Android 라벨 출력까지 이어지는 물류 업무 웹과 출력 앱을 개발했습니다.',
			summary:
				'React·TypeScript로 웹 프론트엔드 전체를 개발하고 PC·Android 프린터를 연결했습니다. 페이지와 Excel 코드를 필요한 시점에 불러오도록 바꿔 초기 JavaScript 파일 크기를 약 74% 줄였습니다. Android 권한 오류를 추적하고 실물 라벨을 보며 긴 주소의 잘림과 겹침도 수정했습니다.',
			context:
				'조회·예약·Excel 등록 화면에서 서버 데이터를 사용하고, 같은 자료를 PC와 Android의 서로 다른 출력 방식에 연결해야 했습니다. 첫 화면에서 쓰지 않는 코드까지 한 번에 불러오는 문제와, 실제 장비에서 발생하는 연결 오류·라벨 잘림도 해결해야 했습니다.',
			editorial: {
				decision:
					'표·폼·모달과 출력 데이터 형식을 통일했습니다. 인증과 API 초기화 순서는 유지하면서 페이지·Excel 코드만 나눠 불러오도록 했고, 장비 연결과 출력 문제는 실제 기기와 라벨에서 확인했습니다.',
				outcome:
					'2026.05 빌드에서 초기 JavaScript 파일 크기를 2,405.50 kB에서 616.60 kB로 줄였습니다. Android의 Bluetooth 연결 오류를 수정하고 PC·모바일 실제 라벨의 주소 배치를 보정했습니다.',
			},
			resultSections: ['delivery-operations-web', 'mobile-output-bridge'].map(
				(chapterId) => {
					const record = workCases.ko.find(({ id }) => id === chapterId)!;
					return { chapterId, impact: record.impact, checks: record.checks };
				},
			),
			aboutSummary: '조회·예약·Excel 등록과 PC·Android 라벨 출력을 구현했습니다.',
		},
		'structured-editor-ui': {
			summary:
				'개발 중이던 사이트에서 차트에 사용할 데이터와 표시 방식을 설정하는 페이지를 맡았습니다. 차트 종류에 맞는 설정을 보여 주고, 선택한 데이터와 옵션을 Chart.js 미리보기에 반영했습니다.',
			editorial: {
				decision:
					'데이터 필드를 차트의 축과 값에 연결하고, 차트 종류에 맞는 옵션만 보여 주도록 했습니다. 설정 변경 때 차트 전체가 불필요하게 다시 만들어지지 않도록 갱신 조건을 정리했습니다.',
				outcome:
					'데이터 필드와 옵션을 설정 패널에서 선택하고 Chart.js 미리보기로 확인하는 편집 화면을 구현했습니다.',
			},
			aboutSummary: '차트 설정 패널과 데이터 연결, 미리보기 화면을 구현했습니다.',
		},
		'settlement-operations-platform': {
			title: '업무 정산 ERP·모바일 앱',
			platform: 'Web / API / Android',
			area: 'ERP 웹·서버와 모바일 업무 기능 개발(채팅 시스템 제외)',
			period: '2026.07 ~ 2026.09',
			role: '풀스택 개발',
			workType: '신규 개발·기능 연계',
			headline:
				'차량·기사 정보와 정산을 관리하는 ERP를 개발하고, 업무 알림·문서·문의를 모바일 앱에 연결했습니다.',
			summary:
				'ERP 웹 전반과 주요 서버 API, 채팅 시스템을 제외한 모바일 업무 기능을 개발했습니다. 입력과 정산 이력을 보호하는 저장 처리부터 알림 변경, 읽음 기록, 문서 다운로드와 문의 완료까지 웹·서버·Android의 동작을 연결했습니다.',
			context:
				'ERP에서는 여러 사람이 같은 자료를 수정하거나 Excel 자료를 일괄 등록해도 입력과 기존 정산을 잃지 않아야 했습니다. 모바일에서는 ERP의 변경 내용을 최신 상태로 보여 주고, 요청이 반복되거나 순서가 바뀌어도 읽음 기록과 문의 처리 결과를 지켜야 했습니다.',
			editorial: {
				decision:
					'저장 요청의 버전과 중복 여부를 서버에서 검사하고, 거절된 입력은 화면에 남겨 비교·재저장할 수 있도록 했습니다. 모바일 알림은 원본의 버전·삭제 상태와 사용자의 읽음 기록을 나눠 처리하고, 문서 다운로드와 문의 완료에도 현재 권한과 처리 상태를 확인했습니다.',
				outcome:
					'Excel 등록의 중복·부분 저장과 동시 수정에 따른 덮어쓰기를 막고, 충돌한 입력을 다시 저장할 수 있는 흐름을 구현했습니다. 모바일에서는 알림 변경·읽음·문의 결과를 검증했고, Android 에뮬레이터에서 실제 알림 수신과 관련 화면 이동을 확인했습니다.',
			},
			aboutSummary:
				'정산 ERP와 모바일 업무 기능을 풀스택으로 개발했습니다. 입력과 과거 정산을 보호하는 저장 처리, 알림·문서·문의 연계를 구현했습니다.',
			resultSections: [
				{
					chapterId: 'settlement-operations-platform',
					impact: [
						{
							value: '입력을 보존한 채 재저장',
							label: '동시 수정 처리',
							detail:
								'오래된 저장을 거절한 뒤 최신 자료와 입력값을 비교하고, 반영할 내용을 선택해 다시 저장할 수 있도록 했습니다.',
						},
						{
							value: '중복·부분 등록 방지',
							label: 'Excel 일괄 저장',
							detail:
								'저장 오류가 나면 전체 행을 취소하고, 같은 요청을 다시 보내면 이미 저장한 결과를 반환하도록 했습니다.',
						},
						{
							value: '확정된 정산 이력 보존',
							label: '배정·원본 정보 변경',
							detail:
								'현재 배정과 원본 자료를 수정해도 이미 확정한 정산의 대상과 금액은 유지하도록 했습니다.',
						},
					],
					checks: [
						'격리된 MariaDB에서 저장 중 실패하면 전체가 취소되고, 동시에 확정하거나 같은 요청을 반복해도 중복 등록되지 않는지 확인했습니다.',
						'개발 환경에서 다른 사용자가 먼저 수정한 뒤 오래된 화면의 저장이 거절되는지 확인했습니다. 입력값이 남아 있는 상태에서 최신 내용과 비교하고 다시 저장한 결과를 브라우저·API·DB로 대조했습니다.',
						'개발 DB에서 배정 관계가 바뀐 뒤에도 과거 정산 금액이 유지되는지 확인했습니다. 정산 저장 기능은 개발 환경에 반영했으며, 개편한 작업 로그 화면은 관리자가 사용하고 있습니다.',
					],
				},
				{
					chapterId: 'erp-mobile-workflow',
					impact: [
						{
							value: '알림의 최신 상태 유지',
							label: '수정·삭제와 재전송',
							detail:
								'변경 요청이 역순으로 도착하거나 반복돼도 예전 내용이 최신 내용을 덮거나 삭제한 알림이 다시 생기지 않도록 했습니다.',
						},
						{
							value: '읽음 기록의 동시 저장 오류 해결',
							label: 'MariaDB 저장 처리',
							detail:
								'등록과 갱신을 한 번의 DB 연산으로 처리하고, 요청이 반복돼도 최초 표시·읽음 시각을 유지했습니다.',
						},
						{
							value: '문서와 문의를 앱에 연결',
							label: 'ERP와 모바일의 업무 연계',
							detail:
								'접근 권한을 확인하는 PDF 다운로드와 문의 처리 결과 조회를 구현하고, 이미 완료한 문의의 결과가 덮어써지지 않도록 했습니다.',
						},
					],
					checks: [
						'격리된 MariaDB에서 기존 읽음 저장 실패를 재현한 뒤, 동시에 들어오는 표시·읽음 요청이 저장되고 최초 시각이 유지되는지 확인했습니다. 알림 수정·삭제의 역순 전달과 재전송도 검사했습니다.',
						'Chrome에서 내려받은 PDF가 원본과 같은 파일인지 해시로 대조하고, Android 다운로드 요청으로 전달되는 주소와 값을 검사했습니다.',
						'로컬 브라우저에서 문의 접수부터 관리자 완료와 모바일 상태 확인까지 검수했습니다. 뒤늦은 완료 요청은 기존 결과를 바꾸지 않았고, 같은 이력을 다시 보내도 ERP에 중복 기록되지 않았습니다.',
						'관련 기능을 개발 환경에 반영했습니다. Android 에뮬레이터에서는 실제 시스템 알림을 받고, 알림을 눌러 관련 목록과 본문으로 이동하는 동작을 확인했습니다.',
					],
				},
			],
		},
		'react-admin-state-migration': {
			headline: '계좌·종목·주문 정보를 조회하고 등록·수정하는 주식 업무 관리 웹.',
			context:
				'여러 업무 화면에 목록·검색·입력 처리가 반복돼 공통 UI가 필요했습니다. 실제 백엔드에 연결하지 않고도 화면을 개발하고 동작을 확인할 수 있어야 했습니다.',
			editorial: {
				decision:
					'컬럼 조작·필터·모달은 공통 컴포넌트로 만들고 화면별 컬럼과 동작은 따로 정의했습니다. MSW로 모의 응답을 구성해 실제 백엔드 연결 없이 화면을 개발했습니다.',
				outcome:
					'계좌·종목·주문 화면에서 같은 방식으로 열을 고정하고 너비와 순서를 바꿀 수 있도록 했습니다. MSW 응답을 사용하는 로컬 환경에서 검색·재조회·더보기와 로딩·빈 결과 표시를 확인했습니다.',
			},
			aboutSummary:
				'공통 테이블·필터·모달을 만들고 MSW로 화면 동작을 확인했습니다.',
		},
		'multi-role-hybrid-platform': {
			role: '기존 솔루션의 웹·Android 기능 개발·개선',
			workType: '솔루션 기능 확장·개선',
			area: '회원 관리와 문의·첨부 기능 개발, Android 파일 선택 연동',
			headline:
				'기존 웹과 Android 앱의 회원 관리, 문의·첨부 기능을 개발하고 개선했습니다.',
			summary:
				'회원 검색·수정·중복 통합과 문의·첨부 기능을 개발했습니다. 회원 역할과 작성자를 서버에서 확인해 접근을 제한하고, Android 앱의 파일 선택과 이미지 미리보기를 연결했습니다.',
		},
		'ai-kickoff-documentation-tool': {
			summary:
				'저장소와 프로젝트 착수 자료를 바탕으로 문서 초안을 만들고 검토하는 사내 웹 도구를 개발했습니다. 요구사항 검토·표 편집·선택한 부분의 AI 수정과 결과 저장·내보내기를 구현했습니다.',
		},
		'mobile-operations-platform': {
			summary:
				'지도 마커 선택·현재 위치 조회·업무 처리 후 지도 복귀 동작을 수정했습니다. 오프라인에서 배달 완료 내용을 저장하고, 앱 재실행 후 요청을 복원해 통신이 연결되면 다시 전송하도록 했습니다.',
		},
		'legacy-support-web': {
			summary:
				'Excel 업로드 중 파일 분석·입력 검증·통신 오류를 구분해 안내하도록 했습니다. 대량 등록에서 반복되는 DB 조회 비용을 조사하고 개선안을 제안했습니다.',
		},
		'hybrid-life-info-platform': {
			summary:
				'공공 데이터 API를 연동해 날씨·대기질·기상특보 기능을 확장했습니다. 핵심 정보를 먼저 표시하고 지역과 정보 종류별로 응답을 캐시했습니다. 같은 정보를 동시에 요청하면 진행 중인 조회 결과를 함께 사용하도록 했습니다.',
		},
		'legacy-mobile-compatibility': {
			summary:
				'WebView 기반 Android 앱의 빌드 환경을 업데이트했습니다. OS별 권한·파일 접근·뒤로가기 처리를 수정하고 로그인·초기 동기화 문제를 보완했습니다.',
		},
		'hybrid-security-boundary': {
			summary:
				'외부 API를 이용한 이메일 유출 조회와 딥페이크 이미지 검사 기능을 개발했습니다. 이메일·이미지 입력부터 검사 요청과 결과 표시까지 구현하고, Android 앱의 이미지·파일 선택을 연결했습니다.',
		},
		'field-terminal-android': {
			summary:
				'기존 PDA 앱의 빌드 환경과 저장소·업데이트 처리를 정비했습니다. 입고 조회 조건과 수량 입력, QR·바코드 스캔 기능을 개발했습니다.',
		},
	},
	en: {
		'ai-document-analysis': {
			editorial: {
				decision:
					'Retrieved surrounding context and checked supporting evidence and question coverage separately. Evaluated long answers in batches and reduced application processing time by removing repeated calculations.',
				outcome:
					'Completed long-answer evaluations that had previously exceeded the input limit. Reduced document-analysis time by removing repeated calculations, and let users read answers before quality evaluation finished.',
			},
			aboutSummary:
				'Built a full-stack AI platform for document search and question answering. Improved evidence retrieval and Ragas evaluation, and reduced delays caused by repeated computation.',
		},
		'delivery-output-flow': {
			title: 'Logistics Operations Web and Printing App',
			platform: 'Web / Android',
			area: 'Complete frontend and Android printing app development',
			role: 'Logistics web and printing app development',
			headline:
				'I built a logistics web app and Android printing app spanning search, reservations, Excel imports and PC/Android label printing.',
			summary:
				'I developed the complete React and TypeScript frontend and connected PC and Android printers. Loading pages and Excel code on demand reduced the initial JavaScript file size by about 74%. I traced an Android permission error and corrected clipped or overlapping addresses using physical label prints.',
			context:
				'Search, reservations and Excel imports needed server data that could also feed the different PC and Android printing integrations. The app loaded unnecessary code at startup, while physical devices exposed connection errors and clipped label text.',
			editorial: {
				decision:
					'I created shared tables, forms, modals and print data formats. I preserved authentication and API initialization order while splitting page and Excel code, and checked connection and layout problems on physical devices and printed labels.',
				outcome:
					'The initial JavaScript file shrank from 2,405.50 kB to 616.60 kB in the May 2026 builds. I fixed the Android Bluetooth connection error and adjusted address layouts on physical PC and mobile labels.',
			},
			resultSections: ['delivery-operations-web', 'mobile-output-bridge'].map(
				(chapterId) => {
					const record = workCases.en.find(({ id }) => id === chapterId)!;
					return { chapterId, impact: record.impact, checks: record.checks };
				},
			),
			aboutSummary:
				'Built search, reservations, Excel imports and PC/Android label printing.',
		},
		'structured-editor-ui': {
			summary:
				'Built a page for choosing chart data and display settings within a website under development. Showed settings appropriate to each chart type and reflected selected data and options in a Chart.js preview.',
			editorial: {
				decision:
					'Connected data fields to chart axes and values and showed options appropriate to each chart type. Revised the update conditions so setting changes did not unnecessarily recreate the whole chart.',
				outcome:
					'Built an editing interface for selecting data fields and options and viewing them in a Chart.js preview.',
			},
			aboutSummary:
				'Built chart settings panels, data connections and preview interfaces.',
		},
		'settlement-operations-platform': {
			title: 'Settlement ERP and Mobile App',
			platform: 'Web / API / Android',
			area:
				'ERP web and server development, with mobile business features excluding the chat system',
			period: '2026.07 ~ 2026.09',
			role: 'Full-stack development',
			workType: 'Build and feature integration',
			headline:
				'Built an ERP for vehicle, driver and settlement records and connected notifications, documents and inquiries to a mobile app.',
			summary:
				'Developed the ERP web application, key server APIs and mobile business features, excluding the chat system. Connected web, server and Android behavior across safe editing, settlement history, notification updates, read receipts, document downloads and inquiry completion.',
			context:
				'ERP users needed to edit shared records and import Excel data without losing input or historical settlements. The mobile app needed to reflect current ERP changes while preserving read receipts and inquiry results when requests were repeated or arrived out of order.',
			editorial: {
				decision:
					'Checked record versions and duplicate requests on the server while retaining rejected edits for comparison and resubmission. Handled notification versions and deletion status separately from read receipts, and checked current permissions and workflow status for document downloads and inquiry completion.',
				outcome:
					'Implemented protection against partial imports, duplicate writes and lost updates, with a recovery flow for conflicting edits. Verified mobile notification changes, receipt saves and inquiry results, and checked actual notification delivery and navigation on an Android emulator.',
			},
			aboutSummary:
				'Built the settlement ERP and mobile business features across the stack, protecting user input and historical settlements while connecting notifications, documents and inquiries.',
			resultSections: [
				{
					chapterId: 'settlement-operations-platform',
					impact: [
						{
							value: 'Recover edits after a conflict',
							label: 'Concurrent editing',
							detail:
								'Rejected outdated saves while retaining input, then let users compare current values and explicitly save their chosen changes.',
						},
						{
							value: 'Prevent partial and duplicate imports',
							label: 'Batch Excel saves',
							detail:
								'Rolled back all rows on a failed commit and returned the previous result when the same request was repeated.',
						},
						{
							value: 'Preserve finalized settlements',
							label: 'Assignment and source changes',
							detail:
								'Kept the original settlement parties and amounts when current assignments or source records were corrected.',
						},
					],
					checks: [
						'Verified full rollback after a failed write in isolated MariaDB, and checked that concurrent commits and repeated requests did not create duplicate records.',
						'In the development environment, verified that a save from an outdated screen was rejected after another user updated the record. Compared browser, API and database results after retaining input, reviewing current values and saving again.',
						'Verified that historical settlement amounts remained intact after assignment changes in the development database. Settlement persistence was delivered to the development environment, and administrators use the revised activity-log screen.',
					],
				},
				{
					chapterId: 'erp-mobile-workflow',
					impact: [
						{
							value: 'Keep notifications current',
							label: 'Edits, deletions and retries',
							detail:
								'Prevented out-of-order or repeated requests from overwriting newer content or recreating deleted notifications.',
						},
						{
							value: 'Resolve concurrent receipt writes',
							label: 'MariaDB persistence',
							detail:
								'Combined insertion and updates into one database operation while preserving the first display and read timestamps.',
						},
						{
							value: 'Connect documents and inquiries',
							label: 'ERP and mobile workflows',
							detail:
								'Added permission-checked PDF downloads and inquiry status views, protecting completed inquiries from late overwrites.',
						},
					],
					checks: [
						'Reproduced the original receipt-save failure in isolated MariaDB, then verified concurrent display and read requests and preservation of first timestamps. Also tested out-of-order notification changes and repeated delivery.',
						'Matched a PDF downloaded in Chrome to its source hash and inspected the URL and values passed to the Android download request.',
						'Verified inquiry submission, administrator completion and mobile status updates in local browser sessions. Late completion requests preserved the existing result, and repeated events did not create duplicate ERP records.',
						'Delivered the related features to the development environment. On an Android emulator, verified actual system notification delivery and navigation to the relevant list and content.',
					],
				},
			],
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
					'Provided consistent column pinning, resizing and reordering across account, stock and order screens. Verified search, repeated queries, load-more behavior, loading states and empty results locally with MSW responses.',
			},
			aboutSummary:
				'Built shared tables, filters and modals, and checked screen behavior with MSW mock APIs.',
		},
		'multi-role-hybrid-platform': {
			role: 'Web and Android feature development for an existing solution',
			workType: 'Solution feature development and improvements',
			area:
				'Member management, inquiries, attachments, and Android file selection',
			headline:
				'Developed and improved member management, inquiries and attachments across an existing web solution and Android app.',
			summary:
				'Built member search, editing, merging, inquiries and attachments. Checked member roles and authorship on the server to control access and connected file selection and image previews in the Android app.',
		},
		'ai-kickoff-documentation-tool': {
			summary:
				'Built an internal web tool for drafting and reviewing documents from repositories and project kickoff material. Implemented requirement review, table editing, targeted AI revisions, result storage and document export.',
		},
		'mobile-operations-platform': {
			summary:
				'Updated map-marker selection, current location and return-to-map behavior. Implemented offline delivery-completion saves, request recovery after app restarts and retries after reconnection.',
		},
		'legacy-support-web': {
			summary:
				'Added distinct messages for parsing, input and network errors in Excel imports. Investigated repeated database queries in bulk imports and proposed changes.',
		},
		'hybrid-life-info-platform': {
			summary:
				'Extended weather, air quality and alerts with public-data APIs. Displayed core information first and cached responses by region and information type. Concurrent requests for the same information shared the lookup already in progress.',
		},
		'legacy-mobile-compatibility': {
			summary:
				'Updated a legacy WebView-based Android app for build tools and OS-specific permissions, file access and back navigation. Fixed login and initial synchronization issues.',
		},
		'hybrid-security-boundary': {
			summary:
				'Built email-breach lookup and deepfake image checks using external APIs. Connected email and image input to inspection requests and results, including image and file selection in the Android app.',
		},
		'field-terminal-android': {
			summary:
				'Updated an existing PDA app’s build, storage and update handling. Added receiving filters, quantity entry and QR/barcode scanning.',
		},
	},
};

const expectedWorkstreams: readonly WorkstreamId[] = [
	'AI01',
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
	'WS16',
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
				`${locale} work records must contain exactly fourteen public cases.`,
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
