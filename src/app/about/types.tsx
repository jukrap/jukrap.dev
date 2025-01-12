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

export interface ProjectType {
	id: string;
	title: string;
	duration: string;
	major: boolean;
	introduction: string;
	description: string[];
	techStack: string;
	links: LinkType[];
}

export interface ProjectDetailType {
	id: string;
	title: string;
	subtitle: string;
	duration: string;
	platform: string[];
	links: LinkType[];
	overview: string;
	techStack: string[];
	role: string[];
	teamSize: number;
	tasks: {
		title: string;
		details: string[];
	}[];
	troubleshooting?: {
		title: string;
		details: string[];
	}[];
	performanceImprovements?: {
		title: string;
		details: string[];
	}[];
	specialImplementations?: {
		title: string;
		details: string[];
	}[];
	projectData: {
		images: string[];
		subLinks: LinkType[];
		background?: {
			image?: string;
			gradientStart?: string;
		};
	};
}
