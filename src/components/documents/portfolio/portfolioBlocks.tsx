import type { Locale } from '@/types/locale';
import Image from 'next/image';

import type {
	DocumentContentItem,
	DocumentFlow,
	DocumentContentSection,
	DocumentLink,
	DocumentMetric,
	PortfolioPageImage,
} from '@/types/documents';

export function joinClasses(
	...classes: Array<string | false | null | undefined>
) {
	return classes.filter(Boolean).join(' ');
}

const documentTechnologyNames: Record<string, string> = {
	'Android native module': 'Android 네이티브 모듈',
	'Workbook UI': '표 편집 UI',
	'Public API adapter': '공공 API 연동',
	'Server-rendered web': '서버 렌더링 웹',
};

export function TechnologyList({
	technologies,
	label,
	locale = 'ko',
}: {
	technologies: readonly string[];
	label?: string;
	locale?: Locale;
}) {
	if (!technologies.length) return null;
	const displayLabel = label ?? (locale === 'ko' ? '기술' : 'Technologies');

	return (
		<div className="document-technology-list">
			<p className="document-technology-label">{displayLabel}</p>
			<ul aria-label={displayLabel} className="document-technology-items">
				{technologies.map((technology, index) => (
					<li key={technology}>
						<span>
							{locale === 'ko'
								? (documentTechnologyNames[technology] ?? technology)
								: technology}
						</span>
						{index < technologies.length - 1 ? ',' : ''}
					</li>
				))}
			</ul>
		</div>
	);
}

function MetricList({ metrics }: { metrics: readonly DocumentMetric[] }) {
	return (
		<dl className="document-evidence-list">
			{metrics.map((metric) => (
				<div
					key={metric.label + '-' + metric.value}
					className="document-evidence-item document-no-break"
				>
					<dt className="document-heading-label">{metric.label}</dt>
					<dd>
						<p className="document-evidence-value">{metric.value}</p>
						{metric.detail ? (
							<p className="document-evidence-detail">{metric.detail}</p>
						) : null}
					</dd>
				</div>
			))}
		</dl>
	);
}

function DocumentLinkItem({
	link,
	compact = false,
	locale = 'ko',
}: {
	link: DocumentLink;
	compact?: boolean;
	locale?: Locale;
}) {
	const isExternal = link.href.startsWith('http');

	return (
		<a
			href={link.href}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noreferrer' : undefined}
			className="document-link group"
		>
			<span>
				{link.label}
				{isExternal ? (
					<span className="sr-only">
						{locale === 'ko' ? ' (새 탭에서 열림)' : ' (opens in a new tab)'}
					</span>
				) : null}
			</span>
			{compact ? null : (
				<small>
					{link.href.startsWith('#')
						? ''
						: link.href.replace(/^(?:https?:\/\/|mailto:)/, '')}
				</small>
			)}
		</a>
	);
}

function ItemTechnologyList({
	item,
	locale,
}: {
	item: DocumentContentItem;
	locale: Locale;
}) {
	if (!item.technologies?.length) return null;
	return <TechnologyList technologies={item.technologies} locale={locale} />;
}

function ItemLinks({
	links,
	locale,
}: {
	links: readonly DocumentLink[];
	locale: Locale;
}) {
	return (
		<ul className="document-link-list">
			{links.map((link) => (
				<li key={link.label + '-' + link.href}>
					<DocumentLinkItem link={link} locale={locale} />
				</li>
			))}
		</ul>
	);
}

function ItemMetadata({ item }: { item: DocumentContentItem }) {
	if (!item.metadata?.length) return null;

	return (
		<dl className="document-item-metadata">
			{item.metadata.map(({ label, value }) => (
				<div key={label + '-' + value}>
					<dt>{label}</dt>
					<dd>{value}</dd>
				</div>
			))}
		</dl>
	);
}

function CompactItemContent({
	item,
	locale,
}: {
	item: DocumentContentItem;
	locale: Locale;
}) {
	return (
		<div className="document-item-compact-content">
			<ItemMetadata item={item} />
			{item.description ? (
				<div className="document-item-compact-field">
					<p className="document-item-field-label">
						{locale === 'ko' ? '핵심 구현' : 'Implementation'}
					</p>
					<p className="document-item-description">{item.description}</p>
				</div>
			) : null}
			<ItemTechnologyList item={item} locale={locale} />
			{item.links?.length ? (
				<ItemLinks links={item.links} locale={locale} />
			) : null}
		</div>
	);
}

