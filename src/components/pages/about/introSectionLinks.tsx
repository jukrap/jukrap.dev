import React from 'react';
import Image from 'next/image';
import { IconLink } from '@/types/common';

const IntroSectionLink: React.FC<IconLink> = ({
	text,
	url,
	icon,
	isExternal,
}) => {
	return (
		<a
			href={url}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}
			className="icon-link hover:text-accent"
		>
			<div className="relative w-6 h-6">
				<Image
					src={icon}
					alt={`${text} Icon`}
					width={24}
					height={24}
					className="transition-opacity duration-200 hover:opacity-80"
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'contain',
					}}
				/>
			</div>
		</a>
	);
};

export default IntroSectionLink;
