import type { PortfolioPageDefinition } from '@/types/documents';
import type { Locale } from '@/types/locale';
import {
	getWorkStory,
	workCaseEvidence,
	workStoryEvidence,
} from './sourceSelectors';

// Existing-service extensions and internal tools share the company-work sequence.
// Their scope describes the implemented feature, not ownership of the whole app.
export function getPortfolioFeatureCases(
	locale: Locale,
): PortfolioPageDefinition[] {
	const t = (ko: string, en: string) => (locale === 'ko' ? ko : en);
	const privacy = getWorkStory('hybrid-security-boundary', locale);
	const documentation = getWorkStory('ai-kickoff-documentation-tool', locale);
	return [
		{
			id: privacy.id,
			pageNumber: 0,
			kind: 'case',
			eyebrow: t('회사 업무 05', 'Company work 05'),
			title: privacy.title,
			summary: t(
				'기존 Android 앱에 이메일 유출 여부와 딥페이크 이미지를 검사하는 기능 추가. 검사 화면·서버 API와 Android 이미지 선택을 연결해 입력부터 결과 확인까지 구현.',
				'Added email-breach lookup and deepfake image checks to an existing Android app. Connected inspection screens, server calls to external APIs, and Android image selection from input through results.',
			),
			metadata: [
				{ label: t('기간', 'Period'), value: privacy.period },
				{
					label: t('담당', 'Scope'),
					value: t(
						'프론트엔드·백엔드 기능 개발',
						'Frontend and backend feature development',
					),
				},
			],
			technologies: privacy.stack,
			sections: [
				{
					id: 'inspection',
					title: t(
						'외부 검사 API를 앱 기능으로 연결',
						'Turn external inspection APIs into app features',
					),
					body: [
						t(
							'사용자가 이메일이나 이미지를 입력하면 서버에서 외부 검사 API를 호출하고, 결과와 오류를 화면에 맞게 반환하도록 만들었습니다. API 인증 정보는 서버에서 관리하고 앱에는 검사에 필요한 결과와 상태를 전달했습니다.',
							'Implemented server calls to external APIs for submitted emails and images, translating responses and errors for the interface. API credentials remained on the server; the app received the results and status needed for display.',
						),
					],
				},
				{
					id: 'input',
					title: t(
						'이미지 선택부터 검사 요청까지',
						'From image selection to inspection',
					),
					items: [
						{
							title: t('입력 검사와 미리보기', 'Input validation and preview'),
							description: t(
								'파일 형식·용량·해상도 검사와 선택한 이미지의 미리보기 구현.',
								'Validated file type, size, and resolution, and displayed a preview of the selected image.',
							),
						},
						{
							title: t('Android 파일 선택 연결', 'Android file selection'),
							description: t(
								'WebView의 이미지·파일 선택 요청과 네이티브 선택 결과를 연결.',
								'Connected image and file requests from the WebView to native selection results.',
							),
						},
					],
				},
				{
					id: 'reselection',
					title: t(
						'이미지를 다시 선택했을 때',
						'When the user selects another image',
					),
					body: [
						t(
							'파일을 읽는 도중 다른 이미지를 선택하면 이전 작업이 더 늦게 끝날 수 있습니다. 파일 읽기마다 구분 값을 두고 완료 시 현재 선택과 비교해, 이전 이미지의 결과가 새 미리보기를 덮지 않도록 처리했습니다.',
							'A previous file read can finish after the user selects another image. Assigned a token to each read and checked it on completion so stale results would not overwrite the new preview.',
						),
					],
				},
			],
			evidence: [workStoryEvidence(privacy.id), workCaseEvidence(privacy.id)],
		},
		{
			id: documentation.id,
			pageNumber: 0,
			kind: 'case',
			eyebrow: t('회사 업무 06', 'Company work 06'),
			title: documentation.title,
			summary: t(
				'저장소와 프로젝트 착수 자료를 바탕으로 문서 초안을 만들고 검토·편집하는 사내 웹 도구. 자료 수집부터 표 편집과 내보내기까지 개발.',
				'Built an internal web tool for drafting and reviewing documents from repositories and project kickoff material, covering source collection, table editing, and export.',
			),
			metadata: [
				{ label: t('기간', 'Period'), value: documentation.period },
				{
					label: t('담당', 'Scope'),
					value: t('프론트엔드·백엔드 개발', 'Frontend and backend development'),
				},
			],
			technologies: documentation.stack,
			sections: [
				{
					id: 'review',
					title: t(
						'자료 확인 후 문서 작성',
						'Review source material before drafting',
					),
					body: [
						t(
							'자료를 바로 최종 문서로 만들기보다, 요구사항 후보와 확인할 질문을 먼저 검토하도록 화면을 나눴습니다. 요구사항 문서가 준비된 뒤 기능 정의서를, 선행 문서가 준비된 뒤 화면 설계서를 생성할 수 있도록 진입 조건을 구성했습니다.',
							'Split the interface into review stages for proposed requirements and open questions before drafting final documents. Enabled functional specifications after the requirements document was ready, and screen specifications after their prerequisite documents were ready.',
						),
					],
				},
				{
					id: 'editing',
					title: t(
						'표에서 검토하고 필요한 부분만 수정',
						'Review tables and revise selected content',
					),
					items: [
						{
							title: t('시트별 문서 편집', 'Edit document sheets'),
							description: t(
								'요구사항·기능·화면 문서를 시트별 표로 표시하고, 편집한 데이터를 기준으로 문서 내보내기.',
								'Displayed requirements, functions, and screens as editable sheets and exported documents from the edited data.',
							),
						},
						{
							title: t('선택한 내용의 AI 수정', 'Targeted AI revisions'),
							description: t(
								'선택한 시트·셀과 주변 내용을 함께 전달해 수정 대상과 유지할 문맥 구분.',
								'Sent the selected sheet and cells with surrounding content to distinguish revision targets from context to preserve.',
							),
						},
					],
				},
				{
					id: 'partial-failure',
					title: t(
						'일부 문서 생성이 실패했을 때',
						'Handle partial generation failures',
					),
					body: [
						t(
							'문서별 생성 상태를 구분해 일부 작업이 실패해도 성공한 문서는 검토할 수 있도록 했습니다. 전체를 다시 생성하지 않고 필요한 문서를 선택해 다시 작성하고 내보내도록 구성했습니다.',
							'Tracked generation status per document so completed documents remained available for review after another failed. Supported regenerating and exporting selected documents without restarting the entire set.',
						),
					],
				},
			],
			evidence: [
				workStoryEvidence(documentation.id),
				workCaseEvidence(documentation.id),
			],
		},
	];
}
