import { ProjectDetailType } from '../app/about/types';

export const projectsDetailData: ProjectDetailType[] = [
	{
		id: 'jukrap-website',
		title: 'Jukrap Website',
		subtitle: 'Ju-cheol Park',
		duration: '2024.06 ~ 2024.06',
		links: [
			{
				type: 'github',
				url: 'https://github.com/jukrap/jukrap.dev',
				visible: true,
			},
			{
				type: 'appleStore',
				url: '/',
				visible: false,
			},
			{
				type: 'googleStore',
				url: '/',
				visible: false,
			},
			{ type: 'url', url: 'https://jukrap.vercel.app', visible: true },
		],
		overview: 'React 및 Next.js 기반의 개인용 웹사이트.',
		techStack: [
			'HTML & CSS',
			'TypeScript',
			'React',
			'Tailwind CSS',
			'Zustand',
			'Next.js',
		],
		role: ['1인 개발'],
		teamSize: 1,
		functions: [
			{
				title: '시작 페이지',
				details: ['간단한 소개와 포트폴리오 다운로드 버튼이 있습니다.'],
			},
			{
				title: '소개 페이지',
				details: [
					'저에 대한 소개와 여러 정보가 포함되어 있습니다.',
					'프로젝트 상세 보기를 통해 프로젝트를 상세하게 볼 수도 있습니다.',
				],
			},
		],
		tasks: [
			{
				title: '가능한 한 최신 프레임워크를 사용',
				details: ['React 18, Next.js 14.'],
			},
			{
				title: '주요 특징',
				details: [
					'훅을 이용하여 타이핑 되는 효과를 타이틀 및 내용에 주었습니다.',
					'Zustand와 Tailwind를 이용해 화이트 & 다크 모드 전환 기능을 구현했습니다.',
				],
			},
		],
		impression: [
			{
				title: 'TypeScript 사용',
				details: [
					'TypeScript의 Type 및 Interface 기능은 JavaScript에서의 주먹구구식의 개발을 벗어나게 해주는 핵심적인 열쇠가 되었습니다.',
					'과거에는 JavaScript에서 TypeScript로 웹 개발이 옮겨가고 있는 것이 이해가 안 되었는데... 이제는 어째서 옮겨가는 추세인지 알 것 같습니다.',
				],
			},
			{
				title: 'Tailwind CSS 사용',
				details: [
					'Class를 통해 빠르고 일관된 디자인을 구현하는 과정이 인상 깊었습니다.',
					'다만, 그만큼 가독성이 망가지지 않토록 주의해야겠다는 생각도 들었습니다.',
				],
			},
			{
				title: 'Next.js 사용',
				details: [
					'App 라우팅을 통해 이토록 빠르고 편한 개발을 할 수 있다는 것에 놀랐습니다.',
					'진작 배우지 않은 게 조금 후회스러울 정도였습니다.',
				],
			},
		],
		projectData: {
			images: [
				'/images/jukrap-website/image1.png',
				'/images/jukrap-website/image2.png',
				'/images/jukrap-website/image3.png',
				'/images/jukrap-website/image4.png',
			],
			subLinks: [
				{
					type: 'video',
					url: '/',
					visible: false,
				},
				{
					type: 'ppt',
					url: '/',
					visible: false,
				},
				{ type: 'doc', url: '/', visible: false },
				{ type: 'other', url: '/', visible: false },
			],
		},
	},
	{
		id: 'sharebby',
		title: '쉐어비',
		subtitle: 'ShareBBy',
		duration: '2024.04 ~ 2024.06',
		links: [
			{
				type: 'github',
				url: 'https://github.com/jukrap/rn-ShareBBy',
				visible: true,
			},
			{
				type: 'appleStore',
				url: 'https://apps.apple.com/kr/app/%EC%89%90%EC%96%B4%EB%B9%84/id6502604022',
				visible: true,
			},
			{
				type: 'googleStore',
				url: '/',
				visible: false,
			},
			{ type: 'url', url: '/', visible: false },
		],
		overview:
			'다양한 취미 활동을 공유하고 참여할 수 있는 플랫폼을 제공하는 크로스플랫폼 앱.',
		techStack: ['HTML & CSS', 'JavaScript', 'React Native', 'Firebase'],
		role: ['발표', '디자인', '프론트엔드', '백엔드'],
		teamSize: 5,
		functions: [
			{
				title: '메인 페이지',
				details: ['순위와 취미 그룹 모집 및 참여가 가능한 페이지입니다.'],
			},
			{
				title: '커뮤니티 페이지',
				details: [
					'실시간 게시판으로 커뮤니티 관련 기능을 수행할 수 있는 페이지입니다.',
				],
			},
			{
				title: '채팅 페이지',
				details: ['채팅 관련 기능을 수행할 수 있는 페이지입니다.'],
			},
			{
				title: '프로필 페이지',
				details: ['개인 프로필을 확인할 수 있는 페이지입니다.'],
			},
		],
		tasks: [
			{
				title: '발표, 디자인 관련 업무 (75% 담당)',
				details: [
					'프로젝트의 발표를 진행하고, 디자인 상당수를 Figma로 제작하였습니다.',
				],
			},
			{
				title: '안드로이드 작업 (40% 담당)',
				details: [
					'IOS 기준으로 개발된 앱을 안드로이드에 맞도록 수정하고 고쳤습니다.',
				],
			},
			{
				title: '데이터베이스 관련 (100% 담당)',
				details: [
					'ERD를 제작함으로서 데이터 관계가 어떻게 되는지를 규정하고, Firebase에서의 구조를 설계하였습니다.',
					'Firebase의 실시간 데이터베이스 및 이미지 스토리지를 앱을 연결하기도 했습니다.',
				],
			},
			{
				title: '게시판 전체 구현 (100% 담당)',
				details: [
					'사용자들이 편리하게 게시글과 댓글을 작성, 읽기, 수정, 삭제할 수 있습니다.',
					'가까운 위치에 있는 유저들의 게시글들만 목록에서 볼 수도 있습니다.',
					'게시글 목록을 시간 및 댓글 수 및 좋아요 수로 정렬할 수 있습니다.',
					'풀 투 리프레시와 인피니티 스크롤을 개발하여 편의성 및 성능을 개선했습니다.',
					'이미지에 대한 크기 조정 및 캐싱 등의 최적화로 성능 개선을 하였습니다.',
				],
			},
			{
				title: '모달 및 토스트 제작 (60% 담당)',
				details: ['각종 모달 및 토스트 메시지를 제작했습니다.'],
			},
		],
		impression: [
			{
				title: '협업의 중요성',
				details: [
					'이번 프로젝트는 5명의 팀원이 함께 진행하였습니다. 비록 각자 맡은 역할이 달랐지만, 모두가 한 팀으로서 협력하여 프로젝트를 완성해나갔습니다. 이 과정에서 협업의 중요성을 깊이 느낄 수 있었습니다.',
					'협업은 단순히 업무를 분담하는 것 이상의 의미가 있었습니다. 서로의 의견을 경청하고, 아이디어를 공유하며, 함께 성장해나가는 과정 자체가 값진 경험이었습니다.',
					'이번 프로젝트를 통해 협업의 가치를 깨달을 수 있었고, 이는 앞으로의 개발자 생활에 있어 큰 자산이 될 것 같습니다.',
				],
			},
			{
				title: 'React Native 경험',
				details: [
					'이번 프로젝트를 통해 React Native를 본격적으로 사용해볼 수 있었습니다. React Native는 웹 개발에서 사용하는 React와 유사한 개념과 문법을 가지고 있어, 웹 개발 경험이 있다면 비교적 쉽게 적응할 수 있었습니다. 특히, 컴포넌트 기반 개발 방식을 통해 재사용 가능한 UI 요소를 만들 수 있어 개발 효율성이 높았습니다.',
					'하지만 React Native로 개발하면서 네이티브 앱과의 성능 차이, 디버깅의 어려움, 일부 라이브러리의 호환성 이슈 등 한계점도 느낄 수 있었습니다. 이러한 경험을 통해 React Native의 장단점을 파악하고, 상황에 맞는 기술 선택의 중요성을 깨달을 수 있었습니다.',
				],
			},
			{
				title: 'CRUD 경험',
				details: [
					'이번 프로젝트에서는 Firebase를 활용하여 데이터베이스를 구축하고, 이를 기반으로 게시판 CRUD(Create, Read, Update, Delete) 기능을 단독으로 전부 구현하였습니다. 특히 게시판 기능 개발을 통해 CRUD 동작 원리를 깊이 있게 이해할 수 있었습니다.',
					'게시글과 댓글의 작성(Create), 조회(Read), 수정(Update), 삭제(Delete) 기능을 직접 구현하면서 데이터의 흐름과 상태 관리의 중요성을 체감할 수 있었습니다. 또한 실시간 데이터베이스인 Firebase의 특성을 활용하여 실시간 댓글, 좋아요, 다중 이미지 등의 기능을 구현할 수 있었습니다.',
					'이 과정에서 데이터 모델링의 중요성도 깨달을 수 있었습니다. 효율적이고 확장 가능한 데이터 구조를 설계하는 것이 CRUD 작업을 원활하게 만드는 핵심이었습니다. 때문에 프로젝트 초기에 ERD를 설계하고 데이터 관계를 명확히 정의한 것이 큰 도움이 되었습니다.',
					'이번 프로젝트를 통해 CRUD에 대한 이해도를 높일 수 있었고, 이는 추후 다양한 프로젝트에서 활용할 수 있는 소중한 경험이 될 것입니다.',
				],
			},
			{
				title: '문제 해결 경험',
				details: [
					'개발 과정에서 다양한 문제들이 발생하였지만, 그 중에서도 이미지 캐싱 이슈가 기억에 남습니다.',
					'이미지 캐싱 이슈의 경우, 초기에는 리액트 네이티브의 기본 이미지 컴포넌트를 사용하였습니다. 하지만 이로 인해 과도한 트래픽이 발생하고 이미지 로딩 속도가 느려지는 문제가 있었습니다. 이를 해결하기 위해 fast-image 라이브러리를 적용하려 했으나, 해당 라이브러리가 더 이상 업데이트되지 않는 이슈가 있었습니다. 결국 대안으로 faster-image 라이브러리를 찾아 적용하였고, 이를 통해 이미지 캐싱 문제를 해결할 수 있었습니다.',
					'이번 문제 해결 경험을 통해 배운 점은 다음과 같습니다. 첫째, 문제에 직면했을 때 포기하지 않고 대안을 찾는 끈기와 노력이 중요하다는 것입니다. 둘째, 상황에 맞는 적절한 판단과 유연한 대처가 필요하다는 것입니다. 셋째, 문제 해결 ‘과정’ 자체가 개발자로서의 성장에 큰 도움이 된다는 것입니다.',
				],
			},
		],
		projectData: {
			images: [
				'/images/sharebby/image1.png',
				'/images/sharebby/image2.png',
				'/images/sharebby/image3.png',
				'/images/sharebby/image4.png',
				'/images/sharebby/image5.png',
				'/images/sharebby/image6.png',
				'/images/sharebby/image7.png',
				'/images/sharebby/image8.png',
				'/images/sharebby/image9.png',
				'/images/sharebby/image10.png',
				'/images/sharebby/image11.png',
				'/images/sharebby/image12.png',
				'/images/sharebby/image13.png',
				'/images/sharebby/image14.png',
				'/images/sharebby/image15.png',
			],
			subLinks: [
				{
					type: 'video',
					url: 'https://www.youtube.com/watch?v=Zu1Git1zAAA',
					visible: true,
				},
				{
					type: 'ppt',
					url: 'https://docs.google.com/presentation/d/1hR-E-cjFvhndmy6gv51GfsNkY8rYXIf-/edit?usp=sharing&ouid=106667079864051075882&rtpof=true&sd=true',
					visible: true,
				},
				{ type: 'doc', url: '/', visible: false },
				{ type: 'other', url: '/', visible: false },
			],
		},
	},
	{
		id: 'posture-teacher',
		title: '자세선생',
		subtitle: 'Posture Teacher',
		duration: '2022.07 ~ 2023.05',
		links: [
			{
				type: 'github',
				url: 'https://github.com/jukrap/Posture-Teacher',
				visible: true,
			},
			{
				type: 'appleStore',
				url: '/',
				visible: false,
			},
			{
				type: 'googleStore',
				url: 'https://play.google.com/store/apps/details?id=com.gnupr.postureteacher',
				visible: true,
			},
			{ type: 'url', url: '/', visible: false },
		],
		overview:
			'사람의 앉은 자세 혹은 플랭크 자세를 감지한 다음, 신체 각 지점의 각도와 길이에 따라 올바른 자세 여부를 판별하고 데이터를 제공해주는 앱.',
		techStack: ['Java', 'Android', 'Jetpack', 'Mediapipe', 'SQLite'],
		role: ['팀장', '프론트엔드', '백엔드'],
		teamSize: 2,
		functions: [
			{
				title: '기능 추가 중...',
				details: ['기능 추가 중...'],
			},
		],
		tasks: [
			{
				title: '업무 추가 중...',
				details: ['업무 추가 중...'],
			},
		],
		impression: [
			{
				title: '소감 추가 중...',
				details: ['소감 추가 중...'],
			},
		],
		projectData: {
			images: [
				'/images/posture-teacher/image1.png',
				'/images/posture-teacher/image2.png',
				'/images/posture-teacher/image3.png',
				'/images/posture-teacher/image4.png',
				'/images/posture-teacher/image5.png',
				'/images/posture-teacher/image6.png',
			],
			subLinks: [
				{
					type: 'video',
					url: 'https://drive.google.com/file/d/1M0pyZJ8Snw7IRQMqw27wNmivT0eXNpt3/view?usp=sharing',
					visible: true,
				},
				{
					type: 'ppt',
					url: 'https://docs.google.com/presentation/d/1vncCXVw9mJxXfJ1YFctssHMkv47-yOG7/edit?usp=sharing&ouid=106667079864051075882&rtpof=true&sd=true',
					visible: true,
				},
				{
					type: 'doc',
					url: 'https://drive.google.com/file/d/1_e_FweSufS3RjxWfrffWqWe5y9QB4G0H/view?usp=sharing',
					visible: true,
				},
				{ type: 'other', url: '/', visible: false },
			],
		},
	},
	{
		id: 'chatterbox',
		title: '수다쟁이',
		subtitle: 'Chatterbox',
		duration: '2022.11 ~ 2022.12',
		links: [
			{
				type: 'github',
				url: 'https://github.com/jukrap/Chatterbox',
				visible: true,
			},
			{
				type: 'appleStore',
				url: '/',
				visible: false,
			},
			{
				type: 'googleStore',
				url: '/',
				visible: false,
			},
			{ type: 'url', url: '/', visible: false },
		],
		overview:
			'독서용 한글 텍스트를 지급하고, 아이가 이를 읽는 목소리를 감지하고 정상적으로 읽었는지를 판별하고 알려주는 앱.',
		techStack: [
			'Java',
			'Android',
			'Jetpack',
			'Material',
			'SQLite',
			'Google Cloud Platform',
		],
		role: ['1인 개발'],
		teamSize: 1,
		functions: [
			{
				title: '기능 추가 중...',
				details: ['기능 추가 중...'],
			},
		],
		tasks: [
			{
				title: '업무 추가 중...',
				details: ['업무 추가 중...'],
			},
		],
		impression: [
			{
				title: '소감 추가 중...',
				details: ['소감 추가 중...'],
			},
		],
		projectData: {
			images: [
				'/images/chatterbox/image1.png',
				'/images/chatterbox/image2.png',
				'/images/chatterbox/image3.png',
				'/images/chatterbox/image4.png',
			],
			subLinks: [
				{
					type: 'video',
					url: '/',
					visible: false,
				},
				{
					type: 'ppt',
					url: 'https://docs.google.com/presentation/d/1tLhsRKnvnydvJPMtORbH4LPR-h0AEHma/edit?usp=sharing&ouid=106667079864051075882&rtpof=true&sd=true',
					visible: true,
				},
				{
					type: 'doc',
					url: 'https://drive.google.com/file/d/1BFTovilxnUoIjwwXS8TDonvNRSGtTnJm/view?usp=sharing',
					visible: true,
				},
				{ type: 'other', url: '/', visible: false },
			],
		},
	},
	{
		id: 'mytime',
		title: '마이타임',
		subtitle: 'MyTime',
		duration: '2022.02 ~ 2022.06',
		links: [
			{
				type: 'github',
				url: 'https://github.com/yewon5858/Croffle-Project',
				visible: true,
			},
			{
				type: 'appleStore',
				url: '/',
				visible: false,
			},
			{
				type: 'googleStore',
				url: '/',
				visible: false,
			},
			{ type: 'url', url: '/', visible: false },
		],
		overview:
			'사람의 안면 움직임을 감지하여 집중력 유지 여부를 판별하고, 여기에 따라 집중력 향상을 위한 안내 및 통계를 제공하는 안드로이드 기반의 타이머 앱.',
		techStack: ['Java', 'Android', 'Jetpack', 'Mediapipe', 'SQLite'],
		role: ['팀장', '프론트엔드', '백엔드'],
		teamSize: 3,
		functions: [
			{
				title: '기능 추가 중...',
				details: ['기능 추가 중...'],
			},
		],
		tasks: [
			{
				title: '업무 추가 중...',
				details: ['업무 추가 중...'],
			},
		],
		impression: [
			{
				title: '소감 추가 중...',
				details: ['소감 추가 중...'],
			},
		],
		projectData: {
			images: [
				'/images/mytime/image1.png',
				'/images/mytime/image2.png',
				'/images/mytime/image3.png',
				'/images/mytime/image4.png',
				'/images/mytime/image5.png',
				'/images/mytime/image6.png',
			],
			subLinks: [
				{
					type: 'video',
					url: '/',
					visible: false,
				},
				{
					type: 'ppt',
					url: 'https://docs.google.com/presentation/d/1Haj2cr8d3ndEf8QGRnZpysfI8OgpFn0f/edit?usp=sharing&ouid=106667079864051075882&rtpof=true&sd=true',
					visible: true,
				},
				{
					type: 'doc',
					url: 'https://drive.google.com/file/d/1_vAOef2ahsxdgg7nUsABWzQahMgHjQKe/view?usp=sharing',
					visible: true,
				},
				{ type: 'other', url: '/', visible: false },
			],
		},
	},
	{
		id: 'esd-hotdeal',
		title: 'ESD 핫딜',
		subtitle: 'ESD HotDeal',
		duration: '2021.07 ~ 2021.10',
		links: [
			{
				type: 'github',
				url: 'https://github.com/jukrap/RollCakeProject',
				visible: true,
			},
			{
				type: 'appleStore',
				url: '/',
				visible: false,
			},
			{
				type: 'googleStore',
				url: '/',
				visible: false,
			},
			{ type: 'url', url: '/', visible: false },
		],
		overview:
			'여러 ESD에서 제공하는 할인, 무료 소프트웨어 목록을 정리해서 알려주는 웹서비스.',
		techStack: [
			'HTML & CSS',
			'JavaScript',
			'React',
			'Firebase',
			'Node.js',
			'Express',
		],
		role: ['팀장', '프론트엔드', '백엔드'],
		teamSize: 2,
		functions: [
			{
				title: '기능 추가 중...',
				details: ['기능 추가 중...'],
			},
		],
		tasks: [
			{
				title: '업무 추가 중...',
				details: ['업무 추가 중...'],
			},
		],
		impression: [
			{
				title: '소감 추가 중...',
				details: ['소감 추가 중...'],
			},
		],
		projectData: {
			images: [
				'/images/esd-hotdeal/image1.png',
				'/images/esd-hotdeal/image2.png',
				'/images/esd-hotdeal/image3.png',
				'/images/esd-hotdeal/image4.png',
			],
			subLinks: [
				{
					type: 'video',
					url: 'https://drive.google.com/file/d/1WjPRqsJGs_sSo3xaNEbiaxdb0gb3m_1v/view?usp=sharing',
					visible: true,
				},
				{
					type: 'ppt',
					url: 'https://docs.google.com/presentation/d/1y2-nzHxk3UYwxlNv0yVu6miRpDEnzWXX/edit?usp=sharing&ouid=106667079864051075882&rtpof=true&sd=true',
					visible: true,
				},
				{
					type: 'doc',
					url: 'https://docs.google.com/document/d/11a1hUlnwAQjH2MC0RfKzKhdPp8IlytFq/edit?usp=drive_link&ouid=106667079864051075882&rtpof=true&sd=true',
					visible: true,
				},
				{ type: 'other', url: '/', visible: false },
			],
		},
	},
	// 여기에 계속 추가
];
