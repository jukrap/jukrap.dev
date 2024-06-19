import { useState, useEffect } from 'react';
import { containsEmoji } from '@/util/stringUtils';

interface TypingEffectOptions {
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
	onComplete?: () => void;
}

const useTypingEffect = (
	texts: string[],
	options: TypingEffectOptions = {},
) => {
	const [typedText, setTypedText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [usedIndices, setUsedIndices] = useState<number[]>([]);

	const {
		typingSpeed = 50,
		deletingSpeed = 15,
		pauseDuration = 2500,
		onComplete,
	} = options;

	const getRandomIndex = (excludedIndices: number[], max: number) => {
		let randomIndex: number;
		do {
			randomIndex = Math.floor(Math.random() * max);
		} while (excludedIndices.includes(randomIndex));
		return randomIndex;
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout | undefined;

		if (!isDeleting) {
			timeout = setTimeout(() => {
				const currentText = texts[currentIndex];
				let nextTypedText = '';

				if (typedText === '' && containsEmoji(currentText)) {
					nextTypedText = currentText.slice(0, 2);
				} else {
					nextTypedText = currentText.slice(0, typedText.length + 1);
				}

				setTypedText(nextTypedText);

				if (nextTypedText === currentText) {
					timeout = setTimeout(() => {
						setIsDeleting(true);
						if (onComplete) {
							onComplete();
						}
					}, pauseDuration);
				}
			}, typingSpeed);
		} else {
			timeout = setTimeout(() => {
				const currentText = texts[currentIndex];
				const nextTypedText = currentText.slice(0, typedText.length - 1);

				if (containsEmoji(nextTypedText) && nextTypedText.length === 2) {
					setTypedText('');
					setIsDeleting(false);
					const newUsedIndices = [...usedIndices, currentIndex];
					if (newUsedIndices.length === texts.length) {
						setUsedIndices([]);
					} else {
						setUsedIndices(newUsedIndices);
					}
					const newIndex = getRandomIndex(newUsedIndices, texts.length);
					setCurrentIndex(newIndex);
				} else {
					setTypedText(nextTypedText);
					if (nextTypedText === '') {
						setIsDeleting(false);
						const newUsedIndices = [...usedIndices, currentIndex];
						if (newUsedIndices.length === texts.length) {
							setUsedIndices([]);
						} else {
							setUsedIndices(newUsedIndices);
						}
						const newIndex = getRandomIndex(newUsedIndices, texts.length);
						setCurrentIndex(newIndex);
					}
				}
			}, deletingSpeed);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [
		typedText,
		isDeleting,
		currentIndex,
		usedIndices,
		texts,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
		onComplete,
	]);

	return typedText;
};

export default useTypingEffect;
