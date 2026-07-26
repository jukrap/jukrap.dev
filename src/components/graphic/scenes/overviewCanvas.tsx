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
import type { LiveSceneProps } from './sceneBoundary';
import {
	CameraRig,
	FirstFrameProbe,
	SceneFailureFixture,
	RendererLifecycleProbe,
	reportSceneResourceDisposal,
	useScenePresentation,
} from './sceneShared';

function SignalLattice({
	reducedMotion,
	onReady,
	theme,
	quality,
}: Pick<LiveSceneProps, 'reducedMotion' | 'onReady'> & {
	theme: 'light' | 'dark';
	quality: 'high' | 'medium';
}) {
	const group = useRef<Group>(null);
	const nodes = useMemo(() => {
		const depth = quality === 'high' ? 3 : 2;
		return Array.from({ length: 9 * depth }, (_, index) => ({
			x: (index % 3) - 1,
			y: (Math.floor(index / 3) % 3) - 1,
			z: Math.floor(index / 9) - (depth - 1) / 2,
		}));
	}, [quality]);
	const { lattice, signal, nodeGeometry, nodeMaterial } = useMemo(() => {
		const edges: number[] = [];
		const push = (
			a: { x: number; y: number; z: number },
			b: { x: number; y: number; z: number },
		) => edges.push(a.x, a.y, a.z, b.x, b.y, b.z);
		nodes.forEach((node, index) => {
			const xNext = nodes[index + 1];
			const yNext = nodes[index + 3];
			const zNext = nodes[index + 9];
			if (xNext && xNext.y === node.y && xNext.z === node.z) push(node, xNext);
			if (yNext && yNext.z === node.z) push(node, yNext);
			if (zNext) push(node, zNext);
		});
		const latticeGeometry = new BufferGeometry();
		latticeGeometry.setAttribute(
			'position',
			new Float32BufferAttribute(edges, 3),
		);
		const signalGeometry = new BufferGeometry();
		signalGeometry.setAttribute(
			'position',
			new Float32BufferAttribute(
				[-1, 1, -1, 0, 1, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, -1, 0],
				3,
			),
		);
		return {
			lattice: {
				geometry: latticeGeometry,
				material: new LineBasicMaterial({
					color: theme === 'dark' ? '#7d8589' : '#687173',
					transparent: true,
					opacity: 0.56,
				}),
			},
			signal: {
				geometry: signalGeometry,
				material: new LineBasicMaterial({
					color: theme === 'dark' ? '#5875ee' : '#2f49b8',
					transparent: true,
					opacity: 0.86,
				}),
			},
			nodeGeometry: new BoxGeometry(0.13, 0.13, 0.13),
			nodeMaterial: new MeshStandardMaterial({
				color: new Color(theme === 'dark' ? '#737a7e' : '#929998'),
				roughness: 0.84,
				metalness: 0.18,
			}),
		};
	}, [nodes, theme]);

	useEffect(
		() => () => {
			lattice.geometry.dispose();
			lattice.material.dispose();
			signal.geometry.dispose();
			signal.material.dispose();
			nodeGeometry.dispose();
			nodeMaterial.dispose();
			reportSceneResourceDisposal();
		},
		[lattice, nodeGeometry, nodeMaterial, signal],
	);

	useFrame(({ clock, pointer }) => {
		if (!group.current || reducedMotion) return;
		const time = clock.getElapsedTime();
		signal.material.opacity = 0.76 + Math.sin(time * 1.4) * 0.2;
		group.current.rotation.y +=
			(pointer.x * 0.08 - group.current.rotation.y) * 0.025;
		group.current.rotation.x +=
			(-pointer.y * 0.045 - group.current.rotation.x) * 0.025;
	});

	return (
		<group ref={group} rotation={[0.2, -0.28, 0.05]} scale={1.28}>
			<lineSegments geometry={lattice.geometry} material={lattice.material} />
			<lineSegments geometry={signal.geometry} material={signal.material} />
			{nodes.map((node) => (
				<mesh
					key={`${node.x}-${node.y}-${node.z}`}
					position={[node.x, node.y, node.z]}
					geometry={nodeGeometry}
					material={nodeMaterial}
				/>
			))}
			<FirstFrameProbe onReady={onReady} />
		</group>
	);
}

export default function OverviewCanvas(props: LiveSceneProps) {
	const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
	const contract = sceneContracts.overview;
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
			<ambientLight intensity={1.5} />
			<directionalLight position={[4, 6, 5]} intensity={2.4} />
			<CameraRig pose={props.reducedMotion ? contract.reducedMotionPose : pose} />
			<SignalLattice
				reducedMotion={props.reducedMotion}
				onReady={props.onReady}
				theme={resolvedTheme}
				quality={quality}
			/>
		</Canvas>
	);
}
