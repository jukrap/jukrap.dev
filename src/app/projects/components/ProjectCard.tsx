import React from 'react';
import Image from 'next/image';
import { Project } from '../types';
import { useIcon } from '@/hook/useIcon';
import TechStackIcons from '../../../components/techStackIcons';

interface ProjectCardProps {
	project: Project;
	onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
	const { getIcon } = useIcon();

	const backgroundStyle = project.projectData.background?.image
		? {
				backgroundImage: `url(${project.projectData.background.image})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}
		: project.projectData.background?.gradientStart
			? {
					background: `linear-gradient(to bottom, ${project.projectData.background.gradientStart}, ${project.projectData.background.gradientStart}00)`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}
			: {};

	return (
		<div
			className="group relative overflow-hidden rounded-xl bg-card hover:shadow-xl 
        transition-all duration-300 cursor-pointer border border-border/40 
        hover:border-accent/40 flex flex-col"
			onClick={onClick}
		>
			{/* 프로젝트 썸네일 섹션 */}
			<div className="aspect-[6/5] relative w-full overflow-hidden">
				{(project.projectData.background?.image ||
					project.projectData.background?.gradientStart) && (
					<>
						<div
							className="absolute inset-0 filter blur-sm bg-center bg-cover"
							style={backgroundStyle}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/75 to-background" />
					</>
				)}
				<div className="absolute inset-0 flex items-center justify-center p-6 z-10">
					<Image
						src={project.projectData.images[0]}
						alt={project.title}
						width={300}
						height={225}
						className="rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-contain 
              md:max-w-[18rem] md:max-h-[10rem] 
              sm:max-w-[40rem] sm:max-h-[25rem] 
              max-w-[24rem] max-h-[16rem]"
					/>
				</div>
			</div>

			{/* 프로젝트 정보 섹션 */}
			<div className="p-6 flex-1 flex flex-col">
				{/* 상단 고정 콘텐츠 */}
				<div className="space-y-4">
					{/* 제목 & 부제목 */}
					<div className="space-y-1">
						<h3 className="text-xl font-bold text-foreground tracking-tight">
							{project.title}
						</h3>
						<p className="text-sm text-muted-foreground">{project.subtitle}</p>
					</div>

					{/* 플랫폼 태그 */}
					<div className="flex items-center gap-2 flex-wrap">
						{project.platform.map((platform) => (
							<span
								key={platform}
								className="px-2.5 py-1 text-xs font-medium rounded-full 
                  border border-accent bg-accent/10 text-accent
                  transition-colors duration-300 hover:bg-accent/20"
							>
								{platform}
							</span>
						))}
					</div>

					{/* 프로젝트 설명 */}
					<div className="min-h-[4.5rem]">
						<p className="text-sm text-muted-foreground">{project.overview}</p>
					</div>
				</div>

				{/* 기술 스택 */}
				<div className="flex-1 flex flex-col">
					<div className="pt-4">
						<TechStackIcons techStack={project.techStack} />
					</div>

					{/* 하단 고정 콘텐츠 */}
					<div className="mt-auto pt-4 space-y-4">
						{/* 구분선 */}
						<hr className="border-border/60" />

						{/* 프로젝트 링크 */}
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
										className="transition-transform duration-300 hover:scale-125"
									>
										<Image
											src={getIcon(link.type)}
											alt={link.type}
											width={24}
											height={24}
											className="transition-filter duration-300 hover:brightness-125"
										/>
									</a>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
