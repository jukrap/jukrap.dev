import { Project } from '@/types/project';
import { playImplementation } from './playImplementation';

export const projectsDetailData: Project[] = [
	{
		id: 'ai-agent-playbook',
		title: 'AI Agent Playbook',
		subtitle: 'A harness for coding-agent context and skills',
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
			'AI 코딩 도구가 프로젝트 규칙과 작업 기록을 이어서 참고하도록 만든 하네스입니다. 기록 관리 CLI와 읽기 전용 MCP, 선택형 스킬 설치·복구 기능을 구현했습니다.',
		techStack: ['JavaScript', 'Node.js', 'MCP SDK', 'Zod', 'GitHub Actions'],
		role: ['CLI / MCP', 'Documentation'],
		teamSize: 1,
		tasks: [
			{
				title: '프로젝트 기록과 여러 저장소 관리',
				details: [
					'현재 목표·다음 작업, 주제별 지식과 월별 작업 기록을 나눠 관리하는 Node.js CLI 개발.',
					'단일 프로젝트·여러 저장소를 선택하는 대화형 초기 설정 구현. 생성할 파일과 설정을 확인한 뒤 적용.',
					'등록한 저장소의 공통 기록 조회와 저장소별 기존 기록 보존. 기록을 옮기거나 덮어쓰지 않고 따로 조회.',
				],
			},
			{
				title: '읽기 전용 MCP와 긴 기록 조회',
				details: [
					'상태 확인·검색·읽기·검증용 MCP 도구 4개 구현. 코딩 도구에서 같은 프로젝트 기록 조회.',
					'긴 조회 결과의 나누어 읽기 구현. 조회 조건·원문 변경 시 이어 읽기 중단과 검색 범위 미확인 상태 표시.',
				],
			},
			{
				title: '선택형 스킬 설치와 복구',
				details: [
					'light, core, development, legacy 프로필과 개별 스킬 선택 지원. 일반 설치와 기존 구성을 정리하는 프로필 전환 명령 분리.',
					'소유권·해시 확인으로 사용자 수정본과 다른 도구의 파일 보존. 적용 내역·백업 기록과 되돌리기 구현.',
				],
			},
		],
		troubleshooting: [
			{
				title: '일부 설치가 실패했을 때 기존 구성 보존',
				details: [
					'새 프로필로 전환하다 일부 설치가 실패하면 기존 스킬을 먼저 지워서는 안 됐습니다. 선택한 새 스킬 전체가 정상인지 확인한 뒤에만 기존 항목을 정리하도록 했습니다.',
					'미리보기 이후 파일이 바뀌는 경우도 처리하기 위해 각 삭제 직전에 다시 확인했습니다. 충돌과 부분 실패, 적용 중 수정, 되돌리기를 테스트했습니다.',
				],
			},
			{
				title: '코딩 도구와 겹치는 실행 기능 정리',
				details: [
					'초기에는 실행기와 스케줄러까지 포함했지만, 코딩 도구가 이미 제공하는 기능과 역할이 겹쳤습니다. 1.0부터 프로젝트 기록과 필요한 작업 지침에 집중하도록 구조를 바꿨습니다.',
					'패키지 설치, 스킬 설치, 프로젝트 초기 설정, MCP 연결을 따로 두고 사용자가 필요한 기능만 적용하도록 했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '선택적으로 사용하는 소스 검색과 원격 연동',
				details: [
					'ast-grep 기반 코드 구조 검색은 선택 기능으로 분리했습니다. GitHub/Gitea 연동은 변경 계획을 미리 보여 주고 명시적으로 적용하도록 했습니다.',
				],
			},
			{
				title: '배포와 사용 안내',
				details: [
					'npm과 GitHub에 공개하고, 설치와 사용법부터 전환·복구 절차까지 한국어와 영어로 정리했습니다.',
					'Windows와 Ubuntu CI에서 테스트와 타입 검사, 스킬·번역·문서 검사를 실행하도록 구성했습니다.',
				],
			},
		],
		projectData: {
			images: [
				{
					src: '/images/ai-agent-playbook/workspace-1.3.png',
					alt: '1.3.0 CLI의 저장소 등록과 기록 조회 결과 발췌',
					caption: '1.3.0 / CLI output excerpt',
				},
				{
					src: '/images/ai-agent-playbook/migration-1.3.png',
					alt: '1.3.0 스킬 설치 미리보기와 프로필 전환 결과 발췌',
					caption: '1.3.0 / CLI output excerpt',
				},
				{
					src: '/images/ai-agent-playbook/logo-wide.png',
					alt: 'AI Agent Playbook 로고',
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
					'지도 API의 대중교통 경로 안내·마커 설정 기능을 비교해 Google Maps Platform 선정.',
					'Maps JavaScript API의 동적 지도, Places API의 장소 검색, Directions API의 대중교통 경로와 Geocoding API의 주소 변환 구현.',
					'Static Maps API의 정적 지도 이미지와 Geolocation API의 실시간 위치 추적 연동.',
				],
			},
			{
				title: '외부 API 통합 및 데이터 서비스 구축',
				details: [
					'axios API 모듈과 Next.js API Routes 구성. 지도·날씨·역 정보와 실시간 혼잡도·러닝/자전거 코스·맛집 정보 연동.',
					'위도·경도, 페이지네이션과 카테고리 필터의 요청 파라미터 처리. API 오류 대응 로직 추가.',
				],
			},
			{
				title: '컴포넌트 아키텍처 설계 및 UI 개발',
				details: [
					'합성(Composition) 패턴으로 공통 컴포넌트와 기능별 확장 컴포넌트 구성.',
					'Storybook에서 컴포넌트별 기능과 디자인을 확인하며 개발.',
					'공통·확장 컴포넌트의 관계에 맞춰 폴더와 이름 정리.',
					'컴포넌트의 기능과 스타일을 분리해 다른 화면에서도 재사용하도록 구성.',
				],
			},
			{
				title: '인터랙티브 모달 컴포넌트 구현',
				details: [
					'react-spring·use-gesture를 이용한 바텀 시트 애니메이션과 드래그 조작 구현.',
					'드래그 거리·속도에 따른 바텀 시트 위치 조정(10%, 30%, 60%, 85%, 92%).',
					'바텀 시트의 스크롤·드래그 상태 처리.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Next.js API 라우팅 경로 설정 오류 해결',
				details: [
					'Next.js App Router에서 외부 Weather API 연동 시 API 라우팅 경로 불일치로 404 에러가 발생했습니다.',
					'route.ts의 위치·이름과 폴더 구조를 Next.js 13 App Router 규칙에 맞게 수정하고, 요청 파라미터 처리를 보완했습니다.',
					'오류 원인을 확인할 수 있도록 에러 처리와 로그를 보완했습니다.',
				],
			},
			{
				title: '지도 API 비교와 선택',
				details: [
					'카카오맵·네이버맵·T맵·구글맵의 웹 API를 비교했습니다.',
					'대중교통 경로 안내와 길찾기, 지도 스타일 변경 지원을 기준으로 Google Maps Platform을 선택했습니다.',
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
					'3인 팀에서 프론트엔드를 맡아 72시간 동안 화면을 개발하고 Swagger 문서를 기준으로 백엔드 API를 연결했습니다.',
					'구글 맵스 플랫폼 연동, 인터랙티브 UI 구현, 실시간 데이터 통합 등 프론트엔드 개발 전반을 담당했습니다.',
				],
			},
			{
				title: '팀 협업과 배포',
				details: [
					'프론트엔드 1명과 백엔드 2명이 함께 작업했습니다.',
					'Discord에서 주 3회 회의를 진행하고 Notion에 기획 내용을 정리했습니다.',
					'GitHub Actions·AWS·Docker로 자동 배포 환경을 구성했습니다.',
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
					'react-spring을 이용한 전체 글 개수의 슬롯머신 형태 애니메이션 구현.',
					'메인 페이지 캐러셀 컴포넌트 개발.',
					'콘텐츠 검색용 필터와 정렬 옵션 구현.',
					'페이지 번호 선택 후 해당 목록 상단으로 스크롤하는 동작 구현.',
				],
			},
			{
				title: 'Markdown 에디터 개발',
				details: [
					'실시간 미리보기를 지원하는 Markdown 에디터 개발.',
					'글 작성에 사용하는 프로젝트 전용 Markdown 문법 구현.',
				],
			},
			{
				title: '사이트 정보 Footer 개발',
				details: ['사이트 정보를 표시하는 Footer 컴포넌트 설계·구현.'],
			},
			{
				title: '테스트와 오류 모니터링',
				details: [
					'Jest 단위 테스트 작성과 Storybook을 통한 컴포넌트 상태·사용 방법 문서화.',
					'Sentry를 이용한 실행 중 오류 수집·조회 연결.',
				],
			},
			{
				title: 'DevOps 및 인프라 구축',
				details: [
					'AWS 서비스 실행 환경 구성.',
					'Jenkins CI/CD 파이프라인을 통한 통합·배포 자동화.',
					'Docker를 이용한 서비스 컨테이너화와 개발·운영 환경 구성.',
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
					'Next.js dynamic import로 게시글 내부 컴포넌트를 초기 코드에서 분리하고, 필요한 시점에 불러오도록 했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '확장 가능한 타이포그래피 시스템',
				details: [
					'Tailwind CSS에 공통 타이포그래피 스타일을 정의해 여러 화면에 적용했습니다.',
					'화면 크기에 따라 글자 크기를 조절하는 반응형 스타일을 적용했습니다.',
				],
			},
			{
				title: 'GitHub 스타일 기여도 그래프',
				details: [
					'사용자의 글쓰기 활동을 GitHub 기여도 그래프처럼 보여 주는 컴포넌트를 개발했습니다.',
					'마우스를 올리면 상세 정보를 보여주는 툴팁을 추가했습니다.',
				],
			},
			{
				title: '프론트엔드 팀 운영과 협업',
				details: [
					'프론트엔드·백엔드·디자인 각 5명으로 구성된 15인 팀에서 프론트엔드 팀장을 맡았습니다.',
					'Notion으로 작업을 문서화하고 Discord와 Slack으로 진행 상황과 결정 사항을 공유했습니다.',
					'주간 회의에서 진행 상황을 점검했습니다.',
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
					'React 19·Next.js 16 App Router 기반 Home·About·Work·Projects 페이지 개발.',
					'한국어·영어 콘텐츠 분리와 공통 컴포넌트 연결. 언어별 경로 구성.',
					'업무 사례·지원 문서를 공통 데이터로 관리. 웹 문서와 같은 디자인의 PDF 생성·직접 다운로드 구현.',
				],
			},
			{
				title: '테마와 프로젝트 탐색 인터랙션',
				details: [
					'Zustand·Tailwind CSS를 이용한 라이트·다크 테마 전환 구현.',
					'프로젝트 필터·상세 모달·이미지 확대 보기를 연결해 목록에서 구현 내용과 화면을 확인하도록 구성.',
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
				details: ['iOS 기준으로 개발된 화면의 Android 대응.'],
			},
			{
				title: '데이터베이스 관련',
				details: ['ERD를 이용한 데이터 관계 정리와 Firebase 저장 구조 설계.'],
			},
			{
				title: '게시판 전체 구현',
				details: [
					'게시글·댓글의 작성·조회·수정·삭제 구현.',
					'위치 기반 게시글 필터와 정렬 옵션 구현.',
				],
			},
			{
				title: '모달 및 토스트 제작',
				details: ['모달·토스트 메시지 컴포넌트 개발.'],
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
					'이미지 캐시를 적용해 한 번 불러온 이미지를 다시 사용하도록 했습니다.',
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
					'스크럼에서 작업 진행 상황을 공유하고 일정과 작업 분담을 조정했습니다.',
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
					'자세 유지 시간과 어긋난 시간을 기록하는 타이머 구현.',
					'자세별 타이머 동작 설계·구현.',
				],
			},
			{
				title: 'MediaPipe 통합 및 최적화',
				details: [
					'Linux 환경에서 MediaPipe AAR 빌드와 프로젝트 통합.',
					'MediaPipe 기반 몸·얼굴 움직임 측정 기능 개발.',
					'프로젝트 당시 OpenCV 구현 대비 5~10배의 프레임 처리 FPS 확인.',
				],
			},
			{
				title: '신체 측정 기능 구현',
				details: [
					'앉은 자세·플랭크 자세 판별 기능 구현.',
					'자세별 측정 페이지 설계·개발.',
				],
			},
			{
				title: '데이터베이스 구축',
				details: [
					'SQLite 기반 Room Library를 이용한 측정 기록 저장 구조 설계.',
					'DAO·Entity·Database를 나눈 데이터 조회·저장 구현.',
					'사용자 측정 데이터 저장·관리 기능 구현.',
				],
			},
		],

		troubleshooting: [
			{
				title: '멀티 스레드 최적화',
				details: [
					'Runnable 인터페이스와 스레드 클래스로 MediaPipe 처리 작업을 나눴습니다.',
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
				details: ['주 1-2회 회의에서 진행 상황을 공유하고 다음 작업을 정했습니다.'],
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
					'읽을 책과 지문 선택 기능 구현.',
					'STT로 인식한 음성과 제시된 책 구절을 비교하는 읽기 판별 기능 개발.',
					'책 한 권을 끝까지 읽는 화면 구성과 독서 완료 시간 기록.',
				],
			},
			{
				title: '데이터베이스 구축',
				details: [
					'SQLite 기반 Room Library를 이용한 측정 기록 저장 구조 설계.',
					'DAO·Entity·Database를 나눈 데이터 조회·저장 구현.',
					'읽은 책의 통계 데이터 저장·조회 구현.',
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
					'네트워크 연결 여부에 따라 두 음성 인식 방식을 전환하도록 했습니다.',
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
					'1인칭 슈팅·체력·점수 시스템 구현.',
					'컷씬·적 AI·아이템·엔딩 등 게임 콘텐츠 개발.',
					'Unity Asset Store 리소스를 활용한 게임 제작.',
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
					'사운드와 애니메이션의 실행 순서·설정을 수정했습니다.',
				],
			},
		],
		specialImplementations: [
			{
				title: '싱글톤 패턴 학습 및 적용',
				details: [
					'개발 중 싱글톤 패턴의 필요성을 인지하고 학습했습니다.',
					'싱글톤 패턴으로 게임 데이터와 핵심 기능을 관리했습니다.',
					'여러 곳에서 같은 데이터와 기능을 사용하도록 해 중복 코드를 줄였습니다.',
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
					'MediaPipe 기반 눈동자·얼굴 움직임 감지 기능 개발.',
					'감지 데이터를 이용한 집중 여부 판별 알고리즘 구현.',
					'집중력 감지 강도를 조절하는 설정 기능 추가.',
					'감지한 집중 상태에 따른 경고·안내 메시지 표시.',
				],
			},
			{
				title: 'MediaPipe 통합 및 최적화',
				details: ['Linux 환경에서 MediaPipe AAR 빌드와 프로젝트 통합.'],
			},
			{
				title: '데이터베이스 설계 및 구현',
				details: [
					'SQLite 기반 Room Library를 이용한 측정 기록 저장 구조 설계.',
					'DAO·Entity·Database를 나눈 데이터 조회·저장 구현.',
					'사용자 집중 시간 저장·관리 기능 구현.',
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
					'Runnable 인터페이스와 스레드 클래스로 얼굴 인식 작업을 나눴습니다.',
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
					'React 기반 웹 애플리케이션 개발.',
					'react-router-dom을 이용한 페이지 라우팅 구성.',
					'react-bootstrap 기반 반응형 화면 구현.',
					'메인·핫딜·검색 페이지의 레이아웃과 기능 개발.',
				],
			},
			{
				title: '백엔드 개발',
				details: [
					'Express 백엔드 설계·구현.',
					'Puppeteer 기반 핫딜 정보 수집 크롤러 개발.',
					'수만 건의 핫딜 데이터를 3~5분 내에 수집·가공하는 기능 구현.',
					'Firebase 기반 문서형 NoSQL 데이터베이스 설계·구축.',
				],
			},
			{
				title: '재사용 가능한 컴포넌트 개발',
				details: [
					'styled-components 기반 공통 상품 정보 컴포넌트 개발.',
					'각 ESD 사이트로 연결되는 상품 링크 구현.',
					'여러 페이지에서 같은 상품 정보 컴포넌트 재사용.',
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
				title: '일정과 작업 분담',
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
