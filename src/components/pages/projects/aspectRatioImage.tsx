import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AspectRatioImageProps } from '@/types/component';
import imageMetadata from '@/data/imageMetadata.json';

const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
	src,
	alt,
	className = '',
	priority = false,
	containerClassName = '',
	onLoad,
}) => {
	// 이미지 메타데이터로부터 초기 dimensions 설정
	const metadata = (
		imageMetadata as Record<
			string,
			{ width: number; height: number; isPortrait: boolean }
		>
	)[src];
	const [isLoading, setIsLoading] = useState(true);
	const [dimensions, setDimensions] = useState<{ isPortrait: boolean }>({
		isPortrait: metadata?.isPortrait ?? false,
	});
	const imageRef = useRef<HTMLImageElement>(null);

	// 실제 이미지 로드 완료 후 정확한 dimensions 설정
	const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const img = e.target as HTMLImageElement;
		setDimensions({
			isPortrait: img.naturalHeight > img.naturalWidth,
		});
		setIsLoading(false);
		onLoad?.();
	};

	// 컨테이너 크기 계산을 위한 className
	const containerClasses = `
    relative w-full h-full flex items-center justify-center
    ${metadata?.isPortrait ? 'max-w-[16rem] max-h-[20rem]' : 'max-w-[24rem] max-h-[16rem]'}
    ${containerClassName}
  `;

	// 이미지 크기 계산
	const imageSize = metadata
		? {
				width: metadata.width,
				height: metadata.height,
			}
		: {
				width: 300,
				height: 225,
			};

	return (
		<div className={containerClasses}>
			{isLoading && (
				<div className="absolute inset-0 bg-secondary/30 animate-pulse rounded-lg" />
			)}
			<Image
				ref={imageRef}
				src={src}
				alt={alt}
				{...imageSize}
				quality={75}
				priority={priority}
				loading={priority ? 'eager' : 'lazy'}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={`
          rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105
          ${dimensions.isPortrait ? 'object-contain w-auto h-full' : 'object-contain w-full h-auto'}
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${className}
        `}
				onLoad={handleImageLoad}
			/>
		</div>
	);
};

export default AspectRatioImage;
