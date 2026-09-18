import { Activity } from '@/types/profile';

export const activities: Activity[] = [
	{
		id: 'study-groups',
		title: '스터디 운영',
		period: '2024.05 ~ 2025.06',
		role: '코딩 테스트 및 개발 지식 스터디',
		details: ['코딩 테스트와 개발 지식을 주제로 총 2개의 스터디를 운영했습니다.'],
	},
	{
		id: 'programmers-devcourse-assistant-mentor',
		title: '프로그래머스 데브코스',
		period: '2024.05 ~ 2024.09',
		role: 'Cloud Application Engineering 과정 - 서브멘토',
		details: [
			'이전 기수에서 우수 수료자로 선정된 뒤, 같은 과정 2기 수강생의 서브멘토로 활동했습니다.',
			'매주 개발 정보를 공유하고 수료생의 고민을 상담했습니다. 데일리 스크럼에 참여하며 개발 문제 해결과 프로젝트 점검을 도왔습니다.',
		],
	},
	{
		id: 'programmers-devcourse-student',
		title: '프로그래머스 데브코스',
		period: '2023.12 ~ 2024.05',
		role: 'Cloud Application Engineering 과정 - 수강생',
		details: [
			'React와 React Native 개발을 중심으로 Cloud Application Engineering 데브코스 과정을 수료했습니다.',
			'훈련 분야 : React & React Native',
		],
	},
	{
		id: 'study-mentor',
		title: '스터디 멘토',
		period: '2021.09 ~ 2022.02',
		role: '멘토-멘티 코딩 멘토링',
		details: ['코딩 스터디에서 멘토를 맡아 프로그래밍과 개발 학습을 도왔습니다.'],
	},
];
