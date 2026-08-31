/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-terminal',
  template: `
    <figure class="mt-3 min-w-0 overflow-hidden rounded-lg border border-cyan/30 bg-navy shadow-md" [attr.aria-label]="label()">
      <figcaption class="border-b border-cyan/20 px-3 py-2 font-mono text-xs text-slate-300">{{ caption() }}</figcaption>
      <pre
        class="max-w-full overflow-x-hidden whitespace-pre-wrap break-words p-4 text-sm leading-relaxed text-cyan"
        tabindex="0"
      ><code>{{ session() }}</code></pre>
    </figure>
  `,
})
export class TerminalComponent {
  readonly session = input.required<string>();
  readonly label = input('terminal session');
  readonly caption = input('tty');
}
