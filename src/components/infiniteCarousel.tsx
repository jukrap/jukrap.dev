import React, { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/store/useThemeStore';
import { getIconPath } from '@/util/iconPaths';
import LoadingImage from './LoadingImage';
import debounce from 'lodash/debounce';

const MIN_INDICATOR_WIDTH = 12; // 인디케이터 최소 너비 (w-2 = 0.5rem = 8px) + 간격 (gap-2 = 0.5rem = 8px)
const CONTAINER_PADDING = 32; // 좌우 패딩값 (px-4 = 1rem = 16px * 2)

interface InfiniteCarouselProps {
	images: string[];
	currentIndex: number;
	onImageClick: (index: number) => void;
	onIndexChange: (index: number) => void;
	isViewerOpen: boolean;
}

interface LoadingState {
	[key: number]: boolean;
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
	const [loadingStates, setLoadingStates] = useState<LoadingState>({});
	const [useNumericIndicator, setUseNumericIndicator] = useState(false);
	const indicatorContainerRef = useRef<HTMLDivElement>(null);

	const handleImageLoad = (index: number) => {
		setLoadingStates((prev) => ({
			...prev,
			[index]: false,
		}));
	};

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

	useEffect(() => {
		const checkIndicatorSpace = () => {
			const container = indicatorContainerRef.current;
			if (!container) return;

			const containerWidth = container.clientWidth - CONTAINER_PADDING;
			const requiredWidth = images.length * MIN_INDICATOR_WIDTH;

			setUseNumericIndicator(containerWidth < requiredWidth);
		};

		// 초기 체크
		checkIndicatorSpace();

		// resize 이벤트에 대한 대응
		const handleResize = debounce(checkIndicatorSpace, 200);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [images.length]);

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
								<div className="relative">
									<LoadingImage
										src={image}
										alt={`Project Image ${index + 1}`}
										maxWidth={200}
										maxHeight={300}
										className="rounded-lg transition-transform duration-300 hover:scale-105"
										onLoad={() => handleImageLoad(index)}
									/>
								</div>
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
										<LoadingImage
											src={image}
											alt={`Project Image ${index + 1}`}
											maxWidth={300}
											maxHeight={400}
											className="rounded-lg"
											onLoad={() => handleImageLoad(index)}
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
			<div ref={indicatorContainerRef} className="mt-4 w-full px-4">
				<div className="flex justify-center items-center">
					{!useNumericIndicator ? (
						// 도트 인디케이터
						<div className="flex gap-2">
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
					) : (
						// 숫자 인디케이터
						<div className="text-sm text-muted-foreground font-medium">
							<span className="text-accent">{currentIndex + 1}</span>
							<span className="mx-1">/</span>
							<span>{images.length}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default InfiniteCarousel;
