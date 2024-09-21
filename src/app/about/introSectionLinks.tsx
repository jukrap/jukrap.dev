import React from 'react';
import Image from 'next/image';
import { Link } from '../types';

interface IntroSectionLinkProps extends Link {
    icon: string;
}

const IntroSectionLink: React.FC<IntroSectionLinkProps> = ({
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
            className="flex flex-row items-center justify-center transition-transform duration-300 hover:scale-150"
        >
            <Image src={icon} alt={`${text} Icon`} width={24} height={24} className="transition-filter duration-300 hover:brightness-125" />
        </a>
    );
};

export default IntroSectionLink;