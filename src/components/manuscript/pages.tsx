import Link from 'next/link';
import { portfolioData } from '@/data/i18n/portfolio';
import { dictionaries } from '@/data/i18n/dictionaries';
import {
	caseStudyRecords,
	getLocalizedCopy,
	projectRecords,
} from '@/data/manuscript';
import type { Locale } from '@/types/locale';
import type { CaseStudyRecord, ProjectRecord } from '@/types/manuscript';
import { ImageGallery } from './imageGallery';
import { ExternalWindowNote } from './externalWindowNote';
import { ProofMark } from './proofMark';

const copy = {
	ko: {
		role: 'Web & Mobile Frontend Engineer',
		hero: '사용자가 만지는 구조를 설계하고, 끝까지 다듬습니다.',
		casesLead:
			'웹과 모바일 앱의 사용자 흐름부터 Android 장비와 운영 배포까지, 복잡한 경계를 어떤 기준으로 나누고 검증했는지 정리했습니다.',
		archiveLead:
			'웹, 모바일, 개발 도구 중심의 개인 프로젝트를 실제 기록과 공개 가능한 자료로 정리했습니다.',
		profileLead:
			'웹과 모바일 앱의 사용자 흐름을 화면 너머까지 확인하는 프론트엔드 개발자, 박주철입니다.',
		selected: '선택한 기록',
		viewAll: '전체 보기',
		method: '작업 방식',
		contact: '연락',
		context: '맥락과 경계',
		decisions: '판단과 이유',
		results: '확인한 결과',
		evidence: '원본 위치',
		media: '프로젝트 화면',
		details: '상세 기록',
		links: '외부 링크',
		unavailable: '현재 공개 링크 없음',
		skills: '기술 영역',
		career: '경력 기록',
		activities: '활동',
		awards: '수상',
		previous: '이전',
		next: '다음',
	},
	en: {
		role: 'Web & Mobile Frontend Engineer',
		hero: 'I build the structures people use—and keep revising until they hold.',
		casesLead:
			'Selected work showing how I separated and verified complex flows across web and mobile apps, Android devices, and production delivery.',
		archiveLead:
			'Personal work across web, mobile, and developer tooling, mapped to the existing record and publishable material.',
		profileLead:
			"I'm Ju-cheol Park, a frontend engineer who follows user flows across web and mobile apps beyond the screen.",
		selected: 'Selected records',
		viewAll: 'View all',
		method: 'Working method',
		contact: 'Contact',
		context: 'Context and boundary',
		decisions: 'Decisions and rationale',
		results: 'Verified results',
		evidence: 'Source locators',
		media: 'Project screens',
		details: 'Detail record',
		links: 'External links',
		unavailable: 'No public link at present',
		skills: 'Working areas',
		career: 'Career record',
		activities: 'Activities',
		awards: 'Awards',
		previous: 'Previous',
		next: 'Next',
	},
} as const;

function Arrow() {
	return (
		<svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
			<path
				d="M4 16h22M19 9l7 7-7 7"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="square"
				strokeLinejoin="miter"
			/>
		</svg>
	);
}

function CaseRow({
	record,
	index,
	locale,
}: {
	record: CaseStudyRecord;
	index: number;
	locale: Locale;
}) {
	return (
		<Link
			href={`/${locale}/cases/${record.slug}`}
			className="manuscript-index-row"
		>
			<span className="font-metadata text-sm manuscript-muted">
				{String(index + 1).padStart(2, '0')}
			</span>
			<span className="manuscript-row-title">
				{getLocalizedCopy(record.title, locale)}
			</span>
			<span className="manuscript-row-meta">
				{getLocalizedCopy(record.role, locale)}
			</span>
			<span className="manuscript-row-meta">{record.period}</span>
			<span className="manuscript-row-arrow">
				<Arrow />
			</span>
		</Link>
	);
}

