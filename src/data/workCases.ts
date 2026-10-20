import type { Localized } from '@/types/locale';
import type { WorkCaseRecord } from '@/types/work';

export const workCases: Localized<WorkCaseRecord[]> = {
	ko: [
		{
			workstreamId: 'AI01',
			id: 'ai-document-analysis',
			title: 'AI 기반 문서·데이터 분석 플랫폼',
			platform: 'Web / AI',
			area: '검색·답변 품질 및 처리 속도 개선',
			period: '2026.09 ~ 현재',
			role: '풀스택 개발',
			workType: '신규 개발 · 진행 중',
			stack: [
				'React',
				'TypeScript',
				'Tailwind CSS',
				'Vite',
				'TanStack Query',
				'Zustand',
				'Python',
				'Django',
				'MariaDB',
				'SQLGlot',
				'Gemma 4',
				'Ragas',
				'tokenizers',
				'Vitest',
			],
			headline:
				'문서의 내용을 검색하고 질문에 답하는 AI 플랫폼을 풀스택으로 개발했습니다. Gemma 4를 연동하고, 답변에 필요한 근거를 찾는 과정과 답변 품질을 평가하는 기능을 개선했습니다.',
			summary:
				'문서를 등록하고 검색하는 기능부터 분석 결과와 출처를 확인하는 화면까지 개발했습니다. 실제 오류를 재현하면서 문맥이 빠지는 검색 결과와 중간에 멈추는 답변 평가를 수정하고, 반복 계산으로 생기던 처리 지연을 줄였습니다.',
			problem:
				'검색된 문장만 모델에 전달하면 앞뒤 문단에 있는 조건이나 예외가 빠졌습니다. 여러 내용을 한꺼번에 묻는 질문에서는 답할 수 있는 내용이 있어도 설명 대신 원문만 표시되는 문제가 있었습니다. 긴 답변을 평가할 때는 모델의 입력 한도를 넘었고, 같은 텍스트의 길이를 반복해서 계산하는 작업도 문서 분석을 지연시켰습니다.',
			thinking: [
				'검색어가 들어 있는 문장뿐 아니라 그 내용을 이해하는 데 필요한 앞뒤 문단과 참조된 표도 함께 전달하기로 했습니다. 여러 문서를 분석할 때도 각 근거가 어느 문서에서 나왔는지 추적할 수 있도록 했습니다.',
				'원문을 정확히 인용했는지, 답변이 문서에 근거하고 있는지, 질문의 각 항목에 답했는지는 서로 다른 문제였습니다. 한 가지 점수로 판단하지 않고 각각 확인하도록 검증 과정을 나눴습니다.',
				'평가 모델이 검증 대상 문장을 다시 쓰는 과정에서 내용을 바꾸는 문제가 있었습니다. 각 항목에 ID를 붙여 평가 대상 문장을 고정하고, 반환된 평가 결과를 원문 항목과 대조하도록 구성했습니다.',
				'모델의 응답 속도와 애플리케이션 내부의 처리 시간을 구분해야 병목을 찾을 수 있었습니다. 같은 모델 응답을 사용하는 시험을 구성해 반복 계산에 걸리는 시간을 비교했습니다.',
				'사용자가 이미 생성된 답변을 보기 위해 품질 평가까지 기다릴 필요는 없었습니다. 답변을 먼저 보여 주고 평가는 별도로 실행하되, 새 질문이 들어오면 다음 평가 요청을 잠시 미루도록 했습니다.',
			],
			process: [
				'React·TypeScript로 화면을 만들고 Django API, MariaDB 저장·조회 기능, 문서 처리와 Gemma 4 연동을 개발했습니다. 모델이 만든 SQL이 사용자가 선택한 데이터 범위를 벗어나지 않는지 확인하고, 표에 나온 수치·단위와 각 행의 출처도 검증했습니다.',
				'모델에 맞는 토크나이저를 연결해 실제 요청에 포함되는 텍스트와 출력 형식 정보의 토큰 수를 계산했습니다. 긴 문서는 문장 중간이 끊기지 않도록 나누고, 최종 답변에 사용할 근거에서 빠진 부분은 검토하지 못한 범위로 남겼습니다.',
				'Ragas Faithfulness를 사용해 답변에서 검증할 내용을 추출하고, 문서의 근거로 뒷받침되는 항목의 비율을 계산했습니다. 평가 프로그램은 별도 프로세스에서 실행하고, 답변·근거·설정이 바뀌면 이전 평가 결과를 다시 사용하지 않도록 했습니다.',
				'실제 모델을 호출하는 검증과 저장해 둔 오류 응답을 재생하는 검증을 함께 사용했습니다. 응답을 고정한 자동 테스트도 별도로 실행해 수정 후 같은 문제가 다시 발생하는지 확인했고, 일반 문서와 미디어 자료의 처리 결과를 각각 점검했습니다.',
			],
			solution: [
				'검색된 문장의 앞뒤 문단과 문서에서 참조한 절·표를 함께 찾도록 검색 범위를 보완했습니다. 근거가 부족한 부분은 추가로 검토하고, 최종 답변을 만들 때도 원문과 출처를 전달해 문맥이 빠지지 않도록 했습니다.',
				'Ragas로 답변이 문서에 근거하고 있는지 평가하는 과정에서, 긴 답변이 모델의 입력 한도를 넘는 문제가 있었습니다. 검증할 내용을 여러 묶음으로 나누고, 평가 결과의 ID를 원래 항목과 대조해 누락·중복을 확인한 뒤 점수를 계산했습니다.',
				'설명을 요청한 질문을 표 생성 요청으로 잘못 분류하던 조건을 수정했습니다. 질문의 각 항목에 대한 답과 근거 번호를 따로 받고, 인용문은 그 번호에 해당하는 원문에서 직접 가져오도록 했습니다. 답할 수 있는 내용은 유지하고, 근거를 찾지 못한 항목만 구분해 표시했습니다.',
				'문서의 여러 표를 합치는 과정에서 같은 텍스트의 토큰 수를 반복 계산하던 코드를 수정했습니다. 같은 요청 안에서는 이미 분석한 페이지의 결과도 재사용했습니다. 답변은 먼저 저장해 보여 주고 Ragas 평가는 별도 작업으로 실행해, 사용자가 평가 완료까지 기다리지 않도록 했습니다.',
				'미디어 자료를 분석할 때는 앞뒤 대사를 함께 전달해 주어가 빠지거나 답변을 지나치게 유보하는 문제를 보완했습니다. 사용자가 답변의 근거를 직접 확인할 수 있도록 문서의 해당 페이지나 미디어 재생 구간으로 이동하는 기능도 개발했습니다.',
			],
			impact: [
				{
					presentation: 'measurement',
					value: '2,969ms → 672ms',
					label: '문서 분석 처리 시간의 중앙값',
					detail:
						'같은 모델 응답을 사용하는 시험에서 애플리케이션 처리 시간을 비교했습니다. 준비 실행 후 전후 각 20회 측정했으며, 모델·네트워크 대기 시간은 제외했습니다.',
				},
				{
					presentation: 'measurement',
					value: '25개 항목 평가 완료',
					label: '입력 한도를 넘던 긴 답변 평가 개선',
					detail:
						'실제 문서에 대한 Gemma 4 답변에서 검증할 내용을 추출해 5개 묶음으로 평가했습니다. 가장 긴 요청도 8,164토큰으로, 8,192토큰의 입력 한도를 넘지 않았습니다.',
				},
				{
					presentation: 'measurement',
					value: '답변을 먼저 제공하고 평가는 별도로 실행',
					label: '품질 평가를 기다리지 않는 답변 제공',
					detail:
						'Ragas 평가가 끝나기 전에 생성된 답변을 보여 줍니다. 사용자의 새 질문을 처리하는 동안에는 다음 평가 요청을 잠시 미룹니다.',
				},
			],
			checks: [
				'같은 모델 응답을 사용하고 준비 실행 후 변경 전후를 각 20회 측정했습니다. 애플리케이션 처리 시간의 중앙값은 문서 분석에서 2,969ms → 672ms, 지정 문서 검색에서 485ms → 312ms로 줄었습니다. 정상 처리 과정의 모델 호출 횟수는 유지했습니다.',
				'실제 긴 답변에서 검증할 내용 25개를 추출하고 5개 묶음으로 나누어 평가를 완료했습니다. 가장 긴 입력은 8,164토큰이었고, 내용을 추출하는 요청을 포함해 총 6회 호출했습니다. 자동 테스트에서는 ID가 빠지거나 중복된 결과, 잘못된 자료형의 판정을 거부하는지도 확인했습니다.',
				'실제 실행에서 평가가 끝나기 전에 답변이 표시되는 것을 확인했습니다. 새 질문을 처리하는 동안 다음 평가 요청이 보류되는지, 이미 끝난 평가 단계의 결과를 다시 사용할 수 있는지도 점검했습니다.',
				'실제 질문의 답변을 원문과 대조하고, 인용문이나 단위가 달라진 경우와 문서에 근거가 없는 질문을 테스트했습니다. 브라우저에서는 출처 페이지로 이동하고 미디어를 재생한 뒤에도 입력 내용과 선택 상태가 유지되는지 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS13',
			id: 'settlement-operations-platform',
			title: '업무 정산 ERP 플랫폼',
			platform: 'Web / API',
			area: 'ERP 웹 전반과 주요 서버 API·데이터 저장 기능 개발',
			period: '2026.07 ~ 2026.09',
			role: '풀스택 개발',
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
				'차량·기사 정보와 운송료·청구·정산을 관리하는 ERP 웹과 주요 서버 API를 개발했습니다.',
			summary:
				'여러 행을 편집하는 공통 표와 Excel 일괄 등록을 구현했습니다. 저장에 실패하거나 다른 사람의 수정과 충돌해도 입력을 잃지 않도록 했고, 현재 배정 정보가 바뀌더라도 확정된 정산 금액은 유지하도록 처리했습니다.',
			problem:
				'담당자가 표나 Excel에서 입력한 내용을 저장할 때 일부 행만 등록되거나 같은 자료가 두 번 들어가는 일을 막아야 했습니다. 다른 사람이 먼저 수정한 내용을 오래된 화면에서 덮어쓰지 않으면서, 사용자가 입력한 내용도 보존해야 했습니다. 차량·기사 배정이나 청구 원본이 바뀐 뒤에도 과거 정산을 그대로 조회할 수 있어야 했습니다.',
			thinking: [
				'Excel 미리보기에서 검사한 전체 자료를 서버에 보관하고, 최종 저장 직전에 권한과 연결 자료의 변경 여부를 다시 확인하도록 했습니다. 저장 도중 오류가 나면 전체를 취소하고, 같은 요청이 다시 도착하면 기존 결과를 반환하도록 했습니다.',
				'다른 사용자가 먼저 저장한 자료는 조회 당시 버전과 현재 버전을 비교해 오래된 요청을 거절했습니다. 화면에는 입력값을 남기고, 처음 읽은 값과 최신 값, 입력값을 비교해 반영할 내용을 선택한 뒤 별도로 저장하게 했습니다.',
				'현재 배정 정보와 거래 당시의 대상·금액을 나눠 저장했습니다. 대출·보험 원본을 고치면 작성 중이거나 반려된 청구에 변경을 반영하고, 이미 승인했거나 정산에 반영한 금액은 다음 내역에서 조정하도록 했습니다.',
			],
			process: [
				'동일한 자료에 별도 요청으로 먼저 변경을 저장한 뒤, 오래된 화면의 저장이 거절되는 상황을 재현했습니다. 서버의 버전 검사와 화면의 입력 보존을 함께 보완하고, 비교하는 동안 추가 변경이 생겼을 때도 다시 충돌을 확인하도록 했습니다.',
				'격리된 MariaDB에서 일괄 저장 실패와 같은 요청의 재전송을 검사했습니다. 대표 업무는 브라우저 조작 결과를 API 응답, DB의 저장값, 작업 로그와 함께 대조했습니다.',
				'대출 분류처럼 계산 조건을 바꾸지 않는 항목을 수정할 때는 기존 상환표를 유지하도록 했습니다. 불필요한 조회와 재계산을 줄인 뒤 같은 초기 데이터로 변경 전후의 동작과 처리 시간을 비교했습니다.',
			],
			solution: [
				'키보드 셀 이동과 선택창 입력을 지원하는 공통 편집표를 만들고, 저장에 실패한 행의 입력값을 보존했습니다.',
				'Excel 미리보기에서 오류 행과 셀을 찾아 수정하고 서버 검사를 다시 받을 수 있도록 했습니다. 최종 저장은 한 트랜잭션으로 처리해 부분 저장을 막고, 같은 요청을 다시 받으면 기존 결과를 반환하도록 했습니다.',
				'동시 수정으로 저장이 거절되면 최신 자료와 입력값을 비교할 수 있도록 했습니다. 비교 결과를 선택하는 것과 실제 저장을 분리해 사용자의 확인 없이 자료가 바뀌지 않도록 했습니다.',
				'차량·기사의 현재 배정 정보와 거래 당시 정보를 분리하고, 원본 정정이 확정된 정산 금액을 덮어쓰지 않도록 처리했습니다.',
				'관리자가 작업 대상과 변경 내용, 저장 실패 원인을 확인할 수 있도록 로그 화면을 정리했습니다.',
			],
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
			workstreamId: 'WS16',
			id: 'erp-mobile-workflow',
			title: 'ERP 연계 모바일 업무 앱',
			platform: 'Web / API / Android',
			area:
				'채팅 시스템을 제외한 업무 화면·서버 API·Flutter Android 연계 기능 개발',
			period: '2026.07 ~ 2026.09',
			role: '풀스택 개발',
			workType: '기능 개발·연계',
			stack: [
				'React',
				'TypeScript',
				'TanStack Query',
				'TanStack Router',
				'Spring Boot',
				'MariaDB',
				'Flutter',
				'Dart',
				'Firebase Cloud Messaging',
			],
			headline:
				'ERP의 업무 알림과 문서, 문의 처리 결과를 Android 앱에서 확인할 수 있도록 연결했습니다.',
			summary:
				'기존 앱의 채팅 시스템을 제외한 업무 화면과 서버 API, Flutter Android 연계 기능을 개발했습니다. 알림 변경 요청의 순서가 뒤바뀌어도 최신 내용을 유지하도록 했고, 읽음 기록의 동시 저장 오류와 PDF 다운로드, 문의의 중복 완료 문제를 해결했습니다.',
			problem:
				'ERP에서 내용을 수정하거나 삭제한 뒤에도 모바일에 예전 알림이 남을 수 있었습니다. 동시에 들어오는 읽음 저장 요청은 DB 잠금 충돌로 실패했고, 웹에서 만든 파일 주소는 Android 다운로드 기능에서 그대로 사용할 수 없었습니다. 이미 완료한 문의를 뒤늦게 도착한 요청이 덮어쓰는 문제도 막아야 했습니다.',
			thinking: [
				'알림의 업무 내용과 사용자의 읽음 상태를 별도로 관리했습니다. 원본 버전과 삭제 여부를 확인해 최신 변경만 반영하고, 내용을 수정해도 읽음 기록은 유지하도록 했습니다.',
				'읽음 기록을 먼저 갱신한 뒤 없으면 등록하던 처리를 단일 UPSERT로 바꿨습니다. 같은 요청이 반복돼도 최초 표시 시각과 읽은 시각은 바뀌지 않도록 했습니다.',
				'PDF 다운로드에는 짧은 시간 동안 유효한 파일 전용 서명 주소를 사용했습니다. 주소를 발급할 때뿐 아니라 파일을 내려받을 때도 현재 계정과 문서의 접근 권한을 확인하도록 했습니다.',
				'문의 완료 요청은 조회 당시 버전과 현재 처리 상태를 확인하도록 했습니다. 이미 처리된 문의는 구체적인 사유로 거절하고, 화면에는 저장하지 못한 입력을 남겼습니다.',
			],
			process: [
				'알림 변경이 역순으로 도착하거나 같은 요청이 재전송되는 경우를 검사했습니다. 삭제 후 예전 생성 요청이 도착해도 알림이 다시 생기지 않고, 열려 있는 상세 화면에도 변경이 반영되는지 확인했습니다.',
				'격리된 MariaDB에서 읽음 저장의 기존 잠금 충돌을 재현했습니다. 등록과 갱신을 하나의 DB 연산으로 바꾼 뒤 동시 요청의 저장 결과와 최초 시각 보존을 다시 검사했습니다.',
				'브라우저에서 내려받은 PDF를 원본 파일과 대조하고, Android 다운로드로 전달하는 주소와 요청값을 검사했습니다.',
				'로컬 화면에서 모바일 문의 접수, 관리자 완료, 모바일의 처리 결과 확인을 이어서 검수했습니다. Android 에뮬레이터에서는 시스템 알림 수신과 알림을 눌렀을 때의 화면 이동을 확인했습니다.',
			],
			solution: [
				'알림의 버전과 삭제 상태를 확인해 최신 수정만 반영하고, 삭제된 알림이 늦은 요청으로 다시 나타나는 경우를 막았습니다. 기존 읽음 상태를 유지하면서 목록과 열린 상세 화면을 갱신했습니다.',
				'표시·읽음 기록을 단일 UPSERT로 저장하도록 바꿔 동시 요청의 잠금 충돌을 해결했습니다. 계정과 알림별로 기록을 구분하고 최초 시각을 보존했습니다.',
				'파일 전용 서명 주소로 PDF 다운로드를 연결하고, 실제 요청에서 서명·만료 시간·현재 접근 권한을 다시 검사했습니다. 이미지는 미리보기로 제공했습니다.',
				'문의의 버전과 완료 상태를 검사해 중복 완료를 거절했습니다. 접수·완료 이력을 ERP에 전달할 때도 같은 이벤트가 중복 기록되지 않도록 했습니다.',
				'Flutter의 알림 수신과 WebView 화면 이동을 연결해, 시스템 알림을 누르면 해당 업무 내용을 확인할 수 있도록 했습니다.',
			],
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
		{
			workstreamId: 'WS11',
			id: 'mobile-operations-platform',
			title: '택배 업무 앱',
			platform: 'Web / Android',
			area: '지도 화면과 오프라인 저장·재전송 기능 수정',
			period: '2026.08',
			role: '기존 웹·앱과 서버 기능 유지보수',
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
				'택배 업무 앱의 지도 화면과 오프라인 저장·재전송 기능을 유지보수했습니다.',
			summary:
				'React 업무 화면과 React Native 앱, Spring Boot API를 수정했습니다. 지도 선택과 복귀 동작을 고치고, 전송 대기 중인 요청을 앱 재실행 후에도 복원하도록 했습니다.',
			problem:
				'통신이 끊기거나 앱을 다시 실행하면 입력한 처리 내용과 전송 대기 요청을 잃을 수 있었습니다. 다른 계정으로 로그인했을 때 이전 사용자의 요청이 전송되는 경우도 막아야 했습니다.',
			thinking: [
				'사용자가 확정한 처리 내용을 앱 저장소에 먼저 기록한 뒤 전송하도록 했습니다.',
				'대기 요청이 현재 로그인한 사용자의 것인지 확인하고, 이미 서버에 반영된 결과를 확인한 뒤 재전송하도록 했습니다.',
				'지도에서 업무를 선택했을 때와 처리를 마치고 돌아왔을 때의 상태를 나눴습니다. 새 위치 기능은 설치된 앱이 지원하는지 먼저 확인한 뒤 호출했습니다.',
			],
			process: [
				'필터가 바뀌어도 지도 그룹 번호를 유지하고 선택한 업무 처리 뒤 기존 지도 위치로 돌아오도록 연결했습니다.',
				'현재 위치를 찾지 못했을 때는 권한 거부, 위치 서비스 비활성, 시간 초과를 구분했습니다. 새 위치 기능을 지원하지 않는 앱은 기존 웹 위치 조회 방식을 사용했습니다.',
				'앱을 다시 실행하면 로그인 사용자와 전송 대기 요청을 복원한 뒤 전송을 시작했습니다. 기존 로그인 세션에서도 요청의 소유자를 확인할 수 있도록 사용자 정보 복원을 보완했습니다.',
			],
			solution: [
				'오프라인에서도 업무에 필요한 목록을 사용할 수 있도록 앱 저장소에 보관했습니다. 배달 완료 요청과 선택한 사진은 순서대로 저장하고, 저장이 끝난 뒤 서버로 전송했습니다.',
				'재전송 전에 서버의 완료 내역과 대기 요청을 대조했습니다. 처리 결과가 충돌하거나 업무 오류가 있는 요청, 사진을 복원하지 못한 요청은 사용자가 확인하도록 남겼습니다.',
				'업무 처리 후 이전 지도 위치로 돌아가도록 하고, 앱의 위치 기능 지원 여부를 확인하도록 했습니다. 수령인과 선택 첨부파일의 입력 규칙도 웹과 서버에서 맞췄습니다.',
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
			],
		},
		{
			workstreamId: 'WS07',
			id: 'delivery-operations-web',
			title: '물류 운영 웹',
			platform: 'Web',
			area: '프론트엔드 전체 개발',
			period: '2026.04 ~ 2026.06',
			role: '프론트엔드 전체 개발',
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
				'조회·예약·Excel 등록과 라벨 출력으로 이어지는 물류 웹의 React·TypeScript 프론트엔드 전체를 개발했습니다.',
			summary:
				'조회·예약·Excel 등록 화면을 개발하고, 서버가 반환한 예약·라벨 데이터를 미리보기와 출력에 연결했습니다. 페이지와 Excel 처리 코드를 필요한 시점에 불러오도록 바꿔 초기 JavaScript 파일 크기를 약 74% 줄였습니다. 실제 PC 출력물을 확인하며 긴 주소의 잘림과 겹침도 보정했습니다.',
			impact: [
				{
					presentation: 'measurement',
					value: '2,405.50 → 616.60 kB',
					label: '초기 JavaScript 파일 크기',
					detail: '2026.05 빌드 산출물 기준 약 74% 감소',
				},
				{
					presentation: 'measurement',
					value: '815.10 → 204.38 kB',
					label: 'gzip 압축 크기',
					detail: '초기 JavaScript 파일의 압축 크기 약 75% 감소',
				},
			],
			problem:
				'여러 업무 화면에 표·입력 폼·모달이 반복돼 함께 사용할 구조가 필요했습니다. 첫 화면에서 쓰지 않는 페이지와 Excel 라이브러리까지 한 번에 불러와 초기 JavaScript 파일이 커졌고, 화면 미리보기가 정상이어도 실제 라벨에서는 긴 주소가 잘리거나 겹쳤습니다.',
			thinking: [
				'조회 데이터, 입력 상태, 출력 요청을 분리하고 표·폼·모달은 공통 컴포넌트로 구성했습니다.',
				'번들 분석으로 첫 화면에서 필요하지 않은 코드의 비중을 확인하고, 페이지 진입과 Excel 기능 실행 시점에 맞춰 나눠 불러오도록 했습니다.',
				'웹에서 보내는 출력 데이터는 통일하고, PC의 로컬 프린터 프로그램과 Android 앱의 Bluetooth 출력은 각각의 연결 방식에 맞춰 처리했습니다.',
			],
			process: [
				'모의 데이터와 실제 API 연결을 분리해 로딩·빈 결과·오류 상태를 구현했습니다.',
				'예약 한 건에 여러 라벨 번호가 배정되는 응답을 목록과 모달에 표시하고, 미리보기와 출력 요청에 사용할 데이터로 변환했습니다.',
				'실물 라벨에서 주소가 잘리거나 겹치는 위치를 확인한 뒤 줄바꿈, 글자 크기와 줄 간격을 조정했습니다.',
			],
			solution: [
				'공통 표·입력 폼·모달을 사용해 예약 접수, 다건 처리, 주소록 선택과 Excel 미리보기를 구현했습니다.',
				'React.lazy로 페이지 코드를 분리하고, Excel 라이브러리는 업로드·다운로드를 실행할 때 불러오도록 변경했습니다.',
				'예약 식별자와 여러 라벨의 API 응답을 PC·Android 출력용 데이터로 변환하고, 출력할 항목과 프린터 연결 상태를 확인하도록 했습니다.',
				'PC 라벨의 긴 주소는 글자 폭에 맞춰 줄바꿈하고 글자 크기와 줄 간격을 조정했습니다. 화면에 표시하는 운송장 번호의 형식을 바꿔도 바코드 데이터는 원래 값을 유지했습니다.',
			],
			checks: [
				'2026.05 빌드 산출물에서 초기 JavaScript 파일과 gzip 압축 파일의 크기를 비교했습니다.',
				'페이지 이동, 데이터 조회, Excel 처리와 PC 라벨 출력이 지연 로딩 이후에도 이어지는지 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS10',
			id: 'hybrid-life-info-platform',
			title: '생활정보 앱',
			platform: 'Android',
			area: '프론트엔드·백엔드 기능 개발',
			period: '2026.06 ~ 2026.07',
			role: '기존 앱의 날씨 기능 개발',
			workType: '기능 확장',
			stack: ['Spring MVC', 'JSP', 'jQuery', 'Java', 'Android'],
			headline:
				'여러 공공 데이터 API를 연동해 날씨·생활정보 기능을 확장하고, 반복 호출을 줄이기 위해 서버 캐시를 적용했습니다.',
			summary:
				'공공 데이터 API를 연동해 날씨·대기질·기상특보를 조회하는 기능을 확장했습니다. 현재 날씨와 핵심 예보를 먼저 표시하고 부가 정보는 나중에 불러오도록 나눴으며, 서버 캐시와 동시 요청 통합으로 반복 호출을 줄였습니다.',
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
				'날씨 정보를 제공하려면 여러 공공 데이터 API에 나뉜 데이터를 모아야 했습니다. 화면을 조회할 때마다 같은 데이터를 반복 요청하면 호출이 과도해질 수 있었고, 일부 API의 지연이 전체 화면 표시를 늦출 수 있었습니다.',
			thinking: [
				'여러 공공 데이터 API의 응답을 서버에 캐시해 같은 데이터를 반복해서 요청하지 않도록 했습니다.',
				'먼저 보여야 하는 핵심 정보와 늦게 채워져도 되는 보조 정보를 분리했습니다.',
				'외부 API가 실패하면 허용한 범위에서 이전 값을 사용했습니다. 만료된 특보의 ‘없음’은 ‘확인 불가’로 구분하고, 이전 특보를 표시할 때는 최근 조회 기준임을 안내했습니다.',
			],
			process: [
				'현재 날씨와 핵심 예보를 먼저 표시하고, 대기질·특보·일별 예보는 별도로 불러오도록 나눴습니다.',
				'정보별 갱신 주기에 맞춰 캐시 유효 시간을 나누고, 같은 데이터의 동시 요청은 하나의 외부 조회 결과를 공유하도록 했습니다.',
				'기준 데이터는 임시 저장과 필수값 검증을 거친 뒤 캐시를 교체했습니다.',
				'캐시는 단일 Tomcat의 JVM 메모리 범위에 적용했습니다.',
			],
			solution: [
				'대기질·중기예보·기상특보 API를 연동하고, 특보 내용을 확인하는 모달을 구현했습니다.',
				'기준 데이터를 서버에 캐시했습니다. 갱신한 자료는 임시로 보관하며 필수값을 검사한 뒤 기존 캐시와 교체했습니다.',
				'Android WebView에서 앱의 위치 조회 기능을 사용할 수 있도록 연결했습니다. 조회에 실패하면 저장된 위치나 브라우저 위치 조회를 사용했습니다.',
				'일기 에디터와 Android 카메라·앨범 선택 동작을 수정하고, 생활동선 지도의 거리·마커 표시를 보완했습니다.',
			],
			checks: [
				'최초 조회, 캐시 재사용과 외부 API 실패 시 이전 값 표시를 확인하고 운영 환경에 반영했습니다.',
			],
		},
		{
			workstreamId: 'WS06',
			id: 'ai-kickoff-documentation-tool',
			title: 'AI 보조 프로젝트 문서화 웹',
			platform: 'Tooling',
			area: '프론트엔드·백엔드 개발',
			period: '2026.04',
			role: '내부 도구 구축',
			workType: '내부 도구 개발',
			stack: ['Node.js', 'TypeScript', 'React', 'AI API', 'xlsx', 'Vitest'],
			headline:
				'저장소·업로드 자료에서 요구사항을 검토하고 문서를 작성하는 AI 보조 웹 도구를 개발했습니다.',
			summary:
				'저장소 분석과 신규 프로젝트 자료 업로드를 지원하는 화면을 만들었습니다. 자료 정리, 요구사항 후보와 확인 질문 검토, 문서 작성 순서로 구성했습니다. 문서는 표에서 편집하고, AI 수정 요청에는 선택한 시트·셀과 주변 내용을 함께 전달하도록 했습니다.',
			impact: [
				{
					value: '자료 확인 후 초안 생성',
					label: '문서 작성 순서',
					detail: '수집한 자료를 검토한 뒤 AI로 문서 초안 작성',
				},
				{
					value: '표에서 검토·편집',
					label: '문서 편집',
					detail: '요구사항·기능 정의서·화면 설계서를 시트별 표로 검토',
				},
				{
					value: '선택한 부분만 수정',
					label: 'AI 수정 요청',
					detail: '수정할 시트·셀과 유지할 주변 내용을 함께 전달',
				},
			],
			problem:
				'정리하지 않은 자료를 모델에 바로 전달하면 근거가 있는 내용과 추측이 섞일 수 있었습니다. 일부 문서만 수정할 때 관련 없는 내용까지 바뀌는 문제도 막아야 했습니다.',
			thinking: [
				'정해진 규칙에 따라 저장소 자료를 수집한 뒤 AI 초안 생성에 사용했습니다.',
				'표의 JSON 데이터를 원본으로 관리하고, Markdown과 내보내기 파일은 이 데이터에서 생성했습니다.',
				'자동화는 초안 생성까지 맡기고 최종 검토와 보강은 사람이 확인할 수 있는 표 구조로 남겼습니다.',
			],
			process: [
				'수집한 자료와 요구사항 후보를 먼저 확인하도록 했습니다. 선행 문서가 준비된 뒤 기능·화면 문서를 생성하도록 화면의 진입 조건을 구분했습니다.',
				'생성한 문서를 시트별로 나눠 표에서 검토할 수 있게 했습니다.',
				'선택한 시트와 셀, 주변 내용을 함께 전달해 필요한 부분만 다시 작성하도록 했습니다.',
				'AI가 정리할 항목과 사용자가 결정할 항목을 구분하고, 근거 없이 임시 내용을 채워 넣지 않도록 했습니다.',
			],
			solution: [
				'저장소와 업로드 자료의 수집부터 생성 미리보기, 표 편집과 내보내기까지 이어지는 화면과 서버 API를 개발했습니다.',
				'요구사항·기능 정의서·화면 설계서를 시트별 표에서 검토하고 수정할 수 있도록 했습니다. 내보내기 파일에도 수정한 내용을 반영했습니다.',
				'수정할 시트·셀과 주변 내용을 AI에 함께 전달했습니다. 수정할 범위와 유지할 내용을 구분해 문서 전체를 다시 생성하지 않고 선택한 부분을 고칠 수 있도록 했습니다.',
			],
			checks: [
				'선택한 시트·셀을 다시 작성할 때 다른 내용이 유지되고 일부 생성 실패 뒤에도 성공한 문서를 사용할 수 있는지 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS05',
			id: 'mobile-output-bridge',
			title: '모바일 출력 브릿지 앱',
			platform: 'Android',
			area: 'Android 앱 개발',
			period: '2026.04 ~ 2026.06',
			role: 'Android 출력 앱 개발',
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
				'물류 운영 웹의 라벨 출력 요청을 Android 네이티브 모듈과 Bluetooth 프린터에 연결하는 앱을 개발했습니다.',
			summary:
				'업무 화면은 WebView로 제공하고 프린터 선택·연결·출력은 앱에서 처리하도록 구현했습니다. 장비는 선택되지만 연결되지 않는 문제를 실기기 로그와 SDK 내부 호출까지 추적해 필요한 Bluetooth 권한을 보완했습니다.',
			impact: [
				{
					value: '웹 요청에서 장비 출력까지',
					label: 'WebView·네이티브 연동',
					detail: '출력 데이터를 변환하고 장비 선택·연결·출력을 처리',
				},
				{
					value: '실기기 확인',
					label: '장비 출력 검증',
					detail: 'Android 실기기에서 권한·연결·출력 확인',
				},
			],
			problem:
				'웹의 출력 요청을 Android 프린터 SDK에 전달하고, 사용자가 프린터를 선택한 뒤 권한 요청·연결·출력을 진행할 수 있어야 했습니다. 실제 기기에서는 프린터가 목록에 표시되고 선택도 되지만 연결 단계에서 실패하는 문제가 있었습니다.',
			thinking: [
				'업무 화면은 웹에 두고 장비와 직접 연결하는 출력 기능은 네이티브 모듈로 분리했습니다.',
				'웹 요청, 앱 권한, SDK 연결, 실제 출력 단계를 나눠 오류가 발생한 위치를 확인했습니다.',
				'SDK가 명령을 받았다는 응답과 종이에 인쇄가 끝났다는 의미가 섞이지 않도록 완료 안내를 출력 요청 전송으로 정리했습니다.',
			],
			process: [
				'웹에서 받은 라벨 데이터를 네이티브 모듈의 출력 형식으로 변환하고, 운송장 번호가 없는 항목은 출력 대상에서 제외했습니다.',
				'Android 16 실기기 로그를 따라가 SDK가 연결 직전에 장비 탐색을 취소하는 API를 호출한다는 점을 확인했습니다. 이 호출에도 탐색 권한이 필요해 BLUETOOTH_SCAN과 BLUETOOTH_CONNECT를 함께 요청하도록 수정했습니다.',
				'권한과 Bluetooth 연결을 확인한 뒤 실제 라벨을 출력해 수정 결과를 점검했습니다.',
			],
			solution: [
				'WebView 브리지와 Android 네이티브 모듈 사이의 출력 요청·응답 처리를 구현했습니다.',
				'출력할 항목과 프린터를 앱에서 확인하고, 권한 요청·장비 연결·출력 중 발생한 오류를 안내하도록 했습니다.',
				'진단 화면에서 권한, 페어링된 장비, SDK 초기화와 연결 상태, 테스트 출력을 각각 확인할 수 있도록 구성했습니다.',
			],
			checks: [
				'Android 16 / API 36 실기기에서 권한 요청, Bluetooth 연결과 실물 라벨 출력을 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS01',
			id: 'legacy-mobile-compatibility',
			title: '출고·재고 관리 레거시 앱',
			platform: 'Android',
			area: '빌드 환경과 OS별 권한·파일 접근·뒤로가기 처리 수정',
			period: '2026.03',
			role: '기존 Android 앱의 버전 호환성 개선',
			workType: '유지보수',
			stack: ['Android Java', 'Gradle/AGP', 'RxJava', 'FileProvider'],
			headline:
				'레거시 Android 앱의 빌드를 복구하고 OS별 권한·파일·뒤로가기 처리를 정리했습니다.',
			summary:
				'정적 웹을 WebView로 사용하는 기존 Android 업무 앱의 빌드 환경을 업데이트했습니다. Android 버전 변화에 맞춰 권한·파일 접근·뒤로가기 동작을 수정하고, 로그인과 초기 동기화 문제를 개선했습니다.',
			impact: [
				{
					value: '개발 환경에서 빌드 복구',
					label: 'Gradle/AGP/JDK/SDK',
					detail: '빌드 도구 변경과 target SDK·런타임 동작 변경을 분리',
				},
				{
					value: 'OS별 처리 분리',
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
				'기존 support 라이브러리를 유지하면서도 앱을 컴파일할 수 있도록 빌드 오류를 수정했습니다.',
				'최신 Android API를 직접 참조해 구형 OS에서 앱이 시작되지 않을 수 있는 부분을 분리했습니다. 파일 접근과 권한 확인도 공통 함수로 모아 화면마다 같은 버전 검사를 반복하지 않도록 했습니다.',
				'웹 화면과 Android 사이에 주고받는 응답과 비동기 오류의 형식을 맞췄습니다. 장비나 외부 기능의 실패가 앱 전체 종료로 이어지지 않도록 대체 처리를 구현했습니다.',
			],
			checks: [
				'빌드와 권한·파일·브리지 처리를 점검하고, 여러 구형 OS 실기기에서도 동작을 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS02',
			id: 'field-terminal-android',
			title: '물류 입출고 PDA 앱',
			platform: 'Android',
			area: '입고 화면과 수량 입력·바코드 스캔 개발, Android 버전 대응',
			period: '2026.03 ~ 2026.04',
			role: '기존 PDA 앱의 유지보수와 입고 기능 추가',
			workType: '유지보수·기능 추가',
			stack: ['Android Java', 'Gradle/AGP', 'Scanner SDK'],
			headline:
				'물류 입출고 PDA 앱의 Android 호환성을 개선하고 입고 화면과 스캔 입력 기능을 추가했습니다.',
			summary:
				'기존 PDA 앱의 빌드 환경과 Android 저장소·업데이트 흐름을 정비했습니다. 입고 화면의 조회 조건과 수량 입력 모달, QR·바코드 스캔 처리를 구현했습니다.',
			impact: [
				{
					value: '빌드 복구',
					label: 'Gradle/JDK 정리',
					detail: '운영 서명 유무와 개발 빌드 경로 분리',
				},
				{
					value: '업무 모드별 수량 계산',
					label: '스캔 입력',
					detail: '기존 스캔 처리와 새 모드의 코드 검사·수량 규칙을 분리',
				},
			],
			problem:
				'운영 서명이나 오래된 빌드 설정이 맞지 않으면 개발 환경에서 기능을 확인하기 어려웠습니다. 에뮬레이터에서 동작한 기능도 실제 단말에서는 입력 시점에 따라 실패할 수 있어 실기기 확인이 필요했습니다.',
			thinking: [
				'운영 배포 조건과 로컬 개발 빌드 가능 여부를 분리했습니다.',
				'빌드 도구 최신화와 런타임 동작 변경을 같은 문제로 묶지 않았습니다.',
			],
			process: [
				'Gradle, JDK, SDK, 서명 조건을 나눠 빌드 실패 원인을 좁혔습니다.',
				'로그인, 초기 데이터, 스캔 입력 흐름을 별도 단계로 확인했습니다.',
			],
			solution: [
				'운영 배포용 서명이 없어도 개발 빌드를 실행할 수 있도록 서명 조건을 분리했습니다.',
				'업데이트 파일을 앱 전용 저장소에 보관하고, 버전 확인부터 다운로드·설치까지의 처리를 정비했습니다.',
				'입고 조회 조건과 수량 입력 모달을 추가하고 QR·바코드 스캔 결과를 연결했습니다. 기존 업무와 새 모드의 코드 검사·중복 허용·수량 계산 규칙을 나눠 기존 스캔 처리를 유지했습니다.',
				'외부 검증에 실패한 스캔은 오류를 바로 표시하고, 빈 응답 때문에 후속 처리에서 앱 오류가 생기지 않도록 했습니다.',
			],
			checks: [
				'개발/운영 빌드 경로와 주요 진입 흐름을 확인했습니다.',
				'PDA 실기기의 스캔 입력과 로그를 확인해 외부 검증 실패와 앱 내부 오류를 구분했습니다. 스캔 규칙과 오류 처리에 대한 단위 테스트와 빌드를 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS04',
			id: 'structured-editor-ui',
			title: '차트 미리보기 페이지',
			platform: 'Web',
			area: '차트 설정과 데이터 연결, 미리보기 화면 개발',
			period: '2026.03 ~ 2026.04',
			role: '차트 설정·미리보기 기능 개발',
			workType: '기능 개발',
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
				'개발 중이던 사이트에서 차트에 사용할 데이터와 표시 방식을 설정하는 페이지를 맡았습니다. 차트 종류에 맞는 설정을 보여 주고, 선택한 데이터와 옵션을 Chart.js 미리보기에 반영했습니다.',
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
				'차트 종류에 맞는 설정만 보여 주고, 각 데이터 필드를 어느 축과 값에 연결할지 선택하도록 했습니다.',
				'설정값을 바꿀 때마다 차트 전체를 새로 만들지 않도록, 편집한 값을 관리하는 부분과 차트를 갱신하는 조건을 분리했습니다.',
			],
			process: [
				'데이터 선택, 필드 연결, 차트 선택과 설정 패널을 하나의 편집 화면으로 구성했습니다.',
				'차트 방향과 표시 밀도를 바꿀 수 있게 하고 데이터가 많을 때 스크롤과 한 화면 맞춤을 선택하도록 했습니다.',
				'도움말과 드래그 중 표시를 별도 레이어에 두고 로딩·빈 상태·오류를 구분했습니다.',
				'WebGL/GLSL 프래그먼트 셰이더와 OGL로 편집 화면의 배경 모드를 구현했습니다.',
			],
			solution: [
				'6개 영역의 설정 패널을 Chart.js 미리보기와 연결하고, 데이터 필드를 끌어다 놓아 차트의 축과 값에 연결할 수 있도록 했습니다.',
				'혼합 차트가 불필요하게 다시 생성되는 조건을 줄여 미리보기의 깜빡임과 스크롤 흔들림을 완화했습니다.',
			],
			checks: [
				'차트 종류·옵션 변경, 패널 접기, 필드 드래그와 도움말 표시를 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS08',
			id: 'hybrid-security-boundary',
			title: '개인정보 보호 앱',
			platform: 'Android',
			area: '프론트엔드·백엔드 기능 개발',
			period: '2026.06',
			role: '기존 앱의 이메일 유출·이미지 검사 기능 개발',
			workType: '기능 확장',
			stack: ['Android', 'Cordova', 'Spring MVC', 'jQuery', 'Java'],
			headline:
				'외부 API를 연동해 이메일 유출 여부와 딥페이크 이미지를 검사하는 기능을 구현했습니다.',
			summary:
				'기존 앱에 이메일 유출 조회와 딥페이크 이미지 검사 기능을 추가했습니다. 외부 검사 API를 서버에서 호출하고, 이메일·이미지 입력부터 결과 확인까지 이어지는 화면을 개발했습니다. Android 앱의 이미지·파일 선택도 함께 연결했습니다.',
			impact: [
				{
					value: '서버에서 외부 API 호출',
					label: '인증 정보 관리',
					detail: '외부 API 호출과 인증 정보 관리를 서버로 분리',
				},
			],
			problem:
				'기존 앱에 이메일 유출 여부와 딥페이크 이미지를 검사하는 기능이 필요했습니다. 사용자 입력을 외부 검사 API에 전달하면서도 API 인증 정보가 앱이나 브라우저에 노출되지 않도록 해야 했습니다.',
			thinking: [
				'외부 API 조회는 서버 프록시에서 처리하도록 했습니다.',
				'클라이언트에는 화면에 필요한 결과와 상태만 전달하도록 응답을 구성했습니다.',
			],
			process: [
				'클라이언트 입력부터 서버 프록시 호출, 외부 응답, 화면 표시까지 단계별로 나눠 처리했습니다.',
				'WebView의 파일 선택은 입력 경로별로 에뮬레이터와 실기기에서 확인했습니다.',
			],
			solution: [
				'이메일 유출 조회와 딥페이크 이미지 검사 API를 연동하고, 사용자 입력부터 검사 요청과 결과 표시까지 구현했습니다.',
				'이미지의 파일 형식·용량·해상도를 검사한 뒤 서버로 전송하고, 외부 API의 결과와 오류를 화면에 맞게 표시했습니다.',
				'Android의 이미지·파일 선택 결과를 WebView에 전달해 앱 안에서 검사를 진행할 수 있도록 했습니다.',
				'파일을 읽는 중 다른 이미지를 선택하면 이전 작업이 더 늦게 끝날 수 있었습니다. 완료된 작업이 현재 선택한 파일의 것인지 확인해, 이전 이미지가 새 미리보기를 덮지 않도록 했습니다.',
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
			area: '프론트엔드 전체 개발',
			period: '2026.02 ~ 2026.03',
			role: '프론트엔드 전체 개발',
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
				'계좌·종목·주문 정보를 조회하고 등록·수정하는 화면을 개발했습니다. MSW로 API 응답을 구성하고, 여러 화면에서 사용할 테이블·필터·모달을 공통 컴포넌트로 만들었습니다. 테이블에는 열 고정·너비 조절·재정렬과 행 선택 기능을 구현했습니다.',
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
				'주문내역에서는 선택 중인 필터와 조회에 적용한 조건을 분리했습니다. 같은 조건으로 다시 조회하면 첫 페이지부터 불러오고, 더보기 요청이 진행 중일 때는 중복 요청을 막았습니다.',
			],
			solution: [
				'React·TypeScript로 프론트엔드 전체를 구축했습니다. 계좌·종목·주문 화면에서 같은 방식으로 열을 고정하고 너비와 순서를 바꿀 수 있도록 공통 테이블을 만들었습니다.',
				'MSW 모의 API를 사용해 조회와 입력 동작을 구현했습니다. 선택 중인 필터와 조회에 적용한 조건을 분리하고, 조회 버튼을 눌렀을 때 TanStack Query로 데이터를 갱신하도록 했습니다.',
			],
			checks: [
				'MSW 모의 응답을 사용하는 로컬 환경에서 컬럼 조작, 스크롤, 검색 모달과 화면 상태를 확인했습니다.',
			],
		},
		{
			workstreamId: 'WS14',
			id: 'multi-role-hybrid-platform',
			title: '회원·문의 관리 웹 및 앱 솔루션',
			platform: 'Web / Android',
			area: '회원 관리와 문의·첨부 기능 개발, Android 파일 선택 연동',
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
				'회원 검색·수정·중복 통합과 문의·첨부 기능을 개발했습니다. 회원 역할과 작성자를 서버에서 확인해 조회·수정 범위를 제한하고, Android 앱에서도 파일을 선택해 문의에 첨부하고 이미지를 확대해 볼 수 있도록 연결했습니다.',
			problem:
				'역할이 다른 회원이 같은 식별값을 가질 수 있어 회원 검색·수정 시 역할을 구분해야 했습니다. 웹에 파일 입력이 있어도 앱에 선택기가 연결되어 있지 않으면 문의에 파일을 첨부할 수 없었습니다.',
			thinking: [
				'사용자 역할과 자료 소유권을 서버에서 확인하고, 문의·답변·첨부에 같은 접근 조건을 적용했습니다.',
				'공통 팝업 코드를 바꾸면 다른 화면에도 영향을 줄 수 있어, 회원 수정창 안에서 로딩·실패·닫기를 처리했습니다. 닫힌 창의 응답이 늦게 도착해도 새로 연 창의 내용을 바꾸지 않도록 구분했습니다.',
			],
			process: [
				'저장 성공과 부모 화면 갱신을 분리해 알림을 빨리 닫거나 응답이 늦어도 이전 값이 남지 않도록 했습니다.',
				'Android 파일 선택의 취소·재선택과 작성 중 뒤로가기 처리를 연결했습니다.',
			],
			solution: [
				'본인 정보에서 허용된 항목만 수정할 수 있도록 했습니다. 중복 회원을 통합할 때는 남길 정보와 연결된 계정·이력을 서버에서 다시 확인했습니다.',
				'문의와 답변에 첨부된 이미지를 미리 볼 때도 해당 자료를 조회할 권한이 있는지 확인했습니다.',
				'Android 파일 선택 결과를 WebView에 연결하고, 선택 취소·재선택과 첨부 목록 복귀를 처리했습니다.',
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
			workstreamId: 'WS12',
			id: 'legacy-support-web',
			title: '물류 고객지원 레거시 웹',
			platform: 'Web',
			area: 'Excel 업로드 오류를 구분하는 안내와 처리 개선',
			period: '2026.08',
			role: '기존 고객지원 웹의 오류 조사와 처리 개선',
			workType: '유지보수',
			stack: ['Java', 'Spring MVC', 'JSP', 'MyBatis', 'jQuery', 'Apache POI'],
			headline:
				'같은 시간 초과 안내로 가려졌던 파일 파싱·입력 검증·통신 실패를 분리했습니다.',
			summary:
				'Excel 업로드 오류를 파일 분석·입력 검증·통신 단계별로 구분해 표시했습니다. 대량 업로드에서 행마다 반복되는 DB 조회 비용을 조사하고 개선안을 제안했습니다.',
			problem:
				'모든 Ajax 실패가 같은 문구로 표시돼 입력 오류와 통신 장애를 구분하기 어려웠습니다. 대량 입력은 행별 DB 조회와 응답 크기가 늘어나 작은 파일의 성공만으로 안전성을 판단할 수 없었습니다.',
			thinking: [
				'파싱 성공, HTTP 성공, 업무상 등록 가능을 각각 확인했습니다.',
				'오류 정보는 다음 조사에 필요한 항목만 보여 주고 내부 HTML과 예외 원문은 노출하지 않았습니다.',
				'입력 행 수에 따라 DB 호출과 메모리가 늘어나는 지점을 조사했습니다.',
			],
			process: [
				'행마다 반복되는 중복 검사 쿼리와 인덱스 전체 스캔을 확인했습니다. 입력 제한과 일괄 조회를 개선안으로 제안했습니다.',
			],
			solution: [
				'파일 분석과 등록 요청에서 통신 오류·입력 검증 실패·시간 초과·취소·응답 해석 오류를 구분했습니다. 오류가 발생한 단계와 경과 시간도 함께 표시했습니다.',
				'서버 응답 중 사용자에게 보여도 되는 메시지만 선택해 안내했습니다. 내부 오류 페이지와 예외 정보는 제외하고, 동적인 문구가 HTML로 해석되지 않도록 처리했습니다.',
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
			workstreamId: 'AI01',
			id: 'ai-document-analysis',
			title: 'AI Document and Data Analysis Platform',
			platform: 'Web / AI',
			area: 'Search and answer quality, processing performance',
			period: '2026.09 ~ Present',
			role: 'Full-stack development',
			workType: 'New development · In progress',
			stack: [
				'React',
				'TypeScript',
				'Tailwind CSS',
				'Vite',
				'TanStack Query',
				'Zustand',
				'Python',
				'Django',
				'MariaDB',
				'SQLGlot',
				'Gemma 4',
				'Ragas',
				'tokenizers',
				'Vitest',
			],
			headline:
				'Built a full-stack platform that searches documents and answers questions using Gemma 4. Improved how it retrieves supporting evidence and evaluates the answers it produces.',
			summary:
				'Developed document upload, search, analysis and source-inspection features. Reproduced real failures to recover missing context, complete interrupted answer evaluations and reduce delays caused by repeated computation.',
			problem:
				'Sending only the matched passage to the model left out conditions and exceptions in nearby paragraphs. Questions with several parts sometimes returned source text instead of explanations, even when some parts could be answered. Evaluating long answers exceeded the model input limit, while repeated text-length calculations also delayed document analysis.',
			thinking: [
				'A passage needed the surrounding paragraphs and referenced tables to be understood correctly. I included that context and kept track of which document supplied each piece of evidence.',
				'An exact quotation, an answer supported by the document and a response covering every part of the question are different checks. I tested them separately instead of treating one score as proof of all three.',
				'The evaluation model sometimes changed the statements it was asked to repeat. I assigned an ID to each fixed target statement and matched the returned evaluation results to the original items.',
				'To locate application bottlenecks, I needed to separate local processing from model response time. I used fixed model responses and compared the time spent on repeated calculations.',
				'Users did not need to wait for quality evaluation to read an answer that was already complete. I returned the answer first and evaluated it separately, deferring the next evaluation request while a new question was being processed.',
			],
			process: [
				'Built React and TypeScript interfaces, Django APIs, MariaDB storage and queries, document processing and Gemma 4 integration. Checked generated SQL against the user-selected data scope and validated table values, units and the source of each row.',
				'Connected the model tokenizer to count tokens in the actual request, including its output schema. Split long documents at sentence boundaries and tracked evidence omitted from final answer generation as unreviewed.',
				'Used Ragas Faithfulness to extract statements from an answer and calculate the proportion supported by document evidence. Ran evaluation in a separate process and discarded previous results when the answer, evidence or settings changed.',
				'Combined live-model checks with replay of saved failure responses. Separate tests with fixed responses checked for recurring failures, and I verified document and media processing independently.',
			],
			solution: [
				'Expanded retrieval to include the paragraphs surrounding a match and the sections or tables it referenced. Reviewed missing evidence again and supplied original text and sources when generating the final answer.',
				'Ragas checks whether an answer is supported by the document, but long answers exceeded the model input limit. I split the content into batches and matched the result IDs to the original items, checking for missing or duplicate verdicts before calculating the score.',
				'Fixed requests for explanations being misclassified as requests for tables. Collected an answer and evidence IDs for each part of the question, then copied quotations directly from the corresponding source text. Kept supported answers and marked only the parts for which evidence was missing.',
				'Removed repeated token counting when merging tables and reused page-analysis results within the same request. Saved and displayed the answer first, then ran Ragas evaluation as a separate task so users did not have to wait for it to finish.',
				'Included surrounding dialogue when analyzing media to recover omitted subjects and reduce unnecessary abstention. Built navigation to the source document page or playback segment so users could inspect the evidence themselves.',
			],
			impact: [
				{
					presentation: 'measurement',
					value: '2,969ms → 672ms',
					label: 'Median document-analysis processing time',
					detail:
						'Compared application processing with fixed model responses: 20 runs per condition after warm-up, excluding model and network wait time.',
				},
				{
					presentation: 'measurement',
					value: '25 items evaluated',
					label: 'Completed evaluation of a long answer within the input limit',
					detail:
						'Evaluated a Gemma 4 answer about a real document in 5 batches. The largest request used 8,164 tokens, below the 8,192-token input limit.',
				},
				{
					presentation: 'measurement',
					value: 'Display the answer first, then evaluate it separately',
					label: 'No need to wait for quality evaluation',
					detail:
						'Users can read the answer before Ragas finishes. The next evaluation request is deferred while a new user question is being processed.',
				},
			],
			checks: [
				'Used fixed model responses and measured 20 runs before and after the change, following warm-up. Median application processing fell from 2,969ms → 672ms for document analysis and 485ms → 312ms for selected-document search. Normal-path model-call counts remained unchanged.',
				'Extracted 25 items from a live long answer and evaluated them in 5 batches. The largest input was 8,164 tokens, with 6 calls including statement extraction. Automated tests also checked rejection of missing IDs, duplicate IDs and verdicts with invalid data types.',
				'Confirmed that live answers appeared before evaluation completed. Checked that the next evaluation request was deferred during a new question and that completed evaluation stages could be reused.',
				'Compared live answers with the source text and tested altered quotations, mismatched units and questions without supporting evidence. Browser checks covered source navigation, media playback and retention of input and selections.',
			],
		},
		{
			workstreamId: 'WS13',
			id: 'settlement-operations-platform',
			title: 'Settlement Operations Platform',
			platform: 'Web / API',
			area: 'ERP web application, key server APIs and data persistence',
			period: '2026.07 ~ 2026.09',
			role: 'Full-stack development',
			workType: 'Build',
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
				'Built the ERP web application and key server APIs for vehicle and driver records, transport fees, billing and settlement.',
			summary:
				'Built shared editing tables and batch Excel imports. Preserved user input after failed saves and conflicting edits, and kept finalized settlement amounts intact when current assignments changed.',
			problem:
				"Table edits and Excel imports needed to avoid partial or duplicate writes. An outdated screen could overwrite another user's changes, yet rejecting the save should not discard the current user's input. Historical settlements also needed to remain intact after vehicle assignments or billing sources changed.",
			thinking: [
				'Stored the complete validated Excel data on the server and checked permissions and related records again before committing. Rolled back the entire batch on failure and returned the existing result when the same request was repeated.',
				"Compared the version read by the user with the current version to reject outdated saves. Kept the user's edits on screen and let them compare the original, latest and edited values before choosing what to save.",
				'Stored current assignments separately from transaction-time parties and amounts. Changes to loan and insurance records updated draft or rejected charges, while approved or settled amounts were preserved and adjusted in later records.',
			],
			process: [
				'Saved a change through a separate request, then reproduced rejection of a save from an older screen. Combined server version checks with draft retention, including another conflict check if data changed during comparison.',
				'Tested batch failures and repeated requests in an isolated MariaDB database. For representative workflows, compared browser behavior with API responses, persisted values and activity logs.',
				'Kept repayment schedules unchanged when editing fields such as loan classification that did not affect calculation terms. Removed unnecessary queries and recalculation, then compared behavior and processing time using the same initial data.',
			],
			solution: [
				'Built shared tables with keyboard cell navigation and selection dialogs, retaining edits in rows that failed to save.',
				'Built Excel previews with invalid-row and cell correction followed by server revalidation. Saved the batch in one transaction to avoid partial writes and returned the existing result for repeated requests.',
				'Added a comparison of current records and retained edits after a conflicting save. Kept choosing values separate from submitting them so comparison alone could not change stored data.',
				'Separated current vehicle and driver assignments from historical transaction records, preventing source corrections from overwriting finalized settlement amounts.',
				'Reworked administrator logs to show the affected records, changes and reasons a save failed.',
			],
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
			workstreamId: 'WS16',
			id: 'erp-mobile-workflow',
			title: 'ERP-connected Mobile Workflow App',
			platform: 'Web / API / Android',
			area:
				'Business screens, server APIs and Flutter Android integration, excluding the chat system',
			period: '2026.07 ~ 2026.09',
			role: 'Full-stack development',
			workType: 'Feature development and integration',
			stack: [
				'React',
				'TypeScript',
				'TanStack Query',
				'TanStack Router',
				'Spring Boot',
				'MariaDB',
				'Flutter',
				'Dart',
				'Firebase Cloud Messaging',
			],
			headline:
				'Connected ERP notifications, documents and inquiry status to an Android app.',
			summary:
				"Developed the existing app's business screens, server APIs and Flutter Android integration, excluding the chat system. Kept notifications current when changes arrived out of order, resolved concurrent receipt-save failures, and implemented PDF downloads and protection against duplicate inquiry completion.",
			problem:
				'Old notifications could remain visible after ERP records were edited or deleted. Concurrent receipt-save requests could fail because of database lock conflicts, and browser-generated file URLs could not be passed directly to Android downloads. Late inquiry-completion requests also needed to preserve work already completed by another administrator.',
			thinking: [
				"Managed notification content separately from each user's read state. Checked source versions and deletion status before applying changes, preserving read receipts when content was updated.",
				'Replaced the update-then-insert receipt flow with a single UPSERT. Preserved the first display and read timestamps when requests were repeated.',
				'Used short-lived signed URLs dedicated to PDF downloads. Checked the current account and document permissions both when issuing a URL and when serving the file.',
				'Checked the version and current status before completing an inquiry. Returned a specific reason when it had already been handled and retained unsaved input on screen.',
			],
			process: [
				'Tested notification changes arriving out of order or more than once. Checked that an old creation request could not restore a deleted notification and that an open detail view refreshed after a change.',
				'Reproduced the receipt-save lock conflict in isolated MariaDB. After replacing the two-step write with one database operation, checked concurrent saves and preservation of the original timestamps.',
				'Compared a PDF downloaded in the browser with its source file and inspected the URL and request data passed to Android downloads.',
				'Verified inquiry submission, administrator completion and status updates in local browser sessions. Used an Android emulator to check system notification delivery and navigation after tapping a notification.',
			],
			solution: [
				'Applied only current notification changes by checking versions and deletion status. Preserved read receipts and refreshed both the list and open details without allowing late requests to recreate deleted items.',
				'Saved display and read receipts with a single UPSERT to resolve concurrent write conflicts. Kept receipts separate for each account and notification and preserved their first timestamps.',
				'Connected PDF downloads through file-specific signed URLs, checking signatures, expiry and current access rights when serving each file. Kept images in a preview flow.',
				'Checked inquiry versions and completion status to reject duplicate completion. Prevented repeated submission and completion events from creating duplicate ERP activity records.',
				'Connected Flutter notification handling to WebView navigation so users could open the relevant business content from a system notification.',
			],
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
		{
			workstreamId: 'WS11',
			id: 'mobile-operations-platform',
			title: 'Parcel Delivery App',
			platform: 'Web / Android',
			area: 'Map interfaces, offline storage, and request retries',
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
				'Maintained map screens and offline storage and retry features in a parcel delivery app.',
			summary:
				'Updated the React screens, React Native app and Spring Boot APIs. Fixed map selection and return behavior and restored pending requests after an app restart.',
			problem:
				'A lost connection or app restart could discard entered data and pending requests. Requests belonging to a previous account also needed to stay unsent when another user logged in.',
			thinking: [
				'Saved the delivery-completion details confirmed by the user before sending the request.',
				'Matched queued requests to the signed-in user and checked existing server results before retrying.',
				'Handled map selection and return after task completion separately. Checked whether the installed app supported the new location feature before calling it.',
			],
			process: [
				'Kept map group numbers stable across filters and returned users to their previous map position after processing selected work.',
				'Distinguished permission denial, disabled location services and timeouts. Apps without the new location feature continued to use the existing web method.',
				'Restored the signed-in user and pending requests before sending them after an app restart. Also restored user information for existing sessions so each request could be matched to its owner.',
			],
			solution: [
				'Saved the lists needed for offline work in app storage. Stored delivery-completion requests and selected photos in sequence, then sent them after storage completed.',
				'Compared pending requests with completed server records before retrying. Left requests with conflicting results, business errors or unrecoverable photos for manual review.',
				'Returned users to their previous map position after task completion and checked support for native location. Aligned recipient and optional-attachment rules between the web interface and server.',
			],
			impact: [
				{
					value: 'Restored after restart',
					label: 'Pending requests',
					detail: 'Saved entered data and selected photos in app storage',
				},
				{
					value: 'Retry by signed-in user',
					label: 'Connection recovery',
					detail:
						'Matched requests to the current user and compared them with completed server records',
				},
				{
					value: 'Older app compatibility',
					label: 'Location lookup',
					detail:
						'Retained the web method when the new native feature was unavailable',
				},
			],
			checks: [
				'Verified saving while offline, restoring after restart and server updates after reconnection on an Android device.',
			],
		},
		{
			workstreamId: 'WS07',
			id: 'delivery-operations-web',
			title: 'Logistics Operations Web',
			platform: 'Web',
			area: 'Complete frontend development',
			period: '2026.04 ~ 2026.06',
			role: 'Complete frontend development',
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
				'Built the complete React and TypeScript frontend for logistics search, reservations, Excel imports and label printing.',
			summary:
				'I built search, reservation and Excel import screens, mapping reservation and label data from the server to previews and print requests. Loading pages and Excel code on demand reduced the initial JavaScript file size by about 74%. I also checked printed PC labels and corrected clipped or overlapping addresses.',
			impact: [
				{
					presentation: 'measurement',
					value: '2,405.50 → 616.60 kB',
					label: 'Initial JavaScript file size',
					detail: 'About 74% smaller in the May 2026 build outputs',
				},
				{
					presentation: 'measurement',
					value: '815.10 → 204.38 kB',
					label: 'Gzip-compressed size',
					detail: 'About 75% smaller for the compressed initial JavaScript file',
				},
			],
			problem:
				'Tables, forms and modals repeated across the business screens and needed a shared implementation. Loading every page and the Excel libraries at startup made the initial JavaScript file large. Addresses could also clip or overlap on printed labels even when the screen preview looked correct.',
			thinking: [
				'I separated fetched data, input state and print requests, using shared tables, forms and modals.',
				'I used bundle analysis to identify code that was unnecessary for the first screen, then loaded it when users opened a page or used an Excel feature.',
				'I used a common format for print data from the web, with separate integrations for the PC printer service and the Android Bluetooth printer.',
			],
			process: [
				'I separated mock data from API integration to implement loading, empty and error states.',
				'I displayed reservations with multiple label numbers in lists and modals, then converted the responses into data for previews and printing.',
				'I inspected printed labels to locate clipped or overlapping addresses and adjusted wrapping, font sizes and line spacing.',
			],
			solution: [
				'I built reservation entry, batch processing, address selection and Excel previews using shared tables, forms and modals.',
				'I split pages with React.lazy and loaded spreadsheet libraries when import or export actions started.',
				'I converted reservation identifiers and multiple-label API responses into PC and Android print data, with checks for the selected items and printer connection.',
				'I wrapped long PC-label addresses by measured text width and adjusted font sizes and line spacing. Changes to the displayed tracking-number format preserved the original barcode data.',
			],
			checks: [
				'I compared the initial JavaScript file and its gzip-compressed size in the May 2026 build outputs.',
				'I checked navigation, data retrieval, Excel processing and PC label printing after introducing lazy loading.',
			],
		},
		{
			workstreamId: 'WS10',
			id: 'hybrid-life-info-platform',
			title: 'Daily Information App',
			platform: 'Android',
			area: 'Frontend and backend feature development',
			period: '2026.06 ~ 2026.07',
			role: 'Weather feature development in an existing app',
			workType: 'Feature extension',
			stack: ['Spring MVC', 'JSP', 'jQuery', 'Java', 'Android'],
			headline:
				'Integrated multiple public-data APIs to extend weather and daily information features, using server caching to reduce repeated calls.',
			summary:
				'Integrated public-data APIs for weather, air quality and weather alerts. Displayed current weather and core forecasts before supplementary information, using server caching and shared results for concurrent requests to reduce repeated API calls.',
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
				'Weather information was spread across multiple public-data APIs. Requesting the same data on every screen visit could cause excessive API calls, while one slow API could delay the whole screen.',
			thinking: [
				'Cached public-data API responses on the server to avoid repeatedly requesting the same data.',
				'Separated immediately visible core information from secondary information that could load later.',
				'Split fresh and stale cache so limited fallback could be shown when external APIs failed.',
				'After a failed refresh, changed an expired no-alert result to unavailable; marked retained active alerts as results from the last successful lookup.',
			],
			process: [
				'Loaded current weather and core forecasts first, then fetched air quality, alerts and daily forecasts separately.',
				'Set cache lifetimes by each information type’s update cycle and shared one external lookup result across concurrent requests for the same data.',
				'Replaced reference-data cache entries after temporary storage and required-field validation.',
				'The cache was scoped to JVM memory in a single Tomcat instance.',
			],
			solution: [
				'Integrated air quality, medium-range forecast and weather alert APIs, with alerts available in a modal.',
				'Cached reference data on the server. Held refreshed data temporarily and checked required fields before replacing the existing cache.',
				'Used native location first in Android WebView, then stored location and browser fallback.',
				'Also improved the diary editor, Android camera and gallery selection, and distance and marker displays on activity maps.',
			],
			checks: [
				'Checked initial lookup, cache reuse and stale-value fallback on API failure, then deployed the changes to production.',
			],
		},
		{
			workstreamId: 'WS06',
			id: 'ai-kickoff-documentation-tool',
			title: 'AI-assisted Project Documentation Web App',
			platform: 'Tooling',
			area: 'Frontend and backend development',
			period: '2026.04',
			role: 'Internal tool build',
			workType: 'Internal tool',
			stack: ['Node.js', 'TypeScript', 'React', 'AI API', 'xlsx', 'Vitest'],
			headline:
				'Built an AI-assisted web tool for reviewing requirements and drafting documents from repository or uploaded material.',
			summary:
				'Supported repository analysis and uploads for new projects, with screens for source review, requirement candidates, open questions and document drafting. Documents are editable tables; AI revision requests include the selected sheet or cells and surrounding context.',
			impact: [
				{
					value: 'Drafts after source review',
					label: 'Document workflow',
					detail: 'Reviewed collected material before generating AI drafts',
				},
				{
					value: 'Review and edit in tables',
					label: 'Document editing',
					detail: 'Reviewed requirements, functions and screens in separate sheets',
				},
				{
					value: 'Revise selected content',
					label: 'AI revision requests',
					detail:
						'Sent the target sheets or cells with surrounding content to preserve',
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
				'Let users review source material and requirement candidates first. Gated feature and screen-document generation in the UI on the readiness of prerequisite documents.',
				'Split generated output into workbook sheets instead of leaving it as one long text block.',
				'Scoped revisions to the selected sheet/cell context instead of regenerating the whole artifact.',
				'Separated fields AI could organize from decisions reserved for the user and suppressed unsupported placeholders.',
			],
			solution: [
				'Built screens and server APIs connecting repository and upload collection to generation previews, table editing and export.',
				'Made requirements, functional specifications and screen specifications editable in separate sheets. Exported files reflected the edited content.',
				'Sent the selected sheets or cells together with their surrounding content. Distinguished revision targets from content to preserve so users could change selected parts without regenerating the whole document.',
			],
			checks: [
				'Checked that revising selected sheets and cells preserved other content and that successful documents remained available after partial generation failures.',
			],
		},
		{
			workstreamId: 'WS05',
			id: 'mobile-output-bridge',
			title: 'Mobile Output Bridge App',
			platform: 'Android',
			area: 'Android app development',
			period: '2026.04 ~ 2026.06',
			role: 'Android printing app development',
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
				'I built an Android app that connects label-print requests from the logistics web app to a native module and a Bluetooth printer.',
			summary:
				'I kept the business screens in WebView and handled printer selection, connection and printing in the app. When a printer could be selected but would not connect, I traced device logs and internal SDK calls to identify the missing Bluetooth permission.',
			impact: [
				{
					value: 'Web request to printer',
					label: 'WebView and native integration',
					detail:
						'Converted print data and handled device selection, connection and printing',
				},
				{
					value: 'Physical-device verification',
					label: 'Printer output',
					detail:
						'Checked permissions, connection and printing on an Android device',
				},
			],
			problem:
				'The app needed to pass web print requests to the Android printer SDK and guide users through device selection, permissions, connection and printing. On a physical device, the printer appeared in the list and could be selected, but the connection failed.',
			thinking: [
				'I kept the business screens on the web and put device communication in a native module.',
				'I checked the web request, app permissions, SDK connection and physical output separately to locate failures.',
				'I described completion as a print request being sent so that an SDK acknowledgement was not presented as confirmation of physical printing.',
			],
			process: [
				'I converted label data from the web into the native print format and excluded items without tracking numbers.',
				'Logs from an Android 16 device showed that the SDK called a discovery-cancellation API immediately before connecting. That call also required scan permission, so I updated the app to request both BLUETOOTH_SCAN and BLUETOOTH_CONNECT.',
				'I checked the permissions and Bluetooth connection, then printed physical labels to verify the fix.',
			],
			solution: [
				'I implemented print requests and responses between the WebView bridge and the Android native module.',
				'I let users review the print items and printer in the app, with messages for permission, connection and printing errors.',
				'I built a diagnostic screen for checking permissions, paired devices, SDK initialization, connection status and test prints separately.',
			],
			checks: [
				'I verified permission requests, Bluetooth connection and physical label output on an Android 16 / API 36 device.',
			],
		},
		{
			workstreamId: 'WS01',
			id: 'legacy-mobile-compatibility',
			title: 'Legacy Shipping and Inventory App',
			platform: 'Android',
			area: 'Build setup, OS permissions, file access, and back navigation',
			period: '2026.03',
			role: 'Android version compatibility updates for an existing app',
			workType: 'Maintenance',
			stack: ['Android Java', 'Gradle/AGP', 'RxJava', 'FileProvider'],
			headline:
				'Restored builds for a legacy Android app and organized OS-specific permissions, file handling and back navigation.',
			summary:
				'Updated the build environment of an existing Android business app that displays static web pages in a WebView. Adapted permissions, file access and back navigation to Android version changes, and improved login and initial synchronization.',
			impact: [
				{
					value: 'Development builds restored',
					label: 'Gradle/AGP/JDK/SDK',
					detail:
						'build-tool changes separated from target SDK and runtime behavior',
				},
				{
					value: 'OS-specific handling',
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
				'Isolated direct references to newer Android APIs that could prevent startup on older OS versions. Centralized file access and permission checks so screens did not repeat the same version-specific logic.',
				'Aligned the response and asynchronous-error formats exchanged between the web interface and Android. Added fallbacks so device or external-feature failures would not terminate the whole app.',
			],
			checks: [
				'Checked builds, permissions, file handling and bridge behavior, including tests on several physical devices running older OS versions.',
			],
		},
		{
			workstreamId: 'WS02',
			id: 'field-terminal-android',
			title: 'Logistics Receiving and Shipping PDA App',
			platform: 'Android',
			area:
				'Receiving screens, quantity entry, barcode scanning, and Android updates',
			period: '2026.03 ~ 2026.04',
			role: 'Maintenance and receiving features for an existing PDA app',
			workType: 'Maintenance and feature additions',
			stack: ['Android Java', 'Gradle/AGP', 'Scanner SDK'],
			headline:
				'Improved Android compatibility in a logistics PDA app and added receiving screens and scan input features.',
			summary:
				'Updated the existing PDA app’s build environment, Android storage and app-update flow. Implemented receiving filters, a quantity-entry modal, and QR and barcode scan handling.',
			impact: [
				{
					value: 'build recovery',
					label: 'Gradle/JDK cleanup',
					detail: 'development build path separated from operational signing',
				},
				{
					value: 'Quantity rules by work mode',
					label: 'Scan input',
					detail:
						'Separated code checks and quantity rules for existing and new scan modes',
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
				'Separated signing requirements so development builds could run without production signing credentials.',
				'Moved update files to app-specific storage and organized version checks, downloads and installation.',
				'Added receiving filters and a quantity-entry modal connected to QR and barcode scans. Separated code validation, duplicate handling and quantity rules for existing and new modes to preserve established scan behavior.',
				'Displayed external validation failures immediately and guarded empty responses so they did not trigger further app errors.',
			],
			checks: [
				'Checked development and production build paths with the main entry flow.',
				'Checked scan input and logs on a physical PDA to distinguish external validation failures from errors inside the app. Verified unit tests and builds for the scan rules and error handling.',
			],
		},
		{
			workstreamId: 'WS04',
			id: 'structured-editor-ui',
			title: 'Chart Preview Page',
			platform: 'Web',
			area: 'Chart settings, data connections, and preview screens',
			period: '2026.03 ~ 2026.04',
			role: 'Chart settings and preview implementation',
			workType: 'Feature development',
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
				'Built a page for choosing chart data and display settings within a website under development. Showed settings appropriate to each chart type and reflected selected data and options in a Chart.js preview.',
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
				'Showed settings appropriate to each chart type and let users choose which axes and values each data field represented.',
				'Separated editing-state management from chart-update conditions so changing a setting did not unnecessarily recreate the entire chart.',
			],
			process: [
				'Organized data selection, field mapping, chart selection and settings into one editing screen.',
				'Added chart direction and density controls, with scrolling or fit-to-view options for larger datasets.',
				'Placed help and drag feedback in separate layers and distinguished loading, empty and error states.',
				'Implemented editor background modes with WebGL/GLSL fragment shaders and OGL.',
			],
			solution: [
				'Connected six settings areas to the Chart.js preview and let users drag data fields into chart-axis and value assignments.',
				'Reduced unnecessary mixed-chart recreation to lessen preview flicker and scroll movement.',
			],
			checks: [
				'Checked chart and option changes, panel collapse, field dragging and help overlays.',
			],
		},
		{
			workstreamId: 'WS08',
			id: 'hybrid-security-boundary',
			title: 'Privacy Check App',
			platform: 'Android',
			area: 'Frontend and backend feature development',
			period: '2026.06',
			role: 'Email-breach and image-check features in an existing app',
			workType: 'Feature extension',
			stack: ['Android', 'Cordova', 'Spring MVC', 'jQuery', 'Java'],
			headline:
				'Implemented email-breach lookup and deepfake image checks by integrating external APIs.',
			summary:
				'Added email-breach lookup and deepfake image checks to an existing app. Built server calls to external inspection APIs and screens from email or image input through results, including image and file selection in the Android app.',
			impact: [
				{
					value: 'server-side proxy',
					label: 'credential boundary',
					detail: 'external integration responsibility kept outside the client',
				},
			],
			problem:
				'The existing app needed email-breach lookup and deepfake image checks. User input had to reach external inspection APIs without exposing API credentials in the app or browser.',
			thinking: [
				'Kept external lookup responsibility inside a server-side proxy.',
				'Returned only the minimum result and state needed by the client UI.',
			],
			process: [
				'Separated client input, server proxy, external response, and displayed result in order.',
				'Checked WebView file chooser behavior by input source across emulator and real device flows.',
			],
			solution: [
				'Integrated email-breach lookup and deepfake image inspection APIs, connecting user input to inspection requests and results.',
				'Validated image format, file size and resolution before submitting the file to the server, then displayed the external API’s results and errors in the interface.',
				'Passed Android image and file selections to the WebView so users could run checks within the app.',
				'A previous file read could finish after the user selected another image. Checked completed reads against the current selection so an older image would not overwrite the new preview.',
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
			area: 'Complete frontend development',
			period: '2026.02 ~ 2026.03',
			role: 'Complete frontend development',
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
				'Built screens for viewing, creating and editing account, stock and order records. Used MSW API responses and shared tables, filters and modals across screens, with column pinning, resizing, reordering and row selection.',
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
				'Kept draft filters separate from submitted conditions in order history. Repeated searches restarted from the first page, and load-more requests were guarded against overlap.',
			],
			solution: [
				'Built the complete frontend with React and TypeScript. Shared tables provided consistent column pinning, resizing and reordering across account, stock and order screens.',
				'Implemented queries and input interactions with MSW mock APIs. Kept draft filters separate from applied query conditions and updated TanStack Query when the user submitted a search.',
			],
			checks: [
				'Checked column controls, scrolling, search modals and UI states locally with MSW mock responses.',
			],
		},
		{
			workstreamId: 'WS14',
			id: 'multi-role-hybrid-platform',
			title: 'Member and Inquiry Management Web and App',
			platform: 'Web / Android',
			area:
				'Member management, inquiries, attachments, and Android file selection',
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
				'Built member search, editing, duplicate merging, inquiries and attachments. Checked member roles and authorship on the server to control access and connected file selection, inquiry attachments and image zoom in the Android app.',
			problem:
				'Different member roles could share the same identifier, so member search and editing needed to distinguish roles. Web file inputs also needed a native picker connection before users could attach files to inquiries in the Android app.',
			thinking: [
				'Checked role and ownership on the server and reused access conditions across inquiries, answers, and attachments.',
				'Handled loading, failures and closing within the member-editing popup so shared popup code could remain unchanged. Kept late responses from a closed popup from changing a newly opened one.',
			],
			process: [
				'Separated saved data from parent refresh so quick alert dismissal and late responses did not leave stale values.',
				'Connected Android picker cancellation and reselection with draft back-navigation handling.',
			],
			solution: [
				'Allowed members to edit only permitted fields. Before merging duplicate members, rechecked the data to retain and the linked accounts and records on the server.',
				'Checked access to the relevant records when previewing images attached to inquiries and answers.',
				'Connected file-picker results to Android WebView and handled cancellation, reselection and return to the attachment list.',
			],
			impact: [
				{
					value: 'Member data preserved',
					label: 'Merging and editing',
					detail:
						'Verified rollback and concurrent requests in an isolated database',
				},
				{
					value: 'Author- and role-based access',
					label: 'Inquiries, answers, and files',
					detail: 'Checked member role and authorship together',
				},
			],
			checks: [
				'Verified member-data preservation, rollback and concurrent requests in isolated MariaDB.',
				'Checked inquiry and attachment behavior in browsers and on Android devices.',
			],
		},
		{
			workstreamId: 'WS12',
			id: 'legacy-support-web',
			title: 'Legacy Logistics Customer Support Web',
			platform: 'Web',
			area: 'Excel import error handling and user messages',
			period: '2026.08',
			role: 'Incident investigation / Error handling',
			workType: 'Maintenance',
			stack: ['Java', 'Spring MVC', 'JSP', 'MyBatis', 'jQuery', 'Apache POI'],
			headline:
				'Separated parsing, validation, and network failures previously hidden behind the same timeout message.',
			summary:
				'Added separate Excel upload messages for parsing, validation and network errors. Investigated repeated per-row database queries in bulk uploads and proposed improvements.',
			problem:
				'Every Ajax failure used the same message, obscuring input and network errors. Row-by-row queries and response sizes grew with bulk input, so small-file success did not establish safe scaling.',
			thinking: [
				'Checked parsing success, HTTP success, and business validation separately.',
				'Exposed only useful diagnostic fields without internal HTML or raw exceptions.',
				'Investigated how database calls and memory usage grew with the number of input rows.',
			],
			process: [
				'Identified repeated duplicate-check queries and full index scans, then proposed input limits and batched lookups.',
			],
			solution: [
				'Distinguished communication errors, validation failures, timeouts, cancellations and response-parsing errors during file analysis and registration. Displayed the failed stage and elapsed time.',
				'Displayed only server messages suitable for users. Excluded internal error pages and exception details and escaped dynamic text so it would not be interpreted as HTML.',
			],
			impact: [
				{
					value: 'Distinct failure stages',
					label: 'Upload diagnostics',
					detail:
						'Distinguished validation, communication and parsing failures from timeouts',
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
