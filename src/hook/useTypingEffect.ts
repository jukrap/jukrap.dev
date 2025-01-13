import { useState, useEffect } from 'react';
import { TypingEffectOptions } from '@/types/hook';
import { getEmojiLength } from '@/util/stringUtils';

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

			if (isDeleting) {
				// 삭제할 때는 이모지 여부를 체크하고 이모지라면 전체를 한 번에 삭제
				const nextChar = currentText.slice(typedText.length - 2, typedText.length);
				const emojiLength = getEmojiLength(nextChar);
				const deleteLength = emojiLength > 0 ? emojiLength : 1;
				setTypedText(typedText.slice(0, -deleteLength));
			} else {
				// 타이핑할 때는 기존 로직 유지
				const remainingText = currentText.slice(typedText.length);
				const emojiLength = getEmojiLength(remainingText);
				if (emojiLength > 0) {
					setTypedText(currentText.slice(0, typedText.length + emojiLength));
					return;
				}
				setTypedText(currentText.slice(0, typedText.length + 1));
			}

			// 삭제 완료 또는 타이핑 완료 시 상태 변경
			if (!isDeleting && typedText === currentText) {
				timeout = setTimeout(() => {
					setIsDeleting(true);
					if (onComplete) onComplete();
				}, pauseDuration);
			} else if (isDeleting && typedText === '') {
				setIsDeleting(false);
				setCurrentIndex((currentIndex + 1) % texts.length);
			}
		};

		timeout = setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);

		return () => {
			if (timeout) clearTimeout(timeout);
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
