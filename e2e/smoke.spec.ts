import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';
import {
  HAWKEYE_QUERY,
  HAWKEYE_SESSION,
  PKG_INSTALL_SESSION,
} from '../src/app/terminal-sessions';

/**
 * python pty on pkg hawkeye-0.1.0_11 + hawkeye-data-0.1.0_4.
 * Query "ZFS root is read-only after boot", default N, nothing applied.
 * Healthy jail: first-look silent, then `>`. Keep `$ hawkeye` as the
 * shell invocation, then the captured session verbatim.
 */
const JAIL_SCRIPT_SESSION = `$ hawkeye
hawkeye
> ${HAWKEYE_QUERY}
Remount ZFS root read-write
  Root is a ZFS dataset and is mounted read-only (single-user, panic
  remount, zfs readonly=on, or a readonly pool import). You need to edit
  files, write logs, or run tools that create files.

  export PATH=/rescue:/sbin:/bin:/usr/sbin:/usr/bin
  mount -p
  df -T /
  zfs list -o name,mounted,mountpoint,readonly,canmount
  ROOTDS=$(mount -p | awk '$2=="/" {print $1}')
  echo "root dataset: $ROOTDS"
  zfs get -o property,value name,readonly,mounted,encryption,keystatus "$ROOTDS"
  zpool get readonly "$(echo "$ROOTDS" | awk -F/ '{print $1}')"
  zfs set readonly=off "$ROOTDS"
  zfs mount -u "$ROOTDS"
  mount -u -o rw /
  mount -p | awk '$2=="/" {print}'

also:
  Remount UFS root read-write
  Run fsck on UFS (never on ZFS)
  Import a ZFS pool (readonly first, then unlock)
  Load ZFS encryption keys at the console
  Root filesystem full or inodes exhausted
  List, activate, or roll back a ZFS boot environment
  Compare fstab to mounted filesystems

  You're experiencing a common issue with the ZFS filesystem during the boot process. Here are some steps to help you troubleshoot and resolve this problem:

  1. **Verify Boot Process:**
     - Ensure you are booting with the ZFS boot flag (ZFS_ROOT). This can be set by entering \`boot flag\` (ZFS_ROOT) at boot time.
     - If you are using a boot loader, ensure it is set to boot with ZFS_ROOT (ZFS_ROOT).

  2. **Check Boot Configuration:**
     - Review your boot configuration file (e.g., \`boot.cfg\`) to ensure it is correctly set to boot with ZFS_ROOT.
     - Make sure the boot loader is configured to boot with ZFS_ROOT.

  3. **Check ZFS Configuration:**
     - Ensure ZFS configuration is correct and that the \`root\` option is properly set.
     - Verify that the \`root\` option is not causing any issues.

  4. **Check ZFS Root Options:**
     - Confirm that the ZFS root option is correctly set:
       \`\`\`zfsctl
       root on
       \`\`\`

  5. **Check Boot Loader Configuration:**
     - Ensure your boot loader is correctly configured to boot with ZFS_ROOT.

Apply these steps? [y/N/e]
nothing applied
>`;

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
  'hawkeye consult',
  'DEGRADED',
  'sshd-missing',
  '${name}',
  'nomic',
  'sqlite-vec',
  'embeddings',
  'vector ranking',
  'GGUF',
  'llama.cpp',
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
  test('interactive hawkeye tty is the jail human reading, not consult or JSON', () => {
    expect(HAWKEYE_SESSION).toBe(JAIL_SCRIPT_SESSION);
    expect(HAWKEYE_SESSION.startsWith('$ hawkeye\nhawkeye\n> ')).toBeTruthy();
    expect(HAWKEYE_SESSION).toMatch(/^\$ hawkeye\nhawkeye\n> /);
    expect(HAWKEYE_SESSION).toContain(`> ${HAWKEYE_QUERY}`);
    expect(HAWKEYE_SESSION).not.toContain('hawkeye consult');
    expect(HAWKEYE_SESSION).not.toContain('hawkeye doctor');
    expect(HAWKEYE_SESSION).not.toContain('DEGRADED');
    expect(HAWKEYE_SESSION).not.toContain('sshd-missing');
    expect(HAWKEYE_SESSION).not.toContain('${name}');
    expect(HAWKEYE_SESSION).not.toContain('If the pool was imported readonly=on');
    expect(HAWKEYE_SESSION).toContain('Remount ZFS root read-write');
    expect(HAWKEYE_SESSION).toContain('You need to edit\n  files, write logs, or run tools that create files.');
    expect(HAWKEYE_SESSION).toContain('zfs set readonly=off "$ROOTDS"');
    expect(HAWKEYE_SESSION).toContain('also:');
    expect(HAWKEYE_SESSION).toContain('Remount UFS root read-write');
    expect(HAWKEYE_SESSION).toContain('Run fsck on UFS (never on ZFS)');
    expect(HAWKEYE_SESSION).toContain('Import a ZFS pool (readonly first, then unlock)');
    expect(HAWKEYE_SESSION).toContain('Load ZFS encryption keys at the console');
    expect(HAWKEYE_SESSION).toContain('Root filesystem full or inodes exhausted');
    expect(HAWKEYE_SESSION).toContain('List, activate, or roll back a ZFS boot environment');
    expect(HAWKEYE_SESSION).toContain('Compare fstab to mounted filesystems');
    expect(HAWKEYE_SESSION).not.toContain('Single-user versus multi-user');
    expect(HAWKEYE_SESSION).not.toContain('rc.conf enable=YES but script or binary missing');
    expect(HAWKEYE_SESSION).not.toContain('Bring up a NIC with ifconfig, dhclient, or service netif');
    expect(HAWKEYE_SESSION).toContain("You're experiencing a common issue with the ZFS filesystem during the boot process.");
    expect(HAWKEYE_SESSION).toContain('**Verify Boot Process:**');
    expect(HAWKEYE_SESSION).toContain('```zfsctl');
    expect(HAWKEYE_SESSION).toContain('Apply these steps? [y/N/e]');
    expect(HAWKEYE_SESSION).toContain('nothing applied');
    expect(HAWKEYE_SESSION.endsWith('\nnothing applied\n>')).toBeTruthy();
    expect(HAWKEYE_SESSION).not.toContain('"query"');
    expect(HAWKEYE_SESSION).not.toContain('"Title"');
    expect(HAWKEYE_SESSION).not.toContain('"hits"');
    expect(HAWKEYE_SESSION).not.toContain('"tier"');
    expect(HAWKEYE_SESSION).not.toContain('"Rank"');
    expect(HAWKEYE_SESSION).not.toContain('llm skipped');
    expect(HAWKEYE_SESSION).not.toContain('FTS skipped');
    expect(HAWKEYE_SESSION).not.toContain('nomic');
    expect(HAWKEYE_SESSION).not.toContain('sqlite-vec');
    expect(HAWKEYE_SESSION).not.toContain('embeddings');
    expect(HAWKEYE_SESSION).not.toContain('vector ranking');
    expect(HAWKEYE_SESSION).not.toContain('GGUF');
    expect(HAWKEYE_SESSION).not.toContain('llama.cpp');
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
    const homeSession = page.locator('pre').filter({ hasText: `> ${HAWKEYE_QUERY}` });
    await expect(homeSession).toBeVisible();
    await expect(homeSession).toHaveText(HAWKEYE_SESSION);
    await expect(homeSession).toContainText('$ hawkeye');
    await expect(homeSession).toContainText(`> ${HAWKEYE_QUERY}`);
    await expect(homeSession).toContainText('Apply these steps? [y/N/e]');
    await expect(homeSession).toContainText('nothing applied');
    await expect(homeSession).not.toContainText('hawkeye consult');
    await expect(homeSession).toContainText('You need to edit');
    await expect(homeSession).toContainText('files, write logs, or run tools that create files.');
    await expect(homeSession).toContainText('Run fsck on UFS (never on ZFS)');
    await expect(homeSession).toContainText('Load ZFS encryption keys at the console');
    await expect(homeSession).toContainText('Compare fstab to mounted filesystems');
    await expect(homeSession).toContainText("You're experiencing a common issue with the ZFS filesystem during the boot process.");
    await expect(homeSession).toContainText('**Verify Boot Process:**');
    await expect(homeSession).toContainText('```zfsctl');
    await expect(page.getByRole('heading', { name: 'Verify Boot Process' })).toHaveCount(0);
    await expect(homeSession).not.toContainText('DEGRADED');
    await expect(homeSession).not.toContainText('sshd-missing');
    await expect(homeSession).not.toContainText('nomic');
    await expect(homeSession).not.toContainText('Single-user versus multi-user');
    await expect(page.locator('pre').filter({ hasText: '$ hawkeye doctor' })).toHaveCount(0);
    await expect(page.getByText('y = dry-run then confirm')).toBeVisible();
    await expect(page.getByText(/Host commands, not a consult transcript/i)).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Bring up a NIC' })).toHaveCount(0);
    const homeSessionBox = await homeSession.boundingBox();
    expect(homeSessionBox, 'interactive hawkeye session is present').toBeTruthy();
    expect(homeSessionBox!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
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
    const installSession = page.locator('pre').filter({ hasText: `> ${HAWKEYE_QUERY}` });
    await expect(installSession).toBeVisible();
    await expect(installSession).toHaveText(HAWKEYE_SESSION);
    await expect(installSession).toContainText('nothing applied');
    await expect(installSession).toContainText('Run fsck on UFS (never on ZFS)');
    await expect(installSession).toContainText("You're experiencing a common issue");
    await expect(installSession).toContainText('**Verify Boot Process:**');
    await expect(page.getByRole('heading', { name: 'Verify Boot Process' })).toHaveCount(0);
    await expect(installSession).not.toContainText('hawkeye consult');
    await expect(installSession).not.toContainText('nomic');
    await expect(page.locator('pre').filter({ hasText: '$ hawkeye doctor' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Package health' })).toHaveCount(0);
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
    const rescueSession = page.locator('pre').filter({ hasText: `> ${HAWKEYE_QUERY}` });
    await expect(rescueSession).toBeVisible();
    await expect(rescueSession).toHaveText(HAWKEYE_SESSION);
    await expect(rescueSession).toContainText('$ hawkeye');
    await expect(rescueSession).toContainText('Apply these steps? [y/N/e]');
    await expect(rescueSession).toContainText('nothing applied');
    await expect(rescueSession).toContainText('Run fsck on UFS (never on ZFS)');
    await expect(rescueSession).toContainText("You're experiencing a common issue");
    await expect(rescueSession).toContainText('**Verify Boot Process:**');
    await expect(page.getByRole('heading', { name: 'Verify Boot Process' })).toHaveCount(0);
    await expect(rescueSession).not.toContainText('hawkeye consult');
    await expect(rescueSession).not.toContainText('nomic');
    await expect(page.getByText('y = dry-run then confirm')).toBeVisible();
    await expect(page.getByText('e = $EDITOR')).toBeVisible();
    await expect(page.getByText('N / Enter = stop')).toBeVisible();
    await expect(page.locator('pre').filter({ hasText: '$ hawkeye doctor' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Package health' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'What a hit contains' })).toHaveCount(0);
    await expect(page.getByText('zpool import -o readonly=on -N POOL')).toHaveCount(0);
    await expect(page.getByText("/rescue/sh -c 'echo rescue-ok'")).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Bring up a NIC' })).toHaveCount(0);
    if (isMobile) {
      await page.setViewportSize({ width: 320, height: 812 });
    }
    await assertNoHorizontalOverflow(page);
    const sessionBox = await rescueSession.boundingBox();
    expect(sessionBox, 'interactive hawkeye tty is present').toBeTruthy();
    expect(sessionBox!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
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
