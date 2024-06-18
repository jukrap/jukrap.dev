import React from 'react';
import IntroSection from './introSection';
import SkillsSection from './skillsSection';
const About: React.FC = () => {
	return (
		<div className="flex flex-col items-center px-20 py-20 w-full h-full gap-20">
			<IntroSection />
			<SkillsSection />
		</div>
	);
};
export default About;
