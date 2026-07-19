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

export function TechnologyList({
	technologies,
	label = '사용 기술',
}: {
	technologies: readonly string[];
	label?: string;
}) {
	if (!technologies.length) return null;

	return (
		<div className="document-technology-list">
			<p className="mb-1.5 text-[10px] font-semibold text-muted-foreground">
				{label}
			</p>
			<ul
				aria-label={label}
				className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[13.5px] font-medium leading-5 text-foreground/75"
			>
				{technologies.map((technology, index) => (
					<li key={technology} className="whitespace-nowrap">
						{technology}
						{index < technologies.length - 1 ? ',' : ''}
					</li>
				))}
			</ul>
		</div>
	);
}

function MetricList({ metrics }: { metrics: readonly DocumentMetric[] }) {
	return (
		<dl className="document-evidence-list divide-y divide-border/25 border-y border-border/30">
			{metrics.map((metric) => (
				<div
					key={`${metric.label}-${metric.value}`}
					className="document-no-break grid gap-1 py-2.5 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] sm:gap-x-6"
				>
					<dt className="text-[13px] font-semibold leading-5 text-foreground/75">
						{metric.label}
					</dt>
					<dd>
						<p className="text-[16px] font-semibold leading-5 tabular-nums text-foreground">
							{metric.value}
						</p>
						{metric.detail ? (
							<p className="mt-0.5 text-[13px] leading-[1.55] text-foreground/70">
								{metric.detail}
							</p>
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
			className="group inline-flex max-w-full flex-col rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
		>
			<span className="text-[13px] font-semibold leading-5 text-foreground underline decoration-border underline-offset-4 group-hover:decoration-accent">
				{link.label}
			</span>
			{compact ? null : (
				<span className="break-all text-[10px] leading-4 text-muted-foreground">
					{link.href.replace(/^https?:\/\//, '')}
				</span>
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
		<ul className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">
			{links.map((link) => (
				<li key={`${link.label}-${link.href}`}>
					<DocumentLinkItem link={link} />
				</li>
			))}
		</ul>
	);
}

function ContentItems({ items }: { items: readonly DocumentContentItem[] }) {
	return (
		<ul className="document-item-list divide-y divide-border/25 border-y border-border/30">
			{items.map((item, index) => (
				<li
					key={`${item.title}-${index}`}
					className="document-no-break grid gap-1.5 py-2.5 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] sm:gap-x-6"
				>
					<div>
						{item.label ? (
							<p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
								{item.label}
							</p>
						) : null}
						<p className="mt-0.5 text-[14px] font-semibold leading-5 text-foreground">
							{item.title}
						</p>
						{item.meta ? (
							<p className="mt-0.5 text-[11.5px] leading-4 text-muted-foreground">
								{item.meta}
							</p>
						) : null}
					</div>
					<div>
						{item.value ? (
							<p className="text-[15px] font-semibold leading-5 tabular-nums text-foreground">
								{item.value}
							</p>
						) : null}
						{item.description ? (
							<p className="text-[13.5px] leading-[1.62] text-foreground/75">
								{item.description}
							</p>
						) : null}
						<ItemTechnologyList item={item} />
						{item.links?.length ? <ItemLinks links={item.links} /> : null}
					</div>
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
	const headingId = `${pageId}-${section.id}-title`;

	return (
		<section
			aria-labelledby={section.title ? headingId : undefined}
			className={joinClasses(
				'document-section document-no-break',
				compact ? 'space-y-2' : 'space-y-3',
			)}
		>
			{section.title ? (
				<h3
					id={headingId}
					className="text-[13px] font-bold leading-5 text-foreground"
				>
					{section.title}
				</h3>
			) : null}
			{section.body?.map((paragraph) => (
				<p
					key={paragraph}
					className={joinClasses(
						'leading-[1.68] text-foreground/80',
						compact ? 'text-[13.5px]' : 'text-[14px]',
					)}
				>
					{paragraph}
				</p>
			))}
			{section.metrics?.length ? <MetricList metrics={section.metrics} /> : null}
			{section.items?.length ? <ContentItems items={section.items} /> : null}
			{section.technologies?.length ? (
				<TechnologyList technologies={section.technologies} />
			) : null}
			{section.links?.length ? (
				<ul className="space-y-1.5">
					{section.links.map((link) => (
						<li key={`${link.label}-${link.href}`}>
							<DocumentLinkItem link={link} />
						</li>
					))}
				</ul>
			) : null}
		</section>
	);
}

export function PortfolioFigure({
	image,
	priority,
}: {
	image: PortfolioPageImage;
	priority: boolean;
}) {
	const isPhone = image.layout === 'phone';
	const isSplit = image.layout === 'split';
	const isPortrait = isPhone || isSplit;

	return (
		<figure
			className={joinClasses(
				'document-figure document-no-break',
				isPhone && 'mx-auto w-full max-w-[150px]',
				isSplit && 'mx-auto w-full max-w-[180px]',
				!isPortrait && 'w-full',
			)}
		>
			<div
				className={joinClasses(
					'relative overflow-hidden border border-border/30 bg-muted/25',
					isPortrait ? 'aspect-[9/19]' : 'aspect-[16/5]',
				)}
			>
				<Image
					src={image.src}
					alt={image.alt}
					fill
					priority={priority}
					sizes="(max-width: 640px) 92vw, 720px"
					className="object-contain"
				/>
			</div>
			{image.caption ? (
				<figcaption className="mt-1.5 text-[10px] leading-4 text-muted-foreground">
					{image.caption}
				</figcaption>
			) : null}
		</figure>
	);
}
