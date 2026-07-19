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
			documentsTitle: '필요한 문서를 바로 받을 수 있습니다.',
			documentsDescription:
				'이력서는 경력과 기술 요약을, 포트폴리오는 프로젝트와 업무 사례를 조금 더 자세히 담았습니다.',
			resumeTitle: '이력서',
			resumeDescription:
				'경력, 기술 스택, 핵심 이력을 빠르게 확인할 수 있는 문서입니다.',
			resumeDownload: 'resume.PDF',
			portfolioTitle: '포트폴리오',
			portfolioDescription:
				'프로젝트와 작업 내용을 사례 중심으로 정리한 문서입니다.',
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
					'신규 구축과 레거시 개선을 함께 다루며 상태, 라우팅, 출력, 검증 기준을 코드와 문서로 남겨둡니다.',
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
				'웹 화면부터 Android 장비와 운영 배포까지, 복잡한 흐름을 어떤 기준으로 나누고 검증했는지 대표 업무와 보조 경험으로 정리했습니다.',
			indexTitle: '업무 사례',
			currentStory: '현재 업무',
			openTableOfContents: '목차 열기',
			closeTableOfContents: '목차 닫기',
			featuredTitle: '대표 업무',
			compactTitle: '함께 정리한 업무',
			compactIntro:
				'기능 확장과 유지보수에서 변경 범위와 회귀 기준을 정리한 경험입니다.',
			labels: {
				stack: '기술',
				scope: '맡은 범위',
				context: '문제',
				decisions: '핵심 판단',
				results: '확인한 결과',
				takeaway: '남긴 기준',
				additionalEvidence: '세부 구현·검증 기록',
				problem: '문제',
				thinking: '판단',
				process: '실행',
				solution: '해결',
				impact: '성과',
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
			documentsTitle: 'Download the document you need.',
			documentsDescription:
				'The resume gives a quick career and skill summary. The portfolio adds project and professional work details.',
			resumeTitle: 'Resume',
			resumeDescription:
				'A concise document for checking career history, skills, and key experience.',
			resumeDownload: 'resume.PDF',
			portfolioTitle: 'Portfolio',
			portfolioDescription:
				'A case-oriented document covering projects and selected work in more detail.',
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
				'Selected work showing how I separated and verified complex flows across web screens, Android devices, and production delivery.',
			indexTitle: 'Work Index',
			currentStory: 'Current story',
			openTableOfContents: 'Open table of contents',
			closeTableOfContents: 'Close table of contents',
			featuredTitle: 'Selected Work',
			compactTitle: 'Additional Work',
			compactIntro:
				'Additional feature and maintenance work focused on change boundaries and regression baselines.',
			labels: {
				stack: 'Technology',
				scope: 'Scope',
				context: 'Problem',
				decisions: 'Key decision',
				results: 'Verified outcome',
				takeaway: 'Working principle',
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
