import type { DecisionCase } from '@/types/decisions';
import type { Locale } from '@/types/locale';

export const decisionCases: Record<Locale, Record<string, DecisionCase>> = {
	ko: {
		'ai-document-analysis': {
			context:
				'문서에서 근거를 찾아 답하는 AI 기능에서는 답변뿐 아니라 평가 결과도 믿을 수 있어야 한다고 보았습니다. 긴 답변은 평가 입력 한도를 넘었고, 평가 모델이 문장을 다시 쓰면서 검증 대상의 의미도 달라졌습니다.',
			points: [
				{
					title: '평가 대상은 고정하고, 모델의 판정 결과를 검증',
					decision:
						'Ragas로 평가할 문장을 서버에서 고정한 뒤 모델이 반환한 결과를 문장 ID로 대조하고, 긴 입력은 여러 묶음으로 나눴습니다. 원문 인용 / 근거 일치 / 답변의 설명 범위를 각각 확인하는 방식입니다.',
					verification:
						'실제 문서 답변에서 추출한 25개 주장을 5개 묶음으로 나누어 끝까지 평가했습니다. ID 누락·중복과 잘못된 응답 형식을 검사해, 형식이 깨진 판정이 정상 결과로 저장되지 않도록 확인했습니다.',
				},
				{
					title: '모델 대기와 애플리케이션 병목을 분리해서 개선',
					decision:
						'응답이 느린 원인을 구분하려고 모델 응답을 고정한 상태에서 내부 처리를 측정했습니다. 반복되는 토큰 수 계산을 줄였고, 같은 요청에서 이미 처리한 문서 페이지는 다시 활용합니다.',
					verification:
						'워밍업 후 개선 전후 각각 20회를 측정한 결과, 내부 처리 중앙값이 2,969ms에서 672ms로 줄었습니다. 모델 호출 횟수는 유지했습니다.',
				},
			],
			outcome:
				'긴 답변의 평가를 끝까지 처리하고 반복 계산으로 발생하던 내부 지연을 줄였습니다. 답변은 먼저 보여 주고 Ragas 평가는 비동기로 이어가므로, 사용자는 평가가 끝나기 전에 답변을 확인할 수 있습니다.',
		},
		'settlement-operations-platform': {
			context:
				'여러 담당자가 같은 정산 자료를 수정할 때, 늦게 저장한 내용이 다른 사람의 변경을 덮어쓰면 안 됩니다. 동시에 저장을 거절했다는 이유로 사용자가 작성한 내용까지 잃어서는 안 된다고 판단했습니다.',
			points: [
				{
					title: '충돌은 서버에서 막고, 어떤 값을 살릴지는 사용자가 결정',
					decision:
						'오래된 수정 버전의 저장은 거절하되 입력값은 화면에 남기도록 구현했습니다. 사용자는 수정 전 값 / 서버의 최신 값 / 현재 입력값을 비교해 선택한 뒤 별도 저장으로 변경을 확정합니다.',
					verification:
						'개발 환경에서 별도 API 요청으로 먼저 값을 변경한 후, 브라우저의 저장 요청이 409 응답을 받아도 입력값과 DB의 최신 값이 유지되는지 확인했습니다. 이후 선택한 값을 다시 저장하고 DB와 변경 이력을 대조했습니다.',
				},
				{
					title: 'Excel 검증 결과를 저장 시점까지 유지',
					decision:
						'검증한 데이터는 서버에 보관하며 저장 직전에 권한과 참조 데이터를 다시 확인합니다. 중간 오류가 나면 전체 트랜잭션을 되돌리고, 같은 저장 요청을 다시 보내면 기존 처리 결과를 반환합니다.',
					verification:
						'격리한 MariaDB 환경에서 중간 실패 / 재요청 / 동시 요청을 재현해 부분 저장과 중복 반영이 발생하지 않는지 확인했습니다.',
				},
			],
			outcome:
				'현재 배차 자료와 확정된 정산 이력을 구분하고, 수정 충돌과 일괄 저장 실패를 복구할 수 있습니다. 검증에서는 저장 성공 여부와 함께 사용자의 입력과 변경 이력이 유지되는지 확인했습니다.',
		},
		'erp-mobile-workflow': {
			context:
				'정산 ERP와 연결되는 모바일 앱은 늦게 도착한 알림이나 반복 요청에도 최신 상태를 유지해야 했습니다. 웹의 PDF 다운로드 방식도 모바일 실행 환경에 맞게 바꿀 필요가 있었습니다.',
			points: [
				{
					title: '알림 내용과 읽음 상태를 분리해 동시 요청에 대응',
					decision:
						'알림 버전과 삭제 상태를 비교해 늦은 생성 알림이 삭제된 항목을 되살리지 못하게 합니다. 읽음 정보는 별도로 관리하며, 먼저 갱신한 뒤 없으면 등록하던 처리를 한 번의 UPSERT로 바꿔 최초 확인 시각을 유지했습니다.',
					verification:
						'격리한 MariaDB에서 읽음 처리의 데드락을 재현한 뒤 동시 요청을 다시 실행했습니다. 알림 순서를 뒤집거나 같은 알림을 반복해서 보내도 최신 내용과 읽음 정보가 유지되는지 확인했습니다.',
				},
				{
					title: '파일 다운로드 권한을 모바일에 맞게 전달',
					decision:
						'브라우저 안에서만 유효한 blob URL 대신 다운로드 시점에 짧게 유효한 서명 URL을 발급합니다. 발급과 실제 다운로드 때 접근 권한을 확인하며, 로그인 토큰은 파일 주소에 넣지 않습니다.',
					verification:
						'Chrome에서 내려받은 PDF와 원본의 해시를 비교하고 네이티브 브리지에 전달되는 값을 확인했습니다. Android 에뮬레이터에서는 알림을 누른 뒤 공지 목록을 거쳐 공지 본문을 여는 흐름을 점검했습니다.',
				},
			],
			outcome:
				'문의 처리 / 알림 / PDF 다운로드를 ERP와 연결하고, 알림의 최신 상태와 다운로드 권한을 모바일에서도 확인하도록 구성했습니다.',
		},
		'delivery-operations-web': {
			context:
				'운영 웹은 시작할 때 당장 필요하지 않은 화면과 Excel 코드까지 함께 불러왔습니다. 첫 화면에 필요한 코드와 사용자가 기능을 실행할 때 필요한 코드를 구분해 초기 다운로드 크기를 줄이고자 했습니다.',
			points: [
				{
					title: '번들 분석으로 불필요한 초기 코드를 찾아 분리',
					decision:
						'번들 분석으로 첫 화면에서 쓰지 않는 코드의 비중을 확인했습니다. 페이지 코드는 해당 화면에 들어갈 때, Excel 라이브러리는 업로드 / 다운로드를 실행할 때 불러옵니다.',
					verification:
						'일반 프로덕션 빌드에서 초기 JavaScript가 2,405.50kB에서 616.60kB로, gzip 기준 815.10kB에서 204.38kB로 줄어든 것을 확인했습니다. 변경 후에도 페이지 이동·데이터 조회·Excel 처리·PC 라벨 출력이 이어지는지 확인했습니다.',
				},
				{
					title: '미리보기와 실제 출력 결과를 따로 확인',
					decision:
						'화면에서 보이는 배치만으로 인쇄 품질을 판단하지 않았습니다. 긴 주소를 실제 폭에 맞춰 나누고 글자 크기와 간격을 조절했습니다.',
					verification:
						'실제 용지에 출력해 긴 주소가 잘리거나 다른 항목과 겹치는 부분을 확인하고 보정했습니다.',
				},
			],
			outcome:
				'첫 진입에 필요한 코드의 크기를 줄이고, 운영 화면에서 선택한 데이터를 실제 라벨로 출력하는 흐름을 정비했습니다.',
		},
		'mobile-output-bridge': {
			context:
				'Android에서 프린터를 선택할 수 있는데도 연결이 실패했습니다. 또 SDK가 출력 요청을 받았다는 사실만으로 실제 인쇄가 끝났다고 표시하면 사용자에게 잘못된 상태를 전달하게 됩니다.',
			points: [
				{
					title: '연결 실패를 SDK 내부 동작까지 추적',
					decision:
						'실기기 로그를 따라가 연결 과정에서 SDK가 기기 검색을 중단하는 동작을 확인했습니다. 이 동작에도 검색 권한이 필요해, 연결 권한뿐 아니라 검색 권한까지 점검하도록 수정했습니다.',
					verification:
						'Android 16 실기기에서 권한 요청, 프린터 연결, 실제 라벨 출력을 차례로 확인했습니다.',
				},
				{
					title: '출력 요청 전송 상태 안내',
					decision:
						'SDK가 출력 요청을 접수하면 화면에 ‘출력 요청 전송’으로 표시하도록 맞췄습니다.',
					verification:
						'SDK 응답과 실물 출력 결과를 각각 확인해 앱이 표시하는 상태의 의미를 맞췄습니다.',
				},
			],
			outcome:
				'React Native 화면에서 Android 네이티브 SDK를 호출해 라벨을 출력하며, 권한 문제와 연결 실패를 구분해 처리합니다.',
		},
		'ai-agent-playbook': {
			context:
				'AI 코딩 도구를 바꾸거나 새 세션을 시작할 때도 프로젝트의 결정과 작업 상태를 이어가고 싶었습니다.',
			points: [
				{
					title: '프로젝트 기록과 스킬을 CLI / MCP로 연결',
					decision:
						'CLI와 읽기 전용 MCP로 프로젝트 규칙과 기록을 조회할 수 있게 했습니다. 패키지 설치 / 프로젝트 초기화 / 스킬 설치 / MCP 연결을 분리해 필요한 기능만 적용합니다.',
					verification:
						'CLI와 MCP가 같은 프로젝트 기록을 다루는지, 각 설치·초기화 경로가 독립적으로 동작하는지 확인하고 Windows·Ubuntu CI에서 검증했습니다.',
				},
				{
					title: '사용자 수정본을 보존하는 설치와 복구',
					decision:
						'파일의 소유 정보와 해시로 수정 여부를 판단합니다. 새 스킬의 유효성을 모두 확인한 뒤 기존 파일을 정리하고, 삭제 직전에도 변경 여부를 다시 확인합니다. 적용 기록과 백업으로 복구할 수 있습니다.',
					verification:
						'설치 중 일부 단계의 실패, 파일 충돌, 검사 후 파일 수정, 복원 시나리오를 테스트하며 실패한 설치가 기존 파일이나 사용자의 수정본을 지우지 않는지 확인했습니다.',
				},
			],
			outcome:
				'프로젝트 기록 구조와 CLI / MCP 서버를 npm 패키지로 배포하고, 소스와 사용 문서를 공개했습니다.',
		},
	},
	en: {
		'ai-document-analysis': {
			context:
				'A document-grounded AI feature needed trustworthy evaluations as well as useful answers. Long answers exceeded the evaluation input limit, and the evaluator sometimes rewrote statements in ways that changed what was being assessed.',
			points: [
				{
					title: 'Fix the evaluation targets and validate the verdicts',
					decision:
						'Fixed the target statements on the server for Ragas evaluation and matched the returned evaluation results by statement ID. Batched long inputs and checked quotations, supporting evidence, and answer coverage separately.',
					verification:
						'Completed evaluation of 25 claims extracted from an answer about a real document in five batches. Checks reject missing or duplicate IDs and invalid response types before malformed verdicts can be stored as valid results.',
				},
				{
					title: 'Separate model latency from application overhead',
					decision:
						'Profiled internal processing with fixed model responses, then removed repeated token counting and reused document pages already processed within the request.',
					verification:
						'After warmup, 20 runs before and after the change showed median internal processing fall from 2,969ms to 672ms. Model call counts stayed unchanged.',
				},
			],
			outcome:
				'Long-answer evaluations can finish, and repeated computation causes less internal delay. Answers appear first, followed by asynchronous Ragas evaluation, so users do not wait for evaluation to finish.',
		},
		'settlement-operations-platform': {
			context:
				'A later save must not overwrite another operator’s changes to settlement data. Rejecting a stale save also should not discard what the user has just entered.',
			points: [
				{
					title: 'Block stale saves and let users resolve the differences',
					decision:
						'The server rejects outdated versions while the screen retains the draft. Users compare the original, latest server, and edited values, then confirm their choices through a separate save.',
					verification:
						'In development, a separate API request updated the record first. Confirmed that a browser save returning 409 preserved both the draft and the latest database values, then checked the resolved save against the database and change history.',
				},
				{
					title: 'Preserve Excel validation through the save step',
					decision:
						'Kept validated data on the server and rechecked permissions and references before persistence. An intermediate failure rolls back the whole transaction; a repeated save request returns its existing result.',
					verification:
						'Reproduced intermediate failures, retries, and concurrent requests in an isolated MariaDB environment to check for partial writes and duplicate application of the same request.',
				},
			],
			outcome:
				'Separated current assignments from finalized settlement history and implemented recovery paths for edit conflicts and failed batch saves. Verification covered the user’s draft and change history as well as save success.',
		},
		'erp-mobile-workflow': {
			context:
				'The ERP-connected mobile app needed to retain the latest state despite delayed notifications and repeated requests. Its PDF download path also had to work beyond the browser environment.',
			points: [
				{
					title: 'Separate notification content from read receipts',
					decision:
						'Version and deletion checks prevent a late creation event from reviving a deleted notification. Read receipts are stored separately; a single UPSERT replaces an update-then-insert sequence while preserving the first seen time.',
					verification:
						'Reproduced a receipt deadlock in isolated MariaDB, then reran concurrent requests. Reversed and repeated notification events to verify that the latest content and receipt state were retained.',
				},
				{
					title: 'Carry file access safely into the mobile environment',
					decision:
						'Replaced browser-only blob URLs with short-lived signed URLs issued when the user requests a download. Access is checked at issuance and download, without putting login tokens in file URLs.',
					verification:
						'Compared a PDF downloaded in Chrome with the original by hash and inspected the values passed to the native bridge. On an Android emulator, checked notification tap → notice list → notice body navigation.',
				},
			],
			outcome:
				'Connected inquiry handling, notifications and PDF downloads to the ERP, including current notification state and download access checks in the mobile app.',
		},
		'delivery-operations-web': {
			context:
				'The operations web app loaded screens and Excel code that were unnecessary at startup. I separated code needed on entry from code needed when a user starts a feature to reduce the initial download size.',
			points: [
				{
					title: 'Use bundle analysis to find and split unnecessary startup code',
					decision:
						'Used bundle analysis to identify code that was not needed on entry. Loaded page code when users entered each screen and Excel libraries when they started an upload or download.',
					verification:
						'In a standard production build, initial JavaScript fell from 2,405.50kB to 616.60kB, or 815.10kB to 204.38kB with gzip. Checked that navigation, data queries, Excel operations, and PC label printing still worked after the change.',
				},
				{
					title: 'Check physical output separately from the preview',
					decision:
						'Did not treat the on-screen layout as proof of print quality. Wrapped long addresses to the available width and adjusted type size and spacing.',
					verification:
						'Printed physical labels to find and correct clipped addresses and overlapping fields.',
				},
			],
			outcome:
				'Reduced the code required at entry and refined the path from selected operational data to physical labels.',
		},
		'mobile-output-bridge': {
			context:
				'Android could select a printer but still failed to connect. An SDK acknowledgment also could not establish that a physical label had finished printing.',
			points: [
				{
					title: 'Trace the connection failure into the SDK',
					decision:
						'Device logs showed that the SDK stopped device discovery during connection. Because that operation also requires scan permission, the app now checks both scan and connection permissions.',
					verification:
						'Checked the permission prompt, printer connection, and physical label output on an Android 16 device.',
				},
				{
					title: 'Show when a print request has been sent',
					decision:
						'Displayed “Print request sent” when the SDK accepted the request.',
					verification:
						'Checked SDK responses and printed labels separately to align the wording with what the app can actually observe.',
				},
			],
			outcome:
				'Connected React Native screens to the Android printer SDK and handled permission and connection failures separately.',
		},
		'ai-agent-playbook': {
			context:
				'I wanted project decisions and work status to carry over when starting a new AI session or changing coding tools.',
			points: [
				{
					title: 'Connect project records and skills through CLI / MCP',
					decision:
						'Provided access to project rules and records through a CLI and read-only MCP. Package installation, project initialization, skill installation and MCP setup can be applied independently.',
					verification:
						'Checked that the CLI and MCP operate on the same project records and that installation and initialization paths work independently, with CI verification on Windows and Ubuntu.',
				},
				{
					title: 'Installation and recovery that preserve user edits',
					decision:
						'Used ownership metadata and hashes to detect modified files. Validated all new skills before cleaning up existing files, rechecked changes immediately before deletion, and retained backups and an application log for recovery.',
					verification:
						'Tested partial installation failures, file conflicts, changes made after inspection, and restoration. Checked that a failed installation does not remove existing files or user edits.',
				},
			],
			outcome:
				'Published the project record structure, CLI and MCP server as an npm package with public source and usage documentation.',
		},
	},
};
