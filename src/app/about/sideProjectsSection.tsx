'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useThemeStore } from '../../store/useThemeStore';
import { projectsData } from '@/data/projectsData';
import { LinkType, ProjectType, ProjectDetailType } from './types';
import ProjectDetail from './projectDetail';
import { projectsDetailData } from '@/data/projectsDetailData';
import { useIcon } from '@/hook/useIcon';

const SideProjectsLink: React.FC<LinkType> = ({ type, url }) => {
	const { getIcon } = useIcon();
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex flex-row items-center justify-center"
		>
			<Image src={getIcon(type)} alt={`${type} Icon`} width={24} height={24} />
		</a>
	);
};

const SideProjectsSection: React.FC = () => {
	console.log('projectsDetailData:', projectsDetailData);

	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const [selectedProject, setSelectedProject] =
		useState<ProjectDetailType | null>(null);

	const openProjectDetail = (projectId: string) => {
		console.log('Opening project detail for id:', projectId);
		if (projectsDetailData) {
			const detailProject = projectsDetailData.find((p) => p.id === projectId);
			console.log('Found detail project:', detailProject);
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
		<section className="w-[670px] flex flex-col items-start gap-8 h-fit">
			<h2 className="font-bold text-4xl leading-10 tracking-tight text-right text-foreground w-[153px] h-fit">
				S.Projects
			</h2>
			{projectsData.map((project, index) => (
				<div key={index} className="flex justify-between gap-12">
					<div className="w-[153px] flex flex-col items-end gap-2">
						<div className="flex flex-col items-end gap-2">
							<p className="font-medium text-xl leading-6 text-right text-foreground">
								{project.title}
							</p>
							<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
								{project.duration}
							</p>
						</div>
						<div className="flex items-center gap-2">
							{project.links
								.filter((link) => link.visible)
								.map((link) =>
									link.type === 'detailView' ? (
										<button
											key={`detail-${project.id}`}
											onClick={() => openProjectDetail(project.id)}
											className="flex flex-row items-center justify-center"
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
											/>
										</button>
									) : (
										<SideProjectsLink key={link.url} {...link} />
									),
								)}
						</div>
					</div>
					<div className="w-[460px] flex flex-col items-start gap-2">
						<p className="text-lg font-bold leading-6 tracking-tight text-left text-foreground">
							{project.introduction}
						</p>
						<div className="flex flex-col gap-1">
							{project.description.map((item, index) => (
								<div
									key={index}
									className="grid grid-cols-[auto,1fr] items-start gap-4"
								>
									<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
									<span className="text-base leading-6 text-left text-foreground">
										{item}
									</span>
								</div>
							))}
						</div>
						<p className="font-light text-sm leading-6 tracking-tight text-left text-muted-foreground py-1">
							{project.techStack}
						</p>
					</div>
				</div>
			))}
			{selectedProject && (
				<ProjectDetail project={selectedProject} onClose={closeProjectDetail} />
			)}
		</section>
	);
};

export default SideProjectsSection;
