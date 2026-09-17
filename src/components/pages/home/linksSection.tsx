'use client';

import { useLocale } from '@/contexts/localeContext';
import { useIcon } from '@/hook/useIcon';
import HomeBodyLink from './homeBodyLink';

export const LinksSection = () => {
	const { getIcon } = useIcon();
	const {
		data: { homeLinks },
		dictionary,
	} = useLocale();

	return (
		<section
			className="home-social"
			aria-label={dictionary.home.socialLinksLabel}
		>
			<p className="home-social-name">Ju-cheol Park / Jukrap</p>
			<div className="home-social-links">
				{homeLinks.map((link) => (
					<HomeBodyLink key={link.url} {...link} icon={getIcon(link.type)} />
				))}
			</div>
		</section>
	);
};
