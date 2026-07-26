export interface PrivateDocumentEnvironment {
	nodeEnv?: string;
	vercel?: string;
	enabled?: string;
	email?: string;
	phone?: string;
}

export const isPrivateDocumentRequestHost = (host: string | null): boolean => {
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
};

export const canAccessPrivateDocument = ({
	locale,
	host,
	environment,
}: {
	locale: string;
	host: string | null;
	environment: PrivateDocumentEnvironment;
}): boolean =>
	locale === 'ko' &&
	isPrivateDocumentRequestHost(host) &&
	environment.nodeEnv !== 'production' &&
	!environment.vercel &&
	environment.enabled === 'true' &&
	Boolean(environment.email) &&
	Boolean(environment.phone);
