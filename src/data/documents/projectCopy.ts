import { decisionCases } from '@/data/decisionCases';
import type { Locale } from '@/types/locale';
import type { PortfolioPageImage } from '@/types/documents';
interface ProjectDocumentCopy {
	title: string;
	role: string;
	summary: string;
	problem: string;
	actions: { title: string; description: string }[];
	result: string;
	images: PortfolioPageImage[];
}
export const projectDocumentCopy: Record<
	Locale,
	Record<string, ProjectDocumentCopy>
> = {
	ko: {
		'captain-donghae': {
			title: 'C. Donghae',
			role: '3명 팀 / 프론트엔드 개발',
			summary:
				'동해선 이용객이 실시간 교통 정보와 주변 장소를 지도에서 확인할 수 있는 웹 서비스입니다.',
			problem:
				'72시간 안에 열차·날씨·주변 장소처럼 출처가 다른 정보를 지도 한 화면에 모으고 모바일 조작도 구현해야 했습니다.',
			actions: [
				{
					title: '지도와 데이터 연결',
					description:
						'백엔드 개발자 2명과 Swagger 명세를 기준으로 API를 연결했습니다. Google Maps로 구현한 지도 화면에서 교통 정보와 주변 장소를 확인할 수 있습니다.',
				},
				{
					title: '모바일 지도 조작',
					description:
						'지도를 보면서 장소 목록도 볼 수 있도록 바텀 시트를 만들었습니다. 드래그한 거리와 속도에 따라 목록 영역이 펼쳐지거나 접힙니다.',
				},
			],
			result: 'DIVE 2024 부산테크노파크원장상 수상(발제사 3등).',
			images: [
				{
					src: '/images/captain-donghae/image10.png',
					alt: '동해선장 지도와 장소 선택',
					layout: 'split',
				},
				{
					src: '/images/captain-donghae/image7.png',
					alt: '동해선장 주변 장소 목록',
					layout: 'split',
				},
			],
		},
		sharebby: {
			title: 'ShareBBy',
			role: 'React Native 앱 개발·Firebase 연동',
			summary:
				'취미 활동을 공유하고 함께할 사람을 찾는 앱입니다. Android 화면 대응과 게시글 / 댓글 등 커뮤니티 기능을 맡았습니다.',
			problem:
				'iOS에 맞춰 만든 화면을 Android에서도 사용할 수 있도록 고쳐야 했습니다. 게시글 이미지를 바꿔도 이전 이미지가 보이는 캐시 문제도 있었습니다.',
			actions: [
				{
					title: '커뮤니티 기능',
					description:
						'게시글 / 댓글의 작성 / 조회 / 수정 / 삭제 기능과 위치 필터 / 정렬을 제공합니다. 목록을 당겨 새로고침하거나 스크롤해 다음 게시글을 불러올 수 있습니다.',
				},
				{
					title: '데이터와 이미지 처리',
					description:
						'Firebase의 데이터 관계를 ERD로 정리하고, 게시글 이미지를 바꿔도 이전 이미지가 보이는 문제를 재현한 뒤 이미지 라이브러리를 교체했습니다.',
				},
			],
			result:
				'Android 화면과 커뮤니티 기능을 개발했고, 팀은 2024년에 앱을 App Store에 배포했습니다.',
			images: [
				{
					src: '/images/sharebby/image10.png',
					alt: 'ShareBBy 게시글 목록',
					layout: 'phone',
				},
				{
					src: '/images/sharebby/image15.png',
					alt: 'ShareBBy 게시글 편집 화면',
					layout: 'phone',
				},
			],
		},
		'ai-agent-playbook': {
			title: 'AI Agent Playbook',
			role: '1인 개발',
			summary:
				'AI 코딩 도구가 작업 세션이 바뀌어도 프로젝트 규칙과 이전 기록을 참고하도록 만든 개발 도구입니다. 필요한 스킬을 골라 설치하고, 기존 파일을 보존하면서 구성을 바꾸거나 복구할 수 있습니다.',
			problem: decisionCases.ko['ai-agent-playbook'].context,
			actions: decisionCases.ko['ai-agent-playbook'].points.map((point) => ({
				title: point.title,
				description: `${point.decision} ${point.verification}`,
			})),
			result: decisionCases.ko['ai-agent-playbook'].outcome,
			images: [],
		},
		itzip: {
			title: 'Itzip',
			role: '프론트엔드 팀장 / DevOps',
			summary:
				'개발자 취업 준비생을 위한 15명 팀 프로젝트입니다. 프론트엔드 팀장으로 블로그와 Markdown 편집 화면을 개발하고, 테스트·오류 모니터링·배포 환경을 구성했습니다.',
			problem:
				'편집 화면을 개발하면서 팀원들이 컴포넌트의 동작과 배포 후 오류를 함께 확인할 수 있어야 했습니다.',
			actions: [
				{
					title: 'Markdown 편집과 미리보기',
					description:
						'Markdown 편집기와 실시간 미리보기를 구현해 글을 작성하며 결과를 바로 확인할 수 있습니다. 프로젝트 전용 문법을 지원하고, 무거운 게시글 컴포넌트는 dynamic import로 분리해 필요할 때 불러옵니다.',
				},
				{
					title: '테스트와 오류 관측',
					description:
						'주요 동작은 Jest로 테스트했고, Storybook에는 컴포넌트의 상태와 사용법을 정리했습니다. 배포 후 오류는 Sentry에서 확인할 수 있습니다.',
				},
			],
			result:
				'블로그와 편집 화면을 구현해 팀이 테스트 / 컴포넌트 문서 / 오류 기록을 함께 확인할 수 있습니다. 실행 환경은 AWS에, 배포 환경은 Jenkins / Docker로 구성했습니다.',
			images: [
				{
					src: '/images/itzip/image6.png',
					alt: 'Itzip Markdown 편집 화면',
					caption: 'Markdown 편집과 미리보기',
					layout: 'wide',
				},
			],
		},
		'posture-teacher': {
			title: 'Posture Teacher',
			role: '2명 팀 / Android 개발',
			summary:
				'카메라 영상에서 몸의 주요 지점을 찾아 앉은 자세와 플랭크 자세를 판별하고, 자세를 유지한 시간을 기록하는 Android 앱입니다.',
			problem:
				'카메라 프레임을 계속 분석해도 화면 조작이 멈추지 않아야 했습니다. MediaPipe를 Android 앱에서 사용할 수 있게 빌드하는 작업도 필요했습니다.',
			actions: [
				{
					title: 'MediaPipe 통합과 자세 판별',
					description:
						'Ubuntu에서 MediaPipe를 Android 라이브러리(AAR)로 빌드해 앱에 통합했습니다. 영상에서 찾은 신체 지점 사이의 각도와 길이로 자세를 판별하고, 해당 자세를 유지한 시간을 계산합니다.',
				},
				{
					title: '프레임 분석 분리',
					description:
						'카메라 프레임 분석을 별도 스레드로 옮겨, 분석 중에도 사용자의 화면 조작을 처리할 수 있도록 했습니다.',
				},
			],
			result:
				'프로젝트 당시 OpenCV 기반 구현을 MediaPipe로 바꾼 뒤 초당 처리하는 카메라 프레임 수(FPS)가 이전 구현의 5~10배로 늘어난 것을 확인했습니다.',
			images: [
				{
					src: '/images/posture-teacher/image5.png',
					alt: 'Posture Teacher 분석 결과',
					caption: '자세 분석과 측정 기록',
					layout: 'phone',
				},
			],
		},
	},
	en: {
		'captain-donghae': {
			title: 'C. Donghae',
			role: 'Frontend developer / team of three',
			summary:
				'Built a map-based web service for Donghae Line passengers to find live transport and nearby information.',
			problem:
				'The team had 72 hours to combine train, weather, and local-place data in one map with mobile interactions.',
			actions: [
				{
					title: 'Maps and API integration',
					description:
						'Worked with two backend developers using Swagger documentation to connect APIs and build the main Google Maps screens.',
				},
				{
					title: 'Mobile map interaction',
					description:
						'Built a bottom sheet so users could browse places while keeping the map visible. The sheet expands or collapses according to drag distance and velocity.',
				},
			],
			result:
				'Won the Busan Technopark President Award at DIVE 2024, placing third in the challenge track.',
			images: [
				{
					src: '/images/captain-donghae/image10.png',
					alt: 'Captain Donghae map screen',
					layout: 'split',
				},
				{
					src: '/images/captain-donghae/image7.png',
					alt: 'Captain Donghae bottom sheet',
					layout: 'split',
				},
			],
		},
		sharebby: {
			title: 'ShareBBy',
			role: 'React Native app development and Firebase integration',
			summary:
				'Developed Android support and community features for an app that helps people share hobbies and find companions.',
			problem:
				'Screens initially built for iOS needed Android support, and stale image caches prevented updated post images from appearing.',
			actions: [
				{
					title: 'Community features',
					description:
						'Built post and comment creation, reading, editing and deletion, with location filters and sorting. Users can pull to refresh the list or scroll to load more posts.',
				},
				{
					title: 'Data and image handling',
					description:
						'Documented Firebase relationships in an ERD, reproduced the caching problem, and adopted a maintained replacement library.',
				},
			],
			result:
				'Delivered Android screens and community features. The team released the app on the App Store in 2024.',
			images: [
				{
					src: '/images/sharebby/image10.png',
					alt: 'ShareBBy post feed',
					layout: 'phone',
				},
				{
					src: '/images/sharebby/image15.png',
					alt: 'ShareBBy post editor',
					layout: 'phone',
				},
			],
		},
		'ai-agent-playbook': {
			title: 'AI Agent Playbook',
			role: 'Solo developer',
			summary:
				'Built a tool that helps AI coding tools refer to project rules and work history across sessions. Users can select skills to install, change the setup and recover it while preserving existing files.',
			problem: decisionCases.en['ai-agent-playbook'].context,
			actions: decisionCases.en['ai-agent-playbook'].points.map((point) => ({
				title: point.title,
				description: `${point.decision} ${point.verification}`,
			})),
			result: decisionCases.en['ai-agent-playbook'].outcome,
			images: [],
		},
		itzip: {
			title: 'Itzip',
			role: 'Frontend team lead / DevOps',
			summary:
				'Led frontend work in a 15-person project for aspiring developers. Built blog and Markdown editing screens and configured tests, error monitoring and deployment infrastructure.',
			problem:
				'The team needed a shared way to inspect component behavior and errors after deployment while building the editor.',
			actions: [
				{
					title: 'Markdown editing and previews',
					description:
						'Built a Markdown editor with live previews so writers could see the result as they typed. Supported project-specific syntax and loaded heavy post components on demand through dynamic imports.',
				},
				{
					title: 'Tests and error monitoring',
					description:
						'Tested key behavior with Jest, documented components in Storybook, and configured Sentry for post-deployment errors.',
				},
			],
			result:
				'Delivered blog and editor screens with shared tests, component documentation and error monitoring. Also configured the AWS runtime and deployment infrastructure with Jenkins and Docker.',
			images: [
				{
					src: '/images/itzip/image6.png',
					alt: 'Itzip Markdown editor',
					caption: 'Markdown editing and preview',
					layout: 'wide',
				},
			],
		},
		'posture-teacher': {
			title: 'Posture Teacher',
			role: 'Android developer / team of two',
			summary:
				'An Android app that finds body landmarks in camera frames, classifies sitting and plank posture, and records how long each posture is held.',
			problem:
				'Continuous frame analysis needed to remain separate from screen input, and MediaPipe had to be built for the Android project.',
			actions: [
				{
					title: 'MediaPipe integration and posture detection',
					description:
						'Built a MediaPipe AAR on Ubuntu and used landmark angles and lengths to classify posture and measure hold times.',
				},
				{
					title: 'Separate frame analysis',
					description:
						'Moved analysis to a separate thread so camera processing and screen input did not block each other.',
				},
			],
			result:
				'During the project, camera frame-processing throughput (FPS) with MediaPipe was 5–10 times that of the earlier OpenCV implementation.',
			images: [
				{
					src: '/images/posture-teacher/image5.png',
					alt: 'Posture Teacher analysis result',
					caption: 'Posture analysis and timing records',
					layout: 'phone',
				},
			],
		},
	},
};
