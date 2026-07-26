'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export const useTheme = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const toggleMode = useThemeStore((state) => state.toggleMode);
	return { isDarkMode, toggleMode };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const initializeTheme = useThemeStore((state) => state.initializeTheme);
	const preference = useThemeStore((state) => state.preference);
	const setPreference = useThemeStore((state) => state.setPreference);

	useEffect(() => initializeTheme(), [initializeTheme]);

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const syncSystemPreference = () => {
			if (preference === 'system') setPreference('system');
		};
		media.addEventListener('change', syncSystemPreference);
		return () => media.removeEventListener('change', syncSystemPreference);
	}, [preference, setPreference]);

	return <>{children}</>;
};
