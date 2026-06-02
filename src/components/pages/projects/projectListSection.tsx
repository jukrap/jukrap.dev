'use client';

import React, { useState } from 'react';
import { Platform, Project } from '@/types/project';
import { useLocale } from '@/contexts/localeContext';
import ProjectDetail from '@/components/common/projectDetail';
import CategoryFilter from './categoryFilter';
import { ProjectGrid } from './projectGrid';

export function ProjectListSection() {
	const {
		data: { projectDetails },
	} = useLocale();
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [selectedPlatform, setSelectedPlatform] = useState<Platform>('All');

	const filteredProjects = projectDetails.filter(
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
