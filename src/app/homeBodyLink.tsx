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
            className="flex flex-row items-center justify-center gap-2 p-2 rounded-lg no-select transition-colors duration-300 hover:bg-accent hover:bg-opacity-10"
        >
            <Image src={icon} alt={text} width={32} height={32} />
            <p className="font-light text-2xl leading-auto text-center text-foreground">
                {text}
            </p>
        </a>
    );
};

export default HomeBodyLink;