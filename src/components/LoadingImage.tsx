import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageSpinner from './ImageSpinner';

interface LoadingImageProps {
	src: string;
	alt: string;
	maxWidth?: number;
	maxHeight?: number;
	className?: string;
	priority?: boolean;
	objectFit?: 'contain' | 'cover';
	onLoad?: () => void;
	fill?: boolean;
}

const LoadingImage: React.FC<LoadingImageProps> = ({
	src,
	alt,
	maxWidth: width,
	maxHeight: height,
	className = '',
	priority = false,
	objectFit = 'contain',
	onLoad,
	fill = false,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [showSpinner, setShowSpinner] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoading) {
				setShowSpinner(true);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [isLoading]);

	const imageProps = fill
		? {
				fill: true,
				sizes: '100vw',
			}
		: {
				width,
				height,
				style: {
					width: 'auto',
					height: 'auto',
					maxWidth: '100%',
					maxHeight: '100%',
				},
			};

	return (
		<div className="">
			{isLoading && showSpinner && (
				<div className="absolute inset-0 flex items-center justify-center bg-secondary/20 backdrop-blur-sm rounded-lg">
					<ImageSpinner />
				</div>
			)}
			<Image
				src={src}
				alt={alt}
				{...imageProps}
				className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
				style={{ objectFit, ...imageProps.style }}
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
