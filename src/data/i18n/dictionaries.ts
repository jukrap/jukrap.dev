import { LocaleDictionary, Localized } from '@/types/locale';
import { siteMetadata } from '@/data/meta/siteMetaData';

export const dictionaries: Localized<LocaleDictionary> = {
	ko: {
		metadata: {
			home: siteMetadata,
			about: {
				title: 'About | Ju-cheol Park',
				description: 'About page of Ju-cheol Park, Frontend Engineer',
			},
			projects: {
				title: 'Projects | Ju-cheol Park',
				description: 'Projects page of Ju-cheol Park, Frontend Engineer',
			},
		},
		navigation: {
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'About', href: '/about' },
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
				'🤖 *[ai-agent-playbook]*:__https://github.com/jukrap/ai-agent-playbook__ 저장소에는 AI 에이전트 스킬, AGENTS.md 템플릿, local-ai 작업 번들이 들어 있습니다. 한 번 써보시는 건 어떨까요?',
			close: '알림 닫기',
		},
		home: {
			welcome: 'Jukrap의 개인 사이트에 오신 것을 환영합니다.',
			portfolioQuestion: '혹시 저의',
			portfolioFile: '포트폴리오 파일',
			portfolioQuestionSuffix: '이 필요하신가요?',
			portfolioCtaPrefix: '그렇다면 아래의',
			portfolioCtaStrong: 'PDF 다운로드 버튼',
			portfolioCtaSuffix: '을 눌러주세요!',
			portfolioDownload: 'portfolio.PDF',
		},
		about: {
			title: 'About Me',
			skills: 'Skills',
			activity: 'Activity',
			awards: 'Awards',
			sideProjects: 'S.Projects',
			profileMessageDefault: '🤔 여기를 눌러보세요!',
			profileMessageFlipped: '👨‍💻 저를 데려가 주세요!',
		},
		projects: {
			title: 'Projects',
			description:
				'웹과 모바일 플랫폼에서 다양한 프로젝트를 진행했습니다. 각 프로젝트를 클릭하면 상세 내용을 확인하실 수 있습니다.',
			platforms: {
				All: 'All',
				Web: 'Web',
				Mobile: 'Mobile',
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
				title: 'Ju-cheol Park | Frontend engineer',
				description: "Frontend engineer. This is Jukrap's website.",
				icons: {
					icon: '/favicon.ico',
				},
			},
			about: {
				title: 'About | Ju-cheol Park',
				description: 'About page of Ju-cheol Park, Frontend Engineer',
			},
			projects: {
				title: 'Projects | Ju-cheol Park',
				description: 'Projects page of Ju-cheol Park, Frontend Engineer',
			},
		},
		navigation: {
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'About', href: '/about' },
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
				'🤖 *[ai-agent-playbook]*:__https://github.com/jukrap/ai-agent-playbook__ includes AI agent skills, AGENTS.md templates, and local-ai work bundles. Would you like to try it?',
			close: 'Close alert',
		},
		home: {
			welcome: "Welcome to Jukrap's personal website.",
			portfolioQuestion: 'Do you need my',
			portfolioFile: 'portfolio file',
			portfolioQuestionSuffix: '?',
			portfolioCtaPrefix: 'If so, please use the',
			portfolioCtaStrong: 'PDF download button',
			portfolioCtaSuffix: 'below.',
			portfolioDownload: 'portfolio.PDF',
		},
		about: {
			title: 'About Me',
			skills: 'Skills',
			activity: 'Activity',
			awards: 'Awards',
			sideProjects: 'S.Projects',
			profileMessageDefault: '🤔 Try clicking here!',
			profileMessageFlipped: '👨‍💻 Please take me with you!',
		},
		projects: {
			title: 'Projects',
			description:
				'I have worked on projects across web and mobile platforms. Select a project to view its details.',
			platforms: {
				All: 'All',
				Web: 'Web',
				Mobile: 'Mobile',
				Game: 'Game',
			},
		},
		projectDetail: {
			overview: 'Project Overview',
			info: 'Project Info',
			role: 'Role',
			teamSize: 'Team Size',
			teamSizeUnit: ' people',
			tasks: 'Major Work',
			troubleshooting: 'Troubleshooting',
			performance: 'Performance Improvements',
			special: 'Special Notes',
			screenshots: 'Project Screenshots',
			close: 'Close',
			detailView: 'View details',
		},
		webView: {
			openNewTab: 'Open in new tab',
			externalTitle: 'You are moving to an external website',
			externalDescription: (host) => `You can open ${host}.`,
			viewInWebView: 'View in webview',
		},
	},
};
