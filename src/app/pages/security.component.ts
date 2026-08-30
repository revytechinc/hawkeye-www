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
    <article class="max-w-3xl">
      <h1 class="font-heading text-4xl">Security</h1>
      <p class="mt-4 text-lg">Hawkeye may use a model to reason about a diagnosis. Credentials never ride along.</p>

      <section class="mt-8 rounded-xl border border-line bg-panel p-6" aria-labelledby="secrets-heading">
        <h2 id="secrets-heading" class="font-heading text-2xl">Secrets never through LLMs</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li>Passwords, API tokens, private keys, and similar secrets stay on the host.</li>
          <li>A diagnosis sent to a model is redacted. The model does not receive the secret material needed to impersonate the host.</li>
          <li>Apply is local. The model suggests; the host program performs privileged work.</li>
        </ul>
      </section>

      <section class="mt-6 rounded-xl border border-line bg-panel p-6" aria-labelledby="browser-heading">
        <h2 id="browser-heading" class="font-heading text-2xl">This site cannot doctor a host</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li>No public chat UI.</li>
          <li>No operator recovery console in the browser.</li>
          <li>No privileged apply from the browser.</li>
        </ul>
        <p class="mt-3">Those belong on the host (CLI/TUI), not on a public product site. See <a routerLink="/mcp" class="text-brand underline-offset-2 hover:underline">MCP</a> for the local-only agent path and <a routerLink="/rescue" class="text-brand underline-offset-2 hover:underline">Rescue</a> for where the binary runs.</p>
      </section>
    </article>
  `,
})
export class SecurityComponent {}
