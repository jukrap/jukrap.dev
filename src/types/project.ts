import { ProjectLink } from './common';

export interface BaseProjectTask {
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
	duration: string;
	platform: string[];
	links: ProjectLink[];
	overview: string;
	techStack: string[];
	role: string[];
	teamSize: number;
	tasks: BaseProjectTask[];
	troubleshooting?: BaseProjectTask[];
	performanceImprovements?: BaseProjectTask[];
	specialImplementations?: BaseProjectTask[];
	projectData: ProjectData;
}

// 간단한 프로젝트 표시를 위한 타입
export interface SimpleProject {
	id: string;
	title: string;
	duration: string;
	major: boolean;
	introduction: string;
	description: string[];
	techStack: string;
	links: ProjectLink[];
}

export type Platform = 'All' | 'Web' | 'Mobile' | 'Game';
export type { ProjectLink };
