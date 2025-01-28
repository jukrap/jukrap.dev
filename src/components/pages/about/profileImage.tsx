import React from 'react';
import Image from 'next/image';
import { ProfileInteractionProps } from '@/types/profile';
import { profileMessages } from '@/data/messages/profileMessages';

const ProfileImage: React.FC<ProfileInteractionProps> = ({
	isFlipped,
	onClick,
	onMouseEnter,
	onMouseLeave,
	showMessage,
	isMessageFadingOut,
}) => {
	return (
		<div
			className="relative w-40 h-40 cursor-pointer perspective-1000"
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div
				className={`relative w-full h-full select-none transition-transform duration-1000 transform-style-3d ${
					isFlipped ? 'rotate-x-180' : ''
				}`}
			>
				<Image
					src="/images/profileFront.png"
					alt="Profile Picture Front"
					width={200}
					height={200}
					className="rounded-full absolute w-full h-full object-cover backface-hidden"
				/>
				<Image
					src="/images/profileBack.png"
					alt="Profile Picture Back"
					width={200}
					height={200}
					className="rounded-full absolute w-full h-full object-cover backface-hidden rotate-x-180"
				/>
			</div>
			{showMessage && (
				<div
					className={`font-bold absolute -right-16 -top-16 bg-foreground text-background p-2 rounded-lg shadow-md ${
						isMessageFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'
					}`}
				>
					{isFlipped ? profileMessages.flipped : profileMessages.default}
					<div className="absolute left-4 bottom-0 transform translate-y-1/2 rotate-45 bg-foreground w-4 h-4"></div>
				</div>
			)}
		</div>
	);
};

export default ProfileImage;
