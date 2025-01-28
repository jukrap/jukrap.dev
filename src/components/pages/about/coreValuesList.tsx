import React from 'react';
import { coreValues } from '@/data/about/coreValues';

export const CoreValuesList = () => {
	return (
		<div className="space-y-6 md:space-y-6">
			{coreValues.map((item, index) => (
				<div
					key={index}
					className="bg-secondary/30 p-4 rounded-lg md:bg-transparent md:p-0"
				>
					<p className="text-base leading-8 tracking-tight text-foreground">
						<span className="font-bold block mb-2 md:mb-0 break-keep">
							{item.title}
						</span>
						<span className="inline-block w-1.5 h-1.5 bg-foreground rounded-full ml-0.5 mr-2 mb-1" />
						{item.content}
					</p>
				</div>
			))}
		</div>
	);
};
