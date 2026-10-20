'use client';

import ScrollReveal from '@/components/common/scrollReveal';
import React from 'react';
import Link from 'next/link';
import {
	ChevronRight,
	ClipboardList,
	PanelsTopLeft,
	UserRound,
} from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { getRecruitingDocumentManifest } from '@/data/documents/manifest';

export const PortfolioSection = () => {
	const { dictionary, locale } = useLocale();
	const recruitingDocumentManifest = getRecruitingDocumentManifest(locale);
	const copy = {
		portfolio: {
			icon: PanelsTopLeft,
			title: dictionary.home.portfolioTitle,
			description: dictionary.home.portfolioDescription,
			linkLabel: dictionary.home.portfolioLinkLabel,
		},
		resume: {
			icon: UserRound,
			title: dictionary.home.resumeTitle,
			description: dictionary.home.resumeDescription,
			linkLabel: dictionary.home.resumeLinkLabel,
		},
		'career-brief': {
			icon: ClipboardList,
			title: dictionary.home.careerBriefTitle,
			description: dictionary.home.careerBriefDescription,
			linkLabel: dictionary.home.careerBriefLinkLabel,
		},
	};

	return (
		<ScrollReveal
			id="documents"
			className="home-documents"
			aria-labelledby="home-documents-title"
		>
			<div className="flex w-full flex-col gap-7">
				<div className="break-keep">
					<p className="home-section-label">DOCUMENTS</p>
					<h2 id="home-documents-title" className="home-documents-title">
						{dictionary.home.documentsTitle}
					</h2>
					<p className="mt-3 text-base leading-relaxed text-muted-foreground">
						{dictionary.home.documentsDescription}
					</p>
				</div>

				<div className="grid w-full gap-4 lg:grid-cols-3">
					{recruitingDocumentManifest.documents
						.filter(
							(document) => document.visibility === 'public' && document.showOnHome,
						)
						.map((document) => {
							const Icon = copy[document.id].icon;
							return (
								<article
									key={document.id}
									className="home-document-card flex min-w-0 flex-col gap-5 rounded-lg p-6"
								>
									<div className="space-y-2">
										<h3 className="flex items-center gap-2 text-lg font-bold leading-6 text-foreground">
											<Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
											{copy[document.id].title}
										</h3>
										<p className="text-sm leading-relaxed text-muted-foreground break-keep">
											{copy[document.id].description}
										</p>
									</div>
									<Link
										href={document.slug}
										className="home-document-link mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-center text-base font-semibold leading-5"
									>
										<ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
										<span>{copy[document.id].linkLabel}</span>
									</Link>
								</article>
							);
						})}
				</div>
				<div className="flex flex-col items-start gap-3 border-t border-border/40 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
					<div className="min-w-0">
						<h3 className="text-base font-semibold text-foreground">
							AI Agent Playbook
						</h3>
						<p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">
							{locale === 'ko'
								? 'AI 코딩 도구가 프로젝트 규칙과 작업 기록을 이어서 참고하도록 만든 개발 도구입니다. 기능 범위를 정한 이유와 설치 실패에서 기존 파일을 지키는 과정을 소개합니다.'
								: 'A developer tool that carries project rules and work history across AI coding sessions. Read how I defined its scope and protected existing files when installation fails.'}
						</p>
					</div>
					<Link
						href={`/${locale}/portfolio#ai-agent-playbook`}
						className="inline-flex shrink-0 items-center gap-1 py-2 text-sm font-semibold text-foreground underline decoration-accent/70 underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent"
					>
						{locale === 'ko' ? '설계 판단 보기' : 'Read the design decisions'}
						<ChevronRight className="h-4 w-4" aria-hidden="true" />
					</Link>
				</div>
			</div>
		</ScrollReveal>
	);
};
