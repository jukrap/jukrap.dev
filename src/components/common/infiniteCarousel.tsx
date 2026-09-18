import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { InfiniteCarouselProps } from '@/types/component';
import { useLocale } from '@/contexts/localeContext';
import LoadImage from './loadImage';
import ImagePagination from './imagePagination';
import './media.css';

export default function InfiniteCarousel({
	title,
	images,
	currentIndex,
	onImageClick,
	onIndexChange,
	isViewerOpen,
}: InfiniteCarouselProps) {
	const { locale } = useLocale();
	const rootRef = useRef<HTMLDivElement>(null);
	const count = images.length;
	const [desktop, setDesktop] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(true);
	const [inView, setInView] = useState(false);
	const [visibleTab, setVisibleTab] = useState(true);
	const [hovered, setHovered] = useState(false);
	const [paused, setPaused] = useState(false);
	const [trackIndex, setTrackIndex] = useState(currentIndex + 1);
	const [animate, setAnimate] = useState(true);
	const previousIndex = useRef(currentIndex);
	useEffect(() => {
		const viewport = window.matchMedia('(min-width: 768px)');
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => {
			setDesktop(viewport.matches);
			setReducedMotion(motion.matches);
		};
		const visibility = () => setVisibleTab(!document.hidden);
		update();
		visibility();
		viewport.addEventListener('change', update);
		motion.addEventListener('change', update);
		document.addEventListener('visibilitychange', visibility);
		const observer = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ threshold: 0.05 },
		);
		if (rootRef.current) observer.observe(rootRef.current);
		return () => {
			viewport.removeEventListener('change', update);
			motion.removeEventListener('change', update);
			document.removeEventListener('visibilitychange', visibility);
			observer.disconnect();
		};
	}, []);
	useEffect(() => {
		const previous = previousIndex.current;
		previousIndex.current = currentIndex;
		if (
			!reducedMotion &&
			!isViewerOpen &&
			previous === count - 1 &&
			currentIndex === 0
		)
			setTrackIndex(count + 1);
		else if (
			!reducedMotion &&
			!isViewerOpen &&
			previous === 0 &&
			currentIndex === count - 1
		)
			setTrackIndex(0);
		else setTrackIndex(currentIndex + 1);
	}, [currentIndex, count, reducedMotion, isViewerOpen]);
	const autoPlaying =
		count > 1 &&
		!paused &&
		!hovered &&
		inView &&
		visibleTab &&
		!isViewerOpen &&
		!reducedMotion;
	useEffect(() => {
		if (!autoPlaying) return;
		const timer = setTimeout(
			() => onIndexChange((currentIndex + 1) % count),
			3000,
		);
		return () => clearTimeout(timer);
	}, [autoPlaying, currentIndex, count, onIndexChange]);
	const settleTrack = () => {
		if (trackIndex !== 0 && trackIndex !== count + 1) return;
		setAnimate(false);
		setTrackIndex(currentIndex + 1);
	};
	useEffect(() => {
		if (animate) return;
		let second = 0;
		const first = requestAnimationFrame(() => {
			second = requestAnimationFrame(() => setAnimate(true));
		});
		return () => {
			cancelAnimationFrame(first);
			cancelAnimationFrame(second);
		};
	}, [animate]);
	if (count === 0) return null;
	const slides = [
		images[count - 1],
		...images,
		images[0],
		images[1 % count],
		images[2 % count],
	];
	const move = (index: number) => {
		setPaused(true);
		onIndexChange((index + count) % count);
	};
	const previousLabel = locale === 'ko' ? '이전 이미지' : 'Previous image';
	const nextLabel = locale === 'ko' ? '다음 이미지' : 'Next image';
	return (
		<div
			ref={rootRef}
			className="media-gallery w-full"
			role="region"
			aria-label={locale === 'ko' ? '프로젝트 화면' : 'Project screenshots'}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onFocusCapture={(event) => {
				if (!(event.target as HTMLElement).closest('[data-autoplay-control]'))
					setPaused(true);
			}}
		>
			<header className="media-gallery-heading">
				<h3 className="font-bold text-2xl text-foreground">{title}</h3>

				{count > 1 && !reducedMotion && (
					<button
						type="button"
						data-autoplay-control
						className="media-gallery-playback"
						aria-label={
							locale === 'ko'
								? paused
									? '이미지 자동 넘김 재생'
									: '이미지 자동 넘김 일시정지'
								: paused
									? 'Play slideshow'
									: 'Pause slideshow'
						}
						aria-pressed={!paused}
						onClick={() => setPaused((value) => !value)}
					>
						{paused ? (
							<Play size={16} strokeWidth={1.75} aria-hidden="true" />
						) : (
							<Pause size={16} strokeWidth={1.75} aria-hidden="true" />
						)}
					</button>
				)}
			</header>
			<div className="relative">
				<div className="media-gallery-viewport relative overflow-hidden rounded-lg">
					<div
						className="media-gallery-track"
						style={{
							transform: `translateX(calc(-1 * ${trackIndex} * var(--media-slide-width)))`,
							transition: animate ? undefined : 'none',
						}}
						onTransitionEnd={(event) => {
							if (
								event.target === event.currentTarget &&
								event.propertyName === 'transform'
							)
								settleTrack();
						}}
					>
						{slides.map((image, index) => {
							const realIndex = (index - 1 + count) % count;
							const visible =
								index >= trackIndex && index < trackIndex + (desktop ? 3 : 1);
							return (
								<div
									key={index}
									className="media-gallery-slide px-1"
									inert={!visible}
									aria-hidden={!visible}
								>
									<div className="relative mx-auto flex h-[400px] max-w-[300px] items-center justify-center md:h-[300px] md:max-w-[200px]">
										<LoadImage
											src={image.src}
											alt={image.alt}
											fill
											sizes="(max-width: 767px) 300px, 200px"
											className="rounded-lg"
										/>
										<button
											type="button"
											className="absolute inset-0 rounded-lg transition-opacity hover:bg-foreground/5"
											onClick={() => {
												setPaused(true);
												onImageClick(realIndex);
											}}
											aria-label={
												locale === 'ko' ? `${image.alt} 확대` : `Enlarge ${image.alt}`
											}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				{count > 1 && (
					<>
						<button
							type="button"
							className="absolute left-2 top-[200px] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/35 bg-background/90 transition-colors hover:bg-secondary md:top-[150px]"
							onClick={() => move(currentIndex - 1)}
							aria-label={previousLabel}
						>
							<ChevronLeft size={18} aria-hidden="true" />
						</button>
						<button
							type="button"
							className="absolute right-2 top-[200px] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/35 bg-background/90 transition-colors hover:bg-secondary md:top-[150px]"
							onClick={() => move(currentIndex + 1)}
							aria-label={nextLabel}
						>
							<ChevronRight size={18} aria-hidden="true" />
						</button>
					</>
				)}
			</div>
			<ImagePagination
				images={images}
				currentIndex={currentIndex}
				onIndexChange={move}
				autoPlaying={autoPlaying}
			/>
		</div>
	);
}
