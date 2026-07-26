import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	const locale = request.nextUrl.pathname.split('/')[1];
	requestHeaders.set('x-site-locale', locale === 'en' ? 'en' : 'ko');
	return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|fonts/).*)'],
};
