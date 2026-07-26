import imageMetadata from '@/data/imageMetadata.json';
import { portfolioData } from '@/data/i18n/portfolio';
import { workStories } from '@/data/workStories';
import type { Locale } from '@/types/locale';
import type {
	CaseStudyRecord,
	MediaAsset,
	ProjectRecord,
	SceneContract,
} from '@/types/portfolioExperiment';

const imageDimensions = (source: string) => {
	const key = `/public${source}` as keyof typeof imageMetadata;
	const metadata = imageMetadata[key];
	if (!metadata) {
		throw new Error(`Missing image metadata for approved asset: ${source}`);
	}
	return { width: metadata.width, height: metadata.height };
};

const localizedStory = (slug: string) => ({
	ko: workStories.ko.find((story) => story.id === slug),
	en: workStories.en.find((story) => story.id === slug),
});

export const caseStudyRecords: CaseStudyRecord[] = workStories.ko.map(
	(koStory) => {
		const pair = localizedStory(koStory.id);
		const enStory = pair.en ?? koStory;

		return {
			slug: koStory.id,
			title: { ko: koStory.title, en: enStory.title },
			summary: { ko: koStory.headline, en: enStory.headline },
			role: { ko: koStory.role, en: enStory.role },
			period: koStory.period,
			stack: koStory.stack,
			context: { ko: koStory.context, en: enStory.context },
			decisions: koStory.chapters.flatMap((chapter, chapterIndex) =>
				chapter.decisions.map((decision, decisionIndex) => ({
					title: {
						ko: chapter.title,
						en: enStory.chapters[chapterIndex]?.title ?? enStory.title,
					},
					body: {
						ko: decision,
						en:
							enStory.chapters[chapterIndex]?.decisions[decisionIndex] ??
							enStory.summary,
					},
				})),
			),
			verifiedResults: koStory.impact.map((impact, index) => ({
				statement: {
					ko: `${impact.value} · ${impact.label}`,
					en: enStory.impact[index]
						? `${enStory.impact[index].value} · ${enStory.impact[index].label}`
						: impact.value,
				},
				evidence: `src/data/workStories.ts#${koStory.id}`,
			})),
			media: [],
		};
	},
);

const projectByLocale = (locale: Locale, slug: string) =>
	portfolioData[locale].projectDetails.find((project) => project.id === slug);

const linkLabel = (type: string) => {
	switch (type) {
		case 'github':
			return { ko: 'GitHub에서 보기', en: 'View on GitHub' };
		case 'url':
			return { ko: '웹사이트에서 보기', en: 'Visit website' };
		case 'appleStore':
			return { ko: 'App Store에서 보기', en: 'View on App Store' };
		case 'googleStore':
			return { ko: 'Google Play에서 보기', en: 'View on Google Play' };
		default:
			return { ko: '자료 보기', en: 'View resource' };
	}
};

interface ApprovedProjectMedia {
	source: string;
	label: { ko: string; en: string };
}

const orderedViews = (
	directory: string,
	count: number,
): ApprovedProjectMedia[] =>
	Array.from({ length: count }, (_, index) => ({
		source: `/images/${directory}/image${index + 1}.png`,
		label: {
			ko: `공개 프로젝트 화면 ${index + 1}`,
			en: `public project view ${index + 1}`,
		},
	}));

const approvedProjectMedia: Record<string, ApprovedProjectMedia[]> = {
	'ai-agent-playbook': [
		{
			source: '/images/ai-agent-playbook/npm-overview.png',
			label: { ko: 'npm 패키지 개요', en: 'npm package overview' },
		},
		{
			source: '/images/ai-agent-playbook/quick-start.png',
			label: { ko: '빠른 시작 문서', en: 'quick-start documentation' },
		},
		{
			source: '/images/ai-agent-playbook/command-guide.png',
			label: { ko: '명령어 안내 문서', en: 'command guide documentation' },
		},
	],
	'captain-donghae': orderedViews('captain-donghae', 3),
	itzip: orderedViews('itzip', 3),
	'jukrap-website': orderedViews('jukrap-website', 3),
	sharebby: orderedViews('sharebby', 3),
	'posture-teacher': orderedViews('posture-teacher', 3),
	chatterbox: orderedViews('chatterbox', 3),
	mytime: orderedViews('mytime', 3),
	'esd-hotdeal': orderedViews('esd-hotdeal', 3),
	// The game captures are excluded because their embedded Asset Store rights are not itemized here.
	'labyrinth-escape-game': [],
};

