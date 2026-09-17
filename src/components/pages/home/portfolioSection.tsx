'use client';

import React from 'react';
import Link from 'next/link';
import {
	ChevronRight,
	ClipboardList,
	PanelsTopLeft,
	UserRound,
} from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { recruitingDocumentManifest } from '@/data/documents/manifest';

export const PortfolioSection = () => {
	const { dictionary } = useLocale();
	const copy = {
		portfolio: {
			icon: PanelsTopLeft,
			title: dictionary.home.portfolioTitle,
			description: dictionary.home.portfolioDescription,
			linkLabel: dictionary.home.portfolioLinkLabel,
		},
		resume: {
			icon: UserRound,
			title: dictionary.home.resumeTitle,
			description: dictionary.home.resumeDescription,
			linkLabel: dictionary.home.resumeLinkLabel,
		},
		'career-brief': {
			icon: ClipboardList,
			title: dictionary.home.careerBriefTitle,
			description: dictionary.home.careerBriefDescription,
			linkLabel: dictionary.home.careerBriefLinkLabel,
		},
	};

	return (
		<section className="flex w-full justify-center px-4">
			<div className="flex w-full max-w-[1100px] flex-col gap-5">
				<div className="mx-auto flex max-w-[620px] flex-col items-center gap-2 text-center break-keep">
					<h2 className="text-xl font-bold leading-relaxed text-foreground md:text-2xl">
						{dictionary.home.documentsTitle}
					</h2>
					<p className="text-sm leading-relaxed text-muted-foreground md:text-base">
						{dictionary.home.documentsDescription}
					</p>
				</div>

				<div className="grid w-full gap-4 lg:grid-cols-3">
					{recruitingDocumentManifest.documents
						.filter(
							(document) => document.visibility === 'public' && document.showOnHome,
						)
						.map((document) => {
							const Icon = copy[document.id].icon;
							return (
								<article
									key={document.id}
									className="surface-minimal interactive-soft flex min-h-[188px] min-w-0 flex-col justify-between gap-5 rounded-lg p-5"
								>
									<div className="space-y-2">
										<h3 className="flex items-center gap-2 text-lg font-bold leading-6 text-foreground">
											<Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
											{copy[document.id].title}
										</h3>
										<p className="text-sm leading-relaxed text-muted-foreground break-keep">
											{copy[document.id].description}
										</p>
									</div>
									<Link
										href={document.slug}
										className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-center text-base font-bold leading-5 text-background transition-colors duration-200 interactive-soft hover:bg-accent select-none"
									>
										<ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
										<span>{copy[document.id].linkLabel}</span>
									</Link>
								</article>
							);
						})}
				</div>
			</div>
		</section>
	);
};
