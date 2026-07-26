import { SiteShell } from '@/components/graphic/siteShell';

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <SiteShell>{children}</SiteShell>;
}
