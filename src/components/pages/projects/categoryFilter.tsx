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
		<section className="w-full max-w-[1200px] flex flex-wrap gap-4 pb-12">
			{PLATFORMS.map((platform) => (
				<motion.button
					key={platform}
					onClick={() => onSelectPlatform(platform)}
					className={[
						'relative overflow-hidden rounded-full px-6 py-2 text-base md:text-lg',
						'transition-colors duration-200',
						selectedPlatform === platform
							? 'text-background'
							: 'surface-minimal text-foreground hover:bg-secondary/45',
					].join(' ')}
				>
					<span className="relative z-10">
						{dictionary.projects.platforms[platform]}
					</span>
					{selectedPlatform === platform && (
						<motion.div
							layoutId="categoryBackground"
							className="absolute inset-0 bg-foreground"
							transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
						/>
					)}
				</motion.button>
			))}
		</section>
	);
};

export default CategoryFilter;
