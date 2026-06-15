import React from 'react';
import { motion } from 'framer-motion';
import { CategoryFilterProps } from '@/types/component';
import { useLocale } from '@/contexts/localeContext';
import { PLATFORMS } from '@/data/constants/platforms';

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	selectedPlatform,
	onSelectPlatform,
}) => {
	const { dictionary } = useLocale();

	return (
		<section className="w-full max-w-[1200px] pb-12">
			<div className="max-w-full overflow-x-auto scrollbar-hide">
				<div className="inline-flex min-w-max gap-1 rounded-full border border-border/35 bg-secondary/20 p-1">
					{PLATFORMS.map((platform) => (
						<motion.button
							key={platform}
							type="button"
							onClick={() => onSelectPlatform(platform)}
							className={[
								'relative isolate shrink-0 overflow-hidden rounded-full px-3.5 py-2 text-sm sm:min-w-20 sm:px-5 sm:text-base md:text-lg',
								'interactive-soft',
								selectedPlatform === platform
									? 'text-background'
									: 'text-muted-foreground hover:text-accent',
							].join(' ')}
						>
							<span className="relative z-10 whitespace-nowrap">
								{dictionary.projects.platforms[platform]}
							</span>
							{selectedPlatform === platform && (
								<motion.span
									layoutId="project-filter-pill"
									className="absolute inset-0 rounded-full bg-foreground"
									transition={{
										type: 'spring',
										stiffness: 520,
										damping: 42,
										mass: 0.8,
									}}
								/>
							)}
						</motion.button>
					))}
				</div>
			</div>
		</section>
	);
};

export default CategoryFilter;
