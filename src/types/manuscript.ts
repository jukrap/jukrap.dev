import type { Locale } from '@/types/locale';

export type LocalizedCopy = Record<Locale, string>;

export interface MediaAsset {
	source: string;
	alt: LocalizedCopy;
	width: number;
	height: number;
	focalPoint?: {
		x: number;
		y: number;
	};
	license: string;
	provenance: string;
}

export interface CaseStudyDecision {
	title: LocalizedCopy;
	body: LocalizedCopy;
}

export interface VerifiedResult {
	statement: LocalizedCopy;
	evidence: string;
}

export interface CaseStudyRecord {
	slug: string;
	title: LocalizedCopy;
	summary: LocalizedCopy;
	role: LocalizedCopy;
	period: string;
	stack: string[];
	context: LocalizedCopy;
	decisions: CaseStudyDecision[];
	verifiedResults: VerifiedResult[];
	evidence: string[];
	media: MediaAsset[];
}

export interface ProjectLinkRecord {
	label: LocalizedCopy;
	href: string;
	available: boolean;
}

export interface ProjectDetailSection {
	title: LocalizedCopy;
	body: LocalizedCopy;
}

export interface ProjectRecord {
	slug: string;
	title: LocalizedCopy;
	summary: LocalizedCopy;
	platform: string[];
	period: string;
	role: LocalizedCopy;
	stack: string[];
	links: ProjectLinkRecord[];
	media: MediaAsset[];
	detailSections: ProjectDetailSection[];
}
