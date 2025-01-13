import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AlertTopBannerProps } from '@/types/component';

const AlertTopBanner: React.FC<AlertTopBannerProps> = ({ message }) => {
	const [isVisible, setIsVisible] = useState(true);

	const parseMessage = (text: string) => {
		const parts: (string | JSX.Element)[] = [];
		const regex = /\*\[(.*?)\]\*:__(.*?)__/g;
		let lastIndex = 0;
		let match;

		while ((match = regex.exec(text)) !== null) {
			const [fullMatch, textPart, linkPart] = match;
			const matchStart = match.index;
			const matchEnd = matchStart + fullMatch.length;

			if (lastIndex < matchStart) {
				parts.push(text.slice(lastIndex, matchStart));
			}

			parts.push(
				<a
					key={matchStart}
					href={linkPart}
					target="_blank"
					rel="noopener noreferrer"
					className="font-bold underline decoration-accent hover:decoration-accent hover:text-accent transition-colors duration-300"
				>
					{textPart}
				</a>,
			);

			lastIndex = matchEnd;
		}

		if (lastIndex < text.length) {
			parts.push(text.slice(lastIndex));
		}

		return parts;
	};

	if (!isVisible) return null;

	return (
		<div className="sticky z-40 w-full bg-background/95 border-b border-border transition-colors duration-300">
			<div className="max-w-7xl mx-auto py-2.5 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto flex items-center justify-center relative">
					<p className="text-sm sm:text-base font-medium text-foreground text-center line-clamp-2 sm:line-clamp-1 break-keep pr-8">
						{parseMessage(message)}
					</p>
					<button
						onClick={() => setIsVisible(false)}
						className="absolute right-0 p-1 rounded-md hover:bg-muted transition-colors duration-300"
						aria-label="알림 닫기"
					>
						<X size={20} className="text-foreground" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AlertTopBanner;
