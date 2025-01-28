import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ProfileInteractionProps } from '@/types/profile';
import { profileMessages } from '@/data/messages/profileMessages';
import ProfileImageSkeleton from '@/components/skeletons/profileImageSkeleton';

const ProfileImage: React.FC<ProfileInteractionProps> = ({
	isFlipped,
	onClick,
	onMouseEnter,
	onMouseLeave,
	showMessage,
	isMessageFadingOut,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const loadImages = async () => {
			try {
				await Promise.all([
					fetch('/_next/image?url=%2Fimages%2FprofileFront.png&w=200&q=75'),
					fetch('/_next/image?url=%2Fimages%2FprofileBack.png&w=200&q=75'),
				]);
				setTimeout(() => {
					setIsLoaded(true);
				}, 1200);
			} catch (error) {
				//console.error('Error loading images:', error);
				setIsLoaded(true);
			}
		};

		loadImages();
	}, []);

	const handleClick = (e: React.MouseEvent) => {
		if (!isLoaded) return; // 로딩 중에는 클릭 무시
		onClick();
	};

	const handleMouseEnter = (e: React.MouseEvent) => {
		if (!isLoaded) return; // 로딩 중에는 호버 효과 무시
		onMouseEnter();
	};

	return (
		<div
			className="relative w-40 h-40 cursor-pointer perspective-1000"
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<AnimatePresence mode="wait">
				{!isLoaded ? (
					<motion.div
						key="skeleton"
						initial={{ opacity: 1 }}
						exit={{
							opacity: 0,
							transition: { duration: 0.5, ease: 'easeInOut' },
						}}
					>
						<ProfileImageSkeleton />
					</motion.div>
				) : (
					<motion.div
						key="image"
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { duration: 0.5, ease: 'easeInOut', delay: 0.2 },
						}}
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
							priority
							quality={75}
							unoptimized={false}
						/>
						<Image
							src="/images/profileBack.png"
							alt="Profile Picture Back"
							width={200}
							height={200}
							className="rounded-full absolute w-full h-full object-cover backface-hidden rotate-x-180"
							priority
							quality={75}
							unoptimized={false}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{showMessage && isLoaded && (
				<div
					className={`font-bold absolute -right-16 -top-16 bg-foreground text-background p-2 rounded-lg shadow-md ${
						isMessageFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'
					}`}
				>
					{isFlipped ? profileMessages.flipped : profileMessages.default}
					<div className="absolute left-4 bottom-0 transform translate-y-1/2 rotate-45 bg-foreground w-4 h-4" />
				</div>
			)}
		</div>
	);
};

export default ProfileImage;
