'use client';

import { useThemeStore } from '@/store/useThemeStore';
import type { Locale } from '@/types/locale';
import type { ThemePreference } from '@/types/theme';

const labels: Record<Locale, Record<ThemePreference, string>> = {
	ko: {
		system: '시스템',
		light: '라이트',
		dark: '다크',
	},
	en: {
		system: 'System',
		light: 'Light',
		dark: 'Dark',
	},
};

export function ThemeSelector({
	locale,
	compact = false,
}: {
	locale: Locale;
	compact?: boolean;
}) {
	const preference = useThemeStore((state) => state.preference);
	const isHydrated = useThemeStore((state) => state.isHydrated);
	const setPreference = useThemeStore((state) => state.setPreference);

	return (
		<fieldset
			className="flex items-center border-l manuscript-rule"
			aria-label={locale === 'ko' ? '테마 선택' : 'Theme preference'}
		>
			<legend className="sr-only">
				{locale === 'ko' ? '테마 선택' : 'Theme preference'}
			</legend>
			{(['system', 'light', 'dark'] as const).map((option) => (
				<button
					key={option}
					type="button"
					aria-pressed={isHydrated ? preference === option : option === 'system'}
					onClick={() => setPreference(option)}
					className={[
						'theme-option',
						`theme-option-${option}`,
						'min-h-11 border-r manuscript-rule px-3 font-metadata text-[0.68rem] uppercase',
						'transition-colors duration-150 hover:text-[var(--editor-blue)]',
						compact ? 'flex-1' : '',
					].join(' ')}
				>
					{labels[locale][option]}
				</button>
			))}
		</fieldset>
	);
}
