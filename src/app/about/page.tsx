import React from 'react';
import Image from 'next/image';
import IntroSection from './introSection';
const About: React.FC = () => {
	return (
		<div className="flex flex-col items-center px-20 py-20 w-full h-full gap-64">
			<IntroSection />
		</div>
	);
};
export default About;
