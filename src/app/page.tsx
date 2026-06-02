import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPreferredLocale } from '@/lib/locale';

export default async function HomePage() {
	const requestHeaders = await headers();
	const locale = getPreferredLocale(requestHeaders.get('accept-language'));

	redirect(`/${locale}`);
}
