import React from 'react';

const activities = [
	{
		title: '스터디 운영',
		period: '2024.05 ~ Present',
		role: '코딩 테스트 및 개발 지식 스터디',
		details: ['총 2개 스터디(코딩 테스트, 개발 지식)를 운영하고 있습니다.'],
	},
	{
		title: '프로그래머스 데브코스',
		period: '2024.05 ~ 2024.09',
		role: 'Cloud Application Engineering 과정 - 서브멘토',
		details: [
			'이전 데브코스 기수에서 우수 수료자로 선정되어, 해당 과정 2기 수강생들에게 멘토링을 해주는 서브멘토로 활동하였습니다.',
			'멘토링 분야 : 매주 개발 정보 공유, 수료생 고민 상담, 데일리 스크럼 참여, 개발 문제 해결, 개발 프로젝트 점검 등',
		],
	},
	{
		title: '프로그래머스 데브코스',
		period: '2023.12 ~ 2024.05',
		role: 'Cloud Application Engineering 과정 - 수강생',
		details: [
			'React와 React Native 개발을 목표로 하는 Cloud Application Engineering 데브코스 과정을 수료하였습니다.',
			'훈련 분야 : React & React Native',
		],
	},
	{
		title: '스터디 멘토',
		period: '2021.09 ~ 2022.02',
		role: '멘토-멘티 코딩 멘토링',
		details: [
			'멘토로서 멘티에게 프로그래밍 및 개발 분야를 지도해주는 스터디에 참여하였습니다.',
		],
	},
];

const ActivitySection: React.FC = () => {
	return (
		<section className="w-full max-w-[670px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-[153px] md:border-none md:pb-0 md:text-right">
				Activity
			</h2>

			<div className="w-full flex flex-col gap-6">
				{activities.map((activity, index) => (
					<div
						key={index}
						className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-12 bg-secondary/30 md:bg-transparent p-4 md:p-0 rounded-lg"
					>
						{/* 기간 정보 */}
						<div className="flex md:w-[153px] flex-col items-start md:items-end gap-0.5">
							<p className="font-medium text-lg md:text-xl leading-6 text-left md:text-right text-foreground whitespace-pre-line break-keep">
								{activity.title}
							</p>
							<p className="font-medium text-sm leading-6 text-left md:text-right text-muted-foreground">
								{activity.period}
							</p>
						</div>

						{/* 활동 세부사항 */}
						<div className="md:w-[460px] flex flex-col items-start gap-1">
							<p className="text-base md:text-lg leading-6 tracking-tight text-left text-foreground break-keep">
								<strong>{activity.role}</strong>
							</p>
							<div className="flex flex-col gap-1">
								{activity.details.map((detail, detailIndex) => (
									<div
										key={detailIndex}
										className="grid grid-cols-[auto,1fr] items-start gap-3"
									>
										<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
										<span className="text-sm md:text-base leading-6 text-left text-foreground">
											{detail}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ActivitySection;
