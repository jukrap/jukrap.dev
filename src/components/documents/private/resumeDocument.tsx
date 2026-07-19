import { resumeDocument } from '@/data/documents';
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
	<article className="break-inside-avoid border-t border-[#1b1b18]/14 py-3 first:border-t-0 first:pt-0 last:pb-0">
		<div className="flex items-baseline justify-between gap-4">
			<h3 className="text-[0.9375rem] font-bold leading-6">{career.company}</h3>
			<p className="shrink-0 text-[0.75rem] font-medium leading-5 text-[#1b1b18]/62 tabular-nums">
				{career.period}
			</p>
		</div>
		<dl className="mt-0.5 flex flex-wrap gap-x-5 gap-y-0.5 text-[0.75rem] leading-5">
			<div className="flex gap-1.5">
				<dt className="font-medium text-[#1b1b18]/56">공식 직급</dt>
				<dd className="font-semibold">{career.officialTitle}</dd>
			</div>
			<div className="flex gap-1.5">
				<dt className="font-medium text-[#1b1b18]/56">실제 역할</dt>
				<dd className="font-semibold">{career.role}</dd>
			</div>
		</dl>
		{career.summary && (
			<p className="mt-2 text-[0.8125rem] leading-5 text-[#1b1b18]/78">
				{career.summary}
			</p>
		)}
		<DocumentBulletList
			items={career.highlights}
			className="mt-2 text-[0.8125rem] leading-5"
		/>
	</article>
);

const ResumeProjectItem = ({ project }: { project: ResumeProject }) => (
	<article className="break-inside-avoid border-t border-[#1b1b18]/14 py-3 first:border-t-0 first:pt-0 last:pb-0">
		<div className="flex items-baseline justify-between gap-4">
			<h3 className="text-[0.9375rem] font-bold leading-6">{project.title}</h3>
			<p className="shrink-0 text-[0.75rem] font-medium leading-5 text-[#1b1b18]/62 tabular-nums">
				{project.period}
			</p>
		</div>
		{project.role && (
			<p className="mt-0.5 text-[0.75rem] font-semibold leading-5 text-[#1b1b18]/68">
				{project.role}
			</p>
		)}
		<p className="mt-1.5 text-[0.8125rem] leading-5 text-[#1b1b18]/84">
			{project.summary}
		</p>
		{project.highlights && project.highlights.length > 0 && (
			<DocumentBulletList
				items={project.highlights}
				className="mt-2 text-[0.8125rem] leading-5"
			/>
		)}
		<p className="mt-2 text-[0.75rem] leading-5 text-[#1b1b18]/62">
			{project.technologies.join(', ')}
		</p>
	</article>
);

export const ResumeDocument = ({ contact }: ResumeDocumentProps) => {
	const copy = resumeDocument;

	return (
		<div className="private-document resume-document space-y-6 print:space-y-0">
			<PrivateDocumentPage
				documentClassName="resume-page"
				pageNumber={1}
				totalPages={2}
				footerLabel={contact.name}
			>
				<PrivateDocumentHeader
					contact={contact}
					documentTitle={copy.title}
					role={copy.role}
					showPhoto
				/>

				<div className="space-y-4">
					<DocumentSection title="소개">
						<p className="max-w-[44rem] text-[0.875rem] font-medium leading-6 text-[#1b1b18]/88">
							{copy.profile}
						</p>
					</DocumentSection>

					<DocumentSection title="핵심 역량">
						<dl className="space-y-2.5">
							{copy.competencies.map((competency) => (
								<div
									key={competency.title}
									className="grid grid-cols-1 gap-0.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4 print:grid-cols-[8rem_minmax(0,1fr)] print:gap-4"
								>
									<dt className="text-[0.8125rem] font-semibold leading-5">
										{competency.title}
									</dt>
									<dd className="text-[0.8125rem] leading-5 text-[#1b1b18]/78">
										{competency.detail}
									</dd>
								</div>
							))}
						</dl>
					</DocumentSection>

					<DocumentSection title="경력">
						<div>
							{copy.careers.map((career) => (
								<ResumeCareerItem
									key={`${career.company}-${career.period}`}
									career={career}
								/>
							))}
						</div>
					</DocumentSection>
				</div>
			</PrivateDocumentPage>

			<PrivateDocumentPage
				documentClassName="resume-page"
				pageNumber={2}
				totalPages={2}
				footerLabel={contact.name}
			>
				<PageContinuationHeader
					documentTitle={copy.title}
					name={contact.name}
					role={copy.role}
				/>

				<div className="space-y-5">
					<DocumentSection title="선별 프로젝트">
						<div>
							{copy.projects.map((project) => (
								<ResumeProjectItem key={project.id} project={project} />
							))}
						</div>
					</DocumentSection>

					<DocumentSection title="기술">
						<DocumentSkillGroups groups={copy.skillGroups} />
					</DocumentSection>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:grid-cols-2">
						<DocumentSection title="교육">
							<ul className="space-y-3">
								{copy.education.map((item) => (
									<li
										key={`${item.title}-${item.period}`}
										className="break-inside-avoid"
									>
										<div className="flex items-baseline justify-between gap-3">
											<strong className="text-[0.8125rem] leading-5">{item.title}</strong>
											<span className="shrink-0 text-[0.6875rem] text-[#1b1b18]/58 tabular-nums">
												{item.period}
											</span>
										</div>
										<p className="mt-0.5 text-[0.75rem] leading-5 text-[#1b1b18]/72">
											{item.detail}
										</p>
									</li>
								))}
							</ul>
						</DocumentSection>

						<DocumentSection title="수상">
							<ul className="space-y-3">
								{copy.awards.map((item) => (
									<li
										key={`${item.title}-${item.period}`}
										className="break-inside-avoid"
									>
										<div className="flex items-baseline justify-between gap-3">
											<strong className="text-[0.8125rem] leading-5">{item.title}</strong>
											<span className="shrink-0 text-[0.6875rem] text-[#1b1b18]/58 tabular-nums">
												{item.period}
											</span>
										</div>
										<p className="mt-0.5 text-[0.75rem] leading-5 text-[#1b1b18]/72">
											{item.detail}
										</p>
									</li>
								))}
							</ul>
						</DocumentSection>
					</div>
				</div>
			</PrivateDocumentPage>
		</div>
	);
};
