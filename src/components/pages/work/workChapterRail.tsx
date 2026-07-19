'use client';

import {
	type MouseEvent as ReactMouseEvent,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react';
import { ChevronDown } from 'lucide-react';
import type { ProfessionalStory } from '@/types/work';
import { useWorkStoryScroll } from './useWorkStoryScroll';

const HASH_SYNC_EVENT = 'portfolio:hashchange';

interface WorkChapterRailProps {
	stories: ProfessionalStory[];
	labels: {
		index: string;
		current: string;
		open: string;
		close: string;
	};
}

const getHashId = () => {
	const rawHash = window.location.hash.slice(1);
	if (!rawHash) return '';

	try {
		return decodeURIComponent(rawHash);
	} catch {
		return rawHash;
	}
};

const scrollToHashTarget = (focusTarget = false, smooth = false) => {
	const id = getHashId();
	const target = id ? document.getElementById(id) : null;
	if (!target) return;

	if (focusTarget) target.focus({ preventScroll: true });
	target.scrollIntoView({
		block: 'start',
		behavior:
			smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
				? 'smooth'
				: 'auto',
	});
};

export const WorkChapterRail = ({ stories, labels }: WorkChapterRailProps) => {
	const storyIds = useMemo(() => stories.map((story) => story.id), [stories]);
	const { activeId, activeIndex, progress } = useWorkStoryScroll(storyIds);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuId = `work-chapters-${useId().replaceAll(':', '')}`;
	const railRef = useRef<HTMLElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const activeStory = stories[activeIndex] ?? stories[0];

	useEffect(() => {
		const restoreHashPosition = () =>
			window.requestAnimationFrame(() => scrollToHashTarget());

		restoreHashPosition();
		window.addEventListener('hashchange', restoreHashPosition);
		window.addEventListener('popstate', restoreHashPosition);

		return () => {
			window.removeEventListener('hashchange', restoreHashPosition);
			window.removeEventListener('popstate', restoreHashPosition);
		};
	}, []);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			setIsMenuOpen(false);
			menuButtonRef.current?.focus();
		};
		const handlePointerDown = (event: PointerEvent) => {
			if (railRef.current?.contains(event.target as Node)) return;
			setIsMenuOpen(false);
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('pointerdown', handlePointerDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('pointerdown', handlePointerDown);
		};
	}, [isMenuOpen]);

	const navigateTo = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
		event.preventDefault();
		const nextHash = `#${encodeURIComponent(id)}`;
		if (window.location.hash !== nextHash) {
			window.history.pushState(null, '', nextHash);
			window.dispatchEvent(new Event(HASH_SYNC_EVENT));
		}
		setIsMenuOpen(false);
		window.requestAnimationFrame(() => scrollToHashTarget(true, true));
	};

	if (!activeStory) return null;

	return (
		<nav
			ref={railRef}
			aria-label={labels.index}
			className="sticky top-16 z-30 -mx-4 border-y border-border/35 bg-background sm:-mx-6 lg:-mx-8"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center md:hidden">
					<button
						ref={menuButtonRef}
						type="button"
						aria-expanded={isMenuOpen}
						aria-controls={menuId}
						aria-label={`${isMenuOpen ? labels.close : labels.open}. ${labels.current}: ${activeIndex + 1}/${stories.length}, ${activeStory.title}, ${activeStory.period}`}
						onClick={() => setIsMenuOpen((current) => !current)}
						className="interactive-soft flex min-h-11 w-full min-w-0 items-center justify-between gap-3 rounded-md px-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none"
					>
						<span className="min-w-0 flex-1 text-sm font-semibold text-foreground">
							<span className="sr-only">{labels.current}: </span>
							<span className="flex min-w-0 items-center">
								<span className="mr-2 shrink-0 text-foreground tabular-nums">
									{activeIndex + 1}/{stories.length}
								</span>
								<span className="min-w-0 truncate">{activeStory.title}</span>
							</span>
							<span className="mt-0.5 block text-xs font-medium text-muted-foreground">
								{activeStory.period}
							</span>
						</span>
						<span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted-foreground">
							{isMenuOpen ? labels.close : labels.open}
							<ChevronDown
								className={`h-4 w-4 transition-transform motion-reduce:transition-none ${
									isMenuOpen ? 'rotate-180' : ''
								}`}
								aria-hidden="true"
							/>
						</span>
					</button>

					{isMenuOpen && (
						<div
							id={menuId}
							className="absolute inset-x-0 top-full max-h-[60dvh] overflow-y-auto overscroll-contain border border-border/45 bg-background p-2 shadow-lg"
						>
							<ol className="space-y-1">
								{stories.map((story, index) => (
									<li key={story.id}>
										<a
											href={`#${story.id}`}
											onClick={(event) => navigateTo(event, story.id)}
											aria-current={story.id === activeId ? 'location' : undefined}
											className="interactive-soft flex min-h-11 items-center gap-3 rounded-md px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none aria-[current=location]:bg-secondary/50"
										>
											<span className="w-5 shrink-0 text-xs font-bold text-foreground tabular-nums">
												{String(index + 1).padStart(2, '0')}
											</span>
											<span className="min-w-0 flex-1">
												<span className="block font-semibold text-foreground break-keep">
													{story.title}
												</span>
												<span className="block text-xs text-muted-foreground">
													{story.period}
												</span>
											</span>
										</a>

										{story.chapters.length > 1 && (
											<ul className="mb-2 ml-11 border-l border-border/40 pl-3">
												{story.chapters.map((chapter) => (
													<li key={chapter.id}>
														<a
															href={`#${chapter.id}`}
															onClick={(event) => navigateTo(event, chapter.id)}
															className="interactive-soft flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none"
														>
															{chapter.title}
														</a>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ol>
						</div>
					)}
				</div>

				<div className="hidden h-16 md:block">
					<div className="flex h-7 min-w-0 items-end text-xs">
						<span className="sr-only">{labels.current}: </span>
						<span className="mr-2 shrink-0 font-bold text-foreground tabular-nums">
							{activeIndex + 1}/{stories.length}
						</span>
						<span className="truncate font-semibold text-foreground">
							{activeStory.title}
						</span>
						<span className="ml-2 shrink-0 font-medium text-muted-foreground">
							· {activeStory.period}
						</span>
					</div>

					<div className="relative h-9">
						<div
							className="pointer-events-none absolute top-1/2 h-px bg-border/60"
							style={{
								left: `${100 / (stories.length * 2)}%`,
								right: `${100 / (stories.length * 2)}%`,
							}}
							aria-hidden="true"
						>
							<span
								className="block h-px bg-accent transition-[width] duration-100 motion-reduce:transition-none"
								style={{ width: `${progress}%` }}
							/>
						</div>

						<ol
							className="relative grid h-full"
							style={{
								gridTemplateColumns: `repeat(${stories.length}, minmax(0, 1fr))`,
							}}
						>
							{stories.map((story, index) => {
								const isActive = story.id === activeId;
								const isReached = index <= activeIndex;
								const tooltipPosition =
									index === 0
										? 'left-0'
										: index === stories.length - 1
											? 'right-0'
											: 'left-1/2 -translate-x-1/2';

								return (
									<li
										key={story.id}
										className="group relative flex items-center justify-center"
									>
										<a
											href={`#${story.id}`}
											onClick={(event) => navigateTo(event, story.id)}
											aria-label={`${index + 1}. ${story.title}, ${story.period}`}
											aria-current={isActive ? 'location' : undefined}
											className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
										>
											<span
												className={[
													'block rounded-full border bg-background transition-colors motion-reduce:transition-none',
													story.tier === 'featured' ? 'h-3 w-3' : 'h-2 w-2',
													isReached ? 'border-accent bg-accent' : 'border-border',
													isActive ? 'ring-4 ring-accent/15' : '',
												].join(' ')}
												aria-hidden="true"
											/>
										</a>

										<div
											className={`invisible absolute top-full z-40 w-64 pt-1 opacity-0 transition-opacity motion-reduce:transition-none group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${tooltipPosition}`}
										>
											<div className="rounded-md border border-border/45 bg-background p-3 shadow-lg">
												<p className="text-sm font-semibold leading-5 text-foreground break-keep">
													{story.title}
												</p>
												<p className="mt-1 text-xs text-muted-foreground">{story.period}</p>
												{story.chapters.length > 1 && (
													<ul className="mt-2 border-t border-border/35 pt-2">
														{story.chapters.map((chapter) => (
															<li key={chapter.id}>
																<a
																	href={`#${chapter.id}`}
																	onClick={(event) => navigateTo(event, chapter.id)}
																	className="interactive-soft flex min-h-11 items-center rounded-md px-2 text-xs font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none"
																>
																	{chapter.title}
																</a>
															</li>
														))}
													</ul>
												)}
											</div>
										</div>
									</li>
								);
							})}
						</ol>
					</div>
				</div>
			</div>
		</nav>
	);
};
