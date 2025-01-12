import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import ImageWithAspectRatio from './imageWithAspectRatio';
import { useThemeStore } from '@/store/useThemeStore';
import { getIconPath } from '@/util/iconPaths';

interface InfiniteCarouselProps {
	images: string[];
	currentIndex: number;
	onImageClick: (index: number) => void;
	onIndexChange: (index: number) => void;
	isViewerOpen: boolean;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
	images,
	currentIndex,
	onImageClick,
	onIndexChange,
	isViewerOpen,
}) => {
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	const nextSlide = useCallback(() => {
		onIndexChange((currentIndex + 1) % images.length);
	}, [images.length, currentIndex, onIndexChange]);

	const prevSlide = useCallback(() => {
		onIndexChange((currentIndex - 1 + images.length) % images.length);
	}, [images.length, currentIndex, onIndexChange]);

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
		onIndexChange(index);
		stopAutoScroll();
		startAutoScroll();
	};

	return (
		<div className="relative w-full">
			{/* PC 뷰 - 3개의 이미지 표시 */}
			<div className="hidden md:block relative overflow-hidden">
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
								onClick={() => onImageClick(index % images.length)}
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
			</div>

			{/* 모바일 뷰 - 단일 이미지 표시 */}
			<div className="md:hidden relative bg-background rounded-lg">
				{/* 오버플로우 컨테이너 */}
				<div className="overflow-hidden">
					<div
						className="flex transition-transform duration-300 ease-in-out"
						style={{ transform: `translateX(-${currentIndex * 100}%)` }}
					>
						{images.map((image, index) => (
							<div
								key={index}
								className="flex-none w-full"
								style={{ minWidth: '100%' }}
							>
								{/* 이미지 컨테이너 - 고정된 높이와 정중앙 정렬 */}
								<div
									className="relative min-h-[400px] w-full flex items-center justify-center p-4 pt-8"
									onClick={() => onImageClick(index)}
								>
									<div className="relative w-full h-full flex items-center justify-center">
										<ImageWithAspectRatio
											src={image}
											alt={`Project Image ${index + 1}`}
											maxWidth={300}
											maxHeight={400}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 네비게이션 버튼 */}
			<button
				className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-accent-opacity hover:bg-accent bg-opacity-75 rounded-full p-2 z-10 transition-colors duration-300"
				onClick={(e) => {
					e.stopPropagation();
					prevSlide();
				}}
				aria-label="이전 이미지"
			>
				<Image
					src={getIconPath('back', isDarkMode)}
					alt="Previous"
					width={16}
					height={16}
					className="select-none"
				/>
			</button>
			<button
				className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-accent-opacity hover:bg-accent bg-opacity-75 rounded-full p-2 z-10 transition-colors duration-300"
				onClick={(e) => {
					e.stopPropagation();
					nextSlide();
				}}
				aria-label="다음 이미지"
			>
				<Image
					src={getIconPath('forward', isDarkMode)}
					alt="Next"
					width={16}
					height={16}
					className="select-none"
				/>
			</button>

			{/* 인디케이터 */}
			<div className="mt-4 flex justify-center gap-2">
				{images.map((_, index) => (
					<button
						key={index}
						className={`w-2 h-2 rounded-full transition-colors duration-300 ${
							index === currentIndex % images.length
								? 'bg-accent'
								: 'bg-gray-300 hover:bg-gray-400'
						}`}
						onClick={(e) => {
							e.stopPropagation();
							handleIndicatorClick(index);
						}}
						aria-label={`${index + 1}번째 이미지로 이동`}
					/>
				))}
			</div>
		</div>
	);
};

export default InfiniteCarousel;
