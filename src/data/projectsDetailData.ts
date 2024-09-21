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
		tasks: [
			{
				title: '가능한 한 최신 프레임워크를 사용',
				details: ['React 18, Next.js 14 사용.'],
			},
			{
				title: '주요 특징',
				details: [
					'훅을 이용하여 타이핑 되는 효과를 타이틀 및 내용에 주었습니다.',
					'Zustand와 Tailwind를 이용해 화이트 & 다크 모드 전환 기능을 구현했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'TypeScript 타입 에러 해결',
				details: [
					'복잡한 중첩 객체 구조에서 발생한 타입 에러를 해결하기 위해 인터페이스를 재구성하고 유틸리티 타입을 활용했습니다.',
					'이를 통해 코드의 안정성과 가독성을 크게 향상시켰습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '이미지 최적화',
				details: [
					'Next.js의 Image 컴포넌트를 사용하여 이미지 로딩 성능을 개선했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '커스텀 훅을 이용한 타이핑 효과',
				details: [
					'useTypingEffect 훅을 개발하여 타이틀과 내용에 타이핑 되는 효과를 구현했습니다.',
					'이 훅은 재사용 가능하며, 타이핑 속도와 지연 시간을 조절할 수 있습니다.',
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
		tasks: [
			{
				title: '안드로이드 작업',
				details: [
					'IOS 기준으로 개발된 앱을 안드로이드에 맞도록 수정하고 개선하였습니다.',
				],
			},
			{
				title: '데이터베이스 관련',
				details: [
					'ERD를 제작하여 데이터 관계를 규정하고, Firebase에서의 구조를 설계하였습니다.',
				],
			},
			{
				title: '게시판 전체 구현',
				details: [
					'사용자들이 편리하게 게시글과 댓글을 작성, 읽기, 수정, 삭제할 수 있도록 구현하였습니다.',
					'위치 기반 게시글 필터링, 다양한 정렬 옵션을 구현하였습니다.',
				],
			},
			{
				title: '모달 및 토스트 제작',
				details: ['각종 모달 및 토스트 메시지를 제작하였습니다.'],
			},
		],
		troubleshooting: [
			{
				title: '이미지 캐싱 이슈 해결',
				details: [
					'초기에 리액트 네이티브의 기본 이미지 컴포넌트 사용으로 인한 과도한 트래픽 및 느린 로딩 속도 문제를 확인하였습니다.',
					'fast-image 라이브러리 적용을 시도했으나, 업데이트 중단 이슈로 인해 faster-image 라이브러리를 대안으로 적용하였습니다.',
					'이를 통해 이미지 캐싱 문제를 해결하고 앱의 성능을 크게 개선하였습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '이미지 최적화',
				details: [
					'모바일 환경에 최적화된 UI를 고려하여 이미지 관련 작업을 수행하였습니다.',
					'이미지 크기 조정 및 캐싱 등의 최적화를 통해 성능을 개선하였습니다.',
					'이러한 최적화로 서버 트래픽이 기존 대비 30~50% 가량 감소하는 효과를 얻었습니다.',
				],
			},
			{
				title: '게시판 및 댓글 성능 개선',
				details: [
					'Pull to Refresh와 Infinite Scroll 구현으로 대량의 데이터를 효율적으로 로드할 수 있게 되었습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Firebase를 활용한 실시간 기능 구현',
				details: [
					'Firebase의 실시간 데이터베이스를 활용하여 실시간 댓글, 좋아요, 다중 이미지 등의 기능을 구현하였습니다.',
					'이를 통해 사용자들에게 더욱 동적이고 상호작용이 풍부한 경험을 제공할 수 있었습니다.',
				],
			},
			{
				title: '위치 기반 게시글 필터링',
				details: [
					'사용자 위치를 기반으로 가까운 위치의 게시글만 표시하는 기능을 구현했습니다.',
					'위치 데이터를 효율적으로 처리하여 사용자 경험을 향상시켰습니다.',
				],
			},
			{
				title: '협업 도구 활용',
				details: [
					'스크럼 방법론을 통해 주기적인 소통과 개발 작업의 조율, 일정 관리를 진행하였습니다.',
					'Notion, Slack, Github, Figma 등의 협업 툴을 적극적으로 활용하여 팀 작업의 효율성을 높였습니다.',
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
		role: ['팀장', '안드로이드 개발'],
		teamSize: 2,
		tasks: [
			{
				title: '타이머 기능 구현',
				details: [
					'자세 유지 시간과 어긋난 시간을 기록하기 위한 타이머 기능을 구현했습니다.',
					'각 자세에 맞는 개별적인 타이머 시스템을 설계하고 구현했습니다.',
				],
			},
			{
				title: 'Mediapipe 통합 및 최적화',
				details: [
					'Mediapipe AAR를 리눅스 환경에서 빌드하고 프로젝트에 통합했습니다.',
					'Mediapipe를 사용하여 몸과 얼굴의 동작을 측정하는 솔루션을 개발했습니다.',
					'OpenCV 대비 5~10배 높은 FPS를 확보하여 성능을 크게 개선했습니다.',
				],
			},
			{
				title: '신체 측정 기능 구현',
				details: [
					'앉은 자세와 플랭크 자세의 올바름을 측정하는 기능을 구현했습니다.',
					'각 자세에 대한 측정 페이지를 설계하고 개발했습니다.',
				],
			},
			{
				title: '데이터베이스 구축',
				details: [
					'SQLite 기반의 Room Library를 사용하여 효율적인 데이터베이스 구조를 설계하고 구축하였습니다.',
					'Dao, Entity, Database를 설계하여 CRUD 작업을 최적화하였습니다.',
					'사용자의 측정 데이터를 효과적으로 저장하고 관리하는 시스템을 구현하였습니다.',
				],
			},
		],

		troubleshooting: [
			{
				title: '멀티 스레드 최적화',
				details: [
					'Mediapipe의 부하를 감소시키기 위해 Runnable 인터페이스와 스레드 클래스를 활용한 멀티 스레드 최적화를 수행했습니다.',
					'이를 통해 구형 휴대폰에서의 앱 사용성을 개선하고 UI 반응성 문제를 해결했습니다.',
				],
			},
			{
				title: '빌드 환경 문제 해결',
				details: [
					'구형 CPU&GPU 관련 문제로 인해 Docker와 MSYS2 사용이 중단되었습니다.',
					'최종적으로 Ubuntu 환경에서 Mediapipe 빌드 작업을 성공적으로 수행했습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'FPS 개선',
				details: [
					'Mediapipe 사용으로 OpenCV 대비 5~10배 높은 FPS를 달성했습니다.',
					'이를 통해 실시간 자세 측정의 정확도와 반응성을 크게 향상시켰습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '체격 차이 고려 알고리즘',
				details: [
					'사용자 간 체격 차이를 고려한 자세 측정 알고리즘을 개발했습니다.',
					'이를 통해 다양한 체형의 사용자에게 정확한 자세 피드백을 제공할 수 있었습니다.',
				],
			},
			{
				title: '프로젝트 성과',
				details: [
					'경남소프트웨어경진대회에서 예선 통과 후 본선까지 진출하였습니다.',
					'이후 구글 플레이스토어에 배포를 진행했습니다.',
				],
			},
			{
				title: '애자일 스크럼 방식 프로젝트 진행',
				details: [
					'주 1-2회 정기적인 미팅을 통해 개발 진행 상황을 공유하고 다음 목표를 설정했습니다.',
					'이러한 프로젝트 진행 방식 덕분에, 빠른 피드백과 일정한 팀 분위기를 유지할 수 있었습니다.',
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
		tasks: [
			{
				title: '서적 선택 및 읽기 기능 구현',
				details: [
					'서적 등의 텍스트 요소들을 선택할 수 있는 기능을 구현하였습니다.',
					'STT 기능을 이용하여 목소리를 인식 후 앱에서 제공해주는 책 구절을 정상적으로 읽는지를 판별하는 기능을 개발하였습니다.',
					'책 한 권이 끝날 때까지 독서를 지속하며, 독서 완료에 걸린 시간을 측정하여 제공하였습니다.',
				],
			},
			{
				title: '데이터베이스 구축',
				details: [
					'SQLite 기반의 Room Library를 사용하여 효율적인 데이터베이스 구조를 설계하고 구축하였습니다.',
					'Dao, Entity, Database를 설계하여 CRUD 작업을 최적화하였습니다.',
					'읽은 책과 관련된 통계 데이터를 저장하고 조회할 수 있는 기능을 구현하였습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '안드로이드 버전 관리 및 레거시 요소 적용',
				details: [
					'Google Cloud Platform을 안드로이드 환경에 적용하는 과정에서 안드로이드 버전 관리 방법을 익혔습니다.',
					'빌드 파일을 조작하여 레거시 요소를 강제로 적용하는 방법을 학습하고 적용하였습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '네트워크 상태에 따른 Speech-to-Text(STT) 적용',
				details: [
					'안드로이드에 내장된 STT 기능을 오프라인 상태일 때 사용하도록 구현하였습니다.',
					'Google Cloud Platform의 STT 기능을 온라인 상태일 때 사용하도록 설정하였습니다.',
					'이를 통해 오프라인 상황에서도 앱의 핵심 기능이 작동할 수 있도록 하였습니다.',
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
		tasks: [
			{
				title: '집중력 감지 기능 구현',
				details: [
					'Mediapipe를 활용하여 사용자의 눈동자와 얼굴 움직임을 감지하는 시스템을 개발하였습니다.',
					'감지된 데이터를 분석하여 사용자의 집중 여부를 판별하는 알고리즘을 구현하였습니다.',
					'집중력 감지 강도를 조절할 수 있는 설정 기능을 추가하여 사용자 맞춤형 경험을 제공하였습니다.',
					'집중력 상태에 따라 적절한 경고 및 안내 메시지를 제공하는 시스템을 구현하였습니다.',
				],
			},
			{
				title: 'Mediapipe 통합 및 최적화',
				details: [
					'Linux 환경에서 Mediapipe AAR를 직접 빌드하여 프로젝트에 통합하였습니다.',
					'이를 통해 앱 성능을 크게 향상시켜 실시간 안면 인식의 효율성을 높였습니다.',
				],
			},
			{
				title: '데이터베이스 설계 및 구현',
				details: [
					'SQLite 기반의 Room Library를 사용하여 효율적인 데이터베이스 구조를 설계하고 구축하였습니다.',
					'Dao, Entity, Database를 설계하여 CRUD 작업을 최적화하였습니다.',
					'사용자의 집중 시간 데이터를 효과적으로 저장하고 관리하는 시스템을 구현하였습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'OpenCV에서 Mediapipe로의 전환',
				details: [
					'초기에 사용한 OpenCV와 NDK 조합이 심각한 성능 저하를 야기하는 문제에 직면하였습니다.',
					'이를 해결하기 위해 Mediapipe로 전환을 결정하였고, 이를 통해 초당 프레임 수를 크게 개선하였습니다.',
					'Mediapipe 사용으로 더 정확한 랜드마크 값을 얻을 수 있게 되어 전반적인 시스템 성능이 향상되었습니다.',
					'초당 프레임 수를 10fps 이하에서 30fps 이상으로 향상시켰습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '멀티 스레딩 최적화',
				details: [
					'Mediapipe 사용 시 발생하는 UI 스레드 블로킹 문제를 식별하였습니다.',
					'Runnable 인터페이스와 스레드 클래스를 활용한 멀티 스레딩 구현으로 문제를 해결하였습니다.',
					'이를 통해 UI 반응성을 유지하면서도 실시간 얼굴 인식 처리가 가능해졌습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '사용자 맞춤형 집중력 감지 시스템',
				details: [
					'사용자의 얼굴 움직임을 기반으로하는 집중력 감지 모델을 개발하였습니다.',
					'집중력 감지 강도를 사용자가 직접 조절할 수 있게 하여 다양한 학습 환경에 대응할 수 있도록 하였습니다.',
				],
			},
			{
				title: '애자일 방법론 기반의 팀 협업 및 프로젝트 관리',
				details: [
					'깃허브를 활용하여 팀 프로젝트를 효율적으로 관리하였습니다.',
					'팀원들과 지속적인 소통을 통해 프로젝트의 목표를 명확히 하고, 각자의 역할이 올바른 방향으로 진행되는지 주기적으로 점검하였습니다.',
					'이러한 과정에는 애자일 방법론이 다소 적용되었습니다.',
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
		tasks: [
			{
				title: '프론트엔드 개발',
				details: [
					'React를 기반으로 한 동적 웹 애플리케이션을 구현하였습니다.',
					'styled-components를 활용하여 재사용 가능한 UI 컴포넌트를 제작하였습니다.',
					'react-router-dom을 사용하여 효율적인 라우팅 시스템을 구축하였습니다.',
					'react-bootstrap을 활용하여 반응형 디자인을 구현하였습니다.',
					'메인 페이지, 핫딜 페이지, 검색 페이지 등 주요 페이지들의 레이아웃과 기능을 구현하였습니다.',
				],
			},
			{
				title: '백엔드 개발',
				details: [
					'Express를 사용하여 서버를 구축하고 RESTful API를 설계 및 구현하였습니다.',
					'Puppeteer 라이브러리를 활용하여 효율적인 웹 크롤링 시스템을 개발하였습니다.',
					'수만 건의 핫딜 데이터를 3~5분 내에 크롤링 및 가공하는 고성능 시스템을 구현하였습니다.',
					'Firebase를 활용하여 문서 기반의 NoSQL 데이터베이스를 설계하고 구축하였습니다.',
				],
			},
			{
				title: '재사용 가능한 컴포넌트 개발',
				details: [
					'여러 페이지에서 공통적으로 사용되는 상품 정보 컴포넌트를 제작하였습니다.',
					'각 ESD 사이트로 연결되는 하이퍼링크 기능을 포함한 컴포넌트를 구현하였습니다.',
					'이를 통해 개발 효율성을 높이고 일관된 UI/UX를 제공할 수 있었습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '정적 웹 호스팅 문제 해결',
				details: [
					'초기에 Github Pages를 통한 정적 웹 호스팅을 시도하였으나, React SPA의 동적 특성으로 인해 문제가 발생하였습니다.',
					'이 과정에서 정적 웹과 동적 웹의 차이점을 명확히 이해하게 되었습니다.',
					'최종적으로 동적 웹 호스팅 서비스를 활용하여 문제를 해결하였습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '크롤링 및 데이터 처리 최적화',
				details: [
					'Puppeteer를 활용한 효율적인 크롤링 시스템으로 단시간 내 대량의 데이터 수집을 실현하였습니다.',
					'Firebase의 문서 기반 데이터베이스를 활용하여 대량 데이터의 빠른 입출력을 구현하였습니다.',
				],
			},
			{
				title: '효율적인 협업 시스템 구축',
				details: [
					'주간 스프린트를 설정하여 단기 목표를 명확히 하고, 빠른 피드백 사이클을 통해 변화에 신속하게 대응하였습니다.',
					'스탠드업(Stand-Up) 미팅을 통해 팀원 간 진행 상황을 공유하고 장애 요소를 조기에 식별하여 해결하였습니다.',
					'2인 팀으로 축소된 상황에서도 체계적인 일정 관리와 효율적인 작업 분배를 통해 프로젝트를 성공적으로 완수하였습니다.',
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
