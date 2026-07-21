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
		className={
			'document-page print-page private-document-page ' +
			documentClassName +
			' ' +
			className
		}
		data-page={pageNumber}
	>
		{children}
		<footer className="private-document-footer">
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
	<section
		className={
			'private-document-section break-inside-avoid ' +
			(compact ? 'private-document-section-compact ' : '') +
			className
		}
	>
		<h2>{title}</h2>
		<div className="private-document-section-body">{children}</div>
	</section>
);

interface PrivateDocumentHeaderProps {
	contact: PrivateDocumentContact;
	documentTitle: string;
	role: string;
	showPrivateDetails?: boolean;
	compact?: boolean;
}

const ContactLinks = ({ links }: Pick<PrivateDocumentContact, 'links'>) => (
	<>
		{links.map((link) => (
			<a key={link.label + '-' + link.href} href={link.href}>
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
	compact = false,
}: PrivateDocumentHeaderProps) => (
	<header
		className={
			'private-document-header ' +
			(compact ? 'private-document-header-compact' : '')
		}
	>
		<div>
			<p className="private-document-kicker">{documentTitle}</p>
			<h1>{contact.name}</h1>
			<p className="private-document-role">{role}</p>
			<address>
				<a href={'mailto:' + contact.email}>{contact.email}</a>
				{showPrivateDetails && <a href={'tel:' + contact.phone}>{contact.phone}</a>}
				<ContactLinks links={contact.links} />
			</address>
		</div>
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
	<ul className={'private-document-bullets ' + className}>
		{items.map((item) => (
			<li key={item}>{item}</li>
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
	<dl
		className={
			'private-document-skills ' +
			(compact ? 'private-document-skills-compact' : '')
		}
	>
		{groups.map((group) => (
			<div key={group.label}>
				<dt>{group.label}</dt>
				<dd>
					<ul>
						{group.items.map((item, index) => (
							<li key={item}>
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
		className={
			'private-document-continuation ' +
			(compact ? 'private-document-continuation-compact' : '')
		}
	>
		<div>
			<p>{documentTitle}</p>
			<strong>{name}</strong>
		</div>
		<span>{role}</span>
	</header>
);
