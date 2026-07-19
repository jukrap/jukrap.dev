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
		<div className="w-full py-10 sm:py-14 lg:py-[4.5rem]">
			<div className="mx-auto w-full max-w-[1200px]">
				<header className="max-w-[48rem] pb-10 sm:pb-12 xl:ml-[17rem] xl:pb-[4.5rem]">
					<h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
						{work.title}
					</h1>
					<p className="mt-5 max-w-[44rem] text-base leading-8 text-foreground/75 break-keep md:text-lg md:leading-8">
						{work.intro}
					</p>
				</header>

				<div className="xl:grid xl:grid-cols-[14rem_minmax(0,48rem)] xl:gap-x-12">
					<WorkChapterRail
						stories={data.workStories}
						labels={{
							index: work.indexTitle,
							current: work.currentStory,
							open: work.openTableOfContents,
							close: work.closeTableOfContents,
							featured: work.featuredTitle,
							compact: work.compactTitle,
						}}
					/>

					<div className="min-w-0 pt-10 sm:pt-12 xl:pt-0 xl:pb-56">
						<section aria-labelledby="work-featured-title">
							<h2
								id="work-featured-title"
								className="pb-4 text-2xl font-bold tracking-tight text-foreground sm:pb-6 sm:text-3xl"
							>
								{work.featuredTitle}
							</h2>
							{featuredStories.map((story, index) => (
								<WorkCaseDetail
									key={story.id}
									story={story}
									index={index + 1}
									labels={work.labels}
								/>
							))}
						</section>

						<section
							className="mt-14 border-t-2 border-foreground/70 pt-10 sm:mt-20 sm:pt-12"
							aria-labelledby="work-compact-title"
						>
							<header>
								<h2
									id="work-compact-title"
									className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
								>
									{work.compactTitle}
								</h2>
								<p className="mt-3 max-w-[40rem] text-base leading-7 text-foreground/75 break-keep">
									{work.compactIntro}
								</p>
							</header>

							<div className="mt-6 sm:mt-8">
								{compactStories.map((story, index) => (
									<CompactWorkStory
										key={story.id}
										story={story}
										index={featuredStories.length + index + 1}
										labels={work.labels}
									/>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};
