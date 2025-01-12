'use client';
import React, { useState } from 'react';
import { projectsDetailData } from '@/data/projectsDetailData';
import ProjectCard from './projectCard';
import ProjectDetail from '@/components/projectDetail';
import { Project, Platform } from '../types';
import CategorySection from './categorySection';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('All');

  const filteredProjects = projectsDetailData.filter(
    (project) =>
      selectedPlatform === 'All' || project.platform.includes(selectedPlatform),
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-20 
      w-full h-full gap-12 sm:gap-16 lg:gap-20">
      {/* 헤더 섹션 */}
      <section className="w-full max-w-[1200px] flex flex-col items-start gap-8">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground 
          tracking-tight">
          Projects
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          웹과 모바일 플랫폼에서 다양한 프로젝트를 진행했습니다.
          각 프로젝트를 클릭하면 상세 내용을 확인하실 수 있습니다.
        </p>
      </section>

      {/* 카테고리 필터 섹션 */}
      <CategorySection
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
      />

      {/* 프로젝트 그리드 섹션 */}
      <section className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </section>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={handleCloseDetail} 
        />
      )}
    </div>
  );
};

export default ProjectsSection;