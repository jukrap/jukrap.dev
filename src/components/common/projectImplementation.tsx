import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { getLocalizedPath } from '@/lib/locale';
import type { ProjectImplementation as Implementation } from '@/types/project';

export default function ProjectImplementation({
	content,
}: {
	content: Implementation;
}) {
	const { locale } = useLocale();
	return (
		<details className="group/implementation mx-0 md:mx-6 border-y border-border/60">
			<summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
				<span>
					<span className="block text-lg font-semibold text-foreground">
						{content.title}
					</span>
					<span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
						{content.summary}
					</span>
				</span>
				<ChevronDown
					size={19}
					aria-hidden="true"
					className="shrink-0 transition-transform duration-150 group-open/implementation:rotate-180 motion-reduce:transition-none"
				/>
			</summary>
			<div className="space-y-6 pb-6 pt-1">
				{content.sections.map((section) => (
					<section key={section.title}>
						<h4 className="mb-2 text-base font-semibold text-foreground">
							{section.title}
						</h4>
						<div className="space-y-2 text-sm leading-7 text-muted-foreground">
							{section.details.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</section>
				))}
				<a
					href={getLocalizedPath(content.demo.path, locale)}
					className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
				>
					{content.demo.label}
					<ArrowUpRight size={16} aria-hidden="true" />
				</a>
			</div>
		</details>
	);
}
