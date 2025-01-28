'use client';

import React from 'react';
import useTypingEffect from '@/hook/useTypingEffect';

const names = ['Ju-cheol Park', 'Jukrap'];

export const WelcomeSection = () => {
	const typedText = useTypingEffect(names, {
		typingSpeed: 150,
		deletingSpeed: 100,
		pauseDuration: 2000,
	});

	return (
		<section className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-3xl">
			<div className="flex items-center border-foreground leading-6 py-3 border-t border-b gap-65">
				<h1 className="font-bold text-4xl md:text-6xl lg:text-8xl text-center text-foreground min-h-[3rem] md:min-h-[4.5rem] w-full select-none">
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
			<p className="font-bold text-xl md:text-2xl lg:text-3xl text-center text-foreground break-keep">
				Jukrap의 개인 사이트에 오신 것을 환영합니다.
			</p>
		</section>
	);
};
