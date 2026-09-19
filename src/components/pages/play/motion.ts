import type { FlightState } from './physics';

/** Render between completed physics steps without changing simulation state. */
export function interpolateFlight(
	previous: FlightState,
	current: FlightState,
	alpha: number,
	out: FlightState,
) {
	const t = Math.max(0, Math.min(1, alpha));
	out.x = previous.x + (current.x - previous.x) * t;
	out.y = previous.y + (current.y - previous.y) * t;
	out.z = previous.z + (current.z - previous.z) * t;
	out.vx = previous.vx + (current.vx - previous.vx) * t;
	out.vy = previous.vy + (current.vy - previous.vy) * t;
	out.vz = previous.vz + (current.vz - previous.vz) * t;
	out.time = previous.time + (current.time - previous.time) * t;
	const angle = Math.atan2(
		Math.sin(current.heading - previous.heading),
		Math.cos(current.heading - previous.heading),
	);
	out.heading = previous.heading + angle * t;
	return out;
}
