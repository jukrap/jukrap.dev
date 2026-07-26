# Visual QA ledger

## Evidence scope

- Base SHA: `286edec3792d4d6996219d1ce8e3c2defd2cc26c`
- Tested implementation SHA: `cd8a5d575726855375f32f45a75652f2252ac9fa`
- Runtime: Node.js `v24.14.0`, Next.js `16.2.12`, Playwright `1.62.0`
- The implementation SHA above is the exact application tree used for the results
  below. The later ledger-only commit changes this file, not the tested runtime.

## Command results

| Check                                       | Result                                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `npm audit`                                 | Completed with exit 1: two high findings remain through Next.js's nested `sharp@0.34.5` |
| `npm run typecheck`                         | Passed                                                                                  |
| `npm run format:check`                      | Passed                                                                                  |
| `npm run test:e2e`                          | Passed, 56 Chromium tests                                                               |
| `npm run test:visual -- --update-snapshots` | Passed, 6 snapshots updated                                                             |
| `npm run test:visual`                       | Passed, 6 fresh comparisons                                                             |
| `playwright test --grep @browser-smoke`     | Passed, 6 tests across Chromium, Firefox, and WebKit                                    |
| `npm run build`                             | Passed, 65 pages generated                                                              |

The repository has no project-defined lint script, so the absence of a lint command
is not treated as a failure.

After the build, `src/data/imageMetadata.json` had the same canonical Git blob as
HEAD (`8db8ec9080bf4283912867768deeade464f03688`) and no staged diff. A byte-level
hash changed only because the generator rewrote line endings.

## Viewport and state matrix

- Chromium fixed snapshots: 1440×1024, 1024×768, and 390×844
- Additional reflow checks: 360×800, 320×800, and a 512×384 CSS viewport as
  the 200% browser-zoom layout equivalent of a 1024×768 viewport
- Functional smoke: Chromium, Firefox, and WebKit
- Locales: Korean and English, including route-preserving locale changes
- Themes: system, light, dark, and refresh persistence
- Content: INDEX, list routes, detail routes, long profile content, image dialog,
  public portfolio document, and private document access boundaries

## Acceptance results

- Exact KO/EN H1 copy and `Web & Mobile Frontend Engineer` role passed.
- No horizontal overflow or clipped H1 was found at the required widths.
- Structural-grid simplification and metadata removal passed at narrow widths.
- Keyboard-visible focus, skip link, mobile menu, gallery arrows, dialog Escape,
  focus containment, and focus return passed.
- Representative public routes had no serious or critical WCAG 2 A/AA axe
  violations.
- Primary mobile menu and dialog controls met the 44px target.
- Legacy redirects, browser back/forward, and route-preserving locale switching
  passed.
- System/light/dark storage, refresh persistence, and first-paint theme selection
  passed.
- `Noto Serif KR Variable` and `JetBrains Mono Variable` loaded from same-origin
  build assets; `document.fonts.check` passed and no external font request occurred.
- Public portfolio indexability, canonical metadata, and English-to-Korean redirect
  passed.
- Public and private document print styles stayed white and high contrast from both
  screen themes.
- Representative routes completed without console errors or failed requests.

## Private document production boundary

A Node 24 production server was identified by the approved Korean H1 before the
following probes were run with otherwise complete private-document environment
values:

| Route              | Status | Search header                  | Sensitive-value leak |
| ------------------ | -----: | ------------------------------ | -------------------- |
| `/ko`              |    200 | none required                  | no                   |
| `/ko/resume`       |    404 | `noindex, nofollow, noarchive` | no                   |
| `/ko/career-brief` |    404 | `noindex, nofollow, noarchive` | no                   |
| `/en/resume`       |    404 | `noindex, nofollow, noarchive` | no                   |
| `/en/career-brief` |    404 | `noindex, nofollow, noarchive` | no                   |

HTML denials return HTTP 404. Next.js RSC transport returns HTTP 200 with the
`NEXT_HTTP_ERROR_FALLBACK;404` signal; those responses retain the search header and
contain neither document copy nor contact values.

## Committed baselines

All paths are relative to `tests/e2e/visual.spec.ts-snapshots/` and hashes are
SHA-256 values from the tested implementation tree.

| Snapshot                                      | SHA-256                                                            |
| --------------------------------------------- | ------------------------------------------------------------------ |
| `archive-detail-ko-mobile-chromium-win32.png` | `8206a5fefc607d57c11bf0a85639921b56e53ed304cf4adbdc8b94657ee26d90` |
| `case-ko-desktop-chromium-win32.png`          | `935514b67d044787b63c62236e37848d07c7e1a8fe54c4963a52f7b6d407715a` |
| `index-en-desktop-dark-chromium-win32.png`    | `72e80c5852bf240fe14c7f59f44f1397c4b5db3e81d17b810d2988c4e0d1a365` |
| `index-ko-desktop-chromium-win32.png`         | `4489fafad5c43f053409f842d31247c44643a8a3ef882af04786603c497d9cae` |
| `index-ko-mobile-chromium-win32.png`          | `21ee80710acf30b35e6a3766214f0091a6fc159ca721d8b53fe132d7549a5b51` |
| `index-ko-tablet-chromium-win32.png`          | `230f6c86b7319fc2b118474893a535e9f3b3ca1430e7aab7a37006d4d27a4d63` |

Generated concepts and local review copies are intentionally excluded from Git.
The final handoff records their external QA artifact paths.

## Intentional deviations and residual risk

- The 200% check uses the equivalent 512×384 CSS viewport because deterministic
  browser zoom is not exposed consistently across the three headless engines.
- `npm audit fix` reduced six findings to two. The remaining findings come from
  Next.js's nested `sharp@0.34.5`; the suggested forced fix downgrades Next.js to
  14.2.35 and conflicts with the React 19/Next 16 application. Direct `sharp` was
  updated to 0.35.3. Track a patched Next.js release rather than force-downgrade.
- The two added font packages declare OFL-1.1 and are bundled as same-origin WOFF2
  assets by the production build.
- Vercel Preview verification is deferred to the post-push deployment handoff.
