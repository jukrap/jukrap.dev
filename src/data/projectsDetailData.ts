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
			background: {
				gradientStart: '#1AC195',
			},
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
		role: ['발표', '디자인', '프론트엔드 및 백엔드 개발'],
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
					'Pull to Refresh와 Infinite Scroll을 개발하여 편의성 및 성능을 개선했습니다.',
          '이미지 관련 작업으로 모바일 환경에 최적화된 UI를 고민했습니다.',
					'이미지에 대한 크기 조정 및 캐싱 등의 최적화로 성능 개선을 하였습니다.',
					'이미지 최적화로 서버 트래픽이 기존 대비 30~50% 가량 감소했습니다.',
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
					'5명이나 되는 다인원 프로젝트였으나, 적극적인 커뮤니케이션으로 서로의 간격을 줄여나갈 수 있었습니다.',
					'협업은 단순히 업무를 분담하는 것 이상의 의미가 있었습니다. 서로의 의견을 경청하고, 아이디어를 공유하며, 함께 성장해나가는 과정 자체가 값진 경험이었습니다.',
					'스크럼 방법론을 통해 주기적인 소통과 개발 작업의 조율 그리고 일정 관리를 진행했습니다.',
					'Notion, Slack, Github, Figma 등의 협업 툴을 적극적으로 활용했습니다.',
					'팀원의 이슈를 무시하는 것은 미래의 나에게 이슈를 던져놓는 것과 같다는 걸 학습했습니다.',
					'이번 프로젝트를 통해 협업의 가치를 깨달을 수 있었고, 이는 앞으로의 개발자 생활에 있어 큰 자산이 될 것 같습니다.',
				],
			},
			{
				title: 'React Native 경험',
				details: [
					'이번 프로젝트를 통해 React Native를 본격적으로 사용해볼 수 있었습니다. React Native는 웹 개발에서 사용하는 React와 유사한 개념과 문법을 가지고 있어, 웹 개발 경험이 있다면 비교적 쉽게 적응할 수 있었습니다. 특히, 컴포넌트 기반 개발 방식을 통해 재사용 가능한 UI 요소를 만들 수 있어 개발 효율성이 높았습니다.',
					'하지만 React Native로 개발하면서 네이티브 앱과의 구조적 차이, 디버깅의 어려움, 일부 라이브러리의 호환성 이슈 등 한계점도 느낄 수 있었습니다. 이러한 경험을 통해 React Native의 장단점을 파악하고, 상황에 맞는 기술 선택의 중요성을 깨달을 수 있었습니다.',
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
				'/images/sharebby/image0.png',
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
			background: {
				image: '/images/sharebby/image0.png',
			},
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
		role: ['팀장', '안드로이드 개발자'],
		teamSize: 2,
		functions: [
			{
				title: '타이머 기능',
				details: ['측정과 관련된 제한시간 타이머를 설정할 수 있습니다.'],
			},
			{
				title: '앉은 자세 페이지',
				details: ['앉은 자세가 올바른지에 대한 측정을 할 수 있습니다.'],
			},
			{
				title: '플랭크 자세 페이지',
				details: ['플랭크 자세가 올바른지에 대한 측정을 할 수 있습니다.'],
			},
			{
				title: '통계 페이지',
				details: ['각 측정 페이지에서 저장된 데이터를 기반으로 통계를 제공합니다.'],
			},
		],
		tasks: [
			{
				title: '기획, 발표 등의 팀장 업무 (100% 담당)',
				details: ['프로젝트 기획과 발표 업무를 맡았습니다.'],
			},
			{
				title: '타이머 기능 구현 (100% 담당)',
				details: [
					'해당 자세가 얼마나 유지되었고, 얼마나 어긋났는지를 기록하기 위해 타이머 기능이 구현되었습니다.',
					'자세마다 서로 다른 타이머 시스템을 사용합니다.',
				],
			},
			{
				title: 'AAR(Android Archive) 빌드 (100% 담당)',
				details: [
					'Mediapipe AAR를 리눅스 환경에서 빌드하고 가져오는 작업을 수행했습니다.',
				],
			},
			{
				title: '신체 측정 기능 및 페이지 구현 (100% 담당)',
				details: [
					'Mediapipe는 컴퓨터 비전을 목적으로 개발된 머신러닝 파이프라인입니다.',
					'해당 파이프라인 사용으로 OpenCV 사용 대비 5~10배 정도 높은 초당 프레임(FPS)을 확보할 수 있었습니다.',
					'본 프로젝트에서는 Mediapipe가 몸과 얼굴의 동작을 측정하는 솔루션을 개발하는 것에 사용 되었습니다.',
				],
			},
			{
				title: '멀티 스레드 및 최적화 (100% 담당)',
				details: [
					'Mediapipe 부하 감소를 위해, Runnable 인터페이스를 이용하거나, 스레드 클래스를 이용해 멀티 스레드 최적화를 수행했습니다.',
					'이러한 작업으로 구형 휴대폰에서 앱이 사용 가능해지고, UI 먹통 현상이 해결됐습니다.',
				],
			},
			{
				title: 'Room Database 사용 (100% 담당)',
				details: [
					'SQLite를 기반으로 하는 라이브러리인 Room Library를 사용해서 Dao, Entity, Database를 설계하고 구축했습니다',
				],
			},
		],
		impression: [
			{
				title: '동료와의 협업',
				details: [
					'동료는 프론트엔드와 디자인 중심, 저는 백엔드와 기획 중심으로 분업을 진행했습니다. 이러한 과정에서 의견을 나누고, 각자 맡은 부분의 방향성에 대해서 계속해서 대화하였습니다.',
					'물론 사용자에게 편한 UI가 무엇인지, 이렇게 배치했을 때 어떤 문제가 발생하는지, 측정 시 체격 차이를 어떻게 해결할 것인지, 기능의 편의성 등에 대해서도 논하였습니다. 덕분에 서로의 코드를 이해 및 리뷰하고 원활한 개발을 하는데 큰 도움이 되었습니다.',
				],
			},
			{
				title: '적용되지 않은 학습 요소들',
				details: [
					'해당 프로젝트를 하기 위해선 우선 Mediapipe를 설치하고 빌드할 수 있는 환경을 만들 필요가 있었습니다. 컨테이너 기반의 가상화 플랫폼인 Docker와 윈도우 운영체제 하에서 빌드 목적으로 쓰이는 플랫폼인 MSYS2는 그러한 과정에서 이용되다가 사용이 중단되었습니다.',
					'이는 구형 CPU&GPU와 관련된 문제가 발생했기 때문입니다. 결국, 해당 빌드 작업은 순수하게 Ubuntu에서만 이루어졌습니다.',
				],
			},
			{
				title: '프로젝트 성과',
				details: [
					'경남소프트웨어경진대회에서 예선 통과 후 본선까지 진출하였습니다.',
          '이후 구글 플레이스토어에 배포를 진행했습니다.',
				],
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
				'/images/posture-teacher/image0.png',
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
			background: {
				image: '/images/posture-teacher/image0.png',
			},
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
				title: '서적 선택 기능',
				details: ['서적 등의 텍스트 요소들을 선택할 수 있습니다.'],
			},
			{
				title: '서적 읽기 기능',
				details: ['STT를 이용하여 텍스트 요소를 읽고 판별할 수 있습니다.'],
			},
			{
				title: '서적 통계 기능',
				details: ['읽고 도출된 통계를 볼 수 있습니다.'],
			},
		],
		tasks: [
			{
				title: '네트워크 여부에 따른 Speech-to-Text 적용 (100% 담당)',
				details: [
					'안드로이드에 내장된 STT(Speech-to-Text) 기능을 오프라인 상태일 때 사용하게 했습니다.',
					'Google Cloud Platform의 STT를 온라인 상태일 때 사용하게 했습니다.',
				],
			},
			{
				title: '독서 기능 구현 (100% 담당)',
				details: [
					'STT 기능을 이용하여 목소리를 인식 후 앱에서 제공해주는 책 구절을 정상적으로 읽는지를 판별합니다.',
					'이는 책 한 권이 끝날 때까지 계속되며, 독서 완료에 걸린 시간 또한 최종적으로 알려줍니다.',
				],
			},
			{
				title: 'Room Database 사용 (100% 담당)',
				details: [
					'SQLite를 기반으로 하는 라이브러리인 Room Library를 사용해서 Dao, Entity, Database를 설계하고 구축했습니다',
				],
			},
		],
		impression: [
			{
				title: 'Google Cloud Platform 파악',
				details: [
					'구글에서 제공하는 Cloud Platform에 대한 응용법과 이를 안드로이드 환경에 적용하는 방법을 익힐 수 있었습니다.',
					'또한, 이를 사용하는 과정에서 안드로이드 버전 관리를 익힐 수 있었습니다.',
					'그리고 레거시 요소를 빌드 파일을 조작하여 강제로 적용하는 법도 알 수 있었습니다.',
				],
			},
			{
				title: '프론트엔드의 중요성',
				details: [
					'촉박한 시간으로 인해 프론트엔드 설계 부분이 건너 뛰어진 채 백엔드부터 개발이 이뤄졌습니다. 하지만 이로 인해 UX/UI와 시스템 구조에서 많은 애로사항을 겪었습니다.',
					'특히 사용자 중심의 디자인을 제공하는 것에 실패했으며, 이는 백엔드 개발을 일찍이 마치고도 수 차례 시행착오를 겪는 원인이 되었습니다.',
					'이러한 경험을 통해 백엔드 이외에도 프론트엔드 또한 중요하다는 것을 깨닫게 되었고, 프론트엔드 설계를 소홀히 한 것을 반성하게 되었습니다.',
				],
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
			background: {
				gradientStart: '#C7B18C',
			},
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
		role: ['팀장', '안드로이드 개발'],
		teamSize: 3,
		functions: [
			{
				title: '홈 기능',
				details: [
					'각 기능 별 페이지로 이동할 수 있습니다.',
					'타이머 관련한 설정을 진행할 수 있습니다.',
					'집중력 감지 강도를 설정할 수 있습니다.',
				],
			},
			{
				title: '집중력 감지 기능',
				details: [
					'안면 움직임과 방향을 분석하여 집중도를 측정합니다.',
					'기능을 일시 중단하고, 시작할 수 있는 기능이 있습니다.',
					'타이머를 확인할 수 있습니다.',
					'집중력 상태에 따라 경고를 합니다.',
					'측정 종료 시 타이머를 안전하게 종료합니다.',
				],
			},
			{
				title: '통계 기능',
				details: [
					'측정 시간을 그래프로 표시합니다.',
					'각 기간 별로 그래프를 표시하며, 집중력 저하가 이뤄진 시간 비율 또한 표시합니다.',
				],
			},
		],
		tasks: [
			{
				title: '기획, 발표 등의 팀장 업무 (100% 담당)',
				details: ['프로젝트 기획과 발표 업무를 맡았습니다.'],
			},
			{
				title: '집중력 감지 기능 및 페이지 구현 (100% 담당)',
				details: [
					'사용자의 눈동자와 얼굴 움직임을 감지하여 현재 공부를 비롯한 행위에 집중하고 있는지. 아니면 다른 곳을 보거나 멍 때리고 있는 것인지 판별합니다.',
					'Mediapipe는 컴퓨터 비전을 목적으로 개발된 머신러닝 파이프라인입니다.',
					'본 프로젝트에서는 Mediapipe가 몸과 얼굴의 동작을 측정하는 솔루션을 개발하는 것에 사용 되었습니다.',
				],
			},
			{
				title: 'AAR(Android Archive) 빌드 (100% 담당)',
				details: [
					'Mediapipe AAR를 리눅스 환경에서 빌드하고 가져오는 작업을 수행했습니다.',
				],
			},
			{
				title: '신체 측정 기능 및 페이지 구현 (100% 담당)',
				details: [
					'Mediapipe는 컴퓨터 비전을 목적으로 개발된 머신러닝 파이프라인입니다.',
					'본 프로젝트에서는 Mediapipe가 몸과 얼굴의 동작을 측정하는 솔루션을 개발하는 것에 사용 되었습니다.',
				],
			},
			{
				title: '멀티 스레드 및 최적화 (100% 담당)',
				details: [
					'Mediapipe 부하 감소를 위해, Runnable 인터페이스를 이용하거나, 스레드 클래스를 이용해 멀티 스레드 최적화를 수행했습니다.',
				],
			},
			{
				title: 'Room Database 사용 (100% 담당)',
				details: [
					'SQLite를 기반으로 하는 라이브러리인 Room Library를 사용해서 Dao, Entity, Database를 설계하고 구축했습니다',
				],
			},
		],
		impression: [
			{
				title: '액티비티와 프래그먼트',
				details: [
					'액티비티(Activity)는 앱의 주요 화면을 관리하고 사용자 인터페이스를 구성하는 데 사용되며, 화면 간 전환을 담당합니다.',
					' 반면에 프래그먼트(Fragment)는 UI 구성 요소로, 액티비티 내에서 재사용 가능하며 독립적으로 관리되어 다양한 레이아웃 및 화면 구성을 지원합니다.',
					'이러한 지식을 얻으면서 앱을 더 효과적으로 구성할 수 있게 되었습니다.',
				],
			},
			{
				title: '팀원과 함께 성장하는 팀장',
				details: [
					'깃허브 기능을 적극적으로 사용함으로서 팀 프로젝트를 효율적으로 구성해나갔습니다. 또한, 프로젝트 개발 목표를 팀원들과 계속해서 논의해나가면서 해당 프로젝트로 추구하는 목표가 무엇인지를 명확하게 하였습니다.',
					'이는 해당 앱이 어째서 필요한지를 팀원들이 이해하는데 큰 도움이 되었습니다. 또한, 개발 과정을 전반적으로 점검함으로써 팀원들이 각자 맡은 역할을 올바른 방향으로 나아가는지 또한 주기적으로 파악했습니다.',
				],
			},
			{
				title: 'Room DB',
				details: [
					'안드로이드 제공하는 데이터베이스 라이브러리인 Room을 통해 데이터베이스를 구축했습니다.',
					'SQLite 기반의 Room을 통해 효율적이면서도 CRUD 수행에 적합한 데이터베이스를 구축할 수 있었습니다.',
					'이는 통계 작업에 적용되었는데, SQL 문법을 본격적으로 익히는 계기가 되었습니다.',
				],
			},
			{
				title: 'OpenCV 사용 중단',
				details: [
					'처음에는 컴퓨터 비전 라이브러리인 OpenCV를 사용하고자 했습니다. 안드로이드에서 NDK를 이용하면 OpenCV를 사용할 수 있어서인데, 문제는 이렇게 개발된 프로토타입은 너무나 느렸다는 점입니다.',
					'이는 별 다른 기능이 없음에도 많은 랙을 유발할 정도로 심각했습니다. 특히 명암을 이용해 눈동자를 구분하는 건 초당 10프레임 내외가 나올 정도였습니다.',
					'그렇기에 최적화가 훨씬 쉽고 보다 더 정확한 랜드마크 값을 리턴 받을 수 있는 Mediapipe를 택하게 되었습니다.',
				],
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
				'/images/mytime/image0.png',
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
			background: {
				image: '/images/mytime/image0.png',
			},
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
		role: ['팀장', '프론트엔드 및 백엔드 개발'],
		teamSize: 2,
		functions: [
			{
				title: '메인 페이지',
				details: [
					'사이트에 접속하면 맨 처음 뜨는 페이지입니다.',
					'상단 캐러셀, 중단 할인율/가격 순 핫딜 리스트, 하단 최신 순 핫딜 리스트를 레이아웃에 맞게 나열해서 보여줍니다.',
				],
			},
			{
				title: '핫딜 페이지',
				details: [
					'다양한 기준에 따라 핫딜 상품들을 정렬할 수 있습니다.',
					'연동한 모든 상품의 정보를 리스트의 형식으로 제공합니다.',
					'정렬 기준은 핫딜 정렬에서 선택한 기준에 따라 정렬된다.',
					'클릭 시 판매 페이지로 이동합니다.',
				],
			},
			{
				title: '검색 페이지',
				details: [
					'원하는 핫딜 상품을 검색한 바에 따라 보여줍니다.',
					'연동한 모든 상품의 정보를 리스트의 형식으로 제공합니다.',
					'클릭 시 판매 페이지로 이동합니다.',
				],
			},
		],
		tasks: [
			{
				title: '기획, 발표 등의 팀장 업무 (100% 담당)',
				details: ['프로젝트 기획과 발표 업무를 맡았습니다.'],
			},
			{
				title: '메인 페이지 작업 및 상세 페이지 작업 (80% 담당)',
				details: [
					'CSS-in-JS 라이브러리인 styled-components를 기반으로 각 페이지를 작성했습니다.',
					'이 과정에서 라우팅 라이브러리인 react-router-dom과 UI 프레임워크인 react-bootstrap 또한 사용하였습니다.',
				],
			},
			{
				title: '재사용 가능한 상품 정보 컴포넌트 제작 (100% 담당)',
				details: [
					'다른 페이지들에서 사용할 상품 정보 컴포넌트를 제작했습니다.',
          '협업에 용이해지고 재사용성이 증가했습니다.',
					'각 ESD 사이트들의 상품과 이어지는 하이퍼링크가 포함되어 있습니다.',
				],
			},
			{
				title: 'Express로 백엔드 작업 (100% 담당)',
				details: [
					'Express를 통하여 통신을 하며, 이 과정에서 Chromium 기반 크롤링 라이브러리인 Puppteer 라이브러리를 이용해 크롤링하고 가공된 데이터를 전송합니다.',
          '수만 건의 핫딜 데이터를 단기간인 3~5분 내로 크롤링 및 가공합니다.',
				],
			},
			{
				title: '데이터베이스 관련 (100% 담당)',
				details: [
					'Google Firebase를 이용해 문서 기반의 데이터베이스를 구축했습니다.',
					'이를 통해 수만 건의 핫딜 데이터를 입력받고, 빠르게 전송하는 작업을 수행할 수 있습니다.',
				],
			},
		],
		impression: [
			{
				title: '부족한 인원',
				details: [
					'본래 3명이었는데, 1명이 빠지면서 2명이서 협업을 진행하게 됐습니다.',
					'인원이 부족한 만큼, 한 번 밀리면 계속해서 밀리게 되기에 개발 일정을 최대한 준수하고자 했습니다.',
					'주기적인 스크럼, 상시 협업, 긴 커뮤니케이션을 하며 크런치에 빠지는 것을 최대한 방지했습니다.',
				],
			},
			{
				title: 'React 경험',
				details: [
					'styled-components를 통해 대부분의 주요 컴포넌트를 제작함으로써 UI를 제어하는 재사용 가능 코드가 무엇인지를 익힐 수 있었습니다. 이 덕분에 메인 페이지와 핫딜 페이지를 개발하는데 큰 도움이 되었습니다.',
					'또한, react-router-dom으로 사용자의 요청에 따라 해당 페이지의 컴포넌트를 로딩해주는 라우팅에 대한 개념을 익힐 수 있었습니다.',
				],
			},
			{
				title: '정적 웹과 동적 웹의 개념',
				details: [
					'해당 웹 서비스를 Github 자체 호스팅에 강제로 올리려다가, 최종적으로 실패함으로써 깨닫게 되었습니다. 본 웹 서비스에 사용한 React는 SPA라는 동적 웹 페이지 프레임워크입니다.',
					'동적 웹은 정적 웹과 다르게 여러 조건에 따라 동적인 형태로 만들어지는 웹 페이지입니다.',
				],
			},
			{
				title: '반응형 웹의 필요성',
				details: [
					'단순히 상대 단위로 동적으로 크기를 변화시키는 것보단, 특정 크기에 맞게 반응형으로 크기를 바꾸는 게 더 낫다는 것을 깨닫게 되었습니다.',
					'이는 시간적인 측면에서나 조정하는 측면에서나 훨씬 이득이며, 보기에도 이쪽이 몇 배 더 나았습니다.',
				],
			},
			{
				title: '경남소프트웨어경진대회 최우수상 수상',
				details: [
					'본선 진출 후 최종적으로 경남소프트웨어경진대회에서 최우수상을 수상하였습니다.',
				],
			},
		],
		projectData: {
			images: [
				'/images/esd-hotdeal/image1.png',
				'/images/esd-hotdeal/image2.png',
				'/images/esd-hotdeal/image3.png',
				'/images/esd-hotdeal/image4.png',
				'/images/esd-hotdeal/image0.png',
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
			background: {
				image: '/images/esd-hotdeal/image0.png',
			},
		},
	},
	// 여기에 계속 추가
];
