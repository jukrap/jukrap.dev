'use client';

import { usePathname } from 'next/navigation';
import { Component, useCallback, useEffect, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import type { Locale } from '@/types/locale';
import type { SceneContract } from '@/types/portfolioExperiment';
import { GRAPHIC_SCENE_ROUTE_LEAVE } from '@/lib/graphicSceneEvents';

export interface LiveSceneProps {
	active: boolean;
	reducedMotion: boolean;
	recoveryKey: number;
	onReady: () => void;
	onCanvas: (canvas: HTMLCanvasElement) => void;
	onFailure: () => void;
}

interface SceneBoundaryProps {
	contract: SceneContract;
	locale: Locale;
	contentKey?: string;
	fallbackOverlay?: ReactNode;
	children: (props: LiveSceneProps) => ReactNode;
}

class SceneErrorBoundary extends Component<
	{ children: ReactNode; onFailure: () => void },
	{ failed: boolean }
> {
	state = { failed: false };

	static getDerivedStateFromError() {
		return { failed: true };
	}

	componentDidCatch(_error: Error, _info: ErrorInfo) {
		this.props.onFailure();
	}

	render() {
		return this.state.failed ? null : this.props.children;
	}
}

function canUseWebGL() {
	try {
		const canvas = document.createElement('canvas');
		return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
	} catch {
		return false;
	}
}

export function SceneBoundary({
	contract,
	locale,
	contentKey,
	fallbackOverlay,
	children,
}: SceneBoundaryProps) {
	const pathname = usePathname() ?? '';
	const expectedPath =
		contract.route === 'overview'
			? '/' + locale
			: '/' + locale + '/' + contract.route;
	const routeActive =
		pathname === expectedPath || pathname === expectedPath + '/';
	const rootRef = useRef<HTMLDivElement>(null);
	const cleanupCanvasRef = useRef<() => void>(() => undefined);
	const recoveryAttempts = useRef(0);
	const [visible, setVisible] = useState(true);
	const [documentVisible, setDocumentVisible] = useState(true);
	const [supported, setSupported] = useState(false);
	const [forcedStatic, setForcedStatic] = useState(true);
	const [navigationSuspended, setNavigationSuspended] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);
	const [ready, setReady] = useState(false);
	const [contextLost, setContextLost] = useState(false);
	const [recoveryKey, setRecoveryKey] = useState(0);

	useEffect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateReduced = () => setReducedMotion(reduced.matches);
		updateReduced();
		reduced.addEventListener('change', updateReduced);

		const params = new URLSearchParams(window.location.search);
		const connection = (
			navigator as Navigator & {
				connection?: { saveData?: boolean };
				deviceMemory?: number;
			}
		).connection;
		const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
			.deviceMemory;
		setForcedStatic(
			params.get('scene') === 'static' ||
				Boolean(connection?.saveData) ||
				(typeof deviceMemory === 'number' && deviceMemory <= 2),
		);
		setSupported(canUseWebGL() && params.get('scene') !== 'fail');

		return () => reduced.removeEventListener('change', updateReduced);
	}, []);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;
		const observer = new IntersectionObserver(
			([entry]) => setVisible(entry.isIntersecting),
			{ rootMargin: '80px', threshold: 0.01 },
		);
		observer.observe(root);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const syncVisibility = () => setDocumentVisible(!document.hidden);
		syncVisibility();
		document.addEventListener('visibilitychange', syncVisibility);
		return () => document.removeEventListener('visibilitychange', syncVisibility);
	}, []);

	useEffect(() => {
		if (
			window.location.pathname === expectedPath ||
			window.location.pathname === expectedPath + '/'
		) {
			setNavigationSuspended(false);
		}
		const suspendBeforeNavigation = (event: Event) => {
			const destination = (event as CustomEvent<{ pathname?: string }>).detail
				?.pathname;
			const destinationOwnsScene =
				destination === expectedPath || destination === expectedPath + '/';
			if (destinationOwnsScene) {
				setNavigationSuspended(false);
				return;
			}
			cleanupCanvasRef.current();
			cleanupCanvasRef.current = () => undefined;
			setReady(false);
			setNavigationSuspended(true);
		};
		window.addEventListener(GRAPHIC_SCENE_ROUTE_LEAVE, suspendBeforeNavigation);
		return () =>
			window.removeEventListener(
				GRAPHIC_SCENE_ROUTE_LEAVE,
				suspendBeforeNavigation,
			);
	}, [expectedPath]);

	useEffect(() => () => cleanupCanvasRef.current(), []);
	useEffect(() => {
		if (routeActive) {
			setNavigationSuspended(false);
			return;
		}
		cleanupCanvasRef.current();
		cleanupCanvasRef.current = () => undefined;
		setReady(false);
	}, [routeActive]);
	useEffect(() => {
		setReady(false);
	}, [contentKey]);

	const onCanvas = useCallback((canvas: HTMLCanvasElement) => {
		cleanupCanvasRef.current();
		const onLost = (event: Event) => {
			event.preventDefault();
			setContextLost(true);
			setReady(false);
		};
		const onRestored = () => {
			if (recoveryAttempts.current >= 1) {
				setForcedStatic(true);
				return;
			}
			recoveryAttempts.current += 1;
			setContextLost(false);
			setRecoveryKey((current) => current + 1);
		};
		canvas.addEventListener('webglcontextlost', onLost);
		canvas.addEventListener('webglcontextrestored', onRestored);
		cleanupCanvasRef.current = () => {
			canvas.removeEventListener('webglcontextlost', onLost);
			canvas.removeEventListener('webglcontextrestored', onRestored);
		};
	}, []);

	const onReady = useCallback(() => setReady(true), []);
	const onFailure = useCallback(() => {
		setReady(false);
		setForcedStatic(true);
	}, []);
	const fallback = forcedStatic || !supported || contextLost;
	const active =
		supported &&
		!forcedStatic &&
		!contextLost &&
		!navigationSuspended &&
		routeActive &&
		visible &&
		documentVisible;
	const sceneState = fallback ? 'fallback' : ready ? 'ready' : 'loading';

	return (
		<div
			ref={rootRef}
			className="graphic-scene"
			data-scene-route={contract.route}
			data-scene-state={sceneState}
			data-scene-active={active}
			data-scene-route-active={routeActive}
			data-scene-seed={contract.seed}
			data-scene-dpr-mobile-cap="1.25"
			data-scene-dpr-desktop-cap="1.75"
		>
			<div
				className="graphic-scene-fallback"
				role="img"
				aria-label={contract.fallback.alt[locale]}
			>
				<img
					className="graphic-scene-fallback-light"
					src={contract.fallback.light}
					alt=""
					aria-hidden="true"
					width={1600}
					height={1000}
				/>
				<img
					className="graphic-scene-fallback-dark"
					src={contract.fallback.dark}
					alt=""
					aria-hidden="true"
					width={1600}
					height={1000}
				/>
				{fallbackOverlay ? (
					<div className="graphic-scene-fallback-overlay">{fallbackOverlay}</div>
				) : null}
			</div>
			{supported && !forcedStatic && routeActive && !navigationSuspended ? (
				<SceneErrorBoundary key={recoveryKey} onFailure={onFailure}>
					{children({
						active,
						reducedMotion,
						recoveryKey,
						onReady,
						onCanvas,
						onFailure,
					})}
				</SceneErrorBoundary>
			) : null}
		</div>
	);
}