const mediaAsset = (
	entry: ApprovedProjectMedia,
	koTitle: string,
	enTitle: string,
): MediaAsset => ({
	source: entry.source,
	alt: {
		ko: `${koTitle} ${entry.label.ko}`,
		en: `${enTitle} ${entry.label.en}`,
	},
	...imageDimensions(entry.source),
	focalPoint: { x: 0.5, y: 0.5 },
	license:
		'Reuse approved by the repository owner for this portfolio experiment; embedded third-party marks and content retain their original rights.',
	provenance:
		'Existing public project capture already shipped in this repository.',
});

export interface ProjectSceneMediaSources {
	desktop: string;
	mobile: string;
}

export const projectSceneMedia: Partial<
	Record<string, ProjectSceneMediaSources>
> = Object.fromEntries(
	Object.entries(approvedProjectMedia)
		.filter(([, media]) => media.length > 0)
		.map(([slug]) => [
			slug,
			{
				desktop: `/images/graphic-scene-media/${slug}-desktop.avif`,
				mobile: `/images/graphic-scene-media/${slug}-mobile.avif`,
			},
		]),
);
export const projectRecords: ProjectRecord[] =
	portfolioData.ko.projectDetails.map((koProject) => {
		const enProject = projectByLocale('en', koProject.id) ?? koProject;
		const sources = approvedProjectMedia[koProject.id] ?? [];
		const sectionCount = Math.max(koProject.tasks.length, enProject.tasks.length);

		return {
			slug: koProject.id,
			title: { ko: koProject.title, en: enProject.title },
			summary: { ko: koProject.overview, en: enProject.overview },
			platform: koProject.platform,
			role: {
				ko: koProject.role.join(' / '),
				en: enProject.role.join(' / '),
			},
			stack: koProject.techStack,
			links: koProject.links
				.filter(({ visible, url }) => visible && url !== '/')
				.map(({ type, url }) => ({
					label: linkLabel(type),
					href: url,
				})),
			media: sources.map((entry) =>
				mediaAsset(entry, koProject.title, enProject.title),
			),
			detailSections: Array.from({ length: sectionCount }, (_, index) => ({
				title: {
					ko: koProject.tasks[index]?.title ?? koProject.title,
					en: enProject.tasks[index]?.title ?? enProject.title,
				},
				body: {
					ko: koProject.tasks[index]?.details.join(' ') ?? koProject.overview,
					en: enProject.tasks[index]?.details.join(' ') ?? enProject.overview,
				},
			})),
		};
	});

const camera = {
	desktop: { position: [4.8, 3.4, 6.6], target: [0, 0, 0], fov: 38 },
	tablet: { position: [5.2, 3.8, 7.4], target: [0, 0, 0], fov: 42 },
	mobile: { position: [5.8, 4.4, 8.4], target: [0, 0, 0], fov: 46 },
	qa: { position: [4.8, 3.4, 6.6], target: [0, 0, 0], fov: 38 },
} as const;

const projectCamera = {
	desktop: { position: [1.5, 1.8, 5.8], target: [0, -0.25, 0], fov: 34 },
	tablet: { position: [1.6, 2.1, 6.6], target: [0, -0.25, 0], fov: 38 },
	mobile: { position: [1.6, 2.5, 7.5], target: [0, -0.25, 0], fov: 42 },
	qa: { position: [1.5, 1.8, 5.8], target: [0, -0.25, 0], fov: 34 },
} as const;

const disposal = {
	geometries: ['route-owned procedural geometry'],
	materials: ['route-owned standard and basic materials'],
	textures: ['selected project texture on projects route'],
	renderTargets: [],
	listeners: [
		'visibilitychange',
		'IntersectionObserver',
		'webglcontextlost',
		'webglcontextrestored',
	],
};

