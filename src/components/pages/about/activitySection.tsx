'use client';

import React from 'react';
import { useLocale } from '@/contexts/localeContext';

const ActivitySection: React.FC = () => {
	const {
		dictionary,
		data: { activities },
	} = useLocale();

	return (
		<section className="w-full max-w-[700px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="about-section-title font-bold tracking-tight text-foreground">
				{dictionary.about.activity}
			</h2>

			<div className="w-full flex flex-col gap-6">
				{activities.map((activity) => (
					<div key={activity.id} className="about-entry">
						{/* 기간 정보 */}
						<div className="flex flex-col items-start gap-0.5">
							<p className="font-medium text-lg md:text-xl leading-6 text-left text-foreground whitespace-pre-line break-keep">
								{activity.title}
							</p>
							<p className="font-medium text-sm leading-6 text-left text-muted-foreground">
								{activity.period}
							</p>
						</div>

						{/* 활동 세부사항 */}
						<div className="min-w-0 flex flex-col items-start gap-1">
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
