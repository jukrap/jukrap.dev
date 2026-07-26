'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { caseStudyRecords, projectRecords } from '@/data/graphicPortfolio';
import { getLocalizedPath } from '@/lib/locale';
import { OverviewScene } from '@/components/graphic/scenes/overviewScene';

export function OverviewPage() {
	const { locale } = useLocale();
	const isKo = locale === 'ko';
	const selectedCases = caseStudyRecords.slice(0, 3);
	const selectedProjects = projectRecords.filter((project) =>
		['ai-agent-playbook', 'captain-donghae', 'sharebby'].includes(project.slug),
	);

	return (
		<>
			<section className="graphic-overview-hero" aria-labelledby="overview-title">
				<div className="graphic-hero-copy">
					<h1 id="overview-title">
						{isKo
							? '복잡한 경계를, 작동하는 화면으로.'
							: 'Complex boundaries, made operable.'}
					</h1>
					<p className="graphic-job-title">Web &amp; Mobile Frontend Engineer</p>
					<Link
						className="graphic-primary-link"
						href={getLocalizedPath('/work', locale)}
					>
						{isKo ? '대표 업무 보기' : 'View selected work'}
						<ArrowRight aria-hidden />
					</Link>
				</div>
				<div className="graphic-hero-scene">
					<OverviewScene locale={locale} />
				</div>
				<Link
					className="graphic-fold-case"
					href={getLocalizedPath(`/work/${selectedCases[0].slug}`, locale)}
				>
					<span className="graphic-index">01</span>
					<strong>{selectedCases[0].title[locale]}</strong>
					<span>{selectedCases[0].role[locale]}</span>
					<time>{selectedCases[0].period}</time>
					<ArrowRight aria-hidden />
				</Link>
			</section>

			<section className="graphic-section graphic-work-evidence">
				<header className="graphic-section-heading">
					<p>WORK</p>
					<h2>{isKo ? '경계를 나누고 검증한 일' : 'Work defined by boundaries'}</h2>
				</header>
				<div className="graphic-ruled-list">
					{selectedCases.map((record, index) => (
						<Link
							key={record.slug}
							href={getLocalizedPath(`/work/${record.slug}`, locale)}
							className="graphic-case-row"
						>
							<span className="graphic-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<div>
								<strong>{record.title[locale]}</strong>
								<p>{record.summary[locale]}</p>
							</div>
							<span>{record.role[locale]}</span>
							<ArrowRight aria-hidden />
						</Link>
					))}
				</div>
			</section>

			<section className="graphic-section graphic-project-evidence">
				<header className="graphic-section-heading">
					<p>PROJECTS</p>
					<h2>
						{isKo ? '실제 화면으로 남긴 프로젝트' : 'Projects preserved as artifacts'}
					</h2>
				</header>
				<div className="graphic-media-rail">
					{selectedProjects.map((project) => (
						<Link
							key={project.slug}
							href={getLocalizedPath(`/projects/${project.slug}`, locale)}
						>
							<img
								src={project.media[0]?.source}
								alt={project.media[0]?.alt[locale] ?? ''}
								width={project.media[0]?.width ?? 1600}
								height={project.media[0]?.height ?? 900}
							/>
							<span>
								<strong>{project.title[locale]}</strong>
								<ArrowRight aria-hidden />
							</span>
						</Link>
					))}
				</div>
			</section>

			<section className="graphic-section graphic-contact-band">
				<div>
					<p>PROFILE</p>
					<h2>
						{isKo
							? '사용자가 끝까지 사용할 수 있는 기능을 만듭니다.'
							: 'I build features people can use through the final step.'}
					</h2>
				</div>
				<div className="graphic-contact-links">
					<Link href={getLocalizedPath('/profile', locale)}>
						{isKo ? '프로필 보기' : 'View profile'}
						<ArrowRight aria-hidden />
					</Link>
					<a
						href="https://github.com/jukrap/ai-agent-playbook"
						target="_blank"
						rel="noreferrer"
					>
						AI Agent Playbook
						<ExternalLink aria-hidden />
					</a>
				</div>
			</section>
		</>
	);
}
