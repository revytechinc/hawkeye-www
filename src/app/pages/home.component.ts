/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <article>
      <header class="-mx-4 -mt-10 mb-10 bg-gradient-to-br from-navy via-navy-mid to-navy-deep px-4 py-16 text-white md:rounded-b-2xl">
        <p class="text-sm font-semibold tracking-[0.2em] text-cyan">REVYTECH PRODUCT</p>
        <h1 class="mt-3 font-heading text-4xl font-semibold text-white md:text-5xl">Hawkeye is the FreeBSD field surgeon</h1>
        <p class="mt-4 max-w-2xl text-lg text-slate-100">Diagnose and apply on a sick host. It is built to work in rescue, not only on a healthy multi-user box.</p>
        <p class="mt-4 max-w-2xl text-sm text-slate-200">This website explains Hawkeye and points at the source repos. It is not the doctor. There is no public chat UI, no recovery console, and no privileged apply from the browser.</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a routerLink="/install" class="inline-flex items-center justify-center rounded bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark">Install Hawkeye</a>
          <a routerLink="/rescue" class="inline-flex items-center justify-center rounded border border-cyan px-5 py-3 font-semibold text-cyan hover:bg-navy-deep">Rescue tiers</a>
        </div>
      </header>

      <section aria-labelledby="what-heading" class="grid gap-6 md:grid-cols-2">
        <div class="rounded-xl border border-line bg-panel p-6 shadow-sm">
          <h2 id="what-heading" class="font-heading text-2xl">What it does</h2>
          <ul class="mt-4 list-disc space-y-2 pl-5">
            <li><strong>Diagnose</strong> a FreeBSD/CloudBSD host using the knowledge kit.</li>
            <li><strong>Apply</strong> the repair on the host itself, including when userland is broken.</li>
            <li><strong>Works in rescue</strong> via <code class="rounded bg-surface px-1">/rescue</code> and <code class="rounded bg-surface px-1">/boot/hawkeye</code>.</li>
          </ul>
        </div>
        <div class="rounded-xl border border-line bg-panel p-6 shadow-sm">
          <h2 class="font-heading text-2xl">What this site is not</h2>
          <ul class="mt-4 list-disc space-y-2 pl-5">
            <li>Not a web console that doctors a remote host.</li>
            <li>Not a public MCP service.</li>
            <li>Not a place to paste secrets or apply privileged changes.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="repos-heading" class="mt-10">
        <h2 id="repos-heading" class="font-heading text-2xl">Three repositories</h2>
        <div class="mt-4 grid gap-4 md:grid-cols-3">
          <a class="rounded-xl border border-line bg-panel p-5 hover:border-brand" href="https://github.com/revytechinc/hawkeye">
            <h3 class="font-heading text-lg text-brand">hawkeye</h3>
            <p class="mt-2 text-sm">Binaries: the field surgeon itself.</p>
          </a>
          <a class="rounded-xl border border-line bg-panel p-5 hover:border-brand" href="https://github.com/revytechinc/hawkeye-data">
            <h3 class="font-heading text-lg text-brand">hawkeye-data</h3>
            <p class="mt-2 text-sm">Knowledge kit shipped as a second package.</p>
          </a>
          <a class="rounded-xl border border-line bg-panel p-5 hover:border-brand" href="https://github.com/revytechinc/hawkeye-www">
            <h3 class="font-heading text-lg text-brand">hawkeye-www</h3>
            <p class="mt-2 text-sm">This public product and docs site.</p>
          </a>
        </div>
      </section>

      <section aria-labelledby="next-heading" class="mt-10">
        <h2 id="next-heading" class="font-heading text-2xl">Read next</h2>
        <ul class="mt-4 grid gap-3 md:grid-cols-2">
          <li><a routerLink="/install" class="text-brand underline-offset-2 hover:underline">Install with pkg or ports</a></li>
          <li><a routerLink="/rescue" class="text-brand underline-offset-2 hover:underline">Rescue tiers 0, 1, and 2</a></li>
          <li><a routerLink="/mcp" class="text-brand underline-offset-2 hover:underline">MCP on localhost, not the public internet</a></li>
          <li><a routerLink="/security" class="text-brand underline-offset-2 hover:underline">Secrets never through LLMs</a></li>
        </ul>
      </section>
    </article>
  `,
})
export class HomeComponent {}
