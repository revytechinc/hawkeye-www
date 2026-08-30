# Hawkeye public site

Public product and documentation site for Hawkeye, REVYTECH's FreeBSD field surgeon.

This repository is not the doctor. It explains Hawkeye and points at the other repos. There is no public chat UI, no recovery console, and no privileged apply from the browser.

## Repositories

- hawkeye bins: https://github.com/revytechinc/hawkeye
- hawkeye-data knowledge kit: https://github.com/revytechinc/hawkeye-data
- hawkeye-www this site: https://github.com/revytechinc/hawkeye-www

## Pages

- Home: what Hawkeye is (diagnose + apply, works in rescue)
- Install: pkg or port, two packages, /rescue and /boot/hawkeye
- Rescue: tiers 0 / 1 / 2
- MCP: stdio + Streamable HTTPS, localhost default
- Security: secrets never through LLMs

## Stack

Angular + TypeScript + Tailwind. React is not used. A static Angular build is enough to host.

Brand tokens match https://revytechinc.com : navy #001a33 / #002a55 / #013a73, blue #0066cc / #004a99, cyan #00d4ff, light #f8fafc. Outfit headings, Inter body. CloudBSD blue #00529B may appear as platform.

## License

BSD 3-Clause. Copyright (c) 2026, REVYTECH, Inc. See LICENSE.

## Architecture

See docs/overview.md for the repository map (Mermaid).

## Develop

Requires Node 20. Use the install and start scripts in package.json. Production output is dist/hawkeye-www/browser/. GitHub Actions runs the production build. Playwright smoke covers desktop Chrome against the production build; screenshots belong in artifacts/playwright/.
