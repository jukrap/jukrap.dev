import { Project } from '@/types/project';
import { playImplementation } from './playImplementation';

export const projectsDetailData: Project[] = [
	{
		id: 'ai-agent-playbook',
		title: 'AI Agent Playbook',
		subtitle: 'Personal AI agent harness',
		platform: ['Tooling'],
		duration: '2026.06 ~ Present',
		links: [
			{
				type: 'github',
				url: 'https://github.com/jukrap/ai-agent-playbook',
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
			{
				type: 'url',
				url: 'https://www.npmjs.com/package/ai-agent-playbook',
				visible: true,
			},
		],
		overview:
			'AI 에이전트가 저장소를 다룰 때 필요한 작업 규칙, 스킬, 템플릿, 점검 명령을 재사용하기 위해 만든 개인용 개발 도구.',
		techStack: ['JavaScript', 'Node.js', 'GitHub Actions'],
		role: ['Tooling', 'Documentation'],
		teamSize: 1,
		tasks: [
			{
				title: 'CLI와 런타임 하네스 구성',
				details: [
					'npx 또는 전역 명령으로 실행할 수 있는 Node.js 기반 CLI를 구성했습니다.',
					'초기화, 점검, 검색을 각각의 명령으로 나누고, 대상 프로젝트와 dry-run 결과를 먼저 확인할 수 있도록 했습니다.',
					'프로젝트별 작업 규칙과 현재 상태를 `.ai-agent-playbook/` 형태로 정리할 수 있는 구조를 만들었습니다.',
				],
			},
			{
				title: '스킬과 템플릿 체계 정리',
				details: [
					'저장소 온보딩, UI 품질, 리뷰, Git, 레거시 유지보수처럼 반복되는 작업을 짧은 스킬 문서로 분리했습니다.',
					'프로젝트 루트 규칙, 작업 메모리, 실행 기록, 계약 문서 템플릿을 별도 디렉터리로 정리했습니다.',
					'영문 원본과 한국어 번역 문서를 분리해 공개 문서와 개인 사용 흐름을 함께 유지할 수 있게 했습니다.',
				],
			},
			{
				title: 'MCP 기반 읽기 도구 구성',
				details: [
					'AI 앱이 로컬 저장소의 컨텍스트와 검색·점검 결과를 읽을 수 있도록 MCP 도구를 구성했습니다.',
					'기본 동작은 읽기 전용으로 두고, 파일을 쓰는 작업은 명령과 dry-run 확인을 거치도록 경계를 나누었습니다.',
					'operator check/search/research 같은 점검 흐름을 CLI와 MCP 양쪽에서 활용할 수 있게 정리했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '자동화보다 명시적인 실행 흐름을 우선',
				details: [
					'에이전트가 저장소에 곧바로 쓰기 작업을 하는 구조 대신, 사용자가 명령을 실행하고 결과를 확인한 뒤 적용 여부를 고르는 흐름으로 설계했습니다.',
					'설치, 스킬 복사, 프로젝트 playbook 초기화, MCP 등록을 자동으로 묶지 않고 각각 분리해 예측 가능한 사용 방식을 유지했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '공개 패키지와 문서화',
				details: [
					'npm 패키지와 GitHub 저장소로 공개해 `npx ai-agent-playbook` 형태로 바로 확인할 수 있게 했습니다.',
					'처음 사용하는 사람이 실행 순서와 쓰기 여부를 파악할 수 있도록 Quick Start, Command Guide, 설치/삭제 문서를 함께 정리했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{
					src: '/images/ai-agent-playbook/logo-wide.png',
					alt: 'AI Agent Playbook 로고',
				},
				{
					src: '/images/ai-agent-playbook/npm-overview.png',
					alt: 'AI Agent Playbook npm 패키지 소개',
				},
				{
					src: '/images/ai-agent-playbook/quick-start.png',
					alt: 'AI Agent Playbook 빠른 시작 문서',
				},
				{
					src: '/images/ai-agent-playbook/command-guide.png',
					alt: 'AI Agent Playbook 명령어 안내',
				},
				{
					src: '/images/ai-agent-playbook/repository-map.png',
					alt: 'AI Agent Playbook 저장소 구조 안내',
				},
				{
					src: '/images/ai-agent-playbook/mcp-settings.png',
					alt: 'AI Agent Playbook MCP 설정 화면',
				},
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
				{
					type: 'doc',
					url: 'https://github.com/jukrap/ai-agent-playbook#readme',
					visible: true,
				},
				{ type: 'other', url: '/', visible: false },
			],
			background: {
				image: '/images/ai-agent-playbook/npm-overview.png',
			},
		},
	},
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
				visible: false,
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
			'GitHub Actions',
			'Docker',
		],
		role: ['Frontend'],
		teamSize: 3,
		tasks: [
			{
				title: '구글 맵스 플랫폼 기반 동해선 서비스 구현',
				details: [
					'다양한 지도 API 중 대중교통 경로 안내, 마커 커스터마이징 등을 비교 분석하여 구글 맵스 플랫폼을 선정했습니다.',
					'Maps JavaScript API를 활용한 동적 지도, Places API 기반 장소 검색, Directions API 활용 대중교통 경로 안내, Geocoding API 기반 주소 변환 기능을 구현했습니다.',
					'Static Maps API를 활용하여 특정 위치의 정적 지도 이미지를 제공하고, Geolocation API 연동으로 실시간 위치 추적 기능을 구현했습니다.',
				],
			},
			{
				title: '외부 API 통합 및 데이터 서비스 구축',
				details: [
					'axios를 활용한 API 모듈화와 Next.js API Routes를 통해 구글 맵스 API, 날씨, 지하철역 정보(실시간 혼잡도 포함), 러닝/자전거 코스, 맛집 정보 등 다양한 외부 API를 통합 구현했습니다.',
					'위도·경도, 페이지네이션, 카테고리 필터를 요청 파라미터로 처리하고 API 오류에 대응하는 로직을 추가했습니다.',
				],
			},
			{
				title: '컴포넌트 아키텍처 설계 및 UI 개발',
				details: [
					'합성(Composition) 패턴을 적용하여 기본 기능을 가진 공통 컴포넌트와 이를 확장한 구체적인 컴포넌트를 설계했습니다.',
					'Storybook을 활용한 컴포넌트 주도 개발(CDD)로 각 컴포넌트의 기능과 디자인을 체계적으로 개발했습니다.',
					'계층형 폴더 구조와 명확한 네이밍을 통해 공통 컴포넌트와 확장된 컴포넌트 간의 관계를 직관적으로 파악할 수 있도록 구성했습니다.',
					'기능과 스타일링의 관심사를 분리하여 유연하고 재사용 가능한 컴포넌트 구조를 확립했습니다.',
				],
			},
			{
				title: '인터랙티브 모달 컴포넌트 구현',
				details: [
					'react-spring과 use-gesture를 활용하여 바텀 시트 모달의 부드러운 애니메이션과 제스처 인터랙션을 직접 구현했습니다.',
					'드래그 거리와 속도에 따른 단계별 위치 조정(10%, 30%, 60%, 85%, 92%)을 구현하여 직관적인 사용자 경험을 제공했습니다.',
					'스크롤과 드래그 상태를 동시에 관리하여 자연스러운 인터랙션이 가능하도록 구현했습니다.',
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
					'국내외 지도 API들의 웹 버전 기능을 비교 분석하여(카카오맵, 네이버맵, T맵, 구글맵) 프로젝트 요구사항에 가장 적합한 API를 검토했습니다.',
					'각 지도 API의 웹 버전 지원 기능(대중교통 API, 길찾기 API, 커스텀 스타일링)을 종합적으로 평가하여 구글 맵스 플랫폼을 최종적으로 선택했습니다.',
					'Maps JavaScript API, Directions API, Places API, Static Maps API를 지도 표시·길찾기·장소 검색에 연결했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'DIVE 2024 글로벌 데이터 해커톤 수상',
				details: [
					'부산광역시 주최, 부산테크노파크 주관의 DIVE 2024 글로벌 데이터 해커톤에서 부산테크노파크원장상(발제사 3등)을 수상했습니다.',
					'코레일(한국철도공사)의 데이터를 활용하여 동해선 이용객을 위한 가이드 서비스 "동해선장"을 개발했습니다.',
					'3인 팀의 유일한 프론트엔드 개발자로 참여하여, 72시간이라는 제한된 시간 내에 Swagger 문서 기반의 백엔드 API 연동 및 프론트엔드 개발을 수행했습니다.',
					'구글 맵스 플랫폼 연동, 인터랙티브 UI 구현, 실시간 데이터 통합 등 프론트엔드 개발 전반을 담당했습니다.',
				],
			},
			{
				title: '효율적인 팀 협업 체계 구축',
				details: [
					'프론트엔드 1명, 백엔드 2명으로 구성된 팀에서 원활한 협업을 위한 커뮤니케이션 체계를 구축했습니다.',
					'Discord를 통한 주 3회 정기 회의와 Notion을 활용한 기획 문서화로 체계적인 프로젝트 관리를 진행했습니다.',
					'GitHub Actions와 AWS, Docker를 활용한 CI/CD 파이프라인 구축으로 자동화된 배포 환경을 구성했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{
					src: '/images/captain-donghae/image1.png',
					alt: '동해선장 프로젝트 화면 1',
				},
				{
					src: '/images/captain-donghae/image2.png',
					alt: '동해선장 프로젝트 화면 2',
				},
				{
					src: '/images/captain-donghae/image3.png',
					alt: '동해선장 프로젝트 화면 3',
				},
				{
					src: '/images/captain-donghae/image4.png',
					alt: '동해선장 프로젝트 화면 4',
				},
				{
					src: '/images/captain-donghae/image5.png',
					alt: '동해선장 프로젝트 화면 5',
				},
				{
					src: '/images/captain-donghae/image6.png',
					alt: '동해선장 프로젝트 화면 6',
				},
				{
					src: '/images/captain-donghae/image7.png',
					alt: '동해선장 프로젝트 화면 7',
				},
				{
					src: '/images/captain-donghae/image8.png',
					alt: '동해선장 프로젝트 화면 8',
				},
				{
					src: '/images/captain-donghae/image9.png',
					alt: '동해선장 프로젝트 화면 9',
				},
				{
					src: '/images/captain-donghae/image10.png',
					alt: '동해선장 프로젝트 화면 10',
				},
				{
					src: '/images/captain-donghae/image0.png',
					alt: '동해선장 프로젝트 화면 11',
				},
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
		duration: '2024.07 ~ 2025.06',
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
			'개발자 취업 준비생에게 블로그, 테스트, 구인 정보를 제공하는 웹서비스.',
		techStack: [
			'TypeScript',
			'React',
			'Next.js',
			'Tailwind CSS',
			'React Spring',
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
					'react-spring으로 전체 글 개수가 변하는 슬롯머신 형태의 애니메이션을 구현했습니다.',
					'메인 페이지에 사용할 캐러셀 컴포넌트를 직접 구현했습니다.',
					'원하는 콘텐츠를 찾을 수 있도록 필터와 정렬 옵션을 제공했습니다.',
					'페이지 번호를 누르면 해당 목록의 상단으로 자동 스크롤하도록 구현했습니다.',
				],
			},
			{
				title: 'Markdown 에디터 개발',
				details: [
					'실시간 미리보기 기능을 갖춘 Markdown 에디터를 구현했습니다.',
					'글을 작성할 때 사용할 커스텀 Markdown 문법을 지원했습니다.',
				],
			},
			{
				title: '사이트 정보 Footer 개발',
				details: [
					'웹사이트의 Footer 컴포넌트를 설계하고 구현했습니다.',
					'Footer에 사이트 관련 정보를 모았습니다.',
				],
			},
			{
				title: '코드 품질 향상',
				details: [
					'Jest로 단위 테스트를 작성하고 Storybook으로 컴포넌트의 상태와 사용 방법을 문서화했습니다.',
					'Sentry를 연결해 실행 중 발생하는 오류를 수집하고 확인할 수 있도록 했습니다.',
				],
			},
			{
				title: 'DevOps 및 인프라 구축',
				details: [
					'AWS에 서비스 실행 환경을 구성했습니다.',
					'Jenkins를 이용한 CI/CD 파이프라인을 구성하여 지속적 통합 및 배포 프로세스를 자동화했습니다.',
					'Docker를 사용하여 서비스 컨테이너화를 진행하고, 개발 및 운영 환경을 구성했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '블로그 글 조회수 중복 카운트 방지',
				details: [
					'같은 사용자가 짧은 시간에 글을 반복 조회하면 조회수가 중복 집계되는 문제가 있었습니다.',
					'페이지에 10초 이상 머문 경우에만 조회수가 증가하도록 바꿨습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '이미지 최적화',
				details: [
					'Next.js Image 컴포넌트로 이미지를 표시하고 이미지 크기와 로딩을 관리했습니다.',
				],
			},
			{
				title: '동적 임포트를 통한 코드 스플리팅',
				details: [
					'Next.js의 dynamic import를 활용하여 게시글 내부 컴포넌트들을 동적으로 로드하도록 구현했습니다.',
					'게시글 내부 컴포넌트를 초기 코드에서 분리하고 필요한 시점에 불러오도록 했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '확장 가능한 타이포그래피 시스템',
				details: [
					'Tailwind CSS를 확장하여 프로젝트 전반에 걸쳐 사용할 수 있는 일관된 타이포그래피 시스템을 구축했습니다.',
					'화면 크기에 따라 글자 크기를 조절하는 반응형 스타일을 적용했습니다.',
				],
			},
			{
				title: 'GitHub 스타일 기여도 그래프',
				details: [
					'사용자의 글쓰기 활동을 시각화하기 위해 GitHub의 기여도 그래프와 유사한 커스텀 컴포넌트를 개발했습니다.',
					'마우스를 올리면 상세 정보를 보여주는 툴팁을 추가했습니다.',
				],
			},
			{
				title: '효율적인 팀 협업 시스템 구축',
				details: [
					'15명 규모의 팀(프론트엔드 5명, 백엔드 5명, 디자이너 5명)에서 프론트엔드 팀장으로서 활동했습니다.',
					'Notion으로 작업을 문서화하고 Discord와 Slack으로 진행 상황과 결정 사항을 공유했습니다.',
					'주간 회의를 통해 프로젝트 진행 상황을 공유하고 코드 품질을 지속적으로 개선했습니다.',
					'Figma의 화면 설계와 Swagger의 API 명세를 기준으로 디자이너와 백엔드 개발자와 협업했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{ src: '/images/itzip/image1.png', alt: 'Itzip 프로젝트 화면 1' },
				{ src: '/images/itzip/image2.png', alt: 'Itzip 프로젝트 화면 2' },
				{ src: '/images/itzip/image3.png', alt: 'Itzip 프로젝트 화면 3' },
				{ src: '/images/itzip/image4.png', alt: 'Itzip 프로젝트 화면 4' },
				{ src: '/images/itzip/image5.png', alt: 'Itzip 프로젝트 화면 5' },
				{ src: '/images/itzip/image6.png', alt: 'Itzip 프로젝트 화면 6' },
				{ src: '/images/itzip/image7.png', alt: 'Itzip 프로젝트 화면 7' },
				{ src: '/images/itzip/image0.png', alt: 'Itzip 프로젝트 화면 8' },
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
		implementation: playImplementation.ko,
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
		overview:
			'업무 경험과 개인 프로젝트, 포트폴리오·이력서·경력기술서를 함께 제공하는 개인 웹사이트.',
		techStack: [
			'TypeScript',
			'React',
			'Next.js',
			'Tailwind CSS',
			'Framer Motion',
			'Zustand',
			'Sharp',
		],
		role: ['Frontend'],
		teamSize: 1,
		tasks: [
			{
				title: '다국어 페이지와 경력 콘텐츠 구성',
				details: [
					'React 19와 Next.js 16 App Router로 Home, About, Work, Projects 페이지를 구성했습니다.',
					'한국어와 영어 콘텐츠를 분리하고 공통 컴포넌트에 연결해 언어별 경로와 화면을 제공했습니다.',
					'업무 사례와 지원 문서를 데이터로 관리하고 웹에서 읽거나 인쇄할 수 있는 문서 레이아웃을 만들었습니다.',
				],
			},
			{
				title: '테마와 프로젝트 탐색 인터랙션',
				details: [
					'Zustand와 Tailwind CSS로 밝은 테마와 어두운 테마 전환을 구현했습니다.',
					'프로젝트 필터, 상세 모달, 이미지 확대 보기를 연결해 목록에서 구현 내용과 화면을 확인할 수 있도록 했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '홈 영상의 재생 조건 분리',
				details: [
					'홈 영상은 화면 밖으로 나가거나 탭이 숨겨지면 멈추고, 사용자가 직접 정지한 상태는 다시 스크롤해도 유지하도록 했습니다.',
					'동작 줄이기 또는 데이터 절약 설정에서는 정적 이미지를 사용하며, 영상 로딩에 실패해도 소개 내용을 읽을 수 있도록 구성했습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '표시 영역에 맞춘 이미지 요청',
				details: [
					'Next.js Image로 화면 크기에 맞는 이미지를 요청하고, 첫 화면의 대표 이미지와 나중에 보이는 프로젝트 이미지의 로딩 우선순위를 구분했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '타이핑 효과를 공통 훅으로 분리',
				details: [
					'About의 인사말에 useTypingEffect 훅을 적용하고 타이핑 속도와 문장 사이 지연을 설정할 수 있도록 했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{
					src: '/images/jukrap-website/2026-home-desktop.png',
					alt: '데스크톱 홈 화면',
					caption: 'Home / 2026.09.18',
				},
				{
					src: '/images/jukrap-website/2026-work-desktop.png',
					alt: '데스크톱 Work 화면',
					caption: 'Work / 2026.09.18',
				},
				{
					src: '/images/jukrap-website/2026-home-mobile.png',
					alt: '모바일 홈 화면',
					caption: 'Mobile Home / 2026.09.18',
				},
				{
					src: '/images/jukrap-website/image1.png',
					alt: '이전 홈 화면, 다크 모드',
					caption: '이전 버전',
				},
				{
					src: '/images/jukrap-website/image2.png',
					alt: '이전 About 화면, 프로필 이스터에그',
					caption: '이전 버전',
				},
				{
					src: '/images/jukrap-website/image3.png',
					alt: '이전 프로젝트 상세 모달',
					caption: '이전 버전',
				},
				{
					src: '/images/jukrap-website/image4.png',
					alt: '이전 이미지 확대 보기',
					caption: '이전 버전',
				},
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
				url: 'https://github.com/jukrap/archived-rn-ShareBBy',
				visible: true,
			},
			{
				type: 'appleStore',
				url: 'https://apps.apple.com/kr/app/%EC%89%90%EC%96%B4%EB%B9%84/id6502604022',
				visible: false,
			},
			{
				type: 'googleStore',
				url: '/',
				visible: false,
			},
			{ type: 'url', url: '/', visible: false },
		],
		overview: '취미 활동을 공유하고 모임에 참여할 수 있는 크로스플랫폼 앱.',
		techStack: ['JavaScript', 'React Native', 'Firebase', 'Faster Image'],
		role: ['Frontend', 'Backend', 'Presentation'],
		teamSize: 5,
		tasks: [
			{
				title: '안드로이드 작업',
				details: [
					'iOS 기준으로 개발된 앱을 안드로이드에서도 사용할 수 있도록 수정했습니다.',
				],
			},
			{
				title: '데이터베이스 관련',
				details: [
					'ERD로 데이터 간 관계를 정리하고 Firebase의 저장 구조를 설계했습니다.',
				],
			},
			{
				title: '게시판 전체 구현',
				details: [
					'게시글과 댓글의 작성·조회·수정·삭제 기능을 구현했습니다.',
					'위치 기반 게시글 필터링, 다양한 정렬 옵션을 구현했습니다.',
				],
			},
			{
				title: '모달 및 토스트 제작',
				details: ['각종 모달 및 토스트 메시지를 제작했습니다.'],
			},
		],
		troubleshooting: [
			{
				title: '이미지 캐싱 이슈 해결',
				details: [
					'리액트 네이티브 기본 이미지 컴포넌트를 사용하면서 트래픽이 많이 발생하고 이미지가 느리게 로딩되는 문제를 확인했습니다.',
					'fast-image 라이브러리 적용을 시도했으나, 업데이트 중단 이슈로 인해 faster-image 라이브러리를 대안으로 적용했습니다.',
					'이미지 로딩에 faster-image의 캐시를 적용했습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '이미지 최적화',
				details: [
					'모바일 화면에 맞게 이미지 크기를 조정했습니다.',
					'이미지 크기를 조정하고 캐싱을 적용해 이미지 로딩을 개선했습니다.',
				],
			},
			{
				title: '게시판 및 댓글 성능 개선',
				details: [
					'Pull to Refresh로 목록을 새로고침하고 Infinite Scroll로 다음 데이터를 불러오도록 구현했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Firebase를 활용한 실시간 기능 구현',
				details: [
					'Firebase의 실시간 데이터베이스를 활용하여 실시간 댓글, 좋아요, 다중 이미지 등의 기능을 구현했습니다.',
				],
			},
			{
				title: '위치 기반 게시글 필터링',
				details: [
					'사용자 위치를 기반으로 가까운 위치의 게시글만 표시하는 기능을 구현했습니다.',
				],
			},
			{
				title: '협업 도구 활용',
				details: [
					'스크럼 방법론을 통해 주기적인 소통과 개발 작업의 조율, 일정 관리를 진행했습니다.',
					'Notion과 Slack으로 작업을 공유하고 GitHub와 Figma로 코드·디자인 변경을 확인했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{ src: '/images/sharebby/image1.png', alt: '쉐어비 프로젝트 화면 1' },
				{ src: '/images/sharebby/image2.png', alt: '쉐어비 프로젝트 화면 2' },
				{ src: '/images/sharebby/image3.png', alt: '쉐어비 프로젝트 화면 3' },
				{ src: '/images/sharebby/image4.png', alt: '쉐어비 프로젝트 화면 4' },
				{ src: '/images/sharebby/image5.png', alt: '쉐어비 프로젝트 화면 5' },
				{ src: '/images/sharebby/image6.png', alt: '쉐어비 프로젝트 화면 6' },
				{ src: '/images/sharebby/image7.png', alt: '쉐어비 프로젝트 화면 7' },
				{ src: '/images/sharebby/image8.png', alt: '쉐어비 프로젝트 화면 8' },
				{ src: '/images/sharebby/image9.png', alt: '쉐어비 프로젝트 화면 9' },
				{ src: '/images/sharebby/image10.png', alt: '쉐어비 프로젝트 화면 10' },
				{ src: '/images/sharebby/image11.png', alt: '쉐어비 프로젝트 화면 11' },
				{ src: '/images/sharebby/image12.png', alt: '쉐어비 프로젝트 화면 12' },
				{ src: '/images/sharebby/image13.png', alt: '쉐어비 프로젝트 화면 13' },
				{ src: '/images/sharebby/image14.png', alt: '쉐어비 프로젝트 화면 14' },
				{ src: '/images/sharebby/image15.png', alt: '쉐어비 프로젝트 화면 15' },
				{ src: '/images/sharebby/image0.png', alt: '쉐어비 프로젝트 화면 16' },
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
				url: 'https://github.com/jukrap/archived-Posture-Teacher',
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
				visible: false,
			},
			{ type: 'url', url: '/', visible: false },
		],
		overview:
			'신체 각 지점의 각도와 길이로 앉은 자세와 플랭크 자세를 판별하고 측정 결과를 보여주는 앱.',
		techStack: ['Java', 'Android', 'Jetpack', 'MediaPipe', 'SQLite'],
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
				title: 'MediaPipe 통합 및 최적화',
				details: [
					'MediaPipe AAR를 리눅스 환경에서 빌드하고 프로젝트에 통합했습니다.',
					'MediaPipe로 몸과 얼굴의 움직임을 측정하는 기능을 개발했습니다.',
					'프로젝트 당시 비교에서 OpenCV 대비 5~10배 높은 FPS를 확인했습니다.',
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
					'SQLite 기반 Room Library로 측정 기록을 저장하는 구조를 설계했습니다.',
					'DAO, Entity, Database를 나누어 데이터 조회와 저장을 구현했습니다.',
					'사용자의 측정 데이터를 저장하고 관리하는 기능을 구현했습니다.',
				],
			},
		],

		troubleshooting: [
			{
				title: '멀티 스레드 최적화',
				details: [
					'MediaPipe의 부하를 감소시키기 위해 Runnable 인터페이스와 스레드 클래스를 활용한 멀티 스레드 최적화를 수행했습니다.',
					'이를 통해 구형 휴대폰에서의 앱 사용성을 개선하고 UI 반응성 문제를 해결했습니다.',
				],
			},
			{
				title: '빌드 환경 문제 해결',
				details: [
					'구형 CPU와 GPU 관련 문제로 Docker와 MSYS2를 이용한 빌드를 진행하지 못했습니다.',
					'Ubuntu 환경으로 옮겨 MediaPipe를 빌드했습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'FPS 개선',
				details: [
					'프로젝트 당시 OpenCV 기반 구현을 MediaPipe로 바꾼 뒤 FPS가 5~10배 높아진 것을 확인했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '프로젝트 성과',
				details: [
					'경남소프트웨어경진대회에서 예선 통과 후 본선까지 진출했습니다.',
					'이후 구글 플레이스토어에 배포했습니다.',
				],
			},
			{
				title: '애자일 스크럼 방식 프로젝트 진행',
				details: [
					'주 1-2회 정기적인 미팅을 통해 개발 진행 상황을 공유하고 다음 목표를 설정했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{
					src: '/images/posture-teacher/image1.png',
					alt: '자세선생 프로젝트 화면 1',
				},
				{
					src: '/images/posture-teacher/image2.png',
					alt: '자세선생 프로젝트 화면 2',
				},
				{
					src: '/images/posture-teacher/image3.png',
					alt: '자세선생 프로젝트 화면 3',
				},
				{
					src: '/images/posture-teacher/image4.png',
					alt: '자세선생 프로젝트 화면 4',
				},
				{
					src: '/images/posture-teacher/image5.png',
					alt: '자세선생 프로젝트 화면 5',
				},
				{
					src: '/images/posture-teacher/image6.png',
					alt: '자세선생 프로젝트 화면 6',
				},
				{
					src: '/images/posture-teacher/image0.png',
					alt: '자세선생 프로젝트 화면 7',
				},
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
			'아이에게 한글 지문을 보여주고, 읽는 목소리를 인식해 지문을 맞게 읽었는지 알려주는 앱.',
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
					'읽을 책과 지문을 선택하는 기능을 구현했습니다.',
					'STT로 목소리를 인식하고 제시된 책 구절을 맞게 읽었는지 판별하는 기능을 개발했습니다.',
					'책 한 권을 끝까지 읽을 수 있도록 구성하고, 독서 완료에 걸린 시간을 기록했습니다.',
				],
			},
			{
				title: '데이터베이스 구축',
				details: [
					'SQLite 기반 Room Library로 측정 기록을 저장하는 구조를 설계했습니다.',
					'DAO, Entity, Database를 나누어 데이터 조회와 저장을 구현했습니다.',
					'읽은 책과 관련된 통계 데이터를 저장하고 조회할 수 있는 기능을 구현했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '안드로이드 버전 관리 및 레거시 요소 적용',
				details: [
					'Google Cloud Platform을 안드로이드 환경에 적용하는 과정에서 안드로이드 버전 관리 방법을 익혔습니다.',
					'빌드 설정을 수정해 기존 라이브러리를 적용했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '네트워크 상태에 따른 Speech-to-Text(STT) 적용',
				details: [
					'안드로이드에 내장된 STT 기능을 오프라인 상태일 때 사용하도록 구현했습니다.',
					'Google Cloud Platform의 STT 기능을 온라인 상태일 때 사용하도록 설정했습니다.',
					'이를 통해 오프라인 상황에서도 앱의 핵심 기능이 작동할 수 있도록 했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{ src: '/images/chatterbox/image1.png', alt: '수다쟁이 프로젝트 화면 1' },
				{ src: '/images/chatterbox/image2.png', alt: '수다쟁이 프로젝트 화면 2' },
				{ src: '/images/chatterbox/image3.png', alt: '수다쟁이 프로젝트 화면 3' },
				{ src: '/images/chatterbox/image4.png', alt: '수다쟁이 프로젝트 화면 4' },
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
			'미궁 탈출을 목표로 하는 1인칭 슈팅 게임. 유니티 엔진으로 개발됐습니다.',
		techStack: ['C#', 'Unity'],
		role: ['Game Developer'],
		teamSize: 1,
		tasks: [
			{
				title: '게임 시스템 및 컨텐츠 개발',
				details: [
					'1인칭 슈팅, 체력, 점수 등의 게임 시스템을 구현했습니다.',
					'컷씬, 적 AI, 아이템, 엔딩 등 게임 컨텐츠를 개발했습니다.',
					'유니티 에셋 스토어의 리소스를 활용하여 개발 기간을 단축했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '프리팹 관련 문제 해결',
				details: [
					'프리팹을 다루는 과정에서 리소스가 손실되는 문제가 있었습니다.',
					'프리팹의 사용 방법을 확인하고 이후 작업에 적용했습니다.',
				],
			},
			{
				title: '사운드 및 애니메이션 오류 수정',
				details: [
					'사운드가 재생되지 않거나 애니메이션 관련 오류로 게임이 멈추는 문제가 있었습니다.',
					'실행 순서와 설정을 점검하고 수정하여 오류를 해결했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '싱글톤 패턴 학습 및 적용',
				details: [
					'개발 중 싱글톤 패턴의 필요성을 인지하고 학습했습니다.',
					'싱글톤 패턴으로 게임 데이터와 핵심 기능을 관리했습니다.',
					'코드 중복 방지, 일관성 유지 등 싱글톤 패턴 활용의 장점을 경험했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{
					src: '/images/labyrinth-escape-game/image1.png',
					alt: '미궁 탈출 게임 프로젝트 화면 1',
				},
				{
					src: '/images/labyrinth-escape-game/image2.png',
					alt: '미궁 탈출 게임 프로젝트 화면 2',
				},
				{
					src: '/images/labyrinth-escape-game/image3.png',
					alt: '미궁 탈출 게임 프로젝트 화면 3',
				},
				{
					src: '/images/labyrinth-escape-game/image4.png',
					alt: '미궁 탈출 게임 프로젝트 화면 4',
				},
				{
					src: '/images/labyrinth-escape-game/image5.png',
					alt: '미궁 탈출 게임 프로젝트 화면 5',
				},
				{
					src: '/images/labyrinth-escape-game/image6.png',
					alt: '미궁 탈출 게임 프로젝트 화면 6',
				},
				{
					src: '/images/labyrinth-escape-game/image0.png',
					alt: '미궁 탈출 게임 프로젝트 화면 7',
				},
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
			'얼굴 움직임으로 집중 여부를 감지하고, 상태에 따른 안내와 통계를 제공하는 안드로이드 타이머 앱.',
		techStack: ['Java', 'Android', 'Jetpack', 'MediaPipe', 'SQLite'],
		role: ['Team Leader', 'Android'],
		teamSize: 3,
		tasks: [
			{
				title: '집중력 감지 기능 구현',
				details: [
					'MediaPipe를 활용하여 사용자의 눈동자와 얼굴 움직임을 감지하는 시스템을 개발했습니다.',
					'감지된 데이터를 분석하여 사용자의 집중 여부를 판별하는 알고리즘을 구현했습니다.',
					'사용자가 집중력 감지 강도를 조절할 수 있도록 설정 기능을 추가했습니다.',
					'감지한 집중 상태에 따라 경고와 안내 메시지를 표시했습니다.',
				],
			},
			{
				title: 'MediaPipe 통합 및 최적화',
				details: [
					'Linux 환경에서 MediaPipe AAR를 직접 빌드하여 프로젝트에 통합했습니다.',
				],
			},
			{
				title: '데이터베이스 설계 및 구현',
				details: [
					'SQLite 기반 Room Library로 측정 기록을 저장하는 구조를 설계했습니다.',
					'DAO, Entity, Database를 나누어 데이터 조회와 저장을 구현했습니다.',
					'사용자의 집중 시간을 저장하고 관리하는 기능을 구현했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'OpenCV에서 MediaPipe로의 전환',
				details: [
					'초기 OpenCV와 NDK 기반 구현에서 프레임 속도가 낮은 문제가 있었습니다.',
					'OpenCV 기반 구현을 MediaPipe로 전환했습니다.',
					'프로젝트 당시 비교에서 초당 프레임 수가 10fps 이하에서 30fps 이상으로 높아진 것을 확인했습니다.',
				],
			},
		],
		performanceImprovements: [
			{
				title: '멀티 스레딩 최적화',
				details: [
					'MediaPipe 사용 시 발생하는 UI 스레드 블로킹 문제를 식별했습니다.',
					'Runnable 인터페이스와 스레드 클래스를 활용한 멀티 스레딩 구현으로 문제를 해결했습니다.',
					'이를 통해 UI 반응성을 유지하면서도 실시간 얼굴 인식 처리가 가능해졌습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '애자일 방법론 기반의 팀 협업 및 프로젝트 관리',
				details: [
					'깃허브로 팀의 코드와 변경 이력을 관리했습니다.',
					'팀원들과 프로젝트 목표를 정하고 각자 맡은 작업의 진행 상황을 주기적으로 점검했습니다.',
					'작업을 점검하고 조정하는 과정에 애자일 방법론을 일부 적용했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{ src: '/images/mytime/image1.png', alt: 'MyTime 프로젝트 화면 1' },
				{ src: '/images/mytime/image2.png', alt: 'MyTime 프로젝트 화면 2' },
				{ src: '/images/mytime/image3.png', alt: 'MyTime 프로젝트 화면 3' },
				{ src: '/images/mytime/image4.png', alt: 'MyTime 프로젝트 화면 4' },
				{ src: '/images/mytime/image5.png', alt: 'MyTime 프로젝트 화면 5' },
				{ src: '/images/mytime/image6.png', alt: 'MyTime 프로젝트 화면 6' },
				{ src: '/images/mytime/image0.png', alt: 'MyTime 프로젝트 화면 7' },
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
					'React를 기반으로 한 동적 웹 애플리케이션을 구현했습니다.',
					'react-router-dom으로 페이지 간 라우팅을 구성했습니다.',
					'react-bootstrap을 활용하여 반응형 디자인을 구현했습니다.',
					'메인 페이지, 핫딜 페이지, 검색 페이지 등 주요 페이지들의 레이아웃과 기능을 구현했습니다.',
				],
			},
			{
				title: '백엔드 개발',
				details: [
					'Express를 사용하여 백엔드를 설계 및 구현했습니다.',
					'Puppeteer로 핫딜 정보를 수집하는 웹 크롤러를 개발했습니다.',
					'수만 건의 핫딜 데이터를 3~5분 내에 크롤링 및 가공하는 시스템을 구현했습니다.',
					'Firebase를 활용하여 문서 기반의 NoSQL 데이터베이스를 설계하고 구축했습니다.',
				],
			},
			{
				title: '재사용 가능한 컴포넌트 개발',
				details: [
					'styled-components를 이용하여, 여러 페이지에서 공통적으로 사용되는 상품 정보 컴포넌트를 제작했습니다.',
					'각 ESD 사이트로 연결되는 하이퍼링크 기능을 포함한 컴포넌트를 구현했습니다.',
					'같은 상품 정보 컴포넌트를 여러 페이지에서 재사용했습니다.',
				],
			},
		],
		troubleshooting: [
			{
				title: '정적 웹 호스팅 문제 해결',
				details: [
					'초기에 React SPA를 GitHub Pages로 배포하면서 문제가 발생했습니다.',
					'배포 환경을 다른 호스팅 서비스로 옮겼습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '프로젝트 성과',
				details: ['경남소프트웨어경진대회에서 최우수상을 수상했습니다.'],
			},
			{
				title: '효율적인 협업 시스템 구축',
				details: [
					'주간 스프린트마다 작업 목표를 정하고 피드백에 따라 조정했습니다.',
					'스탠드업(Stand-Up) 미팅으로 진행 상황과 막힌 부분을 공유하고 해결했습니다.',
					'팀이 2인으로 줄어든 뒤에는 일정과 작업 분담을 조정해 프로젝트를 마쳤습니다.',
				],
			},
		],
		projectData: {
			images: [
				{
					src: '/images/esd-hotdeal/image1.png',
					alt: 'ESD HotDeal 프로젝트 화면 1',
				},
				{
					src: '/images/esd-hotdeal/image2.png',
					alt: 'ESD HotDeal 프로젝트 화면 2',
				},
				{
					src: '/images/esd-hotdeal/image3.png',
					alt: 'ESD HotDeal 프로젝트 화면 3',
				},
				{
					src: '/images/esd-hotdeal/image4.png',
					alt: 'ESD HotDeal 프로젝트 화면 4',
				},
				{
					src: '/images/esd-hotdeal/image0.png',
					alt: 'ESD HotDeal 프로젝트 화면 5',
				},
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
