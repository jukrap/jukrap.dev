export interface ModalEntry {
	content: HTMLElement;
	opener: HTMLElement | null;
}
const stack: ModalEntry[] = [];
let restorePage: (() => void) | undefined;
const focusTopModal = (event: FocusEvent) => {
	const top = stack.at(-1)?.content;
	if (top && !top.contains(event.target as Node))
		top.focus({ preventScroll: true });
};
export function registerModal(entry: ModalEntry) {
	if (stack.length === 0) {
		const body = document.body;
		const previousOverflow = body.style.overflow;
		const previousPadding = body.style.paddingRight;
		const scrollbar = window.innerWidth - document.documentElement.clientWidth;
		const padding = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;
		const app = document.querySelector<HTMLElement>(
			'.site-shell:not(.media-modal-portal)',
		);
		const previousInert = app?.inert;
		const previousHidden = app?.getAttribute('aria-hidden');
		body.style.overflow = 'hidden';
		if (scrollbar > 0) body.style.paddingRight = `${padding + scrollbar}px`;
		if (app) {
			app.inert = true;
			app.setAttribute('aria-hidden', 'true');
		}
		document.addEventListener('focusin', focusTopModal);
		restorePage = () => {
			body.style.overflow = previousOverflow;
			body.style.paddingRight = previousPadding;
			if (app) {
				app.inert = previousInert ?? false;
				if (previousHidden === null) app.removeAttribute('aria-hidden');
				else if (previousHidden !== undefined)
					app.setAttribute('aria-hidden', previousHidden);
			}
			document.removeEventListener('focusin', focusTopModal);
		};
	}
	const previous = stack.at(-1)?.content;
	if (previous) {
		previous.inert = true;
		previous.setAttribute('aria-hidden', 'true');
	}
	stack.push(entry);
	entry.content.focus({ preventScroll: true });
	let released = false;
	return () => {
		if (released) return;
		released = true;
		const index = stack.indexOf(entry);
		const wasTop = index === stack.length - 1;
		if (index >= 0) stack.splice(index, 1);
		const top = stack.at(-1)?.content;
		if (top) {
			top.inert = false;
			top.removeAttribute('aria-hidden');
		} else {
			restorePage?.();
			restorePage = undefined;
		}
		if (wasTop)
			queueMicrotask(() => {
				const active = stack.at(-1)?.content;
				if (
					entry.opener?.isConnected &&
					!entry.opener.closest('[inert]') &&
					(!active || active.contains(entry.opener))
				)
					entry.opener.focus({ preventScroll: true });
				else active?.focus({ preventScroll: true });
			});
	};
}
export const isTopModal = (content: HTMLElement | null) =>
	stack.at(-1)?.content === content;
