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
			work: {
				title: 'Work | Ju-cheol Park',
				description:
					'업무 웹, 모바일 앱, Android, 개발 도구 경험을 정리한 Ju-cheol Park의 Work 페이지',
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
			career: 'Career',
			activity: 'Activity',
			awards: 'Awards',
			sideProjects: 'S.Projects',
			careerSummary: {
				company: '트리포스㈜',
				period: '2026.02 ~ Present',
				role: '프론트엔드 엔지니어',
				details: [
					'React 기반 업무 화면, 모바일 WebView, Android 연동처럼 사용자 흐름과 시스템 경계가 맞물리는 영역을 설계하고 구현합니다.',
					'신규 구축과 레거시 개선을 함께 다루며 상태, 라우팅, 출력, 검증 기준을 코드와 문서로 남깁니다.',
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
				'웹, 모바일 앱, Android, 개발 도구 중심의 업무 경험을 정리했습니다. 각 항목에서는 맡은 범위와 기술 선택, 확인한 결과를 보실 수 있습니다.',
			indexTitle: 'Work Index',
			featuredTitle: 'Case Notes',
			compactTitle: 'Additional Work',
			labels: {
				stack: '사용 기술',
				scope: '범위',
				contribution: '맡은 일',
				outcome: '결과',
				verification: '검증',
			},
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
				description: 'About Ju-cheol Park, Frontend Engineer',
			},
			work: {
				title: 'Work | Ju-cheol Park',
				description:
					'Work by Ju-cheol Park, covering logistics web, mobile apps, Android, and developer tooling.',
			},
			projects: {
				title: 'Projects | Ju-cheol Park',
				description: 'Projects by Ju-cheol Park, Frontend Engineer',
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
			career: 'Career',
			activity: 'Activity',
			awards: 'Awards',
			sideProjects: 'S.Projects',
			careerSummary: {
				company: 'Triphos',
				period: '2026.02 ~ Present',
				role: 'Frontend Engineer',
				details: [
					'Designing and implementing user-facing flows across React business screens, mobile WebView, and Android integration.',
					'Handling both end-to-end builds and legacy improvements with clear state, routing, output, and verification baselines.',
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
				'I organized work experience across web, mobile apps, Android, and developer tooling. Each item shows scope, technical decisions, and verified results.',
			indexTitle: 'Work Index',
			featuredTitle: 'Case Notes',
			compactTitle: 'Additional Work',
			labels: {
				stack: 'Stack',
				scope: 'Scope',
				contribution: 'Contribution',
				outcome: 'Outcome',
				verification: 'Verification',
			},
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
