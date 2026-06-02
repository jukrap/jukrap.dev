'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import cn from 'clsx';
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
			'surface-minimal interactive-soft text-foreground',
			'hover:bg-secondary/45 hover:border-accent/45 active:bg-secondary/70',
			'focus:outline-none focus:ring-2 focus:ring-accent/35',
			text ? 'w-full px-4 py-3' : 'h-10 w-10',
		].join(' ')}
	>
		<span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={isDarkMode ? 'moon' : 'sun'}
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -5 }}
					transition={{ duration: 0.18, ease: 'easeOut' }}
					className="absolute flex h-5 w-5 items-center justify-center"
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
			<nav className="bg-background border-b border-border/25 transition-colors duration-300">
				<div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
					<div className="flex justify-between items-center h-16">
						<Link
							href={getLocalizedPath('/', locale)}
							className="shrink-0"
							aria-label={titleText}
						>
							<span
								className="brand-link font-bold text-xl text-primary"
								aria-hidden="true"
							>
								{titleText.split('').map((letter, index) => (
									<span
										key={`${letter}-${index}`}
										className="brand-letter"
										style={{ transitionDelay: `${index * 28}ms` }}
										aria-hidden="true"
									>
										{letter}
									</span>
								))}
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
								className="surface-minimal interactive-soft inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-foreground hover:bg-secondary/45 hover:border-accent/45 hover:text-accent active:bg-secondary/70"
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
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								setIsMenuOpen((current) => !current);
							}}
							className="relative z-50 p-2 rounded-md text-foreground transition-colors duration-200 hover:bg-muted hover:text-accent md:hidden"
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
					className={`fixed inset-0 top-16 bg-background/90 transition-opacity duration-200 md:hidden ${
						isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
					}`}
					onClick={closeMenu}
				>
					<div
						className={`absolute inset-x-3 top-3 surface-minimal-strong rounded-lg transition-transform duration-200 ease-out ${
							isMenuOpen ? 'translate-y-0' : '-translate-y-full'
						}`}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`px-6 py-8 flex flex-col gap-4 transition-opacity duration-200 ${
								isMenuOpen ? 'opacity-100' : 'opacity-0'
							}`}
						>
							{dictionary.navigation.links.map((link) => {
								const href = getLocalizedPath(link.href, locale);
								const isRootHref = href.split('/').filter(Boolean).length <= 1;
								const active =
									pathname === href ||
									(!isRootHref && href !== '/' && pathname.startsWith(`${href}/`));

								return (
									<Link
										key={link.href}
										href={href}
										className={cn(
											'nav-link w-full justify-start text-lg font-medium',
											active && 'nav-link-active',
										)}
										onClick={closeMenu}
										aria-current={active ? 'page' : undefined}
									>
										<span className="nav-link-indicator" aria-hidden="true" />
										<span className="nav-link-label">{link.label}</span>
									</Link>
								);
							})}
							<Link
								href={languageHref}
								className={[
									'flex items-center justify-center px-4 py-3 rounded-lg',
									'surface-minimal interactive-soft text-foreground transition-colors duration-200 hover:bg-secondary/45 hover:border-accent/45 hover:text-accent',
								].join(' ')}
								onClick={closeMenu}
								aria-label={dictionary.navigation.switchLanguage}
							>
								<Languages className="mr-2 h-4 w-4" aria-hidden="true" />
								{dictionary.navigation.languageName}
							</Link>
							<div className="transition-colors duration-200">
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
