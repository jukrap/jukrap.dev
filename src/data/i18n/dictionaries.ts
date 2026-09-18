import { LocaleDictionary, Localized } from '@/types/locale';
import { siteMetadata } from '@/data/meta/siteMetaData';

export const dictionaries: Localized<LocaleDictionary> = {
	ko: {
		metadata: {
			home: siteMetadata,
			about: {
				title: 'About | Ju-cheol Park',
				description:
					'About Ju-cheol Park, a frontend developer working with React and TypeScript',
			},
			work: {
				title: 'Work | Ju-cheol Park',
				description:
					'React·TypeScript 업무 화면, 차트 편집, 성능 개선과 API 연동 경험을 정리한 프론트엔드 개발자 박주철의 Work 페이지',
			},
			projects: {
				title: 'Projects | Ju-cheol Park',
				description:
					'Web, mobile and developer-tool projects by frontend developer Ju-cheol Park',
			},
		},
		navigation: {
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'About', href: '/about' },
				{ label: 'Work', href: '/work' },
				{ label: 'Projects', href: '/projects' },
			],
			openMenu: '메뉴 열기',
			closeMenu: '메뉴 닫기',
			switchLanguage: '영어로 보기',
			languageName: 'EN',
			themeToLight: '라이트 모드',
			themeToDark: '다크 모드',
			themeToggle: '테마 전환',
		},
		alerts: {
			aiAgentPlaybook:
				'🤖 잠깐! 제가 만든 *[ai-agent-playbook]*:__https://github.com/jukrap/ai-agent-playbook__을 한 번 보고 가실 수 있을까요? 개인적으로 쓰는 AI 에이전트 스킬과 AGENTS.md 템플릿을 모아둔 저장소예요.',
			close: '알림 닫기',
		},
		home: {
			heroTitle: ['웹과 모바일을', '만듭니다.'],
			heroDescription:
				'새로운 기능을 만들고, 기존 서비스의 문제를 찾아 개선하는 웹&모바일 개발자입니다.',
			workLinkLabel: '맡았던 일 보기',
			documentsLinkLabel: '포트폴리오와 경력 문서',
			socialLinksLabel: '연락처와 외부 링크',
			pauseVideo: '영상 일시정지',
			playVideo: '영상 재생',
			documentsTitle: '포트폴리오와 경력 문서를 확인해 보세요.',
			documentsDescription:
				'참여한 프로젝트와 경력, 맡았던 일을 문서별로 정리했습니다.',
			portfolioTitle: '포트폴리오',
			portfolioDescription:
				'주요 업무의 기능과 구현 내용, 개인 프로젝트의 화면을 함께 볼 수 있습니다.',
			portfolioLinkLabel: '포트폴리오 보기',
			resumeTitle: '이력서',
			resumeDescription: '경력과 기술, 주요 프로젝트를 간단히 정리했습니다.',
			resumeLinkLabel: '이력서 보기',
			careerBriefTitle: '경력기술서',
			careerBriefDescription:
				'업무별 문제와 구현한 기능, 개선한 내용을 정리했습니다.',
			careerBriefLinkLabel: '경력기술서 보기',
		},
		about: {
			title: 'About Me',
			skills: 'Skills',
			career: 'Career',
			activity: 'Activity',
			awards: 'Awards',
			sideProjects: 'S.Projects',
			careerSummary: {
				company: '트리포스㈜',
				period: '2026.02 ~ Present',
				role: '웹·모바일 개발자',
				details: [
					'React와 TypeScript로 업무 화면을 개발하고, 공통 컴포넌트와 화면 상태를 설계합니다.',
					'물류 운영, 차트 편집, 정산과 관리 화면을 만들었습니다. 필요한 Spring Boot API와 Android 연동을 구현하고 기존 웹·앱도 개선합니다.',
				],
			},
			workSummary: {
				title: 'Work',
			},
			profileFlip: '프로필 사진 뒤집기',
			profileRestore: '원래 프로필 사진으로 돌아가기',
			profileMessageDefault: '다른 모습도 있어요.',
			profileMessageFlipped: '다시 누르면 돌아와요.',
		},
		work: {
			title: 'Work',
			intro:
				'React와 TypeScript로 만든 업무 화면과 개선 사례입니다. 화면 상태와 데이터 흐름, 성능을 다루고 필요한 API와 모바일 기능까지 연결했습니다.',
			indexTitle: '업무 사례',
			currentStory: '현재 업무',
			openTableOfContents: '목차 열기',
			closeTableOfContents: '목차 닫기',
			featuredTitle: '대표 업무',
			compactTitle: '함께 정리한 업무',
			compactIntro:
				'회원·문의 관리, AI 도구, 외부 API 연동과 기존 웹·앱의 개선 경험입니다.',
			labels: {
				stack: '기술 환경',
				scope: '맡은 범위',
				context: '배경과 요구사항',
				decisions: '주요 구현',
				results: '구현 결과',
				additionalEvidence: '구현 과정과 기술적 판단',
				problem: '배경',
				thinking: '설계 이유',
				process: '실행',
				solution: '구현 내용',
				impact: '주요 변경',
				checks: '확인',
			},
		},
		projects: {
			title: 'Projects',
			description:
				'웹, 모바일, 개발 도구 중심의 개인 프로젝트를 정리했습니다. 각 프로젝트를 클릭하면 상세 내용을 확인하실 수 있습니다.',
			platforms: {
				All: 'All',
				Web: 'Web',
				Mobile: 'Mobile',
				Tooling: 'Tooling',
				Game: 'Game',
			},
		},
		projectDetail: {
			overview: '프로젝트 개요',
			info: '프로젝트 정보',
			role: '담당 역할',
			teamSize: '팀 규모',
			teamSizeUnit: '명',
			tasks: '주요 작업',
			troubleshooting: '문제 해결',
			performance: '성능 개선',
			special: '특별 사항',
			screenshots: '프로젝트 스크린샷',
			close: '닫기',
			detailView: '상세 보기',
		},
		webView: {
			openNewTab: '새 탭에서 열기',
			externalTitle: '외부 웹사이트로 이동합니다',
			externalDescription: (host) => `${host}으로 이동할 수 있습니다`,
			viewInWebView: '웹뷰에서 보기',
		},
	},
	en: {
		metadata: {
			home: {
				title: 'Ju-cheol Park | Frontend Developer',
				description:
					'Frontend developer building React and TypeScript interfaces, with API and mobile integrations.',
				icons: {
					icon: '/favicon.ico',
				},
			},
			about: {
				title: 'About | Ju-cheol Park',
				description: 'About Ju-cheol Park, Frontend Developer',
			},
			work: {
				title: 'Work | Ju-cheol Park',
				description:
					'React and TypeScript interfaces, chart editing, performance improvements and API integrations by frontend developer Ju-cheol Park.',
			},
			projects: {
				title: 'Projects | Ju-cheol Park',
				description: 'Projects by Ju-cheol Park, Frontend Developer',
			},
		},
		navigation: {
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'About', href: '/about' },
				{ label: 'Work', href: '/work' },
				{ label: 'Projects', href: '/projects' },
			],
			openMenu: 'Open menu',
			closeMenu: 'Close menu',
			switchLanguage: 'View in Korean',
			languageName: 'KO',
			themeToLight: 'Light mode',
			themeToDark: 'Dark mode',
			themeToggle: 'Toggle theme',
		},
		alerts: {
			aiAgentPlaybook:
				'🤖 One quick ask: could you take a look at my *[ai-agent-playbook]*:__https://github.com/jukrap/ai-agent-playbook__? It collects my personal AI agent skills and AGENTS.md templates.',
			close: 'Close alert',
		},
		home: {
			heroTitle: ['Building for', 'web and mobile.'],
			heroDescription:
				'I build new features and find and fix problems in existing web and mobile services.',
			workLinkLabel: 'Explore my work',
			documentsLinkLabel: 'Portfolio & career documents',
			socialLinksLabel: 'Contact and external links',
			pauseVideo: 'Pause video',
			playVideo: 'Play video',
			documentsTitle: 'Explore my portfolio and career documents.',
			documentsDescription:
				'Projects, experience and contributions, presented in three documents.',
			portfolioTitle: 'Portfolio',
			portfolioDescription:
				'Features I built at work, along with personal project screens and implementation details.',
			portfolioLinkLabel: 'View portfolio',
			resumeTitle: 'Résumé',
			resumeDescription:
				'A concise overview of my experience, skills and projects.',
			resumeLinkLabel: 'View résumé',
			careerBriefTitle: 'Career brief',
			careerBriefDescription:
				'The problems I worked on, my contributions and the results.',
			careerBriefLinkLabel: 'View career brief',
		},
		about: {
			title: 'About Me',
			skills: 'Skills',
			career: 'Career',
			activity: 'Activity',
			awards: 'Awards',
			sideProjects: 'S.Projects',
			careerSummary: {
				company: 'Triphos',
				period: '2026.02 ~ Present',
				role: 'Web & Mobile Developer',
				details: [
					'Developing React and TypeScript business interfaces, shared components and UI state flows.',
					'Built logistics, chart editing, settlement and administration interfaces, with Spring Boot APIs and Android integrations where needed. Also improving existing web and mobile apps.',
				],
			},
			workSummary: {
				title: 'Work',
			},
			profileFlip: 'Flip profile photo',
			profileRestore: 'Restore profile photo',
			profileMessageDefault: 'There is another side.',
			profileMessageFlipped: 'Click again to return.',
		},
		work: {
			title: 'Work',
			intro:
				'Business interfaces built with React and TypeScript. These projects cover UI state, data flow and performance, with API and mobile integrations where needed.',
			indexTitle: 'Work Index',
			currentStory: 'Current story',
			openTableOfContents: 'Open table of contents',
			closeTableOfContents: 'Close table of contents',
			featuredTitle: 'Selected Work',
			compactTitle: 'Additional Work',
			compactIntro:
				'Further work in member services, AI tools, API integration, and existing web and mobile apps.',
			labels: {
				stack: 'Technology stack',
				scope: 'Scope',
				context: 'Requirements',
				decisions: 'Implementation',
				results: 'Results',
				additionalEvidence: 'Implementation details and decisions',
				problem: 'Problem',
				thinking: 'Decision',
				process: 'Execution',
				solution: 'Solution',
				impact: 'Impact',
				checks: 'Checks',
			},
		},
		projects: {
			title: 'Projects',
			description:
				'I have organized personal projects across web, mobile, and developer tooling. Select a project to view its details.',
			platforms: {
				All: 'All',
				Web: 'Web',
				Mobile: 'Mobile',
				Tooling: 'Tooling',
				Game: 'Game',
			},
		},
		projectDetail: {
			overview: 'Project Overview',
			info: 'Project Info',
			role: 'Role',
			teamSize: 'Team Size',
			teamSizeUnit: ' people',
			tasks: 'Key Work',
			troubleshooting: 'Troubleshooting',
			performance: 'Performance Improvements',
			special: 'Highlights',
			screenshots: 'Project Screenshots',
			close: 'Close',
			detailView: 'View details',
		},
		webView: {
			openNewTab: 'Open in new tab',
			externalTitle: 'External website',
			externalDescription: (host) => `Open ${host} in a new tab or webview.`,
			viewInWebView: 'View in webview',
		},
	},
};
