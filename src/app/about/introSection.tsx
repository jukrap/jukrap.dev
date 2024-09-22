'use client';
import React, { useState, useEffect, useRef } from 'react';
import IntroSectionLink from './introSectionLinks';
import ProfileImage from '@/components/profileImage';
import {
	obfuscatedBirthDate,
	decodeBirthDate,
	calculateAge,
} from '@/util/dateUtils';
import { greetings } from '../../data/greetings';
import useTypingEffect from '@/hook/useTypingEffect';
import { Link } from '../types';
import { useIcon } from '@/hook/useIcon';

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
const birthDate = decodeBirthDate(obfuscatedBirthDate);
const age = calculateAge(birthDate);

const IntroSection: React.FC = () => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [isMessageFadingOut, setIsMessageFadingOut] = useState(false);
	const { getIcon } = useIcon();
	const typedText = useTypingEffect(greetings, {
		typingSpeed: 40,
		deletingSpeed: 20,
		pauseDuration: 2500,
	});

	const handleImageClick = () => {
		if (showMessage) {
			setIsMessageFadingOut(true);
			setTimeout(() => {
				setShowMessage(false);
				setIsMessageFadingOut(false);
				setIsFlipped(!isFlipped);
			}, 300); // 애니메이션 지속 시간
		} else {
			setIsFlipped(!isFlipped);
		}
	};

	const handleMouseEnter = () => {
		timeoutRef.current = setTimeout(() => {
			setShowMessage(true);
		}, 1000);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		if (showMessage) {
			setIsMessageFadingOut(true);
			setTimeout(() => {
				setShowMessage(false);
				setIsMessageFadingOut(false);
			}, 300);
		}
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<section className="w-[670px] flex justify-start items-start gap-11">
			<div className="flex flex-col items-center gap-2 w-fit h-fit">
				<ProfileImage
					isFlipped={isFlipped}
					onClick={handleImageClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					showMessage={showMessage}
					isMessageFadingOut={isMessageFadingOut}
				/>

				<h2 className="font-bold text-2xl leading-6 tracking-tight text-center text-foreground">
					Ju-cheol Park
				</h2>
				<p className="text-sm leading-6 tracking-wider text-center text-muted-foreground">
					jukrap628@gmail.com
				</p>

				<div className="flex items-center gap-3 w-fit h-fit pt-4">
					{links.map((link) => (
						<IntroSectionLink key={link.url} {...link} icon={getIcon(link.type)} />
					))}
				</div>
			</div>
			<div className="flex flex-col items-start w-fit h-fit">
				<h2 className="font-bold text-4xl leading-10 tracking-tight text-left text-foreground">
					About Me
				</h2>
				<div className="flex items-start gap-8 w-fit h-fit pt-8 select-none">
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
						오늘도 오류와 투쟁을 벌이는 프론트엔드 개발자,{' '}
						<span className="font-bold">박주철</span>입니다.
					</p>
					<p className="text-base leading-10 tracking-tight text-left text-foreground">
						<span className="font-bold">
							1. 과정과 결과, 둘 모두 중요하다고 생각합니다.
						</span>
						<br />
						어느 한 쪽에 치중되는 것은 제대로 된 개발과는 거리가 멀다고 생각합니다. 이
						때문에, 개발자라면 최대한 둘 모두를 가져가야 한다고 생각합니다.
					</p>
					<p className="text-base leading-10 tracking-tight text-left text-foreground">
						<span className="font-bold">
							2. 재사용성이 높은 유연한 코드를 작성하고자 노력합니다.
						</span>
						<br />
						코드도 줄이고, 작업량도 줄이는 핵심. 한편으로는 유연성과 지속가능한 코드가
						바로 재사용성이 높은 코드이기에 이를 작성하고자 노력합니다. 최종적으로는
						동료들에게 당당히 보여줄 수 있는 코드를 추구합니다.
					</p>
					<p className="text-base leading-10 tracking-tight text-left text-foreground">
						<span className="font-bold">3. 커뮤니케이션의 중요성을 높게 봅니다.</span>
						<br />
						인간은 사회성의 동물! 그리고 저는 ENFJ입니다! 타인을 존중하며 이야기하는
						것은 언제나 즐겁습니다. 또한, 다른 사람과 의견을 나누고 반영하는 과정은
						개발의 폭을 넓히는 과정이라고 생각합니다. 그렇기에 커뮤니케이션은 언제나
						저의 성장 양분입니다.
					</p>
					<p className="text-base leading-10 tracking-tight text-left text-foreground">
						<span className="font-bold">
							4. 마지막으로, 오류 찾기는 생각보다 재미있습니다
						</span>
						<br />
						의외로 도파민 분비가 많이 되는 느낌입니다. 또한, 다른 사람의 코드를 보며
						원리를 분석하고 감탄하는 것도 보람찬 과정으로 여깁니다.
					</p>
				</div>
			</div>
		</section>
	);
};

export default IntroSection;
