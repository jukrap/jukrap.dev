import React from 'react';
import { Link } from '@/types/common';
import { links } from '@/data/footer/links';

const FooterLink: React.FC<Link> = ({ text, url, isExternal }) => (
	<a
		href={url}
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}
		className="relative group inline-flex items-center"
	>
		<span className="font-medium text-sm md:text-base lg:text-lg text-foreground group-hover:text-accent transition-colors duration-300">
			{text}
		</span>
		<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
	</a>
);

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full pt-12 pb-6 md:pt-16 md:pb-8 px-4 md:px-6 bg-background/50 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto flex flex-col items-center gap-4 md:gap-6 no-select">
				<p className="text-sm md:text-base lg:text-lg text-center text-foreground">
					Copyright © {currentYear} Ju-cheol Park · All Rights Reserved.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4">
					{links.map((link, index) => (
						<React.Fragment key={link.url}>
							<FooterLink {...link} />
							{index < links.length - 1 && (
								<span className="text-foreground/40 last:hidden">•</span>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
