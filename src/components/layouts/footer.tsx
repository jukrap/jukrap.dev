import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Link } from '@/types/common';
import { useLocale } from '@/contexts/localeContext';
import { getLocalizedPath, stripLocaleFromPath } from '@/lib/locale';
import styles from './footerPlay.module.css';

const FooterLink: React.FC<
	Link & { highlighted?: boolean; revealed?: boolean }
> = ({ text, url, isExternal, highlighted, revealed }) => (
	<a
		href={url}
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}
		className={`inline-flex items-center text-foreground transition-colors duration-200 hover:text-accent hover:underline decoration-accent/70 decoration-2 underline-offset-4 ${revealed ? styles.invitation : ''} ${highlighted ? styles.highlighted : ''}`}
	>
		<span className="font-medium text-sm">{text}</span>
	</a>
);

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();
	const {
		locale,
		data: { footerLinks },
	} = useLocale();
	const pathname = usePathname();
	const isPlay = stripLocaleFromPath(pathname) === '/play';
	const [openedOn, setOpenedOn] = useState<string | null>(null);
	const open = openedOn === pathname && !isPlay;
	const [highlighted, setHighlighted] = useState(false);
	useEffect(() => {
		setOpenedOn(null);
	}, [pathname]);
	useEffect(() => {
		if (!open) {
			setHighlighted(false);
			return;
		}
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		setHighlighted(!reduced);
		const timer = window.setTimeout(() => setHighlighted(false), 1500);
		const escape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpenedOn(null);
		};
		window.addEventListener('keydown', escape);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener('keydown', escape);
		};
	}, [open]);

	return (
		<footer
			className={`w-full pt-12 pb-6 md:pt-16 md:pb-8 px-4 md:px-6 bg-background ${styles.footer}`}
		>
			<div className="max-w-7xl mx-auto flex flex-col items-center gap-4 md:gap-6 no-select">
				<p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-center text-muted-foreground">
					<span>Copyright © {currentYear} Ju-cheol Park</span>
					<span>All Rights Reserved.</span>
				</p>
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
					{footerLinks.map((link) => (
						<FooterLink
							key={link.url}
							{...link}
							url={
								link.url.startsWith('/') ? getLocalizedPath(link.url, locale) : link.url
							}
							revealed={link.url === '/play' && open}
							highlighted={link.url === '/play' && open && highlighted}
						/>
					))}
				</div>
			</div>
			{!isPlay && (
				<button
					type="button"
					className={styles.corner}
					data-open={open}
					aria-expanded={open}
					aria-label={
						locale === 'ko'
							? open
								? 'Doge 숨기기'
								: '접힌 모서리 열기'
							: open
								? 'Hide Doge'
								: 'Open the folded corner'
					}
					onClick={() => setOpenedOn(open ? null : pathname)}
				>
					<span className={styles.peek} aria-hidden="true">
						<Image
							src="/images/doge-peek.webp"
							alt=""
							width={100}
							height={130}
							sizes="100px"
						/>
					</span>
					<span className={styles.fold} aria-hidden="true" />
				</button>
			)}
		</footer>
	);
};

export default Footer;
