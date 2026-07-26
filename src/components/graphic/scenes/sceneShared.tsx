'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { PerspectiveCamera } from 'three';
import type { CameraPose, SceneContract } from '@/types/portfolioExperiment';

type ViewportTier = 'desktop' | 'tablet' | 'mobile';
interface ScenePresentation {
	dpr: number;
	pose: CameraPose;
	tier: 'qa' | ViewportTier;
	viewportTier: ViewportTier;
	quality: 'high' | 'medium';
}

const resolvePresentation = (contract: SceneContract): ScenePresentation => {
	if (typeof window === 'undefined') {
		return {
			dpr: 1,
			pose: contract.camera.qa,
			tier: 'qa',
			viewportTier: 'desktop',
			quality: 'high',
		};
	}
	const qaCamera =
		new URLSearchParams(window.location.search).get('sceneCamera') === 'qa';
	const width = window.innerWidth;
	const viewportTier: ViewportTier =
		width <= 480 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop';
	const cap =
		viewportTier === 'mobile' ? 1.25 : viewportTier === 'tablet' ? 1.5 : 1.75;
	return {
		dpr: Math.max(1, Math.min(window.devicePixelRatio || 1, cap)),
		pose: qaCamera ? contract.camera.qa : contract.camera[viewportTier],
		tier: qaCamera ? 'qa' : viewportTier,
		viewportTier,
		quality: viewportTier === 'desktop' ? 'high' : 'medium',
	};
};

export function useScenePresentation(contract: SceneContract) {
	const [presentation, setPresentation] = useState<ScenePresentation>(() =>
		resolvePresentation(contract),
	);

	useEffect(() => {
		const update = () => setPresentation(resolvePresentation(contract));
		update();
		window.addEventListener('resize', update, { passive: true });
		return () => window.removeEventListener('resize', update);
	}, [contract]);

	return presentation;
}

export function CameraRig({ pose }: { pose: CameraPose }) {
	const { camera } = useThree();
	useEffect(() => {
		camera.position.set(...pose.position);
		camera.lookAt(...pose.target);
		(camera as PerspectiveCamera).fov = pose.fov;
		camera.updateProjectionMatrix();
	}, [camera, pose]);
	return null;
}

export function FirstFrameProbe({ onReady }: { onReady: () => void }) {
	const reported = useRef(false);
	useFrame(() => {
		if (reported.current) return;
		reported.current = true;
		onReady();
	});
	return null;
}

export function SceneFailureFixture() {
	useThree();
	if (
		typeof window !== 'undefined' &&
		new URLSearchParams(window.location.search).get('scene') === 'throw'
	) {
		throw new Error('Intentional graphic scene render failure fixture');
	}
	return null;
}

interface GraphicSceneLifecycleMetrics {
	active: number;
	mounts: number;
	disposals: number;
	resourceDisposals: number;
	frames: number;
}

const readLifecycleMetrics = () => {
	const scope = window as typeof window & {
		__GRAPHIC_SCENE_LIFECYCLE__?: GraphicSceneLifecycleMetrics;
	};
	const metrics = scope.__GRAPHIC_SCENE_LIFECYCLE__ ?? {
		active: 0,
		mounts: 0,
		disposals: 0,
		resourceDisposals: 0,
		frames: 0,
	};
	scope.__GRAPHIC_SCENE_LIFECYCLE__ = metrics;
	return metrics;
};

export function reportSceneResourceDisposal() {
	if (
		typeof window === 'undefined' ||
		!('__GRAPHIC_SCENE_LIFECYCLE__' in window)
	)
		return;
	readLifecycleMetrics().resourceDisposals += 1;
}

export function RendererLifecycleProbe() {
	const { gl } = useThree();
	const enabled =
		typeof window !== 'undefined' &&
		new URLSearchParams(window.location.search).get('sceneProbe') === '1';
	useFrame(() => {
		if (enabled) readLifecycleMetrics().frames += 1;
	});
	useEffect(() => {
		if (!enabled) return;
		const metrics = readLifecycleMetrics();
		metrics.active += 1;
		metrics.mounts += 1;
		gl.domElement.dataset.graphicRendererState = 'active';
		return () => {
			gl.setAnimationLoop(null);
			gl.renderLists.dispose();
			gl.dispose();
			metrics.active = Math.max(0, metrics.active - 1);
			metrics.disposals += 1;
			gl.domElement.dataset.graphicRendererState = 'disposed';
		};
	}, [enabled, gl]);
	return null;
}
