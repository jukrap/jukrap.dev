import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import { ProjectCardProps } from '@/types/component';
import { useIcon } from '@/hook/useIcon';
import TechStackIcons from '@/components/common/techStackIcons';
import AspectRatioImage from '@/components/pages/projects/aspectRatioImage';
import ProjectCardSkeleton from '@/components/skeletons/projectCardSkeleton';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
	const { getIcon } = useIcon();
	const [isLoading, setIsLoading] = useState(true);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(
		!project.projectData.background?.image,
	);

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

	// 배경 이미지 프리로딩
	React.useEffect(() => {
		if (project.projectData.background?.image) {
			const img = new window.Image();
			img.src = project.projectData.background.image;
			img.onload = () => setIsBackgroundLoaded(true);
		}
	}, [project.projectData.background?.image]);

	// 모든 리소스가 로드되었는지 확인
	React.useEffect(() => {
		if (project.projectData.background?.image) {
			const img = new window.Image();
			img.src = project.projectData.background.image;
			img.onload = () => setIsLoading(false);
		} else {
			setIsLoading(false);
		}
	}, [project.projectData.background?.image]);

	if (isLoading) {
		return <ProjectCardSkeleton />;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
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
					<AspectRatioImage
						src={project.projectData.images[0]}
						alt={project.title}
						onLoad={() => setIsLoading(false)}
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
		</motion.div>
	);
};

export default ProjectCard;
