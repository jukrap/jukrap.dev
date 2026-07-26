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

	useEffect(() => {
		initializeTheme();
	}, [initializeTheme]);

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			if (useThemeStore.getState().preference === 'system') {
				useThemeStore.getState().initializeTheme();
			}
		};

		media.addEventListener('change', handleChange);
		return () => media.removeEventListener('change', handleChange);
	}, []);

	return <>{children}</>;
};
