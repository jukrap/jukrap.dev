import { useCallback, useEffect, useRef, useState } from 'react';

export const useProfileInteraction = () => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const hintDismissed = useRef(false);
	const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const clearHint = useCallback(() => {
		if (hintTimer.current !== null) clearTimeout(hintTimer.current);
		hintTimer.current = null;
	}, []);
	const handleMouseEnter = () => {
		if (hintDismissed.current) return;
		clearHint();
		hintTimer.current = setTimeout(() => setShowMessage(true), 650);
	};
	const handleMouseLeave = () => {
		hintDismissed.current = false;
		clearHint();
		setShowMessage(false);
	};
	const handleImageClick = () => {
		hintDismissed.current = true;
		clearHint();
		setShowMessage(false);
		setIsFlipped((current) => !current);
	};
	useEffect(() => clearHint, [clearHint]);
	return {
		isFlipped,
		showMessage,
		handleImageClick,
		handleMouseEnter,
		handleMouseLeave,
	};
};
