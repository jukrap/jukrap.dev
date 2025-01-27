export interface TypingEffectOptions {
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
	onComplete?: () => void;
}

export interface UseIntersectionObserverProps {
	threshold?: number;
	root?: Element | null;
	rootMargin?: string;
	freezeOnceVisible?: boolean;
}
