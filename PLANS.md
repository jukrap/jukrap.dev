# Plans

## 2026 Portfolio Modernization - Phase 1

Goal: modernize the portfolio's technical baseline, routing, theme behavior, and
visual polish without adding current employment content or rewriting the Korean
portfolio record.

Completion criteria:

- Work is performed on `improvement/portfolio-modernization-2026`.
- Documentation explains content boundaries, i18n direction, and verification.
- Dependency updates remove known audit issues where compatible.
- `/ko`, `/en`, `/ko/about`, `/en/about`, `/ko/projects`, and `/en/projects`
  render.
- Root `/` lands on Korean content.
- Dark/light toggle uses a smoother sun/moon transition.
- Language switching preserves the current page when possible.
- Top banner links to `https://github.com/jukrap/ai-agent-playbook`.
- Korean portfolio source content remains preserved except the requested banner
  replacement and structural imports.

Verification commands:

```bash
npm audit
npx tsc --noEmit --incremental false
npx prettier --check .
npm run build
```

Manual verification:

- Desktop and mobile navigation.
- Theme toggle.
- Language switch.
- Project modal and image viewer.
- Top banner external link.
