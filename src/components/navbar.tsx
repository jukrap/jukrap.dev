'use client';
import Link from 'next/link';
import NavLink from './nav-link';
import { useThemeStore } from '../store/useThemeStore';
import WhiteModeSun from '../../public/icons/whiteMode_sun.svg';
import WhiteModeMoon from '../../public/icons/whiteMode_moon.svg';
import BlackModeSun from '../../public/icons/blackMode_sun.svg';
import BlackModeMoon from '../../public/icons/blackMode_moon.svg';

const links = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
];

export function Navbar() {
	const { isDarkMode, toggleMode } = useThemeStore();
	const titleText = 'Jukrap';

	return (
		<header className="w-full flex flex-col gap-12 py-3 items-center sticky top-0 bg-glass backdrop-filter backdrop-blur-md transition-colors duration-500 z-50">
			<nav className="w-[670px] flex justify-between items-center px-2.5">
				<Link href="/" className="shrink-0">
					<span className="font-bold text-xl leading-6 tracking-[0.01em] font-pretendard text-primary transition-colors duration-500">
						{titleText}
					</span>
				</Link>
				<ul className="flex gap-4">
					{links.map((link) => (
						<li key={link.href}>
							<NavLink href={link.href}>{link.label}</NavLink>
						</li>
					))}
				</ul>
				<div className="flex items-center gap-6">
					<button
						className="flex items-center gap-4 px-4 py-2 rounded-full bg-primary transition-colors duration-500 dark:bg-primary"
						onClick={toggleMode}
					>
						<div className="flex items-center gap-4 transition-transform duration-500 ease-in-out">
							{isDarkMode ? (
								<>
									<BlackModeSun className="transition-opacity duration-500 ease-in-out dark:opacity-100" />
									<BlackModeMoon className="transition-opacity duration-500 ease-in-out dark:opacity-100" />
								</>
							) : (
								<>
									<WhiteModeSun className="transition-opacity duration-500 ease-in-out opacity-100 dark:opacity-0" />
									<WhiteModeMoon className="transition-opacity duration-500 ease-in-out opacity-100 dark:opacity-0" />
								</>
							)}
						</div>
					</button>
				</div>
			</nav>
		</header>
	);
}
