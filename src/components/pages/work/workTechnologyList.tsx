interface WorkTechnologyListProps {
	items: string[];
}

export const WorkTechnologyList = ({ items }: WorkTechnologyListProps) => (
	<ul className="flex flex-wrap gap-y-1 text-sm leading-6 text-foreground/75">
		{items.map((item, index) => (
			<li key={item} className="flex whitespace-nowrap">
				<span>{item}</span>
				{index < items.length - 1 && (
					<span className="mr-2 text-muted-foreground" aria-hidden="true">
						,
					</span>
				)}
			</li>
		))}
	</ul>
);
