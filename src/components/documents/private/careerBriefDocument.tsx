import { careerBriefDocument } from '@/data/documents';
import type {
	CareerBriefFeaturedWork,
	CareerBriefSupportingWork,
	PrivateDocumentContact,
} from '@/types/documents';
import {
	DocumentBulletList,
	DocumentSection,
	DocumentSkillGroups,
	PageContinuationHeader,
	PrivateDocumentHeader,
	PrivateDocumentPage,
} from './privateDocumentPrimitives';

export interface CareerBriefDocumentProps {
	contact: PrivateDocumentContact;
}

const selectRepresentativeEvidence = (evidence: readonly string[]) => {
	return evidence.slice(0, 1);
};

const CareerBriefWork = ({ work }: { work: CareerBriefFeaturedWork }) => (
	<article className="break-inside-avoid border-t border-[#1b1b18]/18 py-3 first:border-t-0 first:pt-0 last:pb-0">
		<header className="mb-2">
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="text-[1rem] font-bold leading-6 tracking-[-0.015em]">
					{work.title}
				</h3>
				<span className="shrink-0 text-[0.75rem] font-medium text-[#1b1b18]/60 tabular-nums">
					{work.period}
				</span>
			</div>
			<p className="mt-0.5 text-[0.75rem] font-semibold leading-5 text-[#087f62]">
				{work.platform}
			</p>
		</header>

		<dl className="space-y-1 text-[0.8125rem] leading-5">
			{[
				['목표', work.goal],
				['개인 기여', work.contribution],
				['핵심 판단', work.decision],
				['결과', work.result],
			].map(([label, value]) => (
				<div key={label} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
					<dt className="font-semibold text-[#1b1b18]/62">{label}</dt>
					<dd className="text-[#1b1b18]/84">{value}</dd>
				</div>
			))}
		</dl>

		{work.evidence.length > 0 && (
			<div className="mt-2 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
				<p className="text-[0.8125rem] font-semibold leading-5 text-[#1b1b18]/62">
					검증
				</p>
				<DocumentBulletList
					items={selectRepresentativeEvidence(work.evidence)}
					className="text-[0.8125rem] leading-5"
				/>
			</div>
		)}
	</article>
);

const SupportingWorkItem = ({ work }: { work: CareerBriefSupportingWork }) => (
	<li className="grid break-inside-avoid grid-cols-1 gap-0.5 border-t border-[#1b1b18]/14 py-1 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-3 print:grid-cols-[9rem_minmax(0,1fr)_auto] print:items-baseline print:gap-3">
		<h3 className="text-[0.8125rem] font-bold leading-5">{work.title}</h3>
		<p className="text-[0.75rem] leading-5 text-[#1b1b18]/78">{work.result}</p>
		<span className="text-[0.6875rem] text-[#1b1b18]/56 tabular-nums sm:text-right print:text-right">
			{work.period}
		</span>
	</li>
);

export const CareerBriefDocument = ({ contact }: CareerBriefDocumentProps) => {
	const copy = careerBriefDocument;
	const firstPageWork = copy.featuredWork.slice(0, 2);
	const secondPageWork = copy.featuredWork.slice(2, 4);

	return (
		<div className="private-document career-brief-document space-y-6 print:space-y-0">
			<PrivateDocumentPage
				documentClassName="career-page"
				pageNumber={1}
				totalPages={2}
				footerLabel={contact.name}
			>
				<PrivateDocumentHeader
					contact={contact}
					documentTitle={copy.title}
					role={copy.role}
					showPrivateDetails={false}
					compact
				/>

				<div className="space-y-4">
					<DocumentSection title="경력 개요" compact>
						<div className="flex items-baseline justify-between gap-4">
							<h3 className="text-[1rem] font-bold leading-6">{copy.company.name}</h3>
							<p className="shrink-0 text-[0.75rem] font-medium text-[#1b1b18]/60 tabular-nums">
								{copy.company.period}
							</p>
						</div>
						<dl className="mt-1 flex flex-wrap gap-x-5 gap-y-0.5 text-[0.75rem] leading-5">
							<div className="flex gap-1.5">
								<dt className="font-medium text-[#1b1b18]/56">공식 직급</dt>
								<dd className="font-semibold">{copy.company.officialTitle}</dd>
							</div>
							<div className="flex gap-1.5">
								<dt className="font-medium text-[#1b1b18]/56">실제 역할</dt>
								<dd className="font-semibold">{copy.company.role}</dd>
							</div>
						</dl>
						<p className="mt-2 text-[0.8125rem] leading-5 text-[#1b1b18]/82">
							{copy.company.summary}
						</p>
					</DocumentSection>

					<DocumentSection title="책임 경계" compact>
						<ul className="grid grid-cols-2 gap-x-5 gap-y-1 text-[0.8125rem] leading-5">
							{copy.company.responsibilities.map((item) => (
								<li key={item} className="relative pl-3.5 text-[#1b1b18]/86">
									<span className="absolute left-0 top-[0.68em] h-1 w-1 rounded-full bg-[#1ac397]" />
									{item}
								</li>
							))}
						</ul>
					</DocumentSection>

					<DocumentSection title="대표 업무 01–02" compact>
						<div>
							{firstPageWork.map((work) => (
								<CareerBriefWork key={work.id} work={work} />
							))}
						</div>
					</DocumentSection>
				</div>
			</PrivateDocumentPage>

			<PrivateDocumentPage
				documentClassName="career-page"
				pageNumber={2}
				totalPages={2}
				footerLabel={contact.name}
			>
				<PageContinuationHeader
					documentTitle={copy.title}
					name={contact.name}
					role={copy.role}
					compact
				/>

				<div className="space-y-4">
					<DocumentSection title="대표 업무 03–04" compact>
						<div>
							{secondPageWork.map((work) => (
								<CareerBriefWork key={work.id} work={work} />
							))}
						</div>
					</DocumentSection>

					<DocumentSection title="함께 정리한 업무" compact>
						<ul>
							{copy.supportingWork.map((work) => (
								<SupportingWorkItem key={work.id} work={work} />
							))}
						</ul>
					</DocumentSection>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:grid-cols-2">
						<DocumentSection title="기술 환경" compact>
							<DocumentSkillGroups groups={copy.skillGroups} compact />
						</DocumentSection>

						<DocumentSection title="운영 및 QA" compact>
							<div className="space-y-2">
								{copy.practices.map((practice) => (
									<div key={practice.title} className="break-inside-avoid">
										<h3 className="text-[0.8125rem] font-semibold leading-5">
											{practice.title}
										</h3>
										<p className="mt-0.5 text-[0.75rem] leading-5 text-[#1b1b18]/78">
											{practice.items.join(' ')}
										</p>
									</div>
								))}
							</div>
						</DocumentSection>
					</div>
				</div>
			</PrivateDocumentPage>
		</div>
	);
};
