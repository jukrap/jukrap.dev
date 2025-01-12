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
    <footer className="w-full py-6 md:py-8 px-4 md:px-6 bg-background/50 backdrop-blur-sm">
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