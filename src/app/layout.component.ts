/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="bg-navy text-white" role="banner">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <a routerLink="/" class="group inline-flex flex-col no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan">
          <span class="text-xs font-semibold tracking-[0.2em] text-cyan">REVYTECH</span>
          <span class="font-heading text-2xl font-semibold text-white group-hover:text-cyan">Hawkeye</span>
        </a>
        <nav aria-label="Primary">
          <ul class="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-6">
            @for (item of nav; track item.path) {
              <li>
                <a
                  [routerLink]="item.path"
                  routerLinkActive="text-cyan underline decoration-cyan underline-offset-4"
                  [routerLinkActiveOptions]="{ exact: item.exact }"
                  class="text-sm font-medium text-white hover:text-cyan"
                >{{ item.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
    <main id="main" class="mx-auto max-w-6xl px-4 py-10" tabindex="-1">
      <router-outlet />
    </main>
    <footer class="bg-navy text-white" role="contentinfo">
      <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p class="text-xs font-semibold tracking-[0.2em] text-cyan">REVYTECH</p>
          <p class="mt-2 font-heading text-lg">Hawkeye</p>
          <p class="mt-2 text-sm text-slate-200">Public docs site. Not a doctor, not a chat UI, not a recovery console.</p>
        </div>
        <div>
          <h2 class="font-heading text-sm font-semibold text-cyan">Source</h2>
          <ul class="mt-3 space-y-2 text-sm">
            <li><a class="hover:text-cyan" href="https://github.com/revytechinc/hawkeye">hawkeye (bins)</a></li>
            <li><a class="hover:text-cyan" href="https://github.com/revytechinc/hawkeye-data">hawkeye-data (knowledge kit)</a></li>
            <li><a class="hover:text-cyan" href="https://github.com/revytechinc/hawkeye-www">hawkeye-www (this site)</a></li>
          </ul>
        </div>
        <div>
          <h2 class="font-heading text-sm font-semibold text-cyan">Family</h2>
          <ul class="mt-3 space-y-2 text-sm">
            <li><a class="hover:text-cyan" href="https://revytechinc.com">revytechinc.com</a></li>
            <li><a class="hover:text-cyan" href="https://cloudbsd.org">cloudbsd.org</a></li>
          </ul>
        </div>
      </div>
      <p class="border-t border-navy-deep px-4 py-4 text-center text-xs text-slate-300">
        Copyright 2026 REVYTECH, Inc. BSD 3-Clause. CloudBSD is the platform; Hawkeye is a REVYTECH product.
      </p>
    </footer>
  `,
})
export class LayoutComponent {
  readonly nav = [
    { path: '/', label: 'Home', exact: true },
    { path: '/install', label: 'Install', exact: false },
    { path: '/rescue', label: 'Rescue', exact: false },
    { path: '/mcp', label: 'MCP', exact: false },
    { path: '/security', label: 'Security', exact: false },
  ];
}
