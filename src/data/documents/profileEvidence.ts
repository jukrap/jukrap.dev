// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-profileEvidence.json';

interface CareerProfileEvidence {
	id: 'career-triphos' | 'career-tis';
	kind: 'career';
	company: string;
	period: string;
	officialTitle?: string;
	role: string;
	summary: string;
	highlights?: readonly string[];
}

export const triphosCareerEvidence: {
	readonly id: 'career-triphos';
	readonly kind: 'career';
	readonly company: '트리포스㈜';
	readonly period: '2026.02 ~ 2026.11';
	readonly role: '웹·모바일 개발자';
	readonly summary: 'React 업무 화면과 Spring Boot / Django API, 모바일 앱 연동을 개발하고 기존 웹과 앱의 기능을 개선했습니다.';
} = readCareerValue<{
	readonly id: 'career-triphos';
	readonly kind: 'career';
	readonly company: '트리포스㈜';
	readonly period: '2026.02 ~ 2026.11';
	readonly role: '웹·모바일 개발자';
	readonly summary: 'React 업무 화면과 Spring Boot / Django API, 모바일 앱 연동을 개발하고 기존 웹과 앱의 기능을 개선했습니다.';
}>(snapshot, 'triphosCareerEvidence');

export const tisCareerEvidence: {
	readonly id: 'career-tis';
	readonly kind: 'career';
	readonly company: 'TIS';
	readonly period: '2022.06 ~ 2022.07';
	readonly officialTitle: '대학생 현장실습생';
	readonly role: '기획 및 데이터 자동화 지원';
	readonly summary: '대학생 현장실습으로 공장 에너지 관리 시스템 화면과 에너지 관련 데이터 수집·정리를 다뤘습니다.';
	readonly highlights: readonly [
		'Figma로 공장 에너지 관리 시스템의 화면 흐름을 기획하고 데이터베이스 테이블 명세와 ERD를 정리했습니다.',
		'한국전력 기업별 파워플래너를 분석하고 에너지 데이터 수집용 Python 크롤러를 작성했습니다.',
	];
} = readCareerValue<{
	readonly id: 'career-tis';
	readonly kind: 'career';
	readonly company: 'TIS';
	readonly period: '2022.06 ~ 2022.07';
	readonly officialTitle: '대학생 현장실습생';
	readonly role: '기획 및 데이터 자동화 지원';
	readonly summary: '대학생 현장실습으로 공장 에너지 관리 시스템 화면과 에너지 관련 데이터 수집·정리를 다뤘습니다.';
	readonly highlights: readonly [
		'Figma로 공장 에너지 관리 시스템의 화면 흐름을 기획하고 데이터베이스 테이블 명세와 ERD를 정리했습니다.',
		'한국전력 기업별 파워플래너를 분석하고 에너지 데이터 수집용 Python 크롤러를 작성했습니다.',
	];
}>(snapshot, 'tisCareerEvidence');

export const universityEducationEvidence: {
	readonly id: 'education-university';
	readonly kind: 'education';
	readonly title: '경상국립대학교 컴퓨터과학과';
	readonly period: '2023.02 졸업';
	readonly detail: '학점 3.64 / 4.5';
} = readCareerValue<{
	readonly id: 'education-university';
	readonly kind: 'education';
	readonly title: '경상국립대학교 컴퓨터과학과';
	readonly period: '2023.02 졸업';
	readonly detail: '학점 3.64 / 4.5';
}>(snapshot, 'universityEducationEvidence');

export const publicProfileEvidenceRecords: readonly [
	{
		readonly id: 'education-university';
		readonly kind: 'education';
		readonly title: '경상국립대학교 컴퓨터과학과';
		readonly period: '2023.02 졸업';
		readonly detail: '학점 3.64 / 4.5';
	},
	{
		readonly id: 'career-triphos';
		readonly kind: 'career';
		readonly company: '트리포스㈜';
		readonly period: '2026.02 ~ 2026.11';
		readonly role: '웹·모바일 개발자';
		readonly summary: 'React 업무 화면과 Spring Boot / Django API, 모바일 앱 연동을 개발하고 기존 웹과 앱의 기능을 개선했습니다.';
	},
	{
		readonly id: 'career-tis';
		readonly kind: 'career';
		readonly company: 'TIS';
		readonly period: '2022.06 ~ 2022.07';
		readonly officialTitle: '대학생 현장실습생';
		readonly role: '기획 및 데이터 자동화 지원';
		readonly summary: '대학생 현장실습으로 공장 에너지 관리 시스템 화면과 에너지 관련 데이터 수집·정리를 다뤘습니다.';
		readonly highlights: readonly [
			'Figma로 공장 에너지 관리 시스템의 화면 흐름을 기획하고 데이터베이스 테이블 명세와 ERD를 정리했습니다.',
			'한국전력 기업별 파워플래너를 분석하고 에너지 데이터 수집용 Python 크롤러를 작성했습니다.',
		];
	},
] = readCareerValue<
	readonly [
		{
			readonly id: 'education-university';
			readonly kind: 'education';
			readonly title: '경상국립대학교 컴퓨터과학과';
			readonly period: '2023.02 졸업';
			readonly detail: '학점 3.64 / 4.5';
		},
		{
			readonly id: 'career-triphos';
			readonly kind: 'career';
			readonly company: '트리포스㈜';
			readonly period: '2026.02 ~ 2026.11';
			readonly role: '웹·모바일 개발자';
			readonly summary: 'React 업무 화면과 Spring Boot / Django API, 모바일 앱 연동을 개발하고 기존 웹과 앱의 기능을 개선했습니다.';
		},
		{
			readonly id: 'career-tis';
			readonly kind: 'career';
			readonly company: 'TIS';
			readonly period: '2022.06 ~ 2022.07';
			readonly officialTitle: '대학생 현장실습생';
			readonly role: '기획 및 데이터 자동화 지원';
			readonly summary: '대학생 현장실습으로 공장 에너지 관리 시스템 화면과 에너지 관련 데이터 수집·정리를 다뤘습니다.';
			readonly highlights: readonly [
				'Figma로 공장 에너지 관리 시스템의 화면 흐름을 기획하고 데이터베이스 테이블 명세와 ERD를 정리했습니다.',
				'한국전력 기업별 파워플래너를 분석하고 에너지 데이터 수집용 Python 크롤러를 작성했습니다.',
			];
		},
	]
>(snapshot, 'publicProfileEvidenceRecords');

export const privateProfileEvidenceRecords: readonly CareerProfileEvidence[] =
	readCareerValue<readonly CareerProfileEvidence[]>(
		snapshot,
		'privateProfileEvidenceRecords',
	);

export {};
