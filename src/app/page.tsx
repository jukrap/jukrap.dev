'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

interface Link {
	text: string;
	whiteIcon: string;
	blackIcon: string;
	url: string;
	isExternal?: boolean;
}

const links: Link[] = [
	{
		text: 'Email',
		whiteIcon: '/icons/whiteMode_email.svg',
		blackIcon: '/icons/blackMode_email.svg',
		url: 'mailto:jukrap628@gmail.com',
	},
	{
		text: 'Github',
		whiteIcon: '/icons/whiteMode_github.svg',
		blackIcon: '/icons/blackMode_github.svg',
		url: 'https://github.com/jukrap',
		isExternal: true,
	},
	{
		text: 'Blog',
		whiteIcon: '/icons/whiteMode_blog.svg',
		blackIcon: '/icons/blackMode_blog.svg',
		url: 'https://valur.tistory.com/',
		isExternal: true,
	},
	{
		text: 'LinkedIn',
		whiteIcon: '/icons/whiteMode_linkedin.svg',
		blackIcon: '/icons/blackMode_linkedin.svg',
		url: 'https://www.linkedin.com/in/jukrap/',
		isExternal: true,
	},
];
const HomeBodyLink: React.FC<Link> = ({
	text,
	whiteIcon,
	blackIcon,
	url,
	isExternal,
}) => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	return (
		<a
			href={url}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}
			className="flex flex-row items-center justify-center gap-2"
		>
			<Image
				src={isDarkMode ? blackIcon : whiteIcon}
				alt={`${text} Icon`}
				width={32}
				height={32}
			/>
			<p className="font-light text-2xl leading-auto text-center text-foreground">
				{text}
			</p>
		</a>
	);
};
export default function HomePage() {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const [typedText, setTypedText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const names = ['Ju-cheol Park', 'Jukrap'];

	useEffect(() => {
		const typingSpeed = 200;
		const deletingSpeed = 100;
		const pauseDuration = 2000;

		let timeout: NodeJS.Timeout | undefined;

		if (!isDeleting) {
			timeout = setTimeout(() => {
				const currentName = names[currentIndex];
				const nextTypedText = currentName.slice(0, typedText.length + 1);
				setTypedText(nextTypedText);

				if (nextTypedText === currentName) {
					timeout = setTimeout(() => {
						setIsDeleting(true);
					}, pauseDuration);
				}
			}, typingSpeed);
		} else {
			timeout = setTimeout(() => {
				const currentName = names[currentIndex];
				const nextTypedText = currentName.slice(0, typedText.length - 1);
				setTypedText(nextTypedText);

				if (nextTypedText === '') {
					setIsDeleting(false);
					setCurrentIndex((currentIndex + 1) % names.length);
				}
			}, deletingSpeed);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [typedText, isDeleting, currentIndex, names]);

	return (
		<main className="w-fixed flex flex-col items-center gap-24 pt-44 pb-48">
			<section className="flex flex-col items-center gap-10 pt-30">
				<div className="flex items-center border-foreground leading-6 py-3 border-t border-b gap-65">
					<h1 className="font-bold text-8xl text-center text-foreground min-h-[4.5rem]">
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
                <div className="flex items-center gap-65">  {/* 여기 여차하면 삭제하는 게 좋을 듯. 조금 부자연스러움. */}
                    <p className="font-bold text-3xl leading-auto text-center text-foreground">
                        Jukrap의 개인 사이트에 오신 것을 환영합니다.
                    </p>
                </div>
			</section>
			<section className="flex flex-row items-center justify-center gap-10">
				{links.map((link) => (
					<HomeBodyLink key={link.url} {...link} />
				))}
			</section>
			<section className="flex flex-col items-center gap-16">
				<div className="flex flex-col items-center gap-8">
					<p className="font-medium text-2xl leading-8 text-center text-foreground">
						혹시 저의 <span className="font-bold">포트폴리오 파일</span>이
						필요하신가요?
						<br />
						그렇다면 아래의 <span className="font-bold">PDF 다운로드 버튼</span>을
						눌러주세요!
					</p>
					<a
						href="/files/Portfolio (Ju-cheol Park).pdf"
						download
						className="relative flex items-center gap-2 px-4 py-2 font-bold text-xl leading-5 text-center text-background bg-foreground rounded-lg hover:bg-accent transition-colors duration-300"
					>
						<div className="relative w-6 h-6 flex items-center justify-center">
							<Image
								src={
									isDarkMode
										? '/icons/blackMode_downArrow.svg'
										: '/icons/whiteMode_downArrow.svg'
								}
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
