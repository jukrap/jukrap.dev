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
            className="flex flex-row items-center justify-center transition-transform duration-300 hover:scale-150"
        >
            <Image src={icon} alt={`${text} Icon`} width={24} height={24} className="transition-filter duration-300 hover:brightness-125" />
        </a>
    );
};

export default IntroSectionLink;