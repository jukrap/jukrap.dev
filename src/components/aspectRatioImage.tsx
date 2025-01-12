import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AspectRatioImageProps {
	src: string;
	alt: string;
	className?: string;
	onLoad?: () => void;
}

const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
	src,
	alt,
	className = '',
	onLoad,
}) => {
	const [isPortrait, setIsPortrait] = useState(false);

	useEffect(() => {
		const img = new window.Image();
		img.src = src;
		img.onload = () => {
			setIsPortrait(img.height > img.width);
			onLoad?.();
		};
	}, [src, onLoad]);

	return (
		<div
			className={`
        relative w-full h-full flex items-center justify-center
        ${isPortrait ? 'max-w-[16rem] max-h-[20rem]' : 'max-w-[24rem] max-h-[16rem]'}
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
        `}
				onLoadingComplete={onLoad}
				priority
			/>
		</div>
	);
};

export default AspectRatioImage;
