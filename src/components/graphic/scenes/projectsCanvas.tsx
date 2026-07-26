'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	BoxGeometry,
	Color,
	Group,
	MeshBasicMaterial,
	MeshStandardMaterial,
	SRGBColorSpace,
	Texture,
	TextureLoader,
} from 'three';
import { sceneContracts } from '@/data/graphicPortfolio';
import type { ProjectSceneMediaSources } from '@/data/graphicPortfolio';
import { useThemeStore } from '@/store/useThemeStore';
import type { LiveSceneProps } from './sceneBoundary';
import {
	CameraRig,
	SceneFailureFixture,
	RendererLifecycleProbe,
	reportSceneResourceDisposal,
	useScenePresentation,
} from './sceneShared';

interface ProjectsCanvasProps extends LiveSceneProps {
	mediaSources?: ProjectSceneMediaSources;
	rotationStep: number;
}

function Artifact({
	mediaSource,
	rotationStep,
	reducedMotion,
	onReady,
	onFailure,
	theme,
}: Pick<
	ProjectsCanvasProps,
	'rotationStep' | 'reducedMotion' | 'onReady' | 'onFailure'
> & { mediaSource?: string; theme: 'light' | 'dark' }) {
	const group = useRef<Group>(null);
	const { gl, invalidate } = useThree();
	const [texture, setTexture] = useState<Texture>();
	const screenMaterial = useRef<MeshBasicMaterial>(null);
	const committedTexture = useRef<Texture | undefined>(undefined);
	const postUploadFrames = useRef(0);
	const readyReported = useRef(false);
	const onFailureRef = useRef(onFailure);
	useEffect(() => {
		onFailureRef.current = onFailure;
	}, [onFailure]);
	const resources = useMemo(
		() => ({
			body: new BoxGeometry(3.2, 2.05, 0.22),
			plinth: new BoxGeometry(4.6, 0.28, 3.2),
			bodyMaterial: new MeshStandardMaterial({
				color: new Color(theme === 'dark' ? '#272c2f' : '#aeb4b3'),
				roughness: 0.86,
				metalness: 0.08,
			}),
			plinthMaterial: new MeshStandardMaterial({
				color: new Color(theme === 'dark' ? '#202427' : '#c8ccca'),
				roughness: 0.97,
				metalness: 0.02,
			}),
		}),
		[theme],
	);

	useEffect(() => {
		setTexture(undefined);
		if (!mediaSource) return;
		let cancelled = false;
		const loader = new TextureLoader();
		loader.load(
			mediaSource,
			(loaded) => {
				if (cancelled) {
					loaded.dispose();
					return;
				}
				loaded.colorSpace = SRGBColorSpace;
				loaded.needsUpdate = true;
				setTexture(loaded);
			},
			undefined,
			() => onFailureRef.current(),
		);
		return () => {
			cancelled = true;
		};
	}, [mediaSource]);

	useEffect(() => {
		if (!screenMaterial.current) return;
		screenMaterial.current.map = texture ?? null;
		screenMaterial.current.color.set(
			texture ? '#ffffff' : theme === 'dark' ? '#8c9498' : '#707779',
		);
		screenMaterial.current.needsUpdate = true;
		if (texture) {
			texture.needsUpdate = true;
			gl.initTexture(texture);
		}
		postUploadFrames.current = 0;
		readyReported.current = false;
		invalidate();
	}, [gl, invalidate, texture, theme]);
	useEffect(() => () => texture?.dispose(), [texture]);
	useEffect(
		() => () => {
			resources.body.dispose();
			resources.plinth.dispose();
			resources.bodyMaterial.dispose();
			resources.plinthMaterial.dispose();
			reportSceneResourceDisposal();
		},
		[resources],
	);

	useEffect(() => {
		if (!reducedMotion || !group.current) return;
		group.current.rotation.y = -0.32 + rotationStep * 0.22;
		invalidate();
	}, [invalidate, reducedMotion, rotationStep]);

	useFrame(({ invalidate: invalidateFrame }) => {
		if (!group.current) return;
		const target = -0.32 + rotationStep * 0.22;
		const difference = target - group.current.rotation.y;
		if (reducedMotion) group.current.rotation.y = target;
		else group.current.rotation.y += difference * 0.08;
		if (!reducedMotion && Math.abs(difference) > 0.001) invalidateFrame();

		if (!mediaSource) {
			if (!readyReported.current) {
				readyReported.current = true;
				onReady();
			}
			return;
		}
		if (!texture) return;
		if (committedTexture.current !== texture) {
			committedTexture.current = texture;
			postUploadFrames.current = 0;
		}
		postUploadFrames.current += 1;
		if (postUploadFrames.current < 3) {
			invalidateFrame();
			return;
		}
		if (!readyReported.current) {
			readyReported.current = true;
			onReady();
		}
	});

	return (
		<group position={[0, -0.28, 0]}>
			<mesh
				position={[0, -1.22, 0]}
				geometry={resources.plinth}
				material={resources.plinthMaterial}
			/>
			<group ref={group} rotation={[-0.08, -0.32, 0]}>
				<mesh geometry={resources.body} material={resources.bodyMaterial} />
				<mesh position={[0, 0, 0.116]} scale={[0.94, 0.9, 1]}>
					<planeGeometry args={[3.2, 2.05]} />
					<meshBasicMaterial
						ref={screenMaterial}
						color={texture ? '#ffffff' : theme === 'dark' ? '#8c9498' : '#707779'}
						map={texture ?? null}
						toneMapped={false}
					/>
				</mesh>
			</group>
		</group>
	);
}

export default function ProjectsCanvas({
	mediaSources,
	rotationStep,
	...props
}: ProjectsCanvasProps) {
	const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
	const contract = sceneContracts.projects;
	const { dpr, pose, tier, viewportTier, quality } =
		useScenePresentation(contract);
	const mediaSource =
		viewportTier === 'mobile' ? mediaSources?.mobile : mediaSources?.desktop;
	return (
		<Canvas
			key={props.recoveryKey}
			className="graphic-scene-canvas"
			data-scene-dpr={dpr}
			data-scene-camera-tier={tier}
			data-scene-quality={quality}
			data-scene-media-tier={viewportTier}
			data-scene-media={mediaSource}
			aria-hidden="true"
			dpr={[1, dpr]}
			frameloop="demand"
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
			<directionalLight position={[4, 7, 6]} intensity={2.9} />
			<CameraRig pose={props.reducedMotion ? contract.reducedMotionPose : pose} />
			<Artifact
				mediaSource={mediaSource}
				rotationStep={rotationStep}
				reducedMotion={props.reducedMotion}
				onReady={props.onReady}
				onFailure={props.onFailure}
				theme={resolvedTheme}
			/>
		</Canvas>
	);
}
