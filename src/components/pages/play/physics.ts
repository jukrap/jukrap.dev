export interface FlightState {
	x: number;
	y: number;
	z: number;
	vx: number;
	vy: number;
	vz: number;
	heading: number;
	time: number;
}
export interface FlightInput {
	forward: number;
	right: number;
	lift: number;
	yaw: number;
}
export const initialFlight = (ground = 0): FlightState => ({
	x: 0,
	y: ground + 9,
	z: 0,
	vx: 0,
	vy: 0,
	vz: 0,
	heading: 0,
	time: 0,
});
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export function stepFlight(
	s: FlightState,
	input: FlightInput,
	ground: (x: number, z: number) => number,
	dt: number,
) {
	s.time += dt;
	const length = Math.max(1, Math.hypot(input.forward, input.right));
	const forward = input.forward / length,
		right = input.right / length;
	const ax = (-Math.sin(input.yaw) * forward + Math.cos(input.yaw) * right) * 6;
	const az = (-Math.cos(input.yaw) * forward - Math.sin(input.yaw) * right) * 6;
	s.vx = clamp(s.vx + (ax - s.vx * 0.65) * dt, -9, 9);
	s.vz = clamp(s.vz + (az - s.vz * 0.65) * dt, -9, 9);
	s.vy = clamp(s.vy + (input.lift * 5 - s.vy * 1.5) * dt, -3.8, 3.8);
	const nx = s.x + s.vx * dt,
		nz = s.z + s.vz * dt;
	const floor =
		Math.max(
			ground(nx, nz),
			ground(nx + 0.65, nz),
			ground(nx - 0.65, nz),
			ground(nx, nz + 0.65),
			ground(nx, nz - 0.65),
		) + 0.25;
	if (floor <= s.y + 0.15) {
		s.x = nx;
		s.z = nz;
	} else {
		s.vx *= Math.exp(-8 * dt);
		s.vz *= Math.exp(-8 * dt);
	}
	s.y = clamp(
		s.y + s.vy * dt,
		Math.max(ground(s.x, s.z) + 0.25, floor <= s.y + 0.15 ? floor : 0),
		80,
	);
	if (s.y <= floor + 0.01 && s.vy < 0) s.vy = 0;
	if (s.y >= 80 && s.vy > 0) s.vy = 0;
	if (Math.hypot(s.vx, s.vz) > 0.2) {
		const target = Math.atan2(-s.vx, -s.vz);
		const delta = Math.atan2(
			Math.sin(target - s.heading),
			Math.cos(target - s.heading),
		);
		s.heading += delta * (1 - Math.exp(-dt * 2));
	}
}
