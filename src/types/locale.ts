import type { Metadata } from 'next';
import type { Link } from '@/types/common';
import type {
	Activity,
	Award,
	CoreValue,
	PersonalInfo,
	Skill,
} from '@/types/profile';
import type { Project, SimpleProject } from '@/types/project';
import type { ProfessionalCase } from '@/types/work';

export const locales = ['ko', 'en'] as const;

export type Locale = (typeof locales)[number];

export type Localized<T> = Record<Locale, T>;

export interface LocaleDictionary {
	metadata: {
		home: Metadata;
		about: Metadata;
		work: Metadata;
		projects: Metadata;
	};
	navigation: {
		links: { label: string; href: string }[];
		openMenu: string;
		closeMenu: string;
		switchLanguage: string;
		languageName: string;
		themeToLight: string;
		themeToDark: string;
		themeToggle: string;
	};
	alerts: {
		aiAgentPlaybook: string;
		close: string;
	};
	home: {
		welcome: string;
		documentsTitle: string;
		documentsDescription: string;
		resumeTitle: string;
		resumeDescription: string;
		resumeDownload: string;
		portfolioTitle: string;
		portfolioDescription: string;
		portfolioDownload: string;
	};
	about: {
		title: string;
		skills: string;
		career: string;
		activity: string;
		awards: string;
		sideProjects: string;
		careerSummary: {
			company: string;
			period: string;
			role: string;
			details: string[];
		};
		workSummary: {
			title: string;
		};
		profileMessageDefault: string;
		profileMessageFlipped: string;
	};
	work: {
		title: string;
		intro: string;
		indexTitle: string;
		featuredTitle: string;
		compactTitle: string;
		labels: {
			stack: string;
			scope: string;
			contribution: string;
			outcome: string;
			verification: string;
		};
	};
	projects: {
		title: string;
		description: string;
		platforms: Record<string, string>;
	};
	projectDetail: {
		overview: string;
		info: string;
		role: string;
		teamSize: string;
		teamSizeUnit: string;
		tasks: string;
		troubleshooting: string;
		performance: string;
		special: string;
		screenshots: string;
		close: string;
		detailView: string;
	};
	webView: {
		openNewTab: string;
		externalTitle: string;
		externalDescription: (host: string) => string;
		viewInWebView: string;
	};
}

export interface PortfolioData {
	personalInfo: PersonalInfo;
	greetings: string[];
	coreValues: CoreValue[];
	skills: Skill[];
	activities: Activity[];
	awards: Award[];
	projects: SimpleProject[];
	projectDetails: Project[];
	workCases: ProfessionalCase[];
	homeLinks: Link[];
	aboutLinks: Link[];
	footerLinks: Link[];
}
