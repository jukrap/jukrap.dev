import LayoutWrapper from '@/components/layouts/layoutWrapper';

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <LayoutWrapper>{children}</LayoutWrapper>;
}
