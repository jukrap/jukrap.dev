import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { themeInitializationScript } from './themeInitialization.ts';

test('first paint respects saved theme and falls back to system preference without storage', () => {
	for (const [saved, systemDark, blocked, expected] of [
		['dark', false, false, true],
		['light', true, false, false],
		[null, true, false, true],
		[null, false, false, false],
		['invalid', true, false, true],
		[null, true, true, true],
	]) {
		let applied;
		runInNewContext(themeInitializationScript, {
			localStorage: {
				getItem() {
					if (blocked) throw new Error('blocked');
					return saved;
				},
			},
			matchMedia: () => ({ matches: systemDark }),
			document: {
				documentElement: {
					classList: {
						toggle(name, value) {
							assert.equal(name, 'dark');
							applied = value;
						},
					},
				},
			},
		});
		assert.equal(applied, expected);
	}
});
