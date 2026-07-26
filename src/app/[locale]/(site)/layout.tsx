import { ContextManuscriptShell } from '@/components/manuscript/contextShell';

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ContextManuscriptShell>{children}</ContextManuscriptShell>;
}
