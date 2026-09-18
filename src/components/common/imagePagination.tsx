import type { ProjectImage } from '@/types/project';
import { useLocale } from '@/contexts/localeContext';

interface ImagePaginationProps {
	images: ProjectImage[];
	currentIndex: number;
	onIndexChange: (index: number) => void;
	variant?: 'gallery' | 'viewer';
	autoPlaying?: boolean;
}

export default function ImagePagination({
	images,
	currentIndex,
	onIndexChange,
	variant = 'gallery',
	autoPlaying = false,
}: ImagePaginationProps) {
	const { locale } = useLocale();
	if (images.length === 0) return null;
	return (
		<div
			className={`media-pagination media-${variant}-pagination`}
			data-many-images={images.length > 8}
		>
			<p className="media-pagination-count" aria-hidden="true">
				{currentIndex + 1} / {images.length}
			</p>
			<div className="media-pagination-dots">
				{images.map((image, index) => (
					<button
						type="button"
						key={image.src}
						className="flex h-8 w-8 items-center justify-center rounded-md"
						aria-label={
							locale === 'ko'
								? `${index + 1}번째 이미지: ${image.alt}`
								: `Image ${index + 1}: ${image.alt}`
						}
						aria-current={index === currentIndex ? 'true' : undefined}
						onClick={() => onIndexChange(index)}
					>
						<span
							className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-accent' : 'bg-gray-300'}`}
						/>
					</button>
				))}
			</div>
			<p
				className="sr-only"
				aria-live={autoPlaying ? 'off' : 'polite'}
				aria-atomic="true"
			>
				{currentIndex + 1} / {images.length}: {images[currentIndex]?.alt}
			</p>
		</div>
	);
}
