import type { Project } from '@/types/project';
import ProjectCard from './projectCard';
interface ProjectGridProps {
	projects: Project[];
	onProjectClick: (project: Project) => void;
}
export const ProjectGrid = ({ projects, onProjectClick }: ProjectGridProps) => (
	<section className="grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
		{projects.map((project, index) => (
			<ProjectCard
				key={project.id}
				project={project}
				onClick={() => onProjectClick(project)}
				index={index}
			/>
		))}
	</section>
);
