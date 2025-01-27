'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Project, Platform } from '@/types/project';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import CategorySection from './categorySection';
import ProjectCardSkeleton from '@/components/skeletons/projectCardSkeleton';
import { projectsDetailData } from '@/data/projectsDetailData';

const ProjectCard = dynamic(() => import('./projectCard'), {
	loading: () => <ProjectCardSkeleton />,
	ssr: true,
});

const ProjectDetail = dynamic(
	() => import('@/components/common/projectDetail'),
	{ ssr: false },
);

const ProjectsSection = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [selectedPlatform, setSelectedPlatform] = useState<Platform>('All');

	// Intersection Observer로 뷰포트 진입 감지
	const { ref, isIntersecting } = useIntersectionObserver({
		threshold: 0.1,
		freezeOnceVisible: true,
	});

	const filteredProjects = projectsDetailData.filter(
		(project) =>
			selectedPlatform === 'All' || project.platform.includes(selectedPlatform),
	);

	return (
		<div
			className="flex flex-col items-center px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-20 
      w-full h-full gap-12 sm:gap-16 lg:gap-20"
		>
			{/* 헤더 섹션 */}
			<section className="w-full max-w-[1200px] flex flex-col items-start gap-8">
				<h1
					className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground 
          tracking-tight"
				>
					Projects
				</h1>
				<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
					웹과 모바일 플랫폼에서 다양한 프로젝트를 진행했습니다. 각 프로젝트를
					클릭하면 상세 내용을 확인하실 수 있습니다.
				</p>
			</section>

			{/* 카테고리 필터 섹션 */}
			<CategorySection
				selectedPlatform={selectedPlatform}
				onSelectPlatform={setSelectedPlatform}
			/>

			{/* 프로젝트 그리드 섹션 */}
			<section
				ref={ref as React.RefObject<HTMLDivElement>}
				className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 gap-6 md:gap-8"
			>
				{isIntersecting
					? filteredProjects.map((project, index) => (
							<ProjectCard
								key={project.id}
								project={project}
								onClick={() => setSelectedProject(project)}
								index={index}
							/>
						))
					: Array(6)
							.fill(0)
							.map((_, index) => <ProjectCardSkeleton key={index} />)}
			</section>

			{/* 프로젝트 상세 모달 */}
			{selectedProject && (
				<ProjectDetail
					project={selectedProject}
					onClose={() => setSelectedProject(null)}
				/>
			)}
		</div>
	);
};

export default ProjectsSection;
