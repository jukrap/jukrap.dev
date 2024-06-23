import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import ImageWithAspectRatio from './ImageWithAspectRatio';
import { useThemeStore } from '@/store/useThemeStore';
import { getIconPath } from '@/util/iconPaths';
import ImageViewer from './ImageViewer';

interface InfiniteCarouselProps {
	images: string[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	}, [images.length]);

	const prevSlide = useCallback(() => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length,
		);
	}, [images.length]);

	const startAutoScroll = useCallback(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(nextSlide, 3000);
	}, [nextSlide]);

	const stopAutoScroll = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	useEffect(() => {
		if (!isViewerOpen) {
			startAutoScroll();
		} else {
			stopAutoScroll();
		}
		return () => stopAutoScroll();
	}, [startAutoScroll, stopAutoScroll, isViewerOpen]);

	const handleIndicatorClick = (index: number) => {
		setCurrentIndex(index);
		stopAutoScroll();
		startAutoScroll();
	};

	const handleImageClick = (index: number) => {
		setCurrentIndex(index);
		setIsViewerOpen(true);
	};

	const handleViewerClose = () => {
		setIsViewerOpen(false);
	};

	const handleViewerIndexChange = (newIndex: number) => {
		setCurrentIndex(newIndex);
	};

	return (
		<div className="relative w-full">
			<div className="relative overflow-hidden">
				<div
					className="flex transition-transform duration-300 ease-in-out"
					style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
				>
					{[...images, ...images.slice(0, 2)].map((image, index) => (
						<div
							key={index}
							className="flex-none w-1/3 px-1"
							style={{ minWidth: 'calc(100% / 3)' }}
						>
							<div
								className="w-full h-full flex items-center justify-center cursor-pointer"
								onClick={() => handleImageClick(index % images.length)}
							>
								<ImageWithAspectRatio
									src={image}
									alt={`Project Image ${index + 1}`}
									maxWidth={200}
									maxHeight={300}
								/>
							</div>
						</div>
					))}
				</div>
				<button
					className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-accent-opacity bg-opacity-75 rounded-full p-2 z-10"
					onClick={prevSlide}
				>
					<Image
						src={getIconPath('back', isDarkMode)}
						alt="Previous"
						width={16}
						height={16}
					/>
				</button>
				<button
					className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-accent-opacity bg-opacity-75 rounded-full p-2 z-10"
					onClick={nextSlide}
				>
					<Image
						src={getIconPath('forward', isDarkMode)}
						alt="Next"
						width={16}
						height={16}
					/>
				</button>
			</div>
			<div className="mt-8 flex justify-center gap-4">
				{images.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full ${
							index === currentIndex % images.length ? 'bg-accent' : 'bg-gray-300'
						}`}
						onClick={() => handleIndicatorClick(index)}
					/>
				))}
			</div>
			{isViewerOpen && (
				<ImageViewer
					images={images}
					currentIndex={currentIndex}
					onClose={handleViewerClose}
					onIndexChange={handleViewerIndexChange}
				/>
			)}
		</div>
	);
};

export default InfiniteCarousel;
