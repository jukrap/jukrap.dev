import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
	async headers() {
		const privateDocumentHeaders = [
			{
				key: 'X-Robots-Tag',
				value: 'noindex, nofollow, noarchive',
			},
		];

		return [
			{
				source: '/:locale/resume',
				headers: privateDocumentHeaders,
			},
			{
				source: '/:locale/career-brief',
				headers: privateDocumentHeaders,
			},
			...['portfolio', 'resume', 'career-brief'].flatMap((documentId) =>
				['ko', 'en'].map((locale) => {
					const filename = `${documentId}-${locale}.pdf`;

					return {
						source: `/documents/${filename}`,
						headers: [
							...privateDocumentHeaders,
							{
								key: 'Content-Disposition',
								value: `attachment; filename="${filename}"`,
							},
						],
					};
				}),
			),
		];
	},
	images: {
		formats: ['image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 384],
		qualities: [75, 100],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	turbopack: {},
};

export default nextConfig;
