import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useIcon } from '@/hook/useIcon';
import { ProjectCardProps } from '@/types/component';
import TechStackIcons from '@/components/common/techStackIcons';
import AspectRatioImage from '@/components/pages/projects/aspectRatioImage';

const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	onClick,
	index = 0,
}) => {
	const { getIcon } = useIcon();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={[
				'group relative overflow-hidden rounded-lg surface-minimal',
				'interactive-soft cursor-pointer hover:border-accent/45 hover:shadow-[0_8px_24px_hsl(var(--blacks)/0.08)]',
				'flex flex-col',
			].join(' ')}
			onClick={onClick}
		>
			{/* Project Thumbnail Section */}
			<div className="aspect-[6/5] relative w-full overflow-hidden">
				{project.projectData.background?.image ? (
					<>
						<div className="absolute inset-0">
							<Image
								src={project.projectData.background.image}
								alt="background"
								fill
								quality={75}
								priority={index < 3}
								className="object-cover blur-sm"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/75 to-background" />
						</div>
					</>
				) : project.projectData.background?.gradientStart ? (
					<>
						<div className="absolute inset-0">
							<div
								className="absolute inset-0"
								style={{
									background: `linear-gradient(to bottom, ${project.projectData.background.gradientStart}, ${project.projectData.background.gradientStart}00)`,
								}}
							/>
							<div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/75 to-background" />
						</div>
					</>
				) : null}
				<div className="absolute inset-0 flex items-center justify-center p-6 z-10">
					<AspectRatioImage
						src={project.projectData.images[0]}
						alt={project.title}
						priority={index < 3}
						containerClassName="max-w-[24rem] max-h-[16rem]"
					/>
				</div>
			</div>

			{/* Project Info Section */}
			<div className="p-6 flex-1 flex flex-col">
				<div className="space-y-4">
					<div className="space-y-1">
						<h3 className="text-xl font-bold text-foreground tracking-tight">
							{project.title}
						</h3>
						<p className="text-sm text-muted-foreground">{project.subtitle}</p>
					</div>

					<div className="flex items-center gap-2 flex-wrap">
						{project.platform.map((platform) => (
							<span
								key={platform}
								className="px-2.5 py-1 text-xs font-medium rounded-full 
                  border border-border/40 bg-secondary/25 text-foreground
                  transition-colors duration-200 group-hover:border-accent/40"
							>
								{platform}
							</span>
						))}
					</div>

					<div className="min-h-[4.5rem]">
						<p className="text-sm text-muted-foreground">{project.overview}</p>
					</div>
				</div>

				<div className="flex-1 flex flex-col">
					<div className="pt-4">
						<TechStackIcons techStack={project.techStack} />
					</div>

					<div className="mt-auto pt-4 space-y-4">
						<hr className="border-border/60" />

						<div className="flex items-center gap-3">
							{project.links
								.filter((link) => link.visible)
								.map((link, index) => (
									<a
										key={index}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="icon-link hover:text-accent"
									>
										<Image
											src={getIcon(link.type)}
											alt={link.type}
											width={24}
											height={24}
											className="transition-opacity duration-200 hover:opacity-80"
										/>
									</a>
								))}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
