import type { Localized } from '@/types/locale';
import type { WorkCaseRecord } from '@/types/work';

export const workCases: Localized<WorkCaseRecord[]> = {
	ko: [
		{
			workstreamId: 'WS13',
			id: 'settlement-operations-platform',
			title: '업무 정산 ERP 플랫폼',
			platform: 'Web / API',
			area: '편집표·Excel 등록 / 청구·정산·이력 관리',
			period: '2026.07 ~ 2026.09',
			role: '프론트엔드·API·DB 전반 구축',
			workType: '신규 개발',
			stack: [
				'React',
				'TypeScript',
				'Tailwind CSS',
				'Vite',
				'React Router',
				'Zustand',
				'Spring Boot',
				'MyBatis',
				'MariaDB',
				'Vitest',
			],
			headline:
				'React 화면부터 Spring Boot API와 DB 처리까지 맡아, 자료 입력부터 정산까지 이어지는 기능을 구축했습니다.',
			summary:
				'키보드로 셀을 이동하며 입력하는 공통 편집표를 만들고, 저장에 실패해도 초안이 남도록 했습니다. Excel 미리보기에서 수정·검증한 자료를 일괄 등록하고, 담당 관계가 바뀌어도 과거 정산 금액이 유지되도록 했습니다.',
			problem:
				'Excel 자료를 미리 본 뒤 수정하거나 다시 저장할 수 있어야 했습니다. 이때 일부 행만 등록되거나 같은 자료가 두 번 들어가면 안 됐습니다. 담당 관계 변경이 이미 확정된 정산 금액에 영향을 주지 않도록 이력 관리도 필요했습니다.',
			thinking: [
				'미리보기에서 확인한 전체 자료를 서버에 보관했습니다. 확정할 때 권한과 참조 정보가 바뀌었는지 다시 검사해 화면에서 확인한 자료와 다른 값이 저장되지 않도록 했습니다.',
				'대량등록은 하나의 트랜잭션으로 처리했습니다. 저장 중 실패하면 전체를 되돌리고, 같은 요청을 다시 보내면 처음 저장한 결과를 반환합니다.',
				'현재 담당 관계와 거래 당시의 정산 대상을 별도로 저장했습니다. 어느 대상에 배분할지 불분명한 금액은 자동 처리하지 않고 정산 마감을 막았습니다.',
			],
			process: [
				'메뉴 조회와 등록·수정 권한을 서버에서 검사하도록 했습니다.',
				'원천 청구와 배분 정보를 한꺼번에 조회하고 월 마감에 필요한 자료를 미리 읽도록 바꿨습니다.',
				'업무 변경과 로그인 결과를 감사 기록으로 남기고 허용된 관리자가 조회하는 기능을 구현했습니다.',
			],
			solution: [
				'인라인 편집, 선택창, 키보드 이동을 공통 표로 구현하고 저장에 실패해도 입력한 초안이 남도록 했습니다.',
				'Excel 미리보기·수정·재검증·등록 화면과 API를 만들고 중복 등록과 일부 행만 저장되는 경우를 처리했습니다.',
				'청구 금액을 정산에 배분하고, 담당 관계나 제원이 변경되어도 기존 정산 금액과 보험·점검의 등록 당시 정보를 유지하도록 했습니다.',
			],
			impact: [
				{
					value: '입력 초안 보존',
					label: '공통 편집표',
					detail: '인라인 편집·선택창·키보드 이동과 저장 실패 처리',
				},
				{
					value: '중복·부분 등록 방지',
					label: 'Excel 대량등록',
					detail: '실패 시 전체 취소, 같은 요청의 재시도에는 기존 결과 반환',
				},
				{
					value: '정산 이력 유지',
					label: '담당 관계 변경',
					detail: '현재 관계와 거래 당시의 정산 대상·금액을 분리',
				},
			],
			checks: [
				'격리 MariaDB에서 저장 실패 시 전체 취소와 동시 확정·재시도의 중복 등록 차단을 확인했습니다.',
				'개발 DB에서 담당 관계 변경 후에도 과거 정산 금액이 유지되는지 확인했습니다. 이 사례의 반영 범위는 개발 환경입니다.',
			],
		},
		{
			workstreamId: 'WS11',
			id: 'mobile-operations-platform',
			title: '모바일 업무 플랫폼',
			platform: 'Web / Android',
			area: '지도·업무 UI / 오프라인 복원',
			period: '2026.08',
			role: '기존 웹·앱·API 유지보수',
			workType: '유지보수',
			stack: [
				'React',
				'TypeScript',
				'React Native',
				'Expo',
				'Spring Boot',
				'SQLite',
			],
			headline:
				'기존 모바일 업무 앱의 지도 화면과 오프라인 저장·재전송 기능을 유지보수했습니다.',
			summary:
				'React 업무 화면과 React Native 앱, Spring Boot API를 수정했습니다. 지도 선택과 복귀 동작을 고치고, 전송 대기 중인 요청을 앱 재실행 후에도 복원하도록 했습니다.',
			problem:
				'통신이 끊기거나 앱을 다시 실행하면 입력한 처리 내용과 전송 대기 요청을 잃을 수 있었습니다. 다른 계정으로 로그인했을 때 이전 사용자의 요청이 전송되는 경우도 막아야 했습니다.',
			thinking: [
				'사용자가 확정한 처리 내용을 앱 저장소에 먼저 기록한 뒤 전송하도록 했습니다.',
				'대기 요청이 현재 로그인한 사용자의 것인지 확인하고, 이미 서버에 반영된 결과를 확인한 뒤 재전송하도록 했습니다.',
				'지도 선택과 처리 후 복귀 상태를 구분하고, 새 네이티브 기능은 지원 여부를 확인한 셸에서만 호출했습니다.',
			],
			process: [
				'필터가 바뀌어도 지도 그룹 번호를 유지하고 선택한 업무 처리 뒤 기존 지도 위치로 돌아오도록 연결했습니다.',
				'현재 위치의 권한·서비스 비활성·시간 초과를 나눴으며, 구형 셸은 기존 웹 위치 경로를 유지했습니다.',
				'앱 재실행 뒤 사용자 식별과 대기열을 복원한 다음 전송을 시작하고, 기존 로그인 세션을 위한 식별 정보 복원도 보완했습니다.',
			],
			solution: [
				'관계 목록과 확정 요청·선택 사진을 브리지 저장소에 보존하고 저장 작업을 직렬화했습니다.',
				'서버 완료 내역과 대기 요청을 대조하며 충돌·업무 오류·사진 복원 실패는 수동 확인 대상으로 남겼습니다.',
				'지도 선택과 처리 화면의 복귀, 네이티브 위치 지원 확인, 웹·서버의 수령인·선택 첨부 입력 규칙을 연결했습니다.',
			],
			impact: [
				{
					value: '앱 재실행 후 복원',
					label: '전송 대기 요청',
					detail: '처리 내용과 선택한 사진을 앱 저장소에 보관',
				},
				{
					value: '로그인 사용자별 재전송',
					label: '연결 복구',
					detail: '현재 사용자 요청만 확인하고 서버에 이미 반영된 내용과 대조',
				},
				{
					value: '구형 앱 호환',
					label: '현재 위치 조회',
					detail: '새 위치 기능을 지원하지 않는 앱은 기존 웹 방식 사용',
				},
			],
			checks: [
				'Android 실기기에서 통신 차단 중 저장, 앱 재실행 후 복원과 연결 복구 뒤 서버 반영을 확인했습니다.',
				'중복 전송은 원인 조사 단계입니다.',
			],
		},
		{
			workstreamId: 'WS07',
			id: 'delivery-operations-web',
			title: '물류 운영 웹',
			platform: 'Web',
			area: '업무 운영 / 성능',
			period: '2026.04 ~ 2026.06',
			role: '신규 구축/안정화',
			workType: '신규 개발',
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
				'조회·예약·Excel 등록과 라벨 출력으로 이어지는 업무 화면을 React와 TypeScript로 개발했습니다.',
			summary:
				'반복되는 표·입력 폼·모달을 공통화하고 API 응답을 화면과 출력 흐름에 연결했습니다. 페이지와 Excel 처리 코드의 지연 로딩으로 초기 JavaScript 엔트리를 약 74% 줄였습니다.',
			impact: [
				{
					presentation: 'measurement',
					value: '2,405.50 → 616.59 kB',
					label: '초기 JavaScript 엔트리',
					detail: '동일 빌드 기준 약 74% 감소',
				},
				{
					presentation: 'measurement',
					value: '815.10 → 204.38 kB',
					label: 'gzip 압축 크기',
					detail: '동일 초기 엔트리 기준 약 75% 감소',
				},
			],
			problem:
				'조회·예약·Excel 등록·출력 화면에서 공통 UI와 API 연동이 필요했습니다. 초기 화면에 필요하지 않은 페이지와 Excel 라이브러리까지 함께 포함되어 초기 JavaScript 엔트리가 커진 상태였습니다.',
			thinking: [
				'조회 데이터, 입력 상태, 출력 요청을 분리하고 표·폼·모달은 공통 컴포넌트로 구성했습니다.',
				'번들 분석으로 큰 의존성을 찾고 페이지와 Excel 라이브러리를 필요한 시점에 불러오도록 했습니다.',
				'PC 브라우저 출력과 모바일 WebView의 네이티브 출력은 실행 환경에 맞게 나눴습니다.',
			],
			process: [
				'모의 데이터와 실제 API 연결을 분리해 로딩·빈 결과·오류 상태를 구현했습니다.',
				'여러 라벨 번호가 생기는 예약을 목록과 모달에 표시하고 API 응답을 미리보기·출력 요청으로 변환했습니다.',
				'공통 인증·초기화 코드까지 분리하는 실험은 초기화 흐름과 첫 조작의 로딩 경계가 늘어나 채택하지 않았습니다. 페이지와 Excel 코드 분리만 유지했습니다.',
			],
			solution: [
				'공통 표·입력 폼·모달 위에 예약 접수, 다건 처리, 주소록 선택, Excel 미리보기를 구현했습니다.',
				'React.lazy로 페이지를 분리하고 Excel 라이브러리는 업로드·다운로드 실행 시점에 불러오도록 했습니다.',
				'API의 예약 식별자와 다건 라벨 응답을 PC·모바일 출력에 필요한 데이터로 변환했습니다.',
			],
			checks: [
				'수치는 동일한 빌드 기준으로 초기 JavaScript 엔트리의 크기를 비교한 값입니다.',
				'페이지 이동, 데이터 조회, Excel 처리와 PC 라벨 출력이 지연 로딩 이후에도 이어지는지 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS10',
			id: 'hybrid-life-info-platform',
			title: '생활정보 하이브리드 서비스',
			platform: 'Hybrid',
			area: '레거시 웹 / Android WebView / 운영',
			period: '2026.06 ~ 2026.07',
			role: '유지보수/운영 반영',
			workType: '유지보수',
			stack: ['Spring MVC', 'JSP', 'jQuery', 'Java', 'Android'],
			headline:
				'외부 API가 늦어도 핵심 정보를 먼저 보여 주도록 로딩 순서와 캐시를 개선했습니다.',
			summary:
				'기존 웹과 Android WebView를 유지보수하며 화면 로딩, 외부 API 연동, 서버 캐시와 위치 조회를 함께 개선했습니다. 핵심 정보와 보조 정보 요청을 나누고, 외부 조회가 실패하면 허용한 범위에서 이전 값을 표시하도록 했습니다.',
			impact: [
				{
					value: '핵심 정보 우선 표시',
					label: '화면 로딩',
					detail: '느린 보조 정보 요청과 분리',
				},
				{
					value: '캐시 재사용',
					label: '외부 API 응답',
					detail: '유효한 응답 재사용과 실패 시 제한적인 이전 값 표시',
				},
			],
			problem:
				'여러 외부 API와 기준 데이터 조회가 한 요청 안에 묶이면 일부 지연이 전체 화면 지연으로 번질 수 있었습니다. 운영 반영도 파일 단위로 이뤄져 누락과 설정 노출 위험을 함께 관리해야 했습니다.',
			thinking: [
				'먼저 보여야 하는 핵심 정보와 늦게 채워져도 되는 보조 정보를 분리했습니다.',
				'유효한 캐시와 만료된 캐시를 구분하고, 외부 API가 실패하면 허용한 범위에서 이전 값을 사용하도록 했습니다.',
			],
			process: [
				'외부 API 호출과 위치 조회를 화면의 정보 표시 순서에 맞춰 나눴습니다.',
				'기준 데이터는 임시 저장과 필수값 검증을 거친 뒤 캐시를 교체했습니다.',
				'캐시는 단일 Tomcat의 JVM 메모리 범위에 적용했습니다.',
			],
			solution: [
				'핵심 정보를 먼저 불러오고 정보 영역마다 캐시 사용 기준을 정했습니다.',
				'기준 데이터를 서버에 캐시하고, 갱신할 때는 임시 저장과 검증을 거친 뒤 교체하도록 했습니다.',
				'Android WebView에서는 네이티브 위치 조회를 우선 사용하고, 실패하면 저장된 위치나 브라우저 위치 조회를 사용하도록 했습니다.',
			],
			checks: [
				'최초 조회, 캐시 재사용과 외부 API 실패 시 이전 값 표시를 확인하고 운영 환경에 반영했습니다.',
			],
		},
		{
			workstreamId: 'WS06',
			id: 'ai-kickoff-documentation-tool',
			title: 'AI 보조 프로젝트 문서화 도구',
			platform: 'Tooling',
			area: 'AI API / 개발 생산성',
			period: '2026.04',
			role: '내부 도구 구축',
			workType: '내부 도구 개발',
			stack: ['Node.js', 'TypeScript', 'React', 'AI API', 'xlsx', 'Vitest'],
			headline:
				'저장소 자료로 문서 초안을 만들고 표에서 검토·편집하는 AI 보조 도구를 개발했습니다.',
			summary:
				'저장소에서 수집한 자료를 먼저 확인한 뒤 AI가 만든 요구사항·기능·화면 문서를 표에서 편집하도록 했습니다. 검토한 내용은 유지하고 선택한 시트와 셀만 다시 작성할 수 있습니다.',
			impact: [
				{
					value: 'Scan → Preview',
					label: '생성 입력 흐름',
					detail: '규칙 기반 스캔 결과를 바탕으로 AI 초안 생성',
				},
				{
					value: 'xlsx workbook',
					label: '검수 산출물',
					detail: '요구사항/기능/화면 단위를 표로 검토',
				},
				{
					value: 'Selected cell revision',
					label: '부분 보강',
					detail: '선택 시트와 셀 기준으로 재작성 범위 축소',
				},
			],
			problem:
				'비정형 자료를 모델에 바로 넘기면 근거와 추측이 섞이기 쉽고, 일부 문서만 보강하고 싶을 때도 전체 산출물이 흔들릴 수 있었습니다.',
			thinking: [
				'정해진 규칙에 따라 저장소 자료를 수집한 뒤 AI 초안 생성에 사용했습니다.',
				'표의 JSON 데이터를 원본으로 관리하고, Markdown과 내보내기 파일은 이 데이터에서 생성했습니다.',
				'자동화는 초안 생성까지 맡기고 최종 검토와 보강은 사람이 확인할 수 있는 표 구조로 남겼습니다.',
			],
			process: [
				'수집한 자료를 먼저 보여 주고 사용자가 문서 작성 방향을 확인할 수 있게 했습니다.',
				'생성한 문서를 시트별로 나눠 표에서 검토할 수 있게 했습니다.',
				'선택한 시트와 셀, 주변 내용을 함께 전달해 필요한 부분만 다시 작성하도록 했습니다.',
				'AI가 정리할 항목과 사용자가 결정할 항목을 구분하고, 근거 없이 임시 내용을 채워 넣지 않도록 했습니다.',
			],
			solution: [
				'자료 스캔, 생성 미리보기, 표 편집과 내보내기를 하나의 흐름으로 연결했습니다.',
				'요구사항, 기능 정의서, 화면 설계서를 표에서 검토할 수 있게 했습니다.',
				'수정할 시트·셀과 유지할 내용을 함께 전달하는 부분 재작성 기능을 만들었습니다.',
			],
			checks: [
				'선택한 시트·셀을 다시 작성할 때 다른 내용이 유지되고 일부 생성 실패 뒤에도 성공한 문서를 사용할 수 있는지 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS05',
			id: 'mobile-output-bridge',
			title: '모바일 출력 브릿지 앱',
			platform: 'Mobile',
			area: 'WebView / Android native module',
			period: '2026.04 ~ 2026.06',
			role: '신규 구축/출력 연동',
			workType: '신규 개발',
			stack: [
				'Expo',
				'React Native',
				'Expo Router',
				'WebView',
				'Android native module',
				'TypeScript',
				'Bluetooth',
			],
			headline:
				'WebView와 Android 네이티브 모듈을 연결해 운영 웹에서 모바일 라벨을 출력하도록 했습니다.',
			summary:
				'업무 화면은 WebView로 제공하고 장비와 직접 연결하는 출력 기능은 Android 네이티브 모듈에 구현했습니다.',
			impact: [
				{
					value: 'WebView → native',
					label: '출력 요청 경계',
					detail: '웹에서 전달한 데이터와 장비 출력 명령을 분리',
				},
				{
					value: '실기기 확인',
					label: '장비 출력 검증',
					detail: 'Android 실기기에서 권한·연결·출력 확인',
				},
			],
			problem:
				'웹 버튼으로 출력 요청을 보내는 것과 실제 모바일 장비에서 출력되는 것은 다른 문제였습니다. WebView 요청과 Android 권한, 네이티브 모듈, 장비 상태를 함께 살펴봐야 실패 원인을 찾을 수 있었습니다.',
			thinking: [
				'업무 화면은 웹에 두고 장비와 직접 연결하는 출력 기능은 네이티브 모듈로 분리했습니다.',
				'WebView 브리지의 요청과 네이티브 응답 형식을 정의했습니다.',
			],
			process: [
				'웹에서 받은 데이터를 네이티브 모듈의 출력 형식으로 변환했습니다.',
				'Bluetooth 권한, 장비 탐색, 연결 상태, 출력 명령을 단계별로 확인했습니다.',
				'Android 16/API 36에서 SDK 내부 장비 탐색 호출까지 따라가 취소 흐름과 BLUETOOTH_SCAN, BLUETOOTH_CONNECT 권한을 보완했습니다.',
			],
			solution: [
				'WebView 브리지와 Android 네이티브 모듈의 요청·응답 처리를 구현했습니다.',
				'출력 데이터 변환, 장비 상태 확인, 실패 안내를 단계별로 나눴습니다.',
				'모바일 브라우저의 대체 동작과 앱 WebView의 출력 경로를 구분했습니다.',
			],
			checks: [
				'Android 16 / API 36 실기기에서 권한 요청, Bluetooth 연결과 실물 라벨 출력을 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS01',
			id: 'legacy-mobile-compatibility',
			title: '레거시 모바일 앱 호환성',
			platform: 'Android / Hybrid',
			area: '빌드 체인 / OS 호환성 / WebView',
			period: '2026.03',
			role: '호환성 안정화/회귀 분리',
			workType: '유지보수',
			stack: ['Android Java', 'Gradle/AGP', 'RxJava', 'FileProvider'],
			headline:
				'레거시 Android 앱의 빌드를 복구하고 OS별 권한·파일·뒤로가기 처리를 정리했습니다.',
			summary:
				'오래된 Android 하이브리드 앱의 빌드 환경을 정비하고, 권한·파일 처리·WebView 브리지·로그인·초기 동기화에서 발생한 문제를 나눠 수정했습니다.',
			impact: [
				{
					value: '빌드 기준선 복구',
					label: 'Gradle/AGP/JDK/SDK',
					detail: '빌드 도구 변경과 target SDK·런타임 동작 변경을 분리',
				},
				{
					value: '호환성 경계',
					label: 'OS별 분기',
					detail: '권한, 파일 URI, 뒤로가기 API, 서비스 호출을 공통 헬퍼로 분리',
				},
			],
			problem:
				'구형 Gradle·AGP가 최신 개발 환경과 맞지 않았습니다. SDK를 변경할 때는 파일 접근, 권한, 서비스 호출과 뒤로가기 처리 때문에 구형 OS나 WebView에서 기존 기능이 깨질 수 있었습니다.',
			thinking: [
				'빌드 성공과 런타임 호환성을 같은 완료 조건으로 취급하지 않았습니다.',
				'최신 API 참조와 OS별 권한·파일 처리를 공통 호환성 헬퍼로 분리했습니다.',
				'로그인, 초기 동기화, WebView 화면 이동과 브리지 오류를 구분해 처리했습니다.',
			],
			process: [
				'Gradle, AGP, JDK, compile SDK의 호환 버전과 모듈 namespace 설정을 맞췄습니다.',
				'content URI, FileProvider, Bluetooth 권한과 스캐너·서비스 실행 조건을 OS 정책에 맞춰 점검했습니다.',
				'브리지의 빈 응답과 오류, 비동기 작업 종료, 로그인·초기 동기화 실패를 나눠 원인을 찾았습니다.',
			],
			solution: [
				'기존 support 라이브러리를 전면 교체하지 않고도 앱을 컴파일할 수 있도록 수정했습니다.',
				'최신 뒤로가기 API 참조와 OS별 파일·권한 처리를 헬퍼 안으로 옮겼습니다.',
				'WebView 브리지 응답과 비동기 오류 형식을 통일하고, 장비나 외부 기능이 실패해도 앱 전체가 종료되지 않도록 대체 처리를 마련했습니다.',
			],
			checks: [
				'빌드·호환성 헬퍼·브리지 오류 처리를 검사했습니다. 구형 OS 전체의 실기기 호환성을 확인한 범위는 아닙니다.',
			],
		},
		{
			workstreamId: 'WS02',
			id: 'field-terminal-android',
			title: '현장 단말 Android 앱',
			platform: 'Android',
			area: '빌드 복구 / 현장 입력',
			period: '2026.03 ~ 2026.04',
			role: '유지보수/빌드 복구',
			workType: '유지보수',
			stack: ['Android Java', 'Gradle/AGP', 'Scanner SDK'],
			headline:
				'운영 서명 없이도 개발 빌드가 가능하도록 현장 단말 앱의 빌드 환경을 복구했습니다.',
			summary:
				'현장 단말에서 쓰이는 Android 앱의 빌드와 런타임 흐름을 복구했습니다. 빌드 도구, 서명, 로그인, 초기 데이터, 스캔 입력을 나눠 확인했습니다.',
			impact: [
				{
					value: '빌드 복구',
					label: 'Gradle/JDK 정리',
					detail: '운영 서명 유무와 개발 빌드 경로 분리',
				},
				{
					value: '현장 입력',
					label: '스캔/장비 흐름',
					detail: '로그인, 초기 동기화, 입력 흐름을 나눠 확인',
				},
			],
			problem:
				'운영 서명이나 오래된 빌드 조건이 맞지 않으면 개발자가 기능을 확인하기 전부터 막힐 수 있고, 에뮬레이터에서 동작하던 기능도 실제 단말에서는 입력 시점에 따라 실패할 수 있었습니다.',
			thinking: [
				'운영 배포 조건과 로컬 개발 빌드 가능 여부를 분리했습니다.',
				'빌드 도구 최신화와 런타임 동작 변경을 같은 문제로 묶지 않았습니다.',
			],
			process: [
				'Gradle, JDK, SDK, 서명 조건을 나눠 빌드 실패 원인을 좁혔습니다.',
				'로그인, 초기 데이터, 스캔 입력 흐름을 별도 단계로 확인했습니다.',
			],
			solution: [
				'운영 서명이 없어도 개발 빌드가 막히지 않도록 조건을 분리했습니다.',
			],
			checks: [
				'개발/운영 빌드 경로와 주요 진입 흐름을 확인했습니다.',
				'스캔 입력과 초기 데이터 흐름을 단계별로 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS04',
			id: 'structured-editor-ui',
			title: '구조화된 차트 편집 UI',
			platform: 'Web',
			area: '시각화 / 편집 UI',
			period: '2026.03 ~ 2026.04',
			role: '편집 파트 구축',
			workType: '신규 개발',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'Chart.js',
				'WebGL/GLSL (OpenGL 계열)',
				'OGL (WebGL 라이브러리)',
				'MSW',
				'Vitest',
			],
			headline:
				'차트별 설정과 데이터 연결을 구현하고, 변경한 내용이 미리보기에 반영되도록 상태를 연결했습니다.',
			summary:
				'Chart.js 미리보기와 차트 종류별 설정 패널을 만들었습니다. 데이터 필드 연결과 드래그 조작을 구현하고 설정값이 미리보기에 반영되도록 연결했습니다.',
			impact: [
				{
					value: '차트별 설정',
					label: '6개 영역의 편집 패널',
					detail: '선택한 차트에 유효한 옵션과 데이터 역할 제공',
				},
				{
					value: '미리보기 동기화',
					label: '설정과 렌더링 상태',
					detail: '데이터 필드와 설정값을 Chart.js 미리보기에 연결',
				},
			],
			problem:
				'모든 차트에 같은 설정을 보여 주면 유효하지 않은 옵션까지 노출됐습니다. 설정과 미리보기 상태가 따로 움직이거나 변경 때마다 차트를 다시 만들면 편집 결과를 확인하기 어려웠습니다.',
			thinking: [
				'차트 종류별로 사용할 수 있는 설정만 노출하고 데이터 필드의 역할을 명시했습니다.',
				'설정 상태와 렌더러의 생명주기를 분리해 값 변경마다 미리보기가 다시 생성되지 않도록 했습니다.',
			],
			process: [
				'데이터 선택, 필드 연결, 차트 선택과 설정 패널을 하나의 편집 화면으로 구성했습니다.',
				'차트 방향과 표시 밀도를 바꿀 수 있게 하고 데이터가 많을 때 스크롤과 한 화면 맞춤을 선택하도록 했습니다.',
				'도움말과 드래그 중 표시를 별도 레이어에 두고 로딩·빈 상태·오류를 구분했습니다.',
				'WebGL/GLSL 프래그먼트 셰이더와 OGL로 편집 화면의 배경 모드를 구현했습니다.',
			],
			solution: [
				'6개 영역의 설정 패널과 Chart.js 미리보기를 연결했습니다.',
				'혼합 차트의 불필요한 재생성 조건을 줄여 미리보기 깜빡임과 스크롤 흔들림을 완화했습니다.',
			],
			checks: [
				'차트 종류·옵션 변경, 패널 접기, 필드 드래그와 도움말 표시를 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS08',
			id: 'hybrid-security-boundary',
			title: '하이브리드 외부 연동 기능 확장',
			platform: 'Hybrid',
			area: 'Server Proxy / WebView QA',
			period: '2026.06',
			role: '외부 연동/WebView QA',
			workType: '기능 확장',
			stack: ['Android', 'Cordova', 'Spring MVC', 'jQuery', 'Java'],
			headline:
				'외부 API 인증 정보를 서버 프록시로 옮기고 하이브리드 앱의 파일 입력을 보완했습니다.',
			summary:
				'하이브리드 앱의 외부 API 응답 형식을 정리하고, 이미지 입력과 파일 선택, 화면 이동 및 브리지 처리를 보완했습니다.',
			impact: [
				{
					value: 'server-side proxy',
					label: '인증 정보 경계',
					detail: '외부 API 호출과 인증 정보 관리를 서버로 분리',
				},
			],
			problem:
				'외부 인증 정보가 Android APK나 브라우저 JavaScript에 들어가면 노출될 수 있고, 외부 응답 전체를 화면에 전달하면 불필요한 원문 데이터가 섞일 수 있었습니다.',
			thinking: [
				'외부 API 조회는 서버 프록시에서 처리하도록 했습니다.',
				'클라이언트에는 화면에 필요한 결과와 상태만 전달하도록 응답을 구성했습니다.',
			],
			process: [
				'클라이언트 입력부터 서버 프록시 호출, 외부 응답, 화면 표시까지 단계별로 나눠 처리했습니다.',
				'WebView의 파일 선택은 입력 경로별로 에뮬레이터와 실기기에서 확인했습니다.',
			],
			solution: [
				'외부 API를 서버에서 호출하고 화면에는 필요한 결과와 상태만 반환하도록 했습니다.',
				'이미지 입력 경로와 네이티브 파일 선택 결과를 WebView에 연결했습니다.',
			],
			checks: [
				'문서와 예시 설정에 실제 인증 정보가 포함되지 않았는지 확인했습니다.',
				'에뮬레이터와 실기기에서 화면 이동, 파일 선택, 탭 동기화와 브리지 동작을 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS03',
			id: 'react-admin-state-migration',
			title: '주식 업무 관리 웹',
			platform: 'Web',
			area: '주식 업무 / 관리 화면',
			period: '2026.02 ~ 2026.03',
			role: '프론트엔드 전체 구축 / MSW 모의 API',
			workType: '프론트엔드 신규 구축',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'Zustand',
				'MSW',
			],
			headline:
				'주식 업무 관리 웹의 React 프론트엔드 전체를 만들고 MSW로 화면 개발에 필요한 응답을 구성했습니다.',
			summary:
				'목록·검색·등록·수정 화면과 공통 테이블·모달을 구현했습니다. MSW 모의 응답으로 로딩과 빈 결과를 구성하고, 컬럼 고정·리사이즈·재정렬과 선택 상태를 다뤘습니다.',
			impact: [
				{
					value: '공통 테이블 조작',
					label: '고정·리사이즈·재정렬',
					detail: '여러 업무 화면에서 같은 컬럼 조작과 상태 표시 사용',
				},
				{
					value: 'MSW 모의 응답',
					label: '프론트엔드 개발 환경',
					detail: '실제 백엔드 연결 없이 데이터와 화면 상태 구성',
				},
			],
			problem:
				'목록·검색·상세·등록·수정 화면을 새로 만들어야 했습니다. 실제 백엔드에 연결하지 않은 상태에서 MSW로 응답을 구성하고, 여러 화면의 테이블과 모달을 공통으로 사용할 수 있게 만들었습니다.',
			thinking: [
				'컬럼 조작·필터·모달은 공통 컴포넌트로 만들고, 화면마다 필요한 컬럼과 동작을 따로 정의했습니다.',
				'MSW의 모의 응답을 TanStack Query로 다루고, 선택한 항목과 모달의 열림 상태는 별도로 관리했습니다.',
			],
			process: [
				'컬럼 재정렬·고정·리사이즈와 행 선택 기능을 공통 테이블에 구현했습니다.',
				'MSW로 목록과 상세 응답을 구성하며 로딩·빈 결과 등 화면 상태를 확인했습니다.',
				'종목 검색 모달과 주문 목록에 다음 결과를 이어서 표시하는 화면을 구현했습니다.',
			],
			solution: [
				'React와 TypeScript로 프론트엔드 전체를 구축하고 공통 테이블·필터·모달을 여러 화면에서 사용했습니다.',
				'MSW로 개발용 응답을 구성해 화면 데이터와 사용자 조작 상태를 다뤘습니다.',
			],
			checks: [
				'MSW 모의 응답을 사용하는 로컬 환경에서 컬럼 조작, 스크롤, 검색 모달과 화면 상태를 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS14',
			id: 'multi-role-hybrid-platform',
			title: '회원·문의 관리 솔루션',
			platform: 'Web / Android',
			area: '회원·문의 / 개인정보·첨부',
			period: '2026.09',
			role: '레거시 웹·앱 기능 확장',
			workType: '기능 확장 / 유지보수',
			stack: [
				'Spring MVC',
				'Java',
				'MyBatis',
				'Vue 2',
				'MariaDB',
				'Android',
				'Kotlin',
			],
			headline:
				'역할별 회원의 정보 편집과 문의·첨부를 기존 웹과 Android 앱에 연결했습니다.',
			summary:
				'회원 검색·정보 수정·중복 회원 통합과 문의·첨부 기능을 개발했습니다. 작성자와 역할별로 접근을 제한하고 Android 앱에 파일 선택과 이미지 확대 기능을 연결했습니다.',
			problem:
				'역할이 다른 회원은 같은 식별값을 가질 수 있었고, 암호화 적용 뒤 기존 문자열 검색도 그대로 사용할 수 없었습니다. 웹에 파일 입력이 있어도 설치된 앱에 선택기가 연결되어 있지 않으면 첨부할 수 없었습니다.',
			thinking: [
				'사용자 역할과 자료 소유권을 서버에서 확인하고, 문의·답변·첨부에 같은 접근 조건을 적용했습니다.',
				'기존 암호화 저장을 유지하며 후보 제한·복호화·정규화 비교를 나눴습니다.',
				'공통 팝업 로더는 유지하고 준비·실패·닫기와 늦은 응답 처리를 기능별 인스턴스에 한정했습니다.',
			],
			process: [
				'저장 성공과 부모 화면 갱신을 분리해 알림을 빨리 닫거나 응답이 늦어도 이전 값이 남지 않도록 했습니다.',
				'Android 파일 선택의 취소·재선택과 작성 중 뒤로가기 처리를 연결했습니다.',
			],
			solution: [
				'본인 정보의 선택 필드만 변경하고 중복 후보·권한·저장 후 재조회 결과를 검사했습니다.',
				'회원 문의와 완료 답변의 이미지 미리보기에 기존 첨부 권한을 공유했습니다.',
				'Android WebView에 파일 선택 결과를 연결하고 플랫폼별 지원 범위를 구분했습니다.',
			],
			impact: [
				{
					value: '회원 정보 보존',
					label: '정보 통합·편집',
					detail: '격리 DB에서 실패 취소와 동시 요청 확인',
				},
				{
					value: '작성자·역할별 접근',
					label: '문의·답변·첨부',
					detail: '역할과 작성자 소유권을 함께 확인',
				},
			],
			checks: [
				'격리 MariaDB에서 회원 통합의 정보 보존, 실패 시 되돌림과 동시 요청을 확인했습니다.',
				'문의·첨부 동작은 브라우저와 Android 실기기에서 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS15',
			id: 'operations-admin-web',
			title: '회원 정보 조회와 관리자 문의 처리',
			platform: 'Web',
			area: '회원 정보 조회 / 관리자 문의·답변 처리',
			period: '2026.09',
			role: '기존 솔루션 관리 기능 개발·개선',
			workType: '솔루션 기능 확장·개선',
			stack: ['Java', 'Spring MVC', 'MyBatis', 'Vue 2', 'jQuery', 'MariaDB'],
			headline:
				'회원·문의 관리 솔루션의 관리자 화면에서 회원 정보를 검색하고, 문의에 답변과 파일을 첨부하는 기능을 개발·개선했습니다.',
			summary:
				'관리자가 회원 정보를 검색할 때 결과 누락과 건수 불일치가 없도록 조회 순서를 고쳤습니다. 문의에 답변하고 파일을 첨부하는 기능에서는 저장 실패에 따른 파일 정리와 답변 알림 처리를 보완했습니다.',
			problem:
				'관리자 화면에서 회원 정보를 검색하고, 회원이 남긴 문의에 답변해야 했습니다. 검색 결과와 전체 건수가 맞아야 했고, 파일 첨부나 답변 알림에 실패해도 저장된 답변이 사라지지 않도록 처리해야 했습니다.',
			thinking: [
				'후보 제한 뒤 복호화·검색·정렬·건수 계산·페이징 순서로 처리하고, 사용자가 제출한 조건으로만 조회했습니다.',
				'답변 저장과 파일 정리, 후속 알림의 확정 시점을 나눴습니다.',
			],
			process: [
				'검색 전·초기화·재진입에는 민감 목록을 비워 두고, 페이지 이동은 마지막 제출 조건을 사용하도록 했습니다.',
				'같은 데이터 기준으로 검색 결과의 정렬 순서와 전체 건수, 암호화 필드 처리를 대조했습니다.',
			],
			solution: [
				'열람 기록 저장 성공 뒤 허용 필드만 반환하고 늦은 조회 응답과 인증 거절 때 목록을 정리했습니다.',
				'답변 저장 전 행 잠금과 충돌 검사를 적용하고, DB 실패 시 새 파일을 정리하며 기존 파일 삭제는 확정 뒤 수행했습니다.',
				'업무 저장을 먼저 확정하고 알림은 별도 트랜잭션에서 등록해 큐 실패가 답변을 지우지 않도록 했습니다.',
			],
			impact: [
				{
					value: '검색 후 페이징',
					label: '암호화 정보 조회',
					detail: '조건·정렬·건수를 같은 결과 집합에서 계산',
				},
				{
					value: '실패 단계 분리',
					label: '답변·파일·알림',
					detail: '저장된 답변과 파일 교체·큐 등록 결과를 구분',
				},
			],
			checks: [
				'검색 조건 유지와 초기화, 답변·파일 접근 권한, 동시 저장을 개발·격리 환경에서 확인했습니다. 운영 배포 전 구현입니다.',
			],
		},
		{
			workstreamId: 'WS12',
			id: 'legacy-support-web',
			title: '레거시 고객지원 웹',
			platform: 'Web',
			area: 'Excel / 오류 진단·성능 분석',
			period: '2026.05 ~ 2026.08',
			role: '장애 조사 / 오류 처리 개선',
			workType: '유지보수',
			stack: ['Java', 'Spring MVC', 'JSP', 'MyBatis', 'jQuery', 'Apache POI'],
			headline:
				'같은 시간 초과 안내로 가려졌던 파일 파싱·입력 검증·통신 실패를 분리했습니다.',
			summary:
				'Excel 업로드 오류를 파일 분석·입력 검증·통신 단계별로 구분해 표시했습니다. 대량 업로드의 행별 DB 조회 비용을 조사했고, 긴 인라인 이미지 때문에 정규식 처리가 오래 걸리던 부분을 수정했습니다.',
			problem:
				'모든 Ajax 실패가 같은 문구로 표시돼 입력 오류와 통신 장애를 구분하기 어려웠습니다. 대량 입력은 행별 DB 조회와 응답 크기가 늘어나 작은 파일의 성공만으로 안전성을 판단할 수 없었습니다.',
			thinking: [
				'파싱 성공, HTTP 성공, 업무상 등록 가능을 각각 확인했습니다.',
				'오류 정보는 다음 조사에 필요한 항목만 보여 주고 내부 HTML과 예외 원문은 노출하지 않았습니다.',
				'입력 행 수에 따라 DB 호출과 메모리가 늘어나는 지점을 조사했습니다.',
			],
			process: [
				'행마다 반복되는 중복 검사 쿼리와 인덱스 전체 스캔을 확인했습니다. 입력 제한과 일괄 조회를 개선안으로 제안했습니다.',
				'긴 인라인 이미지에서는 속성 추출과 허용 경로 검증을 분리하고 비대상 이미지는 대체 이미지로 처리했습니다.',
			],
			solution: [
				'파일 분석과 등록 단계에서 HTTP 오류, 입력 검증 실패, 시간 초과, 취소와 응답 해석 오류를 구분하고 경과 시간을 기록했습니다.',
				'안전한 서버 메시지만 이스케이프해 표시하고 나머지는 오류 유형별 안내로 바꿨습니다.',
				'이미지 태그 속성을 먼저 추출한 뒤 허용 경로만 썸네일 변환에 넘겼습니다.',
			],
			impact: [
				{
					value: '실패 단계 구분',
					label: '업로드 진단',
					detail: '입력·통신·응답 해석 오류를 같은 시간 초과로 처리하지 않음',
				},
				{
					value: '원인 후보 분리',
					label: '대량 입력 분석',
					detail: '행별 조회·실행계획·메모리와 응답 크기를 조사',
				},
			],
			checks: [
				'오류 안내는 로컬 화면과 빌드까지 확인한 배포 전 변경입니다.',
				'행 수에 따른 중복 검사 쿼리 증가를 확인했으며, 일괄 조회는 분석과 개선안 제안 범위입니다.',
			],
		},
	],
	en: [
		{
			workstreamId: 'WS13',
			id: 'settlement-operations-platform',
			title: 'Settlement ERP Platform',
			platform: 'Web / API',
			area: 'Editable tables and Excel imports / Billing and settlement history',
			period: '2026.07 ~ 2026.09',
			role: 'Frontend, API and database development',
			workType: 'New development',
			stack: [
				'React',
				'TypeScript',
				'Tailwind CSS',
				'Vite',
				'React Router',
				'Zustand',
				'Spring Boot',
				'MyBatis',
				'MariaDB',
				'Vitest',
			],
			headline:
				'Handled development across the React frontend, Spring Boot APIs and database processing, from data entry through settlement.',
			summary:
				'Implemented shared tables with keyboard navigation and draft preservation after failed saves. Built Excel preview, editing, validation and batch import, retaining historical settlement amounts when assignments change.',
			problem:
				'Users needed to edit an Excel preview and retry a save without creating duplicates or saving only some rows. Changing an assignment also needed to leave previously approved settlements intact.',
			thinking: [
				'Kept the complete reviewed data on the server and rechecked permissions and referenced records at confirmation so the saved data matched what the user had reviewed.',
				'Saved each batch in one transaction. A failure rolls back the batch; retrying the same request returns its original result.',
				'Stored current assignments separately from the recipient recorded on each transaction. Unresolved allocations block settlement closing instead of being assigned automatically.',
			],
			process: [
				'Added server-side checks for menu access and create/update permissions.',
				'Fetched charges and allocations in batches and preloaded records needed for monthly closing.',
				'Implemented audit records for business changes and login results, with lookup restricted to authorized administrators.',
			],
			solution: [
				'Built shared tables with inline editing, selection dialogs and keyboard navigation, retaining drafts when a save fails.',
				'Built Excel preview, editing, revalidation and import screens and APIs, including duplicate and partial-save handling.',
				'Allocated billed amounts to settlements and retained historical amounts and the specifications originally recorded for insurance and inspections.',
			],
			impact: [
				{
					value: 'Draft preservation',
					label: 'Shared editable tables',
					detail:
						'Inline editing, selection dialogs, keyboard navigation and failed-save handling',
				},
				{
					value: 'No duplicate or partial imports',
					label: 'Excel batch import',
					detail: 'Roll back failed batches and return the original result on retry',
				},
				{
					value: 'Settlement history retained',
					label: 'Assignment changes',
					detail:
						'Separate current assignments from original recipients and amounts',
				},
			],
			checks: [
				'Verified rollback and duplicate prevention for concurrent confirmation and retries in isolated MariaDB.',
				'Checked that historical settlement amounts remained unchanged after assignment changes in the development database. Deployment for this case was limited to development.',
			],
		},
		{
			workstreamId: 'WS11',
			id: 'mobile-operations-platform',
			title: 'Mobile Operations Platform',
			platform: 'Web / Android',
			area: 'Map workflows / Offline recovery',
			period: '2026.08',
			role: 'Maintenance of existing web, app and API features',
			workType: 'Maintenance',
			stack: [
				'React',
				'TypeScript',
				'React Native',
				'Expo',
				'Spring Boot',
				'SQLite',
			],
			headline:
				'Maintained map screens and offline storage and retry features in an existing mobile operations app.',
			summary:
				'Updated the React screens, React Native app and Spring Boot APIs. Fixed map selection and return behavior and restored pending requests after an app restart.',
			problem:
				'A lost connection or app restart could discard entered data and pending requests. Requests belonging to a previous account also needed to stay unsent when another user logged in.',
			thinking: [
				'Persisted confirmed intent before beginning transmission.',
				'Matched queued requests to the signed-in user and checked existing server results before retrying.',
				'Separated initial map selection from return state, and called new native capabilities only after checking support.',
			],
			process: [
				'Kept map group numbers stable across filters and returned users to their previous map position after processing selected work.',
				'Distinguished location permission, disabled services, and timeouts; older shells retained the browser location path.',
				'Restored user identity and pending requests before starting transmission, including a migration path for existing signed-in sessions.',
			],
			solution: [
				'Persisted relationship lists, confirmed requests, and selected photos through bridge storage, serializing writes before sending.',
				'Reconciled queued requests with completed server results and left conflicts, business errors, and photo recovery failures for manual review.',
				'Connected map return behavior, native location capability checks, and matching recipient and optional-attachment rules on web and server.',
			],
			impact: [
				{
					value: 'Restored after restart',
					label: 'Pending requests',
					detail: 'Keep entered data and selected photos in app storage',
				},
				{
					value: 'Retry by signed-in user',
					label: 'Connection recovery',
					detail:
						'Match the current user and compare requests with completed server records',
				},
				{
					value: 'Older app compatibility',
					label: 'Location lookup',
					detail:
						'Use the existing web method when the new native feature is unavailable',
				},
			],
			checks: [
				'Verified saving while offline, restoring after restart and server updates after reconnection on an Android device.',
				'Duplicate-send investigation remained in progress.',
			],
		},
		{
			workstreamId: 'WS07',
			id: 'delivery-operations-web',
			title: 'Logistics Operations Web',
			platform: 'Web',
			area: 'Operations / Performance',
			period: '2026.04 ~ 2026.06',
			role: 'Build and stabilization',
			workType: 'Build',
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
				'Built React and TypeScript screens covering lookup, booking, Excel imports and label printing.',
			summary:
				'Created shared tables, forms and modals and connected API responses to screen and print flows. Lazy-loaded pages and Excel code to reduce the initial JavaScript entry by about 74%.',
			impact: [
				{
					presentation: 'measurement',
					value: '2,405.50 → 616.59 kB',
					label: 'Initial JavaScript entry',
					detail: 'About 74% smaller on the same build basis',
				},
				{
					presentation: 'measurement',
					value: '815.10 → 204.38 kB',
					label: 'Gzip-compressed size',
					detail: 'About 75% smaller for the same initial entry',
				},
			],
			problem:
				'Lookup, booking, Excel imports and printing needed shared UI and API integration. Pages and spreadsheet libraries that were not needed at startup were included in a large initial JavaScript entry.',
			thinking: [
				'Separated fetched data, input state and print requests, using shared tables, forms and modals.',
				'Used bundle analysis to identify large dependencies and load pages and spreadsheet libraries on demand.',
				'Separated browser printing from the native printing path used by the mobile WebView.',
			],
			process: [
				'Separated mock data from API integration to implement loading, empty and error states.',
				'Displayed multiple label numbers in lists and modals and converted API responses into preview and print requests.',
				'Did not adopt the experiment that also split shared authentication and initialization code: it added initialization and first-interaction loading boundaries. Kept page and Excel-code splitting.',
			],
			solution: [
				'Built booking, batch processing, address selection and Excel previews on shared tables, forms and modals.',
				'Split pages with React.lazy and loaded spreadsheet libraries when import or export actions started.',
				'Converted booking identifiers and multiple-label responses into data for desktop and mobile printing.',
			],
			checks: [
				'These figures compare the size of the initial JavaScript entry on the same build basis.',
				'Checked navigation, fetching, Excel processing and desktop label printing after introducing lazy loading.',
			],
		},
		{
			workstreamId: 'WS10',
			id: 'hybrid-life-info-platform',
			title: 'Hybrid Life Information Service',
			platform: 'Hybrid',
			area: 'Legacy Web / Android WebView / Operations',
			period: '2026.06 ~ 2026.07',
			role: 'Maintenance and production rollout',
			workType: 'Maintenance',
			stack: ['Spring MVC', 'JSP', 'jQuery', 'Java', 'Android'],
			headline:
				'Improved loading order and caching so core information appears before slower external API responses.',
			summary:
				'Maintained the existing web and Android WebView service across screen loading, external APIs, server caching and location lookup. Separated core and supplementary requests, with limited stale-cache fallback when external requests fail.',
			impact: [
				{
					value: 'Core information first',
					label: 'Screen loading',
					detail: 'Separated from slower supplementary requests',
				},
				{
					value: 'Cache reuse',
					label: 'External API responses',
					detail: 'Reuse valid responses and allow limited stale values on failure',
				},
			],
			problem:
				'Multiple external APIs and reference-data lookups were tied to one request, so one slow section could delay the whole screen. File-level rollout also required missing-file and exposed-setting checks.',
			thinking: [
				'Separated immediately visible core information from secondary information that could load later.',
				'Split fresh and stale cache so limited fallback could be shown when external APIs failed.',
			],
			process: [
				'Separated external API and location requests to match the order of information shown on screen.',
				'Replaced reference-data cache entries after temporary storage and required-field validation.',
				'The cache was scoped to JVM memory in a single Tomcat instance.',
			],
			solution: [
				'Built a core-first loading model with section-specific cache rules.',
				'Prepared reference data as server cache with temporary-save, validation, and replace flow.',
				'Used native location first in Android WebView, then stored location and browser fallback.',
			],
			checks: [
				'Checked initial lookup, cache reuse and stale-value fallback on API failure, then deployed the changes to production.',
			],
		},
		{
			workstreamId: 'WS06',
			id: 'ai-kickoff-documentation-tool',
			title: 'AI-assisted Project Documentation Tool',
			platform: 'Tooling',
			area: 'AI API / developer productivity',
			period: '2026.04',
			role: 'Internal tool build',
			workType: 'Internal tool',
			stack: ['Node.js', 'TypeScript', 'React', 'AI API', 'xlsx', 'Vitest'],
			headline:
				'Built an AI-assisted tool for drafting documents from repository material and reviewing them in editable tables.',
			summary:
				'Let users review repository scan results before generating requirements, feature and screen documents. Drafts can be edited as tables, with selected sheets and cells rewritten while reviewed content is preserved.',
			impact: [
				{
					value: 'Scan → Preview',
					label: 'generation input',
					detail: 'AI draft after rule-based scanning',
				},
				{
					value: 'xlsx workbook',
					label: 'reviewable output',
					detail: 'requirements, features, and screens reviewed as tables',
				},
				{
					value: 'Selected cell revision',
					label: 'partial rewrite',
					detail: 'rewrite scope reduced to selected sheet/cell context',
				},
			],
			problem:
				'Passing unstructured material directly to a model can mix checked source material with guesses, and small revisions can cause the whole artifact to drift.',
			thinking: [
				'Collected rule-based scanner output before AI generation.',
				'Used workbook JSON as the central model and treated markdown/export as derived output.',
				'Kept automation at draft generation while preserving human review through table-based editing.',
			],
			process: [
				'Showed scan results as a preview before asking the user to rely on generated documents.',
				'Split generated output into workbook sheets instead of leaving it as one long text block.',
				'Scoped revisions to the selected sheet/cell context instead of regenerating the whole artifact.',
				'Separated fields AI could organize from decisions reserved for the user and suppressed unsupported placeholders.',
			],
			solution: [
				'Connected source scanning, generation previews, table editing and export in one workflow.',
				'Made requirement, functional, and screen documents reviewable as workbook-style tables.',
				'Sent target sheet/cell and preservation context together for revision requests.',
			],
			checks: [
				'Checked that revising selected sheets and cells preserved other content and that successful documents remained available after partial generation failures.',
			],
		},
		{
			workstreamId: 'WS05',
			id: 'mobile-output-bridge',
			title: 'Mobile Output Bridge App',
			platform: 'Mobile',
			area: 'WebView / Android native module',
			period: '2026.04 ~ 2026.06',
			role: 'Build and output integration',
			workType: 'Build',
			stack: [
				'Expo',
				'React Native',
				'Expo Router',
				'WebView',
				'Android native module',
				'TypeScript',
				'Bluetooth',
			],
			headline:
				'Connected a mobile output path through WebView and an Android native module.',
			summary:
				'The app kept the business screen in WebView while moving device-specific output responsibilities into a native module boundary.',
			impact: [
				{
					value: 'WebView → native',
					label: 'output boundary',
					detail: 'web payload separated from device output commands',
				},
				{
					value: 'real device check',
					label: 'device output',
					detail: 'verified against Android device behavior, not only emulator flow',
				},
			],
			problem:
				'Sending a print/output request from a web button is different from making the physical mobile device complete it. WebView, permission, native module, and device state needed separate failure boundaries.',
			thinking: [
				'Kept the business screen in the web layer and moved device-facing output into the native module.',
				'Handled WebView bridge requests and native responses as structured contracts.',
			],
			process: [
				'Defined the boundary that converts web output data into a native output payload.',
				'Checked Bluetooth permission, device lookup, connection state, and output command stages.',
				'Separated local development, test install, and production install conditions.',
				"Traced the SDK's internal device-discovery call on Android 16/API 36 and added cancellation plus BLUETOOTH_SCAN and BLUETOOTH_CONNECT handling.",
			],
			solution: [
				'Organized the request/response path between the WebView bridge and Android native module.',
				'Separated payload conversion, device-state checks, and failure messaging.',
				'Kept mobile browser fallback distinct from app WebView output.',
			],
			checks: [
				'Verified permission requests, Bluetooth connection and physical label output on an Android 16 / API 36 device.',
			],
		},
		{
			workstreamId: 'WS01',
			id: 'legacy-mobile-compatibility',
			title: 'Legacy Mobile App Compatibility',
			platform: 'Android / Hybrid',
			area: 'Build chain / OS compatibility / WebView',
			period: '2026.03',
			role: 'Compatibility stabilization and regression isolation',
			workType: 'Maintenance',
			stack: ['Android Java', 'Gradle/AGP', 'RxJava', 'FileProvider'],
			headline:
				'Restored builds for a legacy Android app and organized OS-specific permissions, file handling and back navigation.',
			summary:
				'Stabilized an older Android hybrid app by treating the build chain, permissions and files, WebView bridge, login, and initial synchronization as separate failure boundaries.',
			impact: [
				{
					value: 'build baseline restored',
					label: 'Gradle/AGP/JDK/SDK',
					detail:
						'build-tool changes separated from target SDK and runtime behavior',
				},
				{
					value: 'compatibility boundary',
					label: 'OS-specific behavior',
					detail:
						'permission, file URI, back API, and service calls isolated in helpers',
				},
			],
			problem:
				'The legacy Gradle and AGP setup no longer matched current development tools, while applying current SDK policies directly could introduce separate regressions in file access, permissions, services, back APIs, older OS entry, and WebView flows.',
			thinking: [
				'Did not treat a successful build and runtime compatibility as the same completion criterion.',
				'Kept modern API types and OS-specific permission or file behavior behind compatibility helpers instead of repeating checks in screens.',
				'Separated login, initial synchronization, WebView navigation, and bridge errors into distinct failure channels.',
			],
			process: [
				'Aligned Gradle, AGP, JDK, compile SDK, and module namespaces in stages.',
				'Checked content URI, FileProvider, Bluetooth permission, scanner, and service-start conditions against OS policy changes.',
				'Separated bridge null/error responses, asynchronous cleanup, login failures, and initial synchronization failures when narrowing regressions.',
			],
			solution: [
				'Restored a compilable baseline without rewriting all remaining legacy support dependencies.',
				'Encapsulated direct modern back-API references and file or permission branches inside helpers.',
				'Normalized WebView bridge responses and asynchronous errors, with fallbacks that kept optional device or external-function failures from terminating the whole app.',
			],
			checks: [
				'Checked builds, compatibility helpers and bridge error handling; physical-device compatibility across all older OS versions was not established.',
			],
		},
		{
			workstreamId: 'WS02',
			id: 'field-terminal-android',
			title: 'Field Terminal Android App',
			platform: 'Android',
			area: 'Build recovery / field input',
			period: '2026.03 ~ 2026.04',
			role: 'Maintenance and build recovery',
			workType: 'Maintenance',
			stack: ['Android Java', 'Gradle/AGP', 'Scanner SDK'],
			headline:
				'Restored the field-terminal app build so development builds could run without production signing credentials.',
			summary:
				'Recovered build and runtime flows for an Android app used on field devices, separating build tools, signing, login, initial data, and scan input checks.',
			impact: [
				{
					value: 'build recovery',
					label: 'Gradle/JDK cleanup',
					detail: 'development build path separated from operational signing',
				},
				{
					value: 'field input',
					label: 'scan/device flow',
					detail: 'login, initial sync, and input stages checked separately',
				},
			],
			problem:
				'When operational signing or old build assumptions block local builds, developers cannot verify features. Emulator-passing flows can also fail on field devices because of input timing.',
			thinking: [
				'Separated deployment signing conditions from whether local development builds could run.',
				'Avoided treating build-tool updates and runtime behavior changes as one issue.',
			],
			process: [
				'Narrowed build failures by Gradle, JDK, SDK, and signing condition.',
				'Checked login, initial data, and scan input as separate stages.',
			],
			solution: [
				'Separated signing conditions so development builds did not stop before verification.',
			],
			checks: [
				'Checked development and production build paths with the main entry flow.',
				'Checked scan input and initial data flow by stage.',
			],
		},
		{
			workstreamId: 'WS04',
			id: 'structured-editor-ui',
			title: 'Structured Chart Editing UI',
			platform: 'Web',
			area: 'Visualization / editor UI',
			period: '2026.03 ~ 2026.04',
			role: 'Editor feature implementation',
			workType: 'Build',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'Chart.js',
				'WebGL/GLSL (OpenGL-style)',
				'OGL (WebGL library)',
				'MSW',
				'Vitest',
			],
			headline:
				'Built chart-specific settings and data mapping, connecting editing state to the preview.',
			summary:
				'Built a Chart.js preview and settings panels for each chart type. Implemented field mapping and drag interactions, connecting settings to the preview.',
			impact: [
				{
					value: 'Chart-specific settings',
					label: 'Six settings areas',
					detail: 'Valid options and data roles for the selected chart',
				},
				{
					value: 'Preview synchronization',
					label: 'Editing and rendering state',
					detail: 'Data fields and settings connected to the Chart.js preview',
				},
			],
			problem:
				'A single set of settings exposed invalid options for some chart types. Separate settings and preview state, or recreating charts on each change, made editing results harder to follow.',
			thinking: [
				'Exposed valid settings for each chart type and made data-field roles explicit.',
				'Separated editing state from the renderer lifecycle so value changes did not recreate the preview unnecessarily.',
			],
			process: [
				'Organized data selection, field mapping, chart selection and settings into one editing screen.',
				'Added chart direction and density controls, with scrolling or fit-to-view options for larger datasets.',
				'Placed help and drag feedback in separate layers and distinguished loading, empty and error states.',
				'Implemented editor background modes with WebGL/GLSL fragment shaders and OGL.',
			],
			solution: [
				'Connected six settings areas to the Chart.js preview.',
				'Reduced unnecessary mixed-chart recreation to lessen preview flicker and scroll movement.',
			],
			checks: [
				'Checked chart and option changes, panel collapse, field dragging and help overlays.',
			],
		},
		{
			workstreamId: 'WS08',
			id: 'hybrid-security-boundary',
			title: 'Hybrid External Integration Enhancements',
			platform: 'Hybrid',
			area: 'Server Proxy / WebView QA',
			period: '2026.06',
			role: 'External integration / WebView QA',
			workType: 'Feature extension',
			stack: ['Android', 'Cordova', 'Spring MVC', 'jQuery', 'Java'],
			headline:
				'Moved external API credentials behind a server proxy and improved file input in a hybrid app.',
			summary:
				'Organized the boundary between external integration, response normalization, image input, file picker, routes, and WebView bridge behavior.',
			impact: [
				{
					value: 'server-side proxy',
					label: 'credential boundary',
					detail: 'external integration responsibility kept outside the client',
				},
			],
			problem:
				'Putting external credentials into an Android APK or 브라우저 JavaScript would expose them, and sending full external responses to the UI could leak unnecessary raw data.',
			thinking: [
				'Kept external lookup responsibility inside a server-side proxy.',
				'Returned only the minimum result and state needed by the client UI.',
			],
			process: [
				'Separated client input, server proxy, external response, and displayed result in order.',
				'Checked WebView file chooser behavior by input source across emulator and real device flows.',
			],
			solution: [
				'Called the external API on the server and returned only the results and states needed by the UI.',
				'Connected image input paths and native file-picker results to the WebView.',
			],
			checks: [
				'Checked that real credential values were not present in docs or sample settings.',
				'Checked route, file chooser, tab sync, and bridge flows on emulator and real devices.',
			],
		},
		{
			workstreamId: 'WS03',
			id: 'react-admin-state-migration',
			title: 'Stock Operations Admin Web',
			platform: 'Web',
			area: 'Stock operations / admin screens',
			period: '2026.02 ~ 2026.03',
			role: 'Complete frontend development / MSW mock API',
			workType: 'New frontend build',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'Zustand',
				'MSW',
			],
			headline:
				'Built the complete React frontend for stock operations, using MSW responses for frontend development.',
			summary:
				'Implemented list, search, create and edit screens with shared tables and modals. Used MSW responses for loading and empty states, and built column pinning, resizing, reordering and selection controls.',
			impact: [
				{
					value: 'Shared table controls',
					label: 'Pinning, resizing and reordering',
					detail: 'Consistent column controls and state display across screens',
				},
				{
					value: 'MSW mock responses',
					label: 'Frontend development environment',
					detail:
						'Developed data display and UI state without a real backend connection',
				},
			],
			problem:
				'List, search, detail and editing screens needed a new frontend. Without connecting to a real backend, I supplied responses with MSW and built tables and modals for use across screens.',
			thinking: [
				'Built shared column controls, filters and modals, defining screen-specific columns and actions separately.',
				'Handled MSW mock responses with TanStack Query, keeping selected items and modal visibility separate.',
			],
			process: [
				'Implemented column reordering, pinning, resizing and row selection in a shared table.',
				'Used MSW list and detail responses to check loading, empty and other UI states.',
				'Built stock-search modals and order lists that display subsequent result sets.',
			],
			solution: [
				'Built the complete frontend with React and TypeScript, using shared tables, filters and modals across screens.',
				'Supplied development responses with MSW to implement data display and interaction state.',
			],
			checks: [
				'Checked column controls, scrolling, search modals and UI states locally with MSW mock responses.',
			],
		},
		{
			workstreamId: 'WS14',
			id: 'multi-role-hybrid-platform',
			title: 'Member and Inquiry Management Solution',
			platform: 'Web / Android',
			area: 'Member inquiries / Privacy and attachments',
			period: '2026.09',
			role: 'Legacy web and app feature development',
			workType: 'Feature development / Maintenance',
			stack: [
				'Spring MVC',
				'Java',
				'MyBatis',
				'Vue 2',
				'MariaDB',
				'Android',
				'Kotlin',
			],
			headline:
				'Connected member editing, inquiries, and attachments across existing role-specific websites and Android apps.',
			summary:
				'Built member search, editing, duplicate merging, inquiries and attachments. Added author- and role-based access checks, file selection and image zoom in the Android app.',
			problem:
				'Different member roles could share the same identifier, and existing string searches did not work on randomized ciphertext. A web file input could not open a picker when the installed native shell lacked the connection.',
			thinking: [
				'Checked role and ownership on the server and reused access conditions across inquiries, answers, and attachments.',
				'Preserved encrypted storage while separating candidate filtering, decryption, and normalized comparison.',
				'Kept the shared popup loader intact and handled readiness, failure, closing, and late responses per feature instance.',
			],
			process: [
				'Separated saved data from parent refresh so quick alert dismissal and late responses did not leave stale values.',
				'Connected Android picker cancellation and reselection with draft back-navigation handling.',
			],
			solution: [
				'Limited self-service edits to selected fields and checked duplicates, authority, and post-save values.',
				'Applied existing attachment authorization to previews of inquiry and completed-answer images.',
				'Connected file-picker results to Android WebView and documented platform-specific support.',
			],
			impact: [
				{
					value: 'Member data preserved',
					label: 'Merging and editing',
					detail: 'Check rollback and concurrent requests in an isolated database',
				},
				{
					value: 'Author- and role-based access',
					label: 'Inquiries, answers, and files',
					detail: 'Check member role and author ownership together',
				},
			],
			checks: [
				'Verified member-data preservation, rollback and concurrent requests in isolated MariaDB.',
				'Checked inquiry and attachment behavior in browsers and on Android devices.',
			],
		},
		{
			workstreamId: 'WS15',
			id: 'operations-admin-web',
			title: 'Member Search and Inquiry Administration',
			platform: 'Web',
			area: 'Member search / Inquiry and reply management',
			period: '2026.09',
			role: 'Administration features for an existing solution',
			workType: 'Solution feature development and improvements',
			stack: ['Java', 'Spring MVC', 'MyBatis', 'Vue 2', 'jQuery', 'MariaDB'],
			headline:
				'Developed and improved member search, inquiry replies and file attachments in the administrator interface of the member and inquiry management solution.',
			summary:
				'Fixed the member search order to avoid missing results and incorrect counts. Improved file cleanup after failed reply saves and notification handling for administrator replies.',
			problem:
				'Administrators needed to search member information and reply to member inquiries. Search results and totals had to agree, and failures in file handling or reply notifications must not erase saved replies.',
			thinking: [
				'Applied candidate limits, decryption, filtering, sorting, counting, and pagination in order, using only submitted search conditions.',
				'Separated answer commits, file cleanup, and subsequent notification registration.',
			],
			process: [
				'Kept sensitive lists empty before search, after reset, and on re-entry; pagination used the last submitted conditions.',
				'Compared search ordering, total counts, and encrypted-field handling against the same data snapshot.',
			],
			solution: [
				'Returned permitted fields only after recording access, and cleared lists on rejected authentication or invalidated queries.',
				'Locked inquiry rows and checked concurrent edits before saving answers; cleaned new files on database failure and deleted old files only after commit.',
				'Committed business data before registering notifications in a separate transaction so a queue failure would not erase the answer.',
			],
			impact: [
				{
					value: 'Filter before pagination',
					label: 'Encrypted search',
					detail: 'Derive conditions, ordering, and counts from the same result set',
				},
				{
					value: 'Separate failure stages',
					label: 'Answers, files, and notifications',
					detail: 'Distinguish committed answers from file and queue outcomes',
				},
			],
			checks: [
				'Checked submitted search conditions, reset, answer and file authorization, and concurrent saves in development and isolated environments. These changes had not been deployed to production.',
			],
		},
		{
			workstreamId: 'WS12',
			id: 'legacy-support-web',
			title: 'Legacy Customer Support Web',
			platform: 'Web',
			area: 'Excel / Error and performance diagnosis',
			period: '2026.05 ~ 2026.08',
			role: 'Incident investigation / Error handling',
			workType: 'Maintenance',
			stack: ['Java', 'Spring MVC', 'JSP', 'MyBatis', 'jQuery', 'Apache POI'],
			headline:
				'Separated parsing, validation, and network failures previously hidden behind the same timeout message.',
			summary:
				'Added separate Excel upload messages for parsing, validation and network errors. Investigated per-row database query cost and revised slow regex handling of long inline images.',
			problem:
				'Every Ajax failure used the same message, obscuring input and network errors. Row-by-row queries and response sizes grew with bulk input, so small-file success did not establish safe scaling.',
			thinking: [
				'Checked parsing success, HTTP success, and business validation separately.',
				'Exposed only useful diagnostic fields without internal HTML or raw exceptions.',
				'Investigated how database calls and memory usage grew with the number of input rows.',
			],
			process: [
				'Identified repeated duplicate-check queries and full index scans, then proposed input limits and batched lookups.',
				'Separated image attribute extraction from permitted-path checks and used a fallback for unsupported inline images.',
			],
			solution: [
				'Distinguished HTTP and business errors, timeouts, cancellations, response parsing, and elapsed time for analysis and registration requests.',
				'Escaped safe structured messages and used category-specific guidance for other errors.',
				'Extracted image attributes before passing allowed paths to thumbnail conversion.',
			],
			impact: [
				{
					value: 'Distinct failure stages',
					label: 'Upload diagnostics',
					detail:
						'Do not describe validation, communication, and parsing failures as the same timeout',
				},
				{
					value: 'Separated hypotheses',
					label: 'Bulk-input analysis',
					detail:
						'Investigated row queries, execution plans, memory, and response size',
				},
			],
			checks: [
				'The error-message changes were checked locally and built, but were not yet deployed.',
				'Confirmed that duplicate-check queries increased with row count; batched lookup remained a proposed improvement.',
			],
		},
	],
};
