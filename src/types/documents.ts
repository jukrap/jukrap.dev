import type { Locale } from '@/types/locale';

export type RecruitingDocumentId = 'portfolio' | 'resume' | 'career-brief';

export type RecruitingDocumentVisibility = 'public' | 'private';

export type DocumentEvidenceSource =
	| 'work-story'
	| 'work-case'
	| 'project'
	| 'activity'
	| 'award'
	| 'profile';

export interface DocumentEvidenceRef {
	source: DocumentEvidenceSource;
	id: string;
	visibility?: RecruitingDocumentVisibility;
}

export interface DocumentMetadataItem {
	label: string;
	value: string;
}

export interface DocumentLink {
	label: string;
	href: string;
}

export interface DocumentMetric {
	label: string;
	value: string;
	detail?: string;
}

export interface DocumentContentItem {
	title: string;
	description?: string;
	label?: string;
	value?: string;
	meta?: string;
	metadata?: readonly DocumentMetadataItem[];
	technologies?: readonly string[];
	links?: readonly DocumentLink[];
	evidence?: readonly DocumentEvidenceRef[];
}

export interface DocumentContentSection {
	id: string;
	title?: string;
	body?: readonly string[];
	items?: readonly DocumentContentItem[];
	metrics?: readonly DocumentMetric[];
	technologies?: readonly string[];
	links?: readonly DocumentLink[];
}

export type PortfolioPageKind =
	| 'cover'
	| 'overview'
	| 'case'
	| 'compact-work'
	| 'project'
	| 'project-collection'
	| 'closing';

export interface PortfolioPageImage {
	src: string;
	alt: string;
	caption?: string;
	layout?: 'wide' | 'split' | 'phone';
}

export interface PortfolioPageDefinition {
	id: string;
	pageNumber: number;
	kind: PortfolioPageKind;
	eyebrow: string;
	title: string;
	nickname?: string;
	summary?: string;
	metadata?: readonly DocumentMetadataItem[];
	technologies?: readonly string[];
	sections: readonly DocumentContentSection[];
	images?: readonly PortfolioPageImage[];
	evidence: readonly DocumentEvidenceRef[];
}

export interface PrivateDocumentContact {
	name: string;
	email: string;
	phone: string;
	birthYear: string;
	photoSrc?: string;
	links: readonly DocumentLink[];
}

export interface ResumeCompetency {
	title: string;
	detail: string;
	evidence?: readonly DocumentEvidenceRef[];
}

export interface ResumeCareer {
	company: string;
	period: string;
	officialTitle: string;
	role: string;
	summary?: string;
	highlights: readonly string[];
	evidence: readonly DocumentEvidenceRef[];
}

export interface ResumeProject {
	id: string;
	title: string;
	period: string;
	role?: string;
	summary: string;
	highlights?: readonly string[];
	technologies: readonly string[];
	evidence: readonly DocumentEvidenceRef[];
}

export interface DocumentSkillGroup {
	label: string;
	items: readonly string[];
}

export interface ResumeEducation {
	title: string;
	period: string;
	detail: string;
	evidence?: readonly DocumentEvidenceRef[];
}

export interface ResumeAward {
	title: string;
	period: string;
	detail: string;
	evidence?: readonly DocumentEvidenceRef[];
}

export interface ResumeDocumentCopy {
	title: string;
	role: string;
	profile: string;
	competencies: readonly ResumeCompetency[];
	careers: readonly ResumeCareer[];
	projects: readonly ResumeProject[];
	skillGroups: readonly DocumentSkillGroup[];
	education: readonly ResumeEducation[];
	awards: readonly ResumeAward[];
}

export interface CareerBriefCompany {
	name: string;
	period: string;
	officialTitle: string;
	role: string;
	summary: string;
	responsibilities: readonly string[];
	evidenceRefs: readonly DocumentEvidenceRef[];
}

export interface CareerBriefFeaturedWork {
	id: string;
	title: string;
	period: string;
	platform: string;
	goal: string;
	contribution: string;
	decision: string;
	result: string;
	evidence: readonly string[];
	technologies: readonly string[];
	evidenceRefs: readonly DocumentEvidenceRef[];
}

export interface CareerBriefSupportingWork {
	id: string;
	title: string;
	period: string;
	decision: string;
	result: string;
	evidenceRef: DocumentEvidenceRef;
}

export interface CareerBriefPractice {
	title: string;
	items: readonly string[];
}

export interface CareerBriefCopy {
	title: string;
	role: string;
	company: CareerBriefCompany;
	featuredWork: readonly CareerBriefFeaturedWork[];
	supportingWork: readonly CareerBriefSupportingWork[];
	practices: readonly CareerBriefPractice[];
	skillGroups: readonly DocumentSkillGroup[];
}

export interface RecruitingDocumentDefinition {
	id: RecruitingDocumentId;
	title: string;
	description: string;
	slug: string;
	visibility: RecruitingDocumentVisibility;
	pageCount: number;
	indexable: boolean;
	showOnHome: boolean;
}

export interface RecruitingDocumentManifest {
	locale: Locale;
	role: string;
	documents: readonly RecruitingDocumentDefinition[];
	selection: {
		featuredWorkStoryIds: readonly string[];
		supportingWorkStoryIds: readonly string[];
		portfolioProjectIds: readonly string[];
		resumeProjectIds: readonly string[];
	};
}

export interface RecruitingDocumentValidationInput {
	manifest: RecruitingDocumentManifest;
	portfolio: readonly PortfolioPageDefinition[];
	resume: ResumeDocumentCopy;
	careerBrief: CareerBriefCopy;
}
