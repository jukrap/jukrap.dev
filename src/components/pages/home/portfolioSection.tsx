'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/contexts/localeContext';
import { portfolioDocumentDefinition } from '@/data/documents/manifest';
import { useIcon } from '@/hook/useIcon';

export const PortfolioSection = () => {
	const { getIcon } = useIcon();
	const { dictionary } = useLocale();

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

				<div className="w-full">
					<article className="surface-minimal interactive-soft mx-auto flex min-h-[188px] max-w-[620px] flex-col justify-between gap-5 rounded-lg p-5">
						<div className="space-y-2">
							<h3 className="text-lg font-bold leading-6 text-foreground">
								{dictionary.home.portfolioTitle}
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground break-keep">
								{dictionary.home.portfolioDescription}
							</p>
						</div>
						<Link
							href={portfolioDocumentDefinition.slug}
							className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-center text-base font-bold leading-5 text-background transition-colors duration-200 interactive-soft hover:bg-accent select-none"
						>
							<div className="relative flex h-5 w-5 items-center justify-center">
								<Image
									src={getIcon('forward')}
									alt=""
									width={20}
									height={20}
									aria-hidden="true"
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'contain',
									}}
								/>
							</div>
							<span>{dictionary.home.portfolioLinkLabel}</span>
						</Link>
					</article>
				</div>
			</div>
		</section>
	);
};
