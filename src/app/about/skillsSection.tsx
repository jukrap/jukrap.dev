import React from 'react';

const skills = [
	{
		category: 'Languages',
		items: 'JavaScript, TypeScript, Java',
	},
	{
		category: 'Frameworks',
		items: 'React & React Native, Next.js, Android Jetpack',
	},
	{
		category: 'Databases',
		items: 'NoSQL, SQLite',
	},
	{
		category: 'DevOps',
		items: 'Firebase, Google Cloud Platform, AWS, Jenkins',
	},
];

const SkillsSection: React.FC = () => {
	return (
		<section className="w-full max-w-[670px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-[153px] md:border-none md:pb-0 md:text-right">
				Skills
			</h2>

			{/* 모바일에서는 카드 형태로, 데스크톱에서는 기존 레이아웃 유지 */}
			<div className="w-full flex flex-col md:flex-row md:justify-between gap-4 md:gap-12">
				<div className="hidden md:flex md:w-[153px] flex-col items-end gap-8">
					{skills.map((skill, index) => (
						<p
							key={index}
							className="font-medium text-xl leading-6 tracking-tight text-right text-foreground"
						>
							{skill.category}
						</p>
					))}
				</div>

				{/* 모바일 뷰 */}
				<div className="flex flex-col md:hidden w-full gap-4">
					{skills.map((skill, index) => (
						<div key={index} className="bg-secondary/30 p-4 rounded-lg space-y-2">
							<h3 className="font-medium text-lg leading-6 text-foreground">
								{skill.category}
							</h3>
							<p className="text-base leading-relaxed text-foreground">
								{skill.items}
							</p>
						</div>
					))}
				</div>

				{/* 데스크톱 뷰 */}
				<div className="hidden md:flex md:w-[460px] flex-col items-start gap-8">
					{skills.map((skill, index) => (
						<p
							key={index}
							className="text-lg leading-6 tracking-tight text-left text-foreground"
						>
							{skill.items}
						</p>
					))}
				</div>
			</div>
		</section>
	);
};

export default SkillsSection;
