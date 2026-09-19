import { links as aboutLinks } from '@/data/about/links';
import { activities } from '@/data/about/activities';
import { awards } from '@/data/about/awards';
import { coreValues } from '@/data/about/coreValues';
import { greetings } from '@/data/about/greetings';
import { personalInfo } from '@/data/about/personalInfo';
import { skills } from '@/data/about/skills';
import { links as footerLinks } from '@/data/footer/links';
import { links as homeLinks } from '@/data/home/links';
import { projectsDetailData } from '@/data/projectsDetailData';
import { projectsData } from '@/data/projectsData';
import { workStories } from '@/data/workStories';
import { Localized, PortfolioData } from '@/types/locale';
import { Project, SimpleProject } from '@/types/project';
import { playImplementation } from '@/data/playImplementation';

type ProjectTranslation = Pick<
	Project,
	'title' | 'subtitle' | 'overview' | 'tasks'
> &
	Partial<
		Pick<
			Project,
			| 'troubleshooting'
			| 'performanceImprovements'
			| 'specialImplementations'
			| 'implementation'
		>
	>;

type SimpleProjectTranslation = Pick<
	SimpleProject,
	'title' | 'introduction' | 'description'
>;

const simpleProjectTranslations: Record<string, SimpleProjectTranslation> = {
	'captain-donghae': {
		title: 'Captain Donghae',
		introduction: 'A real-time guide service for Donghae Line passengers.',
		description: [
			'Frontend development',
			'Google Maps-based map service development',
			'Real-time station congestion, weather, restaurants, and route recommendations',
			'Draggable modal UI/UX implementation',
			'Won the Busan Technopark President Award (3rd place in the challenge track) at DIVE 2024',
		],
	},
	itzip: {
		title: 'Itzip',
		introduction:
			'A comprehensive job-preparation web service for aspiring developers.',
		description: [
			'Frontend development and DevOps',
			'Blog feature development',
			'Test-based development and error monitoring',
		],
	},
	'jukrap-website': {
		title: 'Jukrap Website',
		introduction:
			'A personal website for work experience, projects, and career documents.',
		description: [
			'Solo development',
			'Built with React 19 and the Next.js 16 App Router',
			'Korean and English content with web and print layouts for career documents',
			'Theme switching, project details, and an image viewer',
			'Home video playback controls with a still-image fallback',
		],
	},
	'ai-agent-playbook': {
		title: 'AI Agent Playbook',
		introduction:
			'A personal developer tool for reusing AI agent working rules and project memory.',
		description: [
			'Solo development',
			'Organized a CLI, reusable skills, templates, and project playbook structure',
			'Built MCP-based read tools and operator check/search flows',
			'Published as an npm package and GitHub repository',
		],
	},
	sharebby: {
		title: 'ShareBBy',
		introduction:
			'A cross-platform app for sharing and joining hobby activities.',
		description: [
			'Frontend and backend development',
			'Owned the full community feature area',
			'Built reusable toast and modal components',
			'Improved image resizing and caching',
			'Applied pull-to-refresh and infinite scroll',
			'Designed the database structure',
		],
	},
	'posture-teacher': {
		title: 'Posture Teacher',
		introduction:
			'An app that detects sitting and exercise posture and displays the results.',
		description: [
			'Team lead and Android developer',
			'Owned sitting and exercise posture detection pages',
			'Built posture detection and MediaPipe extraction features',
			'Multi-threading and optimization',
		],
	},
	chatterbox: {
		title: 'Chatterbox',
		introduction: 'A voice-based app that recognizes reading aloud.',
		description: [
			'Solo development',
			'Used Android built-in Speech-to-Text while offline',
			'Used Google Cloud Platform Speech-to-Text while online',
		],
	},
	'labyrinth-escape-game': {
		title: 'Labyrinth Escape Game',
		introduction:
			'A first-person shooter game where the player escapes a labyrinth.',
		description: [
			'Solo development',
			'Used Unity Asset Store resources',
			'Developed around a singleton pattern',
		],
	},
	mytime: {
		title: 'MyTime',
		introduction:
			'A timer app that detects and records focus using facial movement.',
		description: [
			'Team lead and Android developer',
			'Owned face-detection-based focus determination pages',
			'Built face detection and MediaPipe extraction features',
		],
	},
	'esd-hotdeal': {
		title: 'ESD HotDeal',
		introduction: 'A web service that aggregates hot-deal data from many ESDs.',
		description: [
			'Team lead, frontend, and backend development',
			'Owned the main page and detail page work',
			'Built reusable product information components',
			'Backend work with Express and Firebase',
			'Won the top prize at the Gyeongnam Software Competition',
		],
	},
};

