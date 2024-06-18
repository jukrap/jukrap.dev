import React from 'react';
const ActivitySection: React.FC = () => {
	return (
		<section className="w-[670px] flex flex-col items-start gap-8 h-fit">
			<h2 className="font-bold text-4xl leading-10 tracking-tight text-right text-foreground w-[153px] h-fit">
				Activity
			</h2>
			<div className="flex justify-between gap-12">
				<div className="w-[153px] flex flex-col items-end gap-2">
					<p className="font-medium text-xl leading-6 text-right text-foreground">
						프로그래머스
						<br />
						데브코스
					</p>
					<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
						2023.12 ~ 2024.05
					</p>
				</div>
				<div className="w-[460px] flex flex-col items-start gap-3">
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						<strong>Cloud Application Engineering 과정</strong>
					</p>

					<div className="flex flex-col gap-1">
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								훈련 분야 : React & React Native
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default ActivitySection;
