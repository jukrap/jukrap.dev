import { SimpleProject } from '@/types/project';

export const projectsData: SimpleProject[] = [
	{
		id: 'ai-agent-playbook',
		title: 'AI Agent Playbook',
		duration: '2026.06 ~ Present',
		major: true,
		introduction:
			'AI 코딩 도구가 프로젝트 규칙과 작업 기록을 이어서 참고하도록 돕는 개발 도구.',
		description: [
			'1인 개발',
			'코딩 도구와 역할이 겹치는 실행기·스케줄러를 제외하고 기록·스킬 관리에 집중했습니다.',
			'새 스킬을 모두 검증한 뒤 기존 항목을 정리해, 일부 설치가 실패해도 이전 구성을 보존했습니다.',
			'사용자 수정본을 보존하고, 충돌·삭제 직전 변경·복구를 테스트했습니다.',
			'CLI·읽기 전용 MCP와 npm 패키지, 한국어·영어 사용 문서를 제공했습니다.',
		],
		techStack: 'JavaScript, Node.js, MCP SDK, Zod, GitHub Actions',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/jukrap/ai-agent-playbook',
				visible: true,
			},
			{
				type: 'url',
				url: 'https://www.npmjs.com/package/ai-agent-playbook',
				visible: true,
			},
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'captain-donghae',
		title: 'C. Donghae',
		duration: '2024.10',
		major: true,
		introduction: '동해선 이용객을 위한 실시간 종합 가이드 서비스.',
		description: [
			'프론트엔드 개발',
			'구글 맵스 기반 지도 서비스 개발.',
			'실시간 역 혼잡도, 날씨, 맛집 정보, 추천 코스 등 제공.',
			'지도 위에서 끌어 올리고 내릴 수 있는 바텀 시트 구현.',
			'DIVE 2024 부산테크노파크원장상(발제사 3등) 수상.',
		],
		techStack:
			'TypeScript, React, Next.js, Tailwind CSS, Google Maps Platform, Storybook',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/Busan-Trail/busan_trail_front',
				visible: false,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'itzip',
		title: 'Itzip',
		duration: '2024.07 ~ 2025.06',
		major: true,
		introduction:
			'개발자 취업 준비생에게 블로그·테스트·구인 정보를 제공하는 웹서비스.',
		description: [
			'프론트엔드 개발 & DevOps',
			'블로그 목록과 Markdown 편집·미리보기 화면 개발.',
			'단위 테스트 작성과 실행 중 오류 모니터링.',
		],
		techStack:
			'TypeScript, React, Next.js, Tailwind CSS, Jotai, Jest, Storybook, Sentry, AWS, Jenkins, Docker',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/ITZipProject/itzip_front',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'jukrap-website',
		title: 'Jukrap Website',
		duration: '2024.06 ~ Present',
		major: false,
		introduction: '업무 경험과 개인 프로젝트, 지원 문서를 정리한 개인 웹사이트.',
		description: [
			'1인 개발',
			'React 19와 Next.js 16 App Router 기반으로 개발.',
			'한국어·영어 콘텐츠와 경력 문서의 웹·PDF 제공.',
			'테마 전환, 프로젝트 상세와 이미지 확대 보기 구현.',
			'홈 영상의 재생 제어와 정적 이미지 대체 처리.',
		],
		techStack:
			'TypeScript, React, Next.js, Tailwind CSS, Framer Motion, Zustand, Sharp',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/jukrap/jukrap.dev',
				visible: true,
			},
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: true },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'sharebby',
		title: 'ShareBBy',
		major: true,
		duration: '2024.04 ~ 2024.06',
		introduction: '취미 활동을 공유하고 모임에 참여할 수 있는 크로스 플랫폼 앱.',
		description: [
			'React Native 앱 개발·Firebase 연동',
			'커뮤니티 기능 전체 개발 담당.',
			'재사용 가능한 토스트 및 모달 컴포넌트 제작.',
			'이미지 크기 조정과 캐싱 적용.',
			'당겨서 새로고침과 스크롤에 따른 다음 게시글 조회 구현.',
			'데이터베이스 설계.',
		],
		techStack: 'JavaScript, React Native, Firebase, Realtime Database',
		links: [
			{
				type: 'appleStore',
				url: 'https://apps.apple.com/kr/app/%EC%89%90%EC%96%B4%EB%B9%84/id6502604022',
				visible: false,
			},
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/jukrap/archived-rn-ShareBBy',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'posture-teacher',
		title: 'Posture Teacher',
		duration: '2022.07 ~ 2023.05',
		major: true,
		introduction: '앉은 자세와 운동 자세를 감지하고 측정 결과를 보여주는 앱.',
		description: [
			'팀장, 안드로이드 개발',
			'앉은 자세와 플랭크 자세를 판별하고 유지 시간을 기록하는 화면 개발.',
			'MediaPipe 빌드와 자세 감지 기능 구현.',
			'멀티 스레드로 자세 감지 처리 분리.',
		],
		techStack: 'Java, Android Jetpack, MediaPipe, SQLite',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{
				type: 'googleStore',
				url: 'https://play.google.com/store/apps/details?id=com.gnupr.postureteacher',
				visible: false,
			},
			{
				type: 'github',
				url: 'https://github.com/jukrap/archived-Posture-Teacher',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'chatterbox',
		title: 'Chatterbox',
		duration: '2022.09 ~ 2022.12',
		major: false,
		introduction:
			'아이가 읽은 목소리를 글자로 바꾸어 지문과 비교하고 독서 기록을 남기는 앱.',
		description: [
			'1인 개발',
			'오프라인 시 Android의 내장 Speech-to-Text 사용.',
			'온라인 시 Google Cloud Platform의 Speech-to-Text 사용.',
		],
		techStack: 'Java, Jetpack, Material, SQLite, Google Cloud Platform',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/jukrap/Chatterbox',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'labyrinth-escape-game',
		title: 'Labyrinth Escape Game',
		duration: '2022.05 ~ 2022.06',
		major: false,
		introduction: '미궁을 탈출하는 1인칭 슈팅 게임.',
		description: [
			'1인 개발',
			'Unity Asset Store 리소스로 1인칭 슈팅·체력·점수와 적 AI·아이템 구현.',
			'공유 게임 데이터와 기능을 싱글톤으로 관리.',
		],
		techStack: 'C#, Unity',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/jukrap/Labyrinth-Escape-Game',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'mytime',
		title: 'MyTime',
		duration: '2022.02 ~ 2022.06',
		major: false,
		introduction: '얼굴 움직임으로 집중 여부를 감지하고 기록하는 타이머 앱.',
		description: [
			'팀장, 안드로이드 개발',
			'눈동자와 얼굴 움직임으로 집중 여부를 판별하는 화면 개발.',
			'MediaPipe 빌드와 안면 감지 기능 구현.',
		],
		techStack: 'Java, Jetpack, MediaPipe, SQLite',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '', visible: false },
			{
				type: 'github',
				url: 'https://github.com/yewon5858/Croffle-Project',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	{
		id: 'esd-hotdeal',
		title: 'ESD HotDeal',
		duration: '2021.07 ~ 2021.10',
		major: false,
		introduction:
			'여러 디지털 소프트웨어 판매처(ESD)의 할인·무료 배포 정보를 모아 보여주는 웹서비스.',
		description: [
			'팀장, 프론트엔드 및 백엔드 개발',
			'메인 페이지와 상세 페이지 전체 개발.',
			'재사용 가능한 상품 정보 컴포넌트 제작.',
			'Express API와 Puppeteer 수집 기능, Firebase 데이터 저장 구조 구현.',
			'경남소프트웨어경진대회 최우수상 수상.',
		],
		techStack: 'JavaScript, React, Node.js, Express, Firebase, Puppeteer',
		links: [
			{ type: 'appleStore', url: '/', visible: false },
			{ type: 'googleStore', url: '/', visible: false },
			{
				type: 'github',
				url: 'https://github.com/jukrap/RollCakeProject',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
			{ type: 'detailView', url: '/detailView', visible: true },
		],
	},
	// 여기에 계속 추가
];
