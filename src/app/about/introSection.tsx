
'use client';
import React, { useState, useEffect, useRef } from 'react';
import IntroSectionLink from './introSectionLinks';
import ProfileImage from '@/components/profileImage';
import {
	decodeBirthDate,
	calculateAge,
	obfuscatedBirthDate,
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

	// 이벤트 핸들러들은 동일하게 유지
	const handleImageClick = () => {
		if (showMessage) {
			setIsMessageFadingOut(true);
			setTimeout(() => {
				setShowMessage(false);
				setIsMessageFadingOut(false);
				setIsFlipped(!isFlipped);
			}, 300);
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
			}, 200);
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
		<section className="w-full max-w-[670px] flex flex-col md:flex-row justify-start items-center md:items-start gap-8 md:gap-11">
			{/* 프로필 섹션 */}
			<div className="flex flex-col items-center gap-4 w-fit md:sticky md:top-24 pt-9 md:pt-0">
				<ProfileImage
					isFlipped={isFlipped}
					onClick={handleImageClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					showMessage={showMessage}
					isMessageFadingOut={isMessageFadingOut}
				/>

				<div className="text-center space-y-1">
					<h2 className="font-bold text-xl md:text-2xl leading-relaxed tracking-tight text-foreground">
						Ju-cheol Park
					</h2>
					<p className="text-xs md:text-sm leading-relaxed tracking-wider text-muted-foreground">
						jukrap628@gmail.com
					</p>
				</div>

				<div className="flex items-center gap-4 w-fit h-fit pt-2">
					{links.map((link) => (
						<IntroSectionLink key={link.url} {...link} icon={getIcon(link.type)} />
					))}
				</div>
			</div>

			{/* 소개 섹션 */}
			<div className="flex flex-col items-start w-full md:w-fit">
				<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-auto md:border-none md:pb-0">
					About Me
				</h2>

				{/* 타이핑 효과 텍스트 */}
				<div className="flex items-start w-full pt-4 md:pt-8 select-none">
					<p className="font-medium text-base md:text-md leading-relaxed md:leading-10 tracking-tight text-foreground break-keep">
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

				{/* 자기소개 섹션 */}
				<div className="flex flex-col items-start gap-6 md:gap-6 w-full pt-4 md:pt-2">
					<div className="space-y-6 md:space-y-6 w-full">
						{/* 소개 문구 */}
						<p className="text-lg md:text-lg leading-relaxed tracking-tight text-foreground bg-secondary/50 p-4 md:p-0 md:bg-transparent rounded-lg">
							오늘도 오류와 투쟁을 벌이는 프론트엔드 개발자,{' '}
							<span className="font-bold">박주철</span>입니다.
						</p>

						{/* 4가지 핵심 가치 */}
						<div className="space-y-6 md:space-y-6">
							{[
								{
									title: '1. 과정과 결과, 둘 모두 중요하다고 생각합니다.',
									content:
										'DIVE 2024 해커톤에서 72시간이라는 짧은 시간 내에 완성도 높은 서비스를 구현하며 이를 입증했습니다. 구글 맵스 플랫폼 선정부터 기술 검증, 구현까지의 과정을 거치면서 수상이라는 결과를 이끌어냈습니다. 이렇듯 개발에 임할 때 항상 과정과 결과 모두를 중시하는 태도로 임하고 있습니다.',
								},
								{
									title: '2. 재사용성이 높은 유연한 코드를 작성하고자 노력합니다.',
									content:
										'잇집 프로젝트에서 합성 패턴을 적용한 공통 컴포넌트 설계와 Storybook을 활용한 컴포넌트 주도 개발로 재사용성과 유지보수성을 높였습니다. 이는 15명 규모 팀에서 일관된 UI/UX를 제공하는 핵심이 되었습니다.',
								},
								{
									title: '3. 커뮤니케이션의 중요성을 높게 봅니다.',
									content:
										'여러 프로젝트에서 디자이너, 백엔드 개발자들과 적극적으로 소통하며 협업했습니다. 특히 잇집에서는 15명 팀의 커뮤니케이션 체계를 구축해 업무 효율을 크게 향상시켰습니다. 개발이란 결국 사람과 사람 간의 상호작용임을 알기에, 소통을 최우선으로 여기고 있습니다.',
								},
								{
									title: '4. 마지막으로, 문제 해결 과정을 즐깁니다.',
									content:
										'자세선생 프로젝트에서 OpenCV에서 Mediapipe로의 전환을 통해 성능을 5~10배 개선했고, 동해선장 프로젝트에서는 다양한 외부 API 통합 과정의 난관을 돌파해나갔습니다. 개발 과정의 도전들은 저에게 언제나 새로운 배움의 기회였고, 이를 통해 한 단계 성장할 수 있었습니다.',
								},
							].map((item, index) => (
								<div
									key={index}
									className="bg-secondary/30 p-4 rounded-lg md:bg-transparent md:p-0"
								>
									<p className="text-base leading-8 tracking-tight text-foreground">
										<span className="font-bold block mb-2 md:mb-0 break-keep">{item.title}</span>
										<span className="inline-block w-1.5 h-1.5 bg-foreground rounded-full ml-0.5 mr-2 mb-1"></span>
										{item.content}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default IntroSection;