function ContentItems({
	items,
	compact = false,
	locale = 'ko',
}: {
	items: readonly DocumentContentItem[];
	compact?: boolean;
	locale?: Locale;
}) {
	return (
		<ul className="document-item-list">
			{items.map((item, index) => (
				<li
					key={item.title + '-' + index}
					className={joinClasses(
						'document-item document-no-break',
						compact && 'document-item-compact',
					)}
				>
					<header className="document-item-header">
						{item.label ? (
							<span className="document-item-label">{item.label}</span>
						) : null}
						<div>
							<h4 className="document-heading-item">{item.title}</h4>
							{item.meta ? <p className="document-item-meta">{item.meta}</p> : null}
						</div>
					</header>
					{compact ? (
						<CompactItemContent item={item} locale={locale} />
					) : (
						<>
							<ItemMetadata item={item} />
							<ItemTechnologyList item={item} locale={locale} />
							{item.value ? <p className="document-item-value">{item.value}</p> : null}
							{item.description ? (
								<p className="document-item-description">{item.description}</p>
							) : null}
							{item.links?.length ? (
								<ItemLinks links={item.links} locale={locale} />
							) : null}
						</>
					)}
				</li>
			))}
		</ul>
	);
}

function FlowDiagram({ flow }: { flow: DocumentFlow }) {
	return (
		<figure
			className={joinClasses(
				'document-flow',
				flow.kind === 'parallel' && 'document-flow-parallel',
			)}
			aria-label={flow.label}
		>
			<figcaption>{flow.label}</figcaption>
			<ol>
				{flow.steps.map((step, index) => (
					<li key={step.title}>
						<span className="document-flow-number" aria-hidden="true">
							{flow.kind === 'parallel' ? '—' : String(index + 1).padStart(2, '0')}
						</span>
						<strong>{step.title}</strong>
						<p>{step.detail}</p>
					</li>
				))}
			</ol>
			{flow.note ? <p className="document-flow-note">{flow.note}</p> : null}
		</figure>
	);
}

export function PortfolioSectionBlock({
	section,
	pageId,
	compact = false,
	locale = 'ko',
}: {
	section: DocumentContentSection;
	pageId: string;
	compact?: boolean;
	locale?: Locale;
}) {
	const headingId = pageId + '-' + section.id + '-title';

	return (
		<section
			aria-labelledby={section.title ? headingId : undefined}
			className={joinClasses(
				'document-section document-no-break',
				section.variant === 'note' && 'document-section-note',
				compact && 'document-section-compact',
			)}
		>
			{section.title ? (
				<h3 id={headingId} className="document-heading-section">
					{section.title}
				</h3>
			) : null}
			<div className="document-section-content">
				{section.body?.map((paragraph) => (
					<p key={paragraph} className="document-body-copy">
						{paragraph}
					</p>
				))}
				{section.flow ? <FlowDiagram flow={section.flow} /> : null}
				{section.metrics?.length ? <MetricList metrics={section.metrics} /> : null}
				{section.items?.length ? (
					<ContentItems items={section.items} compact={compact} locale={locale} />
				) : null}
				{section.technologies?.length ? (
					<TechnologyList technologies={section.technologies} locale={locale} />
				) : null}
				{section.links?.length ? (
					<ul className="document-link-list">
						{section.links.map((link) => (
							<li key={link.label + '-' + link.href}>
								<DocumentLinkItem link={link} locale={locale} />
							</li>
						))}
					</ul>
				) : null}
			</div>
		</section>
	);
}

export function PortfolioFigure({ image }: { image: PortfolioPageImage }) {
	const isPhone = image.layout === 'phone';
	const isSplit = image.layout === 'split';

	return (
		<figure
			className={joinClasses(
				'document-figure document-no-break',
				isPhone && 'document-figure-phone',
				isSplit && 'document-figure-split',
			)}
		>
			<div className="document-figure-frame">
				<Image
					src={image.src}
					alt={image.alt}
					fill
					loading="eager"
					sizes="(max-width: 640px) 92vw, 720px"
					className="object-contain"
				/>
			</div>
			{image.caption ? <figcaption>{image.caption}</figcaption> : null}
		</figure>
	);
}
