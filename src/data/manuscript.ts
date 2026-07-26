import imageMetadata from '@/data/imageMetadata.json';
import { portfolioData } from '@/data/i18n/portfolio';
import { workStories } from '@/data/workStories';
import type { Locale } from '@/types/locale';
import type {
	CaseStudyDecision,
	CaseStudyRecord,
	LocalizedCopy,
	MediaAsset,
	ProjectDetailSection,
	ProjectLinkRecord,
	ProjectRecord,
	VerifiedResult,
} from '@/types/manuscript';
import type { BaseProjectTask, Project } from '@/types/project';

type ImageMetadata = Record<
	string,
	{
		width: number;
		height: number;
		isPortrait: boolean;
	}
>;

const metadata = imageMetadata as ImageMetadata;

const localized = (ko: string, en: string): LocalizedCopy => ({ ko, en });

const joinDetails = (task: BaseProjectTask) =>
	[task.title, ...task.details].join('\n');

const projectBySlug = (locale: Locale, slug: string) =>
	portfolioData[locale].projectDetails.find((project) => project.id === slug);

const projectLinkLabel: Record<string, LocalizedCopy> = {
	github: localized('GitHub 저장소', 'GitHub repository'),
	url: localized('웹사이트', 'Website'),
	appleStore: localized('App Store', 'App Store'),
	googleStore: localized('Google Play', 'Google Play'),
	video: localized('영상', 'Video'),
	ppt: localized('발표 자료', 'Presentation'),
	doc: localized('문서', 'Document'),
	other: localized('관련 자료', 'Related material'),
	detailView: localized('상세 보기', 'View details'),
};

const toMediaAsset = (
	source: string,
	projectKo: Project,
	projectEn: Project,
	mediaIndex: number,
): MediaAsset => {
	const dimensions = metadata[`/public${source}`];
	if (!dimensions) {
		throw new Error(`Missing image metadata for ${source}`);
	}

	return {
		source,
		alt: localized(
			`${projectKo.title} 프로젝트 화면 ${mediaIndex + 1}`,
			`${projectEn.title} project screen ${mediaIndex + 1}`,
		),
		width: dimensions.width,
		height: dimensions.height,
		license:
			'Project-owner-approved portfolio screenshot; embedded third-party marks and assets retain their respective rights',
		provenance: `Repository asset ${source}; project record ${projectKo.id}`,
	};
};

const buildDecision = (
	koTitle: string,
	enTitle: string,
	koBody: string,
	enBody: string,
): CaseStudyDecision => ({
	title: localized(koTitle, enTitle),
	body: localized(koBody, enBody),
});

const buildVerifiedResult = (
	koStatement: string,
	enStatement: string,
	evidence: string,
): VerifiedResult => ({
	statement: localized(koStatement, enStatement),
	evidence,
});

export const caseStudyRecords: CaseStudyRecord[] = workStories.ko.map(
	(koStory, storyIndex) => {
		const enStory = workStories.en[storyIndex];
		if (!enStory || koStory.id !== enStory.id) {
			throw new Error(`Work story locale mismatch at ${koStory.id}`);
		}

		const decisions = koStory.chapters.flatMap((koChapter, chapterIndex) => {
			const enChapter = enStory.chapters[chapterIndex];
			if (!enChapter || koChapter.id !== enChapter.id) {
				throw new Error(`Work chapter locale mismatch at ${koChapter.id}`);
			}

			return koChapter.decisions.map((decision, decisionIndex) =>
				buildDecision(
					koChapter.title,
					enChapter.title,
					decision,
					enChapter.decisions[decisionIndex] ?? decision,
				),
			);
		});

		const verifiedResults = koStory.resultSections.flatMap(
			(koSection, sectionIndex) => {
				const enSection = enStory.resultSections[sectionIndex];
				const evidence = `src/data/workCases.ts#${koSection.id}`;

				return koSection.impact.map((impact, impactIndex) => {
					const enImpact = enSection?.impact[impactIndex];
					const koStatement = [impact.value, impact.label, impact.detail]
						.filter(Boolean)
						.join(' — ');
					const enStatement = [
						enImpact?.value ?? impact.value,
						enImpact?.label ?? impact.label,
						enImpact?.detail,
					]
						.filter(Boolean)
						.join(' — ');

					return buildVerifiedResult(koStatement, enStatement, evidence);
				});
			},
		);

		return {
			slug: koStory.id,
			title: localized(koStory.title, enStory.title),
			summary: localized(koStory.summary, enStory.summary),
			role: localized(koStory.role, enStory.role),
			period: koStory.period,
			stack: koStory.stack,
			context: localized(koStory.context, enStory.context),
			decisions,
			verifiedResults,
			evidence: [
				...koStory.caseIds.map((id) => `src/data/workCases.ts#${id}`),
				`src/data/workStories.ts#${koStory.id}`,
			],
			media: [],
		};
	},
);

