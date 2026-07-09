'use client';

import { Fragment, useMemo } from 'react';
import { useLocale } from '@/contexts/localeContext';
import type { ProfessionalCase } from '@/types/work';
import { WorkCaseDetail } from './workCaseDetail';

const featuredCaseOrder = [
	'delivery-operations-web',
	'mobile-output-bridge',
	'ai-kickoff-documentation-tool',
	'structured-editor-ui',
	'hybrid-life-info-platform',
];

const byFeaturedOrder = (workCase: ProfessionalCase) => {
	const index = featuredCaseOrder.indexOf(workCase.id);
	return index === -1 ? featuredCaseOrder.length : index;
};

const CaseIndex = ({
	title,
	cases,
	className = '',
}: {
	title: string;
	cases: ProfessionalCase[];
	className?: string;
}) => (
	<div className={className}>
		<nav
			className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0"
			aria-label={title}
		>
			{cases.map((workCase) => (
				<a
					key={workCase.id}
					href={`#${workCase.id}`}
					className="group inline-flex max-w-[18rem] shrink-0 items-center gap-2 rounded-full border border-border/35 px-2.5 py-1.5 text-sm interactive-soft hover:border-accent/45 hover:bg-secondary/25 sm:max-w-full sm:shrink"
				>
					<span className="shrink-0 text-xs font-bold uppercase tracking-[0.08em] text-accent">
						{workCase.platform}
					</span>
					<span className="min-w-0 truncate font-medium text-foreground group-hover:text-accent">
						{workCase.title}
					</span>
				</a>
			))}
		</nav>
	</div>
);

