import React, { useState } from 'react';
import Image from 'next/image';
import { TechStackIconsProps } from '@/types/component';

import { TECH_STACK_ICONS } from '@/app/projects/constants';

const TechStackIcons: React.FC<TechStackIconsProps> = ({
	techStack,
	className = '',
}) => {
	const [hoveredTech, setHoveredTech] = useState<string | null>(null);

	return (
		<div className={`flex flex-wrap gap-2 items-center ${className}`}>
			{techStack.map((tech) => {
				const iconPath = TECH_STACK_ICONS[tech];
				if (!iconPath) return null;

				return (
					<div
						key={tech}
						className="group relative"
						onMouseEnter={() => setHoveredTech(tech)}
						onMouseLeave={() => setHoveredTech(null)}
					>
						<div className="w-8 h-8 rounded-lg bg-secondary/50 p-1.5 transition-all duration-300 hover:bg-secondary">
							<div className="relative w-full h-full">
								<Image
									src={iconPath}
									alt={tech}
									width={24}
									height={24}
									className="object-contain w-full h-full"
									style={{
										width: 'auto',
										height: 'auto',
									}}
								/>
							</div>
						</div>
						{hoveredTech === tech && (
							<div
								className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
                px-2 py-1 text-xs bg-popover text-popover-foreground rounded 
                z-10 transition-all duration-200"
							>
								{tech}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default TechStackIcons;
