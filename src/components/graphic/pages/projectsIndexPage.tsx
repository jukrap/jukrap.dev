'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProjectsScene } from '@/components/graphic/scenes/projectsScene';
import { useLocale } from '@/contexts/localeContext';
import { projectRecords } from '@/data/graphicPortfolio';
import { getLocalizedPath } from '@/lib/locale';

export function ProjectsIndexPage() {
	const { locale } = useLocale();
	const isKo = locale === 'ko';
	const ordered = useMemo(
		() => [
			...projectRecords.filter(({ slug }) => slug === 'ai-agent-playbook'),
			...projectRecords.filter(({ slug }) => slug !== 'ai-agent-playbook'),
		],
		[],
	);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [rotationStep, setRotationStep] = useState(0);
	const selected = ordered[selectedIndex];

	const selectProject = (index: number) => {
		setSelectedIndex(index);
		setRotationStep(0);
	};

	return (
		<section className="graphic-index-page graphic-projects-page">
			<header className="graphic-page-heading">
				<h1>PROJECTS</h1>
				<p>
					{isKo
						? '실제 프로젝트 미디어와 공개 링크를 하나의 아티팩트로 살펴봅니다.'
						: 'Inspect approved project media and public links as one artifact.'}
				</p>
			</header>
			<div className="graphic-projects-layout">
				<div
					className="graphic-selector"
					role="group"
					aria-label={isKo ? '프로젝트 선택' : 'Select a project'}
				>
					{ordered.map((project, index) => (
						<button
							key={project.slug}
							type="button"
							aria-pressed={index === selectedIndex}
							onClick={() => selectProject(index)}
						>
							<span className="graphic-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<strong>{project.title[locale]}</strong>
							<span>{project.platform.join(' / ')}</span>
						</button>
					))}
				</div>
				<div className="graphic-project-stage">
					<ProjectsScene
						record={selected}
						rotationStep={rotationStep}
						locale={locale}
					/>
					<div className="graphic-artifact-controls">
						<button
							type="button"
							onClick={() => setRotationStep((current) => Math.max(-2, current - 1))}
							aria-label={isKo ? '아티팩트 왼쪽 회전' : 'Rotate artifact left'}
						>
							<ArrowLeft aria-hidden />
						</button>
						<button
							type="button"
							onClick={() => setRotationStep(0)}
							aria-label={isKo ? '아티팩트 회전 초기화' : 'Reset artifact rotation'}
						>
							<RotateCcw aria-hidden />
						</button>
						<button
							type="button"
							onClick={() => setRotationStep((current) => Math.min(2, current + 1))}
							aria-label={isKo ? '아티팩트 오른쪽 회전' : 'Rotate artifact right'}
						>
							<ArrowRight aria-hidden />
						</button>
					</div>
					<div className="graphic-project-summary" aria-live="polite">
						<h2>{selected.title[locale]}</h2>
						<dl>
							<div>
								<dt>{isKo ? '플랫폼' : 'Platform'}</dt>
								<dd>{selected.platform.join(' / ')}</dd>
							</div>
							<div>
								<dt>{isKo ? '역할' : 'Role'}</dt>
								<dd>{selected.role[locale]}</dd>
							</div>
							<div>
								<dt>{isKo ? '기술' : 'Stack'}</dt>
								<dd>{selected.stack.slice(0, 4).join(' / ')}</dd>
							</div>
						</dl>
						<div className="graphic-project-actions">
							<Link href={getLocalizedPath(`/projects/${selected.slug}`, locale)}>
								{isKo ? '프로젝트 자세히 보기' : 'View project detail'}
								<ArrowRight aria-hidden />
							</Link>
							{selected.links[0] ? (
								<a href={selected.links[0].href} target="_blank" rel="noreferrer">
									{selected.links[0].label[locale]}
									<ExternalLink aria-hidden />
								</a>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
