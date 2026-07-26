'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
	BoxGeometry,
	BufferGeometry,
	Color,
	Float32BufferAttribute,
	Group,
	LineBasicMaterial,
	MeshStandardMaterial,
} from 'three';
import { sceneContracts } from '@/data/graphicPortfolio';
import { useThemeStore } from '@/store/useThemeStore';
import type {
	WorkBoundaryCategory,
	WorkSceneParameter,
} from '@/data/graphicPortfolio';
import type { LiveSceneProps } from './sceneBoundary';
import {
	CameraRig,
	FirstFrameProbe,
	SceneFailureFixture,
	RendererLifecycleProbe,
	reportSceneResourceDisposal,
	useScenePresentation,
} from './sceneShared';

interface WorkCanvasProps extends LiveSceneProps {
	profile: WorkSceneParameter;
}

const categoryPositions: Record<
	WorkBoundaryCategory,
	readonly [number, number, number]
> = {
	browser: [-1.8, 0.7, 0],
	webview: [-1.05, 0.35, 0.1],
	native: [-0.15, 0.05, 0],
	device: [0.75, -0.2, 0.1],
	server: [1.65, 0.35, -0.2],
	data: [0.95, -0.95, -0.45],
	document: [-1.05, -0.85, -0.25],
};

function BoundaryField({
	profile,
	reducedMotion,
	onReady,
	theme,
}: Pick<WorkCanvasProps, 'profile' | 'reducedMotion' | 'onReady'> & {
	theme: 'light' | 'dark';
}) {
	const group = useRef<Group>(null);
	const resources = useMemo(() => {
		const connectionPoints = profile.connections.flatMap(([from, to]) => [
			...categoryPositions[from],
			...categoryPositions[to],
		]);
		const connectionGeometry = new BufferGeometry();
		connectionGeometry.setAttribute(
			'position',
			new Float32BufferAttribute(connectionPoints, 3),
		);
		return {
			geometry: new BoxGeometry(1.18, 0.24, 0.82),
			material: new MeshStandardMaterial({
				color: new Color(theme === 'dark' ? '#4d5458' : '#7c8485'),
				roughness: 0.94,
				metalness: 0.04,
			}),
			connectionGeometry,
			connectionMaterial: new LineBasicMaterial({
				color: theme === 'dark' ? '#5875ee' : '#2f49b8',
				transparent: true,
				opacity: 0.92,
			}),
		};
	}, [profile, theme]);

	useEffect(
		() => () => {
			resources.geometry.dispose();
			resources.material.dispose();
			resources.connectionGeometry.dispose();
			resources.connectionMaterial.dispose();
			reportSceneResourceDisposal();
		},
		[resources],
	);

	useFrame(() => {
		if (!group.current || reducedMotion) return;
		group.current.rotation.y =
			-0.26 + Math.sin(performance.now() * 0.00032) * 0.018;
	});

	return (
		<group
			ref={group}
			rotation={[0.22, -0.26, 0]}
			position={[0, -0.05, 0]}
			scale={1.28}
		>
			<lineSegments
				geometry={resources.connectionGeometry}
				material={resources.connectionMaterial}
			/>
			{profile.layers.map((category) => (
				<mesh
					key={category}
					position={categoryPositions[category]}
					geometry={resources.geometry}
					material={resources.material}
				/>
			))}
			<FirstFrameProbe onReady={onReady} />
		</group>
	);
}

export default function WorkCanvas({ profile, ...props }: WorkCanvasProps) {
	const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
	const contract = sceneContracts.work;
	const { dpr, pose, tier, quality } = useScenePresentation(contract);
	return (
		<Canvas
			key={props.recoveryKey}
			className="graphic-scene-canvas"
			data-scene-dpr={dpr}
			data-scene-camera-tier={tier}
			data-scene-quality={quality}
			aria-hidden="true"
			dpr={[1, dpr]}
			frameloop={props.active && !props.reducedMotion ? 'always' : 'demand'}
			gl={{
				alpha: false,
				antialias: quality === 'high',
				powerPreference: quality === 'high' ? 'high-performance' : 'low-power',
			}}
			onCreated={({ gl }) => props.onCanvas(gl.domElement)}
			onError={props.onFailure}
		>
			<color
				attach="background"
				args={[resolvedTheme === 'dark' ? '#0b0d0f' : '#e8e9e4']}
			/>
			<SceneFailureFixture />
			<RendererLifecycleProbe />
			<ambientLight intensity={1.35} />
			<directionalLight position={[3, 7, 6]} intensity={2.6} />
			<CameraRig pose={props.reducedMotion ? contract.reducedMotionPose : pose} />
			<BoundaryField
				profile={profile}
				theme={resolvedTheme}
				reducedMotion={props.reducedMotion}
				onReady={props.onReady}
			/>
		</Canvas>
	);
}
