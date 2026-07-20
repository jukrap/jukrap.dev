import Image from 'next/image';
import type { ReactNode } from 'react';
import type {
	DocumentSkillGroup,
	PrivateDocumentContact,
} from '@/types/documents';

interface PrivateDocumentPageProps {
	children: ReactNode;
	documentClassName: 'resume-page' | 'career-page';
	pageNumber: number;
	totalPages: number;
	footerLabel: string;
	className?: string;
}

export const PrivateDocumentPage = ({
	children,
	documentClassName,
	pageNumber,
	totalPages,
	footerLabel,
	className = '',
}: PrivateDocumentPageProps) => (
	<section
		className={`document-page print-page ${documentClassName} relative mx-auto flex min-h-[297mm] w-full max-w-[210mm] flex-col overflow-hidden !bg-white px-6 py-8 text-[0.875rem] leading-[1.55] !text-[#1b1b18] shadow-[0_18px_60px_rgba(27,27,24,0.12)] sm:px-10 sm:py-12 print:m-0 print:min-h-[297mm] print:max-w-none print:shadow-none ${className}`}
		data-page={pageNumber}
	>
		{children}
		<footer className="mt-auto flex items-center justify-between border-t border-[#1b1b18]/20 pt-3 text-[0.6875rem] font-medium text-[#1b1b18]/62">
			<span>{footerLabel}</span>
			<span className="tabular-nums">
				{String(pageNumber).padStart(2, '0')} /{' '}
				{String(totalPages).padStart(2, '0')}
			</span>
		</footer>
	</section>
);

interface DocumentSectionProps {
	title: string;
	children: ReactNode;
	className?: string;
	compact?: boolean;
}

export const DocumentSection = ({
	title,
	children,
	className = '',
	compact = false,
}: DocumentSectionProps) => (
	<section className={`break-inside-avoid ${className}`}>
		<h2
			className={`${compact ? 'mb-2 pb-1.5' : 'mb-3 pb-2'} border-b border-[#1b1b18]/25 text-[0.75rem] font-bold leading-5 tracking-[0.06em] text-[#1b1b18]`}
		>
			{title}
		</h2>
		{children}
	</section>
);

interface PrivateDocumentHeaderProps {
	contact: PrivateDocumentContact;
	documentTitle: string;
	role: string;
	showPrivateDetails?: boolean;
	showPhoto?: boolean;
	compact?: boolean;
}

const ContactLinks = ({ links }: Pick<PrivateDocumentContact, 'links'>) => (
	<>
		{links.map((link) => (
			<a
				key={`${link.label}-${link.href}`}
				href={link.href}
				className="underline decoration-[#1b1b18]/25 underline-offset-2"
			>
				{link.label}
			</a>
		))}
	</>
);

export const PrivateDocumentHeader = ({
	contact,
	documentTitle,
	role,
	showPrivateDetails = true,
	showPhoto = false,
	compact = false,
}: PrivateDocumentHeaderProps) => (
	<header
		className={`${compact ? 'mb-5 pb-4' : 'mb-7 pb-6'} flex items-start justify-between gap-6 border-b-2 border-[#1b1b18]`}
	>
		<div className="min-w-0 flex-1">
			<p className="mb-2 text-[0.6875rem] font-bold tracking-[0.1em] text-[#087f62]">
				{documentTitle}
			</p>
			<h1 className="text-[1.85rem] font-bold leading-tight tracking-[-0.035em]">
				{contact.name}
			</h1>
			<p className="mt-1 text-[0.9375rem] font-semibold leading-6">{role}</p>
			<address className="mt-4 flex max-w-[36rem] flex-wrap gap-x-5 gap-y-1 not-italic text-[0.75rem] leading-5 text-[#1b1b18]/72">
				<a href={`mailto:${contact.email}`}>{contact.email}</a>
				{showPrivateDetails && <a href={`tel:${contact.phone}`}>{contact.phone}</a>}
				{showPrivateDetails && <span>출생 {contact.birthYear}</span>}
				<ContactLinks links={contact.links} />
			</address>
		</div>
		{showPhoto && contact.photoSrc && (
			<div className="relative h-[6.6rem] w-[5.2rem] shrink-0 overflow-hidden bg-[#ecece9]">
				<Image
					src={contact.photoSrc}
					alt={`${contact.name} 프로필 사진`}
					fill
					priority
					sizes="84px"
					className="object-cover object-top"
				/>
			</div>
		)}
	</header>
);

interface DocumentBulletListProps {
	items: readonly string[];
	className?: string;
}

export const DocumentBulletList = ({
	items,
	className = '',
}: DocumentBulletListProps) => (
	<ul className={`space-y-1.5 print:list-disc print:pl-4 ${className}`}>
		{items.map((item) => (
			<li
				key={item}
				className="relative pl-3.5 text-[#1b1b18]/86 print:static print:pl-0"
			>
				<span
					className="absolute left-0 top-[0.68em] h-1 w-1 rounded-full bg-[#1ac397] print:hidden"
					aria-hidden="true"
				/>
				{item}
			</li>
		))}
	</ul>
);

export const DocumentSkillGroups = ({
	groups,
	compact = false,
}: {
	groups: readonly DocumentSkillGroup[];
	compact?: boolean;
}) => (
	<dl className="divide-y divide-[#1b1b18]/12">
		{groups.map((group) => (
			<div
				key={group.label}
				className={`grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 ${compact ? 'py-1' : 'py-2'} first:pt-0 last:pb-0`}
			>
				<dt className="text-[0.75rem] font-semibold leading-5 text-[#1b1b18]/68">
					{group.label}
				</dt>
				<dd>
					<ul className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[0.8125rem] leading-5 text-[#1b1b18]/86">
						{group.items.map((item, index) => (
							<li key={item} className="whitespace-nowrap">
								{item}
								{index < group.items.length - 1 ? ',' : ''}
							</li>
						))}
					</ul>
				</dd>
			</div>
		))}
	</dl>
);

export const PageContinuationHeader = ({
	documentTitle,
	name,
	role,
	compact = false,
}: {
	documentTitle: string;
	name: string;
	role: string;
	compact?: boolean;
}) => (
	<header
		className={`${compact ? 'mb-4 pb-2' : 'mb-7 pb-4'} flex items-end justify-between border-b-2 border-[#1b1b18]`}
	>
		<div>
			<p className="text-[0.6875rem] font-bold tracking-[0.1em] text-[#087f62]">
				{documentTitle}
			</p>
			<p className="mt-1 text-[1.2rem] font-bold tracking-[-0.02em]">{name}</p>
		</div>
		<p className="text-[0.75rem] font-medium text-[#1b1b18]/68">{role}</p>
	</header>
);
