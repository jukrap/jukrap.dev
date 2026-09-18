'use client';

import React from 'react';
import { useProfileInteraction } from '@/hook/useProfileInteraction';
import { useLocale } from '@/contexts/localeContext';
import { ProfileCard } from './profileCard';
import { TypingGreeting } from './typingGreeting';
import { CoreValuesList } from './coreValuesList';

const IntroSection: React.FC = () => {
	const {
		dictionary,
		data: { personalInfo },
	} = useLocale();
	const {
		isFlipped,
		showMessage,
		handleImageClick,
		handleMouseEnter,
		handleMouseLeave,
	} = useProfileInteraction();

	return (
		<section className="about-intro w-full max-w-[700px] flex flex-col md:flex-row justify-start items-center md:items-start gap-10 md:gap-12">
			<ProfileCard
				isFlipped={isFlipped}
				onClick={handleImageClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				showMessage={showMessage}
			/>

			<div className="about-intro-copy min-w-0 flex-1 w-full">
				<h1 className="font-bold text-3xl md:text-4xl leading-tight tracking-tight text-foreground">
					{dictionary.about.title}
				</h1>

				<div className="about-intro-lead">
					<p className="about-introduction text-lg leading-relaxed text-foreground break-keep">
						{personalInfo.introduction}
					</p>
					<TypingGreeting />
				</div>
				<div className="about-intro-detail">
					<CoreValuesList />
				</div>
			</div>
		</section>
	);
};

export default IntroSection;
