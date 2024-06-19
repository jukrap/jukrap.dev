import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '../../store/useThemeStore';
import { Link } from './types';

const IntroSectionLink: React.FC<Link> = ({
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
			className="flex flex-row items-center justify-center"
		>
			<Image
				src={isDarkMode ? blackIcon : whiteIcon}
				alt={`${text} Icon`}
				width={24}
				height={24}
			/>
		</a>
	);
};

export default IntroSectionLink;
