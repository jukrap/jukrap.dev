import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { LoadImageProps } from '@/types/component';
import { useLocale } from '@/contexts/localeContext';
import ImageSpinner from './ImageSpinner';

// Source changes remount request state, so stale load events cannot clear a new request.
export default function LoadImage(props: LoadImageProps) {
	return <ImageRequest key={props.src} {...props} />;
}
function ImageRequest({
	src,
	alt,
	maxWidth = 300,
	maxHeight = 225,
	className = '',
	priority = false,
	objectFit = 'contain',
	onLoad,
	fill = false,
	sizes,
	containerClassName = '',
	imageStyle,
	loadingAppearance = 'spinner',
}: LoadImageProps) {
	const { locale } = useLocale();
	const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
		'loading',
	);
	const [showSpinner, setShowSpinner] = useState(false);
	const [attempt, setAttempt] = useState(0);
	useEffect(() => {
		if (status !== 'loading') return;
		const timer = setTimeout(() => setShowSpinner(true), 300);
		return () => clearTimeout(timer);
	}, [status, attempt]);
	return (
		<div
			className={`relative ${fill ? 'h-full w-full' : ''} ${containerClassName}`}
			aria-busy={status === 'loading'}
		>
			{status === 'loading' &&
				(loadingAppearance === 'skeleton' || showSpinner) && (
					<div
						className={`pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-secondary/30 ${loadingAppearance === 'skeleton' ? 'animate-pulse motion-reduce:animate-none' : ''}`}
						role="status"
					>
						{loadingAppearance === 'spinner' && <ImageSpinner />}
						<span className="sr-only">
							{locale === 'ko' ? '이미지 불러오는 중' : 'Loading image'}
						</span>
					</div>
				)}
			{status === 'error' && (
				<div
					className="absolute inset-0 z-10 flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg bg-secondary/70 p-3 text-center text-sm text-foreground"
					role="status"
				>
					<p>
						{locale === 'ko'
							? '이미지를 불러오지 못했습니다.'
							: 'Could not load this image.'}
					</p>
					<button
						type="button"
						className="min-h-11 px-3 underline underline-offset-4"
						onClick={(event) => {
							event.stopPropagation();
							setShowSpinner(false);
							setStatus('loading');
							setAttempt((value) => value + 1);
						}}
					>
						{locale === 'ko' ? '다시 시도' : 'Retry'}
					</button>
				</div>
			)}
			<Image
				key={attempt}
				src={src}
				alt={alt}
				{...(fill ? { fill: true } : { width: maxWidth, height: maxHeight })}
				sizes={sizes ?? (fill ? '100vw' : undefined)}
				className={`${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 motion-reduce:transition-none`}
				style={{
					objectFit,
					...(fill
						? {}
						: { maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }),
					...imageStyle,
				}}
				onLoad={() => {
					setStatus('loaded');
					setShowSpinner(false);
					onLoad?.();
				}}
				onError={() => {
					setStatus('error');
					setShowSpinner(false);
				}}
				priority={priority}
			/>
		</div>
	);
}
