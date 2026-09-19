import assert from 'node:assert/strict';
import { initialFlight } from '../src/components/pages/play/physics.ts';
import { interpolateFlight } from '../src/components/pages/play/motion.ts';

const measurements = [];
for (const hz of [30, 60, 120, 144, 165]) {
	const current = initialFlight(),
		previous = { ...current },
		pose = { ...current };
	let accumulator = 0,
		lastRaw = 0,
		lastSmooth = 0;
	const rawSpeeds = [],
		smoothSpeeds = [];
	for (let frame = 0; frame < 1200; frame++) {
		const dt = (frame % 2 ? 0.9 : 1.1) / hz;
		accumulator += dt;
		while (accumulator >= 1 / 60) {
			Object.assign(previous, current);
			current.x += 9 / 60;
			current.time += 1 / 60;
			accumulator -= 1 / 60;
		}
		interpolateFlight(previous, current, accumulator * 60, pose);
		if (frame > 10) {
			rawSpeeds.push((current.x - lastRaw) / dt);
			smoothSpeeds.push((pose.x - lastSmooth) / dt);
		}
		lastRaw = current.x;
		lastSmooth = pose.x;
	}
	const spread = (values) => Math.max(...values) - Math.min(...values);
	assert(
		spread(smoothSpeeds) < 1e-8,
		'steady motion must remain steady between physics steps',
	);
	const before = { ...pose },
		simulation = { ...current };
	interpolateFlight(previous, current, accumulator * 60, pose);
	assert.deepEqual(pose, before, 'pause/redraw must retain the displayed pose');
	assert.deepEqual(
		current,
		simulation,
		'render interpolation must not mutate physics',
	);
	measurements.push({
		hz,
		rawSpeedRange: spread(rawSpeeds),
		interpolatedSpeedRange: spread(smoothSpeeds),
	});
}
const a = { ...initialFlight(), heading: Math.PI - 0.01 },
	b = { ...a, heading: -Math.PI + 0.01 },
	out = { ...a };
interpolateFlight(a, b, 0.5, out);
assert(
	Math.abs(out.heading - Math.PI) < 1e-8,
	'heading interpolation takes the short path',
);
console.log(JSON.stringify(measurements, null, 2));
