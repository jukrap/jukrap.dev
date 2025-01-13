import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImageWithAspectRatioProps } from '@/types/component';

const ImageWithAspectRatio: React.FC<ImageWithAspectRatioProps> = ({
	src,
	alt,
	maxWidth,
	maxHeight,
}) => {
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

	if (dimensions.width === 0 || dimensions.height === 0) {
		return null;
	}

	return (
		<div style={{ width: dimensions.width, height: dimensions.height }}>
			<Image
				src={src}
				alt={alt}
				width={dimensions.width}
				height={dimensions.height}
				objectFit="contain"
				className="rounded-lg"
			/>
		</div>
	);
};

export default ImageWithAspectRatio;
