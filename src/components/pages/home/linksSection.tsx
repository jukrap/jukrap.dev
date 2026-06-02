'use client';

import React from 'react';
import { useIcon } from '@/hook/useIcon';
import { useLocale } from '@/contexts/localeContext';
import HomeBodyLink from './homeBodyLink';

export const LinksSection = () => {
	const { getIcon } = useIcon();
	const {
		data: { homeLinks },
	} = useLocale();

	return (
		<section className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 flex-wrap">
			{homeLinks.map((link) => (
				<HomeBodyLink key={link.url} {...link} icon={getIcon(link.type)} />
			))}
		</section>
	);
};