export const sceneContracts: Record<SceneContract['route'], SceneContract> = {
	overview: {
		route: 'overview',
		subject: 'Signal lattice connecting one selected professional boundary',
		seed: 'jukrap-graphic-overview-v1',
		camera,
		interaction: {
			domControls: ['selected work link'],
			pointer: ['bounded pointer parallax'],
			keyboard: 'DOM',
		},
		qualityTier: 'high',
		fallback: {
			light: '/images/graphic-fallback/overview-light.avif',
			dark: '/images/graphic-fallback/overview-dark.avif',
			alt: {
				ko: '경계를 따라 하나의 신호가 이어지는 구조',
				en: 'A single signal tracing a path through connected boundaries',
			},
		},
		reducedMotionPose: camera.qa,
		pauseWhen: ['document-hidden', 'offscreen', 'fallback', 'route-inactive'],
		disposal,
	},
	work: {
		route: 'work',
		subject: 'Boundary planes controlled by the selected verified case',
		seed: 'jukrap-graphic-work-v1',
		camera,
		interaction: {
			domControls: ['case selector', 'case detail link'],
			keyboard: 'DOM',
		},
		qualityTier: 'high',
		fallback: {
			light: '/images/graphic-fallback/work-light.avif',
			dark: '/images/graphic-fallback/work-dark.avif',
			alt: {
				ko: '선택한 업무의 시스템 경계를 표현한 평면 구조',
				en: 'A plane structure representing the selected system boundary',
			},
		},
		reducedMotionPose: camera.qa,
		pauseWhen: ['document-hidden', 'offscreen', 'fallback', 'route-inactive'],
		disposal,
	},
	projects: {
		route: 'projects',
		subject: 'A bounded artifact surface using approved project media',
		seed: 'jukrap-graphic-projects-v1',
		camera: projectCamera,
		interaction: {
			domControls: ['project selector', 'reset rotation', 'external link'],
			keyboard: 'DOM',
		},
		qualityTier: 'high',
		fallback: {
			light: '/images/graphic-fallback/projects-light.avif',
			dark: '/images/graphic-fallback/projects-dark.avif',
			alt: {
				ko: '실제 프로젝트 미디어를 담은 회전 가능한 아티팩트',
				en: 'A rotatable artifact carrying approved project media',
			},
		},
		reducedMotionPose: projectCamera.qa,
		pauseWhen: ['document-hidden', 'offscreen', 'fallback', 'route-inactive'],
		disposal,
	},
};

export type WorkBoundaryCategory =
	| 'browser'
	| 'webview'
	| 'native'
	| 'device'
	| 'server'
	| 'data'
	| 'document';

export interface WorkSceneParameter {
	layers: WorkBoundaryCategory[];
	connections: Array<readonly [WorkBoundaryCategory, WorkBoundaryCategory]>;
	source: string;
}

export const workSceneParameters: Record<string, WorkSceneParameter> = {
	'delivery-output-flow': {
		layers: ['browser', 'webview', 'native', 'device', 'server', 'document'],
		connections: [
			['browser', 'server'],
			['server', 'document'],
			['browser', 'webview'],
			['webview', 'native'],
			['native', 'device'],
		],
		source: 'src/data/workStories.ts#delivery-output-flow',
	},
	'structured-editor-ui': {
		layers: ['browser', 'data'],
		connections: [['browser', 'data']],
		source: 'src/data/workStories.ts#structured-editor-ui',
	},
	'ai-kickoff-documentation-tool': {
		layers: ['document', 'data'],
		connections: [['data', 'document']],
		source: 'src/data/workStories.ts#ai-kickoff-documentation-tool',
	},
	'hybrid-life-info-platform': {
		layers: ['webview', 'native', 'device', 'server', 'data'],
		connections: [
			['webview', 'native'],
			['native', 'device'],
			['webview', 'server'],
			['server', 'data'],
		],
		source: 'src/data/workStories.ts#hybrid-life-info-platform',
	},
	'legacy-mobile-compatibility': {
		layers: ['webview', 'native', 'device'],
		connections: [
			['webview', 'native'],
			['native', 'device'],
		],
		source: 'src/data/workStories.ts#legacy-mobile-compatibility',
	},
	'react-admin-state-migration': {
		layers: ['browser', 'data', 'server'],
		connections: [
			['browser', 'data'],
			['data', 'server'],
		],
		source: 'src/data/workStories.ts#react-admin-state-migration',
	},
	'hybrid-security-boundary': {
		layers: ['webview', 'native', 'server'],
		connections: [
			['webview', 'native'],
			['native', 'server'],
		],
		source: 'src/data/workStories.ts#hybrid-security-boundary',
	},
	'field-terminal-android': {
		layers: ['native', 'device', 'server', 'data'],
		connections: [
			['native', 'device'],
			['device', 'server'],
			['server', 'data'],
		],
		source: 'src/data/workStories.ts#field-terminal-android',
	},
	'legacy-panel-baseline': {
		layers: ['browser', 'server', 'data'],
		connections: [
			['browser', 'server'],
			['server', 'data'],
		],
		source: 'src/data/workStories.ts#legacy-panel-baseline',
	},
};