const detailSectionGroups = (
	projectKo: Project,
	projectEn: Project,
): ProjectDetailSection[] => {
	const groups: Array<{
		title: LocalizedCopy;
		ko?: BaseProjectTask[];
		en?: BaseProjectTask[];
	}> = [
		{
			title: localized('주요 작업', 'Key work'),
			ko: projectKo.tasks,
			en: projectEn.tasks,
		},
		{
			title: localized('문제 해결', 'Troubleshooting'),
			ko: projectKo.troubleshooting,
			en: projectEn.troubleshooting,
		},
		{
			title: localized('성능 개선', 'Performance improvements'),
			ko: projectKo.performanceImprovements,
			en: projectEn.performanceImprovements,
		},
		{
			title: localized('특별 사항', 'Highlights'),
			ko: projectKo.specialImplementations,
			en: projectEn.specialImplementations,
		},
	];

	return groups.flatMap((group) =>
		(group.ko ?? []).map((koTask, index) => ({
			title: localized(koTask.title, group.en?.[index]?.title ?? koTask.title),
			body: localized(
				joinDetails(koTask),
				group.en?.[index] ? joinDetails(group.en[index]) : joinDetails(koTask),
			),
		})),
	);
};

const buildProjectLinks = (
	projectKo: Project,
	projectEn: Project,
): ProjectLinkRecord[] => {
	const mainLinks = projectKo.links.filter((link) => link.type !== 'detailView');
	const supportingLinks = projectKo.projectData.subLinks;

	return [...mainLinks, ...supportingLinks].map((link) => {
		const matchingEnglishLink = [
			...projectEn.links,
			...projectEn.projectData.subLinks,
		].find(
			(candidate) => candidate.type === link.type && candidate.url === link.url,
		);

		return {
			label:
				projectLinkLabel[link.type] ??
				localized(link.type, matchingEnglishLink?.type ?? link.type),
			href: link.url,
			available: link.visible && Boolean(link.url) && link.url !== '/',
		};
	});
};

export const projectRecords: ProjectRecord[] =
	portfolioData.ko.projectDetails.map((projectKo) => {
		const projectEn = projectBySlug('en', projectKo.id);
		if (!projectEn) {
			throw new Error(`Missing English project record for ${projectKo.id}`);
		}

		return {
			slug: projectKo.id,
			title: localized(projectKo.title, projectEn.title),
			summary: localized(projectKo.overview, projectEn.overview),
			platform: projectKo.platform,
			period: projectKo.duration,
			role: localized(projectKo.role.join(', '), projectEn.role.join(', ')),
			stack: projectKo.techStack,
			links: buildProjectLinks(projectKo, projectEn),
			media: projectKo.projectData.images.map((source, mediaIndex) =>
				toMediaAsset(source, projectKo, projectEn, mediaIndex),
			),
			detailSections: detailSectionGroups(projectKo, projectEn),
		};
	});

export const getCaseStudy = (slug: string) =>
	caseStudyRecords.find((record) => record.slug === slug);

export const getProjectRecord = (slug: string) =>
	projectRecords.find((record) => record.slug === slug);

export const getLocalizedCopy = (
	value: LocalizedCopy,
	locale: Locale,
): string => value[locale];
