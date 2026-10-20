export interface DecisionPoint {
	title: string;
	decision: string;
	verification: string;
}

export interface DecisionCase {
	context: string;
	points: readonly DecisionPoint[];
	outcome: string;
}
