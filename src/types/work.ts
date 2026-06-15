export type WorkCaseWeight = 'featured' | 'compact';

export interface WorkMetric {
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
	weight: WorkCaseWeight;
	stack: string[];
	headline: string;
	summary: string;
	metrics: WorkMetric[];
	scope: string[];
	contribution: string[];
	outcome: string[];
	verification: string[];
}
