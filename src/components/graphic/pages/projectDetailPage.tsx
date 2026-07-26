import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { MediaGallery } from '@/components/graphic/mediaGallery';
import { projectRecords } from '@/data/graphicPortfolio';
import { getLocalizedPath } from '@/lib/locale';
import type { Locale } from '@/types/locale';
import type { ProjectRecord } from '@/types/portfolioExperiment';

export function ProjectDetailPage({
	record,
	locale,
}: {
	record: ProjectRecord;
	locale: Locale;
}) {
	const isKo = locale === 'ko';
	const currentIndex = projectRecords.findIndex(
		(candidate) => candidate.slug === record.slug,
	);
	const previous =
		projectRecords[
			(currentIndex - 1 + projectRecords.length) % projectRecords.length
		];
	const next = projectRecords[(currentIndex + 1) % projectRecords.length];

	return (
		<article className="graphic-detail-page graphic-project-detail-page">
			<Link
				className="graphic-back-link"
				href={getLocalizedPath('/projects', locale)}
				prefetch={false}
			>
				<ArrowLeft aria-hidden />
				PROJECTS
			</Link>
			<header className="graphic-detail-header">
				<h1>{record.title[locale]}</h1>
				<p>{record.summary[locale]}</p>
				<dl>
					<div>
						<dt>{isKo ? '플랫폼' : 'Platform'}</dt>
						<dd>{record.platform.join(' / ')}</dd>
					</div>
					<div>
						<dt>{isKo ? '역할' : 'Role'}</dt>
						<dd>{record.role[locale]}</dd>
					</div>
					<div>
						<dt>{isKo ? '기술' : 'Stack'}</dt>
						<dd>{record.stack.join(' / ')}</dd>
					</div>
				</dl>
				{record.links.length ? (
					<div className="graphic-external-links">
						{record.links.map((link) => (
							<a key={link.href} href={link.href} target="_blank" rel="noreferrer">
								{link.label[locale]}
								<ExternalLink aria-hidden />
							</a>
						))}
					</div>
				) : null}
			</header>
			<section className="graphic-detail-section">
				<h2>{isKo ? '프로젝트 미디어' : 'Project media'}</h2>
				<MediaGallery media={record.media} locale={locale} />
			</section>
			<section className="graphic-detail-section">
				<h2>{isKo ? '구현 기록' : 'Implementation record'}</h2>
				<div className="graphic-decision-list">
					{record.detailSections.map((section, index) => (
						<article key={`${section.title[locale]}-${index}`}>
							<span className="graphic-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<div>
								<h3>{section.title[locale]}</h3>
								<p>{section.body[locale]}</p>
							</div>
						</article>
					))}
				</div>
			</section>
			<section className="graphic-detail-section graphic-provenance">
				<h2>{isKo ? '미디어 출처' : 'Media provenance'}</h2>
				<ul>
					{record.media.map((media) => (
						<li key={media.source}>
							<span>{media.source}</span>
							<span>{media.provenance}</span>
							<span>{media.license}</span>
						</li>
					))}
				</ul>
			</section>
			<nav
				className="graphic-detail-pagination"
				aria-label={isKo ? '프로젝트 이동' : 'Project navigation'}
			>
				<Link href={getLocalizedPath(`/projects/${previous.slug}`, locale)}>
					<ArrowLeft aria-hidden />
					<span>
						<small>{isKo ? '이전 프로젝트' : 'Previous project'}</small>
						{previous.title[locale]}
					</span>
				</Link>
				<Link href={getLocalizedPath(`/projects/${next.slug}`, locale)}>
					<span>
						<small>{isKo ? '다음 프로젝트' : 'Next project'}</small>
						{next.title[locale]}
					</span>
					<ArrowRight aria-hidden />
				</Link>
			</nav>
		</article>
	);
}
