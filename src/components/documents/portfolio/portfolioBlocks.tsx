import Image from 'next/image';

import type {
	DocumentContentItem,
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
	'Workbook UI': '검수용 워크북 UI',
	'Public API adapter': '공공 API 연동',
	'Server-rendered web': '서버 렌더링 웹',
};

export function TechnologyList({
	technologies,
	label = '기술',
}: {
	technologies: readonly string[];
	label?: string;
}) {
	if (!technologies.length) return null;

	return (
		<div className="document-technology-list">
			<p className="document-technology-label">{label}</p>
			<ul aria-label={label} className="document-technology-items">
				{technologies.map((technology, index) => (
					<li key={technology}>
						<span>{documentTechnologyNames[technology] ?? technology}</span>
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
					<dt>{metric.label}</dt>
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
}: {
	link: DocumentLink;
	compact?: boolean;
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
				{isExternal ? <span className="sr-only"> (새 탭에서 열림)</span> : null}
			</span>
			{compact ? null : (
				<small>{link.href.replace(/^(?:https?:\/\/|mailto:)/, '')}</small>
			)}
		</a>
	);
}

function ItemTechnologyList({ item }: { item: DocumentContentItem }) {
	if (!item.technologies?.length) return null;
	return <TechnologyList technologies={item.technologies} />;
}

function ItemLinks({ links }: { links: readonly DocumentLink[] }) {
	return (
		<ul className="document-link-list">
			{links.map((link) => (
				<li key={link.label + '-' + link.href}>
					<DocumentLinkItem link={link} />
				</li>
			))}
		</ul>
	);
}

function ContentItems({ items }: { items: readonly DocumentContentItem[] }) {
	return (
		<ul className="document-item-list">
			{items.map((item, index) => (
				<li
					key={item.title + '-' + index}
					className="document-item document-no-break"
				>
					<header className="document-item-header">
						{item.label ? (
							<span className="document-item-label">{item.label}</span>
						) : null}
						<div>
							<h4>{item.title}</h4>
							{item.meta ? <p className="document-item-meta">{item.meta}</p> : null}
						</div>
					</header>
					<ItemTechnologyList item={item} />
					{item.value ? <p className="document-item-value">{item.value}</p> : null}
					{item.description ? (
						<p className="document-item-description">{item.description}</p>
					) : null}
					{item.links?.length ? <ItemLinks links={item.links} /> : null}
				</li>
			))}
		</ul>
	);
}

export function PortfolioSectionBlock({
	section,
	pageId,
	compact = false,
}: {
	section: DocumentContentSection;
	pageId: string;
	compact?: boolean;
}) {
	const headingId = pageId + '-' + section.id + '-title';

	return (
		<section
			aria-labelledby={section.title ? headingId : undefined}
			className={joinClasses(
				'document-section document-no-break',
				compact && 'document-section-compact',
			)}
		>
			{section.title ? <h3 id={headingId}>{section.title}</h3> : null}
			<div className="document-section-content">
				{section.body?.map((paragraph) => (
					<p key={paragraph} className="document-body-copy">
						{paragraph}
					</p>
				))}
				{section.metrics?.length ? <MetricList metrics={section.metrics} /> : null}
				{section.items?.length ? <ContentItems items={section.items} /> : null}
				{section.technologies?.length ? (
					<TechnologyList technologies={section.technologies} />
				) : null}
				{section.links?.length ? (
					<ul className="document-link-list">
						{section.links.map((link) => (
							<li key={link.label + '-' + link.href}>
								<DocumentLinkItem link={link} />
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
