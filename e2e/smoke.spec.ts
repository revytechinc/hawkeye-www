import { expect, test } from '@playwright/test';
import path from 'node:path';

const shot = path.join('artifacts', 'playwright');

test.describe('Hawkeye public site', () => {
  test('home explains the field surgeon and is not a doctor UI', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /FreeBSD field surgeon/i })).toBeVisible();
    await expect(page.getByText(/not the doctor/i)).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Install', exact: true })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: /hawkeye \(bins\)/i })).toBeVisible();
    await page.screenshot({ path: path.join(shot, 'home-desktop.png'), fullPage: true });
  });

  test('docs pages render', async ({ page }) => {
    await page.goto('/install');
    await expect(page.getByRole('heading', { level: 1, name: 'Install' })).toBeVisible();
    await expect(page.getByText('hawkeye-data', { exact: true })).toBeVisible();

    await page.goto('/rescue');
    await expect(page.getByRole('heading', { level: 1, name: 'Rescue tiers' })).toBeVisible();
    await expect(page.getByText('TIER 0')).toBeVisible();

    await page.goto('/mcp');
    await expect(page.getByRole('heading', { level: 1, name: 'MCP' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Localhost default' })).toBeVisible();

    await page.goto('/security');
    await expect(page.getByRole('heading', { level: 1, name: 'Security' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Secrets never through LLMs' })).toBeVisible();
    await page.screenshot({ path: path.join(shot, 'security-desktop.png'), fullPage: true });
  });
});
