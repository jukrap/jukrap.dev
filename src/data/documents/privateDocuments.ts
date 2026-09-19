import type { CareerBriefCopy, ResumeDocumentCopy } from '@/types/documents';
import type { Locale } from '@/types/locale';
import { getRecruitingDocumentManifest } from './manifest';
import {
	getWorkStory,
	getProject,
	workStoryEvidence,
	projectEvidence,
} from './sourceSelectors';
import { recruitingDocumentSkillGroups } from './documentSkills';
import {
	resumeProfile,
	supportingDocumentCopy,
	workDocumentCopy,
} from './editorialCopy';
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
		profile: resumeProfile[locale],
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
					? '정산 ERP는 React 화면부터 Spring Boot API, DB 처리까지 전반을 개발했습니다. 물류 업무 화면을 만들고, 주식 업무 웹은 MSW 모의 API를 사용해 React 프론트엔드 전체를 구축했습니다.'
					: 'Built the settlement ERP across React interfaces, Spring Boot APIs, and database processing. Developed logistics screens and the complete React frontend for stock administration using MSW mock APIs.',
				highlights: ko
					? [
							'페이지와 Excel 코드를 필요할 때 불러오도록 바꿔 초기 JavaScript 엔트리 크기를 약 74% 줄였습니다(빌드 산출물 기준).',
							'정산표의 키보드 이동과 입력 내용 보존, Excel 미리보기·저장 기능을 구현했습니다. 같은 자료가 중복 저장되거나 일부 자료만 저장되는 일을 막았습니다.',
							'MSW 모의 API로 공통 테이블, 필터, 모달을 개발했습니다. 조회 데이터는 TanStack Query로 관리하고 화면 조작 상태와 분리했습니다.',
						]
					: [
							'Reduced the initial JavaScript entry by about 74% through lazy-loaded pages and Excel code, measured by build output size.',
							'Implemented keyboard navigation, retained drafts, and Excel preview/save flows in the ERP, preventing duplicate finalization and partial saves.',
							'Built shared tables, filters, and modals with MSW mock APIs, separating query data managed by TanStack Query from UI state.',
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
					? [...tisCareerEvidence.highlights]
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
				goal: copy.summary,
				contribution: copy.actions[0].description,
				decision: copy.actions
					.slice(1)
					.map(({ description }) => description)
					.join(' '),
				result: copy.result,
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
