import type { Locale } from '@/types/locale';

export function ExternalWindowNote({ locale }: { locale: Locale }) {
	return (
		<span className="sr-only">
			{locale === 'ko' ? ' (새 창에서 열림)' : ' (opens in a new tab)'}
		</span>
	);
}
