'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { getLocalizedPath } from '@/lib/locale';
import { HeroMedia } from './heroMedia';

export const WelcomeSection = () => {
	const { dictionary, locale } = useLocale();
	const { home } = dictionary;

	return (
		<section className="home-hero" aria-labelledby="home-title">
			<HeroMedia />
			<div className="home-hero-copy">
				<h1 id="home-title" className="home-hero-title">
					{home.heroTitle.map((line, index) => (
						<span key={line}>
							{index > 0 && <br />}
							{line}
						</span>
					))}
				</h1>
				<p className="home-hero-intro">
					{home.heroDescription.split(/(웹&모바일)/).map((part, index) =>
						part === '웹&모바일' ? (
							<span key={index} className="whitespace-nowrap">
								{part}
							</span>
						) : (
							part
						),
					)}
				</p>
				<div className="home-hero-actions">
					<Link
						href={getLocalizedPath('/work', locale)}
						className="home-primary-link"
					>
						{home.workLinkLabel}
						<ArrowUpRight size={16} aria-hidden="true" />
					</Link>
					<a href="#documents" className="home-text-link">
						{home.documentsLinkLabel}
						<ArrowDown size={16} aria-hidden="true" />
					</a>
				</div>
			</div>
		</section>
	);
};
