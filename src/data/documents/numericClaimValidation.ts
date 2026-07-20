import { activities } from '@/data/about/activities';
import { awards } from '@/data/about/awards';
import { personalInfo } from '@/data/about/personalInfo';
import { skills } from '@/data/about/skills';
import { projectsData } from '@/data/projectsData';
import { projectsDetailData } from '@/data/projectsDetailData';
import { workCases } from '@/data/workCases';
import { workStories } from '@/data/workStories';
import type {
	CareerBriefCopy,
	DocumentContentItem,
	DocumentContentSection,
	DocumentEvidenceRef,
	PortfolioPageDefinition,
	ResumeDocumentCopy,
} from '@/types/documents';
import {
	privateProfileEvidenceRecords,
	publicProfileEvidenceRecords,
} from './profileEvidence';

const NUMERIC_VALUE_PATTERN = String.raw`\d[\d,]*(?:\.\d+)?`;
const DATE_PATTERN = String.raw`(?:19|20)\d{2}[.-]\d{1,2}(?:[.-]\d{1,2})?`;
const numericClaimPatterns = [
	new RegExp(
		String.raw`Android\s*${NUMERIC_VALUE_PATTERN}\s*\/\s*API\s*${NUMERIC_VALUE_PATTERN}`,
		'giu',
	),
	new RegExp(
		String.raw`${NUMERIC_VALUE_PATTERN}\s*tests?\s*\/\s*(?:skipped\s*)?${NUMERIC_VALUE_PATTERN}`,
		'giu',
	),
	new RegExp(
		String.raw`${NUMERIC_VALUE_PATTERN}\s*\/\s*${NUMERIC_VALUE_PATTERN}`,
		'gu',
	),
	new RegExp(
		String.raw`${DATE_PATTERN}\s*(?:~|\u2013|\u2014)\s*(?:${DATE_PATTERN}|\uD604\uC7AC|Present)`,
		'giu',
	),
	new RegExp(
		String.raw`${NUMERIC_VALUE_PATTERN}\s*(?:\u2192|->)\s*${NUMERIC_VALUE_PATTERN}\s*(?:kB|MB|GB|ms|s|\uCD08|\uBD84|\uC2DC\uAC04|\uC77C|%|\uBC30)?`,
		'giu',
	),
	new RegExp(
		String.raw`${NUMERIC_VALUE_PATTERN}\s*(?:~|\u2013|\u2014|-)\s*${NUMERIC_VALUE_PATTERN}\s*(?:\uBC30|%|\uCD08|\uBD84|\uC2DC\uAC04|\uC77C)`,
		'giu',
	),
	new RegExp(DATE_PATTERN, 'gu'),
	new RegExp(
		String.raw`${NUMERIC_VALUE_PATTERN}\s*(?:kB|MB|GB|ms|\uCD08|\uBD84|\uC2DC\uAC04|\uC77C|\uBA85|\uC778|\uAC1C|\uAC74|\uD589|\uD68C|\uC704|\uCABD|\uBC30|%|tests?)`,
		'giu',
	),
	new RegExp(String.raw`(?:Android|API)\s*${NUMERIC_VALUE_PATTERN}`, 'giu'),
	new RegExp(String.raw`skipped\s*${NUMERIC_VALUE_PATTERN}`, 'giu'),
	/\b(?:19|20)\d{2}\b/gu,
] as const;

function collectSourceStrings(value: unknown): string[] {
	if (typeof value === 'string') {
		return [value];
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return [String(value)];
	}
	if (Array.isArray(value)) {
		return value.flatMap(collectSourceStrings);
	}
	if (value && typeof value === 'object') {
		return Object.values(value).flatMap(collectSourceStrings);
	}
	return [];
}

function extractNumericClaims(values: readonly string[]) {
	return values.flatMap((value) =>
		numericClaimPatterns.flatMap((pattern) =>
			Array.from(value.matchAll(new RegExp(pattern.source, pattern.flags))).map(
				([claim]) => claim,
			),
		),
	);
}

