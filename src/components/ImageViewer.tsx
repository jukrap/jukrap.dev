import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/store/useThemeStore';
import { getIconPath } from '@/util/iconPaths';

interface ImageViewerProps {
	images: string[];
	currentIndex: number;
	onClose: () => void;
	onIndexChange: (newIndex: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
	images,
	currentIndex,
	onClose,
	onIndexChange,
}) => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		return () => setIsVisible(false);
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(onClose, 300);
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
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [currentIndex, images.length, onClose, onIndexChange]);

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-all duration-300 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
			onClick={handleClose}
		>
			<div
				className={`relative w-[60vw] h-[70vh] flex items-center justify-center transition-transform duration-300 ${
					isVisible ? 'scale-100' : 'scale-95'
				}`}
			>
				<div className="relative w-full h-full">
					<Image
						src={images[currentIndex]}
						alt="Project Image"
						layout="fill"
						objectFit="contain"
					/>
				</div>
				<button
					className="absolute top-1/2 left-[-70px] transform -translate-y-1/2 bg-accent-opacity bg-opacity-75 rounded-full p-2"
					onClick={prevImage}
				>
					<Image
						src={getIconPath('back', isDarkMode)}
						alt="Previous"
						width={32}
						height={32}
					/>
				</button>
				<button
					className="absolute top-1/2 right-[-70px] transform -translate-y-1/2 bg-accent-opacity bg-opacity-75 rounded-full p-2"
					onClick={nextImage}
				>
					<Image
						src={getIconPath('forward', isDarkMode)}
						alt="Next"
						width={32}
						height={32}
					/>
				</button>
			</div>
			<button
				className="absolute top-6 right-6 bg-accent-opacity bg-opacity-75 rounded-full p-2"
				onClick={(e) => {
					e.stopPropagation();
					onClose();
				}}
			>
				<Image
					src={getIconPath('close', isDarkMode)}
					alt="Close"
					width={32}
					height={32}
				/>
			</button>
			<div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
				{images.map((_, index) => (
					<button
						key={index}
						className={`w-4 h-4 rounded-full ${
							index === currentIndex ? 'bg-accent' : 'bg-gray-300'
						}`}
						onClick={(e) => {
							e.stopPropagation();
							onIndexChange(index);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageViewer;
