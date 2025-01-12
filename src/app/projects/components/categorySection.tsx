import React from 'react';
import { motion } from 'framer-motion';
import { Platform } from '../types';
import { PLATFORMS } from '../constants';

interface CategorySectionProps {
	selectedPlatform: Platform;
	onSelectPlatform: (platform: Platform) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
	selectedPlatform,
	onSelectPlatform,
}) => {
	return (
		<section className="w-full max-w-[1200px] flex flex-wrap gap-4">
			{PLATFORMS.map((platform) => (
				<motion.button
					key={platform}
					onClick={() => onSelectPlatform(platform)}
					className={`relative px-6 py-2 rounded-full text-base md:text-lg 
            transition-colors duration-300 overflow-hidden
            ${
													selectedPlatform === platform
														? 'bg-accent text-accent-foreground'
														: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
												}`}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="relative z-10">{platform}</span>
					{selectedPlatform === platform && (
						<motion.div
							layoutId="categoryBackground"
							className="absolute inset-0 bg-accent"
							transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
						/>
					)}
				</motion.button>
			))}
		</section>
	);
};

export default CategorySection;
