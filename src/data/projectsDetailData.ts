import { ProjectDetailType } from '../app/about/types';

export const projectsDetailData: ProjectDetailType[] = [
	{
		id: 'captain-donghae',
		title: '동해선장',
		subtitle: 'Captain Donghae',
		platform: ['Web'],
		duration: '2024.10.04 ~ 2024.10.06',
		links: [
			{
				type: 'github',
				url: 'https://github.com/Busan-Trail/busan_trail_front',
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
			'동해선 기차 이용객을 위한 실시간 정보, 대중교통 경로, 러닝/자전거 추천 코스, 주변 맛집 정보 등을 제공하는 종합 가이드 웹 서비스.',
		techStack: [
			'TypeScript',
			'React',
			'Next.js',
			'Tailwind CSS',
			'Google Maps',
			'Storybook',
			'AWS',
			'Github Actions',
			'Docker',
		],
		role: ['Frontend'],
		teamSize: 3,
		tasks: [
			{
				title: '구글 맵스 플랫폼 기반 동해선 서비스 구현',
				details: [
					'다양한 지도 API 중 대중교통 경로 안내, 마커 커스터마이징 등을 비교 분석하여 구글 맵스 플랫폼을 선정하였습니다.',
					'Maps JavaScript API를 활용한 동적 지도, Places API 기반 장소 검색, Directions API 활용 대중교통 경로 안내, Geocoding API 기반 주소 변환 기능을 구현하였습니다.',
					'Static Maps API를 활용하여 특정 위치의 정적 지도 이미지를 제공하고, Geolocation API 연동으로 실시간 위치 추적 기능을 구현하였습니다.',
				],
			},
			{
				title: '외부 API 통합 및 데이터 서비스 구축',
				details: [
					'axios를 활용한 API 모듈화와 Next.js API Routes를 통해 구글 맵스 API, 날씨, 지하철역 정보(실시간 혼잡도 포함), 러닝/자전거 코스, 맛집 정보 등 다양한 외부 API를 통합 구현하였습니다.',
					'각 API 요청에 대한 파라미터 처리(위도/경도, 페이지네이션, 카테고리 필터링 등)와 에러 상황 대응을 통해 안정적인 데이터 서비스를 제공하였습니다.',
				],
			},
			{
				title: '컴포넌트 아키텍처 설계 및 UI 개발',
				details: [
					'합성(Composition) 패턴을 적용하여 기본 기능을 가진 공통 컴포넌트와 이를 확장한 구체적인 컴포넌트를 설계하였습니다.',
					'Storybook을 활용한 컴포넌트 주도 개발(CDD)로 각 컴포넌트의 기능과 디자인을 체계적으로 개발하였습니다.',
					'계층형 폴더 구조와 명확한 네이밍을 통해 공통 컴포넌트와 확장된 컴포넌트 간의 관계를 직관적으로 파악할 수 있도록 구성하였습니다.',
					'기능과 스타일링의 관심사를 분리하여 유연하고 재사용 가능한 컴포넌트 구조를 확립하였습니다.',
				],
			},
			{
				title: '인터랙티브 모달 컴포넌트 구현',
				details: [
					'react-spring과 use-gesture를 활용하여 바텀 시트 모달의 부드러운 애니메이션과 제스처 인터랙션을 직접 구현하였습니다.',
					'드래그 거리와 속도에 따른 단계별 위치 조정(10%, 30%, 60%, 85%, 92%)을 구현하여 직관적인 사용자 경험을 제공하였습니다.',
					'스크롤과 드래그 상태를 동시에 관리하여 자연스러운 인터랙션이 가능하도록 구현하였습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Next.js API 라우팅 경로 설정 오류 해결',
				details: [
					'Next.js App Router에서 외부 Weather API 연동 시 API 라우팅 경로 불일치로 404 에러가 발생했습니다.',
					'route.ts 파일의 위치와 이름 그리고 폴더 구조를 Next.js 13 App Router 컨벤션에 맞게 수정하고, 요청 파라미터 처리 로직을 개선하여 문제를 해결했습니다.',
					'에러 처리와 로깅을 강화하여 향후 비슷한 문제가 발생했을 때 빠른 디버깅이 가능하도록 개선했습니다.',
				],
			},
			{
				title: '지도 서비스 API 선정 및 구현 과정의 문제 해결',
				details: [
					'국내외 지도 API들의 웹 버전 기능을 비교 분석하여(카카오맵, 네이버맵, T맵, 구글맵) 프로젝트 요구사항에 가장 적합한 API를 검토하였습니다.',
					'각 지도 API의 웹 버전 지원 기능(대중교통 API, 길찾기 API, 커스텀 스타일링)을 종합적으로 평가하여 구글 맵스 플랫폼을 최종적으로 선택하였습니다.',
					'Maps JavaScript API, Directions API, Places API, Static Maps API 등을 통합적으로 활용하여 완성도 높은 지도 서비스를 구현하였습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'DIVE 2024 글로벌 데이터 해커톤 수상',
				details: [
					'부산광역시 주최, 부산테크노파크 주관의 DIVE 2024 글로벌 데이터 해커톤에서 부산테크노파크원장상(발제사 3위)을 수상하였습니다.',
					'코레일(한국철도공사)의 데이터를 활용하여 동해선 이용객을 위한 가이드 서비스 "동해선장"을 개발하였습니다.',
					'3인 팀의 유일한 프론트엔드 개발자로 참여하여, 72시간이라는 제한된 시간 내에 Swagger 문서 기반의 백엔드 API 연동 및 프론트엔드 개발을 수행하였습니다.',
					'구글 맵스 플랫폼 연동, 인터랙티브 UI 구현, 실시간 데이터 통합 등 프론트엔드 개발 전반을 담당하였습니다.',
				],
			},
			{
				title: '효율적인 팀 협업 체계 구축',
				details: [
					'프론트엔드 1명, 백엔드 2명으로 구성된 팀에서 원활한 협업을 위한 커뮤니케이션 체계를 구축하였습니다.',
					'Discord를 통한 주 3회 정기 회의와 Notion을 활용한 기획 문서화로 체계적인 프로젝트 관리를 진행하였습니다.',
					'GitHub Actions와 AWS, Docker를 활용한 CI/CD 파이프라인 구축으로 자동화된 배포 환경을 구성하였습니다.',
				],
			},
		],
		projectData: {
			images: [
				'/images/captain-donghae/image1.png',
				'/images/captain-donghae/image2.png',
				'/images/captain-donghae/image3.png',
				'/images/captain-donghae/image4.png',
				'/images/captain-donghae/image5.png',
				'/images/captain-donghae/image6.png',
				'/images/captain-donghae/image7.png',
				'/images/captain-donghae/image8.png',
				'/images/captain-donghae/image9.png',
				'/images/captain-donghae/image10.png',
				'/images/captain-donghae/image0.png',
			],
			subLinks: [
				{
					type: 'video',
					url: 'https://drive.google.com/file/d/1kmKcmPQrVDH0KiIKOWL8xLBycssUYVnE/view?usp=sharing',
					visible: true,
				},
				{
					type: 'ppt',
					url: 'https://docs.google.com/presentation/d/1wHhpKn5WytFvITK-Q20teTIfkeolH0Kr/edit?usp=sharing&ouid=106667079864051075882&rtpof=true&sd=true',
					visible: true,
				},
				{ type: 'doc', url: '/', visible: false },
				{ type: 'other', url: '/', visible: false },
			],
			background: {
				image: '/images/captain-donghae/image0.png',
			},
		},
	},
	{
		id: 'itzip',
		title: '잇집',
		subtitle: 'Itzip',
		platform: ['Web'],
		duration: '2024.07 ~ Present',
		links: [
			{
				type: 'github',
				url: 'https://github.com/ITZipProject/itzip_front',
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
			'개발자 취준생을 위한 종합 취업 준비 플랫폼으로, 블로그, 테스트, 구인 정보 등을 제공하는 웹 서비스.',
		techStack: [
			'TypeScript',
			'React',
			'Next.js',
			'Tailwind CSS',
			'Jotai',
			'Jest',
			'Prisma',
			'Storybook',
			'Postman',
			'Sentry',
			'AWS',
			'Jenkins',
			'Docker',
		],
		role: ['Frontend', 'DevOps'],
		teamSize: 15,
		tasks: [
			{
				title: '블로그 시스템 구현',
				details: [
					'react-spring을 활용한 애니메이션 효과로 전체 글 개수를 슬롯머신 스타일로 표시하여 사용자 경험을 향상시켰습니다.',
					'커스텀 캐러셀 컴포넌트를 직접 구현하여 메인 페이지의 시각적 매력을 높였습니다.',
					'다양한 필터링 및 정렬 옵션을 제공하여 사용자가 원하는 콘텐츠를 쉽게 찾을 수 있도록 하였습니다.',
					'페이지네이션 구현 시 사용자 편의를 고려하여 페이지 번호 클릭 시 화면 상단으로 자동 스크롤 되도록 하였습니다.',
				],
			},
			{
				title: 'Markdown 에디터 개발',
				details: [
					'실시간 미리보기 기능을 갖춘 Markdown 에디터를 구현하였습니다.',
					'커스텀 Markdown 문법 지원으로 풍부하고 편리한 컨텐츠 작성 환경을 제공하였습니다.',
				],
			},
			{
				title: '사이트 정보 Footer 개발',
				details: [
					'웹사이트의 Footer 컴포넌트를 설계하고 구현하였습니다.',
					'사이트와 관련된 기타 정보들이 포함되어 있습니다.',
				],
			},
			{
				title: '코드 품질 향상',
				details: [
					'Jest를 이용한 단위 테스트와 Storybook을 활용한 컴포넌트 문서화로 코드 품질을 향상시켰습니다.',
					'Sentry를 통한 실시간 오류 모니터링 시스템을 구축하여 신속한 버그 대응이 가능하도록 했습니다.',
				],
			},
			{
				title: 'DevOps 및 인프라 구축',
				details: [
					'AWS를 활용한 확장 가능한 클라우드 인프라를 설계하고 구축하였습니다.',
					'Jenkins를 이용한 CI/CD 파이프라인을 구성하여 지속적 통합 및 배포 프로세스를 자동화하였습니다.',
					'Docker를 사용하여 서비스 컨테이너화를 진행하고, 개발 및 운영 환경을 구성하였습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '블로그 글 조회수 중복 카운트 방지',
				details: [
					'동일 사용자의 단시간 내 반복 조회로 인한 조회수 부풀림 문제가 발생하였습니다.',
					'이를 해결하기 위해 10초 이상 페이지에 머물러야 조회수가 증가하도록 개선하였습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '이미지 최적화',
				details: [
					'Next.js의 Image 컴포넌트를 활용하여 이미지 로딩 성능을 최적화하였습니다.',
				],
			},
			{
				title: '동적 임포트를 통한 코드 스플리팅',
				details: [
					'Next.js의 dynamic import를 활용하여 게시글 내부 컴포넌트들을 동적으로 로드하도록 구현했습니다.',
					'이를 통해 초기 페이지 로드 시간을 단축하고, 필요한 시점에 관련 컴포넌트를 로드하여 전체적인 성능을 개선했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '확장 가능한 타이포그래피 시스템',
				details: [
					'Tailwind CSS를 확장하여 프로젝트 전반에 걸쳐 사용할 수 있는 일관된 타이포그래피 시스템을 구축했습니다.',
					'반응형 디자인을 고려한 폰트 스케일링 로직을 개발하여, 화면 크기에 따라 자동으로 폰트 크기가 조절되도록 하였습니다.',
					'이를 통해 디자인 일관성을 유지하면서도 다양한 디바이스에 최적화된 사용자 경험을 제공할 수 있게 되었습니다.',
				],
			},
			{
				title: 'GitHub 스타일 기여도 그래프',
				details: [
					'사용자의 글쓰기 활동을 시각화하기 위해 GitHub의 기여도 그래프와 유사한 커스텀 컴포넌트를 개발하였습니다.',
					'더 상세한 정보를 볼 수 있는, 마우스 호버 시 나타나는 툴팁 기능을 추가하였습니다.',
					'이 기능을 통해 해당 사용자의 활동 패턴을 직관적으로 표현하고, 지속적인 참여를 유도하는 효과를 얻도록 하였습니다.',
				],
			},
			{
				title: '효율적인 팀 협업 시스템 구축',
				details: [
					'15명 규모의 팀(프론트엔드 5명, 백엔드 5명, 디자이너 5명)에서 프론트엔드 팀장으로서 활동하였습니다.',
					'Notion, Discord, Slack을 활용한 체계적인 문서화 및 실시간 커뮤니케이션 시스템을 구축하여 원활한 정보 공유와 신속한 의사결정을 가능케 했습니다.',
					'주간 회의를 통해 프로젝트 진행 상황을 공유하고 코드 품질을 지속적으로 개선하였습니다.',
					'Figma와 Swagger를 활용하여 디자인-개발 및 프론트엔드-백엔드 간 효율적인 협업 프로세스를 확립하였습니다.',
				],
			},
		],
		projectData: {
			images: [
				'/images/itzip/image1.png',
				'/images/itzip/image2.png',
				'/images/itzip/image3.png',
				'/images/itzip/image4.png',
				'/images/itzip/image5.png',
				'/images/itzip/image6.png',
				'/images/itzip/image7.png',
				'/images/itzip/image0.png',
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
				image: '/images/itzip/image0.png',
			},
		},
	},
	{
		id: 'jukrap-website',
		title: 'Jukrap의 개인 사이트',
		subtitle: 'Jukrap Website',
		platform: ['Web'],
		duration: '2024.06 ~ Present',
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
		techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Zustand', 'Next.js'],
		role: ['Frontend'],
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
		platform: ['Mobile'],
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
		techStack: ['JavaScript', 'React Native', 'Firebase', 'Faster Image'],
		role: ['Frontend', 'Backend', 'Presentation'],
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
		platform: ['Mobile'],
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
		role: ['Team Leader', 'Android'],
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
		platform: ['Mobile'],
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
		role: ['Android'],
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
		id: 'labyrinth-escape-game',
		title: '미궁 탈출 게임',
		subtitle: 'Labyrinth Escape Game',
		platform: ['Game'],
		duration: '2022.05 ~ 2022.06',
		links: [
			{
				type: 'github',
				url: 'https://github.com/jukrap/Labyrinth-Escape-Game',
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
			'미궁 탈출을 목표로 하는 1인칭 슈팅 게임. 유니티 엔진으로 개발되었습니다.',
		techStack: ['C#', 'Unity'],
		role: ['Game Developer'],
		teamSize: 1,
		tasks: [
			{
				title: '게임 시스템 및 컨텐츠 개발',
				details: [
					'1인칭 슈팅, 체력, 점수 등의 게임 시스템을 구현하였습니다.',
					'컷씬, 적 AI, 아이템, 엔딩 등 게임 컨텐츠를 개발하였습니다.',
					'유니티 에셋 스토어의 리소스를 활용하여 개발 기간을 단축하였습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '프리팹 관련 문제 해결',
				details: [
					'프리팹 기능에 대한 이해도 부족으로 프리팹이 손실되는 문제가 발생하였습니다.',
					'프리팹의 개념과 사용법을 학습하고 활용하여 같은 문제가 일어나지 않도록 하였습니다.',
				],
			},
			{
				title: '사운드 및 애니메이션 오류 수정',
				details: [
					'사운드가 재생되지 않거나 애니메이션 관련 오류로 게임이 멈추는 문제가 있었습니다.',
					'실행 순서와 설정을 점검하고 수정하여 오류를 해결하였습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '싱글톤 패턴 학습 및 적용',
				details: [
					'개발 중 싱글톤 패턴의 필요성을 인지하고 학습하였습니다.',
					'싱글톤 패턴을 통해 게임 데이터와 핵심 기능을 효율적으로 관리하였습니다.',
					'코드 중복 방지, 일관성 유지 등 싱글톤 패턴 활용의 장점을 경험하였습니다.',
				],
			},
		],
		projectData: {
			images: [
				'/images/labyrinth-escape-game/image1.png',
				'/images/labyrinth-escape-game/image2.png',
				'/images/labyrinth-escape-game/image3.png',
				'/images/labyrinth-escape-game/image4.png',
				'/images/labyrinth-escape-game/image5.png',
				'/images/labyrinth-escape-game/image6.png',
				'/images/labyrinth-escape-game/image0.png',
      ],
			subLinks: [
				{
					type: 'video',
					url: 'https://youtu.be/rkAiZ0MaRwU',
					visible: true,
				},
				{
					type: 'doc',
					url: 'https://drive.google.com/file/d/1UU6-vcIu9C7KaCVa7pMEgQjNAAOaXZIp/view?usp=sharing',
					visible: true,
				},
				{ type: 'ppt', url: '/', visible: false },
				{ type: 'other', url: '/', visible: false },
			],
			background: {
				image: '/images/labyrinth-escape-game/image0.png',
			},
		},
	},
	{
		id: 'mytime',
		title: '마이타임',
		subtitle: 'MyTime',
		platform: ['Mobile'],
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
		role: ['Team Leader', 'Android'],
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
		platform: ['Web'],
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
			'JavaScript',
			'React',
			'Firebase',
			'Node.js',
			'Express',
			'Puppeteer',
		],
		role: ['Team Leader', 'Frontend', 'Backend'],
		teamSize: 2,
		tasks: [
			{
				title: '프론트엔드 개발',
				details: [
					'React를 기반으로 한 동적 웹 애플리케이션을 구현하였습니다.',
					'react-router-dom을 사용하여 효율적인 라우팅 시스템을 구축하였습니다.',
					'react-bootstrap을 활용하여 반응형 디자인을 구현하였습니다.',
					'메인 페이지, 핫딜 페이지, 검색 페이지 등 주요 페이지들의 레이아웃과 기능을 구현하였습니다.',
				],
			},
			{
				title: '백엔드 개발',
				details: [
					'Express를 사용하여 백엔드를 설계 및 구현하였습니다.',
					'Puppeteer 라이브러리를 활용하여 효율적인 웹 크롤링 시스템을 개발하였습니다.',
					'수만 건의 핫딜 데이터를 3~5분 내에 크롤링 및 가공하는 시스템을 구현하였습니다.',
					'Firebase를 활용하여 문서 기반의 NoSQL 데이터베이스를 설계하고 구축하였습니다.',
				],
			},
			{
				title: '재사용 가능한 컴포넌트 개발',
				details: [
					'styled-components를 이용하여, 여러 페이지에서 공통적으로 사용되는 상품 정보 컴포넌트를 제작하였습니다.',
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
				title: '프로젝트 성과',
				details: ['경남소프트웨어경진대회에서 최우수상을 수상하였습니다.'],
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
