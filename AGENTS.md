# AGENTS.md

# jukrap.dev Working Guide

This repository is a personal portfolio and website built with Next.js, React,
TypeScript, Tailwind CSS, and npm. Treat this file as working guidance, not a
product specification.

## Start Rules

- Work on a feature branch before implementation. Do not implement on `master`.
- Check branch, remote, dirty state, package scripts, and local docs before
  changing code.
- Prefer `rg` for search and project-defined npm scripts for verification.
- Never revert unrelated user changes.
- Keep commits small and explicit. Stage paths directly instead of using
  `git add .`.

## Source Of Truth

1. Latest user instruction.
2. Actual code, config, and package scripts.
3. `PROJECT_SPEC.md`, `PLANS.md`, and `docs/plans/**`.
4. This file.
5. Older references or external material.

## Portfolio Content Policy

- Preserve the existing Korean portfolio records unless the user explicitly asks
  to edit content.
- Do not add current employment details in the 2026 first modernization pass.
- English content may be added as a translation layer, but Korean source content
  must remain reviewable and easy to diff.
- User-requested banner copy may replace stale GitHub suspension messaging.

## Architecture And Data

- Use the Next.js App Router already present in `src/app`.
- Prefer small shared helpers over a forced architecture pattern.
- Keep route/page components focused on composition.
- Keep portfolio data in typed data modules. For i18n, use locale-aware data
  wrappers rather than overwriting the Korean source records.
- Avoid guessing external API contracts. This site is mostly static portfolio
  content; do not introduce backend behavior without a clear requirement.

## UI And Styling

- The visual direction is black-and-white first, with gray surfaces and the
  existing green accent used only for small interactive signals.
- CSS variables and Tailwind utilities should own shared theme tokens, layout,
  and reusable visual language.
- Inline styles are acceptable for truly dynamic values such as measured sizes,
  transforms, transition delays, and generated gradients.
- Prefer class names or shared utilities for static styling.
- Verify desktop and mobile widths for navigation, modals, text wrapping, image
  containers, loading, empty, error, hover, and disabled states.
- Do not use decorative effects that fight the portfolio content. Avoid
  glassmorphism, liquid-glass imitation, heavy blur, bouncy hover states, and
  excessive shadows.
- Prefer subtle easing, opacity, border, underline, and 1px movement for hover
  and click feedback instead of removing interaction entirely.

## Verification

Use commands proven by `package.json` or local config. Current useful checks:

```bash
npx tsc --noEmit --incremental false
npx prettier --check .
npm audit
npm run build
```

`npm run build` regenerates `src/data/imageMetadata.json`; inspect that diff
before committing.

## Git

- Use Conventional Commits with Korean summaries, for example
  `feat(i18n): locale 라우팅 추가`.
- Commit documentation, dependency updates, feature work, visual changes, and
  fixes separately when practical.
- Include verification in commit bodies only for commands actually run.
- Do not commit local-only generated artifacts unless they are already tracked
  and intentionally updated.
