/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-install',
  imports: [RouterLink],
  template: `
    <article class="prose-docs min-w-0 max-w-3xl">
      <h1 class="font-heading text-3xl sm:text-4xl">Install</h1>
      <p class="mt-4 text-base sm:text-lg">Hawkeye ships as two packages: the surgeon and the knowledge kit. Install both.</p>

      <section class="mt-8" aria-labelledby="packages-heading">
        <h2 id="packages-heading" class="font-heading text-xl sm:text-2xl">Two packages</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li><strong>hawkeye</strong> — binaries. Source: <a class="break-all text-brand underline-offset-2 hover:underline" href="https://github.com/revytechinc/hawkeye">github.com/revytechinc/hawkeye</a></li>
          <li><strong>hawkeye-data</strong> — knowledge kit. Source: <a class="break-all text-brand underline-offset-2 hover:underline" href="https://github.com/revytechinc/hawkeye-data">github.com/revytechinc/hawkeye-data</a></li>
        </ul>
        <p class="mt-4">The bins without the kit cannot diagnose. The kit without the bins cannot apply.</p>
      </section>

      <section class="mt-8 min-w-0" aria-labelledby="pkg-heading">
        <h2 id="pkg-heading" class="font-heading text-xl sm:text-2xl">pkg</h2>
        <p class="mt-4">When the packages are published to the CloudBSD/FreeBSD package set:</p>
        <pre class="mt-3 max-w-full overflow-x-auto rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>pkg install hawkeye hawkeye-data</code></pre>
      </section>

      <section class="mt-8 min-w-0" aria-labelledby="ports-heading">
        <h2 id="ports-heading" class="font-heading text-xl sm:text-2xl">ports</h2>
        <p class="mt-4">From the ports tree, build and install both ports (names will match the packages):</p>
        <pre class="mt-3 max-w-full overflow-x-auto rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>make -C /usr/ports/sysutils/hawkeye install clean
make -C /usr/ports/sysutils/hawkeye-data install clean</code></pre>
        <p class="mt-3 text-sm text-slate-600">Until the ports land, clone the GitHub repositories and follow each repo's build instructions.</p>
      </section>

      <section class="mt-8" aria-labelledby="paths-heading">
        <h2 id="paths-heading" class="font-heading text-xl sm:text-2xl">Where it lives after install</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li>Normal PATH for a healthy host. When userland is missing, put <code class="rounded bg-surface px-1">/rescue</code> first.</li>
          <li><code class="rounded bg-surface px-1">/rescue</code> — so the surgeon is still there when <code class="rounded bg-surface px-1">/usr</code> is gone.</li>
          <li><code class="rounded bg-surface px-1">/boot/hawkeye</code> — knowledge and the early-boot path when <code class="rounded bg-surface px-1">/usr/local</code> is gone.</li>
        </ul>
        <p class="mt-4">See <a routerLink="/rescue" class="text-brand underline-offset-2 hover:underline">Rescue</a> for tiers 0, 1, and 2 and the field examples.</p>
      </section>
    </article>
  `,
})
export class InstallComponent {}
