// src\app\about\types.ts
export interface ProjectType {
	title: string;
	duration: string;
	introduction: string;
	description: string[];
	techStack: string;
	links: LinkType[];
}

export interface LinkType {
	type: 'appStore' | 'googlePlay' | 'github' | 'url' | 'detailView';
	url: string;
	visible: boolean;
}
