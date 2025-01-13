import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AspectRatioImageProps } from '@/types/component';

const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
	src,
	alt,
	className = '',
}) => {
	const [isPortrait, setIsPortrait] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const img = new window.Image();
			img.src = src;

			img.onload = () => {
				setIsPortrait(img.height > img.width);
				setIsLoading(false);
			};
		}
	}, [src]);

	const containerClasses = isPortrait
		? 'max-w-[16rem] max-h-[20rem]'
		: 'max-w-[24rem] max-h-[16rem]';

	return (
		<div
			className={`
        relative w-full h-full flex items-center justify-center
        ${containerClasses}
        ${className}
      `}
		>
			<Image
				src={src}
				alt={alt}
				width={300}
				height={225}
				className={`
          rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105
          ${isPortrait ? 'object-contain w-auto h-full' : 'object-contain w-full h-auto'}
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
				onLoadingComplete={() => setIsLoading(false)}
				priority
			/>
			{isLoading && (
				<div className="absolute inset-0 bg-secondary/30 rounded-lg animate-pulse" />
			)}
		</div>
	);
};

export default AspectRatioImage;
