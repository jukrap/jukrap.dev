import type { PortfolioPageDefinition } from '@/types/documents';

import {
	joinClasses,
	PortfolioFigure,
	PortfolioSectionBlock,
} from './portfolioBlocks';

const pageLayoutByKind: Record<PortfolioPageDefinition['kind'], string> = {
	cover: 'justify-between',
	overview: '',
	case: '',
	'compact-work': '',
	project: '',
	'project-collection': '',
	closing: '',
};

function DocumentPageHeader({ page }: { page: PortfolioPageDefinition }) {
	if (page.kind === 'cover') return null;

	return (
		<header className="document-page-header flex items-center justify-between border-b border-border/35 pb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
			<span>Ju-cheol Park</span>
			<span>Web &amp; Mobile Frontend Engineer</span>
		</header>
	);
}

function DocumentPageFooter({ pageNumber }: { pageNumber: number }) {
	return (
		<footer className="document-page-footer mt-auto flex items-end justify-between border-t border-border/35 pt-3 text-[10px] text-muted-foreground">
			<span>jukrap.vercel.app</span>
			<span className="tabular-nums">{String(pageNumber).padStart(2, '0')}</span>
		</footer>
	);
}

function PageIntroduction({ page }: { page: PortfolioPageDefinition }) {
	return (
		<div className="document-page-introduction mt-7">
			<p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
				{page.eyebrow}
			</p>
			<h2 className="mt-2.5 max-w-[20ch] text-[28px] font-bold leading-[1.18] tracking-[-0.035em] text-foreground sm:text-[32px]">
				{page.title}
			</h2>
			{page.summary ? (
				<p className="mt-4 max-w-[67ch] text-[14px] font-medium leading-[1.68] text-foreground/85">
					{page.summary}
				</p>
			) : null}
			{page.metadata?.length ? (
				<dl className="mt-5 grid gap-x-8 gap-y-2.5 border-y border-border/30 py-3.5 sm:grid-cols-3">
					{page.metadata.map((item) => (
						<div key={`${item.label}-${item.value}`} className="min-w-0">
							<dt className="text-[10px] font-semibold text-muted-foreground">
								{item.label}
							</dt>
							<dd className="mt-0.5 text-[12px] font-semibold leading-5 text-foreground">
								{item.value}
							</dd>
						</div>
					))}
				</dl>
			) : null}
		</div>
	);
}

function CoverPage({ page }: { page: PortfolioPageDefinition }) {
	return (
		<>
			<div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
				<span>Portfolio</span>
				<span className="text-accent">2026</span>
			</div>

			<div className="my-auto max-w-[34rem] py-16">
				<div className="mb-8 h-1 w-12 bg-accent" aria-hidden="true" />
				<p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
					{page.eyebrow}
				</p>
				<h1 className="mt-4 text-[52px] font-bold leading-[1.04] tracking-[-0.055em] text-foreground sm:text-[62px]">
					{page.title}
				</h1>
				{page.summary ? (
					<p className="mt-8 max-w-[46ch] text-[15px] font-medium leading-[1.75] text-foreground/85">
						{page.summary}
					</p>
				) : null}
			</div>

			<div className="grid gap-8 border-t border-border/45 pt-6 sm:grid-cols-[1.3fr_1fr] print:grid-cols-1 print:gap-5">
				<div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 print:grid-cols-1">
					{page.metadata?.map((item) => (
						<div key={`${item.label}-${item.value}`}>
							<p className="text-[10px] font-semibold text-muted-foreground">
								{item.label}
							</p>
							<p className="mt-0.5 text-[12px] font-semibold leading-5 text-foreground">
								{item.value}
							</p>
						</div>
					))}
				</div>
				<div className="space-y-4">
					{page.sections.map((section) => (
						<PortfolioSectionBlock
							key={section.id}
							section={section}
							pageId={page.id}
							compact
						/>
					))}
				</div>
			</div>
		</>
	);
}

function StandardPage({ page }: { page: PortfolioPageDefinition }) {
	const images = page.images ?? [];
	const hasImages = images.length > 0;
	const useTwoColumns =
		page.kind === 'overview' ||
		page.kind === 'project-collection' ||
		page.kind === 'closing';
	const isCompactWork = page.kind === 'compact-work';

	return (
		<>
			<DocumentPageHeader page={page} />
			<PageIntroduction page={page} />

			<div className="document-page-body mt-6 flex-1">
				{hasImages ? (
					<div
						className={joinClasses(
							'document-media-grid mb-6 grid gap-3.5',
							images.length > 1 && 'sm:grid-cols-2',
						)}
					>
						{images.map((image) => (
							<PortfolioFigure key={image.src} image={image} />
						))}
					</div>
				) : null}

				<div
					className={joinClasses(
						'document-section-grid grid content-start gap-x-8 gap-y-5',
						useTwoColumns && 'sm:grid-cols-2 print:grid-cols-1',
						!hasImages && !useTwoColumns && 'border-t border-border/30 pt-5',
					)}
				>
					{page.sections.map((section, index) => {
						const spansColumns =
							useTwoColumns &&
							(page.sections.length === 1 ||
								(page.sections.length % 2 === 1 && index === page.sections.length - 1));

						return (
							<div
								key={section.id}
								className={joinClasses(
									isCompactWork && 'border-b border-border/30 pb-4',
									spansColumns && 'sm:col-span-2 print:col-span-1',
								)}
							>
								<PortfolioSectionBlock
									section={section}
									pageId={page.id}
									compact={isCompactWork}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<DocumentPageFooter pageNumber={page.pageNumber} />
		</>
	);
}

export function PortfolioPage({ page }: { page: PortfolioPageDefinition }) {
	return (
		<section
			id={page.id}
			aria-label={`${page.pageNumber}쪽 ${page.title}`}
			className={joinClasses(
				'print-page document-page document-portfolio relative mx-auto flex min-h-[68rem] w-full max-w-[210mm] flex-col overflow-hidden bg-background px-6 py-7 text-foreground shadow-[0_18px_60px_rgba(0,0,0,0.10)] sm:min-h-[297mm] sm:px-12 sm:py-10 print:h-[297mm] print:min-h-[297mm] print:w-[210mm] print:max-w-none print:shadow-none',
				`document-page-${page.kind}`,
				pageLayoutByKind[page.kind],
			)}
		>
			{page.kind === 'cover' ? (
				<CoverPage page={page} />
			) : (
				<StandardPage page={page} />
			)}
		</section>
	);
}
