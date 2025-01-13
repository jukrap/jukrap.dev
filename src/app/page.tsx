'use client';

import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/store/useThemeStore';
import { Link } from '@/types/common';
import useTypingEffect from '@/hook/useTypingEffect';
import { useIcon } from '@/hook/useIcon';
import HomeBodyLink from '@/components/pages/home/homeBodyLink';

const links: Link[] = [
	{
		text: 'Email',
		type: 'email',
		url: 'mailto:jukrap628@gmail.com',
	},
	{
		text: 'Github',
		type: 'github',
		url: 'https://github.com/jukrap',
		isExternal: true,
	},
	{
		text: 'Blog',
		type: 'blog',
		url: 'https://valur.tistory.com/',
		isExternal: true,
	},
	{
		text: 'LinkedIn',
		type: 'linkedin',
		url: 'https://www.linkedin.com/in/jukrap/',
		isExternal: true,
	},
];

export default function HomePage() {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const { getIcon } = useIcon();
	const names = ['Ju-cheol Park', 'Jukrap'];
	const typedText = useTypingEffect(names, {
		typingSpeed: 150,
		deletingSpeed: 100,
		pauseDuration: 2000,
	});

	return (
		<main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:pt-36 lg:pb-24 gap-8 md:gap-16 lg:gap-24">
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

			<section className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 flex-wrap">
				{links.map((link) => (
					<HomeBodyLink key={link.url} {...link} icon={getIcon(link.type)} />
				))}
			</section>

			<section className="flex flex-col items-center gap-8 md:gap-16 px-4">
				<div className="flex flex-col items-center gap-6 md:gap-8 text-center break-keep">
					<p className="font-medium text-lg md:text-2xl leading-relaxed text-foreground">
						혹시 저의 <span className="font-bold">포트폴리오 파일</span>이
						필요하신가요?
						<br />
						그렇다면 아래의 <span className="font-bold">PDF 다운로드 버튼</span>을
						눌러주세요!
					</p>
					<a
						href="/files/Ju-cheol-Park_Frontend.pdf"
						download
						className="relative flex items-center gap-2 px-4 py-2 font-bold text-lg md:text-xl leading-5 text-center text-background bg-foreground rounded-lg hover:bg-accent transition-colors duration-300 select-none"
					>
						<div className="relative w-6 h-6 flex items-center justify-center no-select">
							<Image
								src={getIcon('downArrow')}
								alt="Download Icon"
								width={24}
								height={24}
								className="absolute top-0 left-0 animate-downloadArrow"
							/>
						</div>
						<span className="ml-2">portfolio.PDF</span>
					</a>
				</div>
			</section>
		</main>
	);
}
