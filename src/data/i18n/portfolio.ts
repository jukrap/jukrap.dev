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
import { workCases } from '@/data/workCases';
import { Localized, PortfolioData } from '@/types/locale';
import { Project, SimpleProject } from '@/types/project';

type ProjectTranslation = Pick<
	Project,
	'title' | 'subtitle' | 'overview' | 'tasks'
> &
	Partial<
		Pick<
			Project,
			'troubleshooting' | 'performanceImprovements' | 'specialImplementations'
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
			'Won 3rd place in the DIVE 2024 hackathon sponsor track',
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
		introduction: 'A personal website built with React and Next.js.',
		description: [
			'Solo development',
			'Used modern frameworks where possible (React 18, Next.js 14)',
			'Implemented a custom typing effect with hooks',
			'Built light and dark mode switching with Zustand and Tailwind',
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
		introduction: 'An app that detects posture and summarizes posture results.',
		description: [
			'Team lead and Android developer',
			'Owned sitting and exercise posture detection pages',
			'Built posture detection and Mediapipe extraction features',
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
			'An app that detects focus state and provides focus-related results.',
		description: [
			'Team lead and Android developer',
			'Owned face-detection-based focus determination pages',
			'Built face detection and Mediapipe extraction features',
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
					'Handled request parameters such as latitude, longitude, pagination, and category filtering, and added error handling for more stable data delivery.',
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
					'Combined Maps JavaScript API, Directions API, Places API, and Static Maps API to build a more complete map service.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Awarded at the DIVE 2024 Global Data Hackathon',
				details: [
					'Won the Busan Technopark President Award, third place in the sponsor track, at the DIVE 2024 Global Data Hackathon hosted by Busan Metropolitan City and organized by Busan Technopark.',
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
					'Improved user experience by displaying total post counts with a slot-machine-style animation using react-spring.',
					'Built a custom carousel component to improve visual appeal on the main page.',
					'Provided multiple filtering and sorting options so users could find desired content easily.',
					'Improved pagination usability by automatically scrolling to the top when a page number was selected.',
				],
			},
			{
				title: 'Developed a Markdown editor',
				details: [
					'Implemented a Markdown editor with real-time preview.',
					'Supported custom Markdown syntax to provide a richer and more convenient writing environment.',
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
					'Improved code quality with unit tests using Jest and component documentation using Storybook.',
					'Built a real-time error monitoring system with Sentry for faster bug response.',
				],
			},
			{
				title: 'Built DevOps and infrastructure',
				details: [
					'Designed and built scalable cloud infrastructure with AWS.',
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
					'Optimized image loading performance with the Next.js Image component.',
				],
			},
			{
				title: 'Code splitting with dynamic imports',
				details: [
					'Loaded components inside posts dynamically with Next.js dynamic imports.',
					'Reduced initial page load time by loading related components only when needed.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Scalable typography system',
				details: [
					'Extended Tailwind CSS to build a consistent typography system across the project.',
					'Developed responsive font scaling logic so font sizes could adjust by screen size.',
					'Maintained design consistency while improving user experience across devices.',
				],
			},
			{
				title: 'GitHub-style contribution graph',
				details: [
					'Built a custom component similar to GitHub contribution graphs to visualize user writing activity.',
					'Added hover tooltips so users could view more detailed information.',
					'Used the feature to express activity patterns intuitively and encourage ongoing participation.',
				],
			},
			{
				title: 'Efficient team collaboration system',
				details: [
					'Served as frontend team lead in a 15-person team with five frontend developers, five backend developers, and five designers.',
					'Built structured documentation and real-time communication practices using Notion, Discord, and Slack.',
					'Shared project status through weekly meetings and continuously improved code quality.',
					'Used Figma and Swagger to establish efficient design-development and frontend-backend collaboration.',
				],
			},
		],
	},
	'jukrap-website': {
		title: "Jukrap's Personal Website",
		subtitle: 'Jukrap Website',
		overview: 'A personal website built with React and Next.js.',
		tasks: [
			{
				title: 'Used modern frameworks where possible',
				details: ['Used React 18 and Next.js 14.'],
			},
			{
				title: 'Key features',
				details: [
					'Added a typing effect to titles and content using custom hooks.',
					'Implemented light and dark mode switching with Zustand and Tailwind.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved TypeScript type errors',
				details: [
					'Reworked interfaces and used utility types to resolve type errors from complex nested object structures.',
					'Improved code stability and readability through the type restructuring.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Image optimization',
				details: [
					'Improved image loading performance with the Next.js Image component.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Typing effect with a custom hook',
				details: [
					'Developed a useTypingEffect hook to implement typing animation for titles and content.',
					'Made the hook reusable and configurable for typing speed and delay.',
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
					'Created a project playbook structure for keeping project-specific working rules and current context under `.ai-playbook/`.',
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
					'Resolved image caching problems and improved app performance significantly.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Image optimization',
				details: [
					'Worked on image handling with mobile-optimized UI in mind.',
					'Improved performance through image resizing and caching.',
					'Reduced server traffic by roughly 30-50% through these optimizations.',
				],
			},
			{
				title: 'Board and comment performance improvements',
				details: [
					'Used pull-to-refresh and infinite scroll to load large amounts of data efficiently.',
				],
			},
		],
		specialImplementations: [
			{
				title: 'Real-time features with Firebase',
				details: [
					'Implemented real-time comments, likes, and multi-image features using Firebase Realtime Database.',
					'Provided users with a more dynamic and interactive experience.',
				],
			},
			{
				title: 'Location-based post filtering',
				details: [
					'Implemented filtering so users could see posts near their current location.',
					'Improved user experience by processing location data efficiently.',
				],
			},
			{
				title: 'Collaboration tools',
				details: [
					'Used Scrum practices to coordinate communication, development work, and schedules.',
					'Actively used Notion, Slack, GitHub, and Figma to improve team efficiency.',
				],
			},
		],
	},
	'posture-teacher': {
		title: 'Posture Teacher',
		subtitle: 'Posture Teacher',
		overview:
			'An app that detects sitting or plank posture, determines correctness from body-point angles and lengths, and provides data.',
		tasks: [
			{
				title: 'Implemented timer features',
				details: [
					'Implemented timers to record correct posture duration and misaligned duration.',
					'Designed and implemented separate timer systems for each posture.',
				],
			},
			{
				title: 'Integrated and optimized Mediapipe',
				details: [
					'Built Mediapipe AAR in a Linux environment and integrated it into the project.',
					'Developed a solution that measured body and face movement using Mediapipe.',
					'Achieved 5-10 times higher FPS than OpenCV and greatly improved performance.',
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
					'Designed and built an efficient database structure using SQLite-based Room Library.',
					'Designed Dao, Entity, and Database structures to optimize CRUD work.',
					'Implemented a system to store and manage user measurement data effectively.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Multi-threading optimization',
				details: [
					'Reduced Mediapipe load with multi-threading based on Runnable interfaces and thread classes.',
					'Improved usability on older phones and resolved UI responsiveness problems.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved build environment issues',
				details: [
					'Docker and MSYS2 use was interrupted by older CPU and GPU related issues.',
					'Successfully completed Mediapipe build work in an Ubuntu environment.',
				],
			},
			{
				title: 'Improved FPS',
				details: [
					'Achieved 5-10 times higher FPS by using Mediapipe instead of OpenCV.',
					'Improved accuracy and responsiveness of real-time posture measurement.',
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
					'Maintained fast feedback and a stable team atmosphere through this process.',
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
					'Designed Dao, Entity, and Database structures to optimize CRUD work.',
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
			'An Android timer app that detects facial movement to determine whether focus is maintained, then provides focus-improvement guidance and statistics.',
		tasks: [
			{
				title: 'Implemented focus detection',
				details: [
					'Developed a system that detects eye and face movement using Mediapipe.',
					'Implemented an algorithm that analyzes detected data and determines focus state.',
					'Added settings to adjust detection sensitivity for a personalized experience.',
					'Implemented a system that provides appropriate warnings and guidance based on focus state.',
				],
			},
			{
				title: 'Integrated and optimized Mediapipe',
				details: [
					'Built Mediapipe AAR directly in a Linux environment and integrated it into the project.',
					'Improved app performance and increased real-time face recognition efficiency.',
				],
			},
			{
				title: 'Designed and implemented the database',
				details: [
					'Designed and built an efficient database structure with SQLite-based Room Library.',
					'Designed Dao, Entity, and Database structures to optimize CRUD work.',
					'Implemented a system to store and manage user focus-time data effectively.',
				],
			},
		],
		performanceImprovements: [
			{
				title: 'Switched from OpenCV to Mediapipe',
				details: [
					'The initial OpenCV and NDK combination caused severe performance degradation.',
					'Switched to Mediapipe, which significantly improved frames per second.',
					'Obtained more accurate landmark values with Mediapipe and improved overall system performance.',
					'Improved FPS from under 10 FPS to over 30 FPS.',
				],
			},
			{
				title: 'Multi-threading optimization',
				details: [
					'Identified UI thread blocking caused by Mediapipe.',
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
					'Built an efficient routing system with react-router-dom.',
					'Implemented responsive design with react-bootstrap.',
					'Built layouts and features for key pages such as main, hot deal, and search pages.',
				],
			},
			{
				title: 'Backend development',
				details: [
					'Designed and implemented the backend with Express.',
					'Developed an efficient web crawling system with Puppeteer.',
					'Implemented a system that crawled and processed tens of thousands of hot-deal records within three to five minutes.',
					'Designed and built a document-based NoSQL database with Firebase.',
				],
			},
			{
				title: 'Developed reusable components',
				details: [
					'Built reusable product information components used across multiple pages with styled-components.',
					'Implemented components with hyperlinks to each ESD site.',
					'Improved development efficiency and provided consistent UI/UX.',
				],
			},
		],
		troubleshooting: [
			{
				title: 'Resolved static web hosting issues',
				details: [
					'Initially tried static web hosting through GitHub Pages, but encountered problems because of React SPA dynamics.',
					'Clearly learned the difference between static and dynamic web applications through the process.',
					'Eventually solved the issue by using a dynamic web hosting service.',
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
	introduction:
		"Frontend developer Park Ju-cheol, still fighting today's errors.",
};

const coreValuesEn = [
	{
		title: '1. I value both process and results.',
		content:
			'I proved this during the DIVE 2024 hackathon by building a polished service within 72 hours. From selecting Google Maps Platform to technical validation and implementation, I went through the process and achieved an award-winning result. I try to approach development with equal respect for process and outcome.',
	},
	{
		title: '2. I try to write flexible, reusable code.',
		content:
			'In the Itzip project, I improved reusability and maintainability through composition-based shared component design and component-driven development with Storybook. This became a key foundation for consistent UI/UX in a 15-person team.',
	},
	{
		title: '3. I value communication highly.',
		content:
			'I have actively collaborated with designers and backend developers across several projects. In Itzip, I helped build a communication system for a 15-person team and improved work efficiency. Since development is ultimately interaction between people, I consider communication a priority.',
	},
	{
		title: '4. I enjoy the problem-solving process.',
		content:
			'In Posture Teacher, I improved performance by 5-10 times by switching from OpenCV to Mediapipe, and in Captain Donghae I worked through challenges in external API integration. Development challenges have always been learning opportunities for me.',
	},
];

const activitiesEn = [
	{
		title: 'Study Group Organizer',
		period: '2024.05 ~ 2025.06',
		role: 'Coding-test and development knowledge study groups',
		details: [
			'Operated two study groups covering coding tests and development knowledge.',
		],
	},
	{
		title: 'Programmers Dev Course',
		period: '2024.05 ~ 2024.09',
		role: 'Cloud Application Engineering Course - Assistant Mentor',
		details: [
			'After being selected as an excellent graduate in a previous cohort, I mentored students in the second cohort of the course.',
			'Mentoring topics included weekly development information sharing, graduate concerns, daily scrum participation, development problem solving, and project checks.',
		],
	},
	{
		title: 'Programmers Dev Course',
		period: '2023.12 ~ 2024.05',
		role: 'Cloud Application Engineering Course - Student',
		details: [
			'Completed a Cloud Application Engineering course focused on React and React Native development.',
			'Training focus: React and React Native.',
		],
	},
	{
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
			'Submitted project: Captain Donghae',
			{
				text: '3rd place in the sponsor track',
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
		details: ['Submitted project: ESD HotDeal'],
	},
	{
		title: 'Gyeongnam Software Competition',
		period: '2021.08 ~ 2021.10',
		award: 'Grand Prize',
		details: [
			'Submitted project: ESD HotDeal',
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

const projectsDetailDataEn = projectsDetailData.map((project) => ({
	...project,
	...projectDetailTranslations[project.id],
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
		workCases: workCases.ko,
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
		workCases: workCases.en,
		homeLinks,
		aboutLinks,
		footerLinks,
	},
};
