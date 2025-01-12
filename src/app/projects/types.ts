import { IconType } from '@/util/iconPaths';

export type Platform = 'All' | 'Web' | 'Mobile';

export type TechStackIcon = {
	name: string;
	path: string;
};

export interface ProjectLink {
	type: IconType;
	url: string;
	visible: boolean;
}

export interface ProjectTask {
	title: string;
	details: string[];
}

export interface ProjectData {
	images: string[];
	subLinks: ProjectLink[];
	background?: {
		image?: string;
		gradientStart?: string;
	};
}

export interface Project {
	id: string;
	title: string;
	subtitle: string;
	platform: string[];
	duration: string;
	links: ProjectLink[];
	overview: string;
	techStack: string[];
	role: string[];
	teamSize: number;
	tasks: ProjectTask[];
	troubleshooting?: ProjectTask[];
	performanceImprovements?: ProjectTask[];
	specialImplementations?: ProjectTask[];
	projectData: ProjectData;
}
