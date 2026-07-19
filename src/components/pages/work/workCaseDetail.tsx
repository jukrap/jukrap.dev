'use client';

import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LocaleDictionary } from '@/types/locale';
import type {
	ProfessionalStory,
	WorkImpact,
	WorkStoryChapter,
} from '@/types/work';

type WorkLabels = LocaleDictionary['work']['labels'];

interface WorkCaseDetailProps {
	story: ProfessionalStory;
	labels: WorkLabels;
}

interface StoryStageProps {
	index: string;
	title: string;
	children: ReactNode;
}

const StoryStage = ({ index, title, children }: StoryStageProps) => (
	<section className="grid gap-3 border-t border-border/40 pt-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6 sm:pt-8">
		<div className="flex items-center gap-2 self-start sm:sticky sm:top-36">
			<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
				{index}
			</span>
			<h4 className="text-sm font-bold text-foreground break-keep">{title}</h4>
		</div>
		<div className="min-w-0">{children}</div>
	</section>
);

const EvidenceList = ({ items }: { items: string[] }) => (
	<ul className="space-y-2 text-sm leading-6 text-muted-foreground">
		{items.map((item) => (
			<li
				key={item}
				className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
			>
				{item}
			</li>
		))}
	</ul>
);

const ImpactList = ({ items }: { items: WorkImpact[] }) => (
	<dl className="grid gap-2 min-[360px]:grid-cols-2 xl:grid-cols-3">
		{items.map((item) => (
			<div
				key={`${item.value}-${item.label}`}
				className="min-w-0 rounded-md bg-secondary/30 px-3 py-3"
			>
				<dt className="text-base font-bold text-foreground tabular-nums break-words">
					{item.value}
				</dt>
				<dd className="mt-1 text-xs font-semibold text-muted-foreground break-keep">
					{item.label}
				</dd>
				{item.detail && (
					<dd className="mt-2 text-xs leading-5 text-muted-foreground break-keep">
						{item.detail}
					</dd>
				)}
			</div>
		))}
	</dl>
);

const CheckList = ({ items }: { items: string[] }) => (
	<ul className="grid gap-2 min-[360px]:grid-cols-2 xl:grid-cols-3">
		{items.map((item) => (
			<li
				key={item}
				className="rounded-md border border-border/35 px-3 py-2 text-sm leading-6 text-muted-foreground break-keep"
			>
				{item}
			</li>
		))}
	</ul>
);

const ChapterHeader = ({ chapter }: { chapter: WorkStoryChapter }) => (
	<header className="mb-4 flex flex-col gap-2 border-b border-border/30 pb-4 sm:flex-row sm:items-start sm:justify-between">
		<div className="min-w-0">
			<div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
				<span className="text-foreground">{chapter.platform}</span>
				<span className="text-muted-foreground">{chapter.area}</span>
			</div>
			<h5 className="mt-1 text-base font-bold text-foreground break-keep sm:text-lg">
				{chapter.title}
			</h5>
			<p className="mt-1 text-sm leading-6 text-muted-foreground break-keep">
				{chapter.summary}
			</p>
		</div>
		<p className="shrink-0 text-xs font-semibold text-muted-foreground">
			{chapter.period}
		</p>
	</header>
);

const ChapterDecision = ({
	chapter,
	labels,
	showHeader,
}: {
	chapter: WorkStoryChapter;
	labels: WorkLabels;
	showHeader: boolean;
}) => {
	const Subheading = showHeader ? 'h6' : 'h5';

	return (
		<section
			id={showHeader ? chapter.id : undefined}
			tabIndex={showHeader ? -1 : undefined}
			className="scroll-mt-[8.25rem] rounded-lg border border-border/35 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
		>
			{showHeader && <ChapterHeader chapter={chapter} />}
			<div className="grid gap-4 min-[360px]:grid-cols-2 lg:gap-5">
				<div className="min-w-0 space-y-2">
					<Subheading className="text-sm font-bold text-foreground">
						{labels.thinking}
					</Subheading>
					<EvidenceList items={chapter.decisions.slice(0, 1)} />
				</div>
				<div className="min-w-0 space-y-2">
					<Subheading className="text-sm font-bold text-foreground">
						{labels.process}
					</Subheading>
					<EvidenceList items={chapter.execution.slice(0, 1)} />
				</div>
			</div>
		</section>
	);
};

const StoryResults = ({
	story,
	labels,
}: {
	story: ProfessionalStory;
	labels: WorkLabels;
}) => (
	<section className="space-y-5">
		{story.resultSections.map((section) => {
			const isChapterResult = story.resultSections.length > 1;
			const ResultLabel = isChapterResult ? 'h6' : 'h5';

			return (
				<section key={section.id} className="space-y-3">
					{isChapterResult && section.title && (
						<h5 className="border-b border-border/30 pb-2 text-sm font-bold text-foreground break-keep">
							{section.title}
						</h5>
					)}
					<div className="space-y-3">
						<ResultLabel className="text-sm font-bold text-foreground">
							{labels.impact}
						</ResultLabel>
						<ImpactList items={section.impact} />
					</div>
					<div className="space-y-3">
						<ResultLabel className="text-sm font-bold text-foreground">
							{labels.checks}
						</ResultLabel>
						<CheckList items={section.checks} />
					</div>
				</section>
			);
		})}
	</section>
);

