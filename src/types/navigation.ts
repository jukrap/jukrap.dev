import { ReactNode } from 'react';

export interface NavLink {
	label: string;
	href: string;
}

export interface NavLinkProps {
	href: string;
	children: ReactNode;
}