function ProjectRow({
	record,
	index,
	locale,
}: {
	record: ProjectRecord;
	index: number;
	locale: Locale;
}) {
	return (
		<Link
			href={`/${locale}/archive/${record.slug}`}
			className="manuscript-index-row"
		>
			<span className="font-metadata text-sm manuscript-muted">
				{String(index + 1).padStart(2, '0')}
			</span>
			<span className="manuscript-row-title">
				{getLocalizedCopy(record.title, locale)}
			</span>
			<span className="manuscript-row-meta">{record.platform.join(' / ')}</span>
			<span className="manuscript-row-meta">{record.period}</span>
			<span className="manuscript-row-arrow">
				<Arrow />
			</span>
		</Link>
	);
}

function SectionHeading({ label, title }: { label: string; title?: string }) {
	return (
		<div>
			<p className="manuscript-section-label">{label}</p>
			{title && <h2 className="manuscript-section-title mt-4">{title}</h2>}
		</div>
	);
}

export function IndexPage({ locale }: { locale: Locale }) {
	const localizedData = portfolioData[locale];
	const featuredCases = caseStudyRecords.slice(0, 3);
	const featuredProjects = projectRecords.slice(0, 3);
	const profileLinks = localizedData.aboutLinks.filter(
		(link) => link.url && link.url !== '/',
	);

	return (
		<>
			<section className="relative grid min-h-[min(46rem,78vh)] gap-8 border-b manuscript-rule py-12 md:grid-cols-[2fr_10fr] md:py-20">
				<div className="order-1 self-start font-metadata text-[0.72rem] leading-7 manuscript-muted">
					<p>INDEX / 01</p>
					<p>{copy[locale].role}</p>
				</div>
				<div className="order-2 flex max-w-[76rem] flex-col justify-center">
					<h1 className="font-editorial max-w-[15ch] text-[clamp(2.7rem,7vw,7.5rem)] font-medium leading-[1.06] tracking-[-0.055em] text-balance">
						{copy[locale].hero}
					</h1>
					<div className="relative mt-10 border-t manuscript-rule pt-5">
						<p className="font-metadata text-sm">{copy[locale].role}</p>
						<ProofMark
							variant="caret"
							className="absolute -top-5 right-[4%] hidden h-12 w-16 manuscript-blue sm:block"
						/>
					</div>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid mb-10">
					<SectionHeading label="CASES" title={copy[locale].selected} />
					<p className="manuscript-copy self-end">{copy[locale].casesLead}</p>
				</div>
				<div>
					{featuredCases.map((record, index) => (
						<CaseRow
							key={record.slug}
							record={record}
							index={index}
							locale={locale}
						/>
					))}
				</div>
				<Link
					href={`/${locale}/cases`}
					className="mt-6 inline-flex min-h-11 items-center gap-3 font-metadata text-xs manuscript-external"
				>
					{copy[locale].viewAll} <Arrow />
				</Link>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="METHOD" title={copy[locale].method} />
					<div className="relative max-w-4xl">
						<h2 className="font-editorial text-[clamp(1.8rem,3.5vw,3.6rem)] font-medium leading-tight tracking-[-0.035em]">
							{localizedData.coreValues[0]?.title}
						</h2>
						<p className="manuscript-copy mt-7 manuscript-muted">
							{localizedData.coreValues[0]?.content}
						</p>
					</div>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid mb-10">
					<SectionHeading label="ARCHIVE" title={copy[locale].selected} />
					<p className="manuscript-copy self-end">{copy[locale].archiveLead}</p>
				</div>
				<div>
					{featuredProjects.map((record, index) => (
						<ProjectRow
							key={record.slug}
							record={record}
							index={index}
							locale={locale}
						/>
					))}
				</div>
				<Link
					href={`/${locale}/archive`}
					className="mt-6 inline-flex min-h-11 items-center gap-3 font-metadata text-xs manuscript-external"
				>
					{copy[locale].viewAll} <Arrow />
				</Link>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="COLOPHON" title={copy[locale].contact} />
					<div>
						<p className="manuscript-copy">{copy[locale].profileLead}</p>
						<ul className="mt-8 border-t manuscript-rule">
							{profileLinks.map((link) => (
								<li key={link.url} className="border-b manuscript-rule">
									<a
										href={link.url}
										target={link.isExternal ? '_blank' : undefined}
										rel={link.isExternal ? 'noopener noreferrer' : undefined}
										className="flex min-h-14 items-center justify-between font-metadata text-sm manuscript-external"
									>
										{link.text}
										<span aria-hidden="true">{link.isExternal ? '↗' : '→'}</span>
										{link.isExternal && <ExternalWindowNote locale={locale} />}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}

export function CasesPage({ locale }: { locale: Locale }) {
	return (
		<>
			<header className="manuscript-page-header">
				<p className="manuscript-section-label">CASES / 01—09</p>
				<div>
					<h1 className="manuscript-page-title">CASES</h1>
					<p className="manuscript-page-lead">{copy[locale].casesLead}</p>
				</div>
			</header>
			<section className="py-8" aria-label={copy[locale].selected}>
				{caseStudyRecords.map((record, index) => (
					<CaseRow key={record.slug} record={record} index={index} locale={locale} />
				))}
			</section>
		</>
	);
}

function DetailNavigation({
	locale,
	base,
	index,
	records,
}: {
	locale: Locale;
	base: 'cases' | 'archive';
	index: number;
	records: Array<{ slug: string; title: Record<Locale, string> }>;
}) {
	const previous = index > 0 ? records[index - 1] : null;
	const next = index < records.length - 1 ? records[index + 1] : null;

	return (
		<nav
			className="grid gap-px border-y manuscript-rule py-8 sm:grid-cols-2"
			aria-label={
				locale === 'ko' ? '상세 기록 사이 이동' : 'Navigate detail records'
			}
		>
			{previous ? (
				<Link
					href={`/${locale}/${base}/${previous.slug}`}
					className="min-h-20 border-b manuscript-rule p-4 sm:border-b-0 sm:border-r"
				>
					<span className="font-metadata text-[0.68rem] manuscript-muted">
						← {copy[locale].previous}
					</span>
					<span className="mt-2 block font-editorial text-xl">
						{previous.title[locale]}
					</span>
				</Link>
			) : (
				<span aria-hidden="true" />
			)}
			{next ? (
				<Link
					href={`/${locale}/${base}/${next.slug}`}
					className="min-h-20 p-4 text-right"
				>
					<span className="font-metadata text-[0.68rem] manuscript-muted">
						{copy[locale].next} →
					</span>
					<span className="mt-2 block font-editorial text-xl">
						{next.title[locale]}
					</span>
				</Link>
			) : null}
		</nav>
	);
}

export function CaseDetailPage({
	locale,
	record,
}: {
	locale: Locale;
	record: CaseStudyRecord;
}) {
	const index = caseStudyRecords.findIndex((item) => item.slug === record.slug);

	return (
		<article>
			<header className="manuscript-detail-header">
				<Link
					href={`/${locale}/cases`}
					className="inline-flex min-h-11 w-fit items-center font-metadata text-xs manuscript-external"
				>
					← CASES
				</Link>
				<h1 className="manuscript-page-title">
					{getLocalizedCopy(record.title, locale)}
				</h1>
				<p className="manuscript-page-lead mt-0">
					{getLocalizedCopy(record.summary, locale)}
				</p>
				<dl className="manuscript-detail-meta">
					<div>
						<dt>ROLE</dt>
						<dd>{getLocalizedCopy(record.role, locale)}</dd>
					</div>
					<div>
						<dt>PERIOD</dt>
						<dd>{record.period}</dd>
					</div>
					<div>
						<dt>STACK</dt>
						<dd>{record.stack.join(' / ')}</dd>
					</div>
					<div>
						<dt>SOURCE MAP</dt>
						<dd>{record.evidence.length} locators</dd>
					</div>
				</dl>
			</header>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="01" title={copy[locale].context} />
					<p className="manuscript-copy">
						{getLocalizedCopy(record.context, locale)}
					</p>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="02" title={copy[locale].decisions} />
					<ol className="manuscript-note-list border-t manuscript-rule">
						{record.decisions.map((decision, decisionIndex) => (
							<li
								key={`${decision.title.ko}-${decisionIndex}`}
								className="manuscript-note"
							>
								<span className="font-metadata text-xs manuscript-muted">
									{String(decisionIndex + 1).padStart(2, '0')}
								</span>
								<div>
									<h3>{getLocalizedCopy(decision.title, locale)}</h3>
									<p className="mt-3 leading-7 manuscript-muted">
										{getLocalizedCopy(decision.body, locale)}
									</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="03" title={copy[locale].results} />
					<dl className="border-t manuscript-rule">
						{record.verifiedResults.map((result, resultIndex) => (
							<div
								key={`${result.evidence}-${resultIndex}`}
								className="grid gap-4 border-b manuscript-rule py-5 md:grid-cols-[1fr_4fr_2fr]"
							>
								<dt className="font-metadata text-xs manuscript-muted">
									R{String(resultIndex + 1).padStart(2, '0')}
								</dt>
								<dd className="font-editorial text-xl leading-7">
									{getLocalizedCopy(result.statement, locale)}
								</dd>
								<dd className="font-metadata text-[0.65rem] leading-5 manuscript-muted">
									{result.evidence}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="04" title={copy[locale].evidence} />
					<ul className="manuscript-stack">
						{record.evidence.map((evidence) => (
							<li key={evidence}>{evidence}</li>
						))}
					</ul>
				</div>
			</section>

			<DetailNavigation
				locale={locale}
				base="cases"
				index={index}
				records={caseStudyRecords}
			/>
		</article>
	);
}

export function ArchivePage({ locale }: { locale: Locale }) {
	return (
		<>
			<header className="manuscript-page-header">
				<p className="manuscript-section-label">
					ARCHIVE / 01—{String(projectRecords.length).padStart(2, '0')}
				</p>
				<div>
					<h1 className="manuscript-page-title">ARCHIVE</h1>
					<p className="manuscript-page-lead">{copy[locale].archiveLead}</p>
				</div>
			</header>
			<section className="py-8" aria-label={copy[locale].selected}>
				{projectRecords.map((record, index) => (
					<ProjectRow
						key={record.slug}
						record={record}
						index={index}
						locale={locale}
					/>
				))}
			</section>
		</>
	);
}

export function ProjectDetailPage({
	locale,
	record,
}: {
	locale: Locale;
	record: ProjectRecord;
}) {
	const index = projectRecords.findIndex((item) => item.slug === record.slug);
	const availableLinks = record.links.filter((link) => link.available);

	return (
		<article>
			<header className="manuscript-detail-header">
				<Link
					href={`/${locale}/archive`}
					className="inline-flex min-h-11 w-fit items-center font-metadata text-xs manuscript-external"
				>
					← ARCHIVE
				</Link>
				<h1 className="manuscript-page-title">
					{getLocalizedCopy(record.title, locale)}
				</h1>
				<p className="manuscript-page-lead mt-0">
					{getLocalizedCopy(record.summary, locale)}
				</p>
				<dl className="manuscript-detail-meta">
					<div>
						<dt>PLATFORM</dt>
						<dd>{record.platform.join(' / ')}</dd>
					</div>
					<div>
						<dt>ROLE</dt>
						<dd>{getLocalizedCopy(record.role, locale)}</dd>
					</div>
					<div>
						<dt>PERIOD</dt>
						<dd>{record.period}</dd>
					</div>
					<div>
						<dt>STACK</dt>
						<dd>{record.stack.join(' / ')}</dd>
					</div>
				</dl>
			</header>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="01" title={copy[locale].links} />
					{availableLinks.length > 0 ? (
						<ul className="border-t manuscript-rule">
							{availableLinks.map((link) => (
								<li
									key={`${link.label.ko}-${link.href}`}
									className="border-b manuscript-rule"
								>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="flex min-h-14 items-center justify-between font-metadata text-sm manuscript-external"
									>
										{getLocalizedCopy(link.label, locale)}
										<ExternalWindowNote locale={locale} />
										<span aria-hidden="true">↗</span>
									</a>
								</li>
							))}
						</ul>
					) : (
						<p className="manuscript-copy manuscript-muted">
							{copy[locale].unavailable}
						</p>
					)}
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="02" title={copy[locale].details} />
					<div className="manuscript-note-list border-t manuscript-rule">
						{record.detailSections.map((section, sectionIndex) => (
							<div
								key={`${section.title.ko}-${sectionIndex}`}
								className="manuscript-note"
							>
								<span className="font-metadata text-xs manuscript-muted">
									{String(sectionIndex + 1).padStart(2, '0')}
								</span>
								<div>
									<h3>{getLocalizedCopy(section.title, locale)}</h3>
									<p className="mt-3 whitespace-pre-line leading-7 manuscript-muted">
										{getLocalizedCopy(section.body, locale)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{record.media.length > 0 && (
				<section className="manuscript-section">
					<div className="manuscript-section-grid">
						<SectionHeading label="03" title={copy[locale].media} />
						<ImageGallery media={record.media} locale={locale} />
					</div>
				</section>
			)}

			<DetailNavigation
				locale={locale}
				base="archive"
				index={index}
				records={projectRecords}
			/>
		</article>
	);
}

export function ProfilePage({ locale }: { locale: Locale }) {
	const localizedData = portfolioData[locale];
	const career = dictionaries[locale].about.careerSummary;

	return (
		<>
			<header className="manuscript-page-header">
				<p className="manuscript-section-label">PROFILE / 01</p>
				<div>
					<h1 className="manuscript-page-title">PROFILE</h1>
					<p className="manuscript-page-lead">{copy[locale].profileLead}</p>
					<p className="mt-6 font-metadata text-sm">{copy[locale].role}</p>
				</div>
			</header>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="01" title={copy[locale].skills} />
					<dl className="border-t manuscript-rule">
						{localizedData.skills.map((skill) => (
							<div
								key={skill.category}
								className="grid gap-3 border-b manuscript-rule py-5 sm:grid-cols-[1fr_2fr]"
							>
								<dt className="font-editorial text-xl">{skill.category}</dt>
								<dd className="leading-7 manuscript-muted">{skill.items}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="02" title={copy[locale].career} />
					<div className="border-t manuscript-rule">
						<div className="grid gap-4 border-b manuscript-rule py-6 md:grid-cols-[2fr_2fr_6fr]">
							<h3 className="font-editorial text-2xl">{career.company}</h3>
							<p className="font-metadata text-xs manuscript-muted">{career.period}</p>
							<ul className="space-y-3 leading-7 manuscript-muted">
								{career.details.map((detail) => (
									<li key={detail}>{detail}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="03" title={copy[locale].activities} />
					<ul className="border-t manuscript-rule">
						{localizedData.activities.map((activity) => (
							<li
								key={activity.id}
								className="grid gap-3 border-b manuscript-rule py-5 md:grid-cols-[2fr_2fr_6fr]"
							>
								<h3 className="font-editorial text-xl">{activity.title}</h3>
								<p className="font-metadata text-xs manuscript-muted">
									{activity.period}
								</p>
								<div>
									<p className="font-medium">{activity.role}</p>
									<ul className="mt-2 space-y-2 leading-7 manuscript-muted">
										{activity.details.map((detail) => (
											<li key={detail}>{detail}</li>
										))}
									</ul>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="04" title={copy[locale].awards} />
					<ul className="border-t manuscript-rule">
						{localizedData.awards.map((award) => (
							<li
								key={`${award.title}-${award.period}`}
								className="grid gap-3 border-b manuscript-rule py-5 md:grid-cols-[2fr_2fr_6fr]"
							>
								<h3 className="font-editorial text-xl">{award.title}</h3>
								<p className="font-metadata text-xs manuscript-muted">{award.period}</p>
								<p>{award.award}</p>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="manuscript-section">
				<div className="manuscript-section-grid">
					<SectionHeading label="05" title={copy[locale].contact} />
					<ul className="border-t manuscript-rule">
						{localizedData.aboutLinks.map((link) => (
							<li key={link.url} className="border-b manuscript-rule">
								<a
									href={link.url}
									target={link.isExternal ? '_blank' : undefined}
									rel={link.isExternal ? 'noopener noreferrer' : undefined}
									className="flex min-h-14 items-center justify-between font-metadata text-sm manuscript-external"
								>
									{link.text}
									<span aria-hidden="true">{link.isExternal ? '↗' : '→'}</span>
									{link.isExternal && <ExternalWindowNote locale={locale} />}
								</a>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
}
