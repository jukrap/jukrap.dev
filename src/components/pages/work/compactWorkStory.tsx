'use client';

import { ChevronDown } from 'lucide-react';
import type { LocaleDictionary } from '@/types/locale';
import type { ProfessionalStory, WorkImpact } from '@/types/work';

type WorkLabels = LocaleDictionary['work']['labels'];

interface CompactWorkStoryProps {
	story: ProfessionalStory;
	index: number;
	labels: WorkLabels;
}

const DetailList = ({ items }: { items: string[] }) => (
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

const RemainingImpact = ({ items }: { items: WorkImpact[] }) => (
	<dl className="divide-y divide-border/45">
		{items.map((item) => (
			<div key={`${item.value}-${item.label}`} className="py-4">
				<dt className="font-semibold text-foreground tabular-nums">{item.value}</dt>
				<dd className="mt-1 text-sm font-medium leading-6 text-foreground/80 break-keep">
					{item.label}
				</dd>
				{item.detail && (
					<dd className="mt-1 text-sm leading-6 text-foreground/75 break-keep">
						{item.detail}
					</dd>
				)}
			</div>
		))}
	</dl>
);

const TechnologyList = ({ items }: { items: string[] }) => (
	<ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-6 text-foreground/70">
		{items.map((item, index) => (
			<li key={item} className="flex items-center gap-3">
				{index > 0 && (
					<span className="text-muted-foreground" aria-hidden="true">
						·
					</span>
				)}
				<span>{item}</span>
			</li>
		))}
	</ul>
);

export const CompactWorkStory = ({
	story,
	index,
	labels,
}: CompactWorkStoryProps) => {
	const chapter = story.chapters[0];
	if (!chapter) return null;

	const primaryDecision = chapter.decisions[0];
	const primaryImpact = chapter.impact[0];
	const primaryCheck = chapter.checks[0];
	const remainingImpacts = primaryImpact
		? chapter.impact.slice(1)
		: chapter.impact;
	const remainingChecks = primaryCheck
		? chapter.checks.slice(1)
		: chapter.checks;
	const hasAdditionalEvidence =
		Boolean(chapter.context) ||
		chapter.decisions.length > 1 ||
		chapter.execution.length > 0 ||
		remainingImpacts.length > 0 ||
		remainingChecks.length > 0 ||
		chapter.additionalEvidence.length > 0;

	return (
		<article
			id={story.id}
			tabIndex={-1}
			className="scroll-mt-32 grid gap-4 border-t border-border/60 py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-12"
		>
			<p className="text-sm font-bold text-accent tabular-nums">
				{String(index).padStart(2, '0')}
			</p>

			<div className="min-w-0">
				<header>
					<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-muted-foreground">
						<span>{story.workType}</span>
						<span aria-hidden="true">·</span>
						<span>{story.platform}</span>
						<span aria-hidden="true">·</span>
						<span>{story.period}</span>
					</div>
					<h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground break-keep">
						{story.title}
					</h3>
					<div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5">
						<p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
							{labels.stack}
						</p>
						<TechnologyList items={story.stack} />
					</div>
				</header>

				<div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-8">
					{primaryDecision && (
						<section>
							<h4 className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
								{labels.decisions}
							</h4>
							<p className="mt-2 text-base leading-7 text-foreground/85 break-keep">
								{primaryDecision}
							</p>
						</section>
					)}

					{(primaryImpact || primaryCheck) && (
						<section>
							<h4 className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
								{labels.results}
							</h4>
							{primaryImpact && (
								<div className="mt-2">
									<p className="text-base leading-7 text-foreground break-keep">
										<span className="font-semibold">{primaryImpact.label}</span>
										<span className="mx-2 text-muted-foreground" aria-hidden="true">
											—
										</span>
										<span className="font-semibold tabular-nums">
											{primaryImpact.value}
										</span>
										{primaryImpact.detail && (
											<>
												<span className="mx-2 text-muted-foreground" aria-hidden="true">
													·
												</span>
												<span className="text-sm text-foreground/75">
													{primaryImpact.detail}
												</span>
											</>
										)}
									</p>
								</div>
							)}
							{primaryCheck && (
								<p className="relative mt-3 pl-4 text-sm leading-6 text-foreground/75 break-keep before:absolute before:left-0 before:top-[0.55rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
									{primaryCheck}
								</p>
							)}
						</section>
					)}
				</div>

				{hasAdditionalEvidence && (
					<details className="group mt-6 border-y border-border/50 md:mt-8">
						<summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
							<span>{labels.additionalEvidence}</span>
							<ChevronDown
								className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
								aria-hidden="true"
							/>
						</summary>
						<div className="space-y-8 border-t border-border/45 bg-secondary/20 px-4 py-8 sm:px-5">
							<div className="space-y-2">
								<p className="font-semibold leading-7 text-foreground break-keep">
									{story.headline}
								</p>
								<p className="text-[0.9375rem] leading-7 text-foreground/80 break-keep">
									{story.summary}
								</p>
							</div>

							<section className="space-y-2">
								<h4 className="text-sm font-bold text-foreground">{labels.problem}</h4>
								<p className="text-[0.9375rem] leading-7 text-foreground/80 break-keep">
									{chapter.context}
								</p>
							</section>

							{chapter.decisions.length > 1 && (
								<section className="space-y-2">
									<h4 className="text-sm font-bold text-foreground">
										{labels.thinking}
									</h4>
									<DetailList items={chapter.decisions.slice(1)} />
								</section>
							)}

							<div className="grid gap-8 lg:grid-cols-2">
								{chapter.execution.length > 0 && (
									<section className="space-y-2">
										<h4 className="text-sm font-bold text-foreground">
											{labels.solution}
										</h4>
										<DetailList items={chapter.execution} />
									</section>
								)}

								{chapter.additionalEvidence.length > 0 && (
									<section className="space-y-2">
										<h4 className="text-sm font-bold text-foreground">
											{labels.process}
										</h4>
										<DetailList items={chapter.additionalEvidence} />
									</section>
								)}
							</div>

							{remainingImpacts.length > 0 && (
								<section className="space-y-2">
									<h4 className="text-sm font-bold text-foreground">{labels.impact}</h4>
									<RemainingImpact items={remainingImpacts} />
								</section>
							)}

							{remainingChecks.length > 0 && (
								<section className="space-y-2">
									<h4 className="text-sm font-bold text-foreground">{labels.checks}</h4>
									<DetailList items={remainingChecks} />
								</section>
							)}
						</div>
					</details>
				)}
			</div>
		</article>
	);
};
