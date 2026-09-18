import type { Locale } from '@/types/locale';
import { getCareerBriefDocument } from '@/data/documents';
import { careerBriefDocumentDefinition } from '@/data/documents/manifest';
import type {
	CareerBriefFeaturedWork,
	CareerBriefSupportingWork,
	DocumentContact,
} from '@/types/documents';
import {
	DocumentBulletList,
	DocumentSection,
	PageContinuationHeader,
	PrivateDocumentHeader,
	PrivateDocumentPage,
} from './privateDocumentPrimitives';

export interface CareerBriefDocumentProps {
	contact: DocumentContact;
	locale?: Locale;
}

const CareerBriefWork = ({
	work,
	locale,
}: {
	work: CareerBriefFeaturedWork;
	locale: Locale;
}) => (
	<article className="career-work-item break-inside-avoid">
		<header>
			<div>
				<p>{work.platform}</p>
				<h3 className="document-heading-item">{work.title}</h3>
			</div>
			<time className="tabular-nums">{work.period}</time>
		</header>
		<p className="career-work-context">{work.goal}</p>
		<div className="career-work-actions">
			<h4 className="document-heading-label">
				{locale === 'ko' ? '담당 구현' : 'Implementation'}
			</h4>
			<DocumentBulletList items={[work.contribution, work.decision]} />
		</div>
		<div className="career-work-result">
			<h4 className="document-heading-label">
				{locale === 'ko' ? '결과' : 'Outcome'}
			</h4>
			<p>{work.result}</p>
		</div>
	</article>
);

const SupportingWorkItem = ({ work }: { work: CareerBriefSupportingWork }) => (
	<li className="career-supporting-item break-inside-avoid">
		<header>
			<h3 className="document-heading-item">{work.title}</h3>
			<time className="tabular-nums">{work.period}</time>
		</header>
		<p>
			{work.decision} <span>{work.result}</span>
		</p>
	</li>
);

export const CareerBriefDocument = ({
	contact,
	locale = 'ko',
}: CareerBriefDocumentProps) => {
	const copy = getCareerBriefDocument(locale);
	const t = (ko: string, en: string) => (locale === 'ko' ? ko : en);
	const firstPageWork = copy.featuredWork.slice(0, 2);
	const secondPageWork = copy.featuredWork.slice(2, 4);

	return (
		<div className="private-document career-brief-document">
			<PrivateDocumentPage
				documentClassName="career-page"
				pageNumber={1}
				totalPages={careerBriefDocumentDefinition.pageCount}
				footerLabel={contact.name}
			>
				<PrivateDocumentHeader
					contact={contact}
					documentTitle={copy.title}
					role={copy.role}
					showPrivateDetails={false}
					compact
				/>

				<section className="career-company">
					<header>
						<div>
							<h2 className="document-heading-item">{copy.company.name}</h2>
							<p>
								{[copy.company.officialTitle, copy.company.role]
									.filter(Boolean)
									.join(' / ')}
							</p>
						</div>
						<time className="tabular-nums">{copy.company.period}</time>
					</header>
					<p>{copy.company.summary}</p>
					<DocumentBulletList items={copy.company.responsibilities} />
				</section>

				<DocumentSection title={t('주요 업무', 'Selected work')}>
					<div className="career-work-list">
						{firstPageWork.map((work) => (
							<CareerBriefWork key={work.id} work={work} locale={locale} />
						))}
					</div>
				</DocumentSection>
			</PrivateDocumentPage>

			<PrivateDocumentPage
				documentClassName="career-page"
				pageNumber={2}
				totalPages={careerBriefDocumentDefinition.pageCount}
				footerLabel={contact.name}
			>
				<PageContinuationHeader
					documentTitle={copy.title}
					name={contact.name}
					role={copy.role}
					compact
				/>

				<DocumentSection title={t('주요 업무', 'Selected work')} compact>
					<div className="career-work-list">
						{secondPageWork.map((work) => (
							<CareerBriefWork key={work.id} work={work} locale={locale} />
						))}
					</div>
				</DocumentSection>

				<DocumentSection title={t('추가 업무', 'Additional work')} compact>
					<ul className="career-supporting-list">
						{copy.supportingWork.map((work) => (
							<SupportingWorkItem key={work.id} work={work} />
						))}
					</ul>
				</DocumentSection>
			</PrivateDocumentPage>
		</div>
	);
};
