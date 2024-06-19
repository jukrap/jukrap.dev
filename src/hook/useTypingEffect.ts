import { useState, useEffect } from 'react';
import { containsEmoji } from '@/util/stringUtils';

const useTypingEffect = (greetings: string[]) => {
	const [typedText, setTypedText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [usedIndices, setUsedIndices] = useState<number[]>([]);

	const getRandomIndex = (excludedIndices: number[], max: number) => {
		let randomIndex: number;
		do {
			randomIndex = Math.floor(Math.random() * max);
		} while (excludedIndices.includes(randomIndex));
		return randomIndex;
	};

	useEffect(() => {
		const typingSpeed = 50;
		const deletingSpeed = 15;
		const pauseDuration = 2500;
		let timeout: NodeJS.Timeout | undefined;

		if (!isDeleting) {
			timeout = setTimeout(() => {
				const currentGreeting = greetings[currentIndex];
				let nextTypedText = '';

				if (typedText === '' && containsEmoji(currentGreeting)) {
					nextTypedText = currentGreeting.slice(0, 2);
				} else {
					nextTypedText = currentGreeting.slice(0, typedText.length + 1);
				}

				setTypedText(nextTypedText);

				if (nextTypedText === currentGreeting) {
					timeout = setTimeout(() => {
						setIsDeleting(true);
					}, pauseDuration);
				}
			}, typingSpeed);
		} else {
			timeout = setTimeout(() => {
				const currentGreeting = greetings[currentIndex];
				const nextTypedText = currentGreeting.slice(0, typedText.length - 1);

				if (containsEmoji(nextTypedText) && nextTypedText.length === 2) {
					setTypedText('');
					setIsDeleting(false);
					const newUsedIndices = [...usedIndices, currentIndex];
					if (newUsedIndices.length === greetings.length) {
						setUsedIndices([]);
					} else {
						setUsedIndices(newUsedIndices);
					}
					const newIndex = getRandomIndex(newUsedIndices, greetings.length);
					setCurrentIndex(newIndex);
				} else {
					setTypedText(nextTypedText);
					if (nextTypedText === '') {
						setIsDeleting(false);
						const newUsedIndices = [...usedIndices, currentIndex];
						if (newUsedIndices.length === greetings.length) {
							setUsedIndices([]);
						} else {
							setUsedIndices(newUsedIndices);
						}
						const newIndex = getRandomIndex(newUsedIndices, greetings.length);
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
	}, [typedText, isDeleting, currentIndex, usedIndices, greetings]);

	return typedText;
};

export default useTypingEffect;
