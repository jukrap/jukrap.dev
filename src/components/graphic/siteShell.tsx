'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocale } from '@/contexts/localeContext';
import { getAlternateLocalePath, getLocalizedPath } from '@/lib/locale';
import { useThemeStore } from '@/store/useThemeStore';
import type { ThemePreference } from '@/types/portfolioExperiment';
import { GRAPHIC_SCENE_ROUTE_LEAVE } from '@/lib/graphicSceneEvents';

const routes = [
	{ label: 'OVERVIEW', href: '/' },
	{ label: 'WORK', href: '/work' },
	{ label: 'PROJECTS', href: '/projects' },
	{ label: 'PROFILE', href: '/profile' },
] as const;

const focusableSelector =
	'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ThemePreferenceControl() {
	const { locale } = useLocale();
	const preference = useThemeStore((state) => state.preference);
	const setPreference = useThemeStore((state) => state.setPreference);
	const choices: Array<{
		value: ThemePreference;
		short: string;
		label: string;
	}> = [
		{
			value: 'system',
			short: 'S',
			label: locale === 'ko' ? '시스템 테마' : 'System theme',
		},
		{
			value: 'light',
			short: 'L',
			label: locale === 'ko' ? '라이트 테마' : 'Light theme',
		},
		{
			value: 'dark',
			short: 'D',
			label: locale === 'ko' ? '다크 테마' : 'Dark theme',
		},
	];

	return (
		<div
			className="graphic-theme-control"
			role="group"
			aria-label={locale === 'ko' ? '테마 선택' : 'Theme preference'}
		>
			{choices.map((choice) => (
				<button
					key={choice.value}
					type="button"
					data-theme-option={choice.value}
					title={choice.label}
					aria-label={choice.label}
					aria-pressed={preference === choice.value}
					onClick={() => setPreference(choice.value)}
				>
					{choice.short}
				</button>
			))}
		</div>
	);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname() ?? '/ko';
	const router = useRouter();
	const { locale } = useLocale();
	const menuId = useId();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const restoreFocusRef = useRef<HTMLElement | null>(null);
	const menuWasOpenRef = useRef(false);
	const nextLocale = locale === 'ko' ? 'en' : 'ko';

	useEffect(() => setMenuOpen(false), [pathname]);
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);
	useEffect(() => {
		if (!menuOpen) {
			if (menuWasOpenRef.current) {
				menuWasOpenRef.current = false;
				(restoreFocusRef.current ?? menuButtonRef.current)?.focus();
			}
			return;
		}

		menuWasOpenRef.current = true;
		restoreFocusRef.current = menuButtonRef.current;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const frame = requestAnimationFrame(() => {
			const first =
				mobileMenuRef.current?.querySelector<HTMLElement>(focusableSelector);
			first?.focus();
		});
		return () => {
			cancelAnimationFrame(frame);
			document.body.style.overflow = previous;
		};
	}, [menuOpen]);

	useEffect(() => {
		const leaveScene = () =>
			flushSync(() =>
				window.dispatchEvent(
					new CustomEvent(GRAPHIC_SCENE_ROUTE_LEAVE, {
						detail: { pathname: window.location.pathname },
					}),
				),
			);
		window.addEventListener('popstate', leaveScene);
		return () => window.removeEventListener('popstate', leaveScene);
	}, []);

	const handleNavigationIntent = (event: React.MouseEvent<HTMLDivElement>) => {
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		)
			return;
		if (!(event.target instanceof Element)) return;
		const anchor = event.target.closest('a[href]');
		if (!(anchor instanceof HTMLAnchorElement)) return;
		if (anchor.hasAttribute('download')) return;
		if (anchor.target && anchor.target !== '_self') return;
		const destination = new URL(anchor.href, window.location.href);
		if (destination.origin !== window.location.origin) return;
		if (
			destination.pathname === window.location.pathname &&
			destination.search === window.location.search
		)
			return;
		event.preventDefault();
		flushSync(() =>
			window.dispatchEvent(
				new CustomEvent(GRAPHIC_SCENE_ROUTE_LEAVE, {
					detail: { pathname: destination.pathname },
				}),
			),
		);
		router.push(
			`${destination.pathname}${destination.search}${destination.hash}`,
		);
	};

	const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			setMenuOpen(false);
			return;
		}
		if (event.key !== 'Tab') return;
		const focusable = Array.from(
			mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ??
				[],
		).filter((element) => !element.hasAttribute('disabled'));
		if (focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	return (
		<div className="graphic-site-shell" onClickCapture={handleNavigationIntent}>
			<a className="graphic-skip-link" href="#main-content">
				{locale === 'ko' ? '본문으로 건너뛰기' : 'Skip to content'}
			</a>
			<header className="graphic-masthead">
				<Link
					className="graphic-brand"
					href={getLocalizedPath('/', locale)}
					prefetch={false}
					aria-label="JUKRAP overview"
				>
					JUKRAP
				</Link>
				<nav aria-label={locale === 'ko' ? '주요 메뉴' : 'Primary'}>
					<ul className="graphic-desktop-nav">
						{routes.map((route) => {
							const href = getLocalizedPath(route.href, locale);
							const active =
								pathname === href ||
								(route.href !== '/' && pathname.startsWith(`${href}/`));
							return (
								<li key={route.href}>
									<Link
										href={href}
										prefetch={false}
										aria-current={active ? 'page' : undefined}
									>
										{route.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="graphic-masthead-tools">
					<Link
						className="graphic-locale-control"
						href={getAlternateLocalePath(pathname, nextLocale)}
						hrefLang={nextLocale}
						aria-label={locale === 'ko' ? '영어로 보기' : 'View in Korean'}
					>
						{nextLocale.toUpperCase()}
					</Link>
					<div className="graphic-desktop-theme">
						<ThemePreferenceControl />
					</div>
					<button
						ref={menuButtonRef}
						type="button"
						className="graphic-menu-button"
						aria-expanded={menuOpen}
						aria-controls={menuId}
						aria-label={
							menuOpen
								? locale === 'ko'
									? '메뉴 닫기'
									: 'Close menu'
								: locale === 'ko'
									? '메뉴 열기'
									: 'Open menu'
						}
						onClick={() => setMenuOpen((current) => !current)}
					>
						{menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
					</button>
				</div>
				<div
					ref={mobileMenuRef}
					id={menuId}
					className="graphic-mobile-menu"
					data-open={menuOpen}
					hidden={!menuOpen}
					inert={!menuOpen}
					role="dialog"
					aria-modal="true"
					aria-label={locale === 'ko' ? '모바일 메뉴' : 'Mobile menu'}
					onKeyDown={handleMenuKeyDown}
				>
					<div className="graphic-mobile-theme">
						<ThemePreferenceControl />
					</div>
					<nav aria-label={locale === 'ko' ? '모바일 메뉴' : 'Mobile'}>
						<ul>
							{routes.map((route) => {
								const href = getLocalizedPath(route.href, locale);
								return (
									<li key={route.href}>
										<Link href={href} prefetch={false}>
											{route.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			</header>
			<main id="main-content" className="graphic-main" tabIndex={-1}>
				{children}
			</main>
			<footer className="graphic-footer">
				<p>© {new Date().getFullYear()} Ju-cheol Park</p>
				<div>
					<a href="mailto:jukrap628@gmail.com">Email</a>
					<a href="https://github.com/jukrap">GitHub</a>
					<a href="https://valur.tistory.com/">Blog</a>
					<a href="https://www.linkedin.com/in/jukrap/">LinkedIn</a>
				</div>
			</footer>
		</div>
	);
}
