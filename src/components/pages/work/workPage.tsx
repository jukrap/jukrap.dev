'use client';

import { useLocale } from '@/contexts/localeContext';
import { CompactWorkStory } from './compactWorkStory';
import { WorkCaseDetail } from './workCaseDetail';
import { WorkChapterRail } from './workChapterRail';

export const WorkPage = () => {
	const { dictionary, data } = useLocale();
	const { work } = dictionary;
	const featuredStories = data.workStories.filter(
		(story) => story.tier === 'featured',
	);
	const compactStories = data.workStories.filter(
		(story) => story.tier === 'compact',
	);

	return (
		<div className="flex w-full flex-col items-center py-8 sm:py-12 lg:py-20">
			<div className="flex w-full max-w-7xl flex-col">
				<section className="space-y-5 pb-8 sm:pb-10">
					<h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
						{work.title}
					</h1>
					<p className="max-w-3xl text-base leading-relaxed text-muted-foreground break-keep md:text-lg">
						{work.intro}
					</p>
				</section>

				<WorkChapterRail
					stories={data.workStories}
					labels={{
						index: work.indexTitle,
						current: work.currentStory,
						open: work.openTableOfContents,
						close: work.closeTableOfContents,
					}}
				/>

				<div className="min-w-0 pt-10 sm:pt-14">
					<section aria-labelledby="work-featured-title">
						<h2
							id="work-featured-title"
							className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
						>
							{work.featuredTitle}
						</h2>
						<div className="mt-2">
							{featuredStories.map((story) => (
								<WorkCaseDetail key={story.id} story={story} labels={work.labels} />
							))}
						</div>
					</section>

					<section className="mt-12 sm:mt-16" aria-labelledby="work-compact-title">
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
						<div className="mt-5 rounded-lg border border-border/35 px-4 sm:px-5">
							{compactStories.map((story) => (
								<CompactWorkStory key={story.id} story={story} labels={work.labels} />
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};
