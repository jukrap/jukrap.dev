import { Link } from '@/types/common';

export const links: Link[] = [
	{
		text: 'Email',
		type: 'email',
		url: 'mailto:jukrap628@gmail.com',
	},
	{
		text: 'Github',
		type: 'github',
		url: 'https://github.com/jukrap',
		isExternal: true,
	},
	{
		text: 'Blog',
		type: 'blog',
		url: 'https://valur.tistory.com/',
		isExternal: true,
	},
	{
		text: 'LinkedIn',
		type: 'linkedin',
		url: 'https://www.linkedin.com/in/jukrap/',
		isExternal: true,
	},
] as const;
