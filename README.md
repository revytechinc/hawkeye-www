# Hawkeye public site

Public product and documentation site for Hawkeye, REVYTECH's FreeBSD trench medic.

Meatball surgery on servers and desktops, not people. Trench-warfare medicine for a host that is down.

This repository is not the doctor. It explains Hawkeye and points at the other repos. There is no public chat UI, no recovery console, and no privileged apply from the browser.

## Repositories

- hawkeye bins: https://github.com/revytechinc/hawkeye
- hawkeye-data knowledge kit: https://github.com/revytechinc/hawkeye-data
- hawkeye-www this site: https://github.com/revytechinc/hawkeye-www

## Pages

- Home: meatball surgery on servers and desktops (diagnose + apply, works in rescue). Field example is the panic session only
- Install: `# pkg install hawkeye` only; hawkeye-data is a RUN_DEPENDS. Ports still two (sysutils/hawkeye and sysutils/hawkeye-data). `hawkeye doctor` is package health here, not the rescue demo
- Rescue: tiers 0 / 1 / 2 (the aid station). The only field example is the panic session (`hawkeye` then a problem, remount playbook, apply `[y/N/e]` in the tty — not JSON, not `hawkeye consult`, not `hawkeye doctor`)
- MCP docs: /docs/mcp (the protocol URL is https://hawkeye.revytechinc.com/mcp — Streamable HTTPS, bearer token on GET and POST; the SPA does not share GET /mcp)
- Security: secrets never through LLMs

## Brand still

`public/images/hawkeye-pierce-hero.png` is a restored 1975 CBS still of Hawkeye Pierce. The still is public domain in the United States. Restoration is REVYTECH work product. `public/images/hawkeye-pierce-1975.jpg` is the original scan used as the source.

## Stack

Angular + TypeScript + Tailwind. React is not used. A static Angular build is enough to host.

Brand tokens match https://revytechinc.com : navy #001a33 / #002a55 / #013a73, blue #0066cc / #004a99, cyan #00d4ff, light #f8fafc. Outfit headings, Inter body. CloudBSD blue #00529B may appear as platform.

## License

BSD 3-Clause. Copyright (c) 2026, REVYTECH, Inc. See LICENSE.

## Architecture

See docs/overview.md for the repository map (Mermaid).

## Develop

Requires Node 20. Use the install and start scripts in package.json. Production output is dist/hawkeye-www/browser/. GitHub Actions runs the production build and Playwright smoke.

The same URLs must work at phone width and desktop width. Playwright covers Chromium at ~375px (plus 320/390 overflow checks) and ~1280px against the production build. Screenshots belong in artifacts/playwright/. FreeBSD cannot run Playwright; the cloud VM and GitHub Actions can.
