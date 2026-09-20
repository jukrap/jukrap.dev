'use client';

import ScrollReveal from '@/components/common/scrollReveal';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LocaleDictionary } from '@/types/locale';
import type { ProfessionalStory, WorkStoryChapter } from '@/types/work';
import { getWorkMeasurements, WorkEvidenceList } from './workEvidenceList';
import { WorkTechnologyList } from './workTechnologyList';

type WorkLabels = LocaleDictionary['work']['labels'];

interface WorkCaseDetailProps {
	story: ProfessionalStory;
	index: number;
	labels: WorkLabels;
}

interface EditorialSectionProps {
	title: string;
	children: ReactNode;
}

const EditorialSection = ({ title, children }: EditorialSectionProps) => (
	<section className="grid gap-3 py-4 sm:py-6 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-8 md:py-8">
		<h4 className="work-section-label text-foreground break-keep">{title}</h4>
		<div className="min-w-0">{children}</div>
	</section>
);

const EvidenceList = ({ items }: { items: string[] }) => (
	<ul className="space-y-3 text-[0.9375rem] leading-7 text-foreground/80">
		{items.map((item) => (
			<li
				key={item}
				className="relative pl-4 before:absolute before:left-0 before:top-[0.7rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
			>
				{item}
			</li>
		))}
	</ul>
);

const TechnologyEnvironment = ({ story }: { story: ProfessionalStory }) => {
	if (story.chapters.length === 1) {
		return <WorkTechnologyList items={story.stack} />;
	}

	return (
		<div className="space-y-3">
			{story.chapters.map((chapter) => (
				<div
					key={chapter.id}
					className="grid gap-1.5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-4"
				>
					<p className="text-sm font-semibold leading-6 text-foreground/80">
						{chapter.platform}
					</p>
					<WorkTechnologyList items={chapter.stack} />
				</div>
			))}
		</div>
	);
};

const ChapterImplementations = ({
	chapters,
}: {
	chapters: WorkStoryChapter[];
}) => (
	<div className="space-y-5">
		{chapters.map((chapter) => (
			<section
				key={chapter.id}
				id={chapter.id}
				tabIndex={-1}
				className="scroll-mt-32 md:scroll-mt-40 xl:scroll-mt-32 grid gap-2 border-l border-border/60 pl-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6"
			>
				<div className="text-xs font-semibold leading-5 text-muted-foreground">
					<p className="text-foreground">{chapter.platform}</p>
					<p>{chapter.period}</p>
				</div>
				<div className="min-w-0">
					<h5 className="text-base font-bold text-foreground break-keep">
						{chapter.title}
					</h5>
					<div className="mt-3">
						<EvidenceList items={chapter.execution} />
					</div>
				</div>
			</section>
		))}
	</div>
);

const StoryResults = ({ story }: { story: ProfessionalStory }) => {
	const sections = story.resultSections
		.map((section) => ({
			...section,
			impact: getWorkMeasurements(section.impact),
		}))
		.filter((section) => section.impact.length > 0);
	if (sections.length === 0) return null;
	const hasMultipleSections = sections.length > 1;

	return (
		<div
			className={`mt-5 sm:mt-6 ${
				hasMultipleSections ? 'divide-y divide-border/45' : ''
			}`}
		>
			{sections.map((section) => (
				<section
					key={section.id}
					className={
						hasMultipleSections
							? 'grid gap-0 lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-6'
							: undefined
					}
				>
					{hasMultipleSections && section.title && (
						<h5 className="pb-1 pt-5 work-section-label text-foreground break-keep lg:py-4">
							{section.title}
						</h5>
					)}
					<div className={`min-w-0 ${hasMultipleSections ? 'py-4' : ''}`}>
						<WorkEvidenceList items={section.impact} />
					</div>
				</section>
			))}
		</div>
	);
};

const DetailRow = ({ title, children }: EditorialSectionProps) => (
	<section className="grid gap-3 border-t border-border/45 py-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6">
		<h6 className="work-section-label text-foreground break-keep">{title}</h6>
		<div className="min-w-0">{children}</div>
	</section>
);

