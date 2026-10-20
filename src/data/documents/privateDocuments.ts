import type { CareerBriefCopy, ResumeDocumentCopy } from '@/types/documents';
import type { Locale } from '@/types/locale';
import { getRecruitingDocumentManifest } from './manifest';
import {
	getWorkStory,
	getProject,
	workStoryEvidence,
	projectEvidence,
	visibleProjectLinks,
} from './sourceSelectors';
import { recruitingDocumentSkillGroups } from './documentSkills';
import { supportingDocumentCopy, workDocumentCopy } from './editorialCopy';
import { projectDocumentCopy } from './projectCopy';
import {
	triphosCareerEvidence,
	tisCareerEvidence,
	universityEducationEvidence,
} from './profileEvidence';

export function getDocumentSkillGroups(locale: Locale) {
	const labels = [
		'Languages',
		'Web',
		'Mobile / hybrid',
		'Testing / monitoring',
		'Tools & Data',
	];
	return recruitingDocumentSkillGroups.map((group, index) => ({
		...group,
		label: locale === 'ko' ? group.label : labels[index],
	}));
}

export function getResumeDocument(locale: Locale): ResumeDocumentCopy {
	const ko = locale === 'ko';
	const manifest = getRecruitingDocumentManifest(locale);
	const copy = workDocumentCopy[locale];
	const evidence =
		manifest.selection.featuredWorkStoryIds.map(workStoryEvidence);
	const period = (value: string) =>
		ko ? value.replace(/Present/g, '현재') : value.replace(/현재/g, 'Present');
	return {
		title: ko ? '이력서' : 'Resume',
		role: manifest.role,
		profile: '',
		competencies: manifest.selection.featuredWorkStoryIds.map((id) => ({
			title: getWorkStory(id, locale).title,
			detail: copy[id].summary,
			evidence: [workStoryEvidence(id)],
		})),
		careers: [
			{
				company: ko ? triphosCareerEvidence.company : 'Triphos Co., Ltd.',
				period: period(triphosCareerEvidence.period),
				role: ko ? triphosCareerEvidence.role : 'Web & Mobile Developer',
				summary: ko
					? '업무용 웹과 서버 API를 개발하고 Android 앱 기능을 연동했습니다.'
					: 'Built business web applications and server APIs and integrated Android app features.',
				highlights: [],
				workItems: [
					{
						title: ko
							? 'AI 기반 문서·데이터 분석 플랫폼'
							: 'AI Document and Data Analysis Platform',
						scope: ko
							? '풀스택 개발을 맡아 Gemma 4를 연동하고, 문서 등록부터 검색·분석·출처 확인까지 이어지는 기능을 구현했습니다.'
							: 'Owned full-stack development of document upload, search, analysis and source inspection, including Gemma 4 integration.',
						highlights: ko
							? [
									'긴 답변을 나누어 Ragas로 평가하고, 항목별 ID를 대조해 평가 누락을 확인했습니다. 사용자가 평가가 끝나기 전에도 답변을 볼 수 있도록 했습니다.',
									'반복 계산을 제거해 문서 분석 처리 시간의 중앙값을 2,969ms → 672ms로 줄였습니다(모델 응답 고정, 준비 실행 후 각 20회 측정).',
								]
							: [
									'Evaluated long answers in batches with Ragas and checked item IDs for missing results. Let users read answers before evaluation finished.',
									'Removed repeated calculations, reducing median document-analysis processing from 2,969ms → 672ms (fixed model responses, 20 runs per condition after warm-up).',
								],
					},
					{
						title: ko ? '업무 정산 ERP·모바일 앱' : 'Settlement ERP and Mobile App',
						scope: ko
							? '정산 ERP와 Flutter 기반 모바일 업무 앱을 풀스택으로 개발했습니다. 모바일은 채팅 시스템을 제외한 대부분의 기능을 개발했습니다.'
							: 'Owned full-stack development of the ERP and connected Flutter mobile work app, excluding the chat system.',
						highlights: ko
							? [
									'동시 수정 시 서버 버전을 확인하고 사용자 입력을 보존했습니다. 처음 값·최신 값·입력값을 비교해 선택한 내용을 다시 저장하도록 구현했습니다.',
									'Excel 오류 셀 수정·재검사, 일괄 저장의 전체 취소와 중복 요청 처리를 구현했습니다. 현재 정보가 바뀌어도 확정된 정산 이력은 보존했습니다.',
									'모바일 알림의 버전과 삭제 상태를 관리해 늦게 도착한 이전 알림이 최신 내용을 덮지 않도록 했습니다. 읽음 저장의 DB 교착은 단일 UPSERT로 수정했습니다.',
									'Flutter 앱의 알림·상세 이동을 연결하고, 로그인 토큰 대신 짧은 유효기간의 서명 주소로 문서를 다운로드하도록 구현했습니다.',
								]
							: [
									'Checked server versions on concurrent edits and retained user input. Compared original, latest and entered values before explicitly saving selected changes.',
									'Built Excel cell correction, revalidation, batch rollback and repeat-request handling, while preserving finalized settlements when current records changed.',
									'Tracked mobile notification versions and deletions so delayed events could not overwrite current content. Replaced receipt writes with a single UPSERT to resolve database deadlocks.',
									'Connected notifications and detail navigation in Flutter and issued short-lived signed document URLs instead of passing login tokens to the download feature.',
								],
					},
					{
						title: ko
							? '물류 운영 웹·출력 앱'
							: 'Logistics Operations Web & Printing App',
						scope: ko
							? '물류 웹 프론트엔드 전체와 Android 출력 앱을 개발했습니다.'
							: 'Built the complete logistics web frontend and Android printing app.',
						highlights: ko
							? [
									'표·입력 폼·모달을 공통화하고 조회·예약·Excel 미리보기·출력 요청을 서버 API에 연결했습니다.',
									'페이지·Excel 코드를 필요한 시점에 불러오도록 바꿔 초기 JavaScript 파일 크기를 약 74% 줄였습니다(2026.05 빌드 산출물 기준).',
									'WebView의 출력 요청을 Android 브리지와 Bluetooth 프린터에 연결했습니다. SDK 내부 호출을 추적해 권한 오류를 해결하고 실제 라벨 출력을 확인했습니다.',
								]
							: [
									'Built shared tables, forms and modals; connected search, reservations, Excel previews and print requests to server APIs.',
									'Reduced the initial JavaScript entry file by about 74% with on-demand page and Excel code loading (build output size).',
									'Connected WebView print requests to an Android bridge and Bluetooth printers. Traced SDK calls to fix missing permissions and verified physical label output.',
								],
					},
					{
						title: ko ? '주식 업무 관리 웹' : 'Stock Operations Admin Web',
						scope: ko
							? 'MSW 모의 API를 사용해 React 프론트엔드 전체를 구축했습니다.'
							: 'Complete React frontend built against MSW mock APIs',
						highlights: ko
							? [
									'계좌·종목·주문 화면의 테이블·필터·모달을 공통화하고 열 고정·너비 조절·재정렬을 구현했습니다.',
									'선택 중인 필터와 실제 조회 조건을 분리하고, 조회 버튼을 눌렀을 때 TanStack Query에 조건을 적용했습니다.',
								]
							: [
									'Built shared tables, filters and modals for account, stock and order screens, with column pinning, resizing and reordering.',
									'Kept filter selections separate from applied query conditions; updated TanStack Query when the user submitted a search.',
								],
					},
					{
						title: ko ? '생활정보 앱' : 'Daily Information App',
						scope: ko
							? '기존 Android 앱에 공공 API 기반 날씨 화면과 서버 조회 기능을 추가했습니다.'
							: 'Added weather screens and server-side public API integration to an existing Android app.',
						highlights: ko
							? [
									'지역·정보 종류별로 서버 응답을 캐시하고 갱신 주기를 적용했습니다. 현재 날씨와 핵심 예보를 먼저 표시하고 부가 정보는 응답이 도착하면 채웠습니다.',
								]
							: [
									'Cached responses by region and data type with matching expiry periods. Displayed current weather and core forecasts first, then supplementary data as it arrived.',
								],
					},
					{
						title: ko ? '개인정보 보호 앱' : 'Privacy Check App',
						scope: ko
							? '기존 Android 앱에 외부 API를 연동해 이메일 유출 여부와 딥페이크 이미지를 검사하는 기능을 추가했습니다.'
							: 'Added email-breach and deepfake checks to an existing Android app using external APIs.',
						highlights: ko
							? [
									'입력부터 검사 요청·결과 확인까지 화면을 개발하고, 이미지 미리보기와 Android 파일 선택을 연동했습니다.',
								]
							: [
									'Built input, inspection request and result screens, with image previews and Android file selection.',
								],
					},
				],
				evidence: [
					{ source: 'profile', id: triphosCareerEvidence.id },
					...evidence,
					workStoryEvidence('hybrid-life-info-platform'),
					workStoryEvidence('hybrid-security-boundary'),
				],
			},
			{
				company: tisCareerEvidence.company,
				period: tisCareerEvidence.period,
				officialTitle: ko ? tisCareerEvidence.officialTitle : 'University Intern',
				role: ko ? tisCareerEvidence.role : 'Planning and data automation support',
				highlights: ko
					? [
							'Figma로 공장 에너지 관리 화면을 기획하고 데이터베이스 테이블 명세와 ERD를 작성했습니다.',
							'한국전력 기업별 파워플래너를 분석하고 에너지 데이터를 수집하는 Python 크롤러를 작성했습니다.',
						]
					: [
							'Planned factory energy management screens in Figma and documented database tables and an ERD.',
							'Analyzed the KEPCO Power Planner and wrote a Python crawler to collect energy data.',
						],
				evidence: [{ source: 'profile', id: tisCareerEvidence.id }],
			},
		],
		projects: manifest.selection.resumeProjectIds.map((id) => {
			const project = getProject(id);
			const text = projectDocumentCopy[locale][id];
			return {
				id,
				title: text.title,
				period: period(project.duration),
				role: text.role,
				summary: text.summary,
				highlights: [text.actions[0].description],
				technologies: project.techStack,
				links: visibleProjectLinks(id),
				evidence: [projectEvidence(id)],
			};
		}),
		skillGroups: getDocumentSkillGroups(locale),
		education: [
			{
				title: ko
					? universityEducationEvidence.title
					: 'Gyeongsang National University / Computer Science',
				period: ko ? universityEducationEvidence.period : 'Graduated 2023.02',
				detail: ko ? universityEducationEvidence.detail : 'GPA 3.64 / 4.5',
				evidence: [{ source: 'profile', id: universityEducationEvidence.id }],
			},
			{
				title: ko ? '프로그래머스 데브코스' : 'Programmers Devcourse',
				period: '2023.12 ~ 2024.05',
				detail: ko
					? 'Cloud Application Engineering 과정, React와 React Native'
					: 'Cloud Application Engineering, React and React Native',
				evidence: [{ source: 'activity', id: 'programmers-devcourse-student' }],
			},
			{
				title: ko
					? '프로그래머스 데브코스 서브멘토'
					: 'Programmers Devcourse / Assistant Mentor',
				period: '2024.05 ~ 2024.09',
				detail: ko
					? '개발 정보 공유, 데일리 스크럼 참여와 프로젝트 점검 지원.'
					: 'Shared development resources and supported daily scrums and project reviews.',
				evidence: [
					{ source: 'activity', id: 'programmers-devcourse-assistant-mentor' },
				],
			},
		],
		awards: [
			{
				title: ko
					? 'DIVE 2024 글로벌 데이터 해커톤'
					: 'DIVE 2024 Global Data Hackathon',
				period: '2024.10',
				detail: ko
					? '부산테크노파크원장상(발제사 3등)'
					: 'Busan Technopark President Award / third in the challenge track',
				evidence: [{ source: 'award', id: 'DIVE 2024 해커톤' }],
			},
			{
				title: ko ? '경남소프트웨어 경진대회' : 'Gyeongnam Software Competition',
				period: '2021.10',
				detail: ko ? 'ESD HotDeal, 최우수상' : 'ESD HotDeal / Top Excellence Award',
				evidence: [{ source: 'award', id: '경남소프트웨어 경진대회' }],
			},
		],
	};
}