const AdditionalEvidence = ({
	story,
	labels,
}: {
	story: ProfessionalStory;
	labels: WorkLabels;
}) => {
	const EvidenceHeading = story.chapters.length > 1 ? 'h6' : 'h5';
	const chaptersWithEvidence = story.chapters.filter(
		(chapter) =>
			chapter.additionalEvidence.length > 0 ||
			chapter.decisions.length > 1 ||
			chapter.execution.length > 1 ||
			chapter.impact.length > 0 ||
			chapter.checks.length > 0,
	);
	const hasExtendedStack = story.stack.length > 8;
	if (chaptersWithEvidence.length === 0 && !hasExtendedStack) {
		return null;
	}

	return (
		<details className="group rounded-lg border border-border/35 bg-secondary/10">
			<summary className="interactive-soft flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
				<h4>{labels.additionalEvidence}</h4>
				<ChevronDown
					className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
					aria-hidden="true"
				/>
			</summary>
			<div className="space-y-5 border-t border-border/30 px-4 py-4">
				<p className="text-sm leading-6 text-muted-foreground break-keep">
					{story.summary}
				</p>
				{chaptersWithEvidence.map((chapter) => (
					<section key={chapter.id} className="space-y-2">
						{story.chapters.length > 1 && (
							<h5 className="text-sm font-bold text-foreground break-keep">
								{chapter.title}
							</h5>
						)}
						{chapter.decisions.length > 1 && (
							<div className="space-y-2">
								<EvidenceHeading className="text-xs font-bold text-foreground">
									{labels.thinking}
								</EvidenceHeading>
								<EvidenceList items={chapter.decisions.slice(1)} />
							</div>
						)}
						{chapter.execution.length > 1 && (
							<div className="space-y-2">
								<EvidenceHeading className="text-xs font-bold text-foreground">
									{labels.process}
								</EvidenceHeading>
								<EvidenceList items={chapter.execution.slice(1)} />
							</div>
						)}
						{chapter.additionalEvidence.length > 0 && (
							<div className="space-y-2">
								<EvidenceHeading className="text-xs font-bold text-foreground">
									{labels.additionalEvidence}
								</EvidenceHeading>
								<EvidenceList items={chapter.additionalEvidence} />
							</div>
						)}
						{chapter.impact.length > 0 && (
							<div className="space-y-2">
								<EvidenceHeading className="text-xs font-bold text-foreground">
									{labels.impact}
								</EvidenceHeading>
								<ImpactList items={chapter.impact} />
							</div>
						)}
						{chapter.checks.length > 0 && (
							<div className="space-y-2">
								<EvidenceHeading className="text-xs font-bold text-foreground">
									{labels.checks}
								</EvidenceHeading>
								<CheckList items={chapter.checks} />
							</div>
						)}
					</section>
				))}

				{hasExtendedStack && (
					<section className="space-y-2">
						<h5 className="text-sm font-bold text-foreground">{labels.stack}</h5>
						<ul className="flex flex-wrap gap-2" aria-label={labels.stack}>
							{story.stack.map((item) => (
								<li
									key={item}
									className="rounded-full border border-border/35 px-2.5 py-1 text-xs font-medium text-muted-foreground"
								>
									{item}
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
		</details>
	);
};

export const WorkCaseDetail = ({ story, labels }: WorkCaseDetailProps) => {
	const isChapterGroup = story.chapters.length > 1;

	return (
		<article
			id={story.id}
			tabIndex={-1}
			className="scroll-mt-[8.25rem] border-t border-border/45 py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-12"
		>
			<header className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-start">
				<div className="min-w-0 space-y-3">
					<div className="flex flex-wrap items-center gap-2">
						<span className="rounded-full border border-border/45 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-foreground">
							{story.platform}
						</span>
						<span className="rounded-full bg-secondary/45 px-2.5 py-1 text-xs font-semibold text-foreground">
							{story.workType}
						</span>
						<span className="text-xs font-semibold text-muted-foreground break-keep">
							{story.area}
						</span>
					</div>
					<div className="space-y-2">
						<h3 className="text-2xl font-bold tracking-tight text-foreground break-keep sm:text-3xl">
							{story.title}
						</h3>
						<p className="text-sm font-medium leading-6 text-muted-foreground">
							{story.period} · {story.role}
						</p>
						<p className="text-lg font-semibold leading-7 text-foreground break-keep">
							{story.headline}
						</p>
					</div>
				</div>

				<div className="min-w-0 space-y-3">
					<h4 className="text-sm font-bold text-foreground">{labels.stack}</h4>
					<ul className="flex flex-wrap gap-2" aria-label={labels.stack}>
						{story.stack.slice(0, 5).map((item) => (
							<li
								key={item}
								className="rounded-full border border-border/35 px-3 py-1 text-xs font-medium text-foreground"
							>
								{item}
							</li>
						))}
						{story.stack.length > 5 && (
							<li className="rounded-full border border-border/35 px-3 py-1 text-xs font-medium text-muted-foreground">
								+{story.stack.length - 5}
							</li>
						)}
					</ul>
				</div>
			</header>

			<div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
				<StoryStage index="1" title={labels.context}>
					<p className="max-w-4xl text-sm leading-7 text-muted-foreground break-keep">
						{story.context}
					</p>
				</StoryStage>

				<StoryStage index="2" title={labels.decisions}>
					<div className="space-y-4">
						{story.chapters.map((chapter) => (
							<ChapterDecision
								key={chapter.id}
								chapter={chapter}
								labels={labels}
								showHeader={isChapterGroup}
							/>
						))}
					</div>
				</StoryStage>

				<StoryStage index="3" title={labels.results}>
					<StoryResults story={story} labels={labels} />
				</StoryStage>

				<AdditionalEvidence story={story} labels={labels} />
			</div>
		</article>
	);
};
