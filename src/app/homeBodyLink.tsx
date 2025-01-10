import React from 'react';
import Image from 'next/image';
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
			className="group flex items-center justify-between w-full md:w-auto gap-2 p-3 md:p-2 rounded-lg 
        no-select transition-all duration-300
        hover:bg-accent/10 active:bg-accent/20
        border border-transparent hover:border-accent/20
        md:justify-center md:flex-row"
		>
			<div className="flex items-center gap-3">
				<div
					className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 rounded-full 
          bg-muted group-hover:bg-accent/5 transition-colors duration-300"
				>
					<Image
						src={icon}
						alt={text}
						width={24}
						height={24}
						className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<span
					className="font-medium text-base md:text-lg lg:text-xl text-foreground 
          group-hover:text-accent transition-colors duration-300"
				>
					{text}
				</span>
			</div>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				className="text-muted-foreground group-hover:text-accent transition-colors duration-300 md:hidden"
				aria-hidden="true"
			>
				<path
					d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334"
					stroke="currentColor"
					strokeWidth="1.67"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</a>
	);
};

export default HomeBodyLink;
