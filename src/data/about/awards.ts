import { Award } from '@/types/profile';

export const awards: Award[] = [
	{
		title: 'DIVE 2024 해커톤',
		period: '2024.10',
		award: '부산테크노파크원장상 수상',
		details: [
			'출품 작품 : 동해선장',
			{ text: '발제사 3위', link: '/images/captain-donghae/award.png' },
		],
	},
	{
		title: '경상대학교 인공지능 미술전',
		period: '2022.11',
		award: '장려상 수상',
		details: ['출품 작품 : 석양', 'Stable Diffusion 사용'],
	},
	{
		title: '코딩역량강화 교내대회',
		period: '2021.10 ~ 2021.11',
		award: '개척상 수상',
		details: ['출품 작품 : ESD HotDeal'],
	},
	{
		title: '경남소프트웨어 경진대회',
		period: '2021.08 ~ 2021.10',
		award: '최우수상 수상',
		details: [
			'출품 작품 : ESD HotDeal',
			{
				text: '[경남일보] "도내 소프트업계 이끌 인재들입니다"',
				link: 'https://www.knnews.co.kr/news/articleView.php?idxno=1362660',
			},
		],
	},
];
