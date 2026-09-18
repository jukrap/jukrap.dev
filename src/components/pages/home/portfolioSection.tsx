'use client';

import ScrollReveal from '@/components/common/scrollReveal';
import React from 'react';
import Link from 'next/link';
import {
	ChevronRight,
	ClipboardList,
	PanelsTopLeft,
	UserRound,
} from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { getRecruitingDocumentManifest } from '@/data/documents/manifest';

export const PortfolioSection = () => {
	const { dictionary, locale } = useLocale();
	const recruitingDocumentManifest = getRecruitingDocumentManifest(locale);
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
		<ScrollReveal
			id="documents"
			className="home-documents"
			aria-labelledby="home-documents-title"
		>
			<div className="flex w-full flex-col gap-7">
				<div className="break-keep">
					<p className="home-section-label">DOCUMENTS</p>
					<h2 id="home-documents-title" className="home-documents-title">
						{dictionary.home.documentsTitle}
					</h2>
					<p className="mt-3 text-base leading-relaxed text-muted-foreground">
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
									className="home-document-card flex min-w-0 flex-col gap-5 rounded-lg p-6"
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
										className="home-document-link mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-center text-base font-semibold leading-5"
									>
										<ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
										<span>{copy[document.id].linkLabel}</span>
									</Link>
								</article>
							);
						})}
				</div>
			</div>
		</ScrollReveal>
	);
};
