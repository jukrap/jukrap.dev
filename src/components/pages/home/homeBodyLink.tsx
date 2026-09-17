import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import type { IconLink } from '@/types/common';

const HomeBodyLink = ({ text, url, isExternal, icon }: IconLink) => {
	return (
		<a
			href={url}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}
			className="home-social-link"
		>
			<Image src={icon} alt="" width={18} height={18} aria-hidden="true" />
			{text}
			{isExternal && <ArrowUpRight size={14} aria-hidden="true" />}
		</a>
	);
};

export default HomeBodyLink;