const projectDetailTranslations: Record<string, ProjectTranslation> = {
	'captain-donghae': {
		title: 'Captain Donghae',
		subtitle: 'Captain Donghae',
		overview:
			'A comprehensive guide web service for Donghae Line passengers, providing real-time information, public-transit routes, running and cycling route recommendations, and nearby restaurant information.',
		tasks: [
			{
				title: 'Built a Donghae Line service on Google Maps Platform',
				details: [
					'Compared map APIs for public-transit routing and marker customization, then selected Google Maps Platform.',
					'Implemented dynamic maps with Maps JavaScript API, place search with Places API, public-transit directions with Directions API, and address conversion with Geocoding API.',
					'Provided static map images with Static Maps API and implemented real-time location tracking through Geolocation API integration.',
				],
			},
			{
				title: 'Integrated external APIs and built data services',
				details: [
					'Modularized API calls with axios and used Next.js API Routes to integrate Google Maps APIs, weather, station information with live congestion, running and cycling courses, and restaurant information.',
					'Handled latitude, longitude, pagination, and category filters as request parameters and added API error handling.',
				],
			},
			{
				title: 'Designed component architecture and developed UI',
				details: [
					'Applied a composition pattern to design shared components with base behavior and specific components that extend them.',
					'Used Storybook for component-driven development so each component could be built systematically in both behavior and design.',
					'Used layered folders and clear naming so relationships between shared and extended components were easy to understand.',
					'Separated behavior and styling concerns to establish flexible, reusable component structure.',
				],
			},
			{
				title: 'Implemented an interactive modal component',
				details: [
					'Built smooth bottom-sheet animation and gesture interaction directly with react-spring and use-gesture.',
					'Implemented step-based positions from drag distance and speed, including 10%, 30%, 60%, 85%, and 92%, for intuitive interaction.',
					'Managed scroll and drag state together so interaction stayed natural.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved Next.js API routing path errors',
				details: [
					'A 404 error occurred when integrating an external Weather API because API route paths did not match in the Next.js App Router.',
					'Adjusted the route.ts location, naming, and folder structure to match Next.js 13 App Router conventions and improved request parameter handling.',
					'Strengthened error handling and logging so similar issues could be debugged faster later.',
				],
			},
			{
				title: 'Selected and implemented map service APIs',
				details: [
					'Compared web capabilities across domestic and global map APIs, including Kakao Maps, Naver Maps, T Map, and Google Maps.',
					'Evaluated support for transit APIs, directions APIs, and custom styling, then selected Google Maps Platform as the best fit.',
					'Connected Maps JavaScript API, Directions API, Places API, and Static Maps API to map display, directions, and place search.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Awarded at the DIVE 2024 Global Data Hackathon',
				details: [
					'Won the Busan Technopark President Award (3rd place in the challenge track) at the DIVE 2024 Global Data Hackathon hosted by Busan Metropolitan City and organized by Busan Technopark.',
					'Built Captain Donghae, a guide service for Donghae Line passengers using Korea Railroad Corporation data.',
					'Participated as the only frontend developer in a three-person team and implemented frontend development plus backend API integration based on Swagger documentation within 72 hours.',
					'Owned frontend development across Google Maps Platform integration, interactive UI, and real-time data integration.',
				],
			},
			{
				title: 'Built an efficient team collaboration system',
				details: [
					'Set up communication practices for a team with one frontend developer and two backend developers.',
					'Used Discord for three weekly meetings and Notion for planning documentation to manage the project systematically.',
					'Configured an automated deployment environment with GitHub Actions, AWS, and Docker.',
				],
			},
		],
	},
	itzip: {
		title: 'Itzip',
		subtitle: 'Itzip',
		overview:
			'A comprehensive job-preparation platform for aspiring developers, providing blogs, tests, job information, and related web features.',
		tasks: [
			{
				title: 'Implemented the blog system',
				details: [
					'Used react-spring to animate the total post count in a slot-machine style.',
					'Built a custom carousel component for the main page.',
					'Provided multiple filtering and sorting options so users could find desired content easily.',
					'Improved pagination usability by automatically scrolling to the top when a page number was selected.',
				],
			},
			{
				title: 'Developed a Markdown editor',
				details: [
					'Implemented a Markdown editor with real-time preview.',
					'Added support for custom Markdown syntax.',
				],
			},
			{
				title: 'Developed the site information footer',
				details: [
					'Designed and implemented the website footer component.',
					'Included additional site-related information in the footer.',
				],
			},
			{
				title: 'Improved code quality',
				details: [
					'Wrote unit tests with Jest and documented component states and usage in Storybook.',
					'Connected Sentry to collect and inspect runtime errors.',
				],
			},
			{
				title: 'Built DevOps and infrastructure',
				details: [
					'Configured the service runtime environment on AWS.',
					'Configured a CI/CD pipeline with Jenkins to automate continuous integration and deployment.',
					'Containerized the service with Docker and configured development and operating environments.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Prevented duplicate blog view counts',
				details: [
					'Repeated views by the same user in a short period could inflate view counts.',
					'Improved counting so views increased only after a user stayed on the page for more than 10 seconds.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Image optimization',
				details: [
					'Used Next.js Image to display images and manage their sizing and loading.',
				],
			},
			{
				title: 'Code splitting with dynamic imports',
				details: [
					'Loaded components inside posts dynamically with Next.js dynamic imports.',
					'Separated components inside posts from the initial code and loaded them when needed.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Scalable typography system',
				details: [
					'Extended Tailwind CSS to build a consistent typography system across the project.',
					'Developed responsive font scaling logic so font sizes could adjust by screen size.',
				],
			},
			{
				title: 'GitHub-style contribution graph',
				details: [
					'Built a custom component similar to GitHub contribution graphs to visualize user writing activity.',
					'Added hover tooltips so users could view more detailed information.',
				],
			},
			{
				title: 'Efficient team collaboration system',
				details: [
					'Served as frontend team lead in a 15-person team with five frontend developers, five backend developers, and five designers.',
					'Documented tasks in Notion and shared progress and decisions through Discord and Slack.',
					'Shared project status through weekly meetings and continuously improved code quality.',
					'Worked with designers and backend developers using Figma designs and Swagger API specifications.',
				],
			},
		],
	},
	'jukrap-website': {
		title: "Jukrap's Personal Website",
		implementation: playImplementation.en,
		subtitle: 'Jukrap Website',
		overview:
			'A personal website presenting work experience, personal projects, a portfolio, a résumé, and a career brief.',
		tasks: [
			{
				title: 'Localized pages and career content',
				details: [
					'Built Home, About, Work, and Projects pages with React 19 and the Next.js 16 App Router.',
					'Kept Korean and English content separate and connected both to shared components and localized routes.',
					'Managed work cases and career documents as data, with layouts for reading on the web and printing.',
				],
			},
			{
				title: 'Themes and project navigation',
				details: [
					'Implemented light and dark themes with Zustand and Tailwind CSS.',
					'Connected project filters, detail modals, and an image viewer so visitors can move from the list to implementation details and screenshots.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Controlled when the home video plays',
				details: [
					'Paused the home video when it leaves the viewport or the tab is hidden, while preserving a manual pause across scrolling.',
					'Used a still image for reduced-motion or data-saving preferences and kept the introduction readable if the video fails to load.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Image requests sized for their display area',
				details: [
					'Used Next.js Image to request images suited to the screen size and assigned different loading priorities to the hero image and project images further down the page.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'A shared hook for the typing effect',
				details: [
					'Applied useTypingEffect to the About greeting with configurable typing speed and delays between phrases.',
				],
			},
		],
	},
	'ai-agent-playbook': {
		title: 'AI Agent Playbook',
		subtitle: 'Personal AI agent harness',
		overview:
			'A personal developer tool for reusing working rules, skills, templates, and check commands when AI agents work inside software repositories.',
		tasks: [
			{
				title: 'Built the CLI and runtime harness',
				details: [
					'Built a Node.js CLI that can run through npx or a global command.',
					'Separated bootstrap, checks, and search flows into explicit commands so a target project can be inspected and dry-run output can be reviewed first.',
					'Created a project playbook structure for keeping project-specific working rules and current context under `.ai-agent-playbook/`.',
				],
			},
			{
				title: 'Organized reusable skills and templates',
				details: [
					'Separated recurring work such as repository onboarding, UI quality, review, Git, and legacy maintenance into short skill documents.',
					'Organized templates for root rules, project memory, run ledgers, and contract notes into dedicated directories.',
					'Kept English source documents and Korean reading copies separate so public docs and personal usage could evolve together.',
				],
			},
			{
				title: 'Added MCP-based read tools',
				details: [
					'Added an MCP server entry so AI apps can read local repository context, search results, and check results through named tools.',
					'Kept the default MCP surface read-only, while file-writing flows stay behind explicit CLI commands and dry-run checks.',
					'Made operator check/search/research flows usable from both the CLI and MCP surfaces.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Kept execution explicit instead of fully automatic',
				details: [
					'Designed the tool so a user runs a command, reviews the result, and then decides whether to apply changes instead of letting an agent write to a repository immediately.',
					'Kept installation, skill copying, project playbook bootstrap, and MCP registration as separate actions to make the tool easier to reason about.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Published package and documentation',
				details: [
					'Published the project as an npm package and GitHub repository so it can be checked with `npx ai-agent-playbook`.',
					'Documented Quick Start, Command Guide, and install/uninstall flows so first-time users can tell what each command does and whether it writes files.',
				],
			},
		],
	},
	sharebby: {
		title: 'ShareBBy',
		subtitle: 'ShareBBy',
		overview:
			'A cross-platform app that provides a platform for sharing and joining various hobby activities.',
		tasks: [
			{
				title: 'Android work',
				details: ['Adjusted and improved an iOS-oriented app for Android.'],
			},
			{
				title: 'Database work',
				details: [
					'Created an ERD to define data relationships and designed the Firebase structure.',
				],
			},
			{
				title: 'Implemented the full board feature',
				details: [
					'Built convenient create, read, update, and delete flows for posts and comments.',
					'Implemented location-based post filtering and multiple sorting options.',
				],
			},
			{
				title: 'Built modals and toasts',
				details: ['Created various modal and toast messages.'],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved image caching issues',
				details: [
					'Identified excessive traffic and slow loading caused by the default React Native image component.',
					'Attempted to apply fast-image, but used faster-image as an alternative because fast-image was no longer actively updated.',
					'Applied the faster-image cache to image loading.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Image optimization',
				details: [
					'Resized images to fit mobile screens.',
					'Improved image loading through resizing and caching.',
				],
			},
			{
				title: 'Board and comment performance improvements',
				details: [
					'Implemented pull-to-refresh to refresh lists and infinite scroll to load subsequent results.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Real-time features with Firebase',
				details: [
					'Implemented real-time comments, likes, and multi-image features using Firebase Realtime Database.',
				],
			},
			{
				title: 'Location-based post filtering',
				details: [
					'Implemented filtering so users could see posts near their current location.',
				],
			},
			{
				title: 'Collaboration tools',
				details: [
					'Used Scrum practices to coordinate communication, development work, and schedules.',
					'Shared tasks in Notion and Slack and reviewed code and design changes in GitHub and Figma.',
				],
			},
		],
	},
	'posture-teacher': {
		title: 'Posture Teacher',
		subtitle: 'Posture Teacher',
		overview:
			'An app that assesses sitting and plank posture from body-point angles and lengths and displays the measurements.',
		tasks: [
			{
				title: 'Implemented timer features',
				details: [
					'Implemented timers to record correct posture duration and misaligned duration.',
					'Designed and implemented separate timer systems for each posture.',
				],
			},
			{
				title: 'Integrated and optimized MediaPipe',
				details: [
					'Built MediaPipe AAR in a Linux environment and integrated it into the project.',
					'Developed a solution that measured body and face movement using MediaPipe.',
					'Observed 5–10 times higher FPS than the OpenCV implementation during the project.',
				],
			},
			{
				title: 'Implemented body measurement features',
				details: [
					'Implemented features to measure correctness of sitting and plank posture.',
					'Designed and developed measurement pages for each posture.',
				],
			},
			{
				title: 'Built the database',
				details: [
					'Designed measurement-record storage with the SQLite-based Room Library.',
					'Separated DAO, Entity, and Database structures for reading and storing data.',
					'Implemented a system to store and manage user measurement data effectively.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Multi-threading optimization',
				details: [
					'Reduced MediaPipe load with multi-threading based on Runnable interfaces and thread classes.',
					'Improved usability on older phones and resolved UI responsiveness problems.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved build environment issues',
				details: [
					'Docker and MSYS2 use was interrupted by older CPU and GPU related issues.',
					'Successfully completed MediaPipe build work in an Ubuntu environment.',
				],
			},
			{
				title: 'Improved FPS',
				details: [
					'Observed a 5–10-fold FPS increase after switching from OpenCV to MediaPipe during the project.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Project results',
				details: [
					'Passed the preliminary round and advanced to the finals at the Gyeongnam Software Competition.',
					'Later deployed the app to Google Play Store.',
				],
			},
			{
				title: 'Agile Scrum-based project process',
				details: [
					'Shared development progress and set next goals through one or two regular meetings each week.',
				],
			},
		],
	},
	chatterbox: {
		title: 'Chatterbox',
		subtitle: 'Chatterbox',
		overview:
			'An app that provides Korean reading text for children, detects the child reading aloud, and determines whether the reading was correct.',
		tasks: [
			{
				title: 'Implemented book selection and reading features',
				details: [
					'Implemented a feature for selecting text elements such as books.',
					'Used STT to recognize voice and determine whether the child correctly read the passage provided by the app.',
					'Supported continued reading until the end of a book and measured time taken to complete reading.',
				],
			},
			{
				title: 'Built the database',
				details: [
					'Designed and built an efficient database structure with SQLite-based Room Library.',
					'Separated DAO, Entity, and Database structures for reading and storing data.',
					'Implemented features to store and query statistics related to read books.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Android version management and legacy adaptation',
				details: [
					'Learned Android version management while applying Google Cloud Platform in an Android environment.',
					'Learned and applied ways to force legacy elements through build-file changes.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Speech-to-Text based on network status',
				details: [
					'Used Android built-in STT while offline.',
					'Configured Google Cloud Platform STT while online.',
					'Allowed the core app feature to work even in offline situations.',
				],
			},
		],
	},
	'labyrinth-escape-game': {
		title: 'Labyrinth Escape Game',
		subtitle: 'Labyrinth Escape Game',
		overview:
			'A first-person shooter game built with Unity, where the goal is to escape a labyrinth.',
		tasks: [
			{
				title: 'Developed game systems and content',
				details: [
					'Implemented game systems such as first-person shooting, health, and score.',
					'Developed game content including cutscenes, enemy AI, items, and endings.',
					'Used Unity Asset Store resources to shorten development time.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved prefab-related issues',
				details: [
					'Prefab loss occurred because of insufficient understanding of prefab features.',
					'Learned prefab concepts and usage, then applied them to prevent the same issue.',
				],
			},
			{
				title: 'Fixed sound and animation errors',
				details: [
					'The game sometimes stopped because sound did not play or animation errors occurred.',
					'Checked and corrected execution order and settings to resolve the errors.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Learned and applied the singleton pattern',
				details: [
					'Recognized the need for a singleton pattern during development and studied it.',
					'Used the singleton pattern to manage game data and core features efficiently.',
					'Experienced benefits such as reduced duplication and better consistency.',
				],
			},
		],
	},
	mytime: {
		title: 'MyTime',
		subtitle: 'MyTime',
		overview:
			'An Android timer app that uses facial movement to detect focus and provides status-based guidance and statistics.',
		tasks: [
			{
				title: 'Implemented focus detection',
				details: [
					'Developed a system that detects eye and face movement using MediaPipe.',
					'Implemented an algorithm that analyzes detected data and determines focus state.',
					'Added settings to adjust detection sensitivity for a personalized experience.',
					'Implemented a system that provides appropriate warnings and guidance based on focus state.',
				],
			},
			{
				title: 'Integrated and optimized MediaPipe',
				details: [
					'Built MediaPipe AAR directly in a Linux environment and integrated it into the project.',
				],
			},
			{
				title: 'Designed and implemented the database',
				details: [
					'Designed and built an efficient database structure with SQLite-based Room Library.',
					'Separated DAO, Entity, and Database structures for reading and storing data.',
					'Implemented a system to store and manage user focus-time data effectively.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Switched from OpenCV to MediaPipe',
				details: [
					'The initial OpenCV and NDK implementation had a low frame rate.',
					'Replaced the OpenCV implementation with MediaPipe.',
					'Observed FPS increase from under 10 to over 30 during the project.',
				],
			},
			{
				title: 'Multi-threading optimization',
				details: [
					'Identified UI thread blocking caused by MediaPipe.',
					'Resolved the problem with multi-threading based on Runnable interfaces and thread classes.',
					'Maintained UI responsiveness while enabling real-time face recognition processing.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Agile-based team collaboration and project management',
				details: [
					'Used GitHub to manage the team project efficiently.',
					'Communicated continuously with teammates to clarify project goals and regularly check whether each role was moving in the right direction.',
					'Applied agile practices to parts of this process.',
				],
			},
		],
	},
	'esd-hotdeal': {
		title: 'ESD HotDeal',
		subtitle: 'ESD HotDeal',
		overview:
			'A web service that collects and provides discount and free software lists from multiple ESDs.',
		tasks: [
			{
				title: 'Frontend development',
				details: [
					'Implemented a dynamic web application based on React.',
					'Configured routing between pages with react-router-dom.',
					'Implemented responsive design with react-bootstrap.',
					'Built layouts and features for key pages such as main, hot deal, and search pages.',
				],
			},
			{
				title: 'Backend development',
				details: [
					'Designed and implemented the backend with Express.',
					'Developed a web crawler with Puppeteer to collect hot-deal information.',
					'Implemented a system that crawled and processed tens of thousands of hot-deal records within three to five minutes.',
					'Designed and built a document-based NoSQL database with Firebase.',
				],
			},
			{
				title: 'Developed reusable components',
				details: [
					'Built reusable product information components used across multiple pages with styled-components.',
					'Implemented components with hyperlinks to each ESD site.',
					'Reused the same product-information component across multiple pages.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved static web hosting issues',
				details: [
					'Encountered deployment issues while initially using GitHub Pages for the React SPA.',
					'Moved the deployment to another hosting service.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Project result',
				details: ['Won the top prize at the Gyeongnam Software Competition.'],
			},
			{
				title: 'Efficient collaboration system',
				details: [
					'Set weekly sprints to define short-term goals and respond quickly through fast feedback cycles.',
					'Used stand-up meetings to share progress and identify blockers early.',
					'Completed the project successfully through structured schedule management and efficient task distribution, even after the team was reduced to two people.',
				],
			},
		],
	},
};

const personalInfoEn = {
	...personalInfo,
	introduction: "I'm Ju-cheol Park, a web and mobile developer.",
};

const coreValuesEn = [
	{
		title: 'I build interfaces around the way people work.',
		content:
			'I have built business web applications with React and TypeScript, covering search, reservations, Excel imports and label printing. I made shared components for recurring tables and forms and connected API data to screens and printing. I handle failed saves and retries so users do not lose their input.',
	},
	{
		title: 'I separate server data from editing state in the UI.',
		content:
			'I used TanStack Query to manage data fetching and list refreshes after saves, keeping selected items and modal visibility separate. In the settlement ERP, I also separated saved values from editing drafts so users retained their input after a failed save.',
	},
	{
		title: 'I look beyond the interface to the systems it connects to.',
		content:
			'I have also developed Spring Boot APIs and integrated Android printing. For Bluetooth printing, I checked WebView requests, Android permissions and device SDK calls, then verified physical label output. When an issue appears in the interface, I examine API responses and native behavior as well to find its cause.',
	},
];

const activitiesEn = [
	{
		id: 'study-groups',
		title: 'Study Group Organizer',
		period: '2024.05 ~ 2025.06',
		role: 'Coding-test and development knowledge study groups',
		details: [
			'Operated two study groups covering coding tests and development knowledge.',
		],
	},
	{
		id: 'programmers-devcourse-assistant-mentor',
		title: 'Programmers Dev Course',
		period: '2024.05 ~ 2024.09',
		role: 'Cloud Application Engineering Course - Assistant Mentor',
		details: [
			'After being selected as an excellent graduate in a previous cohort, I mentored students in the second cohort of the course.',
			'Mentoring topics included weekly development information sharing, graduate concerns, daily scrum participation, development problem solving, and project checks.',
		],
	},
	{
		id: 'programmers-devcourse-student',
		title: 'Programmers Dev Course',
		period: '2023.12 ~ 2024.05',
		role: 'Cloud Application Engineering Course - Student',
		details: [
			'Completed a Cloud Application Engineering course focused on React and React Native development.',
			'Training focus: React and React Native.',
		],
	},
	{
		id: 'study-mentor',
		title: 'Study Mentor',
		period: '2021.09 ~ 2022.02',
		role: 'Mentor-mentee coding mentoring',
		details: [
			'Participated in a study where I mentored mentees in programming and development topics.',
		],
	},
];

const awardsEn = [
	{
		title: 'DIVE 2024 Hackathon',
		period: '2024.10',
		award: "Busan Technopark President's Award",
		details: [
			{
				text: 'Submitted project: Captain Donghae',
				projectId: 'captain-donghae',
			},
			{
				text: '3rd place in the challenge track',
				link: '/images/captain-donghae/award.png',
			},
		],
	},
	{
		title: 'Gyeongsang National University AI Art Exhibition',
		period: '2022.11',
		award: 'Encouragement Award',
		details: ['Submitted work: Sunset', 'Used Stable Diffusion'],
	},
	{
		title: 'Coding Competency Enhancement Campus Competition',
		period: '2021.10 ~ 2021.11',
		award: 'Pioneer Award',
		details: [
			{
				text: 'Submitted project: ESD HotDeal',
				projectId: 'esd-hotdeal',
			},
		],
	},
	{
		title: 'Gyeongnam Software Competition',
		period: '2021.08 ~ 2021.10',
		award: 'Grand Prize',
		details: [
			{
				text: 'Submitted project: ESD HotDeal',
				projectId: 'esd-hotdeal',
			},
			{
				text:
					'[Gyeongnam Ilbo] "These are the talents who will lead the local software industry"',
				link: 'https://www.knnews.co.kr/news/articleView.php?idxno=1362660',
			},
		],
	},
];

const projectsDataEn = projectsData.map((project) => ({
	...project,
	...simpleProjectTranslations[project.id],
}));

const websiteImageAlts: Record<string, string> = {
	'image1.png': 'Previous home page in dark mode',
	'image2.png': 'Previous About page with the profile Easter egg',
	'image3.png': 'Previous project detail modal',
	'image4.png': 'Previous image viewer',
	'2026-home-desktop.png': 'Current desktop home page',
	'2026-work-desktop.png': 'Current desktop Work page',
	'2026-home-mobile.png': 'Current mobile home page',
};

const playbookImageAlts: Record<string, string> = {
	'logo-wide.png': 'AI Agent Playbook logo',
	'npm-overview.png': 'AI Agent Playbook npm package overview',
	'quick-start.png': 'AI Agent Playbook quick-start guide',
	'command-guide.png': 'AI Agent Playbook command guide',
	'repository-map.png': 'AI Agent Playbook repository structure',
	'mcp-settings.png': 'AI Agent Playbook MCP settings',
};

const projectsDetailDataEn = projectsDetailData.map((project) => ({
	...project,
	...projectDetailTranslations[project.id],
	projectData: {
		...project.projectData,
		images: project.projectData.images.map((image, index) => {
			const filename = image.src.split('/').pop() ?? '';
			const isWebsite = project.id === 'jukrap-website';
			return {
				...image,
				alt:
					(isWebsite
						? websiteImageAlts[filename]
						: project.id === 'ai-agent-playbook'
							? playbookImageAlts[filename]
							: undefined) ??
					`${projectDetailTranslations[project.id]?.title ?? project.title} screenshot ${index + 1}`,
				caption:
					isWebsite && image.caption
						? /^image[1-4]\.png$/.test(filename)
							? 'Previous version'
							: image.caption
						: image.caption,
			};
		}),
	},
}));

export const portfolioData: Localized<PortfolioData> = {
	ko: {
		personalInfo,
		greetings,
		coreValues,
		skills,
		activities,
		awards,
		projects: projectsData,
		projectDetails: projectsDetailData,
		workStories: workStories.ko,
		homeLinks,
		aboutLinks,
		footerLinks,
	},
	en: {
		personalInfo: personalInfoEn,
		greetings,
		coreValues: coreValuesEn,
		skills,
		activities: activitiesEn,
		awards: awardsEn,
		projects: projectsDataEn,
		projectDetails: projectsDetailDataEn,
		workStories: workStories.en,
		homeLinks,
		aboutLinks,
		footerLinks,
	},
};
