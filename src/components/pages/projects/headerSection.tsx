'use client';

import React from 'react';
import { useLocale } from '@/contexts/localeContext';

export function HeaderSection() {
	const { dictionary } = useLocale();

	return (
		<section className="w-full max-w-[1200px] flex flex-col items-start gap-8">
			<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
				{dictionary.projects.title}
			</h1>
			<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
				{dictionary.projects.description}
			</p>
		</section>
	);
}
