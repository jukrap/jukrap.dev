import React, { useState, useEffect, CSSProperties } from 'react';
import Image from 'next/image';
import { LoadingImageProps } from '@/types/component';
import ImageSpinner from './ImageSpinner';

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

	const containerStyle: CSSProperties = fill
		? {
				position: 'relative',
				width: '100%',
				height: '100%',
			}
		: {};

	return (
		<div style={containerStyle}>
			{isLoading && showSpinner && (
				<div className="absolute inset-0 flex items-center justify-center bg-secondary/20 backdrop-blur-sm rounded-lg">
					<ImageSpinner />
				</div>
			)}
			<Image
				src={src}
				alt={alt}
				{...(fill
					? {
							fill: true,
							sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
						}
					: {
							width,
							height,
						})}
				className={`
          ${className}
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-300
        `}
				style={{
					objectFit,
					...(fill
						? {}
						: {
								maxWidth: '100%',
								maxHeight: '100%',
								width: 'auto',
								height: 'auto',
							}),
				}}
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
