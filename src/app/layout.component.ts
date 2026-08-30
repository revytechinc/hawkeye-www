/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="sticky top-0 z-40 bg-navy text-white" role="banner">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
        <a
          routerLink="/"
          class="group inline-flex min-h-12 items-center gap-3 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
        >
          <img src="/images/hawkeye-pierce-hero.png" width="48" height="61" alt="" class="h-10 w-auto rounded border border-cyan/40 sm:h-12" />
          <span class="inline-flex flex-col">
            <span class="text-xs font-semibold tracking-[0.2em] text-cyan">REVYTECH</span>
            <span class="font-heading text-xl font-semibold text-white group-hover:text-cyan sm:text-2xl">Hawkeye</span>
          </span>
        </a>
        <button
          type="button"
          class="inline-flex min-h-12 min-w-12 items-center justify-center rounded border border-cyan/50 text-cyan md:hidden"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="primary-nav"
          (click)="toggleMenu()"
        >
          <span class="sr-only">{{ menuOpen() ? 'Close menu' : 'Open menu' }}</span>
          @if (menuOpen()) {
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          } @else {
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          }
        </button>
        <nav
          id="primary-nav"
          aria-label="Primary"
          class="w-full md:block md:w-auto"
          [class.hidden]="!menuOpen()"
        >
          <ul class="flex flex-col border-t border-cyan/20 py-2 md:flex-row md:flex-wrap md:items-center md:gap-1 md:border-0 md:py-0 lg:gap-2">
            @for (item of nav; track item.path) {
              <li>
                <a
                  [routerLink]="item.path"
                  routerLinkActive="text-cyan underline decoration-cyan underline-offset-4"
                  [routerLinkActiveOptions]="{ exact: item.exact }"
                  class="inline-flex min-h-12 items-center px-2 text-base font-medium text-white hover:text-cyan md:text-sm"
                >{{ item.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
    <main id="main" class="mx-auto min-w-0 max-w-6xl px-4 py-8 sm:py-10" tabindex="-1">
      <router-outlet />
    </main>
    <footer class="bg-navy text-white" role="contentinfo">
      <div class="mx-auto grid min-w-0 max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p class="text-xs font-semibold tracking-[0.2em] text-cyan">REVYTECH</p>
          <p class="mt-2 font-heading text-lg">Hawkeye</p>
          <p class="mt-2 text-sm text-slate-200">Trench-warfare medicine for FreeBSD. Meatball surgery on servers and desktops, not people.</p>
        </div>
        <div>
          <h2 class="font-heading text-sm font-semibold text-cyan">Source</h2>
          <ul class="mt-3 space-y-1 text-sm">
            <li><a class="inline-flex min-h-12 items-center hover:text-cyan" href="https://github.com/revytechinc/hawkeye">hawkeye (bins)</a></li>
            <li><a class="inline-flex min-h-12 items-center hover:text-cyan" href="https://github.com/revytechinc/hawkeye-data">hawkeye-data (knowledge kit)</a></li>
            <li><a class="inline-flex min-h-12 items-center hover:text-cyan" href="https://github.com/revytechinc/hawkeye-www">hawkeye-www (this site)</a></li>
          </ul>
        </div>
        <div>
          <h2 class="font-heading text-sm font-semibold text-cyan">Family</h2>
          <ul class="mt-3 space-y-1 text-sm">
            <li><a class="inline-flex min-h-12 items-center hover:text-cyan" href="https://revytechinc.com">revytechinc.com</a></li>
            <li><a class="inline-flex min-h-12 items-center hover:text-cyan" href="https://cloudbsd.org">cloudbsd.org</a></li>
          </ul>
        </div>
      </div>
      <p class="mx-auto max-w-6xl break-words border-t border-navy-deep px-4 py-4 text-center text-xs text-slate-300">
        Copyright 2026 REVYTECH, Inc. BSD 3-Clause. CloudBSD is the platform; Hawkeye is a REVYTECH product.
        Still of Hawkeye Pierce (1975, CBS) is public domain in the United States; restoration is REVYTECH work product.
      </p>
    </footer>
  `,
})
export class LayoutComponent {
  private readonly router = inject(Router);
  readonly menuOpen = signal(false);

  readonly nav = [
    { path: '/', label: 'Home', exact: true },
    { path: '/install', label: 'Install', exact: false },
    { path: '/rescue', label: 'Rescue', exact: false },
    { path: '/docs/mcp', label: 'MCP', exact: false },
    { path: '/security', label: 'Security', exact: false },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
