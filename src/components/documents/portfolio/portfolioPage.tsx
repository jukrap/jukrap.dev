import type { PortfolioPageDefinition } from '@/types/documents';

import {
	joinClasses,
	PortfolioFigure,
	PortfolioSectionBlock,
	TechnologyList,
} from './portfolioBlocks';

function DocumentPageHeader({ page }: { page: PortfolioPageDefinition }) {
	if (page.kind === 'cover') return null;

	return (
		<header className="document-page-header">
			<span>박주철 포트폴리오</span>
			<span>{page.eyebrow}</span>
		</header>
	);
}

function DocumentPageFooter({ pageNumber }: { pageNumber: number }) {
	return (
		<footer className="document-page-footer">
			<span>jukrap.vercel.app</span>
			<span className="tabular-nums">{String(pageNumber).padStart(2, '0')}</span>
		</footer>
	);
}

function PageIntroduction({ page }: { page: PortfolioPageDefinition }) {
	return (
		<div className="document-page-introduction">
			<p className="document-page-eyebrow">{page.eyebrow}</p>
			<h2>{page.title}</h2>
			{page.summary ? (
				<p className="document-page-summary">{page.summary}</p>
			) : null}
			{page.metadata?.length ? (
				<dl className="document-page-metadata">
					{page.metadata.map((item) => (
						<div key={item.label + '-' + item.value}>
							<dt>{item.label}</dt>
							<dd>{item.value}</dd>
						</div>
					))}
				</dl>
			) : null}
			{page.technologies?.length ? (
				<div className="document-page-technologies">
					<TechnologyList technologies={page.technologies} label="사용 기술" />
				</div>
			) : null}
		</div>
	);
}

function CoverPage({ page }: { page: PortfolioPageDefinition }) {
	return (
		<>
			<header className="document-cover-header">
				<span>포트폴리오</span>
				<span>2026</span>
			</header>

			<div className="document-cover-title">
				<p className="document-cover-eyebrow">{page.eyebrow}</p>
				<h1>{page.title}</h1>
				{page.nickname ? (
					<p className="document-cover-nickname">{page.nickname}</p>
				) : null}
				{page.summary ? <div>{page.summary}</div> : null}
			</div>

			<div className="document-cover-details">
				<dl>
					{page.metadata?.map((item) => (
						<div key={item.label + '-' + item.value}>
							<dt>{item.label}</dt>
							<dd>{item.value}</dd>
						</div>
					))}
				</dl>
				<div>
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
	const isCompactWork = page.kind === 'compact-work';

	return (
		<>
			<DocumentPageHeader page={page} />
			<PageIntroduction page={page} />

			<div className="document-page-body">
				{images.length > 0 ? (
					<div
						className={joinClasses(
							'document-media-grid',
							images.length > 1 && 'document-media-grid-multiple',
						)}
					>
						{images.map((image) => (
							<PortfolioFigure key={image.src} image={image} />
						))}
					</div>
				) : null}

				<div className="document-section-grid">
					{page.sections.map((section) => (
						<PortfolioSectionBlock
							key={section.id}
							section={section}
							pageId={page.id}
							compact={isCompactWork}
						/>
					))}
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
			aria-label={page.pageNumber + '쪽 ' + page.title}
			className={joinClasses(
				'print-page document-page document-portfolio',
				'document-page-' + page.kind,
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
