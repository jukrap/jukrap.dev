'use client';

import React from 'react';
import { useProfileInteraction } from '@/hook/useProfileInteraction';
import { personalInfo } from '@/data/about/personalInfo';
import { ProfileCard } from './profileCard';
import { TypingGreeting } from './typingGreeting';
import { CoreValuesList } from './coreValuesList';

const IntroSection: React.FC = () => {
	const {
		isFlipped,
		showMessage,
		isMessageFadingOut,
		handleImageClick,
		handleMouseEnter,
		handleMouseLeave,
	} = useProfileInteraction();

	return (
		<section className="w-full max-w-[670px] flex flex-col md:flex-row justify-start items-center md:items-start gap-8 md:gap-11">
			<ProfileCard
				isFlipped={isFlipped}
				onClick={handleImageClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				showMessage={showMessage}
				isMessageFadingOut={isMessageFadingOut}
			/>

			<div className="flex flex-col items-start w-full md:w-fit">
				<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-auto md:border-none md:pb-0">
					About Me
				</h2>

				<TypingGreeting />

				<div className="flex flex-col items-start gap-6 md:gap-6 w-full pt-4 md:pt-2">
					<div className="space-y-6 md:space-y-6 w-full">
						<p className="text-lg md:text-lg leading-relaxed tracking-tight text-foreground bg-secondary/50 p-4 md:p-0 md:bg-transparent rounded-lg">
							{personalInfo.introduction}
						</p>
						<CoreValuesList />
					</div>
				</div>
			</div>
		</section>
	);
};

export default IntroSection;
