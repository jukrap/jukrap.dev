'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useLocale } from '@/contexts/localeContext';
import { getAlternateLocalePath, getLocalizedPath } from '@/lib/locale';
import type { Locale } from '@/types/locale';
import NavigationLink from '../common/navigationLink';

interface ThemeToggleProps {
	isDarkMode: boolean;
	label: string;
	text?: string;
	onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
	isDarkMode,
	label,
	text,
	onToggle,
}) => (
	<button
		type="button"
		onClick={onToggle}
		aria-label={label}
		aria-pressed={isDarkMode}
		className={[
			'group inline-flex items-center justify-center gap-3 rounded-full',
			'surface-glass text-foreground transition-all duration-300',
			'hover:-translate-y-0.5 hover:border-accent/50 active:translate-y-0',
			'focus:outline-none focus:ring-2 focus:ring-accent/45',
			text ? 'w-full px-4 py-3' : 'h-10 w-12',
		].join(' ')}
	>
		<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-background/25 shadow-inner">
			<span
				className="absolute inset-x-2 top-1 h-px rounded-full bg-white/70 opacity-70"
				aria-hidden="true"
			/>
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={isDarkMode ? 'moon' : 'sun'}
					initial={{ opacity: 0, y: 18, scale: 0.76, rotate: -24 }}
					animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: 18, scale: 0.76, rotate: 24 }}
					transition={{ type: 'spring', stiffness: 360, damping: 26 }}
					className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background shadow-md"
				>
					{isDarkMode ? (
						<Moon className="h-4 w-4" aria-hidden="true" />
					) : (
						<Sun className="h-4 w-4" aria-hidden="true" />
					)}
				</motion.span>
			</AnimatePresence>
		</span>
		{text && <span className="text-sm font-semibold">{text}</span>}
	</button>
);

export function NavigationBar() {
	const { isDarkMode, toggleMode } = useThemeStore();
	const { locale, dictionary } = useLocale();
	const pathname = usePathname() ?? getLocalizedPath('/', locale);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const titleText = 'Jukrap';
	const nextLocale: Locale = locale === 'ko' ? 'en' : 'ko';
	const languageHref = getAlternateLocalePath(pathname, nextLocale);

	useEffect(() => {
		if (!isMenuOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isMenuOpen]);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className="sticky top-0 w-full z-50">
			<nav className="surface-glass border-x-0 border-t-0 transition-colors duration-500">
				<div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
					<div className="flex justify-between items-center h-16">
						<Link href={getLocalizedPath('/', locale)} className="shrink-0">
							<span className="font-bold text-xl text-primary transition-colors duration-500">
								{titleText}
							</span>
						</Link>

						{/* Desktop Navigation */}
						<ul className="hidden md:flex space-x-4">
							{dictionary.navigation.links.map((link) => (
								<li key={link.href}>
									<NavigationLink href={getLocalizedPath(link.href, locale)}>
										{link.label}
									</NavigationLink>
								</li>
							))}
						</ul>

						{/* Desktop Theme Toggle */}
						<div className="hidden md:flex items-center gap-3">
							<Link
								href={languageHref}
								className="surface-glass inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:translate-y-0"
								aria-label={dictionary.navigation.switchLanguage}
							>
								<Languages className="h-4 w-4" aria-hidden="true" />
								{dictionary.navigation.languageName}
							</Link>
							<ThemeToggle
								isDarkMode={isDarkMode}
								label={dictionary.navigation.themeToggle}
								onToggle={toggleMode}
							/>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="md:hidden z-50 p-2 rounded-md text-foreground hover:bg-muted transition-all duration-300"
							aria-label={
								isMenuOpen
									? dictionary.navigation.closeMenu
									: dictionary.navigation.openMenu
							}
							aria-expanded={isMenuOpen}
						>
							<div className="relative w-6 h-6">
								<div
									className={`absolute inset-0 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
								>
									<X size={24} />
								</div>
								<div
									className={`absolute inset-0 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
								>
									<Menu size={24} />
								</div>
							</div>
						</button>
					</div>
				</div>

				{/* Mobile Navigation Overlay */}
				<div
					className={`fixed inset-0 top-16 bg-background/55 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
						isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
					}`}
					onClick={closeMenu}
				>
					<div
						className={`absolute inset-x-3 top-3 surface-glass-strong rounded-lg transition-transform duration-500 ease-in-out ${
							isMenuOpen ? 'translate-y-0' : '-translate-y-full'
						}`}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`px-6 py-8 flex flex-col gap-6 transition-opacity duration-300 ${
								isMenuOpen ? 'opacity-100' : 'opacity-0'
							}`}
						>
							{dictionary.navigation.links.map((link, index) => (
								<Link
									key={link.href}
									href={getLocalizedPath(link.href, locale)}
									className={[
										'text-lg font-medium text-foreground hover:text-accent',
										'transition-all duration-300 py-2 border-b border-border',
										'transform',
										isMenuOpen ? 'translate-y-0' : '-translate-y-4',
									].join(' ')}
									style={{ transitionDelay: `${index * 100}ms` }}
									onClick={closeMenu}
								>
									{link.label}
								</Link>
							))}
							<Link
								href={languageHref}
								className={[
									'flex items-center justify-center px-4 py-3 rounded-lg',
									'surface-glass text-foreground transition-all duration-300',
									'transform',
									isMenuOpen ? 'translate-y-0' : '-translate-y-4',
								].join(' ')}
								style={{
									transitionDelay: `${dictionary.navigation.links.length * 50}ms`,
								}}
								onClick={closeMenu}
								aria-label={dictionary.navigation.switchLanguage}
							>
								<Languages className="mr-2 h-4 w-4" aria-hidden="true" />
								{dictionary.navigation.languageName}
							</Link>
							<div
								className={[
									'transform transition-all duration-300',
									isMenuOpen ? 'translate-y-0' : '-translate-y-4',
								].join(' ')}
								style={{
									transitionDelay: `${(dictionary.navigation.links.length + 1) * 50}ms`,
								}}
							>
								<ThemeToggle
									isDarkMode={isDarkMode}
									label={dictionary.navigation.themeToggle}
									text={
										isDarkMode
											? dictionary.navigation.themeToLight
											: dictionary.navigation.themeToDark
									}
									onToggle={() => {
										toggleMode();
										closeMenu();
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
