'use client';

import { useEffect, useState } from 'react';

export const WORK_READING_OFFSET = 132;

interface WorkStoryScrollState {
	activeId: string;
	activeIndex: number;
	progress: number;
}

const clamp = (value: number, minimum: number, maximum: number) =>
	Math.min(Math.max(value, minimum), maximum);

export const useWorkStoryScroll = (
	storyIds: string[],
): WorkStoryScrollState => {
	const [location, setLocation] = useState<WorkStoryScrollState>(() => ({
		activeId: storyIds[0] ?? '',
		activeIndex: 0,
		progress: 0,
	}));

	useEffect(() => {
		if (storyIds.length === 0) return;

		let frameId: number | null = null;

		const updateLocation = () => {
			frameId = null;
			const sections = storyIds
				.map((id) => document.getElementById(id))
				.filter((element): element is HTMLElement => element !== null);

			if (sections.length === 0) return;

			const marker = window.scrollY + WORK_READING_OFFSET + 1;
			const atDocumentEnd =
				window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight - 2;
			let activeIndex = 0;

			if (atDocumentEnd) {
				activeIndex = sections.length - 1;
			} else {
				for (let index = 0; index < sections.length; index += 1) {
					if (sections[index].offsetTop <= marker) activeIndex = index;
					else break;
				}
			}

			let progress = 0;
			if (atDocumentEnd || activeIndex === sections.length - 1) {
				progress = 100;
			} else if (sections.length > 1) {
				const currentTop = sections[activeIndex].offsetTop;
				const nextTop = sections[activeIndex + 1].offsetTop;
				const sectionProgress = clamp(
					(marker - currentTop) / Math.max(nextTop - currentTop, 1),
					0,
					1,
				);
				progress = ((activeIndex + sectionProgress) / (sections.length - 1)) * 100;
			}

			const activeId = sections[activeIndex].id;
			setLocation((current) => {
				const roundedProgress = Math.round(progress * 10) / 10;
				if (
					current.activeId === activeId &&
					current.activeIndex === activeIndex &&
					current.progress === roundedProgress
				) {
					return current;
				}

				return {
					activeId,
					activeIndex,
					progress: roundedProgress,
				};
			});
		};

		const scheduleUpdate = () => {
			if (frameId !== null) return;
			frameId = window.requestAnimationFrame(updateLocation);
		};

		const resizeObserver = new ResizeObserver(scheduleUpdate);
		resizeObserver.observe(document.body);
		window.addEventListener('scroll', scheduleUpdate, { passive: true });
		window.addEventListener('resize', scheduleUpdate);
		scheduleUpdate();

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('scroll', scheduleUpdate);
			window.removeEventListener('resize', scheduleUpdate);
			if (frameId !== null) window.cancelAnimationFrame(frameId);
		};
	}, [storyIds]);

	return location;
};
