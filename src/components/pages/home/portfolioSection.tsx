'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from '@/contexts/localeContext';
import { useIcon } from '@/hook/useIcon';

export const PortfolioSection = () => {
	const { getIcon } = useIcon();
	const { dictionary } = useLocale();
	const documents = [
		{
			href: '/files/Resume%20(Ju-cheol%20Park).pdf',
			title: dictionary.home.resumeTitle,
			description: dictionary.home.resumeDescription,
			label: dictionary.home.resumeDownload,
		},
		{
			href: '/files/Ju-cheol-Park_Frontend.pdf',
			title: dictionary.home.portfolioTitle,
			description: dictionary.home.portfolioDescription,
			label: dictionary.home.portfolioDownload,
		},
	];

	return (
		<section className="flex w-full justify-center px-4">
			<div className="flex w-full max-w-[760px] flex-col gap-5">
				<div className="mx-auto flex max-w-[620px] flex-col items-center gap-2 text-center break-keep">
					<h2 className="text-xl font-bold leading-relaxed text-foreground md:text-2xl">
						{dictionary.home.documentsTitle}
					</h2>
					<p className="text-sm leading-relaxed text-muted-foreground md:text-base">
						{dictionary.home.documentsDescription}
					</p>
				</div>

				<div className="grid w-full gap-3 md:grid-cols-2">
					{documents.map((document) => (
						<article
							key={document.href}
							className="surface-minimal interactive-soft flex min-h-[188px] flex-col justify-between gap-5 rounded-lg p-5"
						>
							<div className="space-y-2">
								<h3 className="text-lg font-bold leading-6 text-foreground">
									{document.title}
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground break-keep">
									{document.description}
								</p>
							</div>
							<a
								href={document.href}
								download
								className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-center text-base font-bold leading-5 text-background transition-colors duration-200 interactive-soft hover:bg-accent select-none"
							>
								<div className="relative flex h-5 w-5 items-center justify-center">
									<Image
										src={getIcon('downArrow')}
										alt="Download Icon"
										width={20}
										height={20}
										className="animate-downloadArrow"
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'contain',
										}}
									/>
								</div>
								<span>{document.label}</span>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};
