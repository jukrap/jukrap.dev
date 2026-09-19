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
				'동해선 이용객이 실시간 교통과 주변 정보를 한 지도에서 볼 수 있는 웹 서비스를 만들었습니다.',
			problem:
				'72시간 안에 열차·날씨·주변 장소처럼 출처가 다른 정보를 지도 한 화면에 모으고 모바일 조작도 구현해야 했습니다.',
			actions: [
				{
					title: '지도와 데이터 연결',
					description:
						'백엔드 개발자 2명과 협업하며 Swagger 문서를 기준으로 API를 연동하고 Google Maps 기반 주요 화면을 구현했습니다.',
				},
				{
					title: '모바일 지도 조작',
					description:
						'지도 위의 바텀 시트를 드래그 거리와 속도에 따라 펼치거나 접을 수 있도록 구현했습니다.',
				},
			],
			result: 'DIVE 2024에서 부산테크노파크원장상(발제사 3등)을 받았습니다.',
			images: [
				{
					src: '/images/captain-donghae/image1.png',
					alt: '동해선장 지도 메인 화면',
					layout: 'split',
				},
				{
					src: '/images/captain-donghae/image3.png',
					alt: '동해선장 바텀 시트',
					layout: 'split',
				},
			],
		},
		sharebby: {
			title: 'ShareBBy',
			role: 'React Native와 Firebase 개발',
			summary:
				'취미 활동을 공유하고 함께할 사람을 찾는 앱에서 Android 지원과 커뮤니티 기능을 개발했습니다.',
			problem:
				'iOS에 맞춰 만든 화면을 Android에서도 사용할 수 있도록 고쳐야 했습니다. 게시글 이미지를 바꿔도 이전 이미지가 보이는 캐시 문제도 있었습니다.',
			actions: [
				{
					title: '커뮤니티 기능',
					description:
						'게시글·댓글 작성과 수정, 위치 필터, 정렬, 당겨서 새로고침과 무한 스크롤을 구현했습니다.',
				},
				{
					title: '데이터와 이미지 처리',
					description:
						'Firebase 데이터의 관계를 ERD로 정리했습니다. 이미지 캐시 문제는 재현 후 유지보수가 이어지는 다른 라이브러리로 교체했습니다.',
				},
			],
			result:
				'Android 화면과 커뮤니티 기능을 구현했습니다. 팀 앱은 2024년 App Store에 배포됐습니다.',
			images: [
				{
					src: '/images/sharebby/image1.png',
					alt: 'ShareBBy 앱 화면',
					layout: 'phone',
				},
				{
					src: '/images/sharebby/image6.png',
					alt: 'ShareBBy 커뮤니티 화면',
					layout: 'phone',
				},
			],
		},
		'ai-agent-playbook': {
			title: 'AI Agent Playbook',
			role: '1인 개발',
			summary:
				'AI 코딩 도구가 프로젝트 규칙과 작업 기록을 이어서 참고하도록 하네스를 만들었습니다. 필요한 스킬을 선택해 설치하고, 기존 파일을 보존하며 전환·복구할 수 있습니다.',
			problem:
				'여러 저장소를 오가며 작업할 때 공통 기록과 저장소별 기록을 구분해야 했습니다. 스킬을 업데이트하면서 사용자가 수정한 파일을 덮어쓰거나, 설치 실패로 기존 구성을 잃지 않도록 해야 했습니다.',
			actions: [
				{
					title: '공유 기록과 읽기 전용 MCP',
					description:
						'등록한 저장소의 기록을 CLI와 MCP로 조회하도록 구현했습니다. 긴 결과는 나눠 읽고, 원문이 바뀌면 이전 조회를 이어 가지 않도록 했습니다.',
				},
				{
					title: '사용자 수정본 보존과 설치 복구',
					description:
						'소유권과 해시로 파일 변경을 확인하고 백업·복구 기록을 남겼습니다. 프로필 전환은 새 스킬 전체를 확인한 뒤에만 기존 항목을 정리하며, 삭제 직전에도 다시 검사합니다.',
				},
			],
			result:
				'npm과 GitHub에 공개하고, 설치와 사용법을 한국어와 영어로 정리했습니다. 설치 충돌·부분 실패·복구와 조회 범위·이어 읽기를 테스트하고 Windows·Ubuntu CI를 구성했습니다.',
			images: [],
		},
		itzip: {
			title: 'Itzip',
			role: '프론트엔드 팀장 / DevOps',
			summary:
				'15명 팀에서 블로그와 Markdown 편집 화면을 개발하고, 테스트와 배포 후 오류 모니터링을 도입했습니다.',
			problem:
				'편집 화면을 개발하면서 팀원들이 컴포넌트의 동작과 배포 후 오류를 함께 확인할 수 있어야 했습니다.',
			actions: [
				{
					title: 'Markdown 편집과 미리보기',
					description:
						'실시간 미리보기와 프로젝트 전용 Markdown 문법을 구현하고 무거운 컴포넌트는 dynamic import로 분리했습니다.',
				},
				{
					title: '테스트와 오류 관측',
					description:
						'Jest로 주요 동작을 점검하고 Storybook에 컴포넌트를 모았습니다. 배포 뒤 오류는 Sentry에서 확인하도록 구성했습니다.',
				},
			],
			result:
				'블로그와 편집 화면을 구현하고, 단위 테스트와 컴포넌트 문서, 배포 후 오류 확인 방법을 팀 개발 과정에 적용했습니다.',
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
				'카메라에 잡힌 신체 지점으로 자세를 판별하고 운동 시간을 기록하는 Android 앱입니다.',
			problem:
				'카메라 프레임을 계속 분석해도 화면 조작이 멈추지 않아야 했습니다. MediaPipe를 Android 앱에서 사용할 수 있게 빌드하는 작업도 필요했습니다.',
			actions: [
				{
					title: 'MediaPipe 통합과 자세 판별',
					description:
						'Ubuntu에서 MediaPipe AAR를 빌드해 앱에 통합하고 신체 지점의 각도와 길이로 자세와 유지 시간을 계산했습니다.',
				},
				{
					title: '프레임 분석 분리',
					description:
						'프레임 분석을 별도 스레드에서 실행해 분석 중에도 화면을 조작할 수 있도록 했습니다.',
				},
			],
			result:
				'프로젝트 당시 프레임 처리 FPS는 OpenCV 구현의 5~10배였습니다. 프레임 처리량을 비교한 측정입니다.',
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
						'Built a bottom sheet over the map that expands or collapses according to drag distance and velocity.',
				},
			],
			result:
				'Won the Busan Technopark President Award at DIVE 2024, placing third in the challenge track.',
			images: [
				{
					src: '/images/captain-donghae/image1.png',
					alt: 'Captain Donghae map screen',
					layout: 'split',
				},
				{
					src: '/images/captain-donghae/image3.png',
					alt: 'Captain Donghae bottom sheet',
					layout: 'split',
				},
			],
		},
		sharebby: {
			title: 'ShareBBy',
			role: 'React Native and Firebase development',
			summary:
				'Developed Android support and community features for an app that helps people share hobbies and find companions.',
			problem:
				'Screens initially built for iOS needed Android support, and stale image caches prevented updated post images from appearing.',
			actions: [
				{
					title: 'Community features',
					description:
						'Built post and comment editing, location filters, sorting, pull-to-refresh, and infinite scrolling.',
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
					src: '/images/sharebby/image1.png',
					alt: 'ShareBBy app screen',
					layout: 'phone',
				},
				{
					src: '/images/sharebby/image6.png',
					alt: 'ShareBBy community screen',
					layout: 'phone',
				},
			],
		},
		'ai-agent-playbook': {
			title: 'AI Agent Playbook',
			role: 'Solo developer',
			summary:
				'Built a harness that helps AI coding tools carry project rules and work history across sessions. Added selected skill installation, migration and recovery while preserving existing files.',
			problem:
				'Working across repositories required shared records to remain distinct from local history. Updating skills also had to preserve user edits and avoid losing a working setup after a failed installation.',
			actions: [
				{
					title: 'Shared records and read-only MCP',
					description:
						'Implemented CLI and MCP access to registered repositories’ records. Paginated long responses and rejected continuation after the underlying source changed.',
				},
				{
					title: 'Preserving edits and recovering installations',
					description:
						'Checked ownership and file hashes, keeping backups and recovery records. Profile migration requires every selected replacement to be valid and rechecks them before each removal.',
				},
			],
			result:
				'Published on npm and GitHub, with installation and usage documented in English and Korean. Tested installation conflicts, partial failures, recovery, query scope and continuation, and configured Windows/Ubuntu CI.',
			images: [],
		},
		itzip: {
			title: 'Itzip',
			role: 'Frontend team lead / DevOps',
			summary:
				'Built blog and Markdown editing screens in a 15-person team, adding tests and error monitoring to the development workflow.',
			problem:
				'The team needed a shared way to inspect component behavior and errors after deployment while building the editor.',
			actions: [
				{
					title: 'Markdown editing and previews',
					description:
						'Implemented live previews and project-specific Markdown syntax, splitting heavy components with dynamic imports.',
				},
				{
					title: 'Tests and error monitoring',
					description:
						'Tested key behavior with Jest, documented components in Storybook, and configured Sentry for post-deployment errors.',
				},
			],
			result:
				'Delivered blog and editor screens with unit tests, component documentation, and error monitoring.',
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
				'An Android app that classifies posture from body landmarks in camera frames and records exercise time.',
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
				'During the project, frame-processing FPS was 5–10 times that of the OpenCV implementation, measured as frame-processing throughput.',
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
