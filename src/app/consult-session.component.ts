/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Component } from '@angular/core';
import { formatConsultSession } from './consult-session';

@Component({
  selector: 'app-consult-session',
  template: `
    <figure class="min-w-0" aria-label="hawkeye consult terminal session">
      <pre
        class="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-navy p-4 text-sm text-cyan"
        tabindex="0"
      ><code>{{ session }}</code></pre>
    </figure>
  `,
})
export class ConsultSessionComponent {
  readonly session = formatConsultSession();
}
