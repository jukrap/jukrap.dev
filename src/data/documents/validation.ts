import { activities } from '@/data/about/activities';
import { awards } from '@/data/about/awards';
import { personalInfo } from '@/data/about/personalInfo';
import { projectsData } from '@/data/projectsData';
import { workCases } from '@/data/workCases';
import { workStories } from '@/data/workStories';
import type {
	DocumentEvidenceRef,
	PortfolioPageDefinition,
	RecruitingDocumentVisibility,
	RecruitingDocumentValidationInput,
} from '@/types/documents';

function assertUnique(values: readonly string[], label: string) {
	const duplicates = values.filter(
		(value, index) => values.indexOf(value) !== index,
	);

	if (duplicates.length > 0) {
		throw new Error(`${label} contains duplicates: ${duplicates.join(', ')}`);
	}
}

function assertSameOrder(
	actual: readonly string[],
	expected: readonly string[],
	label: string,
) {
	if (
		actual.length !== expected.length ||
		actual.some((value, index) => value !== expected[index])
	) {
		throw new Error(
			`${label} must be [${expected.join(', ')}], received [${actual.join(', ')}].`,
		);
	}
}

function pageEvidence(page: PortfolioPageDefinition) {
	return [
		...page.evidence,
		...page.sections.flatMap(({ items }) =>
			(items ?? []).flatMap(({ evidence }) => evidence ?? []),
		),
	];
}

type EvidenceRegistry = Record<
	DocumentEvidenceRef['source'],
	Record<RecruitingDocumentVisibility, readonly string[]>
>;

const evidenceRegistry: EvidenceRegistry = {
	'work-story': {
		public: workStories.ko.map(({ id }) => id),
		private: [],
	},
	'work-case': {
		public: workCases.ko.map(({ id }) => id),
		private: [],
	},
	project: {
		public: projectsData.map(({ id }) => id),
		private: [],
	},
	activity: {
		public: activities.map(({ title }) => title),
		private: [],
	},
	award: {
		public: awards.map(({ title }) => title),
		private: [],
	},
	profile: {
		public: ['personal-info', 'links', 'skills'],
		private: ['career-triphos', 'career-tis', 'education-university'],
	},
};

function resolveEvidenceVisibility(
	ref: DocumentEvidenceRef,
): RecruitingDocumentVisibility {
	const registry = evidenceRegistry[ref.source];
	const inferredVisibility = (['public', 'private'] as const).find(
		(visibility) => registry[visibility].includes(ref.id),
	);

	if (!inferredVisibility) {
		throw new Error(`Unknown ${ref.source} evidence reference: ${ref.id}`);
	}
	if (ref.visibility && ref.visibility !== inferredVisibility) {
		throw new Error(
			`Evidence visibility mismatch for ${ref.source}:${ref.id}. Expected ${inferredVisibility}, received ${ref.visibility}.`,
		);
	}

	return inferredVisibility;
}

function uniqueInOrder(values: readonly string[]) {
	return values.filter((value, index) => values.indexOf(value) === index);
}

function collectStrings(value: unknown): string[] {
	if (typeof value === 'string') {
		return [value];
	}
	if (Array.isArray(value)) {
		return value.flatMap(collectStrings);
	}
	if (value && typeof value === 'object') {
		return Object.values(value).flatMap(collectStrings);
	}
	return [];
}

