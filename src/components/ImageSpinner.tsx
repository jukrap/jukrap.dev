import React from 'react';

interface ImageSpinnerProps {
	className?: string;
}

const ImageSpinner: React.FC<ImageSpinnerProps> = ({ className = '' }) => {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div className="relative w-10 h-10">
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="w-10 h-10 border-4 border-accent/30 rounded-full"></div>
					<div className="absolute top-0 left-0 w-10 h-10 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
				</div>
			</div>
		</div>
	);
};

export default ImageSpinner;
