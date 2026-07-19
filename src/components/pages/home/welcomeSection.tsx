'use client';

import { useLocale } from '@/contexts/localeContext';
import useTypingEffect from '@/hook/useTypingEffect';

const names = ['Ju-cheol Park', 'Jukrap'];

export const WelcomeSection = () => {
	const { dictionary } = useLocale();
	const typedText = useTypingEffect(names, {
		typingSpeed: 150,
		deletingSpeed: 100,
		pauseDuration: 2000,
	});

	return (
		<section className="flex w-full max-w-3xl flex-col items-center gap-6 md:gap-10">
			<div className="gap-65 flex items-center border-y border-foreground py-3 leading-6">
				<h1 className="min-h-[3rem] w-full select-none text-center text-4xl font-bold text-foreground md:min-h-[4.5rem] md:text-6xl lg:text-8xl">
					{typedText.split('').map((char, index) => (
						<span
							key={index}
							className={index === typedText.length - 1 ? 'underline-wide' : ''}
						>
							{char}
						</span>
					))}
					{typedText === '' && <span className="opacity-0">_</span>}
				</h1>
			</div>
			<p className="break-keep text-center text-xl font-bold text-foreground md:text-2xl lg:text-3xl">
				{dictionary.home.welcome}
			</p>
		</section>
	);
};
