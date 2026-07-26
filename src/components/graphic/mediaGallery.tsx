'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/types/locale';
import type { MediaAsset } from '@/types/portfolioExperiment';

export function MediaGallery({
	media,
	locale,
}: {
	media: MediaAsset[];
	locale: Locale;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const returnFocus = useRef<HTMLElement | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		const onClose = () => returnFocus.current?.focus();
		dialog.addEventListener('close', onClose);
		return () => dialog.removeEventListener('close', onClose);
	}, []);

	if (!media.length) return null;

	const open = (index: number, trigger: HTMLElement) => {
		setActiveIndex(index);
		returnFocus.current = trigger;
		dialogRef.current?.showModal();
	};
	const previous = () =>
		setActiveIndex((current) => (current - 1 + media.length) % media.length);
	const next = () => setActiveIndex((current) => (current + 1) % media.length);

	return (
		<>
			<div className="graphic-gallery">
				{media.map((asset, index) => (
					<button
						key={asset.source}
						type="button"
						onClick={(event) => open(index, event.currentTarget)}
					>
						<img
							src={asset.source}
							alt={asset.alt[locale]}
							width={asset.width}
							height={asset.height}
						/>
					</button>
				))}
			</div>
			<dialog
				ref={dialogRef}
				className="graphic-gallery-dialog"
				aria-label={locale === 'ko' ? '프로젝트 이미지' : 'Project image'}
				onClick={(event) => {
					if (event.target === event.currentTarget) event.currentTarget.close();
				}}
			>
				<div>
					<button
						type="button"
						className="graphic-dialog-close"
						onClick={() => dialogRef.current?.close()}
						aria-label={locale === 'ko' ? '이미지 닫기' : 'Close image'}
					>
						<X aria-hidden />
					</button>
					<img
						src={media[activeIndex].source}
						alt={media[activeIndex].alt[locale]}
						width={media[activeIndex].width}
						height={media[activeIndex].height}
					/>
					{media.length > 1 ? (
						<div className="graphic-gallery-controls">
							<button
								type="button"
								onClick={previous}
								aria-label={locale === 'ko' ? '이전 이미지' : 'Previous image'}
							>
								<ChevronLeft aria-hidden />
							</button>
							<span>
								{activeIndex + 1} / {media.length}
							</span>
							<button
								type="button"
								onClick={next}
								aria-label={locale === 'ko' ? '다음 이미지' : 'Next image'}
							>
								<ChevronRight aria-hidden />
							</button>
						</div>
					) : null}
				</div>
			</dialog>
		</>
	);
}
