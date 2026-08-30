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
    <article class="max-w-3xl">
      <h1 class="font-heading text-4xl">Rescue tiers</h1>
      <p class="mt-4 text-lg">Hawkeye is trench-warfare medicine, not a hospital. The host is a casualty: root may be read-only, /usr may be gone, the NIC may be dead. These tiers are the aid station, in plain language.</p>

      <ol class="mt-8 space-y-6">
        <li class="rounded-xl border border-line bg-panel p-6">
          <p class="text-xs font-semibold tracking-[0.2em] text-brand">TIER 0</p>
          <h2 class="mt-1 font-heading text-2xl">Boot path</h2>
          <p class="mt-3">The kernel may be up, or you may still be in the loader. A full userland is not something you can trust. Hawkeye is staged under <code class="rounded bg-surface px-1">/boot/hawkeye</code> so it can be reached from that early path.</p>
        </li>
        <li class="rounded-xl border border-line bg-panel p-6">
          <p class="text-xs font-semibold tracking-[0.2em] text-brand">TIER 1</p>
          <h2 class="mt-1 font-heading text-2xl">Rescue userland</h2>
          <p class="mt-3"><code class="rounded bg-surface px-1">/usr</code> is broken, missing, or not mounted. FreeBSD still has <code class="rounded bg-surface px-1">/rescue</code>: a small, statically linked toolkit. Hawkeye is meant to live there too, so you can diagnose and apply without a healthy installed world.</p>
        </li>
        <li class="rounded-xl border border-line bg-panel p-6">
          <p class="text-xs font-semibold tracking-[0.2em] text-brand">TIER 2</p>
          <h2 class="mt-1 font-heading text-2xl">Installed host</h2>
          <p class="mt-3">The system is multi-user and <code class="rounded bg-surface px-1">pkg</code> works. You still install both <strong>hawkeye</strong> and <strong>hawkeye-data</strong>. Same diagnose-and-apply loop, with the full knowledge kit on disk.</p>
        </li>
      </ol>

      <p class="mt-8">None of these tiers are this website. Apply happens on the host. There is no privileged apply from the browser. Read <a routerLink="/security" class="text-brand underline-offset-2 hover:underline">Security</a> before wiring any model in.</p>
    </article>
  `,
})
export class RescueComponent {}
