'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'clsx';
import { NavLinkProps } from '@/types/navigation';

export default function NavigationLink({ href, children }: NavLinkProps) {
	const fullPathname = usePathname() ?? '/';
	const isRootHref = href.split('/').filter(Boolean).length <= 1;
	const active =
		fullPathname === href ||
		(!isRootHref && href !== '/' && fullPathname.startsWith(`${href}/`));

	return (
		<Link
			className={cn('nav-link text-xl font-normal', active && 'nav-link-active')}
			href={href}
			aria-current={active ? 'page' : undefined}
		>
			<span className="nav-link-label">{children}</span>
		</Link>
	);
}
