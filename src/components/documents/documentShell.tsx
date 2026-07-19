import Link from 'next/link';
import { Locale } from '@/types/locale';
import { PrintButton } from './printButton';

interface DocumentShellProps {
	children: React.ReactNode;
	locale: Locale;
}

export const DocumentShell = ({ children, locale }: DocumentShellProps) => (
	<div className="document-shell min-h-screen bg-secondary/35 text-foreground">
		<header className="document-toolbar" aria-label="문서 도구">
			<div className="mx-auto flex min-h-14 w-full max-w-[1100px] items-center justify-between gap-3 px-4 sm:px-6">
				<Link href={`/${locale}`} className="document-toolbar-link">
					<span aria-hidden="true">←</span>
					<span>사이트로 돌아가기</span>
				</Link>
				<div className="flex items-center gap-2">
					<p className="hidden text-xs text-muted-foreground sm:block">
						A4 · 배경 그래픽 켜기 · 머리글/바닥글 끄기
					</p>
					<PrintButton />
				</div>
			</div>
		</header>
		<main className="document-stage">{children}</main>
	</div>
);
