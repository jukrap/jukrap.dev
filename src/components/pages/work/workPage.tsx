'use client';

import { useMemo } from 'react';
import { useLocale } from '@/contexts/localeContext';
import { WorkCaseDetail } from './workCaseDetail';

export const WorkPage = () => {
	const { dictionary, data } = useLocale();
	const { work } = dictionary;
	const featuredCases = useMemo(
		() => data.workCases.filter((workCase) => workCase.weight === 'featured'),
		[data.workCases],
	);
	const compactCases = useMemo(
		() => data.workCases.filter((workCase) => workCase.weight === 'compact'),
		[data.workCases],
	);

	return (
		<main className="flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-20 lg:py-20">
			<div className="flex w-full max-w-6xl flex-col gap-10 sm:gap-14">
				<section className="space-y-5 border-b border-border/40 pb-8 sm:pb-10">
					<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
						{work.title}
					</h1>
					<p className="max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed break-keep">
						{work.intro}
					</p>
				</section>

				<section className="space-y-4" aria-labelledby="work-index-title">
					<h2
						id="work-index-title"
						className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
					>
						{work.indexTitle}
					</h2>

					<div className="flex flex-wrap gap-2">
						{data.workCases.map((workCase) => (
							<a
								key={workCase.id}
								href={`#${workCase.id}`}
								className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/35 px-3 py-1.5 text-sm interactive-soft hover:border-accent/45 hover:bg-secondary/25"
							>
								<span className="shrink-0 text-xs font-bold uppercase tracking-[0.08em] text-accent">
									{workCase.platform}
								</span>
								<span className="min-w-0 truncate font-medium text-foreground">
									{workCase.title}
								</span>
							</a>
						))}
					</div>
				</section>

				<section className="space-y-2" aria-labelledby="work-featured-title">
					<h2
						id="work-featured-title"
						className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
					>
						{work.featuredTitle}
					</h2>
					<div>
						{featuredCases.map((workCase) => (
							<WorkCaseDetail
								key={workCase.id}
								workCase={workCase}
								labels={work.labels}
							/>
						))}
					</div>
				</section>

				<section className="space-y-4" aria-labelledby="work-compact-title">
					<h2
						id="work-compact-title"
						className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
					>
						{work.compactTitle}
					</h2>
					<div className="overflow-hidden rounded-lg border border-border/35">
						{compactCases.map((workCase, index) => (
							<article
								key={workCase.id}
								id={workCase.id}
								className={[
									'scroll-mt-24 grid gap-4 px-4 py-5 sm:px-5 md:grid-cols-[11rem_minmax(0,1fr)]',
									index > 0 ? 'border-t border-border/30' : '',
								].join(' ')}
							>
								<div className="space-y-2">
									<div className="flex flex-wrap items-center gap-2">
										<span className="rounded-full border border-border/45 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
											{workCase.platform}
										</span>
									</div>
									<p className="text-xs font-medium leading-5 text-muted-foreground">
										{workCase.period}
									</p>
									<p className="text-xs font-semibold leading-5 text-foreground">
										{workCase.role}
									</p>
								</div>
								<div className="min-w-0">
									<p className="text-xs font-semibold text-muted-foreground">
										{workCase.area}
									</p>
									<h3 className="mt-1 text-lg font-bold text-foreground break-keep">
										{workCase.title}
									</h3>
									<p className="mt-2 text-sm font-semibold leading-6 text-foreground break-keep">
										{workCase.headline}
									</p>
									<p className="mt-2 text-sm leading-6 text-muted-foreground break-keep">
										{workCase.summary}
									</p>
									<ul className="mt-4 flex flex-wrap gap-2">
										{workCase.stack.slice(0, 5).map((item) => (
											<li
												key={item}
												className="rounded-full bg-secondary/30 px-2.5 py-1 text-xs font-medium text-foreground"
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							</article>
						))}
					</div>
				</section>
			</div>
		</main>
	);
};
