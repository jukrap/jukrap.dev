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
	index: number;
	labels: WorkLabels;
}

interface EditorialSectionProps {
	title: string;
	children: ReactNode;
}

const EditorialSection = ({ title, children }: EditorialSectionProps) => (
	<section className="grid gap-3 border-t border-border/55 py-5 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-8 md:py-8">
		<h4 className="text-sm font-bold text-foreground break-keep">{title}</h4>
		<div className="min-w-0">{children}</div>
	</section>
);

const EvidenceList = ({ items }: { items: string[] }) => (
	<ul className="space-y-2.5 text-[0.9375rem] leading-7 text-foreground/80">
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

const DetailImpactList = ({ items }: { items: WorkImpact[] }) => (
	<dl className="divide-y divide-border/45 border-y border-border/45">
		{items.map((item) => (
			<div
				key={`${item.value}-${item.label}`}
				className="py-3 first:pt-0 last:pb-0"
			>
				<dt className="font-semibold text-foreground tabular-nums break-words">
					{item.value}
				</dt>
				<dd className="mt-1 text-sm font-medium text-foreground/75 break-keep">
					{item.label}
				</dd>
				{item.detail && (
					<dd className="mt-1 text-sm leading-6 text-foreground/70 break-keep">
						{item.detail}
					</dd>
				)}
			</div>
		))}
	</dl>
);

const ResultRows = ({ items }: { items: WorkImpact[] }) => (
	<dl className="divide-y divide-border/50 border-y border-border/50">
		{items.map((item) => (
			<div
				key={`${item.value}-${item.label}`}
				className="grid grid-cols-[minmax(8.5rem,0.9fr)_minmax(0,1.1fr)] gap-4 py-3 sm:grid-cols-[minmax(11rem,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:py-4"
			>
				<dt className="text-lg font-bold leading-7 text-foreground tabular-nums break-words sm:text-xl">
					{item.value}
				</dt>
				<dd className="text-sm leading-6 text-foreground/75 break-keep">
					<span className="font-semibold text-foreground">{item.label}</span>
				</dd>
			</div>
		))}
	</dl>
);

const ChapterBoundaries = ({ chapters }: { chapters: WorkStoryChapter[] }) => (
	<div className="mt-6 divide-y divide-border/45 border-y border-border/45">
		{chapters.map((chapter) => (
			<section
				key={chapter.id}
				id={chapter.id}
				tabIndex={-1}
				className="scroll-mt-32 grid gap-2 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6"
			>
				<div className="text-xs font-semibold leading-5 text-muted-foreground">
					<p className="text-foreground">{chapter.platform}</p>
					<p>{chapter.period}</p>
				</div>
				<div className="min-w-0">
					<h5 className="text-base font-bold text-foreground break-keep">
						{chapter.title}
					</h5>
					<p className="mt-1 text-[0.9375rem] leading-7 text-foreground/75 break-keep">
						{chapter.summary}
					</p>
				</div>
			</section>
		))}
	</div>
);

const StoryResults = ({ story }: { story: ProfessionalStory }) => (
	<div className="mt-5 space-y-6">
		{story.resultSections.map((section) => (
			<section key={section.id} className="space-y-3">
				{story.resultSections.length > 1 && section.title && (
					<h5 className="text-sm font-bold text-foreground break-keep">
						{section.title}
					</h5>
				)}
				<ResultRows items={section.impact} />
			</section>
		))}
	</div>
);

const ChapterEvidence = ({
	chapter,
	labels,
	showTitle,
}: {
	chapter: WorkStoryChapter;
	labels: WorkLabels;
	showTitle: boolean;
}) => (
	<section className="space-y-5 border-t border-border/45 pt-6 first:border-t-0 first:pt-0">
		{showTitle && (
			<header>
				<p className="text-xs font-semibold text-muted-foreground">
					{chapter.platform} · {chapter.period}
				</p>
				<h5 className="mt-1 text-lg font-bold text-foreground break-keep">
					{chapter.title}
				</h5>
			</header>
		)}

		<div className="grid gap-6 sm:grid-cols-2">
			<section className="space-y-2">
				<h6 className="text-sm font-bold text-foreground">{labels.problem}</h6>
				<p className="text-[0.9375rem] leading-7 text-foreground/75 break-keep">
					{chapter.context}
				</p>
			</section>
			<section className="space-y-2">
				<h6 className="text-sm font-bold text-foreground">{labels.thinking}</h6>
				<EvidenceList items={chapter.decisions} />
			</section>
			<section className="space-y-2">
				<h6 className="text-sm font-bold text-foreground">{labels.solution}</h6>
				<EvidenceList items={chapter.execution} />
			</section>
			<section className="space-y-2">
				<h6 className="text-sm font-bold text-foreground">{labels.process}</h6>
				<EvidenceList items={chapter.additionalEvidence} />
			</section>
		</div>

		{chapter.impact.length > 0 && (
			<section className="space-y-3">
				<h6 className="text-sm font-bold text-foreground">{labels.impact}</h6>
				<DetailImpactList items={chapter.impact} />
			</section>
		)}
		{chapter.checks.length > 0 && (
			<section className="space-y-2">
				<h6 className="text-sm font-bold text-foreground">{labels.checks}</h6>
				<EvidenceList items={chapter.checks} />
			</section>
		)}
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
		<summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
			<span>{labels.additionalEvidence}</span>
			<ChevronDown
				className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
				aria-hidden="true"
			/>
		</summary>
		<div className="space-y-7 border-t border-border/45 bg-secondary/20 px-4 py-6 sm:px-6 sm:py-7">
			<p className="text-base leading-7 text-foreground/80 break-keep">
				{story.summary}
			</p>
			{story.chapters.map((chapter) => (
				<ChapterEvidence
					key={chapter.id}
					chapter={chapter}
					labels={labels}
					showTitle={story.chapters.length > 1}
				/>
			))}
		</div>
	</details>
);

const TechnologyList = ({ items }: { items: string[] }) => (
	<ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
		{items.map((item, index) => (
			<li key={item} className="flex items-center gap-3">
				{index > 0 && <span aria-hidden="true">·</span>}
				<span>{item}</span>
			</li>
		))}
	</ul>
);

export const WorkCaseDetail = ({
	story,
	index,
	labels,
}: WorkCaseDetailProps) => {
	const editorial = story.editorial;
	if (!editorial) return null;
	const visibleStack =
		story.stack.length > 6
			? [...story.stack.slice(0, 6), `+${story.stack.length - 6}`]
			: story.stack;

	return (
		<article
			id={story.id}
			tabIndex={-1}
			className="scroll-mt-32 border-t-2 border-foreground/70 py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-14"
		>
			<header>
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-muted-foreground">
					<span className="font-bold text-accent tabular-nums">
						{String(index).padStart(2, '0')}
					</span>
					<span>{story.workType}</span>
					<span aria-hidden="true">·</span>
					<span>{story.platform}</span>
					<span aria-hidden="true">·</span>
					<span>{story.period}</span>
				</div>
				<h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground break-keep sm:text-4xl">
					{story.title}
				</h3>
				<p className="mt-4 max-w-[42rem] text-lg font-semibold leading-8 text-foreground break-keep sm:text-xl sm:leading-9">
					{story.headline}
				</p>
				<div className="mt-6 border-l-2 border-accent pl-4">
					<p className="text-xs font-bold text-muted-foreground">{labels.scope}</p>
					<p className="mt-1 text-sm font-medium leading-6 text-foreground/80 break-keep">
						{story.role} · {story.area}
					</p>
				</div>
			</header>

			<div className="mt-7 sm:mt-10">
				<EditorialSection title={labels.context}>
					<p className="max-w-[42rem] text-base leading-8 text-foreground/85 break-keep">
						{story.context}
					</p>
				</EditorialSection>

				<EditorialSection title={labels.decisions}>
					<p className="max-w-[42rem] text-base leading-8 text-foreground/85 break-keep">
						{editorial.decision}
					</p>
					{story.chapters.length > 1 && (
						<ChapterBoundaries chapters={story.chapters} />
					)}
				</EditorialSection>

				<EditorialSection title={labels.results}>
					<p className="max-w-[42rem] text-base leading-8 text-foreground/85 break-keep">
						{editorial.outcome}
					</p>
					<StoryResults story={story} />
				</EditorialSection>

				<EditorialSection title={labels.takeaway}>
					<p className="border-l-2 border-accent pl-4 text-base font-semibold leading-8 text-foreground break-keep">
						{editorial.takeaway}
					</p>
				</EditorialSection>
			</div>

			<AdditionalEvidence story={story} labels={labels} />

			<footer className="grid gap-2 pt-6 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8">
				<p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
					{labels.stack}
				</p>
				<TechnologyList items={visibleStack} />
			</footer>
		</article>
	);
};
