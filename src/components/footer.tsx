// src/components/footer.tsx
import React from 'react';

interface Link {
	text: string;
	url: string;
	isExternal?: boolean;
}

const links: Link[] = [
	{ text: 'Email', url: 'mailto:jukrap628@gmail.com' },
	{ text: 'Github', url: 'https://github.com/jukrap', isExternal: true },
	{ text: 'Blog', url: 'https://valur.tistory.com/', isExternal: true },
	{
		text: 'LinkedIn',
		url: 'https://www.linkedin.com/in/jukrap/',
		isExternal: true,
	},
	{ text: 'RSS feed', url: '/rss.xml' },
];

const Separator: React.FC = () => (
	<span className="font-bold text-xl leading-6 text-center text-foreground">
		ㆍ
	</span>
);

const FooterLink: React.FC<Link> = ({ text, url, isExternal }) => (
	<a
		href={url}
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}
		className="font-bold text-xl leading-6 text-center text-foreground"
	>
		{text}
	</a>
);

const Footer: React.FC = () => {
	return (
		<footer className="w-full flex justify-center py-8">
			<div className="flex flex-col items-center gap-6">
				<p className="text-xl leading-6 text-center text-foreground">
					Copyright © 2024 Ju-cheol Park · All Rights Reserved.
				</p>
				<div className="flex items-center gap-3.5">
					{links.map((link, index) => (
						<React.Fragment key={link.url}>
							<FooterLink {...link} />
							{index < links.length - 1 && <Separator />}
						</React.Fragment>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
