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

interface WorkChapterRailProps {
	stories: ProfessionalStory[];
	labels: {
		index: string;
		current: string;
		open: string;
		close: string;
		featured: string;
		compact: string;
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
	const { activeId, activeIndex } = useWorkStoryScroll(storyIds);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuId = `work-chapters-${useId().replaceAll(':', '')}`;
	const railRef = useRef<HTMLElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const activeStory = stories[activeIndex] ?? stories[0];
	const groups = [
		{
			label: labels.featured,
			stories: stories.filter((story) => story.tier === 'featured'),
		},
		{
			label: labels.compact,
			stories: stories.filter((story) => story.tier === 'compact'),
		},
	];

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
		}
		setIsMenuOpen(false);
		window.requestAnimationFrame(() => scrollToHashTarget(true, true));
	};

	if (!activeStory) return null;

	return (
		<>
			<nav
				ref={railRef}
				aria-label={labels.index}
				className="sticky top-16 z-30 -mx-4 border-y border-border/45 bg-background sm:-mx-6 xl:hidden"
			>
				<div className="relative h-14 px-4 sm:px-6">
					<button
						ref={menuButtonRef}
						type="button"
						aria-expanded={isMenuOpen}
						aria-controls={menuId}
						aria-label={`${isMenuOpen ? labels.close : labels.open}. ${labels.current}: ${activeIndex + 1}/${stories.length}, ${activeStory.title}, ${activeStory.period}`}
						onClick={() => setIsMenuOpen((current) => !current)}
						className="flex h-full w-full min-w-0 items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
					>
						<span className="flex min-w-0 items-center gap-3">
							<span className="shrink-0 text-xs font-bold text-accent tabular-nums">
								{String(activeIndex + 1).padStart(2, '0')}
							</span>
							<span className="min-w-0">
								<span className="block truncate text-sm font-semibold text-foreground">
									{activeStory.title}
								</span>
								<span className="block text-xs text-muted-foreground">
									{activeStory.period}
								</span>
							</span>
						</span>
						<span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-foreground">
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
							className="absolute inset-x-0 top-full max-h-[60dvh] overflow-y-auto overscroll-contain border-b border-border/45 bg-background px-3 py-4 shadow-[0_18px_40px_hsl(var(--blacks)/0.12)] sm:px-5"
						>
							<div className="space-y-5">
								{groups.map((group) => (
									<section key={group.label} aria-label={group.label}>
										<p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
											{group.label}
										</p>
										<ol>
											{group.stories.map((story) => {
												const index = stories.findIndex(({ id }) => id === story.id);
												const isActive = story.id === activeId;

												return (
													<li key={story.id}>
														<a
															href={`#${story.id}`}
															onClick={(event) => navigateTo(event, story.id)}
															aria-current={isActive ? 'location' : undefined}
															className="flex min-h-11 items-center gap-3 border-l-2 border-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:border-accent aria-[current=location]:bg-secondary/35"
														>
															<span className="w-5 shrink-0 text-xs font-bold text-muted-foreground tabular-nums aria-[current=location]:text-accent">
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
															<ul className="mb-2 ml-11 border-l border-border/45 pl-2">
																{story.chapters.map((chapter) => (
																	<li key={chapter.id}>
																		<a
																			href={`#${chapter.id}`}
																			onClick={(event) => navigateTo(event, chapter.id)}
																			className="flex min-h-11 items-center px-3 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
																		>
																			{chapter.title}
																		</a>
																	</li>
																))}
															</ul>
														)}
													</li>
												);
											})}
										</ol>
									</section>
								))}
							</div>
						</div>
					)}
				</div>
			</nav>

			<div className="hidden min-w-0 xl:block xl:h-full">
				<nav
					aria-label={labels.index}
					className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-3"
				>
					<p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
						{labels.index}
					</p>
					<div className="mt-6 space-y-7">
						{groups.map((group) => (
							<section key={group.label} aria-label={group.label}>
								<p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
									{group.label}
								</p>
								<ol>
									{group.stories.map((story) => {
										const index = stories.findIndex(({ id }) => id === story.id);
										const isActive = story.id === activeId;

										return (
											<li key={story.id}>
												<a
													href={`#${story.id}`}
													onClick={(event) => navigateTo(event, story.id)}
													aria-current={isActive ? 'location' : undefined}
													className="group relative flex min-h-11 items-start gap-3 border-l-2 border-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:border-accent aria-[current=location]:bg-secondary/30"
												>
													<span className="w-5 shrink-0 pt-0.5 text-xs font-bold text-muted-foreground tabular-nums group-aria-[current=location]:text-accent">
														{String(index + 1).padStart(2, '0')}
													</span>
													<span className="min-w-0 flex-1">
														<span className="block text-sm font-medium leading-5 text-foreground break-keep group-aria-[current=location]:font-bold">
															{story.title}
														</span>
														<span className="mt-0.5 block text-xs text-muted-foreground">
															{story.period}
														</span>
													</span>
												</a>
												{story.chapters.length > 1 && (
													<ul className="mb-2 ml-11 border-l border-border/45 pl-2">
														{story.chapters.map((chapter) => (
															<li key={chapter.id}>
																<a
																	href={`#${chapter.id}`}
																	onClick={(event) => navigateTo(event, chapter.id)}
																	className="flex min-h-11 items-center px-3 text-xs font-medium leading-5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
																>
																	{chapter.title}
																</a>
															</li>
														))}
													</ul>
												)}
											</li>
										);
									})}
								</ol>
							</section>
						))}
					</div>
				</nav>
			</div>
		</>
	);
};
