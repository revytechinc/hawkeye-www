/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TerminalComponent } from '../terminal.component';
import { DOCTOR_SESSION, HAWKEYE_SESSION } from '../terminal-sessions';

@Component({
  selector: 'app-rescue',
  imports: [RouterLink, TerminalComponent],
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
          <p class="mt-3">The system is multi-user and <code class="rounded bg-surface px-1">pkg</code> works. Type <code class="rounded bg-surface px-1">pkg install hawkeye</code>. The knowledge kit (hawkeye-data) comes along as a RUN_DEPENDS.</p>
        </li>
      </ol>

      <section class="mt-12 min-w-0" aria-labelledby="examples-heading">
        <h2 id="examples-heading" class="scroll-mt-24 font-heading text-2xl sm:text-3xl">Field examples</h2>
        <p class="mt-3 max-w-3xl">The product interface is an interactive session. Type <code class="rounded bg-surface px-1">hawkeye</code> — no subcommand. Panic path.</p>
        <app-terminal [session]="hawkeye" label="hawkeye interactive session" caption="tty — hawkeye" />
        <p class="mt-3 max-w-3xl text-sm">
          <code class="rounded bg-surface px-1">y</code> = apply (dry-run then confirm).
          <code class="rounded bg-surface px-1">e</code> = <code class="rounded bg-surface px-1">$EDITOR</code> then confirm.
          <code class="rounded bg-surface px-1">N</code> / Enter = stop.
        </p>
        <app-terminal [session]="doctor" label="hawkeye doctor terminal session" caption="tty — hawkeye doctor" />
      </section>

      <p class="mt-8 max-w-3xl">Apply happens on the host. Read <a routerLink="/security" class="text-brand underline-offset-2 hover:underline">Security</a> before wiring any model in.</p>
    </article>
  `,
})
export class RescueComponent {
  readonly hawkeye = HAWKEYE_SESSION;
  readonly doctor = DOCTOR_SESSION;
}
