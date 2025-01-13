'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'clsx';
import { NavLinkProps } from '@/types/navigation';

export default function NavigationLink({ href, children }: NavLinkProps) {
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
