interface CareerProfileEvidence {
	id: 'career-triphos' | 'career-tis';
	kind: 'career';
	company: string;
	period: string;
	officialTitle: string;
	role: string;
	summary: string;
	highlights?: readonly string[];
}

interface EducationProfileEvidence {
	id: 'education-university';
	kind: 'education';
	title: string;
	period: string;
	detail: string;
}

export const triphosCareerEvidence = {
	id: 'career-triphos',
	kind: 'career',
	company: '트리포스㈜',
	period: '2026.02 ~ 현재',
	officialTitle: '프로젝트팀 매니저',
	role: '웹/모바일 프론트엔드 엔지니어',
	summary:
		'React 기반 신규 업무 화면, 모바일 WebView와 Android 출력, 레거시 웹과 앱 개선 및 운영 반영을 담당합니다.',
} as const satisfies CareerProfileEvidence;

export const tisCareerEvidence = {
	id: 'career-tis',
	kind: 'career',
	company: 'TIS',
	period: '2022.06 ~ 2022.07',
	officialTitle: '대학생 현장실습생',
	role: '기획 및 데이터 자동화 지원',
	summary:
		'대학생 현장실습으로 공장 에너지 관리 시스템 화면과 에너지 관련 데이터 수집·정리를 다뤘습니다.',
	highlights: [
		'Figma로 공장 에너지 관리 시스템의 화면 흐름을 기획하고 데이터베이스 테이블 명세와 ERD를 정리했습니다.',
		'한국전력 기업별 파워플래너를 분석하고 에너지 데이터 수집용 Python 크롤러를 작성했습니다.',
	],
} as const satisfies CareerProfileEvidence;

export const universityEducationEvidence = {
	id: 'education-university',
	kind: 'education',
	title: '경상국립대학교 컴퓨터과학과',
	period: '2023.02 졸업',
	detail: '학점 3.64 / 4.5',
} as const satisfies EducationProfileEvidence;

export const publicProfileEvidenceRecords = [
	universityEducationEvidence,
] as const;

export const privateProfileEvidenceRecords = [
	triphosCareerEvidence,
	tisCareerEvidence,
] as const;
