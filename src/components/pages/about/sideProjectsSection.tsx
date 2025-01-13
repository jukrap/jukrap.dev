'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/store/useThemeStore';
import { ProjectLink, SimpleProject, Project } from '@/types/project';
import { useIcon } from '@/hook/useIcon';
import ProjectDetail from '@/components/common/projectDetail';
import { projectsData } from '@/data/projectsData';
import { projectsDetailData } from '@/data/projectsDetailData';

const SideProjectsLink: React.FC<ProjectLink> = ({ type, url }) => {
	const { getIcon } = useIcon();

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex flex-row items-center justify-center transition-transform duration-300 hover:scale-125"
		>
			<Image
				src={getIcon(type)}
				alt={`${type} Icon`}
				width={24}
				height={24}
				className="transition-filter duration-300 hover:brightness-125"
			/>
		</a>
	);
};

const SideProjectsSection: React.FC = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const { getIcon } = useIcon();

	const openProjectDetail = (projectId: string) => {
		if (projectsDetailData) {
			const detailProject = projectsDetailData.find((p) => p.id === projectId);
			if (detailProject) {
				setSelectedProject(detailProject);
			} else {
				console.error('No matching project found for id:', projectId);
			}
		} else {
			console.error('projectsDetailData is undefined');
		}
	};

	const closeProjectDetail = () => {
		setSelectedProject(null);
	};

	return (
		<section className="w-full max-w-[670px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-[153px] md:border-none md:pb-0 md:text-right">
				S.Projects
			</h2>

			<div className="w-full flex flex-col gap-6">
				{projectsData
					.filter((project) => project.major)
					.map((project, index) => (
						<div
							key={index}
							className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-12 bg-secondary/30 md:bg-transparent p-4 md:p-0 rounded-lg"
						>
							{/* 프로젝트 제목 및 기간 */}
							<div className="flex flex-col md:w-[153px] items-start md:items-end gap-0.5">
								<button
									onClick={() => openProjectDetail(project.id)}
									className="font-medium text-lg md:text-xl leading-6 text-left md:text-right text-foreground transition-colors duration-300 cursor-pointer group relative break-keep"
								>
									{project.title}
									<span className="absolute left-0 md:right-0 bottom-0 mt-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
								</button>
								<p className="font-medium text-sm leading-6 text-left md:text-right text-muted-foreground">
									{project.duration}
								</p>
								<div className="flex items-center gap-3 mt-1">
									{project.links
										.filter((link) => link.visible)
										.map((link) =>
											link.type === 'detailView' ? (
												<button
													key={`detail-${project.id}`}
													onClick={() => openProjectDetail(project.id)}
													className="flex flex-row items-center justify-center transition-transform duration-300 hover:scale-125"
													aria-label="상세 보기"
												>
													<Image
														src={
															isDarkMode
																? '/icons/blackMode_detailView.svg'
																: '/icons/whiteMode_detailView.svg'
														}
														alt="Detail View"
														width={24}
														height={24}
														className="transition-filter duration-300 hover:brightness-125"
													/>
												</button>
											) : (
												<SideProjectsLink key={link.url} {...link} />
											),
										)}
								</div>
							</div>

							{/* 프로젝트 설명 */}
							<div className="md:w-[460px] flex flex-col items-start gap-2 mt-2 md:mt-0">
								<p className="text-base md:text-lg font-bold leading-relaxed tracking-tight text-left text-foreground">
									{project.introduction}
								</p>
								<div className="flex flex-col gap-1">
									{project.description.map((item, index) => (
										<div
											key={index}
											className="grid grid-cols-[auto,1fr] items-start gap-4"
										>
											<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
											<span className="text-sm md:text-base leading-relaxed text-left text-foreground">
												{item}
											</span>
										</div>
									))}
								</div>
								<p className="font-light text-xs md:text-sm leading-relaxed tracking-tight text-left text-muted-foreground py-1">
									{project.techStack}
								</p>
							</div>
						</div>
					))}
			</div>

			{selectedProject && (
				<ProjectDetail project={selectedProject} onClose={closeProjectDetail} />
			)}
		</section>
	);
};

export default SideProjectsSection;
