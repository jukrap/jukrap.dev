'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';

export const HeroMedia = () => {
	const { dictionary } = useLocale();
	const videoRef = useRef<HTMLVideoElement>(null);
	const manuallyPaused = useRef(false);
	const [allowVideo, setAllowVideo] = useState(false);
	const [hasFrame, setHasFrame] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const connection = (
			navigator as Navigator & { connection?: { saveData?: boolean } }
		).connection;
		const updatePreference = () =>
			setAllowVideo(!preference.matches && !connection?.saveData);
		updatePreference();
		preference.addEventListener('change', updatePreference);
		return () => preference.removeEventListener('change', updatePreference);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!allowVideo || failed || !video) return;
		let inView = false;
		const syncPlayback = () => {
			if (inView && !document.hidden && !manuallyPaused.current) {
				void video.play().catch(() => setIsPlaying(false));
			} else {
				video.pause();
			}
		};
		const observer = new IntersectionObserver(
			([entry]) => {
				inView = entry.isIntersecting;
				syncPlayback();
			},
			{ threshold: 0.05 },
		);
		observer.observe(video);
		document.addEventListener('visibilitychange', syncPlayback);
		return () => {
			observer.disconnect();
			document.removeEventListener('visibilitychange', syncPlayback);
			video.pause();
		};
	}, [allowVideo, failed]);

	const togglePlayback = () => {
		const video = videoRef.current;
		if (!video) return;
		manuallyPaused.current = !video.paused;
		if (video.paused) {
			void video.play().catch(() => setIsPlaying(false));
		} else {
			video.pause();
		}
	};

	return (
		<>
			<Image
				src="/images/home/first-light-poster.jpg"
				alt=""
				fill
				preload
				unoptimized
				sizes="(max-width: 1440px) 100vw, 1392px"
				className="home-hero-media"
			/>
			{allowVideo && !failed && (
				<>
					<video
						ref={videoRef}
						id="home-hero-video"
						src="/videos/first-light-loop.mp4"
						className={`home-hero-media home-hero-video${hasFrame ? ' home-hero-video-ready' : ''}`}
						muted
						loop
						playsInline
						preload="metadata"
						aria-hidden="true"
						onPlaying={() => {
							setHasFrame(true);
							setIsPlaying(true);
						}}
						onPause={() => setIsPlaying(false)}
						onError={() => setFailed(true)}
					/>
					<button
						type="button"
						className="home-motion-control"
						aria-controls="home-hero-video"
						aria-label={
							isPlaying ? dictionary.home.pauseVideo : dictionary.home.playVideo
						}
						title={isPlaying ? dictionary.home.pauseVideo : dictionary.home.playVideo}
						onClick={togglePlayback}
					>
						{isPlaying ? (
							<Pause size={14} aria-hidden="true" />
						) : (
							<Play size={14} aria-hidden="true" />
						)}
					</button>
				</>
			)}
		</>
	);
};
