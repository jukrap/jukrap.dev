import type { Localized } from '@/types/locale';
import type { WorkCaseRecord } from '@/types/work';

export const workCases: Localized<WorkCaseRecord[]> = {
	ko: [
		{
			workstreamId: 'WS13',
			id: 'settlement-operations-platform',
			title: '업무 정산 플랫폼',
			platform: 'Web / API',
			area: '편집표·Excel 등록 / 청구·정산·이력 관리',
			period: '2026.07 ~ 2026.09',
			role: 'React 화면·Spring Boot API 개발',
			workType: '신규 개발',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'Spring Boot',
				'MyBatis',
				'MariaDB',
				'Vitest',
			],
			headline:
				'Excel 대량등록과 청구·정산 관리 화면, Spring Boot API를 개발했습니다.',
			summary:
				'표 안에서 값을 수정하고 Excel 자료를 검토·등록하는 기능을 만들었습니다. 담당 관계가 바뀌어도 이전 거래의 정산 대상과 금액은 유지하도록 데이터 구조를 설계했습니다.',
			problem:
				'Excel 자료를 미리 본 뒤 수정하거나 다시 저장할 수 있어야 했습니다. 이때 일부 행만 등록되거나 같은 자료가 두 번 들어가면 안 됐습니다. 담당 관계 변경이 이미 확정된 정산 금액에 영향을 주지 않도록 이력 관리도 필요했습니다.',
			thinking: [
				'미리보기에서 확인한 전체 자료를 서버에 보관했습니다. 확정할 때 권한과 참조 정보가 바뀌었는지 다시 검사해 화면에서 확인한 자료와 다른 값이 저장되지 않도록 했습니다.',
				'대량등록은 하나의 트랜잭션으로 처리했습니다. 저장 중 실패하면 전체를 되돌리고, 같은 요청을 다시 보내면 처음 저장한 결과를 반환합니다.',
				'현재 담당 관계와 거래 당시의 정산 대상을 별도로 저장했습니다. 어느 대상에 배분할지 불분명한 금액은 자동 처리하지 않고 정산 마감을 막았습니다.',
			],
			process: [
				'메뉴 조회와 등록·수정 권한을 서버에서 검사하도록 했습니다. 조직·소유자별 데이터 격리는 별도 과제로 남아 있습니다.',
				'2026-08-12 개발 검증에서 최대 1,000행의 원천 자료를 최대 4개 SQL로 조회했습니다. 운영 동시 접속 성능을 측정한 값은 아닙니다.',
				'데이터 구조를 바꾸기 전에 백업·복원하고, 전환 전후 기존 업무 값의 해시를 비교한 뒤 개발 환경에 반영했습니다.',
			],
			solution: [
				'인라인 편집, 선택창, 키보드 이동을 공통 표로 구현하고 저장에 실패해도 입력한 초안이 남도록 했습니다.',
				'Excel 미리보기·수정·재검증·등록 화면과 API를 만들고 중복 등록과 일부 행만 저장되는 경우를 처리했습니다.',
				'청구 금액을 정산에 배분하고, 담당 관계나 제원이 변경되어도 기존 정산 금액과 보험·점검의 등록 당시 정보를 유지하도록 했습니다.',
			],
			impact: [
				{
					value: '중복·부분 등록 방지',
					label: 'Excel 대량등록',
					detail: '실패하면 전체 취소하고, 같은 요청의 재시도에는 기존 결과 반환',
				},
				{
					value: '기존 정산 이력 유지',
					label: '담당 관계 변경',
					detail: '현재 담당 관계를 바꿔도 거래 당시 대상과 승인 금액 보존',
				},
				{
					value: '개발 환경 반영',
					label: '데이터 구조 변경',
					detail: '백업·복원과 전환 전후 기존 업무 값 비교',
				},
			],
			checks: [
				'격리 MariaDB에서 저장 중 실패 시 전체 취소, 동시 확정과 재시도 시 중복 등록 차단을 확인했습니다.',
				'개발 DB에서 담당 관계 변경·종료·재개 후에도 과거 정산 금액이 유지되는지 확인했습니다.',
				'개발 환경에 배포한 상태입니다. 일부 최종 화면 검수와 운영 반영은 남아 있으며, 감사 기록·파일 보관 재설계는 진행 중입니다.',
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
				'Android',
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
				'사용자의 확정 의도를 먼저 영속 저장하고 저장 완료 뒤 전송을 시작하도록 순서를 정했습니다.',
				'로그인 사용자와 대기 요청의 소유권을 맞추고, 이미 서버에 반영된 결과를 확인한 뒤 재전송하도록 했습니다.',
				'지도 선택과 처리 후 복귀 상태를 구분하고, 새 네이티브 기능은 지원 여부를 확인한 셸에서만 호출했습니다.',
			],
			process: [
				'필터가 바뀌어도 지도 그룹 번호를 유지하고 선택한 업무 처리 뒤 기존 지도 위치로 돌아오도록 연결했습니다.',
				'현재 위치의 권한·서비스 비활성·시간 초과를 나눴으며, 구형 셸은 기존 웹 위치 경로를 유지했습니다.',
				'앱 재실행 뒤 사용자 식별과 대기열을 복원한 다음 전송을 시작하고, 기존 로그인 세션을 위한 식별 정보 복원도 보완했습니다.',
				'실제 기기에서 API 연결만 차단해 요청 저장과 복구 후 서버 반영을 확인했습니다. 응답 유실·부분 성공·사진 조합 전체를 검증한 결과는 아닙니다.',
				'중복 전송은 서버 저장과 로컬 완료 상태를 대조하고 합성 SQLite로 조사했습니다. 최초 원인 확정과 실제 Oracle·기기 재현, 수정 배포 완료는 이 조사에 포함되지 않습니다.',
				'프린터 행 간격 수정은 Kotlin 컴파일과 설치까지 확인했으며, 수정 후 실물 라벨 검증은 남았습니다.',
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
				'실기기에서 API 차단 중 요청 저장, 앱 재실행 후 복원, 연결 복구 뒤 큐 제거와 서버 목록 변경을 확인했습니다.',
				'지도 선택·복귀와 위치 서비스 중지 후 복구를 확인하고, 구형 셸 조건에서는 네이티브 요청이 발생하지 않는지 검사했습니다.',
				'중복 전송은 원인 분석 범위입니다. 모든 장애 조합의 재전송이나 최신 프린터 수정의 실물 출력까지 완료했다고 보지 않았습니다.',
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
				'조회, 예약, Excel, 출력까지 이어지는 업무 흐름을 React 기반 운영 웹으로 정리했습니다.',
			summary:
				'반복 업무 화면을 단순히 늘리는 것이 아니라, API 연동, 반응형 UI, Excel 처리, 출력 경로가 같은 기준으로 움직이도록 구성했습니다.',
			impact: [
				{
					value: '약 74% 감소',
					label: '초기 JS entry',
					detail: '초기 진입에 필요하지 않은 화면과 Excel 처리 코드를 분리',
				},
				{
					value: '약 75% 감소',
					label: 'gzip 기준',
					detail: '동일 기준 초기 로딩 비용 감소',
				},
				{
					value: '모바일~데스크톱',
					label: '반응형 확인',
					detail: '모바일, 태블릿, 데스크톱 주요 폭에서 확인',
				},
			],
			problem:
				'초기 화면과 Excel 처리 코드가 한 번에 묶이면 첫 로딩이 무거워지고, PC 브라우저와 모바일 WebView 출력 경로가 섞이면 같은 기능도 서로 다른 기준으로 검증될 수 있었습니다.',
			thinking: [
				'업무 화면을 먼저 늘리기보다 데이터 연동, 화면 상태, 출력 요청의 경계를 나눴습니다.',
				'초기 진입에 필요하지 않은 route와 spreadsheet 처리는 실행 시점으로 미뤘습니다.',
				'PC 출력, 모바일 브라우저 fallback, WebView/native 출력 요청을 별도 흐름으로 판단했습니다.',
			],
			process: [
				'조회, 예약, 주소록, Excel, 출력 흐름을 같은 shell 안에서 이어지도록 먼저 묶었습니다.',
				'모의 데이터와 실제 API adapter를 분리해 화면 상태와 연동 상태를 따로 확인했습니다.',
				'출력 흐름은 PC와 모바일 조건을 나눠 formatter, preview, native 요청을 각각 검증했습니다.',
				'앱, 인증, 공개 API, UI를 더 나눈 실험에서는 500.67 kB(gzip 164.69 kB)까지 줄었지만 초기 인증·API 경계와 첫 클릭 loading 부담이 커져 채택하지 않았습니다.',
				'최종 지연 로딩 범위는 116개 파일·573개 테스트로 확인했고, PC 실물 라벨 출력 경로는 별도로 8개 파일·73개 테스트를 확인했습니다.',
			],
			solution: [
				'공통 shell, table, modal, form, feedback 구조 위에 주요 업무 흐름을 얹었습니다.',
				'예약 접수, 다건 처리, 주소록 선택, Excel 미리보기, 출력 요청 변환을 하나의 흐름으로 연결했습니다.',
				'번들 분석 결과를 기준으로 route-level lazy loading과 spreadsheet library lazy loading을 적용했습니다.',
			],
			checks: [
				'주요 viewport에서 overflow, modal clipping, dropdown 위치를 확인했습니다.',
				'출력 formatter, bitmap, command, browser fallback 흐름을 회귀 기준으로 확인했습니다.',
				'lint/test/build와 bundle 분석을 반복해 채택한 최적화 범위를 구분했습니다.',
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
			stack: [
				'Spring MVC',
				'JSP',
				'jQuery',
				'Java',
				'Android',
				'Public API adapter',
				'SHA-256',
			],
			headline:
				'레거시 웹과 Android WebView의 외부 API, 캐시, 위치 처리와 운영 배포를 유지보수했습니다.',
			summary:
				'웹 화면과 Android WebView를 고치고 외부 API 응답, 기준 데이터 캐시, 운영 배포 결과를 실제 화면에서 점검했습니다.',
			impact: [
				{
					value: '필수값 검증',
					label: '기준 데이터 cache',
					detail: '서버 cache로 준비하고 누락 여부를 확인',
				},
				{
					value: 'fallback 기준',
					label: '지역 해석 흐름',
					detail: '외부 조회 실패나 지연에 대비한 기준 분리',
				},
				{
					value: 'smoke 기준',
					label: '운영 반영 확인',
					detail: '변경 파일과 주요 화면 흐름을 함께 확인',
				},
			],
			problem:
				'여러 외부 API와 기준 데이터 조회가 한 요청 안에 묶이면 일부 지연이 전체 화면 지연으로 번질 수 있었습니다. 운영 반영도 파일 단위로 이뤄져 누락과 설정 노출 위험을 함께 관리해야 했습니다.',
			thinking: [
				'먼저 보여야 하는 핵심 정보와 늦게 채워져도 되는 보조 정보를 분리했습니다.',
				'fresh cache와 stale cache를 나눠 외부 API 실패 시 제한적으로 이전 값을 활용할 수 있게 판단했습니다.',
				'운영 반영은 전체 산출물을 덮어쓰기보다 manifest, hash, smoke 기준으로 범위를 좁혔습니다.',
			],
			process: [
				'외부 API 호출, 기준 데이터 조회, 위치 fallback을 화면 loading 순서와 맞춰 다시 나눴습니다.',
				'기준 데이터는 수집, 임시 저장, 필수값 검증, 교체 순서로 운영 반영 위험을 줄였습니다.',
				'운영 파일은 변경 범위와 hash를 확인한 뒤 smoke로 실제 화면 흐름을 다시 확인했습니다.',
				'요청 경로 밖에 대기질 측정소 673행과 법정동 20,560행의 기준 cache를 준비했습니다.',
				'2026-07-02의 111개 파일 배포와 2026-07-08의 42개 manifest 배포는 서로 다른 작업으로 나눠 검증했습니다.',
				'기준 데이터 갱신과 catalog 축소 자동화는 후속 과제로 남았고, JVM memory cache는 단일 Tomcat 범위라는 제한이 있습니다.',
			],
			solution: [
				'핵심 정보 우선 loading과 section별 cache 기준을 구성했습니다.',
				'기준 데이터를 서버 cache로 준비하고 임시 저장, 검증, 교체 흐름을 만들었습니다.',
				'Android WebView에서는 native 위치 흐름을 우선 사용하고 저장 위치와 browser fallback을 함께 두었습니다.',
			],
			checks: [
				'기준 데이터 수집 결과와 필수값 누락 여부를 확인했습니다.',
				'cold request와 cache hit 흐름을 smoke 기준으로 비교했습니다.',
				'운영 반영 대상 파일의 hash 일치 여부와 주요 화면 흐름을 확인했습니다.',
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
			stack: [
				'Node.js',
				'TypeScript',
				'React',
				'AI API',
				'Workbook UI',
				'xlsx',
				'Vitest',
			],
			headline:
				'AI가 문서를 대신 쓰는 구조가 아니라, 근거 수집과 사람 검수를 통제 가능한 흐름으로 만들었습니다.',
			summary:
				'프로젝트 착수 자료와 로컬 저장소 근거를 바탕으로 요구사항 후보, 확인 질문, 기능/화면 문서 초안을 만들고 workbook에서 검토할 수 있게 구성했습니다.',
			impact: [
				{
					value: 'Scan -> Preview',
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
				'규칙 기반 scanner 결과를 먼저 만들고, AI 생성은 그 다음 단계에 두었습니다.',
				'workbook JSON을 중심 모델로 두고 markdown과 export는 파생 결과로 판단했습니다.',
				'자동화는 초안 생성까지 맡기고 최종 검토와 보강은 사람이 확인할 수 있는 표 구조로 남겼습니다.',
			],
			process: [
				'자료 스캔 결과를 preview로 보여준 뒤 사용자가 문서화 방향을 확인할 수 있게 했습니다.',
				'생성 결과는 긴 문장 묶음이 아니라 workbook sheet 단위로 나눠 검토할 수 있게 했습니다.',
				'수정은 전체 재생성이 아니라 선택한 sheet/cell 문맥을 기준으로 다시 요청하도록 좁혔습니다.',
				'부분 실패는 manifest와 current/history artifact를 분리해 성공한 결과와 실패한 실행을 함께 추적했습니다.',
				'AI가 정리할 수 있는 항목과 사용자가 결정해야 하는 항목을 나누고, 근거 없는 placeholder 생성을 억제했습니다.',
			],
			solution: [
				'run workflow, scanner 결과, preview, detail artifact, logs, export 흐름을 연결했습니다.',
				'요구사항 원장, 기능 정의서, 화면 설계서 성격의 문서를 workbook으로 검토할 수 있게 했습니다.',
				'사용자가 수정하려는 sheet/cell과 보존해야 할 내용을 함께 전달하는 revision 흐름을 만들었습니다.',
			],
			checks: [
				'자료 스캔, AI preview, workbook 렌더링, export 흐름을 확인했습니다.',
				'선택 시트/셀 기반 재작성과 기존 workbook 보존 흐름을 확인했습니다.',
				'shared, engine, server, web 테스트와 lint/build를 확인했습니다.',
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
				'운영 웹의 모바일 출력 경로를 WebView와 Android native module로 연결했습니다.',
			summary:
				'웹 화면은 WebView로 유지하면서, 모바일에서만 필요한 장비 출력은 native module에 맡기도록 경계를 나눴습니다.',
			impact: [
				{
					value: 'WebView -> native',
					label: '출력 요청 경계',
					detail: '웹 payload와 장비 출력 명령을 분리',
				},
				{
					value: '실기기 확인',
					label: '장비 출력 검증',
					detail: 'emulator가 아닌 Android 기기 기준으로 확인',
				},
			],
			problem:
				'웹 버튼으로 출력 요청을 보내는 것과 실제 모바일 장비에서 출력되는 것은 다른 문제였습니다. WebView, 권한, native module, 장비 상태가 한 흐름에 묶이면 실패 지점을 찾기 어려웠습니다.',
			thinking: [
				'업무 화면은 웹에 두고, 장비와 직접 맞닿는 출력 책임은 native module로 분리했습니다.',
				'WebView bridge 요청과 native 응답을 구조화된 contract로 다뤘습니다.',
				'개발/운영 URL과 앱 식별자, 설치 산출물 기준을 나눴습니다.',
			],
			process: [
				'웹에서 전달되는 출력 데이터를 native 출력 payload로 변환하는 경계를 먼저 잡았습니다.',
				'Bluetooth 권한, 장비 탐색, 연결 상태, 출력 명령을 단계별로 확인했습니다.',
				'로컬 개발, 테스트 설치, 운영 설치 조건을 분리해 잘못된 환경으로 붙는 문제를 줄였습니다.',
				'Android 16/API 36에서 SDK 내부 장비 탐색 호출까지 따라가 취소 흐름과 BLUETOOTH_SCAN·BLUETOOTH_CONNECT 권한을 보완했습니다.',
				'명령 queue 수락과 실제 종이 출력 완료는 다른 검증 기준으로 분리했습니다.',
			],
			solution: [
				'WebView bridge와 Android native module 사이의 요청/응답 흐름을 정리했습니다.',
				'출력 payload 변환, 장비 상태 확인, 실패 메시지를 별도 단계로 나눴습니다.',
				'모바일 브라우저 fallback과 앱 WebView 출력 경로를 구분했습니다.',
			],
			checks: [
				'Android 실기기에서 권한, 장비 연결, 출력 요청 흐름을 확인했습니다.',
				'WebView bridge 요청과 native 출력 응답이 분리되는지 확인했습니다.',
				'개발/운영 설치 기준과 URL 분기를 확인했습니다.',
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
				'최신 Android 빌드 정책 대응과 구형 런타임 회귀를 서로 다른 검증 축으로 분리했습니다.',
			summary:
				'오래된 Android 하이브리드 앱에서 빌드 체인, 권한과 파일 처리, WebView bridge, 로그인과 초기 동기화를 한꺼번에 바꾸지 않고 실패 경계별로 안정화했습니다.',
			impact: [
				{
					value: '빌드 기준선 복구',
					label: 'Gradle/AGP/JDK/SDK',
					detail: '빌드 도구 변경과 target SDK·런타임 동작 변경을 분리',
				},
				{
					value: '호환성 경계',
					label: 'OS별 분기',
					detail: '권한, 파일 URI, back API, service 호출을 helper로 격리',
				},
			],
			problem:
				'구형 Gradle·AGP와 최신 개발 환경이 맞지 않았고, 최신 SDK 정책을 그대로 적용하면 파일 접근, 권한, service, back API가 구형 OS 진입과 WebView 흐름에 별도 회귀를 만들 수 있었습니다.',
			thinking: [
				'빌드 성공과 런타임 호환성을 같은 완료 조건으로 취급하지 않았습니다.',
				'최신 API 타입과 OS별 권한·파일 처리는 화면 코드가 아니라 compatibility helper 경계에 두었습니다.',
				'로그인, 초기 동기화, WebView navigation, bridge 오류를 서로 다른 실패 채널로 나눴습니다.',
			],
			process: [
				'Gradle, AGP, JDK, compile SDK와 module namespace를 단계적으로 정렬했습니다.',
				'content URI, FileProvider, Bluetooth 권한, scanner와 service 실행 조건을 OS 정책별로 점검했습니다.',
				'bridge null/error 응답, 비동기 종료, 로그인과 초기 동기화 실패를 분리해 회귀 원인을 좁혔습니다.',
			],
			solution: [
				'레거시 support 의존성의 전면 재작성 없이 컴파일 가능한 기준선을 만들었습니다.',
				'최신 back API 직접 참조와 파일·권한 분기를 helper 안으로 캡슐화했습니다.',
				'WebView bridge 응답과 비동기 오류를 정규화하고, 장비·외부 기능 실패가 앱 전체 종료로 번지지 않는 fallback을 정리했습니다.',
			],
			checks: [
				'debug와 release 빌드, IDE sync와 compile 경로를 확인했습니다.',
				'호환성 helper와 bridge fallback의 단위 테스트를 확인했습니다.',
				'구형 OS 확인이 필요한 항목과 정적 빌드로 확인한 항목을 분리해 남겼습니다.',
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
				'운영 서명과 최근 빌드 환경을 분리해 현장 앱을 다시 확인 가능한 상태로 만들었습니다.',
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
				'운영 서명이나 오래된 빌드 조건이 맞지 않으면 개발자가 기능을 확인하기 전부터 막힐 수 있고, emulator에서 되는 흐름이 실제 단말에서는 입력 timing 때문에 실패할 수 있었습니다.',
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
				'입력 장비 흐름은 실제 단말 기준으로 확인해야 하는 항목으로 남겼습니다.',
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
				'차트 렌더링이 아니라, 데이터 역할·preview·설정 패널이 맞물리는 편집 경험으로 정리했습니다.',
			summary:
				'차트 타입, 데이터 field mapping, preview lifecycle, 설정 패널, drag/drop, tooltip을 하나의 편집 흐름으로 다뤘습니다.',
			impact: [
				{
					value: '6-tab panel',
					label: '설정 구조',
					detail: '차트 설정을 영역별로 분리',
				},
			],
			problem:
				'모든 차트에 같은 옵션을 강제하면 설정 UI가 복잡해지고, preview와 panel state가 따로 움직이면 사용자가 현재 결과를 신뢰하기 어렵습니다.',
			thinking: [
				'차트 타입별 유효 옵션만 보여주는 방향으로 설정 경계를 잡았습니다.',
				'데이터 mapping, preview rendering, settings state를 독립적으로 추적했습니다.',
			],
			process: [
				'차트 타입, field mapping, preview, option panel을 같은 편집 흐름으로 맞췄습니다.',
				'설정 변경 때 preview가 불필요하게 다시 붙는 조건을 줄였습니다.',
				'WebGL/GLSL 프래그먼트 셰이더와 OGL로 편집 화면의 배경 모드를 구성했습니다.',
				'portal 도움말, drag overlay, loading·empty·error 상태와 renderer 경계를 별도로 확인했습니다.',
			],
			solution: [
				'6개 영역의 설정 패널과 preview 흐름을 구성했습니다.',
				'mixed chart 재렌더 조건을 줄여 preview 깜빡임과 스크롤 흔들림을 낮췄습니다.',
			],
			checks: [
				'preview rendering, option change, panel collapse, drag/drop, tooltip 흐름을 확인했습니다.',
				'관련 테스트, lint, build를 확인했습니다.',
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
				'외부 인증 정보를 클라이언트에 두지 않고 서버 프록시와 WebView QA 경계로 나눴습니다.',
			summary:
				'하이브리드 앱에서 외부 연동, 응답 정규화, 이미지 입력, file picker, route, bridge가 함께 움직이는 범위를 정리했습니다.',
			impact: [
				{
					value: 'server-side proxy',
					label: '인증 정보 경계',
					detail: '외부 연동 책임을 client 밖으로 분리',
				},
			],
			problem:
				'외부 인증 정보가 Android APK나 browser JavaScript에 들어가면 노출될 수 있고, 외부 응답 전체를 화면에 전달하면 불필요한 원문 데이터가 섞일 수 있었습니다.',
			thinking: [
				'외부 조회 책임은 server-side proxy에만 두었습니다.',
				'client에는 화면에 필요한 최소 결과와 상태만 내려주도록 계약을 좁혔습니다.',
			],
			process: [
				'client 입력, server proxy, 외부 응답, 화면 표시 값을 순서대로 분리했습니다.',
				'WebView file chooser는 입력 source별로 emulator와 실기기 확인 범위를 나눴습니다.',
			],
			solution: [
				'예시 설정과 credential 검색 기준을 정리했습니다.',
				'file chooser를 입력 source와 native picker 흐름으로 나눴습니다.',
			],
			checks: [
				'문서와 예시 설정에서 실제 credential 값이 검색되지 않는지 확인했습니다.',
				'emulator와 실기기에서 route, file chooser, tab sync, bridge 흐름을 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS03',
			id: 'react-admin-state-migration',
			title: '주식 업무 관리 웹',
			platform: 'Web',
			area: '주식 업무 / 관리 화면',
			period: '2026.03',
			role: '신규 관리 화면 구축',
			workType: 'React 신규 재구축',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'Zustand',
			],
			headline:
				'기존 화면의 업무 절차를 살펴본 뒤 목록, 검색, 상세, Excel 처리 화면을 React로 새로 만들었습니다.',
			summary:
				'목록 조회, 검색 모달, 상세 확인, 등록/수정, 상태 변경처럼 반복되는 관리 흐름을 공통 구조로 잡았습니다.',
			impact: [
				{
					value: 'React Query',
					label: '서버 상태 흐름',
					detail: '화면별 조회/갱신 기준 통일',
				},
			],
			problem:
				'주식 업무 화면에서 직접 DOM 조작에 의존하면 비슷한 테이블과 모달이 늘어날수록 변경 지점이 흩어지고, 공통 문제가 화면별 예외로 남을 수 있었습니다.',
			thinking: [
				'반복 table/filter/modal 패턴은 공통 primitive로 묶되, 업무별 의미는 각 화면에 남겼습니다.',
				'서버 데이터 갱신은 React Query 흐름으로 모으고 화면 상태는 별도로 관리했습니다.',
			],
			process: [
				'반복되는 table, filter, modal, top bar 동작을 먼저 공통 기준으로 모았습니다.',
				'각 화면의 column, action, session 흐름은 공통 기준 위에 얹는 방식으로 정리했습니다.',
			],
			solution: [
				'공통 table, filter, modal, top bar 패턴을 재사용 가능한 구조로 정리했습니다.',
				'컬럼 고정/리사이즈, truncate tooltip, copy, infinite scroll 같은 반복 기능을 일반화했습니다.',
			],
			checks: ['table, filter, modal, session 흐름을 화면 단위로 확인했습니다.'],
		},
		{
			workstreamId: 'WS09',
			id: 'legacy-panel-baseline',
			title: '레거시 웹 패널 분리 기준선',
			platform: 'Legacy Web',
			area: 'JSP / jQuery 영향 범위 분석',
			period: '2026.06',
			role: '분리 분석/회귀 기준선',
			workType: '영향 분석',
			stack: ['JSP', 'jQuery', 'Server-rendered web'],
			headline:
				'레거시 화면을 바로 쪼개기 전에 coupling, API contract, browser baseline을 먼저 만들었습니다.',
			summary:
				'공유 popup, selector prefix, list state, page loader, backend parameter order를 먼저 확인해 변경 위험을 줄였습니다.',
			impact: [
				{
					value: 'impact map',
					label: '변경 전 지도화',
					detail: 'selector, popup, loader, contract 위험 분리',
				},
			],
			problem:
				'오래된 패널 안에서는 여러 메뉴와 popup callback이 같은 스크립트를 공유하고 있어, 파일만 나누면 주변 기능이 함께 깨질 위험이 있었습니다.',
			thinking: [
				'분리 대상과 비대상을 먼저 나누고, 기존 결함과 새 regression을 구분했습니다.',
				'backend parameter와 upload/download 계약은 이번 분리에서 바꾸지 않는 것으로 고정했습니다.',
			],
			process: [
				'공유 popup, selector prefix, page loader, backend parameter 순서로 영향 지점을 확인했습니다.',
				'코드를 바로 나누기 전에 수동 확인 runbook과 stop signal을 먼저 남겼습니다.',
			],
			solution: [
				'impact matrix, API contract, manual verification runbook, runtime baseline을 정리했습니다.',
				'구현 전 static search 목록과 stop signal을 남겼습니다.',
			],
			checks: ['browser 접근 기준과 page loader 흐름을 확인했습니다.'],
		},
		{
			workstreamId: 'WS14',
			id: 'multi-role-hybrid-platform',
			title: '다중 역할 하이브리드 플랫폼',
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
				'격리 MariaDB에서 중복 통합과 본인 편집의 관련 열 보존, 실패 주입 후 rollback, 동시 요청을 검사했습니다.',
				'저장 성공과 부모 화면 재조회 성공을 분리해 빠른 알림 닫기나 늦은 응답이 이전 값을 남기지 않도록 했습니다.',
				'Android 실기기에서 선택창 열기·취소·재선택, 문의 작성 중 BACK과 사진 확대·맞춤·닫기를 확인했습니다.',
				'iOS 앱의 첨부 등록은 지원 범위에서 제외했습니다. 글 문의와 조회는 유지하며 iOS 빌드·실기기 검증은 수행하지 않았습니다.',
				'문의 알림의 기본 비활성 조건 제거는 합성 검사까지 확인한 미배포 변경입니다. 실제 누락 원인 전체의 해결이나 실수신을 뜻하지 않습니다.',
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
				'실제 서비스와 MyBatis를 연결한 격리 MariaDB에서 보존·rollback·동시성을 확인했습니다. 운영 DB 전체 제약을 재현한 것은 아닙니다.',
				'브라우저와 Android 실기기로 문의 표시·첨부 선택·작성 취소·이미지 확대를 검수했습니다.',
				'공유 파일 환경과 전체 알림 전달, iOS 실기기 검증은 별도로 남겼습니다.',
			],
		},
		{
			workstreamId: 'WS15',
			id: 'operations-admin-web',
			title: '운영 관리 웹',
			platform: 'Web',
			area: '암호화 조회 / 답변·첨부·알림',
			period: '2026.09',
			role: '관리 기능 구현 / 실행 안정화',
			workType: '기능 확장 / 유지보수',
			stack: [
				'Java',
				'Spring MVC',
				'MyBatis',
				'Vue 2',
				'jQuery',
				'MariaDB',
				'PowerShell',
			],
			headline:
				'암호화된 회원 정보 검색과 문의 답변·첨부파일·알림 처리를 개발했습니다.',
			summary:
				'검색 결과를 먼저 확정한 뒤 페이지를 나눠 누락과 건수 불일치를 고쳤습니다. 답변 저장에 실패하면 새 파일을 정리하고, 알림 등록이 실패해도 저장된 답변은 유지하도록 했습니다.',
			problem:
				'암호화된 값을 검색하기 전에 페이지를 나누면 일치 항목과 건수가 달라졌습니다. 답변의 DB 저장, 물리 파일 교체, 알림 등록은 실패 시점이 달라 하나의 성공으로 처리할 수 없었습니다.',
			thinking: [
				'후보 제한 뒤 복호화·검색·정렬·건수 계산·페이징 순서로 처리하고, 사용자가 제출한 조건으로만 조회했습니다.',
				'답변 저장과 파일 정리, 후속 알림의 확정 시점을 나눴습니다.',
				'전체 검사 실패는 변경 전과 같은 환경에서 대조해 신규 회귀와 기존 실패를 구분했습니다.',
			],
			process: [
				'검색 전·초기화·재진입에는 민감 목록을 비워 두고, 페이지 이동은 마지막 제출 조건을 사용하도록 했습니다.',
				'일관된 읽기 스냅샷에서 조회 순서와 건수, 암호화 필드를 대조했습니다. 서비스 측 성능 측정은 HTTP·인증·렌더링을 제외한 값입니다.',
				'실행 중 JVM과 정적 자산의 버전 혼재를 찾아 최신 구성으로 다시 실행하고, 로컬 보조 DB 준비를 앱 기동 전에 확인하도록 했습니다.',
				'변경 전후에 동일한 전체 회귀 실패 15개·오류 1개가 남았으며, 관련 기능 검사 통과를 전체 검사 성공으로 표현하지 않았습니다.',
				'정상 로그아웃 차단과 시간 만료 후 인증은 달랐습니다. 기존 인증 쿠키가 남은 시간 만료의 접근 한계는 해결되지 않은 상태로 기록했습니다.',
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
				'실제 앱에서 명시 검색, 조건 유지, 초기화·재진입, 정상 로그아웃과 열람 이력을 확인했습니다.',
				'격리 HTTP에서 임시 답변 비공개, 완료 답변·파일 접근, 동시 저장과 다운로드 바이트 일치를 확인했습니다.',
				'시험 수신 확인과 일반 수신자 설정 복원을 구분했습니다. 저장 후 큐 등록 전의 영속 재시도, 공유 파일 환경, 운영 배포는 남은 범위입니다.',
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
				'성능은 입력 규모·DB 호출·실행계획·메모리로 나눠 관찰하고 미실행 최적화를 성과로 쓰지 않았습니다.',
			],
			process: [
				'실제 처리 주체를 찾은 뒤 파일 파싱과 미리보기 응답을 대조했습니다. 원래 제보된 통신 오류는 재현되지 않았습니다.',
				'행별 중복 조회와 함수 조건의 인덱스 스캔을 측정하고 입력 상한·집합 조회 방향을 제안했습니다. 백엔드 최적화는 실행하지 않았습니다.',
				'긴 인라인 이미지에서는 속성 추출과 허용 경로 검증을 분리하고 비대상 이미지는 대체 이미지로 처리했습니다.',
				'오류 안내 변경은 집중 검사와 로컬 미리보기, WAR 빌드까지 확인했으며 당시 배포 전 상태였습니다.',
			],
			solution: [
				'파일 분석·등록 단계마다 HTTP·업무 오류, timeout·취소·응답 해석 실패와 경과 시간을 구분했습니다.',
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
				'오류 계약 검사, 실제 알림 자산의 로컬 표시, Java WAR 빌드를 확인했습니다.',
				'개발 환경에서 행 수별 시간과 조회 횟수를 측정했습니다. 운영 처리량이나 개선 후 성능 결과가 아닙니다.',
				'인라인 이미지 제외와 일반 이미지 경로 유지를 확인했으며 전후 응답시간 개선율은 산출하지 않았습니다.',
			],
		},
	],
	en: [
		{
			workstreamId: 'WS13',
			id: 'settlement-operations-platform',
			title: 'Settlement Operations Platform',
			platform: 'Web / API',
			area: 'Editable tables and Excel imports / Billing and settlement history',
			period: '2026.07 ~ 2026.09',
			role: 'React UI and Spring Boot API development',
			workType: 'New development',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'Spring Boot',
				'MyBatis',
				'MariaDB',
				'Vitest',
			],
			headline:
				'Built Excel batch imports, billing and settlement screens, and Spring Boot APIs.',
			summary:
				'Built inline editing and Excel review and import features. Designed the data model to retain the original settlement recipient and amount when current assignments change.',
			problem:
				'Users needed to edit an Excel preview and retry a save without creating duplicates or saving only some rows. Changing an assignment also needed to leave previously approved settlements intact.',
			thinking: [
				'Kept the complete reviewed data on the server and rechecked permissions and referenced records at confirmation so the saved data matched what the user had reviewed.',
				'Saved each batch in one transaction. A failure rolls back the batch; retrying the same request returns its original result.',
				'Stored current assignments separately from the recipient recorded on each transaction. Unresolved allocations block settlement closing instead of being assigned automatically.',
			],
			process: [
				'Added server-side checks for menu access and create/update permissions. Organization- and owner-level data isolation remains separate work.',
				'In development checks on 2026-08-12, fetched up to 1,000 source rows with at most four SQL statements. This was not a production concurrency measurement.',
				'Backed up and restored the database, compared hashes of existing business values before and after the schema change, then deployed to development.',
			],
			solution: [
				'Built shared tables with inline editing, selection dialogs and keyboard navigation, retaining drafts when a save fails.',
				'Built Excel preview, editing, revalidation and import screens and APIs, including duplicate and partial-save handling.',
				'Allocated billed amounts to settlements and retained historical amounts and the specifications originally recorded for insurance and inspections.',
			],
			impact: [
				{
					value: 'No duplicate or partial imports',
					label: 'Excel batch import',
					detail: 'Roll back failed batches and return the original result on retry',
				},
				{
					value: 'Historical settlements retained',
					label: 'Assignment changes',
					detail: 'Keep the original recipient and approved amount',
				},
				{
					value: 'Deployed to development',
					label: 'Data model changes',
					detail: 'Backup, restore and before/after business-data comparison',
				},
			],
			checks: [
				'Verified full rollback on save failure and duplicate prevention under concurrent confirmation and retries in an isolated MariaDB database.',
				'Checked in the development database that assignment changes, termination and resumption retained historical settlement amounts.',
				'Deployed to development. Some final screen checks and production rollout remain; audit logging and file archive redesign are still in progress.',
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
				'Android',
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
				'Blocked only API connectivity on a physical device to verify storage and recovery. This did not cover every lost-response, partial-success, or photo combination.',
				'The duplicate-transmission investigation compared server saves and local completion state using synthetic SQLite scenarios. The initiating cause, reproduction on Oracle and hardware, and a deployed fix were not established.',
				'The printer row-spacing change passed Kotlin compilation and installation; physical label verification after that change remained outstanding.',
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
				'On a physical device, verified request persistence during API disconnection, restoration after restart, and queue removal with changed server results after recovery.',
				'Checked map selection and return, recovery after disabling location services, and absence of unsupported native requests in older-shell conditions.',
				'Duplicate transmission remains an investigation result. Not every retry failure combination or physical output after the latest printer change was verified.',
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
				'Organized lookup, reservation, Excel, and print flows into a React operations web app.',
			summary:
				'The work connected API integration, responsive UI, spreadsheet handling, and print paths under the same operational baseline.',
			impact: [
				{
					value: '~74% lower',
					label: 'Initial JS entry',
					detail: 'non-initial routes and spreadsheet handling were split out',
				},
				{
					value: '~75% lower',
					label: 'gzip size',
					detail: 'same-baseline first-load reduction',
				},
				{
					value: 'mobile to desktop',
					label: 'Responsive checks',
					detail: 'mobile, tablet, and desktop width baseline',
				},
			],
			problem:
				'Bundling initial screens with spreadsheet handling made the first load heavy, while mixing desktop and WebView print paths made verification unclear.',
			thinking: [
				'Separated data integration, UI state, and print-request boundaries before adding more screens.',
				'Moved non-initial routes and spreadsheet processing to runtime-loaded paths.',
				'Treated desktop print, mobile browser fallback, and WebView/native output as separate flows.',
			],
			process: [
				'Connected lookup, reservation, contact, spreadsheet, and print flows inside the same shell first.',
				'Separated mock data from the API adapter so UI state and integration state could be checked independently.',
				'Split print verification across formatter, preview, browser fallback, and native request paths.',
				'A deeper app, auth, public-API, and UI split reached 500.67 kB (164.69 kB gzip), but was rejected because added auth/API initialization and first-click loading boundaries outweighed the gain.',
				'The accepted lazy-loading scope was checked across 116 files and 573 tests; the physical PC label path was checked separately across 8 files and 73 tests.',
			],
			solution: [
				'Built the main workflows on a shared shell, table, modal, form, and feedback structure.',
				'Connected reservation intake, bulk handling, contact selection, Excel preview, and print payload conversion.',
				'Applied route-level lazy loading and spreadsheet-library lazy loading from bundle analysis.',
			],
			checks: [
				'Checked overflow, modal clipping, and dropdown placement across key viewport widths.',
				'Checked formatter, bitmap, command, and browser fallback paths as print regressions.',
				'Re-ran lint, test, build, and bundle analysis to separate accepted optimization from experiments.',
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
			stack: [
				'Spring MVC',
				'JSP',
				'jQuery',
				'Java',
				'Android',
				'Public API adapter',
				'SHA-256',
			],
			headline:
				'Maintained external API, cache, location, and production rollout flows across legacy web and Android WebView.',
			summary:
				'Updated web and Android WebView behavior, then checked API responses, reference-data caches, and deployed files in production screens.',
			impact: [
				{
					value: 'required-field checks',
					label: 'reference-data cache',
					detail: 'prepared as server cache with missing-value checks',
				},
				{
					value: 'fallback baseline',
					label: 'region-resolution flow',
					detail: 'separated the fallback path for failed or delayed lookups',
				},
				{
					value: 'smoke baseline',
					label: 'rollout checks',
					detail: 'checked changed files together with key screen flows',
				},
			],
			problem:
				'Multiple external APIs and reference-data lookups were tied to one request, so one slow section could delay the whole screen. File-level rollout also required missing-file and exposed-setting checks.',
			thinking: [
				'Separated immediately visible core information from secondary information that could load later.',
				'Split fresh and stale cache so limited fallback could be shown when external APIs failed.',
				'Narrowed operations rollout through manifest, hash, and smoke checks instead of broad replacement.',
			],
			process: [
				'Separated external API calls, reference-data lookup, and location fallback by screen loading order.',
				'Handled reference data through collect, temporary save, required-field validation, and replace steps.',
				'Checked changed files and hashes before verifying the actual screen flow through smoke checks.',
				'Prepared 673 air-quality stations and 20,560 legal-district rows as reference caches outside the request path.',
				'Treated the 111-file rollout on 2026-07-02 and the 42-entry manifest rollout on 2026-07-08 as separate deployments and checks.',
				'Automated reference refresh and catalog reduction remained follow-up work, while the JVM memory cache remained limited to one Tomcat instance.',
			],
			solution: [
				'Built a core-first loading model with section-specific cache rules.',
				'Prepared reference data as server cache with temporary-save, validation, and replace flow.',
				'Used native location first in Android WebView, then stored location and browser fallback.',
			],
			checks: [
				'Checked reference-data collection results and required fields.',
				'Compared cold request and cache-hit flows through smoke checks.',
				'Verified file hashes and key screen flows for operations rollout.',
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
			stack: [
				'Node.js',
				'TypeScript',
				'React',
				'AI API',
				'Workbook UI',
				'xlsx',
				'Vitest',
			],
			headline:
				'Built a controlled workflow for source scanning and human review instead of treating AI output as final documentation.',
			summary:
				'The tool turns kickoff material and repository scan results into requirement candidates, clarification questions, and feature/screen document drafts that can be reviewed as a workbook.',
			impact: [
				{
					value: 'Scan -> Preview',
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
				'Separated partial-failure manifests from current/history artifacts so successful output and failed runs remained traceable.',
				'Separated fields AI could organize from decisions reserved for the user and suppressed unsupported placeholders.',
			],
			solution: [
				'Connected run workflow, scanner output, preview, detail artifacts, logs, and export paths.',
				'Made requirement, functional, and screen documents reviewable as workbook-style tables.',
				'Sent target sheet/cell and preservation context together for revision requests.',
			],
			checks: [
				'Checked scanning, AI preview, workbook rendering, and export flows.',
				'Checked selected sheet/cell revision while preserving existing workbook context.',
				'Checked shared, engine, server, and web tests along with lint/build.',
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
					value: 'WebView -> native',
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
				'Separated development and production URLs, app identifiers, and install artifacts.',
			],
			process: [
				'Defined the boundary that converts web output data into a native output payload.',
				'Checked Bluetooth permission, device lookup, connection state, and output command stages.',
				'Separated local development, test install, and production install conditions.',
				"Traced the SDK's internal device-discovery call on Android 16/API 36 and added cancellation plus BLUETOOTH_SCAN and BLUETOOTH_CONNECT handling.",
				'Treated command-queue acceptance and completed physical output as separate verification points.',
			],
			solution: [
				'Organized the request/response path between the WebView bridge and Android native module.',
				'Separated payload conversion, device-state checks, and failure messaging.',
				'Kept mobile browser fallback distinct from app WebView output.',
			],
			checks: [
				'Checked permission, device connection, and output request flows on an Android device.',
				'Checked that WebView bridge requests and native output responses stayed separated.',
				'Checked development and production install baselines.',
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
				'Separated modern Android build-policy work from legacy runtime regression checks.',
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
				'Checked debug and release builds, IDE sync, and compile paths.',
				'Checked unit tests for compatibility helpers and bridge fallbacks.',
				'Recorded real older-OS checks separately from items verified through static builds.',
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
				'Separated operational signing from current build recovery so the field app could be verified again.',
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
				'Left device input behavior as a real-device verification item.',
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
				'Built an editing workflow where data roles, preview, and settings panels stayed connected.',
			summary:
				'Handled chart type selection, data field mapping, preview lifecycle, settings panels, drag/drop, and tooltips as one editing workflow.',
			impact: [
				{
					value: '6-tab panel',
					label: 'settings structure',
					detail: 'chart settings separated by editing area',
				},
			],
			problem:
				'Forcing every option onto every chart type makes the settings UI noisy, and if preview and panel state drift apart users cannot trust the current result.',
			thinking: [
				'Showed only valid option groups for the current chart type.',
				'Tracked data mapping, preview rendering, and settings state independently.',
			],
			process: [
				'Aligned chart type, field mapping, preview, and option panels into one editing flow.',
				'Reduced cases where setting changes unnecessarily remounted the preview.',
				'Built editor background modes with WebGL/GLSL fragment shaders and OGL.',
				'Checked portal help, drag overlays, loading/empty/error states, and renderer boundaries separately.',
			],
			solution: [
				'Structured a six-area settings panel and preview flow.',
				'Reduced mixed-chart remount conditions to lower flicker and scroll movement.',
			],
			checks: [
				'Checked preview rendering, option changes, panel collapse, drag/drop, and tooltip flows.',
				'Checked related tests, lint, and build.',
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
				'Kept external credentials out of the client by separating server proxy and WebView QA boundaries.',
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
				'Putting external credentials into an Android APK or browser JavaScript would expose them, and sending full external responses to the UI could leak unnecessary raw data.',
			thinking: [
				'Kept external lookup responsibility inside a server-side proxy.',
				'Returned only the minimum result and state needed by the client UI.',
			],
			process: [
				'Separated client input, server proxy, external response, and displayed result in order.',
				'Checked WebView file chooser behavior by input source across emulator and real device flows.',
			],
			solution: [
				'Documented sample-setting and credential-search baselines.',
				'Split file chooser behavior by input source and native picker flow.',
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
			period: '2026.03',
			role: 'New admin web rebuild',
			workType: 'React rebuild',
			stack: [
				'React',
				'TypeScript',
				'Vite',
				'React Router',
				'TanStack Query',
				'Zustand',
			],
			headline:
				'Rebuilt stock operations lists, filters, modals, and session flows in React from the existing business workflow.',
			summary:
				'Organized repeated admin flows such as lookup, search modals, detail checks, create/update, and status changes into shared structures.',
			impact: [
				{
					value: 'React Query',
					label: 'server-state flow',
					detail: 'shared baseline for screen-level fetch/update behavior',
				},
			],
			problem:
				'In stock operations screens, direct DOM manipulation spreads change points as similar tables and modals grow, while shared concerns can become screen-by-screen exceptions.',
			thinking: [
				'Grouped repeated table/filter/modal behavior into common primitives while leaving domain meaning at the screen level.',
				'Consolidated server data refresh through React Query and kept screen state separate.',
			],
			process: [
				'Collected repeated table, filter, modal, and top-bar behavior into shared baselines first.',
				'Placed screen-specific columns, actions, and session flows on top of those baselines.',
			],
			solution: [
				'Organized common table, filter, modal, and top-bar patterns.',
				'Generalized repeated behavior such as column pinning/resizing, truncate tooltips, copy, and infinite scroll.',
			],
			checks: ['Checked table, filter, modal, and session flows at screen level.'],
		},
		{
			workstreamId: 'WS09',
			id: 'legacy-panel-baseline',
			title: 'Legacy Web Panel Split Baseline',
			platform: 'Legacy Web',
			area: 'JSP / jQuery impact mapping',
			period: '2026.06',
			role: 'Split analysis and regression baseline',
			workType: 'Impact analysis',
			stack: ['JSP', 'jQuery', 'Server-rendered web'],
			headline:
				'Mapped coupling, API contracts, and browser baselines before splitting legacy screens.',
			summary:
				'Checked shared popups, selector prefixes, list state, page loaders, and backend parameter order before changing files.',
			impact: [
				{
					value: 'impact map',
					label: 'pre-change mapping',
					detail: 'selector, popup, loader, and contract risks separated',
				},
			],
			problem:
				'Multiple menus and popup callbacks shared the same legacy scripts, so simply moving files could break nearby functions.',
			thinking: [
				'Separated target and non-target areas first, then distinguished existing defects from new regressions.',
				'Kept backend parameters and upload/download contracts unchanged for the split scope.',
			],
			process: [
				'Checked shared popups, selector prefixes, page loaders, and backend parameters as impact points.',
				'Recorded manual verification runbook and stop signals before splitting source files.',
			],
			solution: [
				'Prepared an impact matrix, API contract notes, manual verification runbook, and runtime baseline.',
				'Recorded static-search targets and stop signals before implementation.',
			],
			checks: ['Checked browser access baseline and page-loader behavior.'],
		},
		{
			workstreamId: 'WS14',
			id: 'multi-role-hybrid-platform',
			title: 'Multi-role Hybrid Platform',
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
				'Used isolated MariaDB to check related-field preservation, injected-failure rollback, and concurrent merge and edit requests.',
				'Separated saved data from successful parent refresh so fast alert dismissal and late responses could not leave stale values.',
				'Checked opening, cancelling, and reopening the Android picker, draft BACK handling, and image zoom, fit, and close on physical devices.',
				'Attachment creation in the iOS app was excluded; text inquiries and reading remained supported, but iOS builds and device verification were not performed.',
				'Removal of the inquiry notification default-off condition passed synthetic checks but was not deployed. It does not establish resolution of every missing notification or actual delivery.',
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
				'Ran real services and MyBatis against isolated MariaDB to verify preservation, rollback, and concurrency; this did not reproduce every production constraint.',
				'Reviewed inquiry display, file selection, draft cancellation, and image zoom in browsers and on Android devices.',
				'Shared-file environments, complete notification delivery, and iOS device verification remain separate work.',
			],
		},
		{
			workstreamId: 'WS15',
			id: 'operations-admin-web',
			title: 'Operations Administration Web',
			platform: 'Web',
			area: 'Encrypted search / Answers, files, and notifications',
			period: '2026.09',
			role: 'Administration features / Runtime stabilization',
			workType: 'Feature development / Maintenance',
			stack: [
				'Java',
				'Spring MVC',
				'MyBatis',
				'Vue 2',
				'jQuery',
				'MariaDB',
				'PowerShell',
			],
			headline:
				'Built encrypted member search and inquiry replies with attachments and notifications.',
			summary:
				'Filtered search results before pagination to fix missing matches and incorrect counts. Added cleanup of new files after failed saves and retained saved replies when notification registration failed.',
			problem:
				'Paginating before decrypting and filtering changed matching results and counts. Database saves, physical file replacement, and notification registration could fail at different points.',
			thinking: [
				'Applied candidate limits, decryption, filtering, sorting, counting, and pagination in order, using only submitted search conditions.',
				'Separated answer commits, file cleanup, and subsequent notification registration.',
				'Compared full-suite failures with the pre-change code under the same environment to distinguish new regressions.',
			],
			process: [
				'Kept sensitive lists empty before search, after reset, and on re-entry; pagination used the last submitted conditions.',
				'Compared query order, counts, and encrypted fields in a consistent read snapshot. Service performance measurements excluded HTTP, authentication, and rendering.',
				'Identified mixed JVM and static-asset versions, restarted with a matching configuration, and checked the local auxiliary database before app startup.',
				'The same 15 full-suite failures and 1 error remained before and after the change. Passing focused checks was not described as a passing full suite.',
				'Normal logout blocking differed from time-based expiry. Continued access with an existing authentication cookie after session expiry remained unresolved.',
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
				'Verified explicit search, submitted-condition retention, reset, re-entry, normal logout, and access records in the actual app.',
				'Checked draft-answer privacy, completed-answer and file access, concurrent saves, and byte-identical downloads over isolated HTTP.',
				'Distinguished test-recipient confirmation from restored normal configuration. Durable retry between save and queue registration, shared files, and production deployment remain outstanding.',
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
				'Measured input size, database calls, query plans, memory, and response size without claiming unimplemented optimization gains.',
			],
			process: [
				'Located the actual upload handler and compared parsing with preview responses. The originally reported communication failure was not reproduced.',
				'Measured per-row duplicate queries and function-based index scans and proposed input limits and set-based queries. Backend optimization was not implemented.',
				'Separated image attribute extraction from permitted-path checks and used a fallback for unsupported inline images.',
				'The diagnostic change passed focused checks, a local preview, and a WAR build; it was awaiting deployment at the recorded date.',
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
				'Verified error contracts, local display with the actual alert assets, and the Java WAR build.',
				'Measured elapsed time and query counts by row count in development; these are not production throughput or post-optimization results.',
				'Checked inline-image exclusion and existing file-image handling without calculating an unsupported speedup.',
			],
		},
	],
};