function normalizeNumericClaim(claim: string) {
	return claim
		.normalize('NFKC')
		.toLowerCase()
		.replace(/\bpresent\b/g, '현재')
		.replace(/[\u2013\u2014]/g, '~')
		.replace(/->/g, '→')
		.replace(/,/g, '')
		.replace(/\s+/g, '');
}

const numericClaimAliases = [
	{
		claim: normalizeNumericClaim('72시간'),
		sourceClaim: normalizeNumericClaim('3일'),
		evidence: 'project:captain-donghae',
	},
	{
		claim: normalizeNumericClaim('3일'),
		sourceClaim: normalizeNumericClaim('72시간'),
		evidence: 'project:captain-donghae',
	},
] as const;

function scopedWorkStoryEvidence(
	id: string,
	workCaseIds: readonly string[],
): unknown {
	const story = workStories.ko.find((candidate) => candidate.id === id);
	if (!story) {
		throw new Error(`Unknown work-story evidence source: ${id}`);
	}
	if (workCaseIds.length === 0) {
		return story;
	}

	const chapters = story.chapters.filter(({ id: chapterId }) =>
		workCaseIds.includes(chapterId),
	);
	const resultSections = story.resultSections.filter(({ id: sectionId }) =>
		workCaseIds.includes(sectionId),
	);

	return {
		...story,
		chapters,
		resultSections,
		impact: resultSections.flatMap(({ impact }) => impact),
		checks: resultSections.flatMap(({ checks }) => checks),
	};
}

function evidenceSourceValues(
	ref: DocumentEvidenceRef,
	workCaseIds: readonly string[],
): string[] {
	switch (ref.source) {
		case 'work-story':
			return collectSourceStrings(scopedWorkStoryEvidence(ref.id, workCaseIds));
		case 'work-case': {
			const record = workCases.ko.find(({ id }) => id === ref.id);
			if (!record) {
				throw new Error(`Unknown work-case evidence source: ${ref.id}`);
			}
			return collectSourceStrings(record);
		}
		case 'project': {
			const summary = projectsData.find(({ id }) => id === ref.id);
			const detail = projectsDetailData.find(({ id }) => id === ref.id);
			if (!summary || !detail) {
				throw new Error(`Incomplete project evidence source: ${ref.id}`);
			}
			return [
				...collectSourceStrings(summary),
				...collectSourceStrings(detail),
				`${detail.teamSize}명`,
				`${detail.teamSize}인`,
			];
		}
		case 'activity': {
			const record = activities.find(({ id }) => id === ref.id);
			if (!record) {
				throw new Error(`Unknown activity evidence source: ${ref.id}`);
			}
			return collectSourceStrings(record);
		}
		case 'award': {
			const record = awards.find(({ title }) => title === ref.id);
			if (!record) {
				throw new Error(`Unknown award evidence source: ${ref.id}`);
			}
			return collectSourceStrings(record);
		}
		case 'profile': {
			if (ref.id === 'personal-info') {
				return collectSourceStrings(personalInfo);
			}
			if (ref.id === 'skills') {
				return collectSourceStrings(skills);
			}
			if (ref.id === 'links') {
				return [];
			}
			const record = [
				...publicProfileEvidenceRecords,
				...privateProfileEvidenceRecords,
			].find(({ id }) => id === ref.id);
			if (!record) {
				throw new Error(`Unknown profile evidence source: ${ref.id}`);
			}
			return collectSourceStrings(record);
		}
	}
}

