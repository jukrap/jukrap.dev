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
			<div className="inline-flex flex-wrap gap-1 rounded-full border border-border/35 bg-secondary/20 p-1">
				{PLATFORMS.map((platform) => (
					<motion.button
						key={platform}
						type="button"
						onClick={() => onSelectPlatform(platform)}
						className={[
							'relative min-w-20 overflow-hidden rounded-full px-5 py-2 text-base md:text-lg',
							'interactive-soft',
							selectedPlatform === platform
								? 'text-background'
								: 'text-muted-foreground hover:text-accent',
						].join(' ')}
					>
						<span className="relative z-10">
							{dictionary.projects.platforms[platform]}
						</span>
						{selectedPlatform === platform && (
							<motion.span
								layoutId="project-filter-pill"
								className="absolute inset-0 bg-foreground"
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
		</section>
	);
};

export default CategoryFilter;
