'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/types/locale';
import type { MediaAsset } from '@/types/manuscript';

export function ImageGallery({
	media,
	locale,
}: {
	media: MediaAsset[];
	locale: Locale;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const [index, setIndex] = useState(0);
	const returnIndex = useRef(0);

	const open = (nextIndex: number) => {
		returnIndex.current = nextIndex;
		setIndex(nextIndex);
		dialogRef.current?.showModal();
	};

	const close = () => {
		dialogRef.current?.close();
	};

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		const handleClose = () => {
			triggerRefs.current[returnIndex.current]?.focus();
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Tab') {
				const focusable = [
					...dialog.querySelectorAll<HTMLButtonElement>('button:not([disabled])'),
				];
				const first = focusable[0];
				const last = focusable.at(-1);
				const active = document.activeElement;
				if (event.shiftKey && (active === first || !dialog.contains(active))) {
					event.preventDefault();
					last?.focus();
				} else if (
					!event.shiftKey &&
					(active === last || !dialog.contains(active))
				) {
					event.preventDefault();
					first?.focus();
				}
				return;
			}
			if (event.key === 'ArrowRight') {
				setIndex((current) => (current + 1) % media.length);
			}
			if (event.key === 'ArrowLeft') {
				setIndex((current) => (current - 1 + media.length) % media.length);
			}
		};

		dialog.addEventListener('close', handleClose);
		dialog.addEventListener('keydown', handleKeyDown);
		return () => {
			dialog.removeEventListener('close', handleClose);
			dialog.removeEventListener('keydown', handleKeyDown);
		};
	}, [media.length]);

	if (media.length === 0) return null;
	const current = media[index];

	return (
		<>
			<div className="manuscript-media-grid">
				{media.map((item, mediaIndex) => (
					<figure key={item.source}>
						<button
							ref={(node) => {
								triggerRefs.current[mediaIndex] = node;
							}}
							type="button"
							className="manuscript-media-button"
							onClick={() => open(mediaIndex)}
							aria-label={
								locale === 'ko'
									? `${item.alt.ko} 크게 보기`
									: `Open ${item.alt.en} in gallery`
							}
						>
							<span
								className="manuscript-media-frame block"
								style={{ aspectRatio: `${item.width} / ${item.height}` }}
							>
								<Image
									src={item.source}
									alt={item.alt[locale]}
									fill
									sizes="(max-width: 768px) 100vw, 48vw"
									style={{
										objectPosition: item.focalPoint
											? `${item.focalPoint.x * 100}% ${item.focalPoint.y * 100}%`
											: '50% 50%',
									}}
								/>
							</span>
						</button>
						<figcaption className="manuscript-media-caption">
							{String(mediaIndex + 1).padStart(2, '0')} / {item.alt[locale]}
						</figcaption>
					</figure>
				))}
			</div>

			<dialog
				ref={dialogRef}
				className="manuscript-dialog"
				aria-label={
					locale === 'ko' ? '프로젝트 이미지 갤러리' : 'Project image gallery'
				}
				onClick={(event) => {
					if (event.target === dialogRef.current) close();
				}}
			>
				<div className="manuscript-dialog-toolbar">
					<p className="font-metadata text-[0.7rem] manuscript-muted">
						{String(index + 1).padStart(2, '0')} /{' '}
						{String(media.length).padStart(2, '0')}
					</p>
					<div className="flex">
						{media.length > 1 && (
							<>
								<button
									type="button"
									className="manuscript-dialog-control"
									onClick={() =>
										setIndex(
											(currentIndex) => (currentIndex - 1 + media.length) % media.length,
										)
									}
									aria-label={locale === 'ko' ? '이전 이미지' : 'Previous image'}
								>
									←
								</button>
								<button
									type="button"
									className="manuscript-dialog-control"
									onClick={() =>
										setIndex((currentIndex) => (currentIndex + 1) % media.length)
									}
									aria-label={locale === 'ko' ? '다음 이미지' : 'Next image'}
								>
									→
								</button>
							</>
						)}
						<button
							type="button"
							className="manuscript-dialog-control"
							onClick={close}
							aria-label={locale === 'ko' ? '갤러리 닫기' : 'Close gallery'}
						>
							{locale === 'ko' ? '닫기' : 'Close'}
						</button>
					</div>
				</div>
				<div className="manuscript-dialog-media">
					<Image
						key={current.source}
						src={current.source}
						alt={current.alt[locale]}
						fill
						sizes="92vw"
						priority
					/>
				</div>
			</dialog>
		</>
	);
}
