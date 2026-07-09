export type WorkCaseWeight = 'featured' | 'compact';

export interface WorkImpact {
	value: string;
	label: string;
	detail?: string;
}

export interface ProfessionalCase {
	id: string;
	title: string;
	platform: string;
	area: string;
	period: string;
	role: string;
	workType: string;
	weight: WorkCaseWeight;
	relatedCaseId?: string;
	relatedLabel?: string;
	relatedDescription?: string;
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
