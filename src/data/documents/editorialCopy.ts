import type { Locale } from '@/types/locale';

export const documentProfile = {
	ko: '웹과 모바일 서비스를 개발하는 박주철입니다. React와 TypeScript로 화면을 만들고, API 개발과 모바일 연동도 맡아 왔습니다.',
	en: 'I’m Ju-cheol Park, a web and mobile developer. I build interfaces with React and TypeScript and have also worked on APIs and mobile integrations.',
};

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
				'조회·예약·Excel 등록과 라벨 출력으로 이어지는 업무 화면을 React와 TypeScript로 개발했습니다.',
			overviewDetail:
				'페이지와 Excel 처리 코드를 필요할 때 불러오도록 분리해 초기 JavaScript 엔트리를 2,405.50 kB에서 616.59 kB로 약 74% 줄였습니다.',
			problem:
				'여러 업무 화면과 Excel 처리 코드가 초기 번들에 함께 포함돼, 첫 화면에서 쓰지 않는 코드까지 내려받고 있었습니다.',
			actions: [
				{
					title: '공통 화면과 API 연결',
					description:
						'여러 화면에서 쓰는 표, 입력 폼, 모달을 공통 컴포넌트로 만들었습니다. 조회와 예약부터 Excel 미리보기와 출력 요청까지 서버 API에 연결했습니다.',
				},
				{
					title: '초기 로딩 코드 분리',
					description:
						'번들 분석으로 초기 진입에 불필요한 코드를 찾고, 페이지와 Excel 라이브러리를 필요한 시점에 불러오도록 분리했습니다.',
				},
			],
			result:
				'초기 JavaScript 엔트리를 2,405.50 kB에서 616.59 kB로 약 74% 줄였습니다. 동일 빌드 기준의 산출물 크기를 비교한 결과입니다.',
			decision:
				'인증과 API 초기화 코드도 나눠 봤지만, 첫 조작 때 추가로 코드를 불러와야 해 적용하지 않았습니다. 페이지와 Excel 코드만 필요한 시점에 불러오도록 했습니다.',
		},
		'structured-editor-ui': {
			summary:
				'차트별 설정 패널과 데이터 필드 연결, 편집 상태가 반영되는 미리보기를 개발했습니다.',
			problem:
				'차트 종류마다 필요한 데이터와 옵션이 달랐고, 설정 변경 때 미리보기가 불필요하게 다시 만들어져 화면이 깜빡이거나 스크롤이 흔들렸습니다.',
			actions: [
				{
					title: '차트별 편집 흐름',
					description:
						'차트 종류에 맞춰 데이터 필드와 설정 항목을 구성하고 드래그로 연결한 데이터가 미리보기에 반영되도록 상태를 연결했습니다.',
				},
				{
					title: '미리보기 갱신 범위 조정',
					description:
						'설정과 데이터의 변경 경로를 살펴 불필요한 차트 재생성을 줄이고, 패널 접기·옵션 변경 중 편집 흐름을 유지했습니다.',
				},
			],
			result:
				'데이터 연결과 설정 변경을 미리보기에서 확인하는 편집 흐름을 만들고, 불필요한 재생성에 따른 깜빡임과 스크롤 흔들림을 줄였습니다.',
		},
		'settlement-operations-platform': {
			summary:
				'React 화면부터 Spring Boot API와 DB 처리까지 정산 ERP 전반의 구축을 맡았습니다.',
			overviewDetail:
				'저장에 실패해도 입력 내용을 유지하는 공통 편집표와 중복 등록을 막는 Excel 등록 기능을 구현했습니다.',
			problem:
				'여러 행을 편집하거나 Excel 자료를 등록할 때 입력 내용이 사라지거나 같은 자료가 중복 저장되는 일을 막아야 했습니다. 담당 관계가 바뀌어도 이미 확정한 정산 금액은 유지해야 했습니다.',
			actions: [
				{
					title: '입력을 보존하는 편집표',
					description:
						'키보드로 셀을 이동하고 선택창을 열 수 있는 공통 편집표를 만들었습니다. 저장에 실패해도 작성 중인 내용은 남도록 했습니다.',
				},
				{
					title: 'Excel 미리보기부터 저장까지',
					description:
						'미리보기에서 확인한 자료를 저장 전에 다시 검사했습니다. 저장 중 오류가 나면 전체를 되돌리고, 같은 요청이 다시 들어오면 기존 결과를 반환해 중복 저장을 막았습니다.',
				},
				{
					title: '이력과 감사 로그',
					description:
						'현재 담당 관계와 과거 거래 정보를 분리했습니다. 업무 변경·로그인 결과를 기록하고 관리자가 조회하는 기능도 구현했습니다.',
				},
			],
			result:
				'표 편집과 Excel 등록을 같은 저장 기능으로 처리하도록 구현해 개발 환경에 반영했습니다. 담당 관계가 바뀌어도 기존 정산 금액은 유지됩니다.',
		},
		'react-admin-state-migration': {
			summary:
				'주식 업무 관리 웹은 MSW 모의 API를 사용해 React 프론트엔드 전체를 구축했습니다.',
			overviewDetail:
				'테이블·필터·모달을 공통화하고, 컬럼 고정·크기 조절·재정렬과 조회·편집 화면의 상태 처리를 구현했습니다.',
			problem:
				'목록, 검색, 상세, 등록·수정 화면에 비슷한 UI와 상태 처리가 반복돼, 이를 함께 쓸 수 있는 구조가 필요했습니다.',
			actions: [
				{
					title: '테이블·필터·모달 공통화',
					description:
						'목록, 검색, 상세, 등록·수정 화면에 쓸 공통 컴포넌트를 만들었습니다. 표의 컬럼을 고정하거나 너비를 조절하는 기능도 구현했습니다.',
				},
				{
					title: '조회 데이터와 화면 상태 분리',
					description:
						'MSW의 모의 응답을 TanStack Query로 조회하고, 필터와 선택 항목, 모달의 열림 상태는 별도로 관리했습니다.',
				},
			],
			result:
				'MSW 모의 API를 바탕으로 조회·편집 화면을 구축했습니다. 여러 화면에서 공통 컴포넌트를 재사용하고 조회 데이터와 화면 조작 상태를 나눠 관리했습니다.',
		},
		'mobile-output-bridge': {
			summary:
				'웹의 라벨 출력 요청을 Android 앱과 Bluetooth 프린터로 연결했습니다.',
			problem:
				'웹에서 만든 출력 자료를 Android 장비 SDK에 전달해야 했습니다. 권한 요청과 장비 연결, 취소 동작도 화면에서 이어져야 했습니다.',
			actions: [
				{
					title: '웹에서 장비까지 요청 연결',
					description:
						'출력 데이터를 네이티브 브리지로 전달하고, 장비를 선택해 연결한 뒤 라벨을 출력하도록 구현했습니다.',
				},
				{
					title: '권한과 취소 흐름 보완',
					description:
						'Android 16/API 36에서 SDK의 장비 탐색 호출을 추적해 취소 흐름과 BLUETOOTH_SCAN, BLUETOOTH_CONNECT 권한 처리를 보완했습니다.',
				},
			],
			result:
				'Android 실기기에서 Bluetooth 장비에 연결해 실제 라벨 출력을 확인했습니다.',
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
			],
			result:
				'Reduced the initial JavaScript entry from 2,405.50 kB to 616.59 kB, about 74%, comparing output sizes on the same build basis.',
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
				'Built across the settlement ERP, from React interfaces to Spring Boot APIs and database processing.',
			overviewDetail:
				'Implemented shared editing tables that retain input after failed saves and Excel imports that prevent duplicate records.',
			problem:
				'Multi-row edits and Excel imports needed to avoid lost input and duplicate writes. Changes to assignments also had to preserve finalized settlement amounts.',
			actions: [
				{
					title: 'Editing tables that retain input',
					description:
						'Built shared editing tables with keyboard navigation and selection dialogs, retaining drafts after failed saves.',
				},
				{
					title: 'From Excel preview to persistence',
					description:
						'Revalidated previewed data before saving and handled rollback and retries to prevent partial or duplicate finalization.',
				},
				{
					title: 'History and audit records',
					description:
						'Separated current assignments from historical transactions. Implemented recording of business changes and login results with an administrator query view.',
				},
			],
			result:
				'Connected table editing and bulk imports to a common save flow, preserved existing amounts after assignment changes, and delivered the implementation to the development environment.',
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
						'Built list, search, detail, and create/edit screens with shared components, including pinned columns and column resizing.',
				},
				{
					title: 'Separate query data and UI state',
					description:
						'Queried MSW mock responses with TanStack Query while managing filters, selection, and modal state separately.',
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
		'hybrid-life-info-platform':
			'공공 데이터 API로 날씨·대기질·기상특보 기능을 확장했습니다. 핵심 정보를 먼저 표시하고, 서버 캐시와 동시 요청 통합으로 반복 호출을 줄이도록 구현해 운영에 반영했습니다.',
		'structured-editor-ui':
			'개발 중이던 사이트의 일부 기능으로 차트 설정 패널과 데이터 연결, 미리보기 화면을 구현했습니다.',
		'mobile-operations-platform':
			'지도 화면과 오프라인 저장·재전송 기능을 유지보수했습니다. 앱을 다시 실행해도 전송을 기다리던 요청이 복원되도록 했습니다.',
		'legacy-support-web':
			'Excel 업로드 중 파일 분석, 입력값 검사, 통신 중 어느 단계에서 문제가 생겼는지 구분해 안내하도록 구현하고 로컬 화면에서 확인했습니다.',
		'multi-role-hybrid-platform':
			'기존 솔루션의 회원 검색·수정·통합과 문의·첨부 기능을 확장하고 Android에서도 파일을 첨부하도록 연결했습니다.',
		'ai-kickoff-documentation-tool':
			'저장소 자료로 문서 초안을 만들고, 표에서 검토·편집한 뒤 선택한 항목만 다시 작성하는 도구를 개발했습니다.',
	},
	en: {
		'hybrid-life-info-platform':
			'Extended weather, air quality and alert features with public-data APIs. Deployed core-first loading, server caching and shared results for concurrent requests to reduce repeated API calls.',
		'structured-editor-ui':
			'Built chart settings panels, data connections, and previews as part of a website that was under development.',
		'mobile-operations-platform':
			'Maintained maps and offline save/retry flows, restoring queued requests after app restarts.',
		'legacy-support-web':
			'Implemented distinct messages for parsing, input, and network errors in Excel imports and checked them locally.',
		'multi-role-hybrid-platform':
			'Extended an existing solution with member search, editing, merging, inquiries, and attachments. Integrated file selection and image previews in the Android app.',
		'ai-kickoff-documentation-tool':
			'Built a tool that drafts documents from repository material, supports table-based review, and rewrites selected items.',
	},
};