function assertClaimsAgainstSourceValues(
	visibleValues: readonly (string | undefined)[],
	sourceValues: readonly string[],
	refs: readonly DocumentEvidenceRef[],
	label: string,
) {
	const claims = extractNumericClaims(
		visibleValues.filter((value): value is string => Boolean(value)),
	);
	if (claims.length === 0) {
		return;
	}

	const supportedClaims = new Set(
		extractNumericClaims(sourceValues).map(normalizeNumericClaim),
	);
	const unsupportedClaim = claims.find((claim) => {
		const normalized = normalizeNumericClaim(claim);
		if (supportedClaims.has(normalized)) {
			return false;
		}
		return !numericClaimAliases.some(
			(alias) =>
				alias.claim === normalized &&
				refs.some(({ source, id }) => `${source}:${id}` === alias.evidence) &&
				supportedClaims.has(alias.sourceClaim),
		);
	});

	if (unsupportedClaim) {
		throw new Error(
			`${label} contains unsupported numeric claim "${unsupportedClaim}" for evidence [${refs.map(({ source, id }) => `${source}:${id}`).join(', ')}].`,
		);
	}
}

function assertNumericClaimsSupported(
	visibleValues: readonly (string | undefined)[],
	refs: readonly DocumentEvidenceRef[],
	label: string,
) {
	const workCaseIds = refs
		.filter(({ source }) => source === 'work-case')
		.map(({ id }) => id);
	assertClaimsAgainstSourceValues(
		visibleValues,
		refs.flatMap((ref) => evidenceSourceValues(ref, workCaseIds)),
		refs,
		label,
	);
}

function contentItemVisibleValues(item: DocumentContentItem) {
	return [
		item.title,
		item.description,
		item.label,
		item.value,
		item.meta,
		...(item.technologies ?? []),
		...(item.links ?? []).map(({ label }) => label),
	];
}

function sectionOwnVisibleValues(section: DocumentContentSection) {
	return [
		section.title,
		...(section.body ?? []),
		...(section.metrics ?? []).flatMap(({ label, value, detail }) => [
			label,
			value,
			detail,
		]),
		...(section.technologies ?? []),
		...(section.links ?? []).map(({ label }) => label),
		...(section.items ?? [])
			.filter(({ evidence }) => !evidence?.length)
			.flatMap(contentItemVisibleValues),
	];
}

function validatePortfolioPageNumericClaims(page: PortfolioPageDefinition) {
	const pageSections =
		page.id === 'closing'
			? page.sections.filter(({ id }) => id !== 'contact')
			: page.sections;
	assertNumericClaimsSupported(
		[
			page.title,
			page.summary,
			...(page.metadata ?? []).flatMap(({ label, value }) => [label, value]),
			...pageSections.flatMap(sectionOwnVisibleValues),
			...(page.images ?? []).flatMap(({ alt, caption }) => [alt, caption]),
		],
		page.evidence,
		`Portfolio page ${page.pageNumber} (${page.id})`,
	);

	page.sections.forEach((section) => {
		(section.items ?? []).forEach((item, index) => {
			if (!item.evidence?.length) {
				return;
			}
			assertNumericClaimsSupported(
				contentItemVisibleValues(item),
				item.evidence,
				`Portfolio page ${page.pageNumber} item ${section.id}:${index + 1}`,
			);
		});
	});

	if (page.id === 'closing') {
		const contactSection = page.sections.find(({ id }) => id === 'contact');
		const caseCount = new Set(workStories.ko.flatMap(({ caseIds }) => caseIds))
			.size;
		assertClaimsAgainstSourceValues(
			contactSection?.body ?? [],
			[`${workStories.ko.length}개`, `${caseCount}개`],
			[],
			'Portfolio closing inventory',
		);
	}
}

