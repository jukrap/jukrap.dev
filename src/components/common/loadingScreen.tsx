'use client';

import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC<{ onLoadingComplete: () => void }> = ({
	onLoadingComplete,
}) => {
	const [isTextExiting, setIsTextExiting] = useState(false);
	const [isBackgroundExiting, setIsBackgroundExiting] = useState(false);

	useEffect(() => {
		const textTimer = setTimeout(() => {
			setIsTextExiting(true);
		}, 1500);

		const backgroundTimer = setTimeout(() => {
			setIsBackgroundExiting(true);
		}, 2000);

		const completeTimer = setTimeout(() => {
			onLoadingComplete();
		}, 2500);

		return () => {
			clearTimeout(textTimer);
			clearTimeout(backgroundTimer);
			clearTimeout(completeTimer);
		};
	}, [onLoadingComplete]);

	return (
		<div
			className={`fixed inset-0 bg-background z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
				isBackgroundExiting ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<h1
				className={`text-foreground text-6xl font-bold select-none ${
					isTextExiting ? 'tracking-out-contract' : 'tracking-in-expand'
				}`}
			>
				Jukrap
			</h1>
			<p className="absolute bottom-8 text-base text-muted-foreground select-none">
				Created by Ju-cheol Park
			</p>
		</div>
	);
};

export default LoadingScreen;
