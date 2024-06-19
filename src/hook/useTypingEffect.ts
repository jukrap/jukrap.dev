import { useState, useEffect } from 'react';
import { getEmojiLength } from '../util/stringUtils';

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

	const {
		typingSpeed = 50,
		deletingSpeed = 15,
		pauseDuration = 2500,
		onComplete,
	} = options;

	useEffect(() => {
		let timeout: NodeJS.Timeout | undefined;

		const typeText = () => {
			const currentText = texts[currentIndex];
			const nextTypedText = isDeleting
				? currentText.slice(0, typedText.length - 1)
				: currentText.slice(0, typedText.length + 1);

			// 이모지 처리 부분 개선
			if (!isDeleting) {
				const emojiLength = getEmojiLength(currentText.slice(typedText.length));
				if (emojiLength > 0) {
					setTypedText(currentText.slice(0, typedText.length + emojiLength));
					return;
				}
			}

			setTypedText(nextTypedText);

			if (!isDeleting && nextTypedText === currentText) {
				timeout = setTimeout(() => {
					setIsDeleting(true);
					if (onComplete) {
						onComplete();
					}
				}, pauseDuration);
			} else if (isDeleting && nextTypedText === '') {
				setIsDeleting(false);
				setCurrentIndex((currentIndex + 1) % texts.length);
			}
		};

		timeout = setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [
		typedText,
		isDeleting,
		currentIndex,
		texts,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
		onComplete,
	]);

	return typedText;
};

export default useTypingEffect;
