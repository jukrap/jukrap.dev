'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Platform, Project } from '@/types/project';
import { projectsDetailData } from '@/data/projectsDetailData';
import CategoryFilter from './categoryFilter';
import { ProjectGrid } from './projectGrid';

const ProjectDetail = dynamic(
	() => import('@/components/common/projectDetail'),
	{
		ssr: false,
	},
);

export function ProjectListSection() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [selectedPlatform, setSelectedPlatform] = useState<Platform>('All');

	const filteredProjects = projectsDetailData.filter(
		(project) =>
			selectedPlatform === 'All' || project.platform.includes(selectedPlatform),
	);

	return (
		<section className="w-full">
			<CategoryFilter
				selectedPlatform={selectedPlatform}
				onSelectPlatform={setSelectedPlatform}
			/>
			<ProjectGrid
				projects={filteredProjects}
				onProjectClick={setSelectedProject}
			/>
			{selectedProject && (
				<ProjectDetail
					project={selectedProject}
					onClose={() => setSelectedProject(null)}
				/>
			)}
		</section>
	);
}
