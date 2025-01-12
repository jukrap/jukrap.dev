import React from 'react';
import Image from 'next/image';
import { TECH_STACK_ICONS } from '../app/projects/constants';
import TechStackIcons from './techStackIcons';

interface TechStackDetailIconsProps {
  techStack: string[];
  className?: string;
}

const TechStackDetailIcons: React.FC<TechStackDetailIconsProps> = ({
  techStack,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-4 items-center ${className}`}>
      {/* PC 환경 표시 */}
      <div className="hidden md:flex flex-wrap gap-4">
        {techStack.map((tech) => {
          const iconPath = TECH_STACK_ICONS[tech];
          if (!iconPath) return null;

          return (
            <div
              key={tech}
              className="flex items-center gap-2 rounded-lg"
            >
              <div className="flex rounded-lg bg-secondary/50 p-2 transition-all duration-300 hover:bg-secondary">
                <Image
                  src={iconPath}
                  alt={tech}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              <span className="pl-1 pt-0.5 text-sm text-foreground">{tech}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 모바일 환경 표시 */}
      <div className="md:hidden w-full">
        <TechStackIcons techStack={techStack} />
      </div>
    </div>
  );
};

export default TechStackDetailIcons;