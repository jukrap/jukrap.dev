import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '../store/useThemeStore';
import { Link } from './types';

interface HomeBodyLinkProps extends Link {
	icon: string;
}

const HomeBodyLink: React.FC<HomeBodyLinkProps> = ({
	text,
	url,
	icon,
	isExternal,
}) => {
	return (
		<a
			href={url}
			target={isExternal ? '_blank' : '_self'}
			rel={isExternal ? 'noopener noreferrer' : ''}
			className="flex flex-row items-center justify-center gap-2"
		>
			<Image src={icon} alt={text} width={32} height={32} />
			<p className="font-light text-2xl leading-auto text-center text-foreground">
				{text}
			</p>
		</a>
	);
};

export default HomeBodyLink;