function validateResumeNumericClaims(resume: ResumeDocumentCopy) {
	assertNumericClaimsSupported(
		[resume.title, resume.role, resume.profile],
		[{ source: 'profile', id: 'personal-info' }],
		'Resume profile',
	);
	resume.competencies.forEach((competency, index) => {
		assertNumericClaimsSupported(
			[competency.title, competency.detail],
			competency.evidence ?? [],
			`Resume competency ${index + 1}`,
		);
	});
	resume.careers.forEach((career, index) => {
		const profileRefs = career.evidence.filter(
			({ source }) => source === 'profile',
		);
		const deliveryRefs = career.evidence.filter(
			({ source }) => source !== 'profile',
		);
		assertNumericClaimsSupported(
			[
				career.company,
				career.period,
				career.officialTitle,
				career.role,
				career.summary,
			],
			profileRefs,
			`Resume career ${index + 1} profile`,
		);
		assertNumericClaimsSupported(
			career.highlights,
			deliveryRefs.length > 0 ? deliveryRefs : profileRefs,
			`Resume career ${index + 1} highlights`,
		);
	});
	resume.projects.forEach((project, index) => {
		assertNumericClaimsSupported(
			[
				project.title,
				project.period,
				project.role,
				project.summary,
				...(project.highlights ?? []),
				...project.technologies,
			],
			project.evidence,
			`Resume project ${index + 1}`,
		);
	});
	resume.education.forEach((education, index) => {
		assertNumericClaimsSupported(
			[education.title, education.period, education.detail],
			education.evidence ?? [],
			`Resume education ${index + 1}`,
		);
	});
	resume.awards.forEach((award, index) => {
		assertNumericClaimsSupported(
			[award.title, award.period, award.detail],
			award.evidence ?? [],
			`Resume award ${index + 1}`,
		);
	});
	resume.skillGroups.forEach((group, index) => {
		assertNumericClaimsSupported(
			[group.label, ...group.items],
			[{ source: 'profile', id: 'skills' }],
			`Resume skill group ${index + 1}`,
		);
	});
}

function validateCareerBriefNumericClaims(careerBrief: CareerBriefCopy) {
	const companyProfileRefs = careerBrief.company.evidenceRefs.filter(
		({ source }) => source === 'profile',
	);
	const companyWorkRefs = careerBrief.company.evidenceRefs.filter(
		({ source }) => source !== 'profile',
	);
	assertNumericClaimsSupported(
		[
			careerBrief.title,
			careerBrief.role,
			careerBrief.company.name,
			careerBrief.company.period,
			careerBrief.company.officialTitle,
			careerBrief.company.role,
			careerBrief.company.summary,
		],
		companyProfileRefs,
		'Career brief company profile',
	);
	assertNumericClaimsSupported(
		careerBrief.company.responsibilities,
		companyWorkRefs,
		'Career brief company responsibilities',
	);
	careerBrief.featuredWork.forEach((work, index) => {
		assertNumericClaimsSupported(
			[
				work.title,
				work.period,
				work.platform,
				work.goal,
				work.contribution,
				work.decision,
				work.result,
				...work.evidence,
				...work.technologies,
			],
			work.evidenceRefs,
			`Career brief featured work ${index + 1}`,
		);
	});
	careerBrief.supportingWork.forEach((work, index) => {
		assertNumericClaimsSupported(
			[work.title, work.period, work.decision, work.result],
			[work.evidenceRef],
			`Career brief supporting work ${index + 1}`,
		);
	});
	careerBrief.practices.forEach((practice, index) => {
		assertNumericClaimsSupported(
			[practice.title, ...practice.items],
			careerBrief.company.evidenceRefs,
			`Career brief practice ${index + 1}`,
		);
	});
	careerBrief.skillGroups.forEach((group, index) => {
		assertNumericClaimsSupported(
			[group.label, ...group.items],
			[{ source: 'profile', id: 'skills' }],
			`Career brief skill group ${index + 1}`,
		);
	});
}

export function validateRecruitingDocumentNumericClaims({
	portfolio,
	resume,
	careerBrief,
}: {
	portfolio: readonly PortfolioPageDefinition[];
	resume: ResumeDocumentCopy;
	careerBrief: CareerBriefCopy;
}) {
	portfolio.slice(2).forEach(validatePortfolioPageNumericClaims);
	validateResumeNumericClaims(resume);
	validateCareerBriefNumericClaims(careerBrief);
}
