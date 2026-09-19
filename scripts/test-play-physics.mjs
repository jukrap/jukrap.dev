import assert from 'node:assert/strict';
import {
	initialFlight,
	stepFlight,
} from '../src/components/pages/play/physics.ts';
import {
	terrainHeight,
	groundHeight,
	CHUNK_SIZE,
} from '../src/components/pages/play/terrain.ts';
const seed = 731826;
const ground = (x, z) => groundHeight(x, z, seed);
const state = initialFlight(ground(0, 0));
for (let frame = 0; frame < 36000; frame++) {
	const input = {
		forward: 1,
		right: Math.sin(frame / 300),
		lift: frame % 2400 < 1200 ? 1 : -1,
		yaw: frame / 2400,
	};
	stepFlight(state, input, ground, 1 / 60);
	assert(Object.values(state).every(Number.isFinite));
	assert(state.y >= ground(state.x, state.z) + 0.249999);
	assert(state.y <= 80);
	assert(Math.hypot(state.vx, state.vz) <= Math.sqrt(162) + 0.001);
}
const traveler = initialFlight();
for (let frame = 0; frame < 12000; frame++)
	stepFlight(
		traveler,
		{ forward: 1, right: 0, lift: 0, yaw: 0 },
		() => 0,
		1 / 60,
	);
assert(
	traveler.z < -1500,
	'free travel must not stop at the old island boundary',
);
const landing = initialFlight();
for (let frame = 0; frame < 1200; frame++)
	stepFlight(
		landing,
		{ forward: 0, right: 0, lift: -1, yaw: 0 },
		() => 0,
		1 / 60,
	);
assert.equal(landing.y, 0.25);
for (let frame = 0; frame < 300; frame++)
	stepFlight(
		landing,
		{ forward: 0, right: 0, lift: 1, yaw: 0 },
		() => 0,
		1 / 60,
	);
assert(landing.y > 10);
for (let cell = -12; cell < 12; cell++) {
	const boundary = cell * CHUNK_SIZE;
	assert(
		Math.abs(ground(boundary - 0.00001, 13) - ground(boundary + 0.00001, 13)) <
			0.001,
		'no terrain seams',
	);
	assert.equal(
		terrainHeight(boundary, 30, seed),
		terrainHeight(boundary, 30, seed),
	);
}
assert.notEqual(terrainHeight(55, 90, seed), terrainHeight(55, 90, seed + 1));
console.log(
	'PASS: ten-minute 3D flight, terrain contact, 1.5km travel, descent/lift-off, chunk seams and seed variation',
);
