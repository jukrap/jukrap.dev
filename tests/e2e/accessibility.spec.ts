import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const path of [
	'/ko?scene=static',
	'/ko/work?scene=static',
	'/ko/projects?scene=static',
	'/ko/profile',
] as const) {
	test(`axe finds no serious or critical violations on ${path}`, async ({
		page,
	}) => {
		test.setTimeout(90_000);
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		const blocking = results.violations.filter(
			({ impact }) => impact === 'critical' || impact === 'serious',
		);
		expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
	});
}
test('mobile menu traps focus, closes on Escape, and restores the trigger', async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ko?scene=static');
	const trigger = page.getByRole('button', { name: '메뉴 열기' });
	await trigger.focus();
	await trigger.click();
	const dialog = page.getByRole('dialog', { name: '모바일 메뉴' });
	await expect(dialog).toBeVisible();
	const first = dialog.getByRole('button', { name: '시스템 테마' });
	const last = dialog.getByRole('link', { name: 'PROFILE' });
	await expect(first).toBeFocused();
	await page.keyboard.press('Shift+Tab');
	await expect(last).toBeFocused();
	await page.keyboard.press('Tab');
	await expect(first).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
	await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeFocused();
});
