import React from 'react';
import Image from 'next/image';
import { TechStackIconsProps } from '@/types/component';
import TechStackIcons from './techStackIcons';

import { TECH_STACK_ICONS } from '@/data/constants/techStack';

const TechStackDetailIcons: React.FC<TechStackIconsProps> = ({
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
						<div key={tech} className="flex items-center gap-2 rounded-lg">
							<div className="flex rounded-lg bg-secondary/50 p-2 transition-all duration-300 hover:bg-secondary">
								<div className="relative w-6 h-6">
									<Image
										src={iconPath}
										alt={tech}
										width={24}
										height={24}
										className="object-contain"
										style={{
											width: '100%',
											height: '100%',
										}}
									/>
								</div>
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
