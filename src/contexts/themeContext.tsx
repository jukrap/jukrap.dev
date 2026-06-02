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

	return <>{children}</>;
};
