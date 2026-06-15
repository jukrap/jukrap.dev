'use client';

import type { ProfessionalCase } from '@/types/work';

interface WorkCaseDetailProps {
	workCase: ProfessionalCase;
	labels: {
		stack: string;
		scope: string;
		contribution: string;
		outcome: string;
		verification: string;
	};
}

const DetailList = ({ title, items }: { title: string; items: string[] }) => (
	<section className="space-y-3">
		<h4 className="text-sm font-bold text-foreground">{title}</h4>
		<ul className="space-y-2">
			{items.map((item) => (
				<li
					key={item}
					className="relative pl-4 text-sm leading-6 text-muted-foreground break-keep before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
				>
					{item}
				</li>
			))}
		</ul>
	</section>
);

export const WorkCaseDetail = ({ workCase, labels }: WorkCaseDetailProps) => (
	<article
		id={workCase.id}
		className="scroll-mt-24 border-t border-border/45 py-9 sm:py-12"
	>
		<header className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
			<div className="space-y-4">
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-full border border-border/45 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
						{workCase.platform}
					</span>
					<span className="text-xs font-semibold text-muted-foreground">
						{workCase.area}
					</span>
				</div>
				<div className="space-y-2">
					<h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
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
				</div>
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

			<dl className="overflow-hidden rounded-lg border border-border/35">
				{workCase.metrics.map((metric, index) => (
					<div
						key={`${metric.value}-${metric.label}`}
						className={[
							'px-4 py-3.5',
							index > 0 ? 'border-t border-border/30' : '',
						].join(' ')}
					>
						<div>
							<dt className="text-lg font-bold text-foreground tabular-nums whitespace-nowrap">
								{metric.value}
							</dt>
							<dd className="mt-1 text-xs font-semibold text-muted-foreground">
								{metric.label}
							</dd>
						</div>
						{metric.detail && (
							<dd className="mt-2 text-xs leading-5 text-muted-foreground break-keep">
								{metric.detail}
							</dd>
						)}
					</div>
				))}
			</dl>
		</header>

		<div className="mt-8 grid gap-7 lg:grid-cols-3">
			<DetailList title={labels.scope} items={workCase.scope} />
			<DetailList title={labels.contribution} items={workCase.contribution} />
			<DetailList title={labels.outcome} items={workCase.outcome} />
			<section className="space-y-3 lg:col-span-3">
				<h4 className="text-sm font-bold text-foreground">{labels.verification}</h4>
				<ul className="grid gap-2 md:grid-cols-3">
					{workCase.verification.map((item) => (
						<li
							key={item}
							className="rounded-lg bg-secondary/25 px-3 py-2 text-sm leading-6 text-muted-foreground break-keep"
						>
							{item}
						</li>
					))}
				</ul>
			</section>
		</div>
	</article>
);
