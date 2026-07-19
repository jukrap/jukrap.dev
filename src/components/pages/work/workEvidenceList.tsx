import type { WorkImpact } from '@/types/work';

interface WorkEvidenceListProps {
	items: WorkImpact[];
}

export const WorkEvidenceList = ({ items }: WorkEvidenceListProps) => (
	<dl className="divide-y divide-border/45">
		{items.map((item) => (
			<div key={`${item.value}-${item.label}`} className="py-4">
				<dt className="text-sm font-semibold leading-6 text-foreground/80 break-keep">
					{item.label}
				</dt>
				<dd className="mt-0.5 text-[1.0625rem] font-semibold leading-7 text-foreground tabular-nums break-words">
					{item.value}
				</dd>
				{item.detail && (
					<dd className="mt-1 text-[0.9375rem] leading-6 text-foreground/75 break-keep">
						{item.detail}
					</dd>
				)}
			</div>
		))}
	</dl>
);
