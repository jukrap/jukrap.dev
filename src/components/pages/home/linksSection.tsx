'use client';

import React from 'react';
import { useIcon } from '@/hook/useIcon';
import { links } from '@/data/home/links';
import HomeBodyLink from './homeBodyLink';

export const LinksSection = () => {
	const { getIcon } = useIcon();

	return (
		<section className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 flex-wrap">
			{links.map((link) => (
				<HomeBodyLink key={link.url} {...link} icon={getIcon(link.type)} />
			))}
		</section>
	);
};
