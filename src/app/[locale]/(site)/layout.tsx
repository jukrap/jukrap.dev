import LayoutWrapper from '@/components/layouts/layoutWrapper';
import '../../site.css';

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <LayoutWrapper>{children}</LayoutWrapper>;
}
