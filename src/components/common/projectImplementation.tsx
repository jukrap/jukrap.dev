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
		<details className="group/implementation bg-secondary/20 rounded-md border border-border/30">
			<summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 p-4 rounded-md [&::-webkit-details-marker]:hidden">
				<span>
					<span className="block text-lg font-semibold text-foreground">
						{content.title}
					</span>
					<span className="mt-2 ml-5 list-item list-disc list-outside text-sm text-muted-foreground">
						{content.summary}
					</span>
				</span>
				<ChevronDown
					size={19}
					aria-hidden="true"
					className="shrink-0 transition-transform duration-150 group-open/implementation:rotate-180 motion-reduce:transition-none"
				/>
			</summary>
			<div className="space-y-6 px-4 pb-4 pt-2">
				{content.sections.map((section) => (
					<section key={section.title}>
						<h4 className="mb-2 text-base font-semibold text-foreground">
							{section.title}
						</h4>
						<ul className="list-disc pl-5 space-y-2 text-sm leading-7 text-muted-foreground">
							{section.details.map((paragraph) => (
								<li key={paragraph}>{paragraph}</li>
							))}
						</ul>
					</section>
				))}
				<a
					href={getLocalizedPath(content.demo.path, locale)}
					className="relative inline-flex items-center gap-2 text-sm leading-6 font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors before:absolute before:-inset-y-2.5 before:inset-x-0 hover:text-accent hover:decoration-accent focus-visible:text-accent focus-visible:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
				>
					{content.demo.label}
					<ArrowUpRight size={16} aria-hidden="true" />
				</a>
			</div>
		</details>
	);
}
