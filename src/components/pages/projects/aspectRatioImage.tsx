import type { AspectRatioImageProps } from '@/types/component';
import imageMetadata from '@/data/imageMetadata.json';
import LoadImage from '@/components/common/loadImage';
export default function AspectRatioImage({
	src,
	alt,
	className = '',
	priority = false,
	containerClassName = '',
	onLoad,
	metadata: providedMetadata,
}: AspectRatioImageProps) {
	const metadata =
		providedMetadata ??
		(
			imageMetadata as Record<
				string,
				{ width: number; height: number; isPortrait: boolean }
			>
		)[src];
	return (
		<div
			className={`relative flex h-full w-full items-center justify-center ${metadata?.isPortrait ? 'max-w-[16rem] max-h-[20rem]' : 'max-w-[24rem] max-h-[16rem]'} ${containerClassName}`}
		>
			<LoadImage
				src={src}
				alt={alt}
				fill
				priority={priority}
				onLoad={onLoad}
				loadingAppearance="skeleton"
				sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1023px) 40vw, 340px"
				className={`rounded-lg object-contain ${className}`}
			/>
		</div>
	);
}
