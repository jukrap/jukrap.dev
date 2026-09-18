'use client';

import { createElement, useEffect, useRef, type HTMLAttributes } from 'react';
import { animate } from 'framer-motion/dom/mini';
import { inView } from 'framer-motion/dom';

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
	as?: 'section' | 'article' | 'div';
}

/** Visible in SSR and without JavaScript; only offscreen content is animated. */
export default function ScrollReveal({
	as = 'section',
	children,
	...props
}: ScrollRevealProps) {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const containsHashTarget = () => {
			try {
				const target = document.getElementById(
					decodeURIComponent(location.hash.slice(1)),
				);
				return !!target && element.contains(target);
			} catch {
				return false;
			}
		};
		if (
			preference.matches ||
			element.getBoundingClientRect().top < window.innerHeight ||
			element.contains(document.activeElement) ||
			containsHashTarget()
		)
			return;

		const originalOpacity = element.style.opacity;
		let finished = false;
		let animation: ReturnType<typeof animate> | undefined;
		let stopObserving = () => {};
		const showImmediately = () => {
			if (finished) return;
			finished = true;
			animation?.stop();
			element.style.opacity = originalOpacity;
			element.dataset.reveal = 'visible';
			stopObserving();
		};
		const onPreferenceChange = () => {
			if (preference.matches) showImmediately();
		};
		const onHashChange = () => {
			if (containsHashTarget()) showImmediately();
		};

		try {
			stopObserving = inView(
				element,
				() => {
					if (finished) return;
					element.dataset.reveal = 'revealing';
					try {
						animation = animate(
							element,
							{ opacity: [0, 1] },
							{
								duration: 0.38,
								ease: [0.22, 0.61, 0.36, 1],
							},
						);
						void animation.then(showImmediately);
					} catch {
						showImmediately();
					}
				},
				{ margin: '0px 0px -32px 0px' },
			);
			element.style.opacity = '0';
			element.dataset.reveal = 'pending';
		} catch {
			showImmediately();
			return;
		}

		element.addEventListener('focusin', showImmediately);
		window.addEventListener('hashchange', onHashChange);
		window.addEventListener('beforeprint', showImmediately);
		preference.addEventListener('change', onPreferenceChange);
		return () => {
			showImmediately();
			stopObserving();
			element.removeEventListener('focusin', showImmediately);
			window.removeEventListener('hashchange', onHashChange);
			window.removeEventListener('beforeprint', showImmediately);
			preference.removeEventListener('change', onPreferenceChange);
		};
	}, []);

	return createElement(
		as,
		{ ...props, ref, 'data-reveal': 'visible' },
		children,
	);
}
