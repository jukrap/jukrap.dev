import type { Locale, Localized } from '@/types/locale';

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export interface MediaAsset {
	source: string;
	alt: Localized<string>;
	width: number;
	height: number;
	focalPoint?: { x: number; y: number };
	license: string;
	provenance: string;
}

export interface CaseStudyRecord {
	slug: string;
	title: Localized<string>;
	summary: Localized<string>;
	role: Localized<string>;
	period: string;
	stack: string[];
	context: Localized<string>;
	decisions: Array<{
		title: Localized<string>;
		body: Localized<string>;
	}>;
	verifiedResults: Array<{
		statement: Localized<string>;
		evidence: string;
	}>;
	media: MediaAsset[];
}

export interface ProjectRecord {
	slug: string;
	title: Localized<string>;
	summary: Localized<string>;
	platform: string[];
	role: Localized<string>;
	stack: string[];
	links: Array<{
		label: Localized<string>;
		href: string;
	}>;
	media: MediaAsset[];
	detailSections: Array<{
		title: Localized<string>;
		body: Localized<string>;
	}>;
}

export interface CameraPose {
	position: readonly [number, number, number];
	target: readonly [number, number, number];
	fov: number;
}

export interface SceneContract {
	route: 'overview' | 'work' | 'projects';
	subject: string;
	seed: string;
	camera: Record<'desktop' | 'tablet' | 'mobile' | 'qa', CameraPose>;
	interaction: {
		domControls: string[];
		pointer?: string[];
		keyboard: 'DOM';
	};
	qualityTier: 'high' | 'medium' | 'static';
	fallback: {
		light: string;
		dark: string;
		alt: Localized<string>;
	};
	reducedMotionPose: CameraPose;
	pauseWhen: Array<
		'document-hidden' | 'offscreen' | 'fallback' | 'route-inactive'
	>;
	disposal: {
		geometries: string[];
		materials: string[];
		textures: string[];
		renderTargets: string[];
		listeners: string[];
	};
}

export const selectLocalized = <T>(copy: Localized<T>, locale: Locale) =>
	copy[locale];
