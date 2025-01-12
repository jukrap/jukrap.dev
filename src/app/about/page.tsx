import React from 'react';
import IntroSection from './introSection';
import SkillsSection from './skillsSection';
import ActivitySection from './activitySection';
import AwardsSection from './awardsSection';
import SideProjectsSection from './sideProjectsSection';

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
