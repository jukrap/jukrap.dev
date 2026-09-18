import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AlertTopBannerProps } from '@/types/component';

const AlertTopBanner: React.FC<AlertTopBannerProps> = ({
	message,
	closeLabel,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	const parseMessage = (text: string) => {
		const parts: (string | React.ReactElement)[] = [];
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
					className="font-bold underline decoration-accent/60 underline-offset-4 transition-colors duration-200 hover:text-accent"
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
		<div className="relative z-40 w-full bg-background border-b border-border/25 transition-colors duration-300">
			<div className="site-notice-container">
				<div className="site-notice-content">
					<p className="site-notice-message text-sm sm:text-base font-medium text-foreground text-center break-keep">
						{parseMessage(message)}
					</p>
					<button
						type="button"
						onClick={() => setIsVisible(false)}
						className="site-notice-close rounded-md transition-colors duration-200 hover:bg-muted/80"
						aria-label={closeLabel}
					>
						<X size={20} className="text-foreground" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AlertTopBanner;
