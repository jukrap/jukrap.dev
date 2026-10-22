import { decisionCases } from '@/data/decisionCases';
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
							? 'Gemma 4 기반 플랫폼의 풀스택 개발을 맡았습니다. 문서 등록과 검색 / 분석부터 출처 확인까지 이어지는 웹 서비스입니다.'
							: 'Owned full-stack development of document upload, search, analysis and source inspection, including Gemma 4 integration.',
						highlights: ko
							? [
									'Ragas 평가 중 문장의 의미가 바뀌어 평가 대상과 ID를 고정했습니다. 25개 주장을 5개 묶음으로 나누고, 반환 결과의 누락 / 중복 ID를 원문과 대조하는 구조입니다.',
									'모델 지연과 내부 병목을 구분하려고 모델 응답을 고정해 측정했습니다. 반복 계산을 줄인 뒤 내부 처리 중앙값은 2,969ms → 672ms로 줄었습니다(워밍업 후 각각 20회).',
									'SQLGlot으로 수정 전후의 조회 / 집계 조건을 대조했습니다. AI 수정안이 조건을 바꾸거나 보존 여부를 확인할 수 없을 때는 실행 전에 중단하도록 바꿨습니다.',
								]
							: [
									'Fixed evaluation targets and IDs to address changes in statement meaning during Ragas evaluation, then matched returned results to the original items. Evaluated 25 claims in five batches and checked missing and duplicate IDs.',
									'Used fixed model responses to separate application overhead from model latency. Removing repeated computation reduced median internal processing from 2,969ms → 672ms (20 runs per condition after warmup).',
									'Compared query and aggregation conditions before and after AI-generated SQL repairs using SQLGlot. Stopped execution when a repair changed those conditions or their preservation could not be confirmed.',
								],
					},
					{
						title: ko ? '업무 정산 ERP·모바일 앱' : 'Settlement ERP and Mobile App',
						scope: ko
							? '정산 ERP와 Flutter 모바일 업무 앱을 풀스택으로 개발했습니다. 모바일 담당 범위는 채팅 시스템을 제외한 대부분의 기능입니다.'
							: 'Owned full-stack development of the ERP and connected Flutter mobile work app, excluding the chat system.',
						highlights: ko
							? [
									'수정 충돌 시 입력값을 남기고, 기존 값과 최신 값을 비교해 다시 저장하도록 구현했습니다. 개발 환경에서 충돌 응답과 재저장 후 DB / 변경 이력을 확인했습니다.',
									'Excel 검증 데이터는 서버에 보관한 뒤 저장 직전에 재검사합니다. 격리한 MariaDB에서 실패 / 재요청 / 동시 저장을 재현해 전체 취소와 중복 요청 처리를 점검했습니다.',
									'알림 내용과 읽음 상태는 분리해 관리합니다. DB에서 재현한 읽음 저장 교착은 단일 UPSERT로 해결하고, 동시 요청과 알림 순서 역전도 검증했습니다.',
									'PDF는 로그인 토큰 대신 짧게 유효한 서명 URL로 전달합니다. 브라우저에서 받은 파일의 해시를 원본과 대조하고, 네이티브 브리지로 전달되는 값도 확인했습니다.',
								]
							: [
									'Retained drafts during edit conflicts and let users compare original and current values before saving again. In development, checked conflict responses and resolved saves against the database and change history.',
									'Kept Excel validation data on the server and rechecked it before saving. Tested failures, retries and concurrent saves in isolated MariaDB to verify rollback and duplicate-request handling.',
									'Separated notification content from receipts and replaced receipt writes with a single UPSERT after reproducing a database deadlock. Tested concurrent requests and out-of-order notifications.',
									'Delivered PDFs through short-lived signed URLs without passing login tokens. Compared browser-download hashes with originals and checked the values sent to the native bridge.',
								],
					},
					{
						title: ko
							? '물류 운영 웹·출력 앱'
							: 'Logistics Operations Web & Printing App',
						scope: ko
							? '담당 범위는 물류 웹 프론트엔드 전체와 Android 출력 앱입니다.'
							: 'Built the complete logistics web frontend and Android printing app.',
						highlights: ko
							? [
									'번들 분석으로 첫 화면에서 필요하지 않은 페이지·Excel 코드를 찾아 분리하고, 초기 JavaScript 파일 크기를 약 74% 줄였습니다(2026.05 빌드 산출물 기준).',
									'WebView의 출력 요청은 Android 브리지를 거쳐 Bluetooth 프린터로 전달됩니다. SDK 내부 호출을 추적해 권한 오류를 해결하고 실제 라벨 출력까지 확인했습니다.',
									'실물 라벨에서 긴 주소가 잘리거나 겹치는 위치를 확인하고, 글자 폭에 따른 줄바꿈과 글자 크기·줄 간격을 조정했습니다.',
								]
							: [
									'Used bundle analysis to identify and split page and Excel code unnecessary on entry, reducing the initial JavaScript file size by about 74% (May 2026 build outputs).',
									'Connected WebView print requests to an Android bridge and Bluetooth printers. Traced SDK calls to fix missing permissions and verified physical label output.',
									'Inspected physical labels for clipped or overlapping addresses, then adjusted wrapping by text width, font size, and line spacing.',
								],
					},
					{
						title: ko ? '주식 업무 관리 웹' : 'Stock Operations Admin Web',
						scope: ko
							? 'MSW 모의 API로 화면을 개발하며 React 프론트엔드 전체를 구축했습니다.'
							: 'Complete React frontend built against MSW mock APIs',
						highlights: ko
							? [
									'계좌 / 종목 / 주문 화면은 공통 테이블 / 필터 / 모달을 사용합니다. 테이블에는 열 고정과 너비 조절, 재정렬 기능을 구현했습니다.',
									'선택 중인 필터와 실제 조회 조건을 분리했습니다. 조회 버튼을 누를 때 TanStack Query에 조건을 적용합니다.',
								]
							: [
									'Built shared tables, filters and modals for account, stock and order screens, with column pinning, resizing and reordering.',
									'Kept filter selections separate from applied query conditions; updated TanStack Query when the user submitted a search.',
								],
					},
					{
						title: ko ? '생활정보 앱' : 'Daily Information App',
						scope: ko
							? '기존 Android 앱의 공공 API 기반 날씨 화면과 서버 조회 기능을 맡았습니다.'
							: 'Added weather screens and server-side public API integration to an existing Android app.',
						highlights: ko
							? [
									'서버 응답을 지역 / 정보 종류별로 캐시하고 갱신 주기를 적용했습니다. 현재 날씨와 핵심 예보를 먼저 표시하며, 부가 정보는 응답이 도착하면 채웁니다.',
								]
							: [
									'Cached responses by region and data type with matching expiry periods. Displayed current weather and core forecasts first, then supplementary data as it arrived.',
								],
					},
					{
						title: ko ? '개인정보 보호 앱' : 'Privacy Check App',
						scope: ko
							? '기존 Android 앱에 외부 API를 연결했습니다. 이메일 유출 여부와 딥페이크 이미지를 검사하는 기능입니다.'
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
					workStoryEvidence('react-admin-state-migration'),
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
							'한국전력 기업별 파워플래너를 분석해 에너지 데이터 수집용 Python 크롤러를 만들었습니다.',
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
				highlights:
					id === 'ai-agent-playbook'
						? ko
							? [
									'프로젝트 기록 / 스킬 관리 기능을 CLI와 읽기 전용 MCP로 제공했습니다. 조회 범위와 설치 경로는 Windows / Ubuntu CI에서 검증했습니다.',
									'파일의 소유 정보와 해시로 사용자 수정본을 보존하며, 백업 / 적용 기록으로 복구합니다. 설치 일부 실패 / 파일 충돌 / 검사 후 수정 / 복원 시나리오를 테스트했습니다.',
								]
							: [
									'Provided project-record and skill management through a CLI and read-only MCP. Verified query scope and installation paths in Windows / Ubuntu CI.',
									'Used file ownership and hashes to preserve user edits, with backups and application records for recovery. Tested partial installation failures, conflicts, changes after inspection, and restoration.',
								]
						: [text.actions[0].description],
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
							? '정산 ERP와 Flutter 모바일 업무 앱을 풀스택으로 개발했습니다. 모바일 담당 범위는 채팅 시스템을 제외한 대부분의 기능입니다.'
							: 'Owned full-stack development of the ERP and connected Flutter mobile work app, excluding the chat system.'
						: id === 'delivery-output-flow'
							? ko
								? '물류 웹 프론트엔드 전체와 Android 출력 앱을 개발했습니다. 조회·예약·Excel 등록부터 PC 라벨 출력과 Bluetooth 프린터 연동까지 구현했습니다.'
								: 'Built the complete logistics frontend and Android printing app, covering search, reservations, Excel imports, PC label printing and Bluetooth printer integration.'
							: (resume.careers[0].workItems?.find(
									(item) => item.title === story.title,
								)?.scope ?? copy.summary),

				decisionPoints:
					id === 'settlement-operations-platform'
						? [
								decisionCases[locale][id].points[0],
								decisionCases[locale]['erp-mobile-workflow'].points[0],
							]
						: id === 'delivery-output-flow'
							? [
									decisionCases[locale]['delivery-operations-web'].points[0],
									decisionCases[locale]['mobile-output-bridge'].points[0],
								]
							: decisionCases[locale][id].points,
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
				decision:
					supportingDocumentCopy[locale][id] ??
					workDocumentCopy[locale][id].overviewDetail!,
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
