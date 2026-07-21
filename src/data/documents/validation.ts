import { activities } from '@/data/about/activities';
import { awards } from '@/data/about/awards';
import { projectsData } from '@/data/projectsData';
import { workCases } from '@/data/workCases';
import { workStories } from '@/data/workStories';
import { validateRecruitingDocumentNumericClaims } from './numericClaimValidation';
import { portfolioPublicEmails } from './publicContact';
import {
	privateProfileEvidenceRecords,
	publicProfileEvidenceRecords,
} from './profileEvidence';
import type {
	DocumentEvidenceRef,
	DocumentMetric,
	PortfolioPageDefinition,
	PortfolioPageKind,
	RecruitingDocumentDefinition,
	RecruitingDocumentVisibility,
	RecruitingDocumentValidationInput,
} from '@/types/documents';

const EXPECTED_ROLE = '웹/모바일 프론트엔드 엔지니어';

const EXPECTED_DOCUMENTS = [
	{
		id: 'portfolio',
		slug: '/ko/portfolio',
		visibility: 'public',
		pageCount: 14,
		indexable: true,
		showOnHome: true,
	},
	{
		id: 'resume',
		slug: '/ko/resume',
		visibility: 'private',
		pageCount: 2,
		indexable: false,
		showOnHome: false,
	},
	{
		id: 'career-brief',
		slug: '/ko/career-brief',
		visibility: 'private',
		pageCount: 2,
		indexable: false,
		showOnHome: false,
	},
] as const satisfies readonly Pick<
	RecruitingDocumentDefinition,
	'id' | 'slug' | 'visibility' | 'pageCount' | 'indexable' | 'showOnHome'
>[];

const EXPECTED_PORTFOLIO_PROJECT_IDS = [
	'captain-donghae',
	'sharebby',
	'ai-agent-playbook',
	'itzip',
	'posture-teacher',
] as const;

const EXPECTED_RESUME_PROJECT_IDS = [
	'captain-donghae',
	'sharebby',
	'posture-teacher',
	'ai-agent-playbook',
] as const;

const EXPECTED_FEATURED_PAGES = [
	{
		pageNumber: 3,
		id: 'logistics-web',
		storyIds: ['delivery-output-flow'],
		caseIds: ['delivery-operations-web'],
	},
	{
		pageNumber: 4,
		id: 'logistics-mobile',
		storyIds: ['delivery-output-flow'],
		caseIds: ['mobile-output-bridge'],
	},
	{
		pageNumber: 5,
		id: 'structured-editor-ui',
		storyIds: ['structured-editor-ui'],
		caseIds: [],
	},
	{
		pageNumber: 6,
		id: 'ai-kickoff-documentation-tool',
		storyIds: ['ai-kickoff-documentation-tool'],
		caseIds: [],
	},
	{
		pageNumber: 7,
		id: 'hybrid-life-info-platform',
		storyIds: ['hybrid-life-info-platform'],
		caseIds: [],
	},
] as const;

const EXPECTED_PROJECT_PAGES = [
	{ pageNumber: 9, id: 'captain-donghae', projectIds: ['captain-donghae'] },
	{ pageNumber: 10, id: 'sharebby', projectIds: ['sharebby'] },
	{
		pageNumber: 11,
		id: 'ai-agent-playbook',
		projectIds: ['ai-agent-playbook'],
	},
	{
		pageNumber: 12,
		id: 'itzip',
		projectIds: ['itzip'],
	},
	{
		pageNumber: 13,
		id: 'posture-teacher',
		projectIds: ['posture-teacher'],
	},
] as const;

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

function getPage(
	portfolio: readonly PortfolioPageDefinition[],
	pageNumber: number,
	expectedId: string,
	expectedKind: PortfolioPageKind,
) {
	const page = portfolio[pageNumber - 1];

	if (!page || page.id !== expectedId || page.kind !== expectedKind) {
		throw new Error(
			`Portfolio page ${pageNumber} must be ${expectedKind}:${expectedId}, received ${page ? `${page.kind}:${page.id}` : 'missing'}.`,
		);
	}

	return page;
}

