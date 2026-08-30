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
    <article class="min-w-0 max-w-3xl">
      <h1 class="font-heading text-3xl sm:text-4xl">MCP</h1>
      <p class="mt-4 text-base sm:text-lg">Hawkeye speaks the Model Context Protocol so an agent can call diagnose and related tools. The public endpoint is authenticated. You must have a token.</p>

      <section class="mt-8 min-w-0 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="protocol-heading">
        <h2 id="protocol-heading" class="font-heading text-xl sm:text-2xl">Protocol URL</h2>
        <p class="mt-3">Streamable HTTPS owns <code class="rounded bg-surface px-1">GET</code> and <code class="rounded bg-surface px-1">POST</code> on this URL. The docs site does not share that path.</p>
        <p class="mt-3"><a class="break-all text-brand underline-offset-2 hover:underline" href="https://hawkeye.revytechinc.com/mcp">https://hawkeye.revytechinc.com/mcp</a></p>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li>Streamable HTTPS. <code class="rounded bg-surface px-1">GET</code> is SSE. <code class="rounded bg-surface px-1">POST</code> is the request channel.</li>
          <li>TLS via the existing Let’s Encrypt certificate.</li>
          <li>Authorization: a bearer token is required on <code class="rounded bg-surface px-1">GET</code> and <code class="rounded bg-surface px-1">POST</code>.</li>
          <li>Missing token: <code class="rounded bg-surface px-1">401</code>.</li>
          <li>No anonymous access.</li>
        </ul>
        <p class="mt-3">This page does not issue or display a token.</p>
      </section>

      <section class="mt-6 min-w-0 rounded-xl border border-line bg-panel p-5 sm:p-6" aria-labelledby="transports-heading">
        <h2 id="transports-heading" class="font-heading text-xl sm:text-2xl">Transports</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5">
          <li><strong>stdio</strong> — an agent starts Hawkeye as a child process and talks on stdin/stdout.</li>
          <li><strong>Streamable HTTPS</strong> — the public protocol URL above.</li>
        </ul>
      </section>

      <p class="mt-6">Secrets still never go through the LLM — see <a routerLink="/security" class="text-brand underline-offset-2 hover:underline">Security</a>.</p>
    </article>
  `,
})
export class McpComponent {}
