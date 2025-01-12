import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageSpinner from './ImageSpinner';

interface LoadingImageProps {
	src: string;
	alt: string;
	maxWidth: number;
	maxHeight: number;
	className?: string;
	priority?: boolean;
	objectFit?: 'contain' | 'cover';
	onLoad?: () => void;
	fill?: boolean;
}

const LoadingImage: React.FC<LoadingImageProps> = ({
	src,
	alt,
	maxWidth,
	maxHeight,
	className = '',
	priority = false,
	objectFit = 'contain',
	onLoad,
	fill = false,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [showSpinner, setShowSpinner] = useState(false);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const img = document.createElement('img');
		img.src = src;
		img.onload = () => {
			let newWidth = img.width;
			let newHeight = img.height;
			const aspectRatio = img.width / img.height;

			if (newWidth > maxWidth) {
				newWidth = maxWidth;
				newHeight = newWidth / aspectRatio;
			}

			if (newHeight > maxHeight) {
				newHeight = maxHeight;
				newWidth = newHeight * aspectRatio;
			}

			if (newWidth < maxWidth && newHeight < maxHeight) {
				const scaleX = maxWidth / newWidth;
				const scaleY = maxHeight / newHeight;
				const scale = Math.min(scaleX, scaleY);
				newWidth *= scale;
				newHeight *= scale;
			}

			setDimensions({ width: newWidth, height: newHeight });
		};
	}, [src, maxWidth, maxHeight]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoading) {
				setShowSpinner(true);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [isLoading]);

	if (dimensions.width === 0 || dimensions.height === 0) {
		return null;
	}

	return (
		<div className="relative w-full h-full">
			{isLoading && showSpinner && (
				<div className="absolute inset-0 flex items-center justify-center bg-secondary/20 backdrop-blur-sm rounded-lg">
					<ImageSpinner />
				</div>
			)}
			<Image
				src={src}
				alt={alt}
				width={dimensions.width}
				height={dimensions.height}
				className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
				style={{ objectFit }}
				onLoad={(e) => {
					setIsLoading(false);
					setShowSpinner(false);
					onLoad?.();
				}}
				priority={priority}
			/>
		</div>
	);
};

export default LoadingImage;
