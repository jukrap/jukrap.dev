import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/useThemeStore';
import { ImageViewerProps } from '@/types/component';
import { getIconPath } from '@/util/iconPaths';
import LoadImage from './loadImage';
import ImageSpinner from './ImageSpinner';

const ImageViewer: React.FC<ImageViewerProps> = ({
	images,
	currentIndex,
	onClose,
	onIndexChange,
}) => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const [isVisible, setIsVisible] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [currentImageUrl, setCurrentImageUrl] = useState(images[currentIndex]);

	useEffect(() => {
		setIsVisible(true);
		return () => setIsVisible(false);
	}, []);

	useEffect(() => {
		setIsImageLoading(true);
		setCurrentImageUrl(images[currentIndex]);
	}, [currentIndex, images]);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(onClose, 300);
	};

	const handleImageLoad = () => {
		setIsImageLoading(false);
	};

	const nextImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		onIndexChange((currentIndex + 1) % images.length);
	};

	const prevImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		onIndexChange((currentIndex - 1 + images.length) % images.length);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowRight')
				onIndexChange((currentIndex + 1) % images.length);
			if (event.key === 'ArrowLeft')
				onIndexChange((currentIndex - 1 + images.length) % images.length);
			if (event.key === 'Escape') handleClose();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [currentIndex, images.length, onIndexChange]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 
        transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
			onClick={handleClose}
		>
			<div
				className={`relative w-full md:w-[60vw] h-[70vh] flex items-center justify-center 
          transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
			>
				<div className="relative w-full h-full px-4 md:px-0">
					<div className="relative w-full h-full">
						{isImageLoading && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
							>
								<ImageSpinner />
							</motion.div>
						)}
						<LoadImage
							key={currentImageUrl} // 키를 추가하여 이미지 변경 시 컴포넌트 재생성
							src={currentImageUrl}
							alt="Project Image"
							fill
							objectFit="contain"
							priority
							onLoad={handleImageLoad}
							className="transition-transform duration-300"
						/>
					</div>
				</div>

				{/* 네비게이션 버튼 - 모바일에서는 양쪽 여백 축소 */}
				<button
					className="absolute top-1/2 left-2 md:left-[-70px] transform -translate-y-1/2 bg-accent-opacity hover:bg-accent bg-opacity-75 rounded-full p-2 transition-colors duration-300"
					onClick={prevImage}
				>
					<Image
						src={getIconPath('back', isDarkMode)}
						alt="Previous"
						width={24}
						height={24}
						className="md:w-8 md:h-8"
					/>
				</button>
				<button
					className="absolute top-1/2 right-2 md:right-[-70px] transform -translate-y-1/2 bg-accent-opacity hover:bg-accent bg-opacity-75 rounded-full p-2 transition-colors duration-300"
					onClick={nextImage}
				>
					<Image
						src={getIconPath('forward', isDarkMode)}
						alt="Next"
						width={24}
						height={24}
						className="md:w-8 md:h-8"
					/>
				</button>
			</div>

			{/* 닫기 버튼 */}
			<div
				className="absolute top-6 right-6 bg-accent-opacity hover:bg-accent bg-opacity-75 rounded-full p-2 transition-colors duration-300 no-select"
				onClick={(e) => {
					e.stopPropagation();
					handleClose();
				}}
			>
				<Image
					src={getIconPath('close', isDarkMode)}
					alt="Close"
					width={24}
					height={24}
					className="md:w-8 md:h-8"
				/>
			</div>

			{/* 인디케이터 */}
			<div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:gap-4">
				{images.map((_, index) => (
					<button
						key={index}
						className={`w-2 h-2 md:w-4 md:h-4 aspect-square rounded-full transition-colors duration-300 ${
							index === currentIndex ? 'bg-accent' : 'bg-gray-300 hover:bg-gray-400'
						}`}
						onClick={(e) => {
							e.stopPropagation();
							onIndexChange(index);
						}}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default ImageViewer;
