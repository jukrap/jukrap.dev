import type { Localized } from '@/types/locale';
import type { ProfessionalCase } from '@/types/work';

export const workCases: Localized<ProfessionalCase[]> = {
	ko: [
		{
			id: 'operations-web-performance',
			title: '물류 관리-운영 웹',
			platform: 'Web',
			area: '업무 운영 / 성능',
			period: '2026.04 ~ 2026.06',
			role: '신규 구축',
			weight: 'featured',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'Zustand',
				'XLSX',
				'Vitest',
			],
			headline: '조회, 예약, 엑셀, 출력 흐름을 갖춘 물류 업무 웹을 구축했습니다.',
			summary:
				'물류 조회, 예약 접수, 현황, 주소록, 엑셀 처리, 라벨 출력까지 이어지는 관리-운영 웹을 처음부터 구축했습니다. 기능 수를 늘리는 것보다 PC와 모바일에서 같은 업무 기준으로 동작하는 흐름을 만드는 데 중점을 뒀습니다.',
			metrics: [
				{
					value: '2,405.50 kB -> 616.59 kB',
					label: '초기 로드 번들',
					detail: '라우트 단위 코드 분리와 엑셀 처리 라이브러리 지연 로딩 적용',
				},
				{
					value: '815.10 kB -> 204.38 kB',
					label: 'gzip 기준',
					detail: '동일 기준 약 74.9% 감소',
				},
				{
					value: '123 files / 657 tests',
					label: '검증 기록',
					detail: '관련 작업에서 남긴 최대 확인 기록',
				},
			],
			scope: [
				'물류 조회, 예약 접수, 현황, 주소록 화면',
				'반응형 테이블, 중첩 모달, 날짜/드롭다운 UI',
				'엑셀 업로드/다운로드, 미리보기, 전송 데이터 변환',
				'PC 출력과 모바일 WebView 출력 경로',
			],
			contribution: [
				'초기 진입에 바로 필요하지 않은 화면과 엑셀 처리 코드를 라우트 단위로 분리했습니다.',
				'모의 데이터와 실제 API 어댑터 경계를 나눠 화면 상태와 연동 상태를 따로 확인할 수 있게 했습니다.',
				'PC 브라우저, 일반 모바일 브라우저, 모바일 앱 WebView의 출력 분기를 명확히 나눴습니다.',
			],
			outcome: [
				'라우트 분리와 엑셀 처리 라이브러리 지연 로딩으로 초기 로드 번들을 2,405.50 kB에서 616.59 kB로 줄였습니다.',
				'가로 넘침, 모달 잘림, 드롭다운 위치 문제를 화면 폭별로 확인했습니다.',
				'조회, 예약, 출력이 이어지는 물류 업무 흐름을 한 화면 체계 안에서 설명할 수 있게 됐습니다.',
			],
			verification: [
				'390px~1366px 주요 화면 반응형 확인',
				'모달, 테이블, 드롭다운 표시 상태 확인',
				'관련 작업 기준 123 files / 657 tests 기록',
			],
		},
		{
			id: 'mobile-print-bridge',
			title: '모바일 라벨 출력 앱',
			platform: 'Mobile',
			area: '물류 관리-운영 웹 WebView / Printer SDK',
			period: '2026.04 ~ 2026.06',
			role: '신규 구축',
			weight: 'featured',
			stack: [
				'Expo',
				'React Native',
				'Expo Router',
				'React Native WebView',
				'Android native module',
				'TypeScript',
				'Zustand',
			],
			headline:
				'물류 관리-운영 웹을 모바일 WebView로 열고, 프린터 SDK를 네이티브로 연결했습니다.',
			summary:
				'물류 관리-운영 웹을 모바일 앱 WebView로 제공하면서, 모바일에서만 필요한 Bluetooth 프린터 SDK 연동을 네이티브 모듈로 연결했습니다. 단독 프린터 앱이라기보다 운영 웹의 모바일 출력 경로를 지원해주는 앱입니다.',
			metrics: [
				{
					value: 'Bluetooth 권한',
					label: '모바일 출력 준비',
					detail: '최근 Android 런타임 권한 흐름 확인',
				},
				{
					value: '개발/운영 분리',
					label: '앱 배포 흐름',
					detail: 'URL, 앱 식별자, 설치 파일 기준 정리',
				},
				{
					value: '실기기 출력',
					label: '프린터 SDK 검증',
					detail: '에뮬레이터가 아닌 실기기 출력 결과 확인',
				},
			],
			scope: [
				'운영 웹 WebView 진입과 개발/운영 URL 분리',
				'JavaScript-to-native 출력 데이터 계약',
				'Android 네이티브 Bluetooth 출력 모듈',
				'개발/운영 설치와 업데이트 확인 흐름',
			],
			contribution: [
				'WebView 브리지 요청과 네이티브 출력 모듈 사이의 요청/응답 계약을 정리했습니다.',
				'Bluetooth 장비 탐색, 상태 확인, 출력 명령의 네이티브 흐름을 연결했습니다.',
				'Android 실기기에서 로컬 개발 서버와 API 요청이 잘못된 로컬 루프백으로 향하는 문제를 보정했습니다.',
			],
			outcome: [
				'웹 전송 데이터와 네이티브 출력 레이아웃을 분리해 이후 라벨 필드 추가 위험을 줄였습니다.',
				'출력 기능을 웹 버튼이 아니라 실제 모바일 장비 연동으로 검증했습니다.',
				'개발/운영 설치 기준을 맞춰 현장 설치 흐름을 설명할 수 있게 했습니다.',
			],
			verification: [
				'실제 Android 기기에서 Bluetooth 출력 확인',
				'최근 Android 권한 흐름 재현 및 수정 확인',
				'WebView bridge와 네이티브 출력 요청 흐름 확인',
			],
		},
		{
			id: 'kickoff-documentation-tool',
			title: '프로젝트 착수 문서화 도구',
			platform: 'Tooling',
			area: 'AI API / 개발 생산성',
			period: '2026.04',
			role: '신규 구축',
			weight: 'featured',
			stack: [
				'Node.js',
				'TypeScript',
				'React',
				'AI Agent workflow',
				'Vite',
				'pnpm',
				'Vitest',
			],
			headline:
				'착수 자료와 저장소 근거를 바탕으로 문서 초안을 생성하는 도구를 구축했습니다.',
			summary:
				'프로젝트 착수 시 전달받는 자료와 로컬 저장소 근거를 바탕으로 요구사항, 기능, 화면 단위의 문서 초안을 만드는 도구를 구축했습니다. AI API는 생성과 일부 재작성 단계에 쓰고, 그 전에 규칙 기반 스캔으로 근거를 먼저 모으는 구조로 잡았습니다.',
			metrics: [
				{
					value: '근거 스캔 -> AI 초안',
					label: '생성 흐름',
					detail: '스캔 근거를 바탕으로 문서 초안 생성',
				},
				{
					value: 'xlsx 워크북',
					label: '시트형 산출물',
					detail: '요구사항/기능/화면 단위를 표 형태로 검토',
				},
				{
					value: 'AI 기반 셀 재작성',
					label: '검토 후 수정',
					detail: '선택 시트/셀 기준으로 일부 항목 재생성',
				},
			],
			scope: [
				'로컬 저장소 스캔과 evidence JSON 생성',
				'미리보기, 상세 산출물, 이전 실행 결과 재열기',
				'요구사항 원장, 기능 정의서, 화면 설계서 워크북 편집',
				'Markdown, JSON, ZIP, xlsx 내보내기',
			],
			contribution: [
				'규칙 기반 스캐너 결과를 생성 단계의 입력으로 사용하도록 흐름을 나눴습니다.',
				'긴 텍스트 문서뿐 아니라 표 기반 검토와 수정이 가능하도록 워크북 편집을 연결했습니다.',
				'사람이 검토한 뒤 특정 셀만 다시 쓰는 흐름을 만들어 수정 단위를 줄였습니다.',
			],
			outcome: [
				'착수 자료 분석과 문서 초안 작성을 반복 가능한 실행 단위로 만들었습니다.',
				'생성 결과를 그대로 쓰는 구조가 아니라 근거, 미리보기, 사람 검토, 내보내기가 이어지는 흐름으로 만들었습니다.',
				'신규 프로젝트를 시작할 때 요구사항과 화면 단위를 빠르게 잡기 위한 내부 도구로 구상했습니다.',
			],
			verification: [
				'자료 스캔, AI 초안 생성, 워크북 내보내기 흐름 확인',
				'선택 셀 재작성과 이전 결과 재열기 확인',
				'Markdown/JSON/ZIP/xlsx 내보내기 확인',
			],
		},
		{
			id: 'chart-editor',
			title: '차트 편집 웹 도구',
			platform: 'Web',
			area: '시각화 / 편집 UI',
			period: '2026.03 ~ 2026.04',
			role: '신규 구축',
			weight: 'featured',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'Chart.js',
				'WebGL/GLSL (OpenGL 계열)',
				'OGL (WebGL 라이브러리)',
				'react-chartjs-2',
				'TanStack Query',
				'Zustand',
				'MSW',
				'Vitest',
			],
			headline:
				'차트 미리보기, 옵션 편집, WebGL/GLSL 배경 렌더링을 포함한 편집 도구를 만들었습니다.',
			summary:
				'데이터 필드 매핑, 차트 미리보기, 옵션 패널, 드래그 앤 드롭, 툴팁 같은 편집 흐름을 구축했습니다. 차트 출력 화면이 아닌, 사용자가 차트 구성을 직접 조정하는 편집 도구에 가깝다고 보시면 되겠습니다.',
			metrics: [
				{
					value: '6개 탭 설정 패널',
					label: '설정 구조',
					detail: '차트 설정을 영역별로 분리',
				},
				{
					value: 'Chart.js + WebGL/GLSL',
					label: '렌더링 기반',
					detail: '차트 미리보기와 OGL(WebGL) 기반 편집 화면 배경',
				},
				{
					value: 'Vitest / MSW',
					label: '검증 기반',
					detail: '상호작용과 데이터 흐름 확인',
				},
			],
			scope: [
				'필드/값 매핑과 차트 미리보기',
				'옵션 패널, 접힘 패널, 툴팁',
				'드래그 앤 드롭 기반 편집 UX',
				'WebGL/GLSL 셰이더 기반 편집 화면 배경 렌더러',
			],
			contribution: [
				'차트 렌더링과 설정 패널 상태가 따로 놀지 않도록 옵션 모델을 정리했습니다.',
				'편집 중 사용자가 현재 설정을 이해할 수 있게 미리보기와 옵션 라벨을 맞췄습니다.',
				'WebGL/GLSL fragment shader로 여러 배경 모드를 구성하고 pointer/time/resolution uniform을 사용해 편집 화면의 시각 요소를 만들었습니다.',
			],
			outcome: [
				'단순 차트 렌더링이 아니라 조작 가능한 편집 도구 경험으로 정리했습니다.',
				'시각화, 상태 관리, 복잡한 설정 UI, WebGL shader 기반 배경 렌더링을 함께 다룬 케이스입니다.',
				'차트 라이브러리 사용을 넘어 옵션 모델과 편집 UX를 연결한 경험을 드러낼 수 있습니다.',
			],
			verification: [
				'미리보기 렌더링, 옵션 변경, 패널 접기 흐름 확인',
				'드래그 앤 드롭, 툴팁, 필드 매핑 동작 확인',
				'모의 데이터 기반 흐름 확인',
			],
		},
		{
			id: 'finance-admin-web',
			title: '금융 업무 관리 웹',
			platform: 'Web',
			area: '관리 화면 / 마이그레이션',
			period: '2026.03',
			role: '신규 구축',
			weight: 'featured',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'TanStack Virtual',
				'Zustand',
			],
			headline: '데이터가 많은 관리 화면을 React 상태 흐름으로 구축했습니다.',
			summary:
				'테이블, 필터, 모달, 인증 세션 흐름을 중심으로 금융 업무 관리 웹을 구축했습니다. DOM 조작에 의존하던 화면 동작을 React 상태 기반으로 옮기는 방향을 잡았습니다.',
			metrics: [
				{
					value: '4 -> 1',
					label: 'DOM 조작 지점 정리',
					detail: '발표 자료 기준 sidebar 상태 정리 예시',
				},
				{
					value: 'React Router',
					label: '화면 전환',
					detail: '업무 화면 라우트와 세션 흐름 구성',
				},
			],
			scope: ['테이블/필터 UI', '도메인 페이지', '모달', '세션 흐름'],
			contribution: [
				'공통 table/filter/modal 패턴을 재사용 가능한 흐름으로 정리했습니다.',
				'직접 DOM 조작을 상태 기반 표현으로 줄이는 방향을 잡았습니다.',
				'업무 화면의 라우트와 세션 흐름이 끊기지 않도록 기본 구조를 구성했습니다.',
			],
			outcome: [
				'데이터가 많은 관리 화면을 React 코드로 유지보수하기 쉬운 형태로 옮겼습니다.',
				'복잡한 업무 UI를 표, 필터, 모달, 세션 단위로 나누어 설명할 수 있게 됐습니다.',
			],
			verification: ['테이블, 필터, 모달, 세션 흐름을 화면 단위로 확인'],
		},
		{
			id: 'field-pda-android',
			title: '현장 PDA Android 앱',
			platform: 'Android',
			area: '빌드 복구 / 현장 입력',
			period: '2026.03 ~ 2026.04',
			role: '유지보수/기능 추가',
			weight: 'featured',
			stack: ['Android Java', 'Gradle/AGP', 'Scanner SDK'],
			headline:
				'운영 서명과 최근 빌드 환경을 분리해 현장 앱을 다시 확인 가능한 상태로 만들었습니다.',
			summary:
				'현장 단말에서 쓰이는 Android 앱의 빌드와 런타임 흐름을 복구했습니다. Gradle/JDK 충돌, 운영 서명 유무, 스캔/입력 흐름, 초기 데이터 동기화처럼 현장에서 바로 막히는 지점을 좁혔습니다.',
			metrics: [
				{
					value: '빌드 복구',
					label: 'Gradle/JDK 정리',
					detail: '운영 서명 유무와 개발 빌드 경로 분리',
				},
				{
					value: '현장 입력',
					label: '스캔/장비 입력',
					detail: '로그인, 초기 동기화, 입력 흐름을 나눠 확인',
				},
				{
					value: '개발/배포',
					label: '빌드 흐름 복구',
					detail: '운영 서명 대체 경로를 포함한 빌드 확인',
				},
			],
			scope: [
				'Gradle, AGP, JDK, Kotlin dependency 충돌 정리',
				'운영 서명 유무에 따른 개발/배포 빌드',
				'스캐너 호출, 장비 입력, 로그인/초기 동기화 흐름',
				'현장 단말 기준의 런타임 호환성',
			],
			contribution: [
				'운영 서명이 없어도 개발 빌드가 막히지 않도록 서명 조건을 분리했습니다.',
				'로그인 실패와 초기 데이터 동기화 실패를 나눠 원인을 확인할 수 있게 했습니다.',
				'현장 단말 입력과 스캔 흐름에서 앱이 멈추는 지점을 우선 확인했습니다.',
			],
			outcome: [
				'개발자가 다시 빌드하고 확인할 수 있는 상태로 프로젝트를 복구했습니다.',
				'운영 호환성을 유지하면서 빌드 도구만 올리는 식의 위험한 변경을 피했습니다.',
				'현장 단말 앱 유지보수에서 필요한 보수적인 변경 기준을 세웠습니다.',
			],
			verification: [
				'개발/운영 빌드 경로 확인',
				'로그인, 초기 데이터, 스캔/입력 흐름 중심 확인',
				'Android 빌드와 주요 현장 입력 흐름 확인',
			],
		},
		{
			id: 'legacy-webview-android',
			title: '레거시 WebView Android 앱',
			platform: 'Android',
			area: '정적 웹 / OS 호환성',
			period: '2026.03 ~ 2026.04',
			role: '유지보수/기능 추가',
			weight: 'compact',
			stack: ['Android Java', 'WebView', 'Gradle/AGP', 'OkHttp', 'RxJava2'],
			headline:
				'오래된 WebView 앱을 최근 Android 빌드 환경에서 다시 확인했습니다.',
			summary:
				'정적 웹 기반 Android 앱의 빌드, WebView, 파일 처리, 뒤로가기, OS 호환성을 점검했습니다. 오래된 라이브러리와 최근 빌드 도구 사이에서 최소 변경으로 확인 가능한 상태를 만드는 작업이었습니다.',
			metrics: [
				{
					value: '빌드 환경 복구',
					label: '레거시 Android 앱',
					detail: '최근 빌드 환경에서 주요 진입 흐름 확인',
				},
			],
			scope: [
				'WebView bridge와 뒤로가기 흐름',
				'파일 접근, content URI, 권한 처리',
				'AndroidX 및 legacy dependency 충돌',
			],
			contribution: [
				'WebView와 네이티브 사이의 예외 흐름을 방어적으로 정리했습니다.',
				'파일 처리 경로를 최근 Android 권한 정책 기준으로 점검했습니다.',
			],
			outcome: ['빌드 가능 상태와 주요 진입 흐름을 다시 확인할 수 있게 했습니다.'],
			verification: ['Android 빌드와 주요 WebView 진입 흐름 확인'],
		},
		{
			id: 'hybrid-security-app',
			title: '하이브리드 앱 기능 통합',
			platform: 'Hybrid',
			area: 'WebView / Spring MVC / Android QA',
			period: '2026.06',
			role: '유지보수/기능 추가',
			weight: 'compact',
			stack: [
				'Android WebView',
				'Cordova',
				'Spring MVC',
				'jQuery',
				'Java',
				'Maven',
			],
			headline:
				'WebView 앱과 레거시 웹 서버 사이의 기능, 라우팅, 파일 선택 흐름을 정리했습니다.',
			summary:
				'메일 확인, 이미지 판독, 하단 탭 라우트, WebView bridge, 파일 선택, 실기기 QA를 함께 다뤘습니다. 외부 API 키는 서버 프록시 뒤에 두고, 앱은 WebView 라우트와 네이티브 동작 검증에 집중하도록 나눴습니다.',
			metrics: [
				{
					value: '앱/서버 분리',
					label: '빌드 기준 확인',
					detail: 'Android 앱과 웹 서버 기준을 따로 확인',
				},
				{
					value: 'Photo Picker',
					label: '파일 선택 흐름',
					detail: '앨범/카메라/파일 입력 분리',
				},
			],
			scope: [
				'메일 확인 화면과 서버 프록시',
				'이미지 판독 화면, 점수 파싱, 결과 상태',
				'하단 탭 라우트와 WebView bridge 동기화',
				'카메라/앨범/파일 선택과 실기기 QA',
			],
			contribution: [
				'외부 API 인증 정보가 클라이언트에 노출되지 않도록 서버 프록시 계약으로 나눴습니다.',
				'홈 카드, 하단 탭, WebView 라우트가 같은 기능 화면을 바라보도록 동기화했습니다.',
				'Android WebView file chooser를 입력 소스와 네이티브 picker 흐름으로 분리했습니다.',
			],
			outcome: [
				'브라우저 화면만이 아니라 Android WebView에서 로그인, bridge, 라우트, file chooser까지 함께 확인했습니다.',
				'한글 깨짐, 로컬 WebView 접속, 탭 index 불일치처럼 앱/웹 경계에서 생기는 문제를 분리했습니다.',
			],
			verification: [
				'에뮬레이터와 실기기에서 라우트, file chooser, tab sync 확인',
				'WebView bridge 누락, cleartext 차단, 앱 중단 패턴 확인',
				'서버 JVM 인코딩과 WebView 렌더링 문제를 분리해 확인',
			],
		},
		{
			id: 'legacy-web-panel',
			title: '레거시 웹 패널 분리',
			platform: 'Legacy Web',
			area: 'JSP / jQuery',
			period: '2026.06',
			role: '유지보수/기능 추가',
			weight: 'compact',
			stack: ['JSP', 'jQuery', 'Server-rendered web'],
			headline: '문서/게시판형 패널의 회귀 기준선을 정리했습니다.',
			summary:
				'JSP/jQuery 기반 웹 패널에서 문서, 게시판형 목록, 메뉴 라우팅, 페이지 로더를 분리해 변경 영향 범위를 확인했습니다.',
			metrics: [
				{
					value: '회귀 기준선',
					label: '레거시 웹 패널',
					detail: '문서/목록/메뉴/로더 단위로 영향 범위 확인',
				},
			],
			scope: ['문서 패널', '게시판형 목록', '메뉴 라우팅', '페이지 로더'],
			contribution: [
				'분리 가능한 영역과 회귀 확인이 필요한 영역을 나눠 문서화했습니다.',
				'브라우저 기준선과 페이지 로더 흐름을 확인했습니다.',
			],
			outcome: [
				'레거시 JSP/jQuery 화면 변경 전 영향 범위를 좁히는 기준을 만들었습니다.',
			],
			verification: ['브라우저 회귀 기준선과 메뉴/페이지 로더 동작 확인'],
		},
	],
	en: [
		{
			id: 'operations-web-performance',
			title: 'Logistics Management Web',
			platform: 'Web',
			area: 'Operations / Performance',
			period: '2026.04 ~ 2026.06',
			role: 'End-to-end build',
			weight: 'featured',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'Zustand',
				'XLSX',
				'Vitest',
			],
			headline:
				'Built logistics management flows for lookup, reservations, Excel, and printing.',
			summary:
				'Built a logistics management web app covering lookup, reservation intake, status views, contacts, Excel handling, and label printing. The focus was keeping business workflows stable across desktop and mobile contexts.',
			metrics: [
				{
					value: '2,405.50 kB -> 616.59 kB',
					label: 'Initial load bundle',
					detail: 'route-level code splitting and spreadsheet-library lazy loading',
				},
				{
					value: '815.10 kB -> 204.38 kB',
					label: 'gzip size',
					detail: 'about 74.9% reduction on the same baseline',
				},
				{
					value: '123 files / 657 tests',
					label: 'Verification record',
					detail: 'largest related verification record',
				},
			],
			scope: [
				'logistics lookup, reservation intake, status, and contact routes',
				'responsive tables, nested modals, date/dropdown UI',
				'Excel upload/download, preview, and payload conversion',
				'PC print and mobile WebView print paths',
			],
			contribution: [
				'Split non-initial screens and spreadsheet handling out of the initial entry path.',
				'Kept mock data and remote API adapter boundaries separate for independent checks.',
				'Separated PC browser, mobile browser, and mobile-app WebView print paths.',
			],
			outcome: [
				'Reduced the initial load bundle from 2,405.50 kB to 616.59 kB through route splitting and spreadsheet-library lazy loading.',
				'Checked overflow, modal clipping, and dropdown behavior across viewports.',
				'This became the clearest example of building and stabilizing a logistics management workflow.',
			],
			verification: [
				'Checked key screens across 390px to 1366px widths.',
				'Checked modal, table, and dropdown display states.',
				'Recorded 123 files / 657 tests on related work.',
			],
		},
		{
			id: 'mobile-print-bridge',
			title: 'Mobile Label Print App',
			platform: 'Mobile',
			area: 'Logistics Management WebView / Printer SDK',
			period: '2026.04 ~ 2026.06',
			role: 'End-to-end build',
			weight: 'featured',
			stack: [
				'Expo',
				'React Native',
				'Expo Router',
				'React Native WebView',
				'Android native module',
				'TypeScript',
				'Zustand',
			],
			headline:
				'Wrapped the logistics management web in a mobile WebView and connected native printer SDK work.',
			summary:
				'Built the mobile path for the logistics management web, using WebView for the business screen and Android native modules for Bluetooth label printing. It is closer to a mobile operations shell than a standalone printer app.',
			metrics: [
				{
					value: 'Bluetooth permission',
					label: 'Mobile print setup',
					detail: 'runtime permission flow on recent Android',
				},
				{
					value: 'dev/prod split',
					label: 'App delivery flow',
					detail: 'URL, app id, and installation artifact baselines',
				},
				{
					value: 'Real device output',
					label: 'Output verification',
					detail: 'checked with actual device output',
				},
			],
			scope: [
				'logistics management WebView entry and develop/production URL split',
				'JavaScript-to-native print payloads',
				'Android native Bluetooth print module',
				'installation and update-check flows',
			],
			contribution: [
				'Defined the request/response contract between WebView actions and the native module.',
				'Connected Bluetooth device lookup, status checks, and print commands.',
				'Adjusted real-device local development so WebView and API calls did not point to the wrong loopback host.',
			],
			outcome: [
				'Kept web payloads separate from native output layout mapping.',
				'Verified the feature as real hardware integration, not just a web button.',
				'Aligned development and production installation baselines for field setup.',
			],
			verification: [
				'Checked Bluetooth output on a real Android device.',
				'Reproduced and verified recent Android permission issues.',
				'Checked WebView bridge and native print request flows.',
			],
		},
		{
			id: 'kickoff-documentation-tool',
			title: 'Project Kickoff Documentation Tool',
			platform: 'Tooling',
			area: 'AI API / developer productivity',
			period: '2026.04',
			role: 'End-to-end build',
			weight: 'featured',
			stack: [
				'Node.js',
				'TypeScript',
				'React',
				'AI Agent workflow',
				'Vite',
				'pnpm',
				'Vitest',
			],
			headline:
				'Built a tool that drafts kickoff documents from project material and repository evidence.',
			summary:
				'Built a tool that combines kickoff material with local repository evidence to draft requirement, feature, and screen-level documents. The AI API is used for draft generation and partial rewrites after rule-based evidence collection.',
			metrics: [
				{
					value: 'Evidence scan -> AI draft',
					label: 'Generation flow',
					detail: 'drafts generated from scanned evidence',
				},
				{
					value: 'xlsx workbook',
					label: 'sheet-style output',
					detail: 'review requirements, features, and screens as tables',
				},
				{
					value: 'AI cell rewrite',
					label: 'After-review edits',
					detail: 'regenerate selected sheet/cell items after review',
				},
			],
			scope: [
				'local repository scan and evidence JSON',
				'preview, detailed artifacts, and previous run reopening',
				'workbook editing for requirements and functional/screen specs',
				'Markdown, JSON, ZIP, and xlsx export',
			],
			contribution: [
				'Used rule-based scanner output as the input to the generation step.',
				'Added table-based review and editing instead of generating only long text.',
				'Reduced revision scope through selected cell rewrite flows.',
			],
			outcome: [
				'Turned kickoff analysis and document drafting into repeatable run-based work.',
				'Kept evidence, preview, human review, and export in one workflow.',
				'Kept the tool focused on practical project kickoff work.',
			],
			verification: [
				'Checked scanning, AI draft generation, and workbook export flows.',
				'Checked selected-cell rewrite and previous-result reopening.',
				'Checked build/test baselines.',
			],
		},
		{
			id: 'chart-editor',
			title: 'Chart Editing Web Tool',
			platform: 'Web',
			area: 'Visualization / editor UI',
			period: '2026.03 ~ 2026.04',
			role: 'End-to-end build',
			weight: 'featured',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'Chart.js',
				'WebGL/GLSL (OpenGL-style)',
				'OGL (WebGL library)',
				'react-chartjs-2',
				'TanStack Query',
				'Zustand',
				'MSW',
				'Vitest',
			],
			headline:
				'Built chart preview, option editing, and WebGL/GLSL background rendering for an editor tool.',
			summary:
				'Built data field mapping, chart previews, option panels, drag/drop, and tooltip behavior for an editable visualization workflow.',
			metrics: [
				{
					value: '6-tab settings panel',
					label: 'Settings structure',
					detail: 'options separated by editing area',
				},
				{
					value: 'Chart.js + WebGL/GLSL',
					label: 'Rendering base',
					detail: 'chart preview and OGL(WebGL)-based editor background',
				},
				{
					value: 'Vitest / MSW',
					label: 'Verification base',
					detail: 'interaction and data-flow checks',
				},
			],
			scope: [
				'field/value mapping and chart preview',
				'option panels, collapsible panels, and tooltips',
				'drag/drop editing UX',
				'WebGL/GLSL shader-based editor background renderer',
			],
			contribution: [
				'Kept chart rendering and panel state connected through a clearer option model.',
				'Aligned preview output and option labels so users could understand the current configuration.',
				'Built multiple WebGL/GLSL fragment shader background modes using pointer, time, and resolution uniforms.',
			],
			outcome: [
				'Framed the work as an editor experience, not just chart rendering.',
				'Showed visualization, state management, complex settings UI, and WebGL shader rendering in one case.',
				'Moved beyond library usage into option-model and editing UX integration.',
			],
			verification: [
				'Checked preview rendering, option changes, and panel collapse behavior.',
				'Checked drag/drop, tooltip, and field mapping behavior.',
				'Checked mock-backed data flows.',
			],
		},
		{
			id: 'finance-admin-web',
			title: 'Financial Operations Admin',
			platform: 'Web',
			area: 'Admin UI / migration',
			period: '2026.03',
			role: 'End-to-end build',
			weight: 'featured',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'TanStack Virtual',
				'Zustand',
			],
			headline: 'Built data-heavy admin screens around state-driven React flows.',
			summary:
				'Built financial operations admin screens around tables, filters, modals, and session flows while moving DOM-driven behavior toward React state.',
			metrics: [
				{
					value: '4 -> 1',
					label: 'DOM manipulation reduction example',
					detail: 'sidebar state example from presentation material',
				},
				{
					value: 'React Router',
					label: 'screen flow',
					detail: 'route and session behavior for business screens',
				},
			],
			scope: ['table/filter UI', 'domain pages', 'modals', 'session flow'],
			contribution: [
				'Organized reusable table/filter/modal patterns.',
				'Reduced direct DOM manipulation toward state-based rendering.',
				'Built route and session flow foundations for business screens.',
			],
			outcome: [
				'Made data-heavy admin screens easier to maintain in React.',
				'Separated complex business UI into table, filter, modal, and session units.',
			],
			verification: [
				'Checked table, filter, modal, and session flows at screen level.',
			],
		},
		{
			id: 'field-pda-android',
			title: 'Field PDA Android App',
			platform: 'Android',
			area: 'Build recovery / field input',
			period: '2026.03 ~ 2026.04',
			role: 'Maintenance / feature work',
			weight: 'featured',
			stack: ['Android Java', 'Gradle/AGP', 'Scanner SDK'],
			headline: 'Separated operational signing from current build recovery.',
			summary:
				'Recovered build and runtime flows for an Android app used on field devices, narrowing issues around Gradle/JDK conflicts, signing, scan/input flows, and initial data sync.',
			metrics: [
				{
					value: 'Build recovery',
					label: 'Gradle/JDK cleanup',
					detail: 'separated local builds from operational signing',
				},
				{
					value: 'Field input',
					label: 'scan/device flow',
					detail: 'checked login, initial sync, and input stages separately',
				},
				{
					value: 'dev/release',
					label: 'Build paths',
					detail: 'including an operational signing fallback',
				},
			],
			scope: [
				'Gradle, AGP, JDK, and Kotlin dependency conflicts',
				'development/release builds with conditional signing',
				'scanner invocation, field input, login, and initial sync',
				'field-device runtime compatibility',
			],
			contribution: [
				'Separated signing availability from whether developers could build locally.',
				'Split login failure and initial data sync failure into observable stages.',
				'Focused first on field input and scanner flows that could block actual work.',
			],
			outcome: [
				'Recovered a state where developers could build and verify the app again.',
				'Avoided broad runtime changes while modernizing the build path.',
				'Established a conservative maintenance pattern for field-device Android apps.',
			],
			verification: [
				'Checked development and production build paths.',
				'Checked login, initial data, scan, and input flows.',
				'Checked Android builds and key field-input flows.',
			],
		},
		{
			id: 'legacy-webview-android',
			title: 'Legacy WebView Android App',
			platform: 'Android',
			area: 'Static web / OS compatibility',
			period: '2026.03 ~ 2026.04',
			role: 'Maintenance / feature work',
			weight: 'compact',
			stack: ['Android Java', 'WebView', 'Gradle/AGP', 'OkHttp', 'RxJava2'],
			headline: 'Checked an old WebView app against a modern Android build setup.',
			summary:
				'Reviewed build, WebView behavior, file handling, back navigation, and OS compatibility for a static-web-based Android app while keeping changes narrow.',
			metrics: [
				{
					value: 'Build recovery',
					label: 'Legacy Android app',
					detail: 'checked entry flows on a modern build setup',
				},
			],
			scope: [
				'WebView bridge and back navigation',
				'file access, content URI, and permissions',
				'AndroidX and legacy dependency conflicts',
			],
			contribution: [
				'Hardened null/error paths between WebView and native code.',
				'Reviewed file flows against modern Android permission behavior.',
			],
			outcome: ['Made the build and main entry flows verifiable again.'],
			verification: ['Checked Android builds and key WebView entry flows.'],
		},
		{
			id: 'hybrid-security-app',
			title: 'Hybrid App Feature Integration',
			platform: 'Hybrid',
			area: 'WebView / Spring MVC / Android QA',
			period: '2026.06',
			role: 'Maintenance / feature work',
			weight: 'compact',
			stack: [
				'Android WebView',
				'Cordova',
				'Spring MVC',
				'jQuery',
				'Java',
				'Maven',
			],
			headline:
				'Integrated feature, routing, file picker, and QA flows across WebView and legacy web.',
			summary:
				'Worked on email checks, image inspection, bottom-tab routing, WebView bridge behavior, file selection, and real-device QA while keeping external API keys behind server-side proxy contracts.',
			metrics: [
				{
					value: 'app/server split',
					label: 'Build baselines',
					detail: 'Android app and web server baselines checked separately',
				},
				{
					value: 'Photo Picker',
					label: 'file selection flow',
					detail: 'album/camera/file inputs separated',
				},
			],
			scope: [
				'email check screen and server proxy',
				'image inspection screen, score parsing, and result states',
				'bottom tab routing and WebView bridge sync',
				'camera/album/file selection and device QA',
			],
			contribution: [
				'Separated external API credentials behind server-side proxy contracts.',
				'Synced home cards, bottom tabs, and WebView routes to the same feature screens.',
				'Split Android WebView file chooser behavior by source input and native picker path.',
			],
			outcome: [
				'Checked login, bridge, route, and file chooser behavior in Android WebView, not only in a browser.',
				'Separated issues such as Korean text encoding, local WebView access, and tab-index mismatch.',
			],
			verification: [
				'Checked route, file chooser, and tab sync on emulator and real devices.',
				'Checked WebView bridge gaps, cleartext blocking, and fatal exception patterns.',
				'Separated server JVM encoding from WebView rendering behavior.',
			],
		},
		{
			id: 'legacy-web-panel',
			title: 'Legacy Web Panel Split',
			platform: 'Legacy Web',
			area: 'JSP / jQuery',
			period: '2026.06',
			role: 'Maintenance / feature work',
			weight: 'compact',
			stack: ['JSP', 'jQuery', 'Server-rendered web'],
			headline:
				'Separated regression baselines for document and board-style panels.',
			summary:
				'Reviewed JSP/jQuery document panels, board-style lists, menu routing, page loaders, and browser regression baselines to clarify change impact.',
			metrics: [
				{
					value: 'Regression baseline',
					label: 'Legacy web panel',
					detail: 'split impact checks by document, list, menu, and loader areas',
				},
			],
			scope: ['document panel', 'board-style list', 'menu routing', 'page loader'],
			contribution: [
				'Separated areas that could change from areas that needed regression checks.',
				'Reviewed browser baselines and page-loader behavior.',
			],
			outcome: [
				'Created a narrower impact frame before changing legacy JSP/jQuery screens.',
			],
			verification: [
				'Checked browser regression baselines and menu/page-loader behavior.',
			],
		},
	],
};
