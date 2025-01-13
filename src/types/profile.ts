export interface Activity {
	title: string;
	period: string;
	role: string;
	details: string[];
}

export interface Award {
	title: string;
	period: string;
	award: string;
	details: (string | { text: string; link: string })[];
}

export interface Skill {
	category: string;
	items: string;
}