function evidenceIds(
	page: PortfolioPageDefinition,
	source: DocumentEvidenceRef['source'],
) {
	return uniqueInOrder(
		pageEvidence(page)
			.filter((ref) => ref.source === source)
			.map(({ id }) => id),
	);
}

function assertPageEvidence(
	page: PortfolioPageDefinition,
	source: DocumentEvidenceRef['source'],
	expectedIds: readonly string[],
	label: string,
) {
	assertSameOrder(evidenceIds(page, source), expectedIds, label);
}

const documentMetricSourceValues: Record<string, string> = {
	'다시 그리는 범위 축소': '재렌더 조건 축소',
	'검수용 워크북': 'workbook 검수',
};

function metricEvidenceKey({ value }: DocumentMetric) {
	return documentMetricSourceValues[value] ?? value;
}

function expectedWorkMetrics(page: PortfolioPageDefinition): DocumentMetric[] {
	const refs = pageEvidence(page);
	const storyIds = uniqueInOrder(
		refs.filter(({ source }) => source === 'work-story').map(({ id }) => id),
	);
	const caseIds = uniqueInOrder(
		refs.filter(({ source }) => source === 'work-case').map(({ id }) => id),
	);
	const stories = storyIds.map((id) => {
		const story = workStories.ko.find((candidate) => candidate.id === id);
		if (!story) {
			throw new Error(`Unknown work-story metric evidence: ${id}`);
		}
		return story;
	});

	if (caseIds.length === 0) {
		return stories.flatMap(({ impact }) => impact);
	}

	return caseIds.flatMap((caseId) => {
		const matchingSections = stories.flatMap(({ resultSections }) =>
			resultSections.filter(({ id }) => id === caseId),
		);

		if (matchingSections.length !== 1) {
			throw new Error(
				`Portfolio metric evidence must resolve one story result section for work-case:${caseId} on page ${page.id}.`,
			);
		}

		return matchingSections[0].impact;
	});
}

