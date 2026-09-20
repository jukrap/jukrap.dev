import { Activity } from '@/types/profile';

export const activities: Activity[] = [
	{
		id: 'study-groups',
		title: '스터디 운영',
		period: '2024.05 ~ 2025.06',
		role: '코딩 테스트 및 개발 지식 스터디',
		details: ['코딩 테스트·개발 지식 스터디 2개 운영.'],
	},
	{
		id: 'programmers-devcourse-assistant-mentor',
		title: '프로그래머스 데브코스',
		period: '2024.05 ~ 2024.09',
		role: 'Cloud Application Engineering 과정 - 서브멘토',
		details: [
			'이전 기수 우수 수료 후 같은 과정 2기 서브멘토 활동.',
			'매주 개발 정보 공유와 수료생 상담. 데일리 스크럼 참여, 개발 문제 해결과 프로젝트 점검 지원.',
		],
	},
	{
		id: 'programmers-devcourse-student',
		title: '프로그래머스 데브코스',
		period: '2023.12 ~ 2024.05',
		role: 'Cloud Application Engineering 과정 - 수강생',
		details: [
			'React·React Native 중심의 Cloud Application Engineering 데브코스 과정 수료.',
			'훈련 분야 : React & React Native',
		],
	},
	{
		id: 'study-mentor',
		title: '스터디 멘토',
		period: '2021.09 ~ 2022.02',
		role: '멘토-멘티 코딩 멘토링',
		details: ['코딩 스터디 멘토로 프로그래밍·개발 학습 지원.'],
	},
];
