export const CHUNK_SIZE = 48;
export const GRID_STEPS = 16;
export function hash2(x: number, z: number, seed: number) {
	let h = Math.imul(x ^ seed, 374761393) ^ Math.imul(z, 668265263);
	h = Math.imul(h ^ (h >>> 13), 1274126177);
	return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
const smooth = (x: number) => x * x * (3 - 2 * x);
function noise(x: number, z: number, seed: number) {
	const ix = Math.floor(x),
		iz = Math.floor(z),
		fx = smooth(x - ix),
		fz = smooth(z - iz);
	const a = hash2(ix, iz, seed) * (1 - fx) + hash2(ix + 1, iz, seed) * fx;
	const b =
		hash2(ix, iz + 1, seed) * (1 - fx) + hash2(ix + 1, iz + 1, seed) * fx;
	return a * (1 - fz) + b * fz;
}
let riverConfig:
	| { seed: number; sin: number; cos: number; spacing: number }
	| undefined;
function riverSettings(seed: number) {
	if (riverConfig?.seed !== seed) {
		const angle = hash2(81, 17, seed) * Math.PI;
		riverConfig = {
			seed,
			sin: Math.sin(angle),
			cos: Math.cos(angle),
			spacing: 170 + hash2(32, 9, seed) * 90,
		};
	}
	return riverConfig;
}
export function riverChannel(lane: number, along: number, seed: number) {
	const config = riverSettings(seed);
	const phase = hash2(lane, 11, seed) * Math.PI * 2;
	const amplitude = 12 + hash2(lane, 27, seed) * 15;
	const wavelength = 55 + hash2(lane, 41, seed) * 50;
	return {
		center:
			lane * config.spacing +
			Math.sin(along / wavelength + phase) * amplitude +
			Math.sin(along / 170 + phase * 0.7) * 12,
		halfWidth:
			3.5 + hash2(lane, 63, seed) * 2.5 + (Math.sin(along / 90 + phase) + 1) * 0.7,
	};
}
export function riverCoordinates(across: number, along: number, seed: number) {
	const { sin, cos } = riverSettings(seed);
	return { x: across * cos + along * sin, z: -across * sin + along * cos };
}
export function terrainHeight(x: number, z: number, seed: number) {
	const { sin, cos, spacing } = riverSettings(seed);
	const across = x * cos - z * sin,
		along = x * sin + z * cos;
	const nearest = Math.round(across / spacing);
	let bank = Infinity;
	for (let lane = nearest - 1; lane <= nearest + 1; lane++) {
		const channel = riverChannel(lane, along, seed);
		bank = Math.min(bank, Math.abs(across - channel.center) - channel.halfWidth);
	}
	const hills =
		noise(x / 85, z / 85, seed) * 17 + noise(x / 28, z / 28, seed + 31) * 3;
	const blend = smooth(Math.min(1, Math.max(0, bank / 19)));
	return -1.5 + (hills + 2) * blend;
}
// Match the rendered triangle surface at landing, including negative coordinates.
export function groundHeight(x: number, z: number, seed: number) {
	const cell = CHUNK_SIZE / GRID_STEPS;
	const sx = Math.floor(x / cell) * cell,
		sz = Math.floor(z / cell) * cell;
	const u = (x - sx) / cell,
		v = (z - sz) / cell;
	const a = terrainHeight(sx, sz, seed),
		b = terrainHeight(sx + cell, sz, seed);
	const c = terrainHeight(sx, sz + cell, seed),
		d = terrainHeight(sx + cell, sz + cell, seed);
	return Math.max(
		0,
		u + v <= 1
			? a + (b - a) * u + (c - a) * v
			: d + (c - d) * (1 - u) + (b - d) * (1 - v),
	);
}
