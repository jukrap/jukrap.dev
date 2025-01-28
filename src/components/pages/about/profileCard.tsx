import React from 'react';
import { useIcon } from '@/hook/useIcon';
import { links } from '@/data/about/links';
import { personalInfo } from '@/data/about/personalInfo';
import ProfileImage from './profileImage';
import IntroSectionLink from './introSectionLinks';
import { ProfileInteractionProps } from '@/types/profile';

export const ProfileCard: React.FC<ProfileInteractionProps> = ({
	isFlipped,
	showMessage,
	isMessageFadingOut,
	onClick,
	onMouseEnter,
	onMouseLeave,
}) => {
	const { getIcon } = useIcon();

	return (
		<div className="flex flex-col items-center gap-4 w-fit md:sticky md:top-24 pt-9 md:pt-0">
			<ProfileImage
				isFlipped={isFlipped}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				showMessage={showMessage}
				isMessageFadingOut={isMessageFadingOut}
			/>

			<div className="text-center space-y-1">
				<h2 className="font-bold text-xl md:text-2xl leading-relaxed tracking-tight text-foreground">
					{personalInfo.name}
				</h2>
				<p className="text-xs md:text-sm leading-relaxed tracking-wider text-muted-foreground">
					{personalInfo.email}
				</p>
			</div>

			<div className="flex items-center gap-4 w-fit h-fit pt-2">
				{links.map((link) => (
					<IntroSectionLink key={link.url} {...link} icon={getIcon(link.type)} />
				))}
			</div>
		</div>
	);
};
