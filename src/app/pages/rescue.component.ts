/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rescue',
  imports: [RouterLink],
  template: `
    <article class="min-w-0">
      <h1 class="font-heading text-3xl sm:text-4xl">Rescue tiers</h1>
      <p class="mt-4 max-w-3xl text-base sm:text-lg">Hawkeye is trench-warfare medicine for a host that is down. Root may be read-only, /usr may be gone, the NIC may be dead. These tiers are the aid station.</p>

      <ol class="mt-8 grid gap-4 md:grid-cols-3">
        <li class="min-w-0 rounded-xl border border-line bg-panel p-5 sm:p-6">
          <p class="text-xs font-semibold tracking-[0.2em] text-brand">TIER 0</p>
          <h2 class="mt-1 font-heading text-xl sm:text-2xl">Boot path</h2>
          <p class="mt-3">The kernel may be up, or you may still be in the loader. Hawkeye is staged under <code class="rounded bg-surface px-1">/boot/hawkeye</code> so it can be reached from that early path.</p>
        </li>
        <li class="min-w-0 rounded-xl border border-line bg-panel p-5 sm:p-6">
          <p class="text-xs font-semibold tracking-[0.2em] text-brand">TIER 1</p>
          <h2 class="mt-1 font-heading text-xl sm:text-2xl">Rescue userland</h2>
          <p class="mt-3"><code class="rounded bg-surface px-1">/usr</code> is broken, missing, or not mounted. FreeBSD still has <code class="rounded bg-surface px-1">/rescue</code>. Hawkeye is meant to live there too.</p>
        </li>
        <li class="min-w-0 rounded-xl border border-line bg-panel p-5 sm:p-6">
          <p class="text-xs font-semibold tracking-[0.2em] text-brand">TIER 2</p>
          <h2 class="mt-1 font-heading text-xl sm:text-2xl">Installed host</h2>
          <p class="mt-3">The system is multi-user and <code class="rounded bg-surface px-1">pkg</code> works. Install both <strong>hawkeye</strong> and <strong>hawkeye-data</strong>.</p>
        </li>
      </ol>

      <section class="mt-12" aria-labelledby="examples-heading">
        <h2 id="examples-heading" class="scroll-mt-24 font-heading text-2xl sm:text-3xl">Field examples</h2>
        <p class="mt-3 max-w-3xl">From the knowledge kit. Run these on the host. Put <code class="rounded bg-surface px-1">/rescue</code> first on PATH. Knowledge belongs under <code class="rounded bg-surface px-1">/boot/hawkeye</code> when <code class="rounded bg-surface px-1">/usr/local</code> is gone.</p>

        <div class="mt-8 grid min-w-0 gap-6 lg:grid-cols-2">
          <section id="zfs-remount" class="min-w-0 scroll-mt-24 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="zfs-remount-heading">
            <h3 id="zfs-remount-heading" class="font-heading text-xl">Remount ZFS root read-write</h3>
            <p class="mt-3 text-sm">When <code class="rounded bg-surface px-1">/</code> is ZFS and mount shows read-only, or <code class="rounded bg-surface px-1">zfs get readonly</code> is on.</p>
            <pre class="mt-3 max-w-full overflow-x-auto rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>{{ remountZfs }}</code></pre>
            <p class="mt-3 text-sm">If the <em>pool</em> is readonly, dataset readonly=off is not enough — import path next.</p>
          </section>

          <section id="zpool-import" class="min-w-0 scroll-mt-24 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="zpool-import-heading">
            <h3 id="zpool-import-heading" class="font-heading text-xl">Import a ZFS pool (readonly first)</h3>
            <p class="mt-3 text-sm">When the pool is not imported.</p>
            <pre class="mt-3 max-w-full overflow-x-auto rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>{{ importPool }}</code></pre>
          </section>

          <section id="nic-up" class="min-w-0 scroll-mt-24 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="nic-up-heading">
            <h3 id="nic-up-heading" class="font-heading text-xl">Bring up a NIC</h3>
            <p class="mt-3 text-sm">When there is no usable net. Skip if the failure is disks.</p>
            <pre class="mt-3 max-w-full overflow-x-auto rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>{{ bringUpNic }}</code></pre>
          </section>

          <section id="rescue-path" class="min-w-0 scroll-mt-24 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="rescue-path-heading">
            <h3 id="rescue-path-heading" class="font-heading text-xl">/rescue when userland is missing</h3>
            <pre class="mt-3 max-w-full overflow-x-auto rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>{{ rescuePath }}</code></pre>
          </section>
        </div>
      </section>

      <p class="mt-8 max-w-3xl">Apply happens on the host. Read <a routerLink="/security" class="text-brand underline-offset-2 hover:underline">Security</a> before wiring any model in.</p>
    </article>
  `,
})
export class RescueComponent {
  readonly remountZfs = `export PATH=/rescue:/sbin:/bin:/usr/sbin:/usr/bin
mount -p
df -T /
ROOTDS=$(mount -p | awk '$2=="/" {print $1}')
zfs set readonly=off "$ROOTDS"
zfs mount -u "$ROOTDS"
mount -u -o rw /`;

  readonly importPool = `export PATH=/rescue:/sbin:/bin:/usr/sbin:/usr/bin
zpool import
zpool import -o readonly=on -N POOL
zpool status POOL`;

  readonly bringUpNic = `export PATH=/rescue:/sbin:/bin:/usr/sbin:/usr/bin
ifconfig -a
IF=em0   # real name from ifconfig -a
ifconfig "$IF" up
dhclient "$IF"`;

  readonly rescuePath = `export PATH=/rescue:/sbin:/bin:/usr/sbin:/usr/bin
/rescue/sh -c 'echo rescue-ok'
/rescue/mount -p`;
}
