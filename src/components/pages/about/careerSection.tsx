'use client';

import React from 'react';
import { useLocale } from '@/contexts/localeContext';

const CareerSection: React.FC = () => {
	const { dictionary } = useLocale();
	const career = dictionary.about.careerSummary;

	return (
		<section className="w-full max-w-[700px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="about-section-title font-bold tracking-tight text-foreground">
				{dictionary.about.career}
			</h2>

			<div className="w-full flex flex-col gap-6">
				<div className="about-entry">
					<div className="flex flex-col items-start gap-0.5">
						<p className="font-medium text-lg md:text-xl leading-6 text-left text-foreground whitespace-pre-line break-keep">
							{career.company}
						</p>
						<p className="font-medium text-sm leading-6 text-left text-muted-foreground">
							{career.period}
						</p>
					</div>

					<div className="min-w-0 flex flex-col items-start gap-3">
						<p className="text-base md:text-lg leading-6 tracking-tight text-left text-foreground break-keep">
							<strong>{career.role}</strong>
						</p>
						<div className="flex flex-col gap-3">
							{career.details.map((detail) => (
								<div
									key={detail}
									className="grid grid-cols-[auto,1fr] items-start gap-3"
								>
									<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2" />
									<span className="text-sm md:text-base leading-6 text-left text-foreground break-keep">
										{detail}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CareerSection;
