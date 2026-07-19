'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/localeContext';
import { getLocalizedPath } from '@/lib/locale';

const WorkSummarySection = () => {
	const { dictionary, data, locale } = useLocale();
	const summary = dictionary.about.workSummary;
	const workStories = data.workStories.filter(
		(workStory) => workStory.includeInAbout,
	);

	return (
		<section className="w-full max-w-[700px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-[170px] md:border-none md:pb-0 md:text-right">
				{summary.title}
			</h2>

			<div className="w-full flex flex-col gap-6">
				{workStories.map((workStory) => (
					<div
						key={workStory.id}
						className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-12 bg-secondary/30 md:bg-transparent p-4 md:p-0 rounded-lg"
					>
						<div className="flex md:w-[170px] flex-col items-start md:items-end gap-0.5">
							<Link
								href={`${getLocalizedPath('/work', locale)}#${workStory.id}`}
								className="font-medium text-lg md:text-xl leading-6 text-left md:text-right text-foreground whitespace-pre-line break-keep hover:underline decoration-foreground/50 decoration-2 underline-offset-4"
							>
								{workStory.title}
							</Link>
							<p className="font-medium text-sm leading-6 text-left md:text-right text-muted-foreground">
								{workStory.period}
							</p>
						</div>

						<div className="md:w-[460px] flex flex-col items-start gap-2">
							<p className="text-base md:text-lg font-bold leading-relaxed tracking-tight text-left text-foreground break-keep">
								{workStory.aboutSummary}
							</p>
							<div className="grid grid-cols-[auto,1fr] items-start gap-3">
								<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2" />
								<span className="text-sm md:text-base leading-relaxed text-left text-foreground break-keep">
									{workStory.workType} · {workStory.area}
								</span>
							</div>
							<p className="font-light text-xs md:text-sm leading-relaxed tracking-tight text-left text-muted-foreground py-1">
								{workStory.stack.slice(0, 5).join('・')}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default WorkSummarySection;
