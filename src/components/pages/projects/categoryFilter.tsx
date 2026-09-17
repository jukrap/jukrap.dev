import React from 'react';
import { CategoryFilterProps } from '@/types/component';
import { useLocale } from '@/contexts/localeContext';
import { PLATFORMS } from '@/data/constants/platforms';

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	selectedPlatform,
	onSelectPlatform,
}) => {
	const { dictionary } = useLocale();

	return (
		<section className="w-full max-w-[1200px] pb-10">
			<div className="project-filters">
				{PLATFORMS.map((platform) => (
					<button
						key={platform}
						type="button"
						onClick={() => onSelectPlatform(platform)}
						aria-pressed={selectedPlatform === platform}
						className={[
							'project-filter',
							selectedPlatform === platform ? 'project-filter-selected' : '',
						].join(' ')}
					>
						<span>{dictionary.projects.platforms[platform]}</span>
					</button>
				))}
			</div>
		</section>
	);
};

export default CategoryFilter;
