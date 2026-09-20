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
					? '업무용 웹 개발과 Android 연동'
					: 'Business web applications and Android integration',
				highlights: [],
				workItems: [
					{
						title: ko ? '업무 정산 ERP 플랫폼' : 'Settlement Operations Platform',
						scope: ko
							? '차량·기사·운송료·정산 관리 웹과 주요 API·DB 처리 개발'
							: 'Administrator interfaces for vehicles, drivers, fees and settlement, plus key APIs and database operations',
						highlights: ko
							? [
									'키보드 조작과 저장 실패 시 입력값을 보존하는 공통 편집표 개발',
									'Excel 오류 셀 표시·수정·재검사, 저장 오류 시 전체 롤백과 중복 요청 처리 구현',
								]
							: [
									'Built shared editing tables with keyboard controls and draft retention after failed saves.',
									'Built Excel previews with invalid-cell correction, server revalidation, all-or-nothing saves, and repeat-request handling.',
								],
					},
					{
						title: ko
							? '물류 운영 웹·출력 앱'
							: 'Logistics Operations Web & Printing App',
						scope: ko
							? '조회·예약·Excel 등록 화면과 Android 라벨 출력 연동'
							: 'Search, reservations, Excel imports, and Android label printing',
						highlights: ko
							? [
									'페이지·Excel 코드 지연 로딩으로 초기 JavaScript 엔트리 파일 크기 약 74% 감소(빌드 산출물 기준)',
								]
							: [
									'Reduced the initial JavaScript entry file by about 74% with on-demand page and Excel code loading (build output size).',
								],
					},
					{
						title: ko ? '주식 업무 관리 웹' : 'Stock Administration Web',
						scope: ko
							? 'MSW 모의 API 기반 React 프론트엔드 전체 구축'
							: 'Complete React frontend built against MSW mock APIs',
						highlights: ko
							? [
									'열 고정·너비 조절·재정렬을 지원하는 공통 테이블 개발. 조회 조건과 화면 조작 상태 분리',
								]
							: [
									'Built shared tables with column pinning, resizing and reordering; separated query conditions from interaction state.',
								],
					},
				],
				evidence: [
					{ source: 'profile', id: triphosCareerEvidence.id },
					...evidence,
				],
			},
			{
				company: tisCareerEvidence.company,
				period: tisCareerEvidence.period,
				officialTitle: ko ? tisCareerEvidence.officialTitle : 'University Intern',
				role: ko ? tisCareerEvidence.role : 'Planning and data automation support',
				highlights: ko
					? [
							'Figma 기반 공장 에너지 관리 화면 기획, 데이터베이스 테이블 명세·ERD 작성',
							'한국전력 기업별 파워플래너 분석과 에너지 데이터 수집용 Python 크롤러 작성',
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
					? '개발 정보 공유, 데일리 스크럼 참여와 프로젝트 점검 지원'
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
					resume.careers[0].workItems?.find((item) => item.title === story.title)
						?.scope ?? copy.summary,
				contribution: copy.actions[0].description,
				implementations: copy.actions.map((action) => action.description),
				decision: copy.actions
					.slice(1)
					.map(({ description }) => description)
					.join(' '),
				result: id === 'react-admin-state-migration' ? '' : copy.result,
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