const CaseBridge = ({
	source,
	target,
}: {
	source: ProfessionalCase;
	target: ProfessionalCase;
}) => (
	<div className="-my-2 px-0 sm:-my-3 sm:px-6">
		<div className="relative">
			<div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-border/45 sm:block" />
			<div className="relative mx-auto max-w-3xl rounded-lg border border-border/35 bg-background px-4 py-3 sm:px-5">
				<div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="min-w-0 space-y-1">
						<p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
							{source.relatedLabel}
						</p>
						{source.relatedDescription && (
							<p className="text-sm leading-6 text-muted-foreground break-keep">
								{source.relatedDescription}
							</p>
						)}
					</div>
					<div className="flex shrink-0 flex-wrap items-center gap-2 text-sm font-bold">
						<a
							href={`#${source.id}`}
							className="rounded-full border border-border/35 px-2.5 py-1 interactive-soft hover:border-accent/45 hover:text-accent"
						>
							{source.title}
						</a>
						<span className="text-muted-foreground" aria-hidden="true">
							↔
						</span>
						<a
							href={`#${target.id}`}
							className="rounded-full border border-border/35 px-2.5 py-1 interactive-soft hover:border-accent/45 hover:text-accent"
						>
							{target.title}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const CompactCase = ({
	workCase,
	labels,
}: {
	workCase: ProfessionalCase;
	labels: {
		stack: string;
		problem: string;
		thinking: string;
		process: string;
		solution: string;
		impact: string;
		checks: string;
	};
}) => (
	<article
		id={workCase.id}
		className="scroll-mt-24 border-t border-border/35 py-6 first:border-t-0 sm:py-7"
	>
		<div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
			<div className="min-w-0 space-y-3">
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-full border border-border/45 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
						{workCase.platform}
					</span>
					<span className="rounded-full bg-secondary/45 px-2.5 py-1 text-xs font-semibold text-foreground">
						{workCase.workType}
					</span>
					<span className="text-xs font-semibold text-muted-foreground">
						{workCase.period}
					</span>
				</div>
				<div className="space-y-1">
					<p className="text-xs font-semibold text-muted-foreground break-keep">
						{workCase.area}
					</p>
					<h3 className="text-xl font-bold text-foreground break-keep">
						{workCase.title}
					</h3>
				</div>
				<p className="text-sm font-semibold leading-6 text-foreground break-keep">
					{workCase.headline}
				</p>
				<p className="text-sm leading-6 text-muted-foreground break-keep">
					{workCase.summary}
				</p>
			</div>

			<div className="min-w-0 space-y-4">
				<div className="grid gap-4 md:grid-cols-3">
					<section className="space-y-2">
						<h4 className="text-sm font-bold text-foreground">{labels.problem}</h4>
						<p className="text-sm leading-6 text-muted-foreground break-keep">
							{workCase.problem}
						</p>
					</section>
					<section className="space-y-2">
						<h4 className="text-sm font-bold text-foreground">{labels.thinking}</h4>
						<p className="text-sm leading-6 text-muted-foreground break-keep">
							{workCase.thinking[0]}
						</p>
					</section>
					<section className="space-y-2">
						<h4 className="text-sm font-bold text-foreground">{labels.solution}</h4>
						<p className="text-sm leading-6 text-muted-foreground break-keep">
							{workCase.solution[0]}
						</p>
					</section>
				</div>

				<div className="flex flex-wrap gap-2" aria-label={labels.impact}>
					{workCase.impact.slice(0, 2).map((item) => (
						<span
							key={`${item.value}-${item.label}`}
							className="max-w-full rounded-full bg-secondary/35 px-2.5 py-1 text-xs font-semibold text-foreground break-keep"
						>
							{item.value} · {item.label}
						</span>
					))}
				</div>

				<ul className="flex flex-wrap gap-2" aria-label={labels.stack}>
					{workCase.stack.slice(0, 5).map((item) => (
						<li
							key={item}
							className="rounded-full border border-border/30 px-2.5 py-1 text-xs font-medium text-muted-foreground"
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	</article>
);

export const WorkPage = () => {
	const { dictionary, data } = useLocale();
	const { work } = dictionary;
	const featuredCases = useMemo(
		() =>
			data.workCases
				.filter((workCase) => workCase.weight === 'featured')
				.sort((a, b) => byFeaturedOrder(a) - byFeaturedOrder(b)),
		[data.workCases],
	);
	const compactCases = useMemo(
		() => data.workCases.filter((workCase) => workCase.weight === 'compact'),
		[data.workCases],
	);
	const indexCases = useMemo(
		() => [...featuredCases, ...compactCases],
		[compactCases, featuredCases],
	);

	return (
		<main className="flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-20 lg:py-20">
			<div className="flex w-full max-w-7xl flex-col gap-10 sm:gap-14">
				<section className="space-y-5 border-b border-border/40 pb-8 sm:pb-10">
					<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
						{work.title}
					</h1>
					<p className="max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed break-keep">
						{work.intro}
					</p>
				</section>

				<section
					className="space-y-4 border-b border-border/35 pb-6"
					aria-labelledby="work-index-title"
				>
					<h2
						id="work-index-title"
						className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
					>
						{work.indexTitle}
					</h2>
					<CaseIndex title={work.indexTitle} cases={indexCases} />
				</section>

				<div className="min-w-0 space-y-12">
					<section className="space-y-1" aria-labelledby="work-featured-title">
						<h2
							id="work-featured-title"
							className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
						>
							{work.featuredTitle}
						</h2>
						<div>
							{featuredCases.map((workCase, index) => {
								const nextCase = featuredCases[index + 1];
								const shouldBridge =
									workCase.id === 'delivery-operations-web' &&
									nextCase?.id === 'mobile-output-bridge';

								return (
									<Fragment key={workCase.id}>
										<WorkCaseDetail workCase={workCase} labels={work.labels} />
										{shouldBridge && <CaseBridge source={workCase} target={nextCase} />}
									</Fragment>
								);
							})}
						</div>
					</section>

					<section className="space-y-4" aria-labelledby="work-compact-title">
						<div className="flex flex-col gap-3 border-t border-border/40 pt-8 sm:flex-row sm:items-end sm:justify-between">
							<h2
								id="work-compact-title"
								className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
							>
								{work.compactTitle}
							</h2>
							<p className="max-w-2xl text-sm leading-6 text-muted-foreground break-keep">
								{work.compactIntro}
							</p>
						</div>
						<div className="rounded-lg border border-border/35 px-4 sm:px-5">
							{compactCases.map((workCase) => (
								<CompactCase
									key={workCase.id}
									workCase={workCase}
									labels={work.labels}
								/>
							))}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};
