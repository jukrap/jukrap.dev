import React from 'react';
import useTypingEffect from '@/hook/useTypingEffect';
import { greetings } from '@/data/about/greetings';

export const TypingGreeting = () => {
	const typedText = useTypingEffect(greetings, {
		typingSpeed: 40,
		deletingSpeed: 20,
		pauseDuration: 2500,
	});

	// 가장 긴 텍스트 계산
	const longestGreeting = greetings.reduce((a, b) =>
		a.length > b.length ? a : b,
	);

	return (
		<div className="relative w-full">
			{/* 더미 텍스트 (공간 확보용) */}
			<div className="invisible font-medium text-base md:text-md pt-4">
				{longestGreeting}
			</div>

			{/* 실제 타이핑 효과 텍스트 */}
			<div className="absolute top-0 left-0 w-full pt-5 md:pt-8 select-none">
				<p className="font-medium text-base md:text-md tracking-tight text-foreground break-keep">
					{typedText.split('【').map((part, index) => {
						if (index === 0) return part;
						const [highlightedText, rest] = part.split('】');
						return (
							<React.Fragment key={index}>
								<span className="text-accent">{highlightedText}</span>
								{rest}
							</React.Fragment>
						);
					})}
					<span className="text-accent">|</span>
				</p>
			</div>
		</div>
	);
};
