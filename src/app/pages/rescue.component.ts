/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsultSessionComponent } from '../consult-session.component';
import { REMOUNT_ZFS_HIT_COMMANDS } from '../consult-session';

@Component({
  selector: 'app-rescue',
  imports: [RouterLink, ConsultSessionComponent],
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

      <section class="mt-12 min-w-0" aria-labelledby="examples-heading">
        <h2 id="examples-heading" class="scroll-mt-24 font-heading text-2xl sm:text-3xl">Field examples</h2>
        <p class="mt-3 max-w-3xl">What the operator typed. <code class="rounded bg-surface px-1">hawkeye consult</code> lists knowledge-kit hits as JSON. This session was captured 2026-08-30 on a Hawkeye jail; the local LLM was skipped.</p>
        <app-consult-session />

        <details id="hit-contains" class="mt-6 min-w-0 scroll-mt-24 rounded-xl border border-line bg-panel">
          <summary class="flex min-h-12 cursor-pointer list-inside items-center px-5 py-3 font-heading text-lg">
            What a hit contains — Remount ZFS root read-write
          </summary>
          <div class="min-w-0 border-t border-line px-5 pb-5">
            <p class="mt-3 text-sm">Host commands from that knowledge-kit playbook. Consult lists the hit; apply still runs on the host.</p>
            <pre class="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-navy p-4 text-sm text-cyan" tabindex="0"><code>{{ remountZfs }}</code></pre>
          </div>
        </details>
      </section>

      <p class="mt-8 max-w-3xl">Apply happens on the host. Read <a routerLink="/security" class="text-brand underline-offset-2 hover:underline">Security</a> before wiring any model in.</p>
    </article>
  `,
})
export class RescueComponent {
  readonly remountZfs = REMOUNT_ZFS_HIT_COMMANDS;
}
