import type { Locale } from '@/types/locale';
import type { PortfolioPageDefinition } from '@/types/documents';

import {
	joinClasses,
	PortfolioFigure,
	PortfolioSectionBlock,
	TechnologyList,
} from './portfolioBlocks';

function DocumentPageHeader({
	page,
	locale,
}: {
	page: PortfolioPageDefinition;
	locale: Locale;
}) {
	if (page.kind === 'cover') return null;

	return (
		<header className="document-page-header">
			<span>
				{locale === 'ko' ? '박주철 포트폴리오' : 'Ju-cheol Park / Portfolio'}
			</span>
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

function PageIntroduction({
	page,
	locale,
}: {
	page: PortfolioPageDefinition;
	locale: Locale;
}) {
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
					<TechnologyList
						technologies={page.technologies}
						label={locale === 'ko' ? '사용 기술' : 'Technologies'}
						locale={locale}
					/>
				</div>
			) : null}
		</div>
	);
}

function CoverPage({
	page,
	locale,
}: {
	page: PortfolioPageDefinition;
	locale: Locale;
}) {
	return (
		<>
			<header className="document-cover-header">
				<span>{locale === 'ko' ? '포트폴리오' : 'Portfolio'}</span>
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

			<div className="document-cover-details" id={page.aliases?.[0]}>
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
							locale={locale}
							pageId={page.id}
						/>
					))}
				</div>
			</div>
			<DocumentPageFooter pageNumber={page.pageNumber} />
		</>
	);
}

function StandardPage({
	page,
	locale,
}: {
	page: PortfolioPageDefinition;
	locale: Locale;
}) {
	const images = page.images ?? [];
	const isCompactWork = page.kind === 'compact-work';

	return (
		<>
			{page.aliases?.map((alias) => (
				<span key={alias} id={alias} aria-hidden="true" />
			))}
			<DocumentPageHeader page={page} locale={locale} />
			<PageIntroduction page={page} locale={locale} />

			<div className="document-page-body">
				<div className="document-section-grid">
					{page.sections.map((section) => (
						<div className="document-section-group" key={section.id}>
							<PortfolioSectionBlock
								section={section}
								locale={locale}
								pageId={page.id}
								compact={isCompactWork}
							/>
							{section.id === 'contribution' && images.length > 0 ? (
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
						</div>
					))}
				</div>
			</div>

			<DocumentPageFooter pageNumber={page.pageNumber} />
		</>
	);
}

export function PortfolioPage({
	page,
	locale,
}: {
	page: PortfolioPageDefinition;
	locale: Locale;
}) {
	return (
		<section
			id={page.id}
			aria-label={`${locale === 'ko' ? '쪽' : 'Page'} ${page.pageNumber} ${page.title}`}
			className={joinClasses(
				'print-page document-page document-portfolio',
				'document-page-' + page.kind,
			)}
		>
			{page.kind === 'cover' ? (
				<CoverPage page={page} locale={locale} />
			) : (
				<StandardPage page={page} locale={locale} />
			)}
		</section>
	);
}