export const ChapterEvidence = ({
	chapter,
	labels,
	showTitle,
	showContext = true,
	showImplementation = true,
	showMeasurements = true,
}: {
	chapter: WorkStoryChapter;
	labels: WorkLabels;
	showTitle: boolean;
	showContext?: boolean;
	showImplementation?: boolean;
	showMeasurements?: boolean;
}) => (
	<section className="border-t-2 border-foreground/20 pt-10 first:border-t-0 first:pt-0">
		{showTitle && (
			<header className="grid gap-2 pb-8 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6">
				<p className="text-sm font-bold leading-6 text-accent">
					{chapter.platform}
				</p>
				<div className="min-w-0">
					<h5 className="text-xl font-bold leading-7 text-foreground break-keep">
						{chapter.title}
					</h5>
					<div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm leading-6 text-muted-foreground">
						<span>{chapter.period}</span>
						<span>{chapter.area}</span>
					</div>
				</div>
			</header>
		)}

		<div>
			{showContext && chapter.context && (
				<DetailRow title={labels.problem}>
					<p className="text-[0.9375rem] leading-7 text-foreground/80 break-keep">
						{chapter.context}
					</p>
				</DetailRow>
			)}

			<DetailRow title={labels.thinking}>
				<EvidenceList items={chapter.decisions} />
			</DetailRow>

			{showImplementation ? (
				<div className="grid gap-8 border-t border-border/45 py-6 lg:grid-cols-2 lg:gap-10">
					{chapter.execution.length > 0 && (
						<section className="space-y-3">
							<h6 className="work-section-label text-foreground">{labels.solution}</h6>
							<EvidenceList items={chapter.execution} />
						</section>
					)}
					{chapter.additionalEvidence.length > 0 && (
						<section className="space-y-3">
							<h6 className="work-section-label text-foreground">{labels.process}</h6>
							<EvidenceList items={chapter.additionalEvidence} />
						</section>
					)}
				</div>
			) : chapter.additionalEvidence.length > 0 ? (
				<DetailRow title={labels.process}>
					<EvidenceList items={chapter.additionalEvidence} />
				</DetailRow>
			) : null}

			{showMeasurements && getWorkMeasurements(chapter.impact).length > 0 && (
				<DetailRow title={labels.impact}>
					<WorkEvidenceList items={getWorkMeasurements(chapter.impact)} />
				</DetailRow>
			)}
			{chapter.checks.length > 0 && (
				<DetailRow title={labels.checks}>
					<EvidenceList items={chapter.checks} />
				</DetailRow>
			)}
		</div>
	</section>
);

const AdditionalEvidence = ({
	story,
	labels,
}: {
	story: ProfessionalStory;
	labels: WorkLabels;
}) => (
	<details className="group border-y border-border/55">
		<summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 work-section-label text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
			<span>{labels.additionalEvidence}</span>
			<ChevronDown
				className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
				aria-hidden="true"
			/>
		</summary>
		<div className="border-t border-border/45 bg-secondary/20 px-4 py-8 sm:px-6">
			<div className="space-y-12">
				{story.chapters.map((chapter) => (
					<ChapterEvidence
						key={chapter.id}
						chapter={chapter}
						labels={labels}
						showTitle={story.chapters.length > 1}
						showContext={story.chapters.length > 1}
						showImplementation={false}
						showMeasurements={false}
					/>
				))}
			</div>
		</div>
	</details>
);

export const WorkCaseDetail = ({
	story,
	index,
	labels,
}: WorkCaseDetailProps) => {
	const editorial = story.editorial;
	if (!editorial) return null;

	return (
		<ScrollReveal
			as="article"
			id={story.id}
			tabIndex={-1}
			className="scroll-mt-32 md:scroll-mt-40 xl:scroll-mt-32 border-t-2 border-foreground/70 py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-14"
		>
			<header>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
					<span className="font-bold text-accent tabular-nums">
						{String(index).padStart(2, '0')}
					</span>
					<span>{story.workType}</span>
					<span>{story.platform}</span>
					<span>{story.period}</span>
				</div>
				<h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground break-keep sm:text-4xl">
					{story.title}
				</h3>
				<p className="mt-4 max-w-[42rem] text-lg font-semibold leading-8 text-foreground break-keep sm:text-xl sm:leading-9">
					{story.headline}
				</p>

				<dl className="mt-6 space-y-4 border-t border-border/45 pt-4 sm:mt-7 sm:pt-5">
					<div className="grid gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8">
						<dt className="work-section-label text-muted-foreground">
							{labels.scope}
						</dt>
						<dd className="text-sm leading-6 break-keep">
							<p className="font-medium text-foreground/85">{story.role}</p>
							{story.area !== story.role ? (
								<p className="mt-1 text-foreground/70">{story.area}</p>
							) : null}
						</dd>
					</div>
					<div className="grid gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8">
						<dt className="work-section-label text-muted-foreground">
							{labels.stack}
						</dt>
						<dd>
							<TechnologyEnvironment story={story} />
						</dd>
					</div>
				</dl>
			</header>

			<div className="mt-6 divide-y divide-border/45 border-t border-border/45 sm:mt-12">
				<EditorialSection title={labels.context}>
					<p className="max-w-[42rem] text-base leading-8 text-foreground/85 break-keep">
						{story.context}
					</p>
				</EditorialSection>

				<EditorialSection title={labels.decisions}>
					{story.chapters.length > 1 ? (
						<ChapterImplementations chapters={story.chapters} />
					) : (
						<EvidenceList items={story.chapters[0].execution} />
					)}
				</EditorialSection>

				{editorial.outcome ||
				story.resultSections.some(
					(section) => getWorkMeasurements(section.impact).length > 0,
				) ? (
					<EditorialSection title={labels.results}>
						{editorial.outcome ? (
							<p className="max-w-[42rem] text-base leading-8 text-foreground/85 break-keep">
								{editorial.outcome}
							</p>
						) : null}
						<StoryResults story={story} />
					</EditorialSection>
				) : null}
			</div>

			<AdditionalEvidence story={story} labels={labels} />
		</ScrollReveal>
	);
};
