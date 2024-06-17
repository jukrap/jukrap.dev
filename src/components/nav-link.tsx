// src\components\nav-link.tsx
'use client';
import Link from 'next/link';
import { ReactNode } from 'react';
import cn from 'clsx';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
	href: string;
	children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
	const pathname = `/${usePathname()?.split('/')[1]}`;
	const active = pathname === href;

	return (
		<Link
			className={cn(
				'px-6 py-1 rounded-full text-xl font-normal transition-colors',
				active
					? 'bg-muted text-secondary-foreground hover:text-secondary-foreground'
					: 'text-muted-foreground hover:text-accent',
			)}
			href={href}
		>
			{children}
		</Link>
	);
}
