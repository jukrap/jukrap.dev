import type { WorkImpact } from '@/types/work';

interface WorkEvidenceListProps {
	items: WorkImpact[];
}

export const getWorkMeasurements = (items: WorkImpact[]) =>
	items.filter((item) => item.presentation === 'measurement');

export const WorkEvidenceList = ({ items }: WorkEvidenceListProps) => (
	<dl className="divide-y divide-border/45">
		{items.map((item) => (
			<div
				key={`${item.value}-${item.label}`}
				className="py-5 first:pt-0 last:pb-0"
			>
				<dt className="text-xs font-medium leading-5 text-muted-foreground break-keep">
					{item.label}
				</dt>
				<dd className="mt-1 text-[1.0625rem] font-semibold leading-7 text-foreground tabular-nums break-words">
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
