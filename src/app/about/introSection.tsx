'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeStore } from '../../store/useThemeStore';

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

const IntroSectionLink: React.FC<Link> = ({
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
			className="flex flex-row items-center justify-center"
		>
			<Image
				src={isDarkMode ? blackIcon : whiteIcon}
				alt={`${text} Icon`}
				width={24}
				height={24}
			/>
		</a>
	);
};

const IntroSection: React.FC = () => {
	const [typedText, setTypedText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const greetings = [
		"👋 Hi there, I'm 【Frontend Engineer】. ",
		"👋 Hi there, I'm 【Jukrap】. ",
		"👋 Hi there, I'm 【Ju-cheol Park】. ",
		'👋 Hi there, 【Gamer】. ',
	];
	useEffect(() => {
		const typingSpeed = 50;
		const deletingSpeed = 50;
		const pauseDuration = 2000;
		let timeout: NodeJS.Timeout | undefined;

		if (!isDeleting) {
			timeout = setTimeout(() => {
				const currentGreeting = greetings[currentIndex];
				let nextTypedText = '';

				if (typedText === '' && currentGreeting.startsWith('👋')) {
					nextTypedText = '👋';
				} else {
					nextTypedText = currentGreeting.slice(0, typedText.length + 1);
				}

				setTypedText(nextTypedText);

				if (nextTypedText === currentGreeting) {
					timeout = setTimeout(() => {
						setIsDeleting(true);
					}, pauseDuration);
				}
			}, typingSpeed);
		} else {
			timeout = setTimeout(() => {
				const currentGreeting = greetings[currentIndex];
				const nextTypedText = currentGreeting.slice(0, typedText.length - 1);

				if (nextTypedText.endsWith('👋')) {
					setTypedText('');
					setIsDeleting(false);
					setCurrentIndex((currentIndex + 1) % greetings.length);
				} else {
					setTypedText(nextTypedText);
					if (nextTypedText === '') {
						setIsDeleting(false);
						setCurrentIndex((currentIndex + 1) % greetings.length);
					}
				}
			}, deletingSpeed);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [typedText, isDeleting, currentIndex, greetings]);

	return (
		<section className="w-[670px] flex justify-start items-start gap-12">
			<div className="flex flex-col items-center gap-2 w-fit h-fit">
				<Image
					src="/images/doge_my_img.png"
					alt="Profile Picture"
					width={200}
					height={200}
					className="rounded-full"
				/>
				<h2 className="font-bold text-2xl leading-6 tracking-tight text-center text-foreground">
					Ju-cheol Park
				</h2>
				<p className="text-sm leading-6 tracking-wider text-center text-muted-foreground">
					jukrap628@gmail.com
				</p>
				<div className="flex items-center gap-2 w-fit h-fit pt-4">
					{links.map((link) => (
						<IntroSectionLink key={link.url} {...link} />
					))}
				</div>
			</div>
			<div className="flex flex-col items-start w-fit h-fit">
				<h2 className="font-bold text-4xl leading-10 tracking-tight text-left text-foreground">
					About Me
				</h2>
				<div className="flex items-start gap-8 w-fit h-fit pt-8">
					<p className="font-medium text-lg leading-10 tracking-tight text-left text-foreground">
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
				<div className="flex flex-col items-start gap-6 w-fit h-fit pt-2">
					<p className="text-lg leading-10 tracking-tight text-left text-foreground">
						안녕하세요! 사용자 친화적인 서비스 개발에 큰 관심이 있는 모바일 &
						프론트엔드 개발자, 박주철입니다.
					</p>
					<p className="text-lg leading-10 tracking-tight text-left text-foreground">
						저는 사람들과 의견을 나누고 토론하는 것을 좋아합니다. 더 나은 소프트웨어를
						만드는 것에 관심이 많으며, 이를 위해 새로운 기술과 방법론을 학습하고
						적용하는 데 주저하지 않습니다.
					</p>
					<p className="text-lg leading-10 tracking-tight text-left text-foreground">
						다양한 경험과 열정을 바탕으로, 저는 끊임없이 배우고 성장하며 개발자로서의
						역량을 키워나가고 있습니다. 다양한 팀과 협업하여 의미 있는 프로젝트에
						기여하는 개발자가 되는 것이 저의 꿈입니다.
					</p>
					<p className="text-lg leading-10 tracking-tight text-left text-foreground">
						혹시 협업 가능성에 대해 이야기를 나누고 싶거나 질문이 있다면 언제든 연락
						주시기 바랍니다. 저는 새로운 기회와 도전을 환영합니다!
					</p>
				</div>
			</div>
		</section>
	);
};

export default IntroSection;
