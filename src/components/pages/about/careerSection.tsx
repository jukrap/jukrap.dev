'use client';

import React from 'react';
import { useLocale } from '@/contexts/localeContext';

const CareerSection: React.FC = () => {
	const { dictionary } = useLocale();
	const career = dictionary.about.careerSummary;

	return (
		<section className="w-full max-w-[700px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-[170px] md:border-none md:pb-0 md:text-right">
				{dictionary.about.career}
			</h2>

			<div className="w-full flex flex-col gap-6">
				<div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-12 bg-secondary/30 md:bg-transparent p-4 md:p-0 rounded-lg">
					<div className="flex md:w-[170px] flex-col items-start md:items-end gap-0.5">
						<p className="font-medium text-lg md:text-xl leading-6 text-left md:text-right text-foreground whitespace-pre-line break-keep">
							{career.company}
						</p>
						<p className="font-medium text-sm leading-6 text-left md:text-right text-muted-foreground">
							{career.period}
						</p>
					</div>

					<div className="md:w-[460px] flex flex-col items-start gap-1">
						<p className="text-base md:text-lg leading-6 tracking-tight text-left text-foreground break-keep">
							<strong>{career.role}</strong>
						</p>
						<div className="flex flex-col gap-1">
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
