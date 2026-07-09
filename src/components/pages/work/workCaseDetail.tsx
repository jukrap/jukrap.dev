'use client';

import type { ReactNode } from 'react';
import type { ProfessionalCase } from '@/types/work';

interface WorkCaseDetailProps {
	workCase: ProfessionalCase;
	relatedCase?: ProfessionalCase;
	labels: {
		stack: string;
		problem: string;
		thinking: string;
		process: string;
		solution: string;
		impact: string;
		checks: string;
	};
}

const FlowBlock = ({
	index,
	title,
	children,
}: {
	index: string;
	title: string;
	children: ReactNode;
}) => (
	<section className="min-w-0 rounded-lg border border-border/35 p-4">
		<div className="flex items-center gap-2">
			<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
				{index}
			</span>
			<h4 className="text-sm font-bold text-foreground">{title}</h4>
		</div>
		<div className="mt-3 text-sm leading-6 text-muted-foreground break-keep">
			{children}
		</div>
	</section>
);

const FlowList = ({ items }: { items: string[] }) => (
	<ul className="space-y-2">
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

export const WorkCaseDetail = ({
	workCase,
	relatedCase,
	labels,
}: WorkCaseDetailProps) => (
	<article
		id={workCase.id}
		className="scroll-mt-24 border-t border-border/45 py-10 sm:py-12"
	>
		<header className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
			<div className="min-w-0 space-y-4">
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-full border border-border/45 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
						{workCase.platform}
					</span>
					<span className="rounded-full bg-secondary/45 px-2.5 py-1 text-xs font-semibold text-foreground">
						{workCase.workType}
					</span>
					<span className="text-xs font-semibold text-muted-foreground break-keep">
						{workCase.area}
					</span>
				</div>
				<div className="space-y-2">
					<h3 className="text-2xl font-bold tracking-tight text-foreground break-keep sm:text-3xl">
						{workCase.title}
					</h3>
					<p className="text-sm font-medium leading-6 text-muted-foreground">
						{workCase.period} · {workCase.role}
					</p>
					<p className="text-lg font-semibold leading-7 text-foreground break-keep">
						{workCase.headline}
					</p>
					<p className="text-sm leading-6 text-muted-foreground break-keep">
						{workCase.summary}
					</p>
					{relatedCase && workCase.relatedLabel && (
						<a
							href={`#${relatedCase.id}`}
							className="inline-flex max-w-full flex-col gap-1 rounded-lg border border-border/35 px-3 py-2 text-sm interactive-soft hover:border-accent/45 hover:bg-secondary/25"
						>
							<span className="font-bold text-accent">
								{workCase.relatedLabel} · {relatedCase.title}
							</span>
							{workCase.relatedDescription && (
								<span className="text-xs leading-5 text-muted-foreground break-keep">
									{workCase.relatedDescription}
								</span>
							)}
						</a>
					)}
				</div>
			</div>

			<div className="min-w-0 space-y-3">
				<h4 className="text-sm font-bold text-foreground">{labels.stack}</h4>
				<ul className="flex flex-wrap gap-2" aria-label={labels.stack}>
					{workCase.stack.map((item) => (
						<li
							key={item}
							className="rounded-full border border-border/35 px-3 py-1 text-xs font-medium text-foreground"
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		</header>

		<div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
			<FlowBlock index="1" title={labels.problem}>
				<p>{workCase.problem}</p>
			</FlowBlock>
			<FlowBlock index="2" title={labels.thinking}>
				<FlowList items={workCase.thinking} />
			</FlowBlock>
			<FlowBlock index="3" title={labels.process}>
				<FlowList items={workCase.process} />
			</FlowBlock>
			<FlowBlock index="4" title={labels.solution}>
				<FlowList items={workCase.solution} />
			</FlowBlock>
		</div>

		<footer className="mt-8 grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
			<section className="flex min-w-0 flex-col gap-3">
				<h4 className="text-sm font-bold text-foreground">{labels.impact}</h4>
				<dl className="grid flex-1 auto-rows-fr gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
					{workCase.impact.map((item) => (
						<div
							key={`${item.value}-${item.label}`}
							className="flex h-full min-w-0 flex-col rounded-lg bg-secondary/25 px-3 py-3"
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
			</section>

			<section className="flex min-w-0 flex-col gap-3">
				<h4 className="text-sm font-bold text-foreground">{labels.checks}</h4>
				<ul className="grid flex-1 auto-rows-fr gap-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
					{workCase.checks.map((item) => (
						<li
							key={item}
							className="flex h-full items-start rounded-lg border border-border/30 px-3 py-2 text-sm leading-6 text-muted-foreground break-keep"
						>
							{item}
						</li>
					))}
				</ul>
			</section>
		</footer>
	</article>
);
