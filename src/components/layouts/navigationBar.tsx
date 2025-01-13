'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { NavLink } from '@/types/navigation';
import NavigationLink from '../common/navigationLink';

import WhiteModeSun from '../../../public/icons/whiteMode_sun.svg';
import WhiteModeMoon from '../../../public/icons/whiteMode_moon.svg';
import BlackModeSun from '../../../public/icons/blackMode_sun.svg';
import BlackModeMoon from '../../../public/icons/blackMode_moon.svg';

const links: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Projects', href: '/projects' },
];

export function NavigationBar() {
	const { isDarkMode, toggleMode } = useThemeStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const titleText = 'Jukrap';

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMenuOpen]);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className="sticky top-0 w-full z-50">
			<nav className="bg-background/95 transition-colors duration-500 border-b border-border">
				<div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
					<div className="flex justify-between items-center h-16">
						<Link href="/" className="shrink-0">
							<span className="font-bold text-xl text-primary transition-colors duration-500">
								{titleText}
							</span>
						</Link>

						{/* Desktop Navigation */}
						<ul className="hidden md:flex space-x-4">
							{links.map((link) => (
								<li key={link.href}>
									<NavigationLink href={link.href}>{link.label}</NavigationLink>
								</li>
							))}
						</ul>

						{/* Desktop Theme Toggle */}
						<div className="hidden md:flex items-center">
							<button
								className="flex items-center gap-4 px-4 py-2 rounded-full bg-primary transition-all duration-500"
								onClick={toggleMode}
							>
								<div className="flex items-center gap-4 transition-transform duration-500">
									{isDarkMode ? (
										<>
											<BlackModeSun className="transition-opacity duration-500 dark:opacity-100" />
											<BlackModeMoon className="transition-opacity duration-500 dark:opacity-100" />
										</>
									) : (
										<>
											<WhiteModeSun className="transition-opacity duration-500 opacity-100 dark:opacity-0" />
											<WhiteModeMoon className="transition-opacity duration-500 opacity-100 dark:opacity-0" />
										</>
									)}
								</div>
							</button>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="md:hidden z-50 p-2 rounded-md text-foreground hover:bg-muted transition-all duration-300"
							aria-label="Toggle menu"
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
					className={`fixed inset-0 bg-background/50 transition-opacity duration-300 md:hidden ${
						isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
					}`}
					onClick={closeMenu}
				>
					<div
						className={`fixed inset-x-0 top-[64px] bg-background border-t border-border
              transition-transform duration-500 ease-in-out ${
															isMenuOpen ? 'translate-y-0' : '-translate-y-full'
														}`}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`px-6 py-8 flex flex-col gap-6 transition-opacity duration-300 ${
								isMenuOpen ? 'opacity-100' : 'opacity-0'
							}`}
						>
							{links.map((link, index) => (
								<Link
									key={link.href}
									href={link.href}
									className={`text-lg font-medium text-foreground hover:text-accent 
                    transition-all duration-300 py-2 border-b border-border
                    transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}
									style={{ transitionDelay: `${index * 100}ms` }}
									onClick={closeMenu}
								>
									{link.label}
								</Link>
							))}
							<button
								onClick={() => {
									toggleMode();
								}}
								className={`flex items-center justify-center gap-4 px-4 py-3 rounded-lg 
                  bg-primary text-primary-foreground transition-all duration-300 
                  transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}
								style={{ transitionDelay: `${links.length * 50}ms` }}
							>
								<div className="flex items-center gap-4">
									{isDarkMode ? (
										<>
											<BlackModeSun className="transition-opacity duration-500 dark:opacity-100" />
											<BlackModeMoon className="transition-opacity duration-500 dark:opacity-100" />
										</>
									) : (
										<>
											<WhiteModeSun className="transition-opacity duration-500 opacity-100 dark:opacity-0" />
											<WhiteModeMoon className="transition-opacity duration-500 opacity-100 dark:opacity-0" />
										</>
									)}
								</div>
								<span className="ml-2">{isDarkMode ? '라이트 모드' : '다크 모드'}</span>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
