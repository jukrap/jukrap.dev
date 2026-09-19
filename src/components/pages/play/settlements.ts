import { CHUNK_SIZE, groundHeight, hash2 } from './terrain';

export interface Cottage {
	x: number;
	z: number;
	y: number;
	base: number;
	width: number;
	depth: number;
	height: number;
	rotation: number;
	color: number;
}
export interface Settlement {
	x: number;
	z: number;
	houses: Cottage[];
}

export function getSettlement(
	cx: number,
	cz: number,
	seed: number,
): Settlement | null {
	if ((cx !== 0 || cz !== 0) && hash2(cx, cz, seed + 417) > 0.22) return null;
	for (let candidate = 0; candidate < 4; candidate++) {
		const x =
			(cx + 0.3 + hash2(cx + candidate, cz, seed + 88) * 0.4) * CHUNK_SIZE;
		const z =
			(cz + 0.3 + hash2(cx, cz + candidate, seed + 89) * 0.4) * CHUNK_SIZE;
		const houses: Cottage[] = [];
		const count = 3 + Math.floor(hash2(cx, cz, seed + 52) * 4);
		for (let i = 0; i < count; i++) {
			const hx = x + (Math.floor(i / 2) - 1) * 7.2,
				hz = z + (i % 2 === 0 ? -5 : 5);
			const width = 2.8 + hash2(cx + i, cz, seed + 7) * 0.8,
				depth = 3.4;
			const heights = [
				[-width / 2, -depth / 2],
				[width / 2, -depth / 2],
				[-width / 2, depth / 2],
				[width / 2, depth / 2],
				[0, 0],
			].map(([dx, dz]) => groundHeight(hx + dx, hz + dz, seed));
			const low = Math.min(...heights),
				high = Math.max(...heights);
			if (low < 1.8 || high - low > 1.3) continue;
			houses.push({
				x: hx,
				z: hz,
				y: high + 0.12,
				base: low - 0.15,
				width,
				depth,
				height: 2.1 + hash2(i, cx, seed + 12) * 0.55,
				rotation: i % 2 === 0 ? 0 : Math.PI,
				color: Math.floor(hash2(i, cz, seed + 17) * 3),
			});
		}
		if (houses.length >= 3) return { x, z, houses };
	}
	return null;
}
