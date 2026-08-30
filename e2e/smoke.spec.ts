import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

const shot = path.join('artifacts', 'playwright');

const routes = [
  { path: '/', heading: /Meatball surgery on servers and desktops/i },
  { path: '/install', heading: 'Install' },
  { path: '/rescue', heading: 'Rescue tiers' },
  { path: '/mcp', heading: 'MCP' },
  { path: '/security', heading: 'Security' },
] as const;

async function assertNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    return {
      root: root.scrollWidth - root.clientWidth,
      body: body.scrollWidth - body.clientWidth,
    };
  });
  expect(overflow.root, 'html must not scroll sideways').toBeLessThanOrEqual(1);
  expect(overflow.body, 'body must not scroll sideways').toBeLessThanOrEqual(1);
}

async function openPrimaryNav(page: Page, isMobile: boolean): Promise<void> {
  if (!isMobile) {
    return;
  }
  await page.getByRole('button', { name: 'Open menu' }).click();
}

test.describe('Hawkeye public site', () => {
  test('home explains the field surgeon and is not a doctor UI', async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === 'mobile';
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /Meatball surgery on servers and desktops/i })).toBeVisible();
    await expect(page.getByText(/not the doctor/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What this site is not' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Field examples' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeAttached();
    const suffix = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({ path: path.join(shot, `home-${suffix}.png`), fullPage: true });
    await openPrimaryNav(page, isMobile);
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Install', exact: true })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: /hawkeye \(bins\)/i })).toBeVisible();
  });

  test('primary nav matches the viewport', async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === 'mobile';
    await page.goto('/');
    const menu = page.getByRole('button', { name: /menu/i });
    const install = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Install', exact: true });

    if (isMobile) {
      await expect(menu).toBeVisible();
      const box = await menu.boundingBox();
      expect(box, 'menu button is present').toBeTruthy();
      expect(box!.width).toBeGreaterThanOrEqual(48);
      expect(box!.height).toBeGreaterThanOrEqual(48);
      await expect(install).toBeHidden();
      await menu.click();
      await expect(install).toBeVisible();
      const installBox = await install.boundingBox();
      expect(installBox, 'install link is present').toBeTruthy();
      expect(installBox!.height).toBeGreaterThanOrEqual(48);
      await page.keyboard.press('Escape');
      await expect(install).toBeHidden();
    } else {
      await expect(menu).toBeHidden();
      await expect(install).toBeVisible();
    }
  });

  test('docs pages render without sideways scroll', async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === 'mobile';
    const widths = isMobile ? [375, 390, 320] : [1280];

    for (const width of widths) {
      await page.setViewportSize({ width, height: isMobile ? 812 : 800 });
      for (const route of routes) {
        await page.goto(route.path);
        await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'What this site is not' })).toHaveCount(0);
        await assertNoHorizontalOverflow(page);
      }
    }

    await page.goto('/install');
    await expect(page.getByText('pkg install hawkeye hawkeye-data')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('revytech-hawkeye');
    const pre = page.locator('pre').first();
    await expect(pre).toBeVisible();
    const preBox = await pre.boundingBox();
    const viewport = page.viewportSize();
    expect(preBox, 'code block is present').toBeTruthy();
    expect(viewport, 'viewport is set').toBeTruthy();
    expect(preBox!.width).toBeLessThanOrEqual(viewport!.width);
    await page.screenshot({ path: path.join(shot, `install-${isMobile ? 'mobile' : 'desktop'}.png`), fullPage: true });

    await page.goto('/rescue');
    await expect(page.getByText('TIER 0')).toBeVisible();
    await expect(page.getByText('zfs set readonly=off')).toBeVisible();
    await expect(page.getByText('zpool import -o readonly=on -N POOL')).toBeVisible();
    await expect(page.getByText('dhclient')).toBeVisible();
    await expect(page.getByText("/rescue/sh -c 'echo rescue-ok'")).toBeVisible();
    await page.screenshot({ path: path.join(shot, `rescue-${isMobile ? 'mobile' : 'desktop'}.png`), fullPage: true });

    await page.goto('/mcp');
    await expect(page.getByRole('heading', { name: 'Localhost default' })).toBeVisible();
    await page.screenshot({ path: path.join(shot, `mcp-${isMobile ? 'mobile' : 'desktop'}.png`), fullPage: true });

    await page.goto('/security');
    await expect(page.getByRole('heading', { name: 'Secrets never through LLMs' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Apply is local and needs --yes' })).toBeVisible();
    await expect(page.getByText('--yes', { exact: true })).toBeVisible();
    const suffix = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({ path: path.join(shot, `security-${suffix}.png`), fullPage: true });
  });

  test('hero image stays inside the viewport', async ({ page }) => {
    await page.goto('/');
    const hero = page.getByRole('img', { name: /Hawkeye Pierce/i });
    await expect(hero).toBeVisible();
    const box = await hero.boundingBox();
    const viewport = page.viewportSize();
    expect(box, 'hero image is present').toBeTruthy();
    expect(viewport, 'viewport is set').toBeTruthy();
    expect(box!.x).toBeGreaterThanOrEqual(-1);
    expect(box!.width).toBeLessThanOrEqual(viewport!.width);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width + 1);
  });
});
