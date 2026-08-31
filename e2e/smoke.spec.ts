import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';
import {
  CONSULT_QUERY,
  CONSULT_SESSION,
  DOCTOR_SESSION,
  PKG_INSTALL_SESSION,
} from '../src/app/terminal-sessions';

const shot = path.join('artifacts', 'playwright');

const routes = [
  { path: '/', heading: /Meatball surgery on servers and desktops/i },
  { path: '/install', heading: 'Install' },
  { path: '/rescue', heading: 'Rescue tiers' },
  { path: '/docs/mcp', heading: 'MCP' },
  { path: '/security', heading: 'Security' },
] as const;

const forbiddenInternals = [
  '"query"',
  '"tier"',
  '"hits"',
  'hits[',
  '"Title"',
  '"Body"',
  '"Rank"',
  'when_to_use',
  'llm skipped',
  'FTS skipped',
  'file:///',
];

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

async function assertNoInternals(page: Page): Promise<void> {
  const body = page.locator('body');
  for (const phrase of forbiddenInternals) {
    await expect(body, `must not show ${phrase}`).not.toContainText(phrase);
  }
}

async function openPrimaryNav(page: Page, isMobile: boolean): Promise<void> {
  if (!isMobile) {
    return;
  }
  await page.getByRole('button', { name: 'Open menu' }).click();
}

test.describe('Hawkeye public site', () => {
  test('consult tty is the jail human reading, not JSON', () => {
    expect(CONSULT_SESSION.startsWith(`$ hawkeye consult '${CONSULT_QUERY}'`)).toBeTruthy();
    expect(CONSULT_SESSION).toContain('Remount ZFS root read-write');
    expect(CONSULT_SESSION).toContain('Root is a ZFS dataset and is mounted read-only');
    expect(CONSULT_SESSION).toContain('zfs set readonly=off "$ROOTDS"');
    expect(CONSULT_SESSION).toContain('also:');
    expect(CONSULT_SESSION).toContain('List, activate, or roll back a ZFS boot environment');
    expect(CONSULT_SESSION).toContain('Apply these steps? [y/N/e]');
    expect(CONSULT_SESSION).not.toContain('"query"');
    expect(CONSULT_SESSION).not.toContain('"Title"');
    expect(CONSULT_SESSION).not.toContain('"hits"');
    expect(CONSULT_SESSION).not.toContain('"tier"');
    expect(CONSULT_SESSION).not.toContain('llm skipped');
    expect(CONSULT_SESSION).not.toContain('FTS skipped');
    expect(DOCTOR_SESSION).toContain('$ hawkeye doctor');
    expect(DOCTOR_SESSION).toContain('hawkeye doctor: healthy');
    expect(DOCTOR_SESSION).toContain('knowledge kit open');
    expect(DOCTOR_SESSION).not.toContain('file:///');
    expect(DOCTOR_SESSION).not.toContain('{');
    expect(PKG_INSTALL_SESSION).toBe('# pkg install hawkeye');
    expect(PKG_INSTALL_SESSION).not.toContain('hawkeye-data');
  });

  test('home explains the field surgeon and is not a doctor UI', async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === 'mobile';
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /Meatball surgery on servers and desktops/i })).toBeVisible();
    await expect(page.getByText(/not the doctor/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What this site is not' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Field examples' })).toBeVisible();
    const homeConsult = page.locator('pre').filter({ hasText: `$ hawkeye consult '${CONSULT_QUERY}'` });
    await expect(homeConsult).toBeVisible();
    await expect(homeConsult).toHaveText(CONSULT_SESSION);
    await expect(homeConsult).toContainText('Apply these steps? [y/N/e]');
    await expect(page.getByText(/Host commands, not a consult transcript/i)).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Bring up a NIC' })).toHaveCount(0);
    const homeConsultBox = await homeConsult.boundingBox();
    expect(homeConsultBox, 'consult session is present').toBeTruthy();
    expect(homeConsultBox!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    await assertNoInternals(page);
    await expect(page.locator('body')).not.toContainText('Bearer ');
    await expect(page.getByRole('link', { name: /MCP docs/i })).toHaveAttribute('href', '/docs/mcp');
    await expect(page.locator('body')).not.toContainText('MCP on localhost');
    await expect(page.locator('body')).not.toContainText('not a public MCP service');
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
        await assertNoInternals(page);
        await assertNoHorizontalOverflow(page);
      }
    }

    await page.setViewportSize({ width: isMobile ? 375 : 1280, height: isMobile ? 812 : 800 });

    await page.goto('/install');
    const pkgPre = page.locator('pre').filter({ hasText: PKG_INSTALL_SESSION });
    await expect(pkgPre).toBeVisible();
    await expect(pkgPre).toHaveText(PKG_INSTALL_SESSION);
    await expect(page.locator('body')).not.toContainText('pkg install hawkeye hawkeye-data');
    await expect(page.getByText(/install both/i)).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('revytech-hawkeye');
    await expect(page.getByText('/usr/ports/sysutils/hawkeye-data')).toBeVisible();
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
    await expect(page.getByText(/install both/i)).toHaveCount(0);
    const rescueConsult = page.locator('pre').filter({ hasText: `$ hawkeye consult '${CONSULT_QUERY}'` });
    await expect(rescueConsult).toBeVisible();
    await expect(rescueConsult).toHaveText(CONSULT_SESSION);
    await expect(rescueConsult).toContainText('Apply these steps? [y/N/e]');
    await expect(page.getByText('y = apply (still dry-run then confirm to land)')).toBeVisible();
    await expect(page.getByText('e = edit the plan in $EDITOR then confirm')).toBeVisible();
    await expect(page.getByText('N / Enter = stop')).toBeVisible();
    const rescueDoctor = page.locator('pre').filter({ hasText: '$ hawkeye doctor' });
    await expect(rescueDoctor).toBeVisible();
    await expect(rescueDoctor).toHaveText(DOCTOR_SESSION);
    await expect(page.getByRole('heading', { name: 'What a hit contains' })).toHaveCount(0);
    await expect(page.getByText('zpool import -o readonly=on -N POOL')).toHaveCount(0);
    await expect(page.getByText("/rescue/sh -c 'echo rescue-ok'")).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Bring up a NIC' })).toHaveCount(0);
    if (isMobile) {
      await page.setViewportSize({ width: 320, height: 812 });
    }
    await assertNoHorizontalOverflow(page);
    const consultBox = await rescueConsult.boundingBox();
    expect(consultBox, 'consult tty is present').toBeTruthy();
    expect(consultBox!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    await page.setViewportSize({ width: isMobile ? 375 : 1280, height: isMobile ? 812 : 800 });
    await page.screenshot({ path: path.join(shot, `rescue-${isMobile ? 'mobile' : 'desktop'}.png`), fullPage: true });

    await page.goto('/docs/mcp');
    await expect(page.getByRole('heading', { name: 'Protocol URL' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'https://hawkeye.revytechinc.com/mcp' })).toBeVisible();
    await expect(page.getByText('401')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Localhost default' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Not a public service' })).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('localhost-only');
    await expect(page.locator('body')).not.toContainText('not a public MCP service');
    await expect(page.locator('body')).not.toContainText('Bearer ');
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
