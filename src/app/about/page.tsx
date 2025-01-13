import React from 'react';
import { Metadata } from 'next';
import IntroSection from '@/components/pages/about/introSection';
import SkillsSection from '@/components/pages/about/skillsSection';
import ActivitySection from '@/components/pages/about/activitySection';
import AwardsSection from '@/components/pages/about/awardsSection';
import SideProjectsSection from '@/components/pages/about/sideProjectsSection';

export const metadata: Metadata = {
	title: 'About | Ju-cheol Park',
	description: 'About page of Ju-cheol Park, Frontend Engineer',
};

const About: React.FC = () => {
	return (
		<div className="flex flex-col items-center px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-20 w-full h-full gap-12 sm:gap-16 lg:gap-20">
			<IntroSection />
			<SkillsSection />
			<ActivitySection />
			<AwardsSection />
			<SideProjectsSection />
		</div>
	);
};

export default About;
