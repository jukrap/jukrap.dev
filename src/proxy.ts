import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SITE_LOCALE_HEADER = 'x-jukrap-site-locale';
const REQUEST_HOST_HEADER = 'x-jukrap-request-host';

export function proxy(request: NextRequest) {
	const pathLocale = request.nextUrl.pathname.split('/')[1];
	const locale = pathLocale === 'en' ? 'en' : 'ko';
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set(SITE_LOCALE_HEADER, locale);

	requestHeaders.set(REQUEST_HOST_HEADER, request.headers.get('host') ?? '');
	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
	],
};
