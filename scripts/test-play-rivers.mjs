import assert from 'node:assert/strict';
import {
	riverChannel,
	riverCoordinates,
	terrainHeight,
	groundHeight,
} from '../src/components/pages/play/terrain.ts';
let samples = 0;
const directions = new Set();
for (let seed = 1; seed <= 100; seed++) {
	const axis = riverCoordinates(0, 1, seed);
	directions.add(Math.atan2(axis.x, axis.z).toFixed(2));
	for (let lane = -3; lane <= 3; lane++)
		for (let along = -600; along <= 600; along += 24) {
			const river = riverChannel(lane, along, seed);
			const point = riverCoordinates(river.center, along, seed);
			assert(terrainHeight(point.x, point.z, seed) < -0.5, 'continuous riverbed');
			assert(
				groundHeight(point.x, point.z, seed) < 0.05,
				'rendered triangles leave an open water channel',
			);
			const shore = riverCoordinates(
				river.center + river.halfWidth + 24,
				along,
				seed,
			);
			assert(
				terrainHeight(shore.x, shore.z, seed) > 0,
				'dry bank outside channel',
			);
			samples++;
		}
}
assert(directions.size > 70, 'landscapes vary river direction');
const original = riverChannel(2, 47, 123);
riverChannel(0, 0, 456);
assert.deepEqual(
	riverChannel(2, 47, 123),
	original,
	'seed cache cannot alter revisited terrain',
);
console.log(
	JSON.stringify({
		samples,
		directions: directions.size,
		continuous: true,
		visibleWater: true,
		dryBanks: true,
	}),
);
