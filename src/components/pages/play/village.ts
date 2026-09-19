import * as THREE from 'three';
import type { Settlement } from './settlements';
import { groundHeight } from './terrain';

type Part = {
	position: THREE.Vector3;
	scale: THREE.Vector3;
	rotation: number;
	color?: number;
};
export function createVillageKit(
	geometries: Set<THREE.BufferGeometry>,
	materials: Set<THREE.Material>,
) {
	const box = new THREE.BoxGeometry(1, 1, 1);
	geometries.add(box);
	const shape = new THREE.Shape();
	shape.moveTo(-0.5, 0);
	shape.lineTo(0.5, 0);
	shape.lineTo(0, 0.48);
	shape.closePath();
	const roof = new THREE.ExtrudeGeometry(shape, {
		depth: 1,
		bevelEnabled: false,
	});
	roof.translate(0, 0, -0.5);
	geometries.add(roof);
	const material = (color: number) => {
		const m = new THREE.MeshStandardMaterial({
			color,
			roughness: 1,
			flatShading: true,
		});
		materials.add(m);
		return m;
	};
	const wallMat = material(0xffffff),
		roofMat = material(0xffffff),
		baseMat = material(0x9c9987),
		woodMat = material(0x77624d),
		glassMat = material(0x465a57),
		pathMat = material(0xc8bba0);
	const palette = [0xe4d7bb, 0xc7c7b1, 0xd7b89b],
		roofs = [0x9b6451, 0x62726d, 0x7e6557];
	const batch = (
		parts: Part[],
		geometry: THREE.BufferGeometry,
		mat: THREE.Material,
		parent: THREE.Group,
	) => {
		if (!parts.length) return;
		const mesh = new THREE.InstancedMesh(geometry, mat, parts.length),
			dummy = new THREE.Object3D();
		parts.forEach((part, i) => {
			dummy.position.copy(part.position);
			dummy.scale.copy(part.scale);
			dummy.rotation.set(0, part.rotation, 0);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
			if (part.color !== undefined)
				mesh.setColorAt(i, new THREE.Color(part.color));
		});
		parent.add(mesh);
	};
	return (village: Settlement, seed: number) => {
		const group = new THREE.Group();
		group.name = 'village';
		const walls: Part[] = [],
			rooftops: Part[] = [],
			bases: Part[] = [],
			wood: Part[] = [],
			windows: Part[] = [],
			paths: Part[] = [];
		for (const house of village.houses) {
			const part = (
				x: number,
				y: number,
				z: number,
				sx: number,
				sy: number,
				sz: number,
				color?: number,
			): Part => {
				const position = new THREE.Vector3(x, y, z).applyAxisAngle(
					new THREE.Vector3(0, 1, 0),
					house.rotation,
				);
				position.add(new THREE.Vector3(house.x, house.y, house.z));
				return {
					position,
					scale: new THREE.Vector3(sx, sy, sz),
					rotation: house.rotation,
					color,
				};
			};
			const { width: w, depth: d, height: h } = house;
			const foundation = house.y - house.base;
			bases.push(part(0, -foundation / 2, 0, w + 0.15, foundation, d + 0.15));
			walls.push(part(0, h / 2, 0, w, h, d, palette[house.color]));
			rooftops.push(part(0, h, 0, w + 0.55, 2, d + 0.55, roofs[house.color]));
			wood.push(part(0, 0.67, d / 2 + 0.02, 0.7, 1.34, 0.055));
			walls.push(
				part(-w * 0.27, h + 0.55, -0.4, 0.36, 1.2, 0.42, palette[house.color]),
			);
			for (const side of [-1, 1]) {
				windows.push(
					part(side * w * 0.29, h * 0.65, d / 2 + 0.035, 0.48, 0.58, 0.055),
				);
				windows.push(part(side * (w / 2 + 0.025), h * 0.65, 0, 0.055, 0.58, 0.65));
			}
			for (let step = 0; step < 3; step++) {
				const z =
					house.z + (house.rotation === 0 ? 1 : -1) * (d / 2 + step * 0.9 + 0.5);
				paths.push({
					position: new THREE.Vector3(
						house.x,
						groundHeight(house.x, z, seed) + 0.035,
						z,
					),
					scale: new THREE.Vector3(0.95, 0.07, 0.75),
					rotation: 0,
				});
			}
		}
		for (let i = -5; i <= 5; i++) {
			const x = village.x + i * 1.7,
				z = village.z;
			paths.push({
				position: new THREE.Vector3(x, groundHeight(x, z, seed) + 0.035, z),
				scale: new THREE.Vector3(1.7, 0.07, 1.4),
				rotation: 0,
			});
		}
		batch(bases, box, baseMat, group);
		batch(walls, box, wallMat, group);
		batch(rooftops, roof, roofMat, group);
		batch(wood, box, woodMat, group);
		batch(windows, box, glassMat, group);
		batch(paths, box, pathMat, group);
		return group;
	};
}
