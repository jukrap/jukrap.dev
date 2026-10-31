import manifest from './generated/career-public.json';

interface PublicSnapshot {
	schemaVersion: number;
	revision: string;
	values: object;
	calls: object;
}

export const publicCareerRevision = manifest.revision;

function assertSnapshot(snapshot: PublicSnapshot) {
	if (
		snapshot.schemaVersion !== 1 ||
		snapshot.revision !== publicCareerRevision
	) {
		throw new Error('Public career content belongs to a different release.');
	}
}

export function readCareerValue<T>(snapshot: PublicSnapshot, name: string): T {
	assertSnapshot(snapshot);
	if (!Object.hasOwn(snapshot.values, name)) {
		throw new Error(`Unknown public career value: ${name}`);
	}
	return (snapshot.values as Record<string, unknown>)[name] as T;
}

export function readCareerCall<T>(
	snapshot: PublicSnapshot,
	name: string,
	key: string,
): T {
	assertSnapshot(snapshot);
	const values = (snapshot.calls as Record<string, Record<string, unknown>>)[
		name
	];
	if (!values || !Object.hasOwn(values, key)) {
		throw new Error(`Unknown public career selection: ${name}/${key}`);
	}
	return values[key] as T;
}
