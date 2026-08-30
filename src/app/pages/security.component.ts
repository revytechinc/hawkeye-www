/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-security',
  imports: [RouterLink],
  template: `
    <article class="min-w-0 max-w-3xl">
      <h1 class="font-heading text-3xl sm:text-4xl">Security</h1>
      <p class="mt-4 text-base sm:text-lg">Hawkeye is a local CLI on the host. Credentials never ride along.</p>

      <section class="mt-8 min-w-0 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="secrets-heading">
        <h2 id="secrets-heading" class="font-heading text-xl sm:text-2xl">Secrets never through LLMs</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li>Passwords, API tokens, private keys, and similar secrets stay on the host.</li>
          <li>A diagnosis sent to a model is redacted. The model does not receive the secret material needed to impersonate the host.</li>
        </ul>
      </section>

      <section class="mt-6 min-w-0 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="apply-heading">
        <h2 id="apply-heading" class="font-heading text-xl sm:text-2xl">Apply is local and needs --yes</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li>The model suggests. The host program performs privileged work.</li>
          <li>Dry-run first. Privileged apply needs <code class="rounded bg-surface px-1">--yes</code>.</li>
          <li>There is no web doctor. Apply is the local CLI, not this site.</li>
        </ul>
        <p class="mt-3">See <a routerLink="/mcp" class="text-brand underline-offset-2 hover:underline">MCP</a> for the local-only agent path and <a routerLink="/rescue" class="text-brand underline-offset-2 hover:underline">Rescue</a> for where the binary runs.</p>
      </section>
    </article>
  `,
})
export class SecurityComponent {}
