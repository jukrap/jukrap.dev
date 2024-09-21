import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AlertBannerProps {
	message: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ message }) => {
	const [isVisible, setIsVisible] = useState(true);

	const parseMessage = (text: string) => {
		const parts = [];
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
					className="font-bold underline"
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
		<div className="sticky z-40 w-full bg-accent text-accent-foreground py-2 px-4 top-16 no-select">
			<div className="container flex items-center justify-center">
				<p className="text-lg font-medium tracking-tight text-center mr-4">
					{parseMessage(message)}
				</p>
				<button
					onClick={() => setIsVisible(false)}
					className="p-1 hover:bg-black rounded-full transition-colors duration-200 ml-2"
					aria-label="닫기"
				>
					<X size={24} />
				</button>
			</div>
		</div>
	);
};

export default AlertBanner;
