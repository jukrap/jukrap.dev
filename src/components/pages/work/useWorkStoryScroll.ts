'use client';

import { useEffect, useState } from 'react';

export const WORK_READING_OFFSET = 128;

interface WorkStoryScrollState {
	activeId: string;
	activeIndex: number;
}

export const useWorkStoryScroll = (
	storyIds: string[],
): WorkStoryScrollState => {
	const [location, setLocation] = useState<WorkStoryScrollState>(() => ({
		activeId: storyIds[0] ?? '',
		activeIndex: 0,
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
			let activeIndex = atDocumentEnd ? sections.length - 1 : 0;

			if (!atDocumentEnd) {
				for (let index = 0; index < sections.length; index += 1) {
					if (sections[index].offsetTop <= marker) activeIndex = index;
					else break;
				}
			}

			const activeId = sections[activeIndex].id;
			setLocation((current) => {
				if (current.activeId === activeId && current.activeIndex === activeIndex) {
					return current;
				}

				return { activeId, activeIndex };
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
