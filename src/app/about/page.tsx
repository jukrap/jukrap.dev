import React from 'react';
import IntroSection from './introSection';
import SkillsSection from './skillsSection';
import ActivitySection from './activitySection';
import AwardsSection from './awardsSection';
import SideProjectsSection from './sideProjectsSection';
const About: React.FC = () => {
	return (
		<div className="flex flex-col items-center px-20 py-20 w-full h-full gap-20">
			<IntroSection />
			<SkillsSection />
			<ActivitySection />
			<AwardsSection />
			<SideProjectsSection />
		</div>
	);
};
export default About;
