'use client';

import ScrollReveal from '@/components/common/scrollReveal';
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
		<ScrollReveal className="w-full max-w-[700px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="about-section-title font-bold tracking-tight text-foreground">
				{summary.title}
			</h2>

			<div className="w-full flex flex-col gap-6">
				{workStories.map((workStory) => (
					<div key={workStory.id} className="about-entry">
						<div className="flex flex-col items-start gap-0.5">
							<Link
								href={`${getLocalizedPath('/work', locale)}#${workStory.id}`}
								className="font-medium text-lg md:text-xl leading-6 text-left text-foreground whitespace-pre-line break-keep hover:underline decoration-foreground/50 decoration-2 underline-offset-4"
							>
								{workStory.title}
							</Link>
							<p className="font-medium text-sm leading-6 text-left text-muted-foreground">
								{workStory.period}
							</p>
						</div>

						<div className="min-w-0 flex flex-col items-start gap-2">
							<p className="text-base md:text-lg font-bold leading-relaxed tracking-tight text-left text-foreground break-keep">
								{workStory.aboutSummary}
							</p>
							<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm md:text-base leading-relaxed text-left text-foreground break-keep">
								<span>{workStory.workType}</span>
								<span>{workStory.area}</span>
							</div>
							<p className="font-light text-xs md:text-sm leading-relaxed tracking-tight text-left text-muted-foreground py-1">
								{workStory.stack.slice(0, 5).join(', ')}
							</p>
						</div>
					</div>
				))}
			</div>
		</ScrollReveal>
	);
};

export default WorkSummarySection;