export function getCareerBriefDocument(locale: Locale): CareerBriefCopy {
	const ko = locale === 'ko';
	const manifest = getRecruitingDocumentManifest(locale);
	const resume = getResumeDocument(locale);
	const company = resume.careers[0];
	return {
		title: ko ? '경력기술서' : 'Career Brief',
		role: manifest.role,
		company: {
			name: company.company,
			period: company.period,
			officialTitle: company.officialTitle,
			role: company.role,
			summary: company.summary!,
			responsibilities: [],
			evidenceRefs: company.evidence,
		},
		featuredWork: manifest.selection.featuredWorkStoryIds.map((id) => {
			const story = getWorkStory(id, locale);
			const copy = workDocumentCopy[locale][id];
			return {
				id,
				title: story.title,
				period: story.period,
				platform: story.platform,
				goal:
					id === 'settlement-operations-platform'
						? ko
							? '정산 ERP와 Flutter 기반 모바일 업무 앱을 풀스택으로 개발했습니다. 모바일은 채팅 시스템을 제외한 대부분의 기능을 개발했습니다.'
							: 'Owned full-stack development of the ERP and connected Flutter mobile work app, excluding the chat system.'
						: id === 'delivery-output-flow'
							? ko
								? '물류 웹 프론트엔드 전체와 Android 출력 앱을 개발했습니다. 조회·예약·Excel 등록부터 PC 라벨 출력과 Bluetooth 프린터 연동까지 구현했습니다.'
								: 'Built the complete logistics frontend and Android printing app, covering search, reservations, Excel imports, PC label printing and Bluetooth printer integration.'
							: (resume.careers[0].workItems?.find(
									(item) => item.title === story.title,
								)?.scope ?? copy.summary),
				contribution: copy.actions[0].description,
				implementations:
					id === 'settlement-operations-platform'
						? [
								...copy.actions.slice(0, 3).map(({ description }) => description),
								workDocumentCopy[locale]['erp-mobile-workflow'].actions[0].description,
								workDocumentCopy[locale]['erp-mobile-workflow'].actions[2].description,
							]
						: id === 'delivery-output-flow'
							? [
									...copy.actions.map(({ description }) => description),
									workDocumentCopy[locale]['mobile-output-bridge'].actions[1]
										.description,
								]
							: copy.actions.map(({ description }) => description),
				decision: copy.actions
					.slice(1)
					.map(({ description }) => description)
					.join(' '),
				result: copy.briefResult ?? copy.result,
				evidence: [],
				technologies: story.stack,
				evidenceRefs: [workStoryEvidence(id)],
			};
		}),
		supportingWork: manifest.selection.supportingWorkStoryIds.map((id) => {
			const story = getWorkStory(id, locale);
			return {
				id,
				title: story.title,
				period: story.period,
				decision: supportingDocumentCopy[locale][id],
				result: '',
				evidenceRef: workStoryEvidence(id),
			};
		}),
		practices: [],
		skillGroups: [],
	};
}

export const resumeDocument = getResumeDocument('ko');
export const careerBriefDocument = getCareerBriefDocument('ko');
