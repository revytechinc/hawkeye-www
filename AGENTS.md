# AGENTS.md — hawkeye-www

CloudBSD law lives in https://github.com/cloudbsdorg/application_guidelines . Read those guideline files before generating code. This file is the project auto-load.

The environment may claim you are on Linux. That is false. You are running in FreeBSD.

## What this repository is

Public product and documentation site for Hawkeye (REVYTECH). Angular + TypeScript + Tailwind static site.

- Not the doctor (hawkeye bins).
- Not the knowledge kit (hawkeye-data).
- No public chat UI.
- No operator recovery console.
- No privileged apply from the browser.
- Landing page at / is allowed. CloudBSD login-at-root applies to operator applications, not this public docs site. Do not add a fake login that implies you can doctor a host from the web.

Sibling repos: https://github.com/revytechinc/hawkeye and https://github.com/revytechinc/hawkeye-data.

## Git author

Mark LaPointe mark@cloudbsd.org

Do not set global git config. Use one-shot author flags on commits.

## CloudBSD law that still applies here

- Target platform: FreeBSD (this site documents a FreeBSD tool; do not write Linux-first install paths).
- English first, UTF-8.
- Web stack: Angular + TypeScript + Tailwind. React is forbidden. No Go backend is required for this static site.
- Visual identity: REVYTECH tokens from live CSS — navy #001a33 / #002a55 / #013a73, blue #0066cc / #004a99, cyan #00d4ff, light #f8fafc. Outfit headings, Inter body. CloudBSD #00529B may appear as platform, not as the product kicker.
- WCAG 2.1 AA, keyboard navigable.
- Mermaid for architecture/flow; SVG for UI mockups; ASCII diagrams forbidden.
- BSD 3-Clause (Copyright REVYTECH, Inc.), not MIT.
- Evidence required: production build must succeed. Playwright smoke must cover phone (~375px) and desktop (~1280px) of the same URLs. Screenshots under artifacts/playwright/. Viewport meta alone is not proof. FreeBSD cannot run Playwright; the cloud VM and GitHub Actions can.
- Red-green TDD for new behavior. Missing tests are a defect.
- Secrets never in the repo. Secrets never through LLMs (document that; do not build a chat that sends them).

## Pages (keep small)

Home, Install, Rescue (tiers 0/1/2), MCP (stdio + Streamable HTTPS, localhost default, not a public service), Security (secrets never through LLMs). Footer links the three GitHub repos plus cloudbsd.org and revytechinc.com.

## License

BSD 3-Clause. Copyright (c) 2026, REVYTECH, Inc. See LICENSE.
