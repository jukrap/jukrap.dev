import { projectsData } from '@/data/projectsData';
import { projectsDetailData } from '@/data/projectsDetailData';
import { workStories } from '@/data/workStories';
import type { DocumentEvidenceRef, DocumentMetric } from '@/types/documents';
import type { Project, SimpleProject } from '@/types/project';
import type { ProfessionalStory, WorkImpact } from '@/types/work';

const koStories = workStories.ko;

export function getWorkStory(id: string): ProfessionalStory {
	const story = koStories.find((candidate) => candidate.id === id);

	if (!story) {
		throw new Error(`Unknown Korean work story: ${id}`);
	}

	return story;
}

export function getProject(id: string): Project {
	const project = projectsDetailData.find((candidate) => candidate.id === id);

	if (!project) {
		throw new Error(`Unknown project detail: ${id}`);
	}

	return project;
}

export function getSimpleProject(id: string): SimpleProject {
	const project = projectsData.find((candidate) => candidate.id === id);

	if (!project) {
		throw new Error(`Unknown project summary: ${id}`);
	}

	return project;
}

export function workStoryEvidence(id: string): DocumentEvidenceRef {
	return { source: 'work-story', id };
}

export function workCaseEvidence(id: string): DocumentEvidenceRef {
	return { source: 'work-case', id };
}

export function projectEvidence(id: string): DocumentEvidenceRef {
	return { source: 'project', id };
}

export function toMetric(impact: WorkImpact): DocumentMetric {
	return {
		label: impact.label,
		value: impact.value,
		detail: impact.detail,
	};
}

export function visibleProjectLinks(id: string) {
	return getSimpleProject(id)
		.links.filter(({ visible, type }) => visible && type !== 'detailView')
		.map(({ type, url }) => ({
			label:
				type === 'github'
					? 'GitHub'
					: type === 'appleStore'
						? 'App Store'
						: type === 'googleStore'
							? 'Google Play'
							: type === 'url'
								? 'Website'
								: type,
			href: url,
		}));
}

export function formatKoreanPeriod(period: string): string {
	return period.replace(/\bPresent\b/g, '현재');
}
