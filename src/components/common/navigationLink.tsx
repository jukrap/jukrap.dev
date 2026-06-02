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
			className={cn(
				'px-5 py-1.5 rounded-full text-xl font-normal transition-all duration-300',
				active
					? 'surface-glass text-foreground hover:border-accent/45'
					: 'text-muted-foreground hover:bg-background/25 hover:text-foreground',
			)}
			href={href}
		>
			{children}
		</Link>
	);
}
