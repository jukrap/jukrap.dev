import { ProjectType } from '../app/about/types';

export const projectsData: ProjectType[] = [
	{
		title: 'Jukrap Website',
		duration: '2024.06 ~ 2024.06',
		introduction: 'React 및 Next.js 기반의 개인용 웹사이트.',
		description: [
			'1인 개발',
			'가능한 한 최신 프레임워크를 사용 (React 18, Next.js 14)',
		],
		techStack: 'TypeScript・React・Tailwind CSS・Zustand・Next.js',
		links: [
			{ type: 'appStore', url: 'https://apps.apple.com/kr/', visible: false },
			{ type: 'googlePlay', url: 'https://play.google.com/', visible: false },
			{ type: 'github', url: 'https://github.com/jukrap/', visible: true },
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: true },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		title: 'ShareBBy',
		duration: '2024.04 ~ 2024.06',
		introduction:
			'취미 활동을 공유하고 참여 플랫폼을 제공해주는 크로스 플랫폼 앱.',
		description: [
			'실시간 게시판 기능 전체 담당',
			'재사용 가능한 토스트 및 모달 컴포넌트 제작',
			'이미지 연결 및 이미지 상세보기 제작',
			'데이터베이스 설계작',
		],
		techStack: 'TypeScript・React・Tailwind CSS・Zustand・Next.js',
		links: [
			{ type: 'appStore', url: 'https://apps.apple.com/kr/', visible: true },
			{ type: 'googlePlay', url: 'https://play.google.com/', visible: false },
			{ type: 'github', url: 'https://github.com/jukrap/', visible: true },
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: false },
			{ type: 'detailView', url: '/detailView', visible: false },
		],
	},
	{
		title: 'Posture Teacher',
		duration: '2024.07 ~ 2023.05',
		introduction: '자세가 올바른지 감지하고 결과를 도출하는 앱.',
		description: [
			'팀장, 프론트엔드 및 백엔드',
			'자세 감지 기반의 착석 및 운동 자세 판별 페이지 담당',
			'자세 감지 기능 제작, Mediapipe 추출',
		],
		techStack: 'JavaㆍJetpackㆍMediapipeㆍSQLite',
		links: [
			{ type: 'appStore', url: 'https://apps.apple.com/kr/', visible: false },
			{ type: 'googlePlay', url: 'https://play.google.com/', visible: true },
			{ type: 'github', url: 'https://github.com/jukrap/', visible: true },
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: false },
			{ type: 'detailView', url: '/detailView', visible: false },
		],
	},
	{
		title: 'Chatterbox',
		duration: '2022.09 ~ 2022.12',
		introduction: '목소리로 독서 여부를 감지하는 앱.',
		description: [
			'1인 개발',
			'오프라인 시 Android의 내장 Speech-to-Text 사용',
			'온라인 시 Google Cloud Platform의 Speech-to-Text 사용',
		],
		techStack: 'JavaㆍJetpackㆍMaterialㆍSQLiteㆍGoogle Cloud Platform',
		links: [
			{ type: 'appStore', url: 'https://apps.apple.com/kr/', visible: false },
			{ type: 'googlePlay', url: 'https://play.google.com/', visible: false },
			{ type: 'github', url: 'https://github.com/jukrap/', visible: true },
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: false },
			{ type: 'detailView', url: '/detailView', visible: false },
		],
	},
	{
		title: 'MyTime',
		duration: '2022.02 ~ 2022.06',
		introduction: '집중력 향상을 위한 감지 및 결과를 도출하는 앱.',
		description: [
			'팀장, 프론트엔드 및 백엔드',
			'안면 감지 기반의 집중력 판별 페이지 담당',
			'안면 감지 기능 제작, Mediapipe 추출',
		],
		techStack: 'JavaㆍJetpackㆍMediapipeㆍSQLite',
		links: [
			{ type: 'appStore', url: 'https://apps.apple.com/kr/', visible: false },
			{ type: 'googlePlay', url: 'https://play.google.com/', visible: false },
			{ type: 'github', url: 'https://github.com/jukrap/', visible: true },
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: false },
			{ type: 'detailView', url: '/detailView', visible: false },
		],
	},
	{
		title: 'ESD HotDeal',
		duration: '2021.07 ~ 2021.10',
		introduction: '다양한 ESD의 핫딜 데이터를 모아서 제공하는 웹서비스.',
		description: [
			'팀장, 프론트엔드 및 백엔드',
			'메인 페이지 전체 작업 및 상세 페이지 전체 작업',
			'재사용 가능한 상품 정보 컴포넌트 제작',
			'Express로 백엔드 작업',
			'경남소프트웨어경진대회 최우수상 수상',
		],
		techStack: 'JavaㆍJetpackㆍMediapipeㆍSQLite',
		links: [
			{ type: 'appStore', url: 'https://apps.apple.com/kr/', visible: false },
			{ type: 'googlePlay', url: 'https://play.google.com/', visible: false },
			{ type: 'github', url: 'https://github.com/jukrap/', visible: true },
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: false },
			{ type: 'detailView', url: '/detailView', visible: false },
		],
	},
	// 여기에 계속 추가
];
