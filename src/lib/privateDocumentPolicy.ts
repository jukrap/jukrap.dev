export interface PrivateDocumentRuntimePolicy {
	nodeEnv?: string;
	vercel?: string;
	enabled?: string;
	host?: string | null;
	locale?: string;
	email?: string;
	phone?: string;
}

export function isLocalPrivateDocumentHost(host: string | null): boolean {
	if (!host) return false;
	const normalizedHost = host.toLowerCase();
	return (
		normalizedHost === 'localhost' ||
		normalizedHost.startsWith('localhost:') ||
		normalizedHost === '127.0.0.1' ||
		normalizedHost.startsWith('127.0.0.1:') ||
		normalizedHost === '[::1]' ||
		normalizedHost.startsWith('[::1]:')
	);
}

export function canAccessPrivateDocument(
	policy: PrivateDocumentRuntimePolicy,
): boolean {
	const production = policy.nodeEnv === 'production' || Boolean(policy.vercel);
	return (
		!production &&
		policy.enabled === 'true' &&
		policy.locale === 'ko' &&
		isLocalPrivateDocumentHost(policy.host ?? null) &&
		Boolean(policy.email) &&
		Boolean(policy.phone)
	);
}
