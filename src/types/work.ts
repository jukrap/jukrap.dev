export type WorkstreamId =
	| 'WS01'
	| 'WS02'
	| 'WS03'
	| 'WS04'
	| 'WS05'
	| 'WS06'
	| 'WS07'
	| 'WS08'
	| 'WS09'
	| 'WS10';

export type WorkStoryTier = 'featured' | 'compact';

export interface WorkImpact {
	value: string;
	label: string;
	detail?: string;
}

export interface WorkCaseRecord {
	workstreamId: WorkstreamId;
	id: string;
	title: string;
	platform: string;
	area: string;
	period: string;
	role: string;
	workType: string;
	stack: string[];
	headline: string;
	summary: string;
	problem: string;
	thinking: string[];
	process: string[];
	solution: string[];
	impact: WorkImpact[];
	checks: string[];
}

export interface WorkStoryDefinition {
	id: string;
	tier: WorkStoryTier;
	caseIds: readonly string[];
	includeInAbout: boolean;
}

export interface WorkStoryResultCopy {
	chapterId: string;
	impact: WorkImpact[];
	checks: string[];
}

export interface WorkStoryCopy {
	title?: string;
	platform?: string;
	area?: string;
	period?: string;
	role?: string;
	workType?: string;
	stack?: string[];
	headline?: string;
	summary?: string;
	context?: string;
	impact?: WorkImpact[];
	checks?: string[];
	resultSections?: WorkStoryResultCopy[];
	aboutSummary?: string;
}

export interface WorkStoryChapter {
	workstreamId: WorkstreamId;
	id: string;
	title: string;
	platform: string;
	area: string;
	period: string;
	role: string;
	workType: string;
	stack: string[];
	headline: string;
	summary: string;
	context: string;
	decisions: string[];
	execution: string[];
	impact: WorkImpact[];
	checks: string[];
	additionalEvidence: string[];
}

export interface WorkStoryResultSection {
	id: string;
	title?: string;
	impact: WorkImpact[];
	checks: string[];
}

export interface ProfessionalStory {
	id: string;
	tier: WorkStoryTier;
	caseIds: string[];
	includeInAbout: boolean;
	title: string;
	platform: string;
	area: string;
	period: string;
	role: string;
	workType: string;
	stack: string[];
	headline: string;
	summary: string;
	context: string;
	chapters: WorkStoryChapter[];
	impact: WorkImpact[];
	checks: string[];
	resultSections: WorkStoryResultSection[];
	aboutSummary?: string;
}
