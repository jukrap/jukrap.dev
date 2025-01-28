export interface CoreValue {
	title: string;
	content: string;
}

export interface PersonalInfo {
	name: string;
	email: string;
	introduction: string;
}

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
