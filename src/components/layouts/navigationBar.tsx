'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import cn from 'clsx';
import { useThemeStore } from '@/store/useThemeStore';
import { useLocale } from '@/contexts/localeContext';
import { getAlternateLocalePath, getLocalizedPath } from '@/lib/locale';
import type { Locale } from '@/types/locale';
import NavigationLink from '../common/navigationLink';

const HASH_SYNC_EVENT = 'portfolio:hashchange';

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
		className={['site-nav-tool', text ? 'w-full justify-start px-3' : ''].join(
			' ',
		)}
	>
		<span className="site-theme-icons" aria-hidden="true">
			<Moon className="site-theme-icon site-theme-icon-moon" />
			<Sun className="site-theme-icon site-theme-icon-sun" />
		</span>
		{text && <span className="text-sm font-semibold">{text}</span>}
	</button>
);

export function NavigationBar() {
	const { isDarkMode, toggleMode } = useThemeStore();
	const { locale, dictionary } = useLocale();
	const pathname = usePathname() ?? getLocalizedPath('/', locale);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const [currentHash, setCurrentHash] = useState('');
	const titleText = 'Jukrap';
	const nextLocale: Locale = locale === 'ko' ? 'en' : 'ko';
	const languageHref = `${getAlternateLocalePath(pathname, nextLocale)}${currentHash}`;

	useEffect(() => {
		const syncHash = () => setCurrentHash(window.location.hash);

		syncHash();
		window.addEventListener('hashchange', syncHash);
		window.addEventListener('popstate', syncHash);
		window.addEventListener(HASH_SYNC_EVENT, syncHash);

		return () => {
			window.removeEventListener('hashchange', syncHash);
			window.removeEventListener('popstate', syncHash);
			window.removeEventListener(HASH_SYNC_EVENT, syncHash);
		};
	}, [pathname]);

	useEffect(() => {
		if (!isMenuOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsMenuOpen(false);
				menuButtonRef.current?.focus();
			}
		};
		window.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', handleEscape);
		};
	}, [isMenuOpen]);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className="site-header sticky top-0 w-full z-50">
			<nav className="bg-background border-b border-border/25 transition-colors duration-300">
				<div className="site-nav-container">
					<div className="site-nav-row">
						<Link
							href={getLocalizedPath('/', locale)}
							className="site-brand shrink-0"
							aria-label={titleText}
						>
							<span className="brand-link font-bold text-primary" aria-hidden="true">
								{titleText}
							</span>
						</Link>

						{/* Desktop Navigation */}
						<ul className="site-nav-links hidden md:flex">
							{dictionary.navigation.links.map((link) => (
								<li key={link.href}>
									<NavigationLink href={getLocalizedPath(link.href, locale)}>
										{link.label}
									</NavigationLink>
								</li>
							))}
						</ul>

						{/* Desktop Theme Toggle */}
						<div className="site-nav-tools hidden md:flex">
							<Link
								href={languageHref}
								className="site-nav-tool site-locale-toggle"
								aria-label={dictionary.navigation.switchLanguage}
							>
								<span className={locale === 'ko' ? 'site-locale-current' : ''}>KO</span>
								<span aria-hidden="true">/</span>
								<span className={locale === 'en' ? 'site-locale-current' : ''}>EN</span>
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
							ref={menuButtonRef}
							aria-controls="site-mobile-menu"
							onClick={(event) => {
								event.stopPropagation();
								setIsMenuOpen((current) => !current);
							}}
							className="site-nav-tool site-menu-toggle relative z-50 md:hidden"
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
					id="site-mobile-menu"
					inert={!isMenuOpen}
					aria-hidden={!isMenuOpen}
					className={`fixed inset-0 top-16 bg-background/90 transition-opacity duration-200 md:hidden ${
						isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
					}`}
					onClick={closeMenu}
				>
					<div
						className="site-mobile-panel absolute inset-x-3 top-3 rounded-lg"
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
										<span className="nav-link-label">{link.label}</span>
									</Link>
								);
							})}
							<Link
								href={languageHref}
								className="site-nav-tool justify-start px-3"
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
