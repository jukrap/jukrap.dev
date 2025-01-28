import React from 'react';
import dynamic from 'next/dynamic';
import { Project } from '@/types/project';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import ProjectCardSkeleton from '@/components/skeletons/projectCardSkeleton';

const ProjectCard = dynamic(() => import('./projectCard'), {
	loading: () => <ProjectCardSkeleton />,
	ssr: true,
});

interface ProjectGridProps {
	projects: Project[];
	onProjectClick: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
	projects,
	onProjectClick,
}) => {
	const { ref, isIntersecting } = useIntersectionObserver({
		threshold: 0.1,
		freezeOnceVisible: true,
	});

	return (
		<section
			ref={ref}
			className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
		>
			{isIntersecting
				? projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							onClick={() => onProjectClick(project)}
							index={index}
						/>
					))
				: Array(6)
						.fill(0)
						.map((_, index) => <ProjectCardSkeleton key={index} />)}
		</section>
	);
};
