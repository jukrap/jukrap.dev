import React from 'react';

const SkillsSection: React.FC = () => {
	return (
		<section className="w-[670px] flex flex-col items-start gap-8 h-fit">
			<h2 className="font-bold text-4xl leading-10 tracking-tight text-right text-foreground w-[153px] h-fit">
				Skills
			</h2>
			<div className="flex justify-between gap-12">
				<div className="w-[153px] flex flex-col items-end gap-8">
					<p className="font-medium text-xl leading-6 tracking-tight text-right text-foreground">
						Languages
					</p>
					<p className="font-medium text-xl leading-6 tracking-tight text-right text-foreground">
						Frameworks
					</p>
					<p className="font-medium text-xl leading-6 tracking-tight text-right text-foreground">
						Databases
					</p>
					<p className="font-medium text-xl leading-6 tracking-tight text-right text-foreground">
						DevOps
					</p>
				</div>
				<div className="w-[460px] flex flex-col items-start gap-8">
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						JavaScript, TypeScript, Java
					</p>
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						React & React Native, Next.js, Android Jetpack
					</p>
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						NoSQL, SQLite
					</p>
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						Firebase, Google Cloud Platform
					</p>
				</div>
			</div>
		</section>
	);
};

export default SkillsSection;
