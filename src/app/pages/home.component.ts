/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TerminalComponent } from '../terminal.component';
import { HAWKEYE_SESSION } from '../terminal-sessions';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TerminalComponent],
  template: `
    <article class="min-w-0">
      <header class="-mx-4 -mt-8 mb-10 bg-gradient-to-br from-navy via-navy-mid to-navy-deep px-4 py-8 text-white sm:-mt-10 sm:py-12 md:rounded-b-2xl">
        <div class="mx-auto flex min-w-0 max-w-6xl flex-col-reverse items-center gap-6 md:grid md:grid-cols-[7fr_5fr] md:items-center md:gap-8">
          <figure class="mx-auto w-full max-w-[13rem] min-w-0 sm:max-w-xs md:col-start-2 md:row-start-1 md:max-w-none">
            <img
              src="/images/hawkeye-pierce-hero.png"
              width="732"
              height="926"
              alt="Hawkeye Pierce, 1975 CBS still. Public domain in the United States."
              class="h-auto w-full rounded-lg border border-cyan/40 shadow-lg"
            />
            <figcaption class="mt-2 text-center text-xs text-slate-300">
              Trench medic. Servers and desktops, not people.
            </figcaption>
          </figure>
          <div class="min-w-0 md:col-start-1 md:row-start-1">
            <p class="text-xs font-semibold tracking-[0.2em] text-cyan sm:text-sm">REVYTECH PRODUCT</p>
            <h1 class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl md:text-5xl">Meatball surgery on servers and desktops</h1>
            <p class="mt-4 max-w-2xl text-base text-slate-100 sm:text-lg">Hawkeye is trench-warfare medicine for FreeBSD. The host is down, root may be read-only, the network may be dead. Consult, plan, apply. Get the box walking. Pretty can wait.</p>
            <p class="mt-4 max-w-2xl text-sm text-slate-200">This website explains Hawkeye. It is not the doctor. There is no public chat UI, no recovery console, and no privileged apply from the browser.</p>
            <div class="mt-8 flex w-full flex-col gap-3 md:flex-row">
              <a routerLink="/install" class="inline-flex min-h-12 w-full items-center justify-center rounded bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark md:w-auto">Install Hawkeye</a>
              <a routerLink="/rescue" class="inline-flex min-h-12 w-full items-center justify-center rounded border border-cyan px-5 py-3 font-semibold text-cyan hover:bg-navy-deep md:w-auto">Rescue tiers</a>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="what-heading" class="min-w-0 rounded-xl border border-line bg-panel p-5 shadow-sm sm:p-6">
        <h2 id="what-heading" class="font-heading text-xl sm:text-2xl">What it does</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li><strong>Meatball surgery</strong> on sick servers and desktops: stop the bleeding, mount rw, get a NIC talking.</li>
          <li><strong>Diagnose</strong> with the knowledge kit, even with no GPU and no net.</li>
          <li><strong>Apply</strong> on the host itself. Dry-run first. Privileged apply needs <code class="rounded bg-surface px-1">--yes</code>.</li>
          <li><strong>Works in the trench</strong> via <code class="rounded bg-surface px-1">/rescue</code> and <code class="rounded bg-surface px-1">/boot/hawkeye</code>.</li>
        </ul>
      </section>

      <section aria-labelledby="examples-heading" class="mt-10 min-w-0">
        <h2 id="examples-heading" class="font-heading text-xl sm:text-2xl">Field examples</h2>
        <p class="mt-3 max-w-3xl text-sm text-slate-600">The product interface is an interactive session. Type <code class="rounded bg-surface px-1">hawkeye</code> — no subcommand. Panic path.</p>
        <app-terminal [session]="hawkeye" label="hawkeye interactive session" caption="tty — hawkeye" />
        <p class="mt-3 max-w-3xl text-sm text-slate-600">
          <code class="rounded bg-surface px-1">y</code> = apply (dry-run then confirm).
          <code class="rounded bg-surface px-1">e</code> = <code class="rounded bg-surface px-1">$EDITOR</code> then confirm.
          <code class="rounded bg-surface px-1">N</code> / Enter = stop.
        </p>
        <p class="mt-4 max-w-3xl text-sm">
          <a routerLink="/rescue" class="inline-flex min-h-12 items-center text-brand underline-offset-2 hover:underline">Rescue</a>
          has the same host tty.
        </p>
      </section>

      <section aria-labelledby="repos-heading" class="mt-10">
        <h2 id="repos-heading" class="font-heading text-xl sm:text-2xl">Three repositories</h2>
        <div class="mt-4 grid min-w-0 gap-4 md:grid-cols-3">
          <a class="min-w-0 rounded-xl border border-line bg-panel p-5 hover:border-brand" href="https://github.com/revytechinc/hawkeye">
            <h3 class="font-heading text-lg text-brand">hawkeye</h3>
            <p class="mt-2 text-sm">The medic: binaries, CLI, apply.</p>
          </a>
          <a class="min-w-0 rounded-xl border border-line bg-panel p-5 hover:border-brand" href="https://github.com/revytechinc/hawkeye-data">
            <h3 class="font-heading text-lg text-brand">hawkeye-data</h3>
            <p class="mt-2 text-sm">The kit: playbooks and knowledge in the rucksack. Installs as a RUN_DEPENDS of hawkeye.</p>
          </a>
          <a class="min-w-0 rounded-xl border border-line bg-panel p-5 hover:border-brand" href="https://github.com/revytechinc/hawkeye-www">
            <h3 class="font-heading text-lg text-brand">hawkeye-www</h3>
            <p class="mt-2 text-sm">This public product and docs site.</p>
          </a>
        </div>
      </section>

      <section aria-labelledby="next-heading" class="mt-10">
        <h2 id="next-heading" class="font-heading text-xl sm:text-2xl">Read next</h2>
        <ul class="mt-4 grid gap-2 md:grid-cols-2">
          <li><a routerLink="/install" class="inline-flex min-h-12 items-center text-brand underline-offset-2 hover:underline">Install with pkg or ports</a></li>
          <li><a routerLink="/rescue" class="inline-flex min-h-12 items-center text-brand underline-offset-2 hover:underline">Rescue tiers 0, 1, and 2</a></li>
          <li><a routerLink="/docs/mcp" class="inline-flex min-h-12 items-center text-brand underline-offset-2 hover:underline">MCP docs — bearer token required</a></li>
          <li><a routerLink="/security" class="inline-flex min-h-12 items-center text-brand underline-offset-2 hover:underline">Secrets never through LLMs</a></li>
        </ul>
      </section>
    </article>
  `,
})
export class HomeComponent {
  readonly hawkeye = HAWKEYE_SESSION;
}
