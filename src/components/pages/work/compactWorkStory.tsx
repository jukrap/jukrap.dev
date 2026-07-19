'use client';

import { ChevronDown } from 'lucide-react';
import type { LocaleDictionary } from '@/types/locale';
import type { ProfessionalStory, WorkImpact } from '@/types/work';

type WorkLabels = LocaleDictionary['work']['labels'];

interface CompactWorkStoryProps {
	story: ProfessionalStory;
	labels: WorkLabels;
}

const DetailList = ({ items }: { items: string[] }) => (
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

const RemainingImpact = ({ items }: { items: WorkImpact[] }) => (
	<ul className="space-y-2 text-sm leading-6 text-muted-foreground">
		{items.map((item) => (
			<li key={`${item.value}-${item.label}`}>
				<strong className="font-semibold text-foreground">
					{item.value} · {item.label}
				</strong>
				{item.detail && <span className="block text-xs">{item.detail}</span>}
			</li>
		))}
	</ul>
);

export const CompactWorkStory = ({ story, labels }: CompactWorkStoryProps) => {
	const chapter = story.chapters[0];
	if (!chapter) return null;

	const primaryDecision = chapter.decisions[0];
	const primaryImpact = chapter.impact[0];
	const primaryCheck = chapter.checks[0];
	const hasAdditionalEvidence =
		Boolean(chapter.context) ||
		chapter.decisions.length > 1 ||
		chapter.execution.length > 0 ||
		chapter.impact.length > 1 ||
		chapter.checks.length > 1 ||
		chapter.additionalEvidence.length > 0;

	return (
		<article
			id={story.id}
			tabIndex={-1}
			className="scroll-mt-[8.25rem] border-t border-border/35 py-5 first:border-t-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			<header className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5">
				<div className="min-w-0 space-y-3">
					<div className="flex flex-wrap items-center gap-2">
						<span className="rounded-full border border-border/45 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-foreground">
							{story.platform}
						</span>
						<span className="rounded-full bg-secondary/45 px-2.5 py-1 text-xs font-semibold text-foreground">
							{story.workType}
						</span>
						<span className="text-xs font-semibold text-muted-foreground">
							{story.period}
						</span>
					</div>
					<div className="space-y-1.5">
						<p className="text-xs font-semibold text-muted-foreground break-keep">
							{story.area}
						</p>
						<h3 className="text-xl font-bold text-foreground break-keep">
							{story.title}
						</h3>
					</div>
				</div>

				<div className="min-w-0 space-y-3">
					<div className="grid gap-3 min-[360px]:grid-cols-2">
						{primaryDecision && (
							<section className="space-y-2">
								<h4 className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
									{labels.thinking}
								</h4>
								<p className="text-sm leading-6 text-muted-foreground break-keep">
									{primaryDecision}
								</p>
							</section>
						)}
						{primaryCheck && (
							<section className="space-y-2">
								<h4 className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
									{labels.checks}
								</h4>
								<p className="text-sm leading-6 text-muted-foreground break-keep">
									{primaryCheck}
								</p>
							</section>
						)}
					</div>
					{primaryImpact && (
						<p className="rounded-md bg-secondary/30 px-3 py-2 text-sm leading-6 text-muted-foreground break-keep">
							<span className="mr-2 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
								{labels.impact}
							</span>
							<strong className="font-semibold text-foreground">
								{primaryImpact.value}
							</strong>{' '}
							· {primaryImpact.label}
						</p>
					)}

					<ul className="flex flex-wrap gap-2" aria-label={labels.stack}>
						{story.stack.slice(0, 5).map((item) => (
							<li
								key={item}
								className="rounded-full border border-border/30 px-2.5 py-1 text-xs font-medium text-muted-foreground"
							>
								{item}
							</li>
						))}
						{story.stack.length > 5 && (
							<li className="rounded-full border border-border/30 px-2.5 py-1 text-xs font-medium text-muted-foreground">
								+{story.stack.length - 5}
							</li>
						)}
					</ul>
				</div>
			</header>

			{hasAdditionalEvidence && (
				<details className="group mt-5 rounded-md border border-border/30 bg-secondary/10">
					<summary className="interactive-soft flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
						<span>{labels.additionalEvidence}</span>
						<ChevronDown
							className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
							aria-hidden="true"
						/>
					</summary>
					<div className="grid gap-5 border-t border-border/30 px-4 py-4 md:grid-cols-2 xl:grid-cols-3">
						<div className="space-y-2 md:col-span-2 xl:col-span-3">
							<p className="text-sm font-semibold leading-6 text-foreground break-keep">
								{story.headline}
							</p>
							<p className="text-sm leading-6 text-muted-foreground break-keep">
								{story.summary}
							</p>
						</div>
						<section className="space-y-2">
							<h4 className="text-sm font-bold text-foreground">{labels.context}</h4>
							<p className="text-sm leading-6 text-muted-foreground break-keep">
								{chapter.context}
							</p>
						</section>

						{chapter.decisions.length > 1 && (
							<section className="space-y-2">
								<h4 className="text-sm font-bold text-foreground">
									{labels.decisions}
								</h4>
								<DetailList items={chapter.decisions.slice(1)} />
							</section>
						)}

						{chapter.execution.length > 0 && (
							<section className="space-y-2">
								<h4 className="text-sm font-bold text-foreground">{labels.process}</h4>
								<DetailList items={chapter.execution} />
							</section>
						)}

						{chapter.impact.length > 1 && (
							<section className="space-y-2">
								<h4 className="text-sm font-bold text-foreground">{labels.results}</h4>
								<RemainingImpact items={chapter.impact.slice(1)} />
							</section>
						)}

						{chapter.checks.length > 1 && (
							<section className="space-y-2">
								<h4 className="text-sm font-bold text-foreground">{labels.checks}</h4>
								<DetailList items={chapter.checks.slice(1)} />
							</section>
						)}

						{chapter.additionalEvidence.length > 0 && (
							<section className="space-y-2">
								<h4 className="text-sm font-bold text-foreground">
									{labels.additionalEvidence}
								</h4>
								<DetailList items={chapter.additionalEvidence} />
							</section>
						)}
					</div>
				</details>
			)}
		</article>
	);
};
