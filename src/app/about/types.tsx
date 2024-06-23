import { IconType } from '@/util/iconPaths';

export interface Link {
	text: string;
	type: IconType;
	url: string;
	isExternal?: boolean;
}

export interface ProjectType {
	id: string;
	title: string;
	duration: string;
	introduction: string;
	description: string[];
	techStack: string;
	links: LinkType[];
}

export interface LinkType {
	type:
		| 'appleStore'
		| 'googleStore'
		| 'github'
		| 'url'
		| 'detailView'
		| 'video'
		| 'ppt'
		| 'doc'
		| 'other';
	url: string;
	visible: boolean;
}

export interface ProjectDetailType {
	id: string;
	title: string;
	subtitle: string;
	duration: string;
	links: LinkType[];
	overview: string;
	techStack: string[];
	role: string[];
	teamSize: number;
	functions: {
		title: string;
		details: string[];
	}[];
	tasks: {
		title: string;
		details: string[];
	}[];
	impression: {
		title: string;
		details: string[];
	}[];
	projectData: {
		images: string[];
		subLinks: LinkType[];
	};
}
