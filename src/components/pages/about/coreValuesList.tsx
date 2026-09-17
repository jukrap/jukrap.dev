'use client';

import React from 'react';
import { useLocale } from '@/contexts/localeContext';

export const CoreValuesList = () => {
	const {
		data: { coreValues },
	} = useLocale();

	return (
		<div className="about-core-values">
			{coreValues.map((item, index) => (
				<div key={index} className="about-core-value">
					<p className="font-semibold text-lg leading-relaxed break-keep">
						{item.title}
					</p>
					<p className="text-base leading-8 text-foreground/80 break-keep">
						{item.content}
					</p>
				</div>
			))}
		</div>
	);
};
