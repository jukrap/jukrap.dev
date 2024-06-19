import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '../store/useThemeStore';
import { Link } from './types';

const HomeBodyLink: React.FC<Link> = ({
	text,
	whiteIcon,
	blackIcon,
	url,
	isExternal,
}) => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	return (
		<a
			href={url}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}
			className="flex flex-row items-center justify-center gap-2"
		>
			<Image
				src={isDarkMode ? blackIcon : whiteIcon}
				alt={`${text} Icon`}
				width={32}
				height={32}
			/>
			<p className="font-light text-2xl leading-auto text-center text-foreground">
				{text}
			</p>
		</a>
	);
};

export default HomeBodyLink;