export function validateRecruitingDocumentData({
	manifest,
	portfolio,
	resume,
	careerBrief,
}: RecruitingDocumentValidationInput) {
	if (manifest.locale !== 'ko') {
		throw new Error('The first recruiting-document release must be Korean.');
	}

	if (manifest.documents.length !== 3) {
		throw new Error('Recruiting-document manifest must define three documents.');
	}
	assertUnique(
		manifest.documents.map(({ id }) => id),
		'Recruiting document IDs',
	);

	const portfolioDefinition = manifest.documents.find(
		({ id }) => id === 'portfolio',
	);
	const privateDefinitions = manifest.documents.filter(
		({ visibility }) => visibility === 'private',
	);
	if (
		!portfolioDefinition ||
		portfolioDefinition.visibility !== 'public' ||
		!portfolioDefinition.indexable ||
		!portfolioDefinition.showOnHome
	) {
		throw new Error('Portfolio must be the public, indexable home document.');
	}
	if (
		privateDefinitions.length !== 2 ||
		privateDefinitions.some(
			({ indexable, showOnHome }) => indexable || showOnHome,
		)
	) {
		throw new Error('Resume and career brief must stay private and unlisted.');
	}

	if (portfolio.length !== 12 || portfolioDefinition.pageCount !== 12) {
		throw new Error('Portfolio must contain exactly twelve pages.');
	}
	assertUnique(
		portfolio.map(({ id }) => id),
		'Portfolio page IDs',
	);
	assertUnique(
		portfolio.map(({ pageNumber }) => String(pageNumber)),
		'Portfolio page numbers',
	);
	portfolio.forEach((page, index) => {
		if (page.pageNumber !== index + 1) {
			throw new Error('Portfolio pages must be numbered sequentially from one.');
		}
	});

	const featuredIds = workStories.ko
		.filter(({ tier }) => tier === 'featured')
		.map(({ id }) => id);
	const supportingIds = workStories.ko
		.filter(({ tier }) => tier === 'compact')
		.map(({ id }) => id);
	assertSameOrder(
		manifest.selection.featuredWorkStoryIds,
		featuredIds,
		'Featured work selection',
	);
	assertSameOrder(
		manifest.selection.supportingWorkStoryIds,
		supportingIds,
		'Supporting work selection',
	);
	assertUnique(
		[
			...manifest.selection.featuredWorkStoryIds,
			...manifest.selection.supportingWorkStoryIds,
		],
		'Recruiting work story selection',
	);

	if (
		manifest.selection.featuredWorkStoryIds.length !== 4 ||
		manifest.selection.supportingWorkStoryIds.length !== 5
	) {
		throw new Error(
			'Recruiting documents must keep four featured and five supporting stories.',
		);
	}

	const knownProjectIds = projectsData.map(({ id }) => id);
	assertUnique(
		manifest.selection.portfolioProjectIds,
		'Portfolio project selection',
	);
	if (
		manifest.selection.portfolioProjectIds.length !== 5 ||
		manifest.selection.portfolioProjectIds.some(
			(id) => !knownProjectIds.includes(id),
		)
	) {
		throw new Error('Portfolio must reference five existing selected projects.');
	}
	if (
		manifest.selection.resumeProjectIds.length !== 3 ||
		manifest.selection.resumeProjectIds.some(
			(id) => !manifest.selection.portfolioProjectIds.includes(id),
		)
	) {
		throw new Error(
			'Resume projects must be three projects selected from the portfolio.',
		);
	}

	assertSameOrder(
		resume.projects.map(({ id }) => id),
		manifest.selection.resumeProjectIds,
		'Resume project order',
	);
	assertSameOrder(
		careerBrief.featuredWork.map(({ id }) => id),
		manifest.selection.featuredWorkStoryIds,
		'Career brief featured work order',
	);
	assertSameOrder(
		careerBrief.supportingWork.map(({ id }) => id),
		manifest.selection.supportingWorkStoryIds,
		'Career brief supporting work order',
	);

	const evidence = portfolio.flatMap(pageEvidence);
	const evidenceVisibilities = evidence.map(resolveEvidenceVisibility);
	if (evidenceVisibilities.includes('private')) {
		throw new Error('Public portfolio cannot reference private evidence.');
	}

	const portfolioWorkStoryIds = uniqueInOrder(
		evidence.filter(({ source }) => source === 'work-story').map(({ id }) => id),
	);
	assertSameOrder(
		portfolioWorkStoryIds,
		[
			...manifest.selection.featuredWorkStoryIds,
			...manifest.selection.supportingWorkStoryIds,
		],
		'Portfolio work story evidence',
	);
	const portfolioProjectIds = uniqueInOrder(
		evidence.filter(({ source }) => source === 'project').map(({ id }) => id),
	);
	assertSameOrder(
		portfolioProjectIds,
		manifest.selection.portfolioProjectIds,
		'Portfolio project evidence',
	);

	const publicStrings = collectStrings(portfolio);
	const phonePattern =
		/(?:\+?82[\s.-]*(?:\(0\)[\s.-]*)?10|010)[\s.-]*\d{3,4}[\s.-]*\d{4}\b/;
	if (publicStrings.some((value) => phonePattern.test(value))) {
		throw new Error('Public portfolio must not contain a private phone number.');
	}

	const publicEmails = publicStrings.flatMap(
		(value) => value.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g) ?? [],
	);
	if (
		publicEmails.some(
			(email) => email.toLowerCase() !== personalInfo.email.toLowerCase(),
		)
	) {
		throw new Error('Public portfolio contains an unexpected email address.');
	}
	const birthPattern =
		/(?:출생|생년|birth\s*(?:year|date)|(?:19|20)\d{2}\s*년\s*생(?:입니다|임)?(?:$|[\s,./()]))/i;
	if (publicStrings.some((value) => birthPattern.test(value))) {
		throw new Error('Public portfolio must not contain birth information.');
	}

	const resumeEvidence = [
		...resume.competencies.flatMap(({ evidence: refs }) => refs ?? []),
		...resume.careers.flatMap(({ evidence: refs }) => refs),
		...resume.projects.flatMap(({ evidence: refs }) => refs),
		...resume.education.flatMap(({ evidence: refs }) => refs ?? []),
		...resume.awards.flatMap(({ evidence: refs }) => refs ?? []),
	];
	const careerBriefEvidence = [
		...careerBrief.company.evidenceRefs,
		...careerBrief.featuredWork.flatMap(({ evidenceRefs }) => evidenceRefs),
		...careerBrief.supportingWork.map(({ evidenceRef }) => evidenceRef),
	];
	[...resumeEvidence, ...careerBriefEvidence].forEach(resolveEvidenceVisibility);

	if (
		resume.careers.some(({ evidence: refs }) => refs.length === 0) ||
		resume.projects.some(({ evidence: refs }) => refs.length === 0) ||
		resume.education.some(({ evidence: refs }) => !refs?.length) ||
		resume.awards.some(({ evidence: refs }) => !refs?.length) ||
		careerBrief.company.evidenceRefs.length === 0 ||
		careerBrief.featuredWork.some(({ evidenceRefs }) => evidenceRefs.length === 0)
	) {
		throw new Error(
			'Resume and career brief claims must keep at least one evidence reference.',
		);
	}

	portfolio.forEach((page) => {
		const hasMetrics = page.sections.some(({ metrics }) =>
			Boolean(metrics?.length),
		);
		if (hasMetrics && pageEvidence(page).length === 0) {
			throw new Error(`Portfolio metrics require evidence: ${page.id}`);
		}
	});

	if (resume.competencies.length !== 4) {
		throw new Error('Resume must expose exactly four core competencies.');
	}
	if (resume.careers.length < 2) {
		throw new Error(
			'Resume must include current career and the earlier field internship.',
		);
	}
}
