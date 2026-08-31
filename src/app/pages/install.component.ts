/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TerminalComponent } from '../terminal.component';
import { DOCTOR_SESSION, HAWKEYE_SESSION, PKG_INSTALL_SESSION } from '../terminal-sessions';

@Component({
  selector: 'app-install',
  imports: [RouterLink, TerminalComponent],
  template: `
    <article class="prose-docs min-w-0 max-w-3xl">
      <h1 class="font-heading text-3xl sm:text-4xl">Install</h1>
      <p class="mt-4 text-base sm:text-lg">Type one package. <strong>hawkeye-data</strong> (the knowledge kit) is a RUN_DEPENDS of hawkeye — it installs as a dependency, not a second thing to type.</p>

      <section class="mt-8" aria-labelledby="packages-heading">
        <h2 id="packages-heading" class="font-heading text-xl sm:text-2xl">One package</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li><strong>hawkeye</strong> — binaries. This is what you name for pkg. Source: <a class="break-all text-brand underline-offset-2 hover:underline" href="https://github.com/revytechinc/hawkeye">github.com/revytechinc/hawkeye</a></li>
          <li><strong>hawkeye-data</strong> — knowledge kit. Comes along as a RUN_DEPENDS of hawkeye. Source: <a class="break-all text-brand underline-offset-2 hover:underline" href="https://github.com/revytechinc/hawkeye-data">github.com/revytechinc/hawkeye-data</a></li>
        </ul>
        <p class="mt-4">The bins without the kit cannot diagnose. You do not type hawkeye-data on the pkg line.</p>
      </section>

      <section class="mt-8 min-w-0" aria-labelledby="pkg-heading">
        <h2 id="pkg-heading" class="font-heading text-xl sm:text-2xl">pkg</h2>
        <p class="mt-4">When the package is published to the CloudBSD/FreeBSD package set:</p>
        <app-terminal [session]="pkgInstall" label="pkg install terminal session" caption="tty — pkg" />
      </section>

      <section class="mt-8 min-w-0" aria-labelledby="health-heading">
        <h2 id="health-heading" class="font-heading text-xl sm:text-2xl">Package health</h2>
        <p class="mt-4">After install, <code class="rounded bg-surface px-1">hawkeye doctor</code> checks that the package and knowledge kit are healthy. That is ops, not the rescue path.</p>
        <app-terminal [session]="doctor" label="hawkeye doctor terminal session" caption="tty — hawkeye doctor" />
      </section>

      <section class="mt-8 min-w-0" aria-labelledby="session-heading">
        <h2 id="session-heading" class="font-heading text-xl sm:text-2xl">Then type hawkeye</h2>
        <p class="mt-4">The product interface is an interactive session. Type <code class="rounded bg-surface px-1">hawkeye</code> — no subcommand. Panic path.</p>
        <app-terminal [session]="hawkeye" label="hawkeye interactive session" caption="tty — hawkeye" />
        <p class="mt-3 text-sm text-slate-600">
          <code class="rounded bg-surface px-1">y</code> = apply (dry-run then confirm).
          <code class="rounded bg-surface px-1">e</code> = <code class="rounded bg-surface px-1">$EDITOR</code> then confirm.
          <code class="rounded bg-surface px-1">N</code> / Enter = stop.
        </p>
      </section>

      <section class="mt-8 min-w-0" aria-labelledby="ports-heading">
        <h2 id="ports-heading" class="font-heading text-xl sm:text-2xl">ports</h2>
        <p class="mt-4">The ports tree still has two ports. Users only name hawkeye for pkg. From ports:</p>
        <pre class="mt-3 max-w-full overflow-x-hidden whitespace-pre-wrap break-words rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>make -C /usr/ports/sysutils/hawkeye install clean
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
export class InstallComponent {
  readonly pkgInstall = PKG_INSTALL_SESSION;
  readonly doctor = DOCTOR_SESSION;
  readonly hawkeye = HAWKEYE_SESSION;
}
