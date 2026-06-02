# Portfolio Modernization Analysis

## Confirmed Baseline

- Branch at planning time: `master` tracking `origin/master`.
- Required implementation branch: `improvement/portfolio-modernization-2026`.
- Package manager: npm, confirmed by `package-lock.json`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Zustand,
  Framer Motion, Vercel Analytics, Vercel Speed Insights.
- Useful scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run generate-metadata`
- No project lint or test script is currently defined.

## Findings

- `npm audit --json` reported seven vulnerabilities, including high severity
  advisories involving `next`, `lodash`, `picomatch`, `svgo`, and Babel tooling.
- `npm outdated --json` showed update candidates for Next.js, React,
  React DOM, PostCSS, Framer Motion, Zustand, Vercel packages, and type
  packages.
- `npx tsc --noEmit --incremental false` passed before implementation.
- `npx prettier --check .` failed on existing files. Formatting cleanup should
  be deliberate and scoped.
- Theme state is split between a React context and a Zustand store, while the
  active toggle directly mutates `document.documentElement.classList`.
- Locale routing and locale data do not exist yet.
- Korean portfolio content is spread across `src/data/**` and some page
  components.
- The current top banner still explains an old GitHub suspension problem that
  the user says is resolved.

## Modernization Direction

- Preserve Korean data as source content and add an English layer alongside it.
- Use URL-based i18n with `/ko` and `/en`.
- Keep root `/` as a Korean redirect.
- Consolidate theme state into one client store with persistence and document
  class synchronization.
- Replace the theme button with a motion-based sun/moon control.
- Introduce subtle glass utilities for navigation, banner, cards, and modals.
- Update dependencies in a dedicated build commit before deeper feature work.

## Risks

- Adding locale segments changes route paths and link generation.
- Dependency updates may change Next.js build behavior.
- Translating all public portfolio content is a large data diff; Korean source
  content must remain easy to inspect.
- `npm run build` regenerates tracked image metadata, so its diff must be
  reviewed before committing.
