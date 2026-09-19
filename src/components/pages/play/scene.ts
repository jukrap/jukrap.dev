import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { initialFlight, stepFlight, type FlightInput } from './physics';
import { getSettlement } from './settlements';
import { createVillageKit } from './village';
import { interpolateFlight } from './motion';
import {
	CHUNK_SIZE,
	GRID_STEPS,
	terrainHeight,
	groundHeight,
	hash2,
} from './terrain';

export interface FlightScene {
	ready: Promise<void>;
	input: (key: string, down: boolean) => void;
	clearInput: () => void;
	orbit: (dx: number, dy: number) => void;
	zoom: (delta: number) => void;
	setPaused: (paused: boolean) => void;
	setVisible: (visible: boolean) => void;
	setDark: (dark: boolean) => void;
	reset: (newWorld?: boolean) => void;
	dispose: () => void;
}
export function createFlightScene(
	canvas: HTMLCanvasElement,
	dark: boolean,
	onFailure: () => void,
): FlightScene {
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		powerPreference: 'low-power',
	});
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.05;
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 230);
	const hemi = new THREE.HemisphereLight(0xf1f4ed, 0x647852, 2.3);
	scene.add(hemi);
	const sun = new THREE.DirectionalLight(0xffedcf, 2.7);
	sun.position.set(-30, 70, 25);
	scene.add(sun);
	const fill = new THREE.DirectionalLight(0xd0e3ff, 0.7);
	fill.position.set(30, 20, -20);
	scene.add(fill);
	let seed = crypto.getRandomValues(new Uint32Array(1))[0];
	let state = initialFlight(groundHeight(0, 0, seed));
	const previous = { ...state },
		pose = { ...state };
	let yaw = 2.55,
		pitch = 0.26,
		distance = 17;
	let paused = true,
		visible = true,
		disposed = false,
		failed = false,
		loaded = false;
	let frame = 0,
		last = 0,
		accumulated = 0,
		nextRender = 0,
		interval = 0;
	let chunkX = Infinity,
		chunkZ = Infinity;
	const keys = new Set<string>();
	const abort = new AbortController();
	const geo = new Set<THREE.BufferGeometry>();
	const materials = new Set<THREE.Material>();
	const makeVillage = createVillageKit(geo, materials);
	const mat = (color: number) => {
		const m = new THREE.MeshStandardMaterial({
			color,
			roughness: 1,
			flatShading: true,
		});
		materials.add(m);
		return m;
	};
	const terrainMat = new THREE.MeshStandardMaterial({
		vertexColors: true,
		roughness: 1,
		flatShading: true,
	});
	materials.add(terrainMat);
	const bark = mat(0x735e46),
		leaves = mat(0x597759),
		rocks = mat(0x8c9487),
		cloudMat = mat(0xf4f1e7);
	const trunkGeo = new THREE.CylinderGeometry(0.18, 0.3, 2, 5);
	geo.add(trunkGeo);
	const crownGeo = new THREE.ConeGeometry(1.25, 3.8, 6);
	geo.add(crownGeo);
	const rockGeo = new THREE.IcosahedronGeometry(1, 0);
	geo.add(rockGeo);
	const chunks = new Map<string, THREE.Group>();
	let pendingChunks: [number, number][] = [];
	const dummy = new THREE.Object3D();
	const landColor = new THREE.Color(),
		colorA = new THREE.Color(0x98af7c),
		colorB = new THREE.Color(0x718d68),
		sand = new THREE.Color(0xc8b98c);
	const makeChunk = (cx: number, cz: number) => {
		const group = new THREE.Group();
		const settlement = getSettlement(cx, cz, seed);
		if (settlement) group.add(makeVillage(settlement, seed));
		const pos: number[] = [],
			colors: number[] = [];
		const step = CHUNK_SIZE / GRID_STEPS;
		const add = (x: number, z: number) => {
			const h = terrainHeight(x, z, seed);
			pos.push(x, h, z);
			landColor.copy(colorA).lerp(colorB, Math.min(1, h / 22));
			if (h < 1.4) landColor.lerp(sand, 0.8);
			colors.push(landColor.r, landColor.g, landColor.b);
		};
		for (let x = 0; x < GRID_STEPS; x++)
			for (let z = 0; z < GRID_STEPS; z++) {
				const ax = cx * CHUNK_SIZE + x * step,
					az = cz * CHUNK_SIZE + z * step;
				add(ax, az);
				add(ax, az + step);
				add(ax + step, az);
				add(ax + step, az);
				add(ax, az + step);
				add(ax + step, az + step);
			}
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
		geometry.computeVertexNormals();
		group.add(new THREE.Mesh(geometry, terrainMat));
		const count = 18;
		const trunks = new THREE.InstancedMesh(trunkGeo, bark, count);
		const crowns = new THREE.InstancedMesh(crownGeo, leaves, count);
		const stones = new THREE.InstancedMesh(rockGeo, rocks, 7);
		let treeIndex = 0,
			rockIndex = 0;
		for (let i = 0; i < count; i++) {
			const x = (cx + hash2(cx * 43 + i, cz, seed + 1)) * CHUNK_SIZE;
			const z = (cz + hash2(cx, cz * 43 + i, seed + 2)) * CHUNK_SIZE;
			const y = groundHeight(x, z, seed);
			if (y < 1.8) continue;
			if (
				settlement &&
				Math.abs(x - settlement.x) < 18 &&
				Math.abs(z - settlement.z) < 14
			)
				continue;
			const size = 0.65 + hash2(cx + i, cz - i, seed) * 1.25;
			dummy.position.set(x, y + size, z);
			dummy.scale.setScalar(size);
			dummy.rotation.set(0, 0, 0);
			dummy.updateMatrix();
			trunks.setMatrixAt(treeIndex, dummy.matrix);
			dummy.position.y = y + size * 3;
			dummy.rotation.y = hash2(i, cx, seed) * 6;
			dummy.updateMatrix();
			crowns.setMatrixAt(treeIndex++, dummy.matrix);
			if (i % 2 === 0 && rockIndex < 7) {
				dummy.position.set(x + 2, y + 0.3, z + 2);
				dummy.scale.set(size * 0.9, size * 0.6, size);
				dummy.updateMatrix();
				stones.setMatrixAt(rockIndex++, dummy.matrix);
			}
		}
		trunks.count = treeIndex;
		crowns.count = treeIndex;
		stones.count = rockIndex;
		group.add(trunks, crowns, stones);
		chunks.set(cx + ',' + cz, group);
		scene.add(group);
	};
	const removeChunk = (key: string, group: THREE.Group) => {
		scene.remove(group);
		group.traverse((object) => {
			if (object instanceof THREE.InstancedMesh) object.dispose();
			else if (object instanceof THREE.Mesh) object.geometry.dispose();
		});
		chunks.delete(key);
	};
	const updateWorld = (force = false) => {
		const cx = Math.floor(state.x / CHUNK_SIZE),
			cz = Math.floor(state.z / CHUNK_SIZE);
		if (!force && cx === chunkX && cz === chunkZ) return;
		chunkX = cx;
		chunkZ = cz;
		const required = new Set<string>();
		for (let x = cx - 3; x <= cx + 3; x++)
			for (let z = cz - 3; z <= cz + 3; z++) {
				const key = x + ',' + z;
				required.add(key);
				if (!chunks.has(key) && force) makeChunk(x, z);
			}
		for (const [key, group] of chunks)
			if (!required.has(key)) removeChunk(key, group);
		pendingChunks = [];
		if (!force) {
			for (let x = cx - 3; x <= cx + 3; x++)
				for (let z = cz - 3; z <= cz + 3; z++) {
					if (!chunks.has(x + ',' + z)) pendingChunks.push([x, z]);
				}
			pendingChunks.sort(
				(a, b) =>
					Math.hypot(a[0] - cx, a[1] - cz) - Math.hypot(b[0] - cx, b[1] - cz),
			);
		}
	};
	const waterMat = mat(0x6babb7);
	const waterGeo = new THREE.PlaneGeometry(600, 600);
	geo.add(waterGeo);
	const water = new THREE.Mesh(waterGeo, waterMat);
	water.rotation.x = -Math.PI / 2;
	water.position.y = -0.04;
	scene.add(water);
	const balloon = new THREE.Group();
	scene.add(balloon);
	const lean = new THREE.Group();
	balloon.add(lean);
	const modelMount = new THREE.Group();
	lean.add(modelMount);
	const shadowMat = new THREE.MeshBasicMaterial({
		color: 0x344d3d,
		transparent: true,
		opacity: 0.13,
		depthWrite: false,
	});
	materials.add(shadowMat);
	const shadowGeo = new THREE.CircleGeometry(1.65, 24);
	geo.add(shadowGeo);
	const shadow = new THREE.Mesh(shadowGeo, shadowMat);
	shadow.rotation.x = -Math.PI / 2;
	scene.add(shadow);
	const clouds: THREE.Group[] = [];
	const cloudGeo = new THREE.IcosahedronGeometry(1, 1);
	geo.add(cloudGeo);
	for (let i = 0; i < 16; i++) {
		const cloud = new THREE.Group();
		scene.add(cloud);
		clouds.push(cloud);
		for (const [x, y, s] of [
			[-2, 0, 2],
			[0, 0.5, 2.8],
			[2.3, 0.1, 1.8],
		]) {
			const puff = new THREE.Mesh(cloudGeo, cloudMat);
			puff.position.set(x, y, 0);
			puff.scale.set(s, s * 0.6, s * 0.75);
			cloud.add(puff);
		}
	}
	let model: THREE.Object3D | undefined;
	const disposeModel = (root: THREE.Object3D) => {
		const textures = new Set<THREE.Texture>(),
			mats = new Set<THREE.Material>(),
			geoms = new Set<THREE.BufferGeometry>();
		root.traverse((o) => {
			if (o instanceof THREE.Mesh) {
				geoms.add(o.geometry);
				for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
					mats.add(m);
					for (const value of Object.values(m))
						if (value instanceof THREE.Texture) textures.add(value);
				}
			}
		});
		textures.forEach((t) => {
			const data = t.source.data;
			if (typeof ImageBitmap !== 'undefined' && data instanceof ImageBitmap)
				data.close();
			t.dispose();
		});
		mats.forEach((m) => m.dispose());
		geoms.forEach((g) => g.dispose());
	};
	const ready = fetch('/models/doge-balloon/balloon.glb', {
		signal: abort.signal,
	})
		.then((r) => {
			if (!r.ok) throw new Error('Balloon unavailable');
			return r.arrayBuffer();
		})
		.then((buffer) => new GLTFLoader().parseAsync(buffer, ''))
		.then((gltf) => {
			if (disposed) {
				disposeModel(gltf.scene);
				return;
			}
			model = gltf.scene;
			const box = new THREE.Box3().setFromObject(model),
				size = box.getSize(new THREE.Vector3()),
				center = box.getCenter(new THREE.Vector3());
			const scale = 5.5 / size.y;
			model.scale.multiplyScalar(scale);
			model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
			modelMount.add(model);
			modelMount.rotation.y = Math.PI;
			model.traverse((o) => {
				if (o instanceof THREE.Mesh) {
					const list = Array.isArray(o.material) ? o.material : [o.material];
					for (const m of list) {
						if (m instanceof THREE.MeshStandardMaterial) {
							m.metalness = 0;
							m.roughness = 0.85;
						}
					}
				}
			});
			loaded = true;
			render();
			sync();
		});
	const target = new THREE.Vector3(),
		desired = new THREE.Vector3(),
		cameraOffset = new THREE.Vector3(),
		desiredOffset = new THREE.Vector3();
	const clearInput = () => keys.clear();
	const apply = (dt: number, snap = false) => {
		balloon.position.set(pose.x, pose.y, pose.z);
		balloon.rotation.y = pose.heading;
		lean.rotation.z = THREE.MathUtils.clamp(pose.vx * 0.012, -0.12, 0.12);
		lean.rotation.x = THREE.MathUtils.clamp(-pose.vz * 0.012, -0.12, 0.12);
		target.set(pose.x, pose.y + 2.7, pose.z);
		const away = distance * Math.cos(pitch);
		desired.set(
			target.x + Math.sin(yaw) * away,
			target.y + Math.sin(pitch) * distance,
			target.z + Math.cos(yaw) * away,
		);
		desired.y = Math.max(desired.y, groundHeight(desired.x, desired.z, seed) + 2);
		for (let t = 0.2; t < 1; t += 0.2) {
			const x = THREE.MathUtils.lerp(target.x, desired.x, t);
			const z = THREE.MathUtils.lerp(target.z, desired.z, t);
			const clearance = groundHeight(x, z, seed) + 1;
			const rayHeight = THREE.MathUtils.lerp(target.y, desired.y, t);
			if (clearance > rayHeight) desired.y += (clearance - rayHeight) / t;
		}
		// Follow one interpolated anchor. Only orbit/clearance offset is damped;
		// lagging world position against an immediate lookAt caused relative shaking.
		desiredOffset.copy(desired).sub(target);
		if (snap) cameraOffset.copy(desiredOffset);
		else cameraOffset.lerp(desiredOffset, 1 - Math.exp(-dt * 8));
		camera.position.copy(target).add(cameraOffset);
		camera.lookAt(target);
		water.position.x = pose.x;
		water.position.z = pose.z;
		const ground = groundHeight(pose.x, pose.z, seed);
		shadow.position.set(pose.x, ground + 0.04, pose.z);
		shadowMat.opacity = 0.15 / (1 + (pose.y - ground) * 0.08);
		clouds.forEach((cloud, i) => {
			const range = 200;
			const originX = hash2(i, 1, seed) * range - range / 2;
			const originZ = hash2(i, 2, seed) * range - range / 2;
			cloud.position.set(
				pose.x +
					((((originX + pose.time * 0.15 - pose.x) % range) + range * 1.5) % range) -
					range / 2,
				36 + hash2(i, 3, seed) * 24,
				pose.z + ((((originZ - pose.z) % range) + range * 1.5) % range) - range / 2,
			);
		});
	};
	const render = () => {
		if (!disposed && !failed) renderer.render(scene, camera);
	};
	const running = () =>
		!disposed && !failed && loaded && !paused && visible && !document.hidden;
	const tick = (now: number) => {
		frame = 0;
		if (!running()) return;
		if (interval > 0 && now < nextRender) {
			frame = requestAnimationFrame(tick);
			return;
		}
		nextRender =
			interval > 0 ? now + interval - ((now - nextRender) % interval) : 0;
		const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
		last = now;
		accumulated += dt;
		const input: FlightInput = {
			forward: Number(keys.has('forward')) - Number(keys.has('back')),
			right: Number(keys.has('right')) - Number(keys.has('left')),
			lift: Number(keys.has('up')) - Number(keys.has('down')),
			yaw,
		};
		while (accumulated >= 1 / 60) {
			Object.assign(previous, state);
			stepFlight(state, input, (x, z) => groundHeight(x, z, seed), 1 / 60);
			accumulated -= 1 / 60;
		}
		updateWorld();
		interpolateFlight(previous, state, accumulated * 60, pose);
		apply(dt);
		render();
		// New chunks are beyond the fog: build at most one per rendered frame.
		const next = pendingChunks.shift();
		if (next) makeChunk(next[0], next[1]);
		if (running()) frame = requestAnimationFrame(tick);
	};
	function sync() {
		cancelAnimationFrame(frame);
		frame = 0;
		last = 0;
		nextRender = 0;
		if (running()) frame = requestAnimationFrame(tick);
	}
	const setDark = (isDark: boolean) => {
		const sky = isDark ? 0x263844 : 0xc8dce0;
		scene.background = new THREE.Color(sky);
		scene.fog = new THREE.Fog(sky, 45, 105);
		hemi.intensity = isDark ? 1.25 : 2.3;
		sun.intensity = isDark ? 1.25 : 2.7;
		sun.color.setHex(isDark ? 0xd7e1ff : 0xffedcf);
		cloudMat.color.setHex(isDark ? 0x738796 : 0xf4f1e7);
		waterMat.color.setHex(isDark ? 0x356775 : 0x6babb7);
		render();
	};
	const resize = () => {
		const w = Math.max(1, canvas.clientWidth),
			h = Math.max(1, canvas.clientHeight);
		camera.aspect = w / h;
		camera.fov = w / h < 1 ? 62 : 48;
		camera.updateProjectionMatrix();
		interval = w < 768 ? 1000 / 30 : 0;
		renderer.setPixelRatio(Math.min(devicePixelRatio, w < 768 ? 1.5 : 2));
		renderer.setSize(w, h, false);
		apply(0, true);
		render();
	};
	const observer = new ResizeObserver(resize);
	observer.observe(canvas);
	const hidden = () => {
		if (document.hidden) clearInput();
		sync();
	};
	const lost = (e: Event) => {
		e.preventDefault();
		failed = true;
		clearInput();
		sync();
		onFailure();
	};
	document.addEventListener('visibilitychange', hidden);
	canvas.addEventListener('webglcontextlost', lost);
	updateWorld(true);
	apply(0, true);
	setDark(dark);
	resize();
	return {
		ready,
		input(key, down) {
			if (!running()) return;
			if (down) keys.add(key);
			else keys.delete(key);
		},
		clearInput,
		orbit(dx, dy) {
			yaw -= dx * 0.006;
			pitch = THREE.MathUtils.clamp(pitch + dy * 0.004, -0.15, 1.1);
			if (!running()) {
				apply(0, true);
				render();
			}
		},
		zoom(delta) {
			distance = THREE.MathUtils.clamp(distance + delta * 0.012, 9, 32);
			if (!running()) {
				apply(0, true);
				render();
			}
		},
		setPaused(next) {
			paused = next;
			if (next) clearInput();
			sync();
		},
		setVisible(next) {
			visible = next;
			if (!next) clearInput();
			sync();
		},
		setDark,
		reset(newWorld = false) {
			clearInput();
			if (newWorld) {
				seed = crypto.getRandomValues(new Uint32Array(1))[0];
				for (const [key, group] of chunks) removeChunk(key, group);
			}
			state = initialFlight(groundHeight(0, 0, seed));
			Object.assign(previous, state);
			Object.assign(pose, state);
			accumulated = 0;
			yaw = 2.55;
			pitch = 0.26;
			distance = 17;
			updateWorld(true);
			apply(0, true);
			render();
			sync();
		},
		dispose() {
			disposed = true;
			abort.abort();
			cancelAnimationFrame(frame);
			observer.disconnect();
			document.removeEventListener('visibilitychange', hidden);
			canvas.removeEventListener('webglcontextlost', lost);
			for (const [key, group] of chunks) removeChunk(key, group);
			if (model) disposeModel(model);
			geo.forEach((g) => g.dispose());
			materials.forEach((m) => m.dispose());
			renderer.dispose();
			renderer.forceContextLoss();
		},
	};
}