function validatePageMetrics(page: PortfolioPageDefinition) {
	const actualMetrics = page.sections.flatMap(({ metrics }) => metrics ?? []);
	if (page.kind !== 'case' && actualMetrics.length === 0) {
		return;
	}

	const expectedMetrics = expectedWorkMetrics(page);
	if (expectedMetrics.length === 0) {
		throw new Error(
			`Portfolio metrics require attributable work evidence: ${page.id}`,
		);
	}

	assertSameOrder(
		actualMetrics.map(metricEvidenceKey),
		expectedMetrics.map(metricEvidenceKey),
		`Portfolio metrics on page ${page.id}`,
	);
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
		public: activities.map(({ id }) => id),
		private: [],
	},
	award: {
		public: awards.map(({ title }) => title),
		private: [],
	},
	profile: {
		public: [
			'personal-info',
			'links',
			'skills',
			...publicProfileEvidenceRecords.map(({ id }) => id),
		],
		private: privateProfileEvidenceRecords.map(({ id }) => id),
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
	if (manifest.role !== EXPECTED_ROLE) {
		throw new Error(
			`Recruiting-document role must be ${EXPECTED_ROLE}, received ${manifest.role}.`,
		);
	}

	if (manifest.documents.length !== EXPECTED_DOCUMENTS.length) {
		throw new Error('Recruiting-document manifest must define three documents.');
	}
	assertUnique(
		manifest.documents.map(({ id }) => id),
		'Recruiting document IDs',
	);
	assertSameOrder(
		manifest.documents.map(({ id }) => id),
		EXPECTED_DOCUMENTS.map(({ id }) => id),
		'Recruiting document order',
	);
	EXPECTED_DOCUMENTS.forEach((expected) => {
		const actual = manifest.documents.find(({ id }) => id === expected.id);
		if (!actual) {
			throw new Error(`Missing recruiting document definition: ${expected.id}`);
		}

		(
			['slug', 'visibility', 'pageCount', 'indexable', 'showOnHome'] as const
		).forEach((field) => {
			if (actual[field] !== expected[field]) {
				throw new Error(
					`Recruiting document ${expected.id}.${field} must be ${String(expected[field])}, received ${String(actual[field])}.`,
				);
			}
		});
	});

	const portfolioDefinition = manifest.documents.find(
		({ id }) => id === 'portfolio',
	)!;

	if (portfolio.length !== 14 || portfolioDefinition.pageCount !== 14) {
		throw new Error('Portfolio must contain exactly fourteen pages.');
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

	const portfolioRole = getPage(portfolio, 1, 'cover', 'cover').metadata?.find(
		({ label }) => label === '직무',
	)?.value;
	const overviewRole = getPage(
		portfolio,
		2,
		'experience-overview',
		'overview',
	).metadata?.find(({ label }) => label === '직무')?.value;
	if (
		portfolioRole !== manifest.role ||
		overviewRole !== manifest.role ||
		resume.role !== manifest.role ||
		resume.careers[0]?.role !== manifest.role ||
		careerBrief.role !== manifest.role ||
		careerBrief.company.role !== manifest.role
	) {
		throw new Error(
			'Recruiting documents must use the manifest role in public and private document headers.',
		);
	}

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
	assertSameOrder(
		manifest.selection.portfolioProjectIds,
		EXPECTED_PORTFOLIO_PROJECT_IDS,
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
	assertUnique(manifest.selection.resumeProjectIds, 'Resume project selection');
	assertSameOrder(
		manifest.selection.resumeProjectIds,
		EXPECTED_RESUME_PROJECT_IDS,
		'Resume project selection',
	);
	if (
		manifest.selection.resumeProjectIds.length !== 4 ||
		manifest.selection.resumeProjectIds.some(
			(id) => !manifest.selection.portfolioProjectIds.includes(id),
		)
	) {
		throw new Error(
			'Resume projects must be four projects selected from the portfolio.',
		);
	}

	assertUnique(
		resume.projects.map(({ id }) => id),
		'Resume project IDs',
	);
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

	EXPECTED_FEATURED_PAGES.forEach(({ pageNumber, id, storyIds, caseIds }) => {
		const page = getPage(portfolio, pageNumber, id, 'case');
		assertPageEvidence(
			page,
			'work-story',
			storyIds,
			`Featured work-story evidence on page ${pageNumber}`,
		);
		assertPageEvidence(
			page,
			'work-case',
			caseIds,
			`Featured work-case evidence on page ${pageNumber}`,
		);
	});

	const supportingPage = getPage(
		portfolio,
		8,
		'supporting-work',
		'compact-work',
	);
	assertPageEvidence(
		supportingPage,
		'work-story',
		manifest.selection.supportingWorkStoryIds,
		'Supporting work-story evidence on page 8',
	);
	const supportingItems = supportingPage.sections.find(
		({ id }) => id === 'work-list',
	)?.items;
	if (!supportingItems || supportingItems.length !== 5) {
		throw new Error('Portfolio page 8 must contain five supporting work items.');
	}
	const supportingItemIds = supportingItems.map((item, index) => {
		const ids = (item.evidence ?? [])
			.filter(({ source }) => source === 'work-story')
			.map(({ id }) => id);
		if (ids.length !== 1) {
			throw new Error(
				`Supporting work item ${index + 1} must reference exactly one work story.`,
			);
		}
		return ids[0];
	});
	assertSameOrder(
		supportingItemIds,
		manifest.selection.supportingWorkStoryIds,
		'Supporting work item order',
	);

	EXPECTED_PROJECT_PAGES.forEach(({ pageNumber, id, projectIds }) => {
		const kind = 'project';
		const page = getPage(portfolio, pageNumber, id, kind);
		assertPageEvidence(
			page,
			'project',
			projectIds,
			`Project evidence on page ${pageNumber}`,
		);
	});

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
	const allowedPublicEmails = new Set(
		portfolioPublicEmails.map(({ address }) => address.toLowerCase()),
	);
	if (
		publicEmails.some((email) => !allowedPublicEmails.has(email.toLowerCase()))
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

	portfolio.forEach(validatePageMetrics);
	validateRecruitingDocumentNumericClaims({ portfolio, resume, careerBrief });

	if (resume.competencies.length !== 4) {
		throw new Error('Resume must expose exactly four core competencies.');
	}
	if (resume.careers.length < 2) {
		throw new Error(
			'Resume must include current career and the earlier field internship.',
		);
	}
}
