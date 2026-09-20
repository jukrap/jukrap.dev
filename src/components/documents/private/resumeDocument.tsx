import type { Locale } from '@/types/locale';
import { getResumeDocument } from '@/data/documents';
import { resumeDocumentDefinition } from '@/data/documents/manifest';
import type {
	DocumentContact,
	ResumeCareer,
	ResumeProject,
} from '@/types/documents';
import {
	DocumentBulletList,
	DocumentSection,
	DocumentSkillGroups,
	PageContinuationHeader,
	PrivateDocumentHeader,
	PrivateDocumentPage,
} from './privateDocumentPrimitives';

export interface ResumeDocumentProps {
	contact: DocumentContact;
	locale?: Locale;
}

const ResumeCareerItem = ({ career }: { career: ResumeCareer }) => (
	<article className="resume-career-item break-inside-avoid">
		<header>
			<div>
				<h3 className="document-heading-item">{career.company}</h3>
				<p>{[career.officialTitle, career.role].filter(Boolean).join(' / ')}</p>
			</div>
			<time className="tabular-nums">{career.period}</time>
		</header>
		{career.summary && !career.workItems?.length ? (
			<p className="resume-career-summary">{career.summary}</p>
		) : null}
		{career.workItems?.length ? (
			<div className="resume-work-groups">
				{career.workItems.map((work) => (
					<section key={work.title} className="resume-work-group">
						<h4>{work.title}</h4>
						<p className="resume-work-scope">{work.scope}</p>
						<DocumentBulletList items={work.highlights} />
					</section>
				))}
			</div>
		) : (
			<DocumentBulletList items={career.highlights} />
		)}
	</article>
);

const ResumeProjectItem = ({ project }: { project: ResumeProject }) => (
	<article className="resume-project-item break-inside-avoid">
		<header>
			<div>
				<h3 className="document-heading-item">{project.title}</h3>
				{project.role ? <p>{project.role}</p> : null}
			</div>
			<time className="tabular-nums">{project.period}</time>
		</header>
		<p className="resume-project-summary">{project.summary}</p>
		{project.highlights?.length ? (
			<DocumentBulletList items={project.highlights.slice(0, 1)} />
		) : null}
		{project.links?.length ? (
			<div className="resume-project-links">
				{project.links.map((link) => (
					<a key={link.href} href={link.href}>
						{link.label}
					</a>
				))}
			</div>
		) : null}
	</article>
);

export const ResumeDocument = ({
	contact,
	locale = 'ko',
}: ResumeDocumentProps) => {
	const copy = getResumeDocument(locale);
	const t = (ko: string, en: string) => (locale === 'ko' ? ko : en);
	const remainingProjects = copy.projects;

	return (
		<div className="private-document resume-document">
			<PrivateDocumentPage
				documentClassName="resume-page"
				pageNumber={1}
				totalPages={resumeDocumentDefinition.pageCount}
				footerLabel={contact.name}
			>
				<PrivateDocumentHeader
					contact={contact}
					documentTitle={copy.title}
					role={copy.role}
				/>

				<DocumentSection title={t('경력', 'Experience')}>
					<div className="resume-career-list">
						{copy.careers.map((career) => (
							<ResumeCareerItem
								key={career.company + '-' + career.period}
								career={career}
							/>
						))}
					</div>
				</DocumentSection>

				<DocumentSection title={t('기술', 'Skills')} compact>
					<DocumentSkillGroups groups={copy.skillGroups} compact />
				</DocumentSection>
			</PrivateDocumentPage>

			<PrivateDocumentPage
				documentClassName="resume-page"
				pageNumber={2}
				totalPages={resumeDocumentDefinition.pageCount}
				footerLabel={contact.name}
			>
				<PageContinuationHeader
					documentTitle={copy.title}
					name={contact.name}
					role={copy.role}
					compact
				/>

				<DocumentSection title={t('프로젝트', 'Projects')} compact>
					<div className="resume-project-list">
						{remainingProjects.map((project) => (
							<ResumeProjectItem key={project.id} project={project} />
						))}
					</div>
				</DocumentSection>

				<div className="resume-bottom-grid">
					<DocumentSection title={t('교육·활동', 'Education & activities')} compact>
						<ul className="private-document-simple-list">
							{copy.education.map((item) => (
								<li key={item.title + '-' + item.period}>
									<header>
										<strong className="document-heading-item">{item.title}</strong>
										<time className="tabular-nums">{item.period}</time>
									</header>
									<p>{item.detail}</p>
								</li>
							))}
						</ul>
					</DocumentSection>

					<DocumentSection title={t('수상', 'Awards')} compact>
						<ul className="private-document-simple-list">
							{copy.awards.map((item) => (
								<li key={item.title + '-' + item.period}>
									<header>
										<strong className="document-heading-item">{item.title}</strong>
										<time className="tabular-nums">{item.period}</time>
									</header>
									<p>{item.detail}</p>
								</li>
							))}
						</ul>
					</DocumentSection>
				</div>
			</PrivateDocumentPage>
		</div>
	);
};
