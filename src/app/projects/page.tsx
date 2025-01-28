import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ProjectsSection from '@/components/pages/projects/projectsSection';

export const metadata: Metadata = {
  title: 'Projects | Ju-cheol Park',
  description: 'Projects page of Ju-cheol Park, Frontend Engineer',
};

const Projects = () => {
	return <ProjectsSection />;
};

export default Projects;
