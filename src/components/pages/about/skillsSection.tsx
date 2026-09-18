'use client';

import ScrollReveal from '@/components/common/scrollReveal';
import React from 'react';
import { useLocale } from '@/contexts/localeContext';

const SkillsSection: React.FC = () => {
	const {
		dictionary,
		data: { skills },
	} = useLocale();

	return (
		<ScrollReveal className="w-full max-w-[700px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="about-section-title font-bold tracking-tight text-foreground">
				{dictionary.about.skills}
			</h2>

			<dl className="flex w-full flex-col gap-6">
				{skills.map((skill) => (
					<div
						key={skill.category}
						className="grid gap-2 md:grid-cols-[170px_minmax(0,1fr)] md:gap-12"
					>
						<dt className="text-lg font-semibold leading-7 text-foreground">
							{skill.category}
						</dt>
						<dd className="text-base leading-7 text-foreground/80 md:text-lg">
							{skill.items}
						</dd>
					</div>
				))}
			</dl>
		</ScrollReveal>
	);
};

export default SkillsSection;
