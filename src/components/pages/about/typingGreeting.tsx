import React from 'react';
import { useLocale } from '@/contexts/localeContext';
import useTypingEffect from '@/hook/useTypingEffect';

export const TypingGreeting = () => {
	const {
		data: { greetings },
	} = useLocale();
	const typedText = useTypingEffect(greetings, {
		typingSpeed: 40,
		deletingSpeed: 20,
		pauseDuration: 2500,
	});

	return (
		<div className="about-greeting">
			{/* Reserve the actual wrapped height of every greeting, using the same typography. */}
			{greetings.map((greeting) => (
				<p key={greeting} className="about-greeting-measure" aria-hidden="true">
					{greeting.replace(/[【】]/g, '')} |
				</p>
			))}
			<div className="about-greeting-visible select-none" aria-hidden="true">
				<p>
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
					<span className="text-muted-foreground">|</span>
				</p>
			</div>
			<span className="sr-only">{greetings[0].replace(/[【】]/g, '')}</span>
		</div>
	);
};
