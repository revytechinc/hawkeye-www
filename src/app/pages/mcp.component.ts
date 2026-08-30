/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mcp',
  imports: [RouterLink],
  template: `
    <article class="max-w-3xl">
      <h1 class="font-heading text-4xl">MCP</h1>
      <p class="mt-4 text-lg">Hawkeye can speak the Model Context Protocol so a local agent can call diagnose and related tools. It is a loopback helper, not a public service.</p>

      <section class="mt-8 rounded-xl border border-line bg-panel p-6" aria-labelledby="transports-heading">
        <h2 id="transports-heading" class="font-heading text-2xl">Transports</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li><strong>stdio</strong> — a local agent starts Hawkeye as a child process and talks on stdin/stdout.</li>
          <li><strong>Streamable HTTPS</strong> — an HTTP transport for local MCP clients that prefer a URL.</li>
        </ul>
      </section>

      <section class="mt-6 rounded-xl border border-line bg-panel p-6" aria-labelledby="bind-heading">
        <h2 id="bind-heading" class="font-heading text-2xl">Localhost default</h2>
        <p class="mt-3">The HTTPS transport binds to localhost by default. That is the supported mode. Do not publish it on the internet. Do not put it behind a public reverse proxy as if it were an API.</p>
        <p class="mt-3">This documentation site does not host MCP. There is no MCP endpoint here.</p>
      </section>

      <section class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6" aria-labelledby="not-public-heading">
        <h2 id="not-public-heading" class="font-heading text-2xl">Not a public service</h2>
        <p class="mt-3">An MCP socket on a sick host is still a privileged control plane. Treat it like SSH to root: local, authenticated, and off the public network. Secrets still never go through the LLM — see <a routerLink="/security" class="text-brand underline-offset-2 hover:underline">Security</a>.</p>
      </section>
    </article>
  `,
})
export class McpComponent {}
