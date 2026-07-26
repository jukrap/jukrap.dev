export function ProofMark({
	variant = 'caret',
	className = '',
}: {
	variant?: 'caret' | 'bracket' | 'underline';
	className?: string;
}) {
	if (variant === 'bracket') {
		return (
			<svg
				viewBox="0 0 56 112"
				fill="none"
				className={className}
				aria-hidden="true"
			>
				<path
					d="M44 4H18v40L8 56l10 12v40h26"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="square"
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
		);
	}

	if (variant === 'underline') {
		return (
			<svg
				viewBox="0 0 180 24"
				fill="none"
				className={className}
				aria-hidden="true"
			>
				<path
					d="M4 15C38 9 70 18 106 12c26-4 47-1 70-8"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
		);
	}

	return (
		<svg viewBox="0 0 72 52" fill="none" className={className} aria-hidden="true">
			<path
				d="M8 42 36 8l28 34"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="square"
				strokeLinejoin="miter"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}
