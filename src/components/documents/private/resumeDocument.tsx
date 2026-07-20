import { resumeDocument } from '@/data/documents';
import { resumeDocumentDefinition } from '@/data/documents/manifest';
import type {
	PrivateDocumentContact,
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
	contact: PrivateDocumentContact;
}

const ResumeCareerItem = ({ career }: { career: ResumeCareer }) => (
	<article className="resume-career-item break-inside-avoid">
		<header>
			<div>
				<h3>{career.company}</h3>
				<p>{career.role}</p>
			</div>
			<time className="tabular-nums">{career.period}</time>
		</header>
		{career.summary ? (
			<p className="resume-career-summary">{career.summary}</p>
		) : null}
		<DocumentBulletList items={career.highlights} />
	</article>
);

const ResumeProjectItem = ({ project }: { project: ResumeProject }) => (
	<article className="resume-project-item break-inside-avoid">
		<header>
			<div>
				<h3>{project.title}</h3>
				{project.role ? <p>{project.role}</p> : null}
			</div>
			<time className="tabular-nums">{project.period}</time>
		</header>
		<p className="resume-project-summary">{project.summary}</p>
		{project.highlights?.length ? (
			<DocumentBulletList items={project.highlights.slice(0, 1)} />
		) : null}
	</article>
);

export const ResumeDocument = ({ contact }: ResumeDocumentProps) => {
	const copy = resumeDocument;

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
					showPhoto
				/>

				<p className="resume-profile">{copy.profile}</p>

				<DocumentSection title="경력">
					<div className="resume-career-list">
						{copy.careers.map((career) => (
							<ResumeCareerItem
								key={career.company + '-' + career.period}
								career={career}
							/>
						))}
					</div>
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

				<DocumentSection title="프로젝트" compact>
					<div className="resume-project-list">
						{copy.projects.map((project) => (
							<ResumeProjectItem key={project.id} project={project} />
						))}
					</div>
				</DocumentSection>

				<DocumentSection title="기술" compact>
					<DocumentSkillGroups groups={copy.skillGroups} compact />
				</DocumentSection>

				<div className="resume-bottom-grid">
					<DocumentSection title="교육" compact>
						<ul className="private-document-simple-list">
							{copy.education.map((item) => (
								<li key={item.title + '-' + item.period}>
									<header>
										<strong>{item.title}</strong>
										<time className="tabular-nums">{item.period}</time>
									</header>
									<p>{item.detail}</p>
								</li>
							))}
						</ul>
					</DocumentSection>

					<DocumentSection title="수상" compact>
						<ul className="private-document-simple-list">
							{copy.awards.map((item) => (
								<li key={item.title + '-' + item.period}>
									<header>
										<strong>{item.title}</strong>
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
