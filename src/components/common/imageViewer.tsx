import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ImageViewerProps } from '@/types/component';
import { useLocale } from '@/contexts/localeContext';
import LoadImage from './loadImage';
import MediaModal from './mediaModal';
import ImagePagination from './imagePagination';

export default function ImageViewer({
	images,
	currentIndex,
	onClose,
	onIndexChange,
}: ImageViewerProps) {
	const { locale } = useLocale();
	const [open, setOpen] = useState(true);
	const image = images[currentIndex];
	const close = () => setOpen(false);
	useEffect(() => {
		if (!open) return;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
			if (event.altKey || event.ctrlKey || event.metaKey || images.length < 2)
				return;
			event.preventDefault();
			event.stopPropagation();
			onIndexChange(
				(currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + images.length) %
					images.length,
			);
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [currentIndex, images.length, onIndexChange, open]);
	if (!image) return null;
	const controlClass =
		'flex h-11 w-11 items-center justify-center rounded-full border border-border/35 bg-background/95 transition-colors hover:border-accent/55 hover:bg-secondary';
	return (
		<MediaModal
			isOpen={open}
			label={locale === 'ko' ? '프로젝트 이미지 확대' : 'Project image viewer'}
			variant="viewer"
			onClose={close}
			onAfterClose={onClose}
		>
			<div className="absolute inset-0" onClick={close} aria-hidden="true" />
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
				<figure className="pointer-events-auto relative h-[70vh] w-full px-4 md:w-[60vw] md:px-0">
					<LoadImage
						src={image.src}
						alt={image.alt}
						fill
						priority
						sizes="(max-width: 767px) calc(100vw - 32px), 60vw"
					/>
					{image.caption && (
						<figcaption className="mt-3 text-center text-sm text-white">
							{image.caption}
						</figcaption>
					)}
					{images.length > 1 && (
						<>
							<button
								type="button"
								className={`absolute left-2 top-1/2 -translate-y-1/2 md:left-[-70px] ${controlClass}`}
								onClick={() =>
									onIndexChange((currentIndex - 1 + images.length) % images.length)
								}
								aria-label={locale === 'ko' ? '이전 이미지' : 'Previous image'}
							>
								<ChevronLeft size={18} aria-hidden="true" />
							</button>
							<button
								type="button"
								className={`absolute right-2 top-1/2 -translate-y-1/2 md:right-[-70px] ${controlClass}`}
								onClick={() => onIndexChange((currentIndex + 1) % images.length)}
								aria-label={locale === 'ko' ? '다음 이미지' : 'Next image'}
							>
								<ChevronRight size={18} aria-hidden="true" />
							</button>
						</>
					)}
				</figure>
			</div>
			<button
				type="button"
				className={`absolute right-6 top-6 ${controlClass}`}
				onClick={close}
				aria-label={locale === 'ko' ? '이미지 확대 닫기' : 'Close image viewer'}
			>
				<X size={18} aria-hidden="true" />
			</button>
			<ImagePagination
				images={images}
				currentIndex={currentIndex}
				onIndexChange={onIndexChange}
				variant="viewer"
			/>
		</MediaModal>
	);
}
