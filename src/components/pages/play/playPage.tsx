'use client';
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from 'react';
import Image from 'next/image';
import {
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	Pause,
	Play,
	RotateCcw,
	Maximize,
	Minimize,
	Shuffle,
	Plus,
	Minus,
} from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { useThemeStore } from '@/store/useThemeStore';
import type { FlightScene } from './scene';
import styles from './play.module.css';

const words = {
	ko: {
		title: '바람 따라, 어디든.',
		intro: 'Doge와 함께 언덕 너머로 떠나보세요.',
		help: 'WASD 이동 · Space 상승 · Shift 하강',
		orbit: '드래그로 시점 회전 · 휠로 거리 조절',
		stage:
			'Doge 비행. WASD로 이동하고 Space로 상승, Shift로 하강합니다. 드래그로 시점을 바꿀 수 있습니다.',
		loading: '열기구와 풍경을 준비하고 있어요.',
		failed: '풍경을 불러오지 못했어요.',
		retry: '다시 시도',
		pause: '일시정지',
		resume: '재생',
		reset: '출발점으로',
		newWorld: '새로운 풍경',
		fullscreen: '전체화면',
		exitFullscreen: '전체화면 나가기',
		enter: '탐색 시작',
		leave: '조작 종료',
		up: '상승',
		down: '하강',
		forward: '앞으로',
		back: '뒤로',
		left: '왼쪽',
		right: '오른쪽',
		near: '가까이 보기',
		far: '멀리 보기',
		paused: '잠시 쉬는 중',
		live: '자유 비행',
		credit: '열기구 모델',
		modified: '크기·방향·재질 조정',
	},
	en: {
		title: 'Follow the wind.',
		intro: 'Take Doge beyond the next hillside.',
		help: 'WASD to move · Space to rise · Shift to descend',
		orbit: 'Drag to look around · Scroll to zoom',
		stage:
			'Doge flight. WASD to move, Space to rise, Shift to descend. Drag to orbit the camera.',
		loading: 'Preparing your balloon and the landscape.',
		failed: 'The landscape could not be loaded.',
		retry: 'Try again',
		pause: 'Pause',
		resume: 'Play',
		reset: 'Back to the start',
		newWorld: 'New landscape',
		fullscreen: 'Fullscreen',
		exitFullscreen: 'Exit fullscreen',
		enter: 'Start exploring',
		leave: 'Stop controls',
		up: 'Rise',
		down: 'Descend',
		forward: 'Forward',
		back: 'Backward',
		left: 'Left',
		right: 'Right',
		near: 'Zoom in',
		far: 'Zoom out',
		paused: 'Taking a breath',
		live: 'Free flight',
		credit: 'Balloon model',
		modified: 'Scale, orientation and material adjusted',
	},
};
const keyMap: Record<string, string> = {
	KeyW: 'forward',
	ArrowUp: 'forward',
	KeyS: 'back',
	ArrowDown: 'back',
	KeyA: 'left',
	ArrowLeft: 'left',
	KeyD: 'right',
	ArrowRight: 'right',
	Space: 'up',
	ShiftLeft: 'down',
	ShiftRight: 'down',
};
function Hold({
	name,
	action,
	disabled,
	children,
	onInput,
	className,
}: {
	name: string;
	action: string;
	disabled: boolean;
	children: ReactNode;
	onInput: (action: string, on: boolean) => void;
	className?: string;
}) {
	return (
		<button
			type="button"
			className={className}
			disabled={disabled}
			aria-label={name}
			title={name}
			onPointerDown={(e) => {
				if (e.button !== 0) return;
				e.currentTarget.setPointerCapture(e.pointerId);
				onInput(action, true);
			}}
			onPointerUp={() => onInput(action, false)}
			onPointerCancel={() => onInput(action, false)}
			onLostPointerCapture={() => onInput(action, false)}
			onBlur={() => onInput(action, false)}
			onKeyDown={(e) => {
				if (e.key === ' ' || e.key === 'Enter') {
					e.preventDefault();
					onInput(action, true);
				}
			}}
			onKeyUp={(e) => {
				if (e.key === ' ' || e.key === 'Enter') {
					e.preventDefault();
					onInput(action, false);
				}
			}}
		>
			{children}
		</button>
	);
}
export function PlayPage() {
	const { locale } = useLocale(),
		text = words[locale],
		dark = useThemeStore((s) => s.isDarkMode);
	const canvas = useRef<HTMLCanvasElement>(null),
		stage = useRef<HTMLDivElement>(null),
		shell = useRef<HTMLDivElement>(null),
		fullButton = useRef<HTMLButtonElement>(null);
	const scene = useRef<FlightScene | null>(null);
	const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
	const [attempt, setAttempt] = useState(0),
		[paused, setPaused] = useState(true),
		[expanded, setExpanded] = useState(false),
		[touchActive, setTouchActive] = useState(false);
	const pausedRef = useRef(true),
		darkRef = useRef(dark),
		drag = useRef<{ id: number; x: number; y: number } | null>(null);
	darkRef.current = dark;
	const clear = useCallback(() => {
		scene.current?.clearInput();
		drag.current = null;
	}, []);
	useEffect(() => {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		pausedRef.current = reduced.matches;
		setPaused(reduced.matches);
		const change = () => {
			if (reduced.matches) {
				pausedRef.current = true;
				setPaused(true);
				clear();
				scene.current?.setPaused(true);
			}
		};
		reduced.addEventListener('change', change);
		return () => reduced.removeEventListener('change', change);
	}, [clear]);
	useEffect(() => {
		let dead = false;
		let observer: IntersectionObserver | undefined;
		let instance: FlightScene | undefined;
		setStatus('loading');
		const fail = () => {
			if (!dead) {
				clear();
				setStatus('error');
			}
		};
		import('./scene')
			.then(async ({ createFlightScene }) => {
				if (dead || !canvas.current) return;
				instance = createFlightScene(canvas.current, darkRef.current, fail);
				scene.current = instance;
				instance.setPaused(pausedRef.current);
				observer = new IntersectionObserver(
					([e]) => {
						instance?.setVisible(e.isIntersecting);
						if (!e.isIntersecting) clear();
					},
					{ threshold: 0.05 },
				);
				if (stage.current) observer.observe(stage.current);
				await instance.ready;
				if (!dead) {
					instance.setDark(darkRef.current);
					setStatus('ready');
				}
			})
			.catch(fail);
		return () => {
			dead = true;
			observer?.disconnect();
			instance?.dispose();
			if (scene.current === instance) scene.current = null;
		};
	}, [attempt, clear]);
	useEffect(() => {
		scene.current?.setDark(dark);
	}, [dark]);
	useEffect(() => {
		const hidden = () => {
			if (document.hidden) clear();
		};
		window.addEventListener('blur', clear);
		document.addEventListener('visibilitychange', hidden);
		return () => {
			window.removeEventListener('blur', clear);
			document.removeEventListener('visibilitychange', hidden);
		};
	}, [clear]);
	useEffect(() => {
		if (!expanded) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const escape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && !document.fullscreenElement) {
				setExpanded(false);
				setTouchActive(false);
				clear();
				fullButton.current?.focus();
			}
		};
		document.addEventListener('keydown', escape);
		return () => {
			document.body.style.overflow = previous;
			document.removeEventListener('keydown', escape);
		};
	}, [expanded, clear]);
	useEffect(() => {
		const change = () => {
			if (!document.fullscreenElement) {
				setExpanded(false);
				clear();
				fullButton.current?.focus();
			}
		};
		document.addEventListener('fullscreenchange', change);
		return () => document.removeEventListener('fullscreenchange', change);
	}, [clear]);
	const fullscreen = async () => {
		clear();
		if (expanded) {
			if (document.fullscreenElement) await document.exitFullscreen();
			setExpanded(false);
			fullButton.current?.focus();
		} else {
			setExpanded(true);
			try {
				await shell.current?.requestFullscreen();
			} catch {
				/* The fixed viewport layout is the fallback on browsers without Fullscreen API. */
			}
			stage.current?.focus();
		}
	};
	useEffect(() => {
		const element = stage.current;
		if (!element) return;
		const wheel = (event: WheelEvent) => {
			if (document.activeElement !== element) return;
			event.preventDefault();
			scene.current?.zoom(event.deltaY);
		};
		element.addEventListener('wheel', wheel, { passive: false });
		return () => element.removeEventListener('wheel', wheel);
	}, []);
	const input = (action: string, on: boolean) => {
		if (status === 'ready' && !pausedRef.current)
			scene.current?.input(action, on);
	};
	const toggle = () => {
		clear();
		pausedRef.current = !pausedRef.current;
		setPaused(pausedRef.current);
		scene.current?.setPaused(pausedRef.current);
	};
	const disabled = paused || status !== 'ready';
	return (
		<section className={styles.page}>
			<header className={styles.header}>
				<span className={styles.eyebrow}>PLAY</span>
				<h1>{text.title}</h1>
				<p>{text.intro}</p>
			</header>
			<div ref={shell} className={styles.playground} data-expanded={expanded}>
				<div
					ref={stage}
					className={styles.stage}
					tabIndex={0}
					role="group"
					aria-label={text.stage}
					data-touch-active={touchActive}
					onKeyDown={(e) => {
						if (e.target !== e.currentTarget) return;
						const action = keyMap[e.code];
						if (action) {
							e.preventDefault();
							input(action, true);
						}
					}}
					onKeyUp={(e) => {
						if (e.target !== e.currentTarget) return;
						const action = keyMap[e.code];
						if (action) {
							e.preventDefault();
							input(action, false);
						}
					}}
					onBlur={clear}
					onPointerDown={(e) => {
						if (
							e.target !== canvas.current ||
							status !== 'ready' ||
							(e.pointerType === 'touch' && !touchActive)
						)
							return;
						stage.current?.focus();
						e.currentTarget.setPointerCapture(e.pointerId);
						drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
					}}
					onPointerMove={(e) => {
						const d = drag.current;
						if (!d || d.id !== e.pointerId) return;
						scene.current?.orbit(e.clientX - d.x, e.clientY - d.y);
						d.x = e.clientX;
						d.y = e.clientY;
					}}
					onPointerUp={() => {
						drag.current = null;
					}}
					onPointerCancel={clear}
					onLostPointerCapture={() => {
						drag.current = null;
					}}
				>
					<canvas
						key={attempt}
						ref={canvas}
						className={styles.canvas}
						data-ready={status === 'ready'}
						aria-hidden="true"
					/>
					{status !== 'ready' && (
						<div className={styles.fallback}>
							<Image src="/images/doge-peek.webp" width={92} height={120} alt="" />
							<p role="status">{status === 'error' ? text.failed : text.loading}</p>
							{status === 'error' && (
								<button onClick={() => setAttempt((n) => n + 1)}>{text.retry}</button>
							)}
						</div>
					)}
					<span className={styles.sceneCaption}>
						{status === 'ready' ? (paused ? text.paused : text.live) : ''}
					</span>
					<div className={styles.utility}>
						<button
							onClick={toggle}
							disabled={status !== 'ready'}
							aria-label={paused ? text.resume : text.pause}
							title={paused ? text.resume : text.pause}
						>
							{paused ? <Play size={18} /> : <Pause size={18} />}
						</button>
						<button
							onClick={() => {
								clear();
								scene.current?.reset();
							}}
							disabled={status !== 'ready'}
							aria-label={text.reset}
							title={text.reset}
						>
							<RotateCcw size={18} />
						</button>
						<button
							onClick={() => {
								clear();
								scene.current?.reset(true);
							}}
							disabled={status !== 'ready'}
							aria-label={text.newWorld}
							title={text.newWorld}
						>
							<Shuffle size={18} />
						</button>
						<button
							ref={fullButton}
							onClick={fullscreen}
							aria-label={expanded ? text.exitFullscreen : text.fullscreen}
							title={expanded ? text.exitFullscreen : text.fullscreen}
						>
							{expanded ? <Minimize size={18} /> : <Maximize size={18} />}
						</button>
					</div>
					<div className={styles.zoom}>
						<button aria-label={text.near} onClick={() => scene.current?.zoom(-180)}>
							<Plus size={17} />
						</button>
						<button aria-label={text.far} onClick={() => scene.current?.zoom(180)}>
							<Minus size={17} />
						</button>
					</div>
					<button
						className={styles.touchToggle}
						onClick={() => {
							clear();
							setTouchActive((v) => !v);
						}}
						aria-pressed={touchActive}
					>
						{touchActive ? text.leave : text.enter}
					</button>
				</div>
				<div className={styles.controlBar}>
					<div className={styles.instructions}>
						<p>{text.help}</p>
						<span>{text.orbit}</span>
					</div>
					<div className={styles.controls}>
						<div className={styles.dpad}>
							<Hold
								className={styles.forward}
								name={text.forward}
								action="forward"
								disabled={disabled}
								onInput={input}
							>
								<ArrowUp size={18} />
							</Hold>
							<Hold name={text.left} action="left" disabled={disabled} onInput={input}>
								<ArrowLeft size={18} />
							</Hold>
							<Hold name={text.back} action="back" disabled={disabled} onInput={input}>
								<ArrowDown size={18} />
							</Hold>
							<Hold
								name={text.right}
								action="right"
								disabled={disabled}
								onInput={input}
							>
								<ArrowRight size={18} />
							</Hold>
						</div>
						<div className={styles.altitude}>
							<Hold name={text.up} action="up" disabled={disabled} onInput={input}>
								<ArrowUp size={15} />
								{text.up}
							</Hold>
							<Hold name={text.down} action="down" disabled={disabled} onInput={input}>
								<ArrowDown size={15} />
								{text.down}
							</Hold>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.afterword}>
				<details>
					<summary>{text.credit}</summary>
					<p>
						<a
							href="https://sketchfab.com/3d-models/to-the-moon-doge-hot-air-balloon-ef9cbcdabdd5417c8eace6f84b4d2014"
							target="_blank"
							rel="noreferrer"
						>
							To The Moon Doge Hot Air Balloon
						</a>{' '}
						by{' '}
						<a href="https://sketchfab.com/OscarWW" target="_blank" rel="noreferrer">
							OscarWW
						</a>{' '}
						—{' '}
						<a
							href="https://creativecommons.org/licenses/by/4.0/"
							target="_blank"
							rel="noreferrer"
						>
							CC BY 4.0
						</a>
						. {text.modified}.
					</p>
				</details>
			</div>
		</section>
	);
}
