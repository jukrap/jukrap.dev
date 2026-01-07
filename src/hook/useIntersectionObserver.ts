import { useState, useEffect, useRef, RefObject } from 'react';
import { UseIntersectionObserverProps } from '@/types/hook';

export const useIntersectionObserver = ({
	threshold = 0.1,
	root = null,
	rootMargin = '0px',
	freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}): {
	ref: RefObject<HTMLDivElement | null>;
	isIntersecting: boolean;
} => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = elementRef.current;

		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isElementIntersecting = entry.isIntersecting;
				setIsIntersecting(isElementIntersecting);

				if (isElementIntersecting && freezeOnceVisible) {
					observer.unobserve(element);
				}
			},
			{ threshold, root, rootMargin },
		);

		observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	}, [threshold, root, rootMargin, freezeOnceVisible]);

	return { ref: elementRef, isIntersecting };
};
