'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getAlternateLocalePath } from '@/lib/locale';
import type { Locale } from '@/types/locale';
import { ThemeSelector } from './themeSelector';
import { ExternalWindowNote } from './externalWindowNote';

const navItems = [
	{ label: 'INDEX', href: '' },
	{ label: 'CASES', href: '/cases' },
	{ label: 'ARCHIVE', href: '/archive' },
	{ label: 'PROFILE', href: '/profile' },
] as const;

const isActivePath = (pathname: string, href: string, locale: Locale) => {
	const localizedHref = `/${locale}${href}`;
	return href === ''
		? pathname === localizedHref
		: pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
};

function Masthead({ locale }: { locale: Locale }) {
	const pathname = usePathname() ?? `/${locale}`;
	const [open, setOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const wasOpenRef = useRef(false);
	const nextLocale: Locale = locale === 'ko' ? 'en' : 'ko';
	const localeHref = useMemo(
		() => getAlternateLocalePath(pathname, nextLocale),
		[nextLocale, pathname],
	);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!open) {
			if (wasOpenRef.current) menuButtonRef.current?.focus();
			wasOpenRef.current = false;
			return;
		}
		wasOpenRef.current = true;
		const focusFrame = window.requestAnimationFrame(() => {
			menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
		});
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				setOpen(false);
			}
		};
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.cancelAnimationFrame(focusFrame);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<header className="relative z-50 manuscript-frame">
			<nav
				className="relative z-50 flex min-h-16 items-stretch border-y manuscript-rule"
				aria-label={locale === 'ko' ? '주요 탐색' : 'Primary navigation'}
			>
				<Link
					href={`/${locale}`}
					className="flex min-h-16 items-center pr-6 font-metadata text-sm font-semibold tracking-tight"
					aria-label="jukrap.dev INDEX"
				>
					jukrap.dev
				</Link>

				<ul className="ml-auto hidden items-stretch md:flex">
					{navItems.map((item) => {
						const href = `/${locale}${item.href}`;
						const active = isActivePath(pathname, item.href, locale);
						return (
							<li key={item.label}>
								<Link
									href={href}
									aria-current={active ? 'page' : undefined}
									className={[
										'relative flex min-h-16 items-center px-4 font-metadata text-[0.72rem]',
										'tracking-[0.08em] transition-colors hover:text-[var(--editor-blue)]',
										active
											? 'text-[var(--ink)] after:absolute after:inset-x-4 after:bottom-[-1px] after:h-0.5 after:bg-[var(--ink)]'
											: 'manuscript-muted',
									].join(' ')}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>

				<Link
					href={localeHref}
					className="hidden min-h-16 items-center border-l manuscript-rule px-4 font-metadata text-[0.72rem] uppercase hover:text-[var(--editor-blue)] md:flex"
					hrefLang={nextLocale}
					aria-label={
						locale === 'ko' ? '영어로 페이지 보기' : 'View this page in Korean'
					}
				>
					{nextLocale}
				</Link>
				<div className="hidden md:block">
					<ThemeSelector locale={locale} />
				</div>

				<button
					type="button"
					ref={menuButtonRef}
					className="ml-auto flex min-h-16 min-w-16 items-center justify-center border-l manuscript-rule md:hidden"
					onClick={() => setOpen((current) => !current)}
					aria-expanded={open}
					aria-controls="mobile-manuscript-menu"
					aria-label={
						open
							? locale === 'ko'
								? '메뉴 닫기'
								: 'Close menu'
							: locale === 'ko'
								? '메뉴 열기'
								: 'Open menu'
					}
				>
					<span className="mr-2 font-metadata text-[0.7rem]">MENU</span>
					{open ? (
						<X size={20} aria-hidden="true" />
					) : (
						<Menu size={20} aria-hidden="true" />
					)}
				</button>
			</nav>

			<div
				id="mobile-manuscript-menu"
				ref={menuRef}
				hidden={!open}
				className="relative z-40 min-h-[calc(100dvh-4rem)] overflow-y-auto bg-[var(--paper)] md:hidden"
			>
				<div className="manuscript-frame">
					<ul className="border-t manuscript-rule">
						{navItems.map((item, index) => {
							const href = `/${locale}${item.href}`;
							const active = isActivePath(pathname, item.href, locale);
							return (
								<li key={item.label} className="border-b manuscript-rule">
									<Link
										href={href}
										aria-current={active ? 'page' : undefined}
										className="grid min-h-20 grid-cols-[3rem_1fr] items-center font-metadata"
									>
										<span className="manuscript-muted">
											{String(index + 1).padStart(2, '0')}
										</span>
										<span className={active ? 'manuscript-blue' : ''}>{item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
					<div className="grid grid-cols-[1fr_3fr] border-b manuscript-rule">
						<Link
							href={localeHref}
							hrefLang={nextLocale}
							className="flex min-h-14 items-center justify-center border-r manuscript-rule font-metadata text-xs uppercase"
						>
							{nextLocale}
						</Link>
						<ThemeSelector locale={locale} compact />
					</div>
				</div>
			</div>
		</header>
	);
}

function Footer({ locale }: { locale: Locale }) {
	return (
		<footer className="manuscript-frame py-10">
			<div className="flex flex-col gap-4 border-t manuscript-rule pt-5 font-metadata text-[0.68rem] manuscript-muted sm:flex-row sm:items-center sm:justify-between">
				<p>© {new Date().getFullYear()} Ju-cheol Park</p>
				<div className="flex flex-wrap gap-x-5 gap-y-2">
					<Link
						href={`/${locale}/portfolio`}
						className="inline-flex min-h-11 items-center manuscript-external"
					>
						PORTFOLIO
					</Link>
					<a
						href="https://github.com/jukrap"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center manuscript-external"
					>
						GITHUB ↗
						<ExternalWindowNote locale={locale} />
					</a>
					<a
						href="https://www.linkedin.com/in/jukrap/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center manuscript-external"
					>
						LINKEDIN ↗
						<ExternalWindowNote locale={locale} />
					</a>
				</div>
			</div>
		</footer>
	);
}

export function ManuscriptShell({
	children,
	locale,
}: {
	children: React.ReactNode;
	locale: Locale;
}) {
	return (
		<div className="manuscript-shell">
			<a
				href="#main-content"
				className="sr-only z-[100] bg-[var(--surface)] p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
			>
				{locale === 'ko' ? '본문으로 건너뛰기' : 'Skip to content'}
			</a>
			<Masthead locale={locale} />
			<main
				id="main-content"
				tabIndex={-1}
				className="manuscript-main manuscript-frame"
			>
				{children}
			</main>
			<Footer locale={locale} />
		</div>
	);
}
