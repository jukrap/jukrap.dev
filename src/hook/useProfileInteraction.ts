import { useState, useRef, useEffect } from 'react';

export const useProfileInteraction = () => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [isMessageFadingOut, setIsMessageFadingOut] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleImageClick = () => {
		if (showMessage) {
			setIsMessageFadingOut(true);
			setTimeout(() => {
				setShowMessage(false);
				setIsMessageFadingOut(false);
				setIsFlipped(!isFlipped);
			}, 300);
		} else {
			setIsFlipped(!isFlipped);
		}
	};

	const handleMouseEnter = () => {
		timeoutRef.current = setTimeout(() => {
			setShowMessage(true);
		}, 1000);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		if (showMessage) {
			setIsMessageFadingOut(true);
			setTimeout(() => {
				setShowMessage(false);
				setIsMessageFadingOut(false);
			}, 200);
		}
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		isFlipped,
		showMessage,
		isMessageFadingOut,
		handleImageClick,
		handleMouseEnter,
		handleMouseLeave,
	};
};
