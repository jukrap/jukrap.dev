import type { Locale } from '@/types/locale';
interface CaseCopy {
	summary: string;
	overviewDetail?: string;
	problem: string;
	actions: { title: string; description: string }[];
	result: string;
	decision?: string;
}
export const workDocumentCopy: Record<Locale, Record<string, CaseCopy>> = {
	ko: {
		'delivery-output-flow': {
			summary:
				'조회·예약·Excel 등록·라벨 출력으로 이어지는 물류 업무 웹. React·TypeScript 화면 개발과 API 연동 담당.',
			overviewDetail:
				'페이지·Excel 코드 지연 로딩으로 초기 JavaScript 엔트리 파일 크기 약 74% 감소(빌드 산출물 기준).',
			problem:
				'여러 업무 화면과 Excel 처리 코드가 초기 번들에 함께 포함돼, 첫 화면에서 쓰지 않는 코드까지 내려받고 있었습니다.',
			actions: [
				{
					title: '업무 화면 공통화',
					description:
						'표·입력 폼·모달을 공통 컴포넌트로 구성하고 조회·예약·Excel 미리보기·출력 요청을 서버 API에 연결',
				},
				{
					title: '페이지·Excel 코드 지연 로딩',
					description:
						'번들 분석으로 첫 화면에 불필요한 코드를 확인하고, 페이지와 Excel 라이브러리를 사용하는 시점에 로딩',
				},
				{
					title: '긴 주소의 라벨 출력',
					description:
						'PC 라벨의 글자 폭에 따라 주소를 줄바꿈하고, 마지막 줄에 남은 주소를 출력 폭에 맞춰 배치',
				},
			],
			result:
				'초기 JavaScript 엔트리 파일 2,405.50 kB → 616.59 kB, 약 74% 감소. 동일 빌드 기준의 산출물 크기이며 로딩 시간 측정치는 아닙니다.',
			decision:
				'인증과 API 초기화 코드도 나눠 봤지만, 첫 조작 때 추가로 코드를 불러와야 해 적용하지 않았습니다. 페이지와 Excel 코드만 필요한 시점에 불러오도록 했습니다.',
		},
		'structured-editor-ui': {
			summary: '개발 중이던 사이트의 차트 설정·데이터 연결·미리보기 기능 개발.',
			problem:
				'차트 종류마다 필요한 데이터와 옵션이 달랐고, 설정 변경 때 미리보기가 불필요하게 다시 만들어져 화면이 깜빡이거나 스크롤이 흔들렸습니다.',
			actions: [
				{
					title: '차트 설정과 데이터 연결',
					description:
						'차트별 필드·옵션 패널 구성과 드래그로 연결한 데이터의 미리보기 반영',
				},
				{
					title: '미리보기 갱신',
					description:
						'설정·데이터 변경 시 불필요한 차트 재생성을 줄여 깜빡임과 스크롤 흔들림 완화',
				},
			],
			result:
				'데이터 연결과 설정 변경을 미리보기에서 확인하는 편집 흐름을 만들고, 불필요한 재생성에 따른 깜빡임과 스크롤 흔들림을 줄였습니다.',
		},
		'settlement-operations-platform': {
			summary:
				'차량·기사 등 기준 정보와 운송료·청구·정산을 관리하는 업무 시스템. 관리자 웹 전반과 주요 API·DB 처리 개발.',
			overviewDetail:
				'관리자 웹·주요 API 개발. 공통 편집표와 Excel 등록, 정산 이력·작업 로그 구현.',
			problem:
				'여러 행을 편집하거나 Excel 자료를 등록할 때 입력 내용이 사라지거나 같은 자료가 중복 저장되는 일을 막아야 했습니다. 담당 관계가 바뀌어도 이미 확정한 정산 금액은 유지해야 했습니다.',
			actions: [
				{
					title: '공통 편집표',
					description:
						'키보드 셀 이동·선택창 조작, 행별 저장 결과와 오류 표시. 저장에 실패한 행의 편집 내용 보존',
				},
				{
					title: 'Excel 등록과 재시도',
					description:
						'Excel 등록의 오류 행·셀 표시와 수정·재검사 구현. 일괄 저장 오류 시 전체 롤백, 동일 요청 재수신 시 기존 결과 반환',
				},
				{
					title: '관리자 작업 로그',
					description:
						'작업 대상·변경 내용·입력 오류의 원인을 관리자 화면에 표시하고 불필요한 기술 항목 축소',
				},
			],
			result:
				'정산 저장 기능은 개발 환경에 반영. 작업 내용 중심으로 개편한 로그 화면은 관리자 사용 중.',
		},
		'react-admin-state-migration': {
			summary:
				'주식 업무의 조회·등록·수정 화면을 다루는 관리 웹. MSW 모의 API를 사용해 React 프론트엔드 전체 구축.',
			overviewDetail:
				'계좌·종목·주문 화면 구축. 열 고정·너비 조절·재정렬과 조회 조건·화면 상태 분리.',
			problem:
				'목록, 검색, 상세, 등록·수정 화면에 비슷한 UI와 상태 처리가 반복돼, 이를 함께 쓸 수 있는 구조가 필요했습니다.',
			actions: [
				{
					title: '테이블·필터·모달',
					description:
						'목록·검색·상세·등록·수정 화면의 공통 컴포넌트 개발. 컬럼 고정·너비 조절·재정렬 기능 구현',
				},
				{
					title: '데이터와 조작 상태',
					description:
						'주문내역의 선택 중인 필터와 조회에 적용한 조건을 분리. 같은 조건의 재조회는 첫 페이지부터 시작하고 더보기 요청의 중복 실행 방지',
				},
			],
			result:
				'실제 백엔드 연동 범위가 아닌, MSW 모의 API를 바탕으로 구축한 프론트엔드입니다.',
		},
		'mobile-output-bridge': {
			summary:
				'물류 운영 웹의 라벨 출력 요청을 처리하는 Android 앱. 네이티브 브리지와 Bluetooth 프린터 연동 담당.',
			problem:
				'웹에서 만든 출력 자료를 Android 장비 SDK에 전달해야 했습니다. 권한 요청과 장비 연결, 취소 동작도 화면에서 이어져야 했습니다.',
			actions: [
				{
					title: '장비 선택과 출력',
					description:
						'웹 출력 데이터를 네이티브 브리지로 전달하고 장비 선택·연결·라벨 출력까지 연동',
				},
				{
					title: '권한과 취소 처리',
					description:
						'Android 16/API 36의 SDK 장비 탐색 호출을 추적해 취소 동작과 BLUETOOTH_SCAN, BLUETOOTH_CONNECT 권한 처리 보완',
				},
			],
			result: 'Android 실기기에서 Bluetooth 장비 연결과 실제 라벨 출력 확인.',
		},
	},
	en: {
		'delivery-output-flow': {
			summary:
				'Built React and TypeScript interfaces spanning search, reservations, Excel imports, and label-print requests.',
			overviewDetail:
				'Loaded pages and Excel code on demand, reducing the initial JavaScript entry from 2,405.50 kB to 616.59 kB, about 74%.',
			problem:
				'The initial bundle included multiple pages and heavy Excel code that users did not need on their first screen.',
			actions: [
				{
					title: 'Shared interfaces and API integration',
					description:
						'Built shared tables, forms, and modals, connecting server APIs to workflows from search and reservations through Excel previews and print requests.',
				},
				{
					title: 'Code splitting informed by bundle analysis',
					description:
						'Identified code that was unnecessary on entry and loaded pages and Excel libraries only when needed.',
				},
				{
					title: 'Long addresses on printed labels',
					description:
						'Wrapped PC label addresses by measured text width and fitted the remaining address into the final line.',
				},
			],
			result:
				'Initial JavaScript entry file: 2,405.50 kB → 616.59 kB, about 74% smaller. Comparison of build outputs, not measured loading time.',
			decision:
				'Tried splitting shared authentication and API initialization but did not adopt it because it added loading on the first interaction. Kept on-demand loading for pages and Excel code.',
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
				'A business system for vehicle and driver records, transport fees, billing, and settlement. Built the administrator web interface and key API and database operations.',
			overviewDetail:
				'Built administrator interfaces and key APIs, shared editing tables, Excel imports, settlement history, and work logs.',
			problem:
				'Multi-row edits and Excel imports needed to avoid lost input and duplicate writes. Changes to assignments also had to preserve finalized settlement amounts.',
			actions: [
				{
					title: 'Editing tables that retain input',
					description:
						'Built keyboard cell navigation, selection dialogs, and per-row save feedback, retaining edits in rows that fail to save.',
				},
				{
					title: 'From Excel preview to persistence',
					description:
						'Highlighted invalid Excel rows and cells for correction and revalidation. Rolled back failed batch imports and returned existing results for repeated requests.',
				},
				{
					title: 'Administrator work logs',
					description:
						'Showed affected records, changes, and input-error reasons in the administrator interface while removing unnecessary technical fields.',
				},
			],
			result:
				'Delivered settlement persistence to the development environment. Administrators use the revised action-oriented log screen.',
		},
		'react-admin-state-migration': {
			summary:
				'Built the complete React frontend for a stock administration web app using MSW mock APIs.',
			overviewDetail:
				'Created shared tables, filters and modals, with column pinning, resizing and reordering, and state handling for data queries and editing.',
			problem:
				'List, search, detail, and editing screens needed consistent components and clearer ownership of state.',
			actions: [
				{
					title: 'Reusable tables, filters, and modals',
					description:
						'Built list, search, detail, and create/edit screens with shared components, including column pinning, resizing, and reordering.',
				},
				{
					title: 'Separate query data and UI state',
					description:
						'Separated draft filters from submitted conditions in order history. Restarted same-filter searches from the first page and guarded against overlapping load-more requests.',
				},
			],
			result:
				'Built query and edit screens against MSW mock APIs, reusing shared components and separating query data from interaction state.',
		},
		'mobile-output-bridge': {
			summary:
				'Connected web label-print requests to an Android app and Bluetooth printers.',
			problem:
				'Web print data needed to reach a native device SDK while the interface handled permissions, connection, and cancellation.',
			actions: [
				{
					title: 'From web requests to hardware',
					description:
						'Passed print data through a native bridge and implemented device selection, connection, and print calls as a single flow.',
				},
				{
					title: 'Permissions and cancellation',
					description:
						'Traced SDK discovery calls on Android 16/API 36 and corrected cancellation and BLUETOOTH_SCAN, BLUETOOTH_CONNECT permission handling.',
				},
			],
			result:
				'Verified Bluetooth connection and physical label output on an Android device.',
		},
	},
};
export const supportingDocumentCopy: Record<Locale, Record<string, string>> = {
	ko: {
		'field-terminal-android':
			'기존 PDA 앱의 Android 버전 대응과 입고 화면 개발. 수량 입력·QR·바코드 스캔 연동, 앱 업데이트의 다운로드·설치 처리 정비.',
		'legacy-mobile-compatibility':
			'WebView 기반 Android 앱의 빌드 환경 업데이트. OS별 권한·파일 접근·뒤로가기 처리 수정과 여러 구형 OS 실기기 확인.',
		'hybrid-life-info-platform':
			'공공 API 기반 날씨·대기질·특보 기능 확장. 핵심 정보 우선 표시와 지역·정보별 캐시 구현. 재조회 실패 시 이전 정보와 확인 불가 상태를 구분.',
		'structured-editor-ui':
			'개발 중이던 사이트의 차트 설정 패널·데이터 연결·미리보기 기능 개발.',
		'mobile-operations-platform':
			'지도·오프라인 저장·재전송 기능 유지보수. 앱 재실행 시 전송 대기 요청 복원.',
		'legacy-support-web':
			'Excel 업로드의 파일 분석·입력값 검사·통신 오류를 구분하는 안내 구현과 로컬 확인.',
		'multi-role-hybrid-platform':
			'회원 검색·수정·통합과 문의·첨부 기능 확장. Android의 파일 선택·이미지 미리보기 연동.',
		'ai-kickoff-documentation-tool':
			'저장소·업로드 자료의 요구사항 검토와 문서 작성을 단계별 화면으로 연결. 표 편집과 선택 시트·셀의 문맥을 전달하는 AI 수정 기능 개발.',
	},
	en: {
		'field-terminal-android':
			'Updated an existing PDA app for newer Android versions and added receiving screens, quantity entry, and QR/barcode scanning. Revised the app update download and installation flow.',
		'legacy-mobile-compatibility':
			'Updated the build environment of a legacy Android app with a WebView interface, adapting permissions, file access, and back navigation to OS changes. Verified behavior on devices running several older Android versions.',
		'hybrid-life-info-platform':
			'Extended weather, air quality, and alerts using public-data APIs. Built core-first loading and caches by region and information type, distinguishing previous data from unavailable current results after failed refreshes.',
		'structured-editor-ui':
			'Built chart settings panels, data connections, and previews as part of a website that was under development.',
		'mobile-operations-platform':
			'Maintained maps and offline save/retry flows, restoring queued requests after app restarts.',
		'legacy-support-web':
			'Implemented distinct messages for parsing, input, and network errors in Excel imports and checked them locally.',
		'multi-role-hybrid-platform':
			'Extended an existing solution with member search, editing, merging, inquiries, and attachments. Integrated file selection and image previews in the Android app.',
		'ai-kickoff-documentation-tool':
			'Connected requirement review and document drafting from repository or uploaded material through staged screens, with table editing and targeted AI revision requests.',
	},
};
