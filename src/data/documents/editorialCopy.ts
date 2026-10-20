import type { Locale } from '@/types/locale';
interface CaseCopy {
	summary: string;
	overviewDetail?: string;
	problem: string;
	actions: { title: string; description: string }[];
	result: string;
	briefResult?: string;
	decision?: string;
}
export const workDocumentCopy: Record<Locale, Record<string, CaseCopy>> = {
	ko: {
		'ai-document-analysis': {
			summary:
				'문서 검색과 질문 응답을 제공하는 Gemma 4 기반 플랫폼의 풀스택 개발을 맡았습니다. 검색 결과에 앞뒤 문맥을 추가하고, 답변 검증과 Ragas 평가 기능을 개선했습니다.',
			overviewDetail:
				'문서 검색과 답변 평가 기능을 개발했습니다. 반복 계산을 제거해 문서 분석 처리 시간의 중앙값을 2,969ms → 672ms로 줄였습니다(모델 응답을 고정한 시험 기준).',
			problem:
				'검색된 문장만 전달하면 앞뒤 문단의 조건이나 예외가 빠졌습니다. 여러 항목을 묻는 질문에서는 설명 대신 원문만 표시되기도 했습니다. 긴 답변은 모델의 입력 한도 때문에 평가가 중단됐고, 반복적인 토큰 수 계산은 문서 분석을 지연시켰습니다.',
			actions: [
				{
					title: '앞뒤 문맥을 함께 찾는 검색',
					description:
						'검색된 문장의 앞뒤 문단과 참조된 표를 함께 찾도록 했습니다. 최종 답변을 만들 때도 원문과 출처를 전달해, 조건이나 예외가 빠지지 않도록 했습니다.',
				},
				{
					title: '긴 답변을 나누어 평가',
					description:
						'Ragas로 답변의 내용이 문서에 근거하고 있는지 평가했습니다. 긴 답변은 검증할 내용을 여러 묶음으로 나누어 처리하고, 항목별 ID를 대조해 평가 결과가 빠지거나 중복되지 않았는지 확인했습니다.',
				},
				{
					title: '질문 항목별로 답변하고 원문을 그대로 인용',
					description:
						'설명을 요청한 질문을 표 생성 요청으로 잘못 분류하던 조건을 고쳤습니다. 항목별 답변과 근거 번호를 받아 확인된 답변은 유지하고, 인용문은 해당 원문에서 직접 가져오도록 했습니다.',
				},
				{
					title: '반복 계산을 줄인 문서 분석',
					description:
						'표를 합칠 때 같은 텍스트의 토큰 수를 반복해서 계산하던 코드를 수정하고, 같은 요청 안에서 이미 분석한 페이지의 결과를 재사용했습니다.',
				},
				{
					title: '답변을 먼저 보여 주고 평가는 별도로 실행',
					description:
						'답변 저장 후 Ragas 평가를 비동기 작업으로 실행했습니다. 사용자의 새 질문을 처리하는 동안에는 다음 평가 요청을 잠시 미루도록 했습니다.',
				},
			],
			decision:
				'실제 모델을 호출하는 시험에서는 답변과 근거를 대조했습니다. 처리 속도를 비교할 때는 모델 응답을 고정해 애플리케이션 내부에서 생기는 지연을 따로 측정했습니다.',
			result:
				'입력 한도를 넘어서 중단되던 긴 답변의 평가를 완료할 수 있게 됐습니다. 반복 계산을 줄여 문서 분석 시간을 단축했고, 사용자가 품질 평가가 끝나기 전에도 답변을 확인할 수 있게 했습니다.',
			briefResult:
				'같은 모델 응답을 사용하는 시험에서 문서 분석 처리 시간의 중앙값이 2,969ms → 672ms로 줄었습니다(준비 실행 후 각 20회 측정). 실제 긴 답변의 25개 항목을 5개 묶음으로 평가했고, 평가가 끝나기 전에도 답변을 보여 주도록 했습니다.',
		},
		'delivery-output-flow': {
			summary:
				'조회·예약·Excel 등록·라벨 출력을 지원하는 물류 웹의 프론트엔드 전체를 개발했습니다. 서버 API와 PC 프린터를 연동하고, Android 앱에서도 같은 업무 화면으로 라벨을 출력하도록 연결했습니다.',
			overviewDetail:
				'물류 웹 프론트엔드와 Android 출력 앱을 개발했습니다. 초기 JavaScript 파일을 약 74% 줄이고, 실물 라벨을 확인하며 주소 잘림과 겹침을 수정했습니다.',
			problem:
				'첫 화면에서 사용하지 않는 페이지와 Excel 처리 코드까지 한 번에 내려받아 초기 JavaScript 파일이 커졌습니다. PC 라벨은 화면의 미리보기가 정상이어도 실제로 출력하면 긴 주소가 잘리거나 겹쳤습니다.',
			actions: [
				{
					title: '공통 업무 화면과 API 연동',
					description:
						'표·입력 폼·모달을 공통 컴포넌트로 만들고 조회·예약·Excel 미리보기·출력 요청을 서버 API에 연결했습니다. 웹에서 만든 출력 자료를 PC와 Android의 프린터 처리에 함께 사용하도록 구성했습니다.',
				},
				{
					title: '필요한 시점에 페이지와 Excel 코드 로딩',
					description:
						'번들 분석으로 첫 화면에서 쓰지 않는 코드를 확인했습니다. 페이지는 해당 화면에 들어갈 때, Excel 라이브러리는 업로드·다운로드를 실행할 때 불러오도록 변경했습니다.',
				},
				{
					title: '실물 라벨을 기준으로 긴 주소 보정',
					description:
						'실제 출력물에서 주소가 잘리거나 겹치는 위치를 확인했습니다. 글자 폭에 따라 줄을 나누고 전체 글자 크기와 줄 간격을 조정해 정해진 라벨 영역에 맞췄습니다.',
				},
			],
			result:
				'2026.05 빌드 산출물에서 초기 JavaScript 파일 크기를 2,405.50 kB에서 616.60 kB로 약 74% 줄였습니다. PC 라벨과 Android Bluetooth 라벨의 실물 출력물을 확인하며 화면과 장비 간 차이를 보정했습니다.',
			decision:
				'인증·API 초기화 코드도 따로 불러오면 초기 파일을 더 줄일 수 있었지만, 첫 요청의 초기화 순서와 로딩 처리가 복잡해졌습니다. 추가 절감 폭과 유지보수 비용을 비교해 페이지와 Excel 라이브러리까지만 지연 로딩을 적용했습니다.',
		},
		'structured-editor-ui': {
			summary:
				'개발 중이던 사이트에서 차트 종류별 설정 패널과 데이터 연결, 미리보기 기능을 구현했습니다.',
			problem:
				'차트마다 필요한 데이터와 옵션이 달랐고, 설정을 바꿀 때 차트를 불필요하게 다시 만들면서 화면이 깜빡이거나 스크롤이 흔들렸습니다.',
			actions: [
				{
					title: '차트에 맞는 설정과 데이터 연결',
					description:
						'차트 종류에 맞춰 설정 항목을 구성하고, 사용자가 데이터 필드를 끌어 놓으면 선택한 축과 값에 연결해 미리보기에 반영하도록 했습니다.',
				},
				{
					title: '바뀐 설정만 미리보기에 반영',
					description:
						'설정과 데이터가 바뀌는 경로를 따라가 불필요한 차트 재생성을 줄였습니다. 옵션을 조정하거나 패널을 전환하는 동안 미리보기와 스크롤 위치가 안정적으로 유지되도록 했습니다.',
				},
			],
			result:
				'데이터 연결과 설정 변경을 미리보기에서 확인하는 편집 흐름을 만들고, 불필요한 재생성에 따른 깜빡임과 스크롤 흔들림을 줄였습니다.',
		},
		'settlement-operations-platform': {
			summary:
				'차량·기사 정보부터 운송료·청구·정산까지 관리하는 ERP의 풀스택 개발을 맡았습니다. 여러 사람이 함께 수정하거나 Excel 자료를 일괄 등록해도 입력 내용과 확정된 정산 이력을 지키도록 구현했습니다.',
			overviewDetail:
				'ERP와 연계 모바일 앱을 풀스택으로 개발했습니다. 동시 수정 시 입력 보존, Excel 일괄 등록, 모바일 알림과 문서 다운로드를 구현했습니다.',
			problem:
				'같은 자료를 여러 사람이 수정하면 나중에 저장한 내용이 먼저 저장된 변경을 덮어쓸 수 있었습니다. Excel 등록 중 일부 행만 저장되거나 재시도로 같은 자료가 생기는 문제도 막아야 했습니다. 현재 정보가 바뀌더라도 이미 확정된 정산 금액은 유지해야 했습니다.',
			actions: [
				{
					title: '동시 수정 때 입력을 보존하는 편집표',
					description:
						'키보드로 셀과 선택창을 조작하는 공통 편집표를 만들었습니다. 저장할 때 서버의 최신 버전을 확인하고, 다른 사람이 먼저 수정했다면 입력을 남긴 채 처음 값·최신 값·내 입력을 비교하도록 했습니다. 사용자가 반영할 값을 선택한 뒤 다시 저장하도록 구성했습니다.',
				},
				{
					title: '수정·재검사 후 한 번에 저장하는 Excel 등록',
					description:
						'미리보기에서 오류가 있는 셀을 표시하고 바로 수정·재검사할 수 있도록 했습니다. 서버는 검증한 자료를 보관했다가 권한과 참조 정보를 다시 확인한 뒤 저장합니다. 중간에 실패하면 전체를 되돌리고, 같은 요청을 다시 받으면 기존 결과를 반환하도록 했습니다.',
				},
				{
					title: '현재 정보와 확정된 정산 이력 분리',
					description:
						'차량·기사의 현재 배정과 과거 거래 정보를 구분했습니다. 대출·보험 원본을 수정할 때는 작성 중이거나 반려된 청구에 변경을 반영하되, 승인·정산이 끝난 금액은 보존하도록 처리했습니다.',
				},
				{
					title: '관리자가 작업 내용을 따라갈 수 있는 로그',
					description:
						'기술 항목을 나열하던 로그를 작업 대상·변경 내용·입력 오류의 원인 중심으로 바꿨습니다. 저장 충돌이 발생한 경우에도 어떤 자료와 입력에서 문제가 생겼는지 확인하도록 했습니다.',
				},
			],
			result:
				'개발 환경에서 다른 요청이 먼저 저장한 뒤 편집표를 저장하는 상황을 재현했습니다. 최신 데이터와 내 입력이 모두 보존되고, 선택한 값만 다시 저장되는 것을 화면·API·DB·로그로 대조했습니다. Excel 등록에는 전체 취소와 중복 요청 처리를 적용하고, 관리자 로그에서 작업 내용과 오류 원인을 확인할 수 있게 했습니다.',
			briefResult:
				'개발 환경에서 동시 수정 충돌을 재현해 최신 데이터와 사용자 입력이 보존되고, 선택한 값만 다시 저장되는 것을 확인했습니다. Excel 등록의 전체 취소·중복 요청 처리와 관리자 작업 로그도 구현했습니다.',
		},
		'react-admin-state-migration': {
			summary:
				'계좌·종목·주문을 조회하고 관리하는 React 프론트엔드 전체를 구축했습니다. MSW 모의 API로 화면을 개발하면서 반복되는 테이블과 조회 상태 처리를 공통화했습니다.',
			overviewDetail:
				'MSW 모의 API를 사용해 주식 업무 웹의 React 프론트엔드 전체를 구축했습니다. 공통 테이블과 필터, 조회·편집 상태 관리를 구현했습니다.',
			problem:
				'목록·검색·상세·편집 화면에 비슷한 UI와 상태 처리가 반복됐습니다. 필터를 고르는 도중 조회가 실행되거나, 추가 조회가 겹쳐 목록이 잘못 갱신되지 않도록 해야 했습니다.',
			actions: [
				{
					title: '여러 업무 화면에서 재사용하는 테이블',
					description:
						'계좌·종목·주문 화면의 테이블·필터·모달을 공통화했습니다. 열 고정·너비 조절·재정렬을 지원하고, 같은 구성으로 조회와 등록·수정 화면을 만들었습니다.',
				},
				{
					title: '선택 중인 필터와 실제 조회 조건 분리',
					description:
						'주문내역에서는 필터를 바꾸는 동안 입력 상태만 유지하고 조회 버튼을 눌렀을 때 TanStack Query에 조건을 적용했습니다. 같은 조건으로 다시 조회하면 첫 페이지부터 시작하고, 더보기 요청이 중복 실행되지 않도록 했습니다.',
				},
			],
			result:
				'MSW 모의 API로 계좌·종목·주문의 조회와 편집 화면을 구성했습니다. 공통 테이블을 여러 화면에서 재사용하고, 필터 선택·조회 실행·추가 조회를 구분해 사용자의 조작에 맞춰 목록이 갱신되도록 했습니다.',
		},
		'mobile-output-bridge': {
			summary:
				'물류 웹의 라벨 출력 요청을 Android 앱의 네이티브 모듈과 Bluetooth 프린터에 연결했습니다. 사용자가 장비를 선택하고 연결 상태를 확인한 뒤 출력할 수 있도록 구현했습니다.',
			problem:
				'프린터가 목록에 표시되고 선택도 되지만 연결 단계에서 실패했습니다. 웹 요청만 확인해서는 원인을 찾을 수 없어 앱 권한과 프린터 SDK의 실제 호출을 함께 추적해야 했습니다.',
			actions: [
				{
					title: '웹 요청을 프린터 데이터로 변환',
					description:
						'WebView에서 받은 출력 자료를 네이티브 브리지로 전달하고 프린터용 데이터로 변환했습니다. 출력할 항목과 연결할 장비를 앱에서 확인하도록 구성했습니다.',
				},
				{
					title: 'SDK 내부 호출을 추적해 권한 오류 해결',
					description:
						'실기기 로그에서 SDK가 연결 직전에 장비 탐색을 취소하는 API를 호출한다는 점을 확인했습니다. 이 호출에 필요한 탐색 권한을 연결 권한과 함께 요청하도록 수정한 뒤 실제 라벨 출력을 확인했습니다.',
				},
				{
					title: '요청 접수와 인쇄 완료를 구분하는 안내',
					description:
						'SDK가 명령을 받았다는 응답을 실제 종이 출력 완료로 표시하지 않도록 안내를 정리했습니다. 앱에는 출력 요청을 전송한 상태를 보여 주도록 했습니다.',
				},
			],
			result:
				'Android 16 실기기에서 Bluetooth 권한 요청, 프린터 연결과 실제 라벨 출력을 확인했습니다. 연결 실패를 웹 요청·앱 권한·SDK 호출 단계로 나누어 진단할 수 있도록 했습니다.',
		},
		'erp-mobile-workflow': {
			summary:
				'ERP와 연결되는 모바일 업무 앱에서 채팅 시스템을 제외한 대부분의 개발을 맡았습니다. React 업무 화면과 Spring Boot API를 구현하고, Flutter 앱의 알림·파일 다운로드와 연결했습니다.',
			problem:
				'알림이 수정·삭제되는 순서와 실제 도착 순서가 달라지면 오래된 내용이 다시 표시될 수 있었습니다. 읽음 상태를 동시에 저장할 때는 DB 교착이 발생했고, 웹의 임시 파일 주소를 앱에 그대로 넘겨서는 문서를 내려받을 수 없었습니다.',
			actions: [
				{
					title: '늦게 도착한 알림이 최신 상태를 바꾸지 않도록 처리',
					description:
						'알림 버전과 삭제 상태를 함께 저장해 늦게 도착한 이전 알림을 무시했습니다. 알림 내용이 수정돼도 읽음 상태는 유지하고, 사용자가 열어 둔 상세 화면에도 변경을 반영했습니다.',
				},
				{
					title: '읽음 상태 저장의 동시 실행 오류 해결',
					description:
						'조회·읽음 상태를 먼저 수정한 뒤 없으면 추가하던 두 단계 처리를 단일 UPSERT로 바꿨습니다. 최초 확인 시각은 유지하면서, 격리된 MariaDB에서 기존 교착을 재현하고 수정 후 동시 요청이 완료되는지 확인했습니다.',
				},
				{
					title: '앱에서 사용할 수 있는 문서 다운로드 주소 발급',
					description:
						'브라우저 메모리 안에서만 유효한 파일 주소 대신, 사용자가 다운로드를 누르면 짧은 유효기간의 서명 주소를 발급하도록 했습니다. 파일 요청 시에도 서명·만료·현재 접근 권한을 다시 확인하고, 로그인 토큰을 앱의 다운로드 기능에 넘기지 않도록 했습니다.',
				},
				{
					title: '문의 처리 결과와 앱 알림 연결',
					description:
						'모바일에서 보낸 문의를 ERP에서 처리하고 앱에서 이력을 확인하도록 연결했습니다. 이미 처리됐거나 다른 요청이 먼저 수정한 경우에는 이유를 표시하고 입력을 보존했습니다. Flutter 앱에는 FCM 알림 수신과 상세 화면 이동을 연결했습니다.',
				},
			],
			result:
				'수정·삭제된 알림이 이전 상태로 돌아가지 않도록 하고, 동시 읽음 저장에서 발생한 교착을 해결했습니다. 브라우저에서 내려받은 PDF를 원본 파일과 대조했으며, Android 에뮬레이터에서 알림을 수신하고 관련 목록과 본문을 여는 동작을 확인했습니다.',
		},
	},
	en: {
		'ai-document-analysis': {
			summary:
				'Owned full-stack development of a Gemma 4 platform for document search and question answering. Improved retrieval of surrounding context, answer validation and Ragas evaluation.',
			overviewDetail:
				'Built document search and answer evaluation. Removing repeated calculations reduced median document-analysis processing from 2,969ms → 672ms in a test with fixed model responses.',
			problem:
				'Matched passages lacked conditions and exceptions from nearby paragraphs. Questions with several parts sometimes returned only source text. Long-answer evaluation exceeded the model input limit, while repeated token counting slowed document analysis.',
			actions: [
				{
					title: 'Retrieve the surrounding context',
					description:
						'Included nearby paragraphs and referenced tables with each search result. Supplied original text and sources during final answer generation to retain relevant conditions and exceptions.',
				},
				{
					title: 'Evaluate long answers in batches',
					description:
						'Used Ragas to check whether the answer was supported by the document. Split long answers into batches that fit the model input limit and checked item IDs for missing or duplicate evaluation results.',
				},
				{
					title: 'Answer each part and preserve source quotations',
					description:
						'Fixed explanation requests being misclassified as table requests. Collected item-level answers and evidence IDs, retained supported answers and copied quotations directly from the source.',
				},
				{
					title: 'Remove repeated calculations',
					description:
						'Removed repeated token counting during table merging and reused the results of pages already analyzed within the same request.',
				},
				{
					title: 'Show the answer before evaluation finishes',
					description:
						'Ran Ragas evaluation asynchronously after saving the answer. Deferred the next evaluation request while a new user question was being processed.',
				},
			],
			decision:
				'Used live-model tests to compare answers with their evidence. Used fixed model responses in performance tests to measure delays inside the application separately.',
			result:
				'Completed long-answer evaluations that had previously exceeded the input limit. Reduced document-analysis time by removing repeated calculations, and let users read answers before quality evaluation finished.',
			briefResult:
				'Median document-analysis processing fell from 2,969ms → 672ms with fixed model responses and 20 runs per condition after warm-up. Evaluated 25 items from a live long answer in 5 batches and displayed the answer before evaluation finished.',
		},
		'delivery-output-flow': {
			summary:
				'Built the complete frontend for a logistics web app covering search, reservations, Excel imports and label printing. Integrated server APIs and PC printers, and connected the same business screens to label printing in an Android app.',
			overviewDetail:
				'Built the logistics frontend and Android printing app. Reduced the initial JavaScript file by about 74% and corrected clipped or overlapping addresses using physical labels.',
			problem:
				'The initial JavaScript file included pages and Excel code that were not needed on entry. Long addresses could also be clipped or overlap on physical labels even when the screen preview looked correct.',
			actions: [
				{
					title: 'Shared business screens and API integration',
					description:
						'Built shared tables, forms and modals and connected search, reservations, Excel previews and print requests to server APIs. Used a common print-data structure for PC and Android printer handling.',
				},
				{
					title: 'Load pages and Excel code when needed',
					description:
						'Analyzed the bundle to identify code that was unnecessary on entry. Loaded pages when users entered them and Excel libraries when they started an upload or download.',
				},
				{
					title: 'Fit long addresses using physical print feedback',
					description:
						'Checked physical labels for clipped or overlapping addresses. Adjusted line wrapping by text width, overall font size and line spacing to fit the available label area.',
				},
			],
			result:
				'Reduced the initial JavaScript file from 2,405.50 kB to 616.60 kB, about 74%, in May 2026 build outputs. Used physical PC and Android Bluetooth labels to correct differences between screen previews and printed output.',
			decision:
				'Splitting authentication and API initialization reduced the initial file further, but complicated initialization order and loading on the first request. Weighed the extra reduction against maintenance cost and limited lazy loading to pages and Excel libraries.',
		},
		'structured-editor-ui': {
			summary:
				'Built chart-specific settings, data-field connections, and previews synchronized with the editor.',
			problem:
				'Each chart needed different fields and options. Unnecessary chart recreation during edits caused flicker and scroll movement.',
			actions: [
				{
					title: 'Chart-specific editing',
					description:
						'Adapted fields and settings to each chart type and connected drag-and-drop data assignments to preview state.',
				},
				{
					title: 'Targeted preview updates',
					description:
						'Traced settings and data changes to reduce unnecessary chart recreation while retaining the editing flow through panel and option changes.',
				},
			],
			result:
				'Connected data assignments and settings to the preview and reduced flicker and scroll movement caused by unnecessary recreation.',
		},
		'settlement-operations-platform': {
			summary:
				'Owned full-stack development of an ERP covering vehicles, drivers, transport fees, billing and settlement. Built editing and Excel-import workflows that preserve user input and finalized settlement records.',
			overviewDetail:
				'Built the ERP and connected mobile workflows across the stack, including concurrent-edit recovery, batch Excel imports, notifications and document downloads.',
			problem:
				"Concurrent edits could overwrite someone else's saved changes. Excel imports also needed to avoid partial writes and duplicate records after retries, while updates to current records had to preserve finalized settlement amounts.",
			actions: [
				{
					title: 'Retain input when concurrent edits conflict',
					description:
						'Built shared tables with keyboard cell and dialog controls. Checked the latest server version before saving. On a conflict, retained the draft and compared the original, latest and entered values, letting the user choose values before explicitly saving again.',
				},
				{
					title: 'Correct, revalidate and save Excel imports together',
					description:
						'Highlighted invalid cells for correction and revalidation. The server retained the validated data, then rechecked permissions and referenced records before saving. Failed batches rolled back together, and repeated requests returned their existing result.',
				},
				{
					title: 'Separate current records from finalized settlements',
					description:
						'Separated current vehicle and driver assignments from historical transactions. Changes to loan and insurance records updated draft or rejected charges while preserving amounts that had already been approved or settled.',
				},
				{
					title: 'Make work logs understandable to administrators',
					description:
						'Reorganized technical logs around affected records, changes and input-error reasons. Included the record and attempted input when a save conflicted with another update.',
				},
			],
			result:
				'Reproduced concurrent saves in the development environment and compared the interface, API, database and logs. Verified that the latest data and draft were retained and only selected values were saved again. Added batch rollback and repeat-request handling to Excel imports, with work and error details available in administrator logs.',
			briefResult:
				'Reproduced concurrent-edit conflicts in the development environment and verified draft retention, preservation of current data and an explicit save of selected values. Added Excel batch rollback, repeat-request handling and administrator work logs.',
		},
		'react-admin-state-migration': {
			summary:
				'Built the complete React frontend for account, stock and order administration using MSW mock APIs. Shared table components and query-state handling across recurring screens.',
			overviewDetail:
				'Built the complete React frontend against MSW mock APIs, including shared tables, filters and query and editing state.',
			problem:
				'List, search, detail and editing screens repeated similar UI and state handling. Filter selection needed to stay separate from search execution, and overlapping load-more requests had to be prevented.',
			actions: [
				{
					title: 'Reuse tables across business screens',
					description:
						'Shared tables, filters and modals across account, stock and order screens. Supported column pinning, resizing and reordering and used the same components for query and editing screens.',
				},
				{
					title: 'Separate draft filters from submitted queries',
					description:
						'In order history, kept filter changes local until the user submitted a search to TanStack Query. Restarted repeated searches from the first page and prevented overlapping load-more requests.',
				},
			],
			result:
				'Built account, stock and order query and editing screens against MSW mock APIs. Reused tables across screens and separated filter selection, search submission and additional loading so lists updated in response to the intended action.',
		},
		'mobile-output-bridge': {
			summary:
				'Connected web label-print requests to native modules and Bluetooth printers in an Android app. Built device selection, connection checks and the print-request flow.',
			problem:
				'The printer appeared in the list and could be selected, but connection failed. Finding the cause required tracing app permissions and actual printer SDK calls alongside the web request.',
			actions: [
				{
					title: 'Convert web requests into printer data',
					description:
						'Passed WebView print requests through a native bridge and converted them into printer data. Let users inspect the items and select the target device in the app.',
				},
				{
					title: 'Trace SDK calls to resolve a permission failure',
					description:
						'Device logs showed that the SDK cancelled Bluetooth discovery immediately before connecting. Requested the discovery permission required by that call alongside the connection permission, then verified physical label output.',
				},
				{
					title: 'Distinguish request acceptance from physical printing',
					description:
						'Changed completion messages so an SDK acknowledgement did not imply that a label had finished printing. Showed that the print request had been sent.',
				},
			],
			result:
				'Verified permission requests, Bluetooth connection and physical label output on an Android 16 device. Made it possible to trace connection failures across web requests, app permissions and SDK calls.',
		},
		'erp-mobile-workflow': {
			summary:
				'Owned most development of the ERP-connected mobile work app, excluding the chat system. Built React business screens and Spring Boot APIs and connected them to notifications and file downloads in the Flutter app.',
			problem:
				'Notifications could arrive out of order and restore outdated content after an edit or deletion. Concurrent receipt writes caused a database deadlock, and browser-only file URLs could not be passed directly to the app for downloads.',
			actions: [
				{
					title: 'Keep delayed notifications from replacing current state',
					description:
						'Stored notification versions and deletion state to ignore older events arriving late. Preserved read status when content changed and refreshed details that the user already had open.',
				},
				{
					title: 'Fix concurrent receipt writes',
					description:
						'Replaced an update-then-insert sequence with a single UPSERT while preserving the first seen and read timestamps. Reproduced the original deadlock in an isolated MariaDB database and verified concurrent requests after the change.',
				},
				{
					title: 'Issue document URLs the app can download',
					description:
						'Replaced browser-memory file URLs with short-lived signed URLs issued when the user requests a download. Rechecked the signature, expiry and current access rights when serving the file, without passing login tokens to the native download feature.',
				},
				{
					title: 'Connect inquiry handling and app notifications',
					description:
						"Linked mobile inquiries to ERP processing and history shown in the app. Explained completed or conflicting updates while retaining the user's input. Connected FCM notifications and navigation to the relevant detail screen in Flutter.",
				},
			],
			result:
				'Prevented older notifications from reversing edits or deletions and resolved deadlocks in concurrent receipt writes. Compared a browser-downloaded PDF with its source and verified receiving a notification and opening the related list and content on an Android emulator.',
		},
	},
};
export const supportingDocumentCopy: Record<Locale, Record<string, string>> = {
	ko: {
		'field-terminal-android':
			'기존 PDA 앱에 입고 조회 조건과 수량 입력 화면을 추가하고 QR·바코드 스캔을 연결했습니다. 업무 모드별 코드 검사·중복 허용·수량 계산을 분리하고, 실기기 입력과 로그로 외부 검증 실패와 앱 내부 오류를 구분했습니다.',
		'legacy-mobile-compatibility':
			'기존 Android 앱을 다시 빌드할 수 있도록 개발 도구의 호환 버전을 맞췄습니다. OS에 따라 달라지는 권한·파일 접근·뒤로가기 처리를 수정하고, 구형 OS 기기에서 동작을 확인했습니다.',
		'hybrid-life-info-platform':
			'공공 API를 연동해 날씨·대기질·특보 기능을 추가했습니다. 지역과 정보 종류별로 서버 응답을 캐시하고, 현재 날씨와 핵심 예보부터 표시했습니다. 재조회에 실패하면 이전 정보와 확인할 수 없는 정보를 구분했습니다.',
		'structured-editor-ui':
			'개발 중이던 사이트에 차트 설정·데이터 연결·미리보기 기능을 구현했습니다. 차트별 데이터 항목을 연결하고, 불필요한 차트 재생성을 줄여 깜빡임과 스크롤 흔들림을 완화했습니다.',
		'mobile-operations-platform':
			'지도 마커 선택과 처리 후 지도 복귀를 수정했습니다. 통신이 끊겨도 배달완료 요청과 사진을 앱에 보관하고, 재실행 후 요청을 복원하도록 했습니다. 재전송 전에는 서버의 완료 내역과 대조하도록 구현했습니다.',
		'legacy-support-web':
			'Excel 업로드 실패를 모두 시간 초과로 안내하던 화면을 수정했습니다. 파일 분석·입력 검증·통신 오류를 구분하고, 실패한 단계와 경과 시간을 표시하도록 구현해 로컬에서 확인했습니다.',
		'multi-role-hybrid-platform':
			'기존 웹과 Android 앱에 회원 검색·수정·중복 통합과 문의·첨부 기능을 추가했습니다. 서버에서 회원 역할과 작성자를 확인해 접근을 제한하고, 앱의 파일 선택과 이미지 미리보기를 연결했습니다.',
		'ai-kickoff-documentation-tool':
			'요구사항을 검토하고 표를 편집하는 화면을 개발했습니다. 선택한 시트와 셀에 AI 수정을 적용하고, 작업 실행·결과 저장·문서 내보내기를 처리하는 서버 API를 구현했습니다.',
	},
	en: {
		'field-terminal-android':
			'Added receiving filters, quantity entry and QR/barcode scanning to an existing PDA app. Separated validation, duplicate handling and quantity rules by work mode, and used device input and logs to distinguish external validation failures from app errors.',
		'legacy-mobile-compatibility':
			'Aligned compatible development-tool versions to restore builds of a legacy Android app. Updated OS-specific permissions, file access and back navigation and checked behavior on devices running older OS versions.',
		'hybrid-life-info-platform':
			'Added weather, air quality and alerts through public APIs. Cached server responses by region and information type and displayed current weather and core forecasts first. Distinguished previous data from unavailable information after failed refreshes.',
		'structured-editor-ui':
			'Built chart settings, data connections and previews for a website under development. Connected chart-specific data fields and reduced unnecessary recreation to limit flicker and scroll movement.',
		'mobile-operations-platform':
			'Updated map-marker selection and return-to-map behavior. Retained delivery-completion requests and photos offline, restored requests after app restarts and compared them with completed server records before retrying.',
		'legacy-support-web':
			'Updated an Excel-upload screen that labelled every failure as a timeout. Distinguished parsing, validation and communication errors, displayed the failed stage and elapsed time, and verified the changes locally.',
		'multi-role-hybrid-platform':
			'Added member search, editing, duplicate merging, inquiries and attachments to existing web and Android apps. Checked member roles and authorship on the server and connected file selection and image previews in the app.',
		'ai-kickoff-documentation-tool':
			'Built requirement-review and table-editing screens with AI revisions scoped to selected sheets and cells. Implemented server APIs for running tasks, saving results and exporting documents.',
	},
};
