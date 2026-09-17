import { LocaleDictionary, Localized } from '@/types/locale';
import { siteMetadata } from '@/data/meta/siteMetaData';

export const dictionaries: Localized<LocaleDictionary> = {
	ko: {
		metadata: {
			home: siteMetadata,
			about: {
				title: 'About | Ju-cheol Park',
				description: 'About page of Ju-cheol Park, Web & Mobile Developer',
			},
			work: {
				title: 'Work | Ju-cheol Park',
				description:
					'업무 정산, 회원·문의 기능 확장, 물류 출력과 AI 문서화 경험을 정리한 웹·모바일 개발자 박주철의 Work 페이지',
			},
			projects: {
				title: 'Projects | Ju-cheol Park',
				description: 'Projects page of Ju-cheol Park, Web & Mobile Developer',
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
			welcome: 'Jukrap의 개인 사이트에 오신 것을 환영합니다.',
			documentsTitle: '포트폴리오와 경력 문서를 확인해 보세요.',
			documentsDescription:
				'참여한 프로젝트와 경력, 맡았던 일을 문서별로 정리했습니다.',
			portfolioTitle: '웹 포트폴리오',
			portfolioDescription:
				'주요 업무의 기능과 구현 내용, 개인 프로젝트의 화면을 함께 볼 수 있습니다.',
			portfolioLinkLabel: '웹 포트폴리오 보기',
			resumeTitle: '이력서',
			resumeDescription: '경력과 기술, 주요 프로젝트를 간단히 정리했습니다.',
			resumeLinkLabel: '이력서 보기',
			careerBriefTitle: '경력기술서',
			careerBriefDescription: '업무별로 맡은 구현과 확인한 결과를 정리했습니다.',
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
					'React로 업무 화면을 개발하고 Spring Boot API와 Android 앱 연동도 맡고 있습니다.',
					'Excel 일괄 등록과 정산 관리, Bluetooth 프린터 연동을 구현했습니다. AI 문서화 도구를 개발하고 기존 웹과 모바일 앱도 유지보수하고 있습니다.',
				],
			},
			workSummary: {
				title: 'Work',
			},
			profileMessageDefault: '🤔 여기를 눌러보세요!',
			profileMessageFlipped: '👨‍💻 저를 데려가 주세요!',
		},
		work: {
			title: 'Work',
			intro:
				'업무용 웹과 모바일 앱을 개발하며 맡았던 일을 정리했습니다. 화면 개발과 함께 서버 API, 데이터 처리, Android 장비 연동도 담당했습니다.',
			indexTitle: '업무 사례',
			currentStory: '현재 업무',
			openTableOfContents: '목차 열기',
			closeTableOfContents: '목차 닫기',
			featuredTitle: '대표 업무',
			compactTitle: '함께 정리한 업무',
			compactIntro:
				'회원·문의 관리, 차트 편집, 외부 API 연동과 레거시 웹·앱 유지보수 업무입니다.',
			labels: {
				stack: '기술 환경',
				scope: '맡은 범위',
				context: '배경과 요구사항',
				decisions: '주요 구현',
				results: '동작 확인',
				additionalEvidence: '세부 구현 및 검증 기록',
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
				title: 'Ju-cheol Park | Web & Mobile Developer',
				description: "Web and mobile developer. This is Jukrap's website.",
				icons: {
					icon: '/favicon.ico',
				},
			},
			about: {
				title: 'About | Ju-cheol Park',
				description: 'About Ju-cheol Park, Web & Mobile Developer',
			},
			work: {
				title: 'Work | Ju-cheol Park',
				description:
					'Work by Ju-cheol Park, a Web & Mobile Developer, covering settlement workflows, member and inquiry features, logistics output, and AI documentation tools.',
			},
			projects: {
				title: 'Projects | Ju-cheol Park',
				description: 'Projects by Ju-cheol Park, Web & Mobile Developer',
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
			welcome: "Welcome to Jukrap's personal website.",
			documentsTitle: 'Explore my portfolio and career documents.',
			documentsDescription:
				'Projects, experience and contributions, presented in three Korean documents.',
			portfolioTitle: 'Korean Portfolio',
			portfolioDescription:
				'Features I built at work, along with personal project screens and implementation details.',
			portfolioLinkLabel: 'View Korean portfolio',
			resumeTitle: 'Résumé',
			resumeDescription:
				'A concise overview of my experience, skills and projects.',
			resumeLinkLabel: 'View Korean résumé',
			careerBriefTitle: 'Career brief',
			careerBriefDescription:
				'My implementation work and verification for each assignment.',
			careerBriefLinkLabel: 'View Korean career brief',
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
					'Developing React business interfaces, Spring Boot APIs and Android app integrations.',
					'Built Excel imports, billing and settlement features, and Bluetooth printer integrations. Also developing AI documentation tools and maintaining existing web and mobile apps.',
				],
			},
			workSummary: {
				title: 'Work',
			},
			profileMessageDefault: '🤔 Try clicking here!',
			profileMessageFlipped: '👨‍💻 Please take me with you!',
		},
		work: {
			title: 'Work',
			intro:
				'Features I built for business web and mobile apps, including interfaces, APIs, data processing and Android device integration.',
			indexTitle: 'Work Index',
			currentStory: 'Current story',
			openTableOfContents: 'Open table of contents',
			closeTableOfContents: 'Close table of contents',
			featuredTitle: 'Selected Work',
			compactTitle: 'Additional Work',
			compactIntro:
				'Further work in member services, administration, diagnostics, editing tools, and legacy maintenance.',
			labels: {
				stack: 'Technology stack',
				scope: 'Scope',
				context: 'Requirements',
				decisions: 'Implementation',
				results: 'Verification',
				additionalEvidence: 'Implementation and verification details',
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
