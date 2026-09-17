import React from 'react';
import { Link } from '@/types/common';
import { useLocale } from '@/contexts/localeContext';

const FooterLink: React.FC<Link> = ({ text, url, isExternal }) => (
	<a
		href={url}
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}
		className="inline-flex items-center text-foreground transition-colors duration-200 hover:text-accent hover:underline decoration-accent/70 decoration-2 underline-offset-4"
	>
		<span className="font-medium text-sm">{text}</span>
	</a>
);

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();
	const {
		data: { footerLinks },
	} = useLocale();

	return (
		<footer className="w-full pt-12 pb-6 md:pt-16 md:pb-8 px-4 md:px-6 bg-background">
			<div className="max-w-7xl mx-auto flex flex-col items-center gap-4 md:gap-6 no-select">
				<p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-center text-muted-foreground">
					<span>Copyright © {currentYear} Ju-cheol Park</span>
					<span>All Rights Reserved.</span>
				</p>
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
					{footerLinks.map((link) => (
						<FooterLink key={link.url} {...link} />
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
