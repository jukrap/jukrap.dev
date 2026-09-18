import assert from 'node:assert/strict';
import { test } from 'node:test';
import { registerModal, isTopModal } from './mediaModalState.ts';

test('nested modal locks survive either unmount order and restore the original page', async () => {
	for (const parentFirst of [false, true]) {
		const attributes = new Map([['aria-hidden', 'false']]);
		const app = {
			inert: false,
			getAttribute: (name) => attributes.get(name) ?? null,
			setAttribute: (name, value) => attributes.set(name, value),
			removeAttribute: (name) => attributes.delete(name),
		};
		const listeners = new Map();
		const body = { style: { overflow: 'scroll', paddingRight: '4px' } };
		globalThis.document = {
			body,
			documentElement: { clientWidth: 1000 },
			querySelector: () => app,
			addEventListener: (event, handler) => listeners.set(event, handler),
			removeEventListener: (event) => listeners.delete(event),
		};
		globalThis.window = { innerWidth: 1016 };
		globalThis.getComputedStyle = () => ({ paddingRight: '4px' });
		const makeElement = () => ({
			inert: false,
			isConnected: true,
			focused: 0,
			focus() {
				this.focused += 1;
			},
			setAttribute() {},
			removeAttribute() {},
			contains() {
				return false;
			},
			closest() {
				return null;
			},
		});
		const opener = makeElement();
		const parent = makeElement();
		const child = makeElement();
		const closeParent = registerModal({ content: parent, opener });
		const closeChild = registerModal({ content: child, opener: parent });
		assert.equal(body.style.overflow, 'hidden');
		assert.equal(body.style.paddingRight, '20px');
		assert.equal(app.inert, true);
		assert.equal(parent.inert, true);
		assert.equal(isTopModal(child), true);
		const first = parentFirst ? closeParent : closeChild;
		const last = parentFirst ? closeChild : closeParent;
		first();
		assert.equal(body.style.overflow, 'hidden');
		assert.equal(app.inert, true);
		assert.equal(isTopModal(parentFirst ? child : parent), true);
		last();
		last(); // idempotent cleanup from close plus unmount
		await Promise.resolve();
		assert.equal(body.style.overflow, 'scroll');
		assert.equal(body.style.paddingRight, '4px');
		assert.equal(app.inert, false);
		assert.equal(attributes.get('aria-hidden'), 'false');
		assert.equal(listeners.size, 0);
		assert.equal(isTopModal(child), false);
	}
});
