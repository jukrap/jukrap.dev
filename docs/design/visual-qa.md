# Visual QA ledger

This ledger is the public, branch-safe verification record. It contains no private contact values, local source paths, or private reference assets.

## Required commands

Run with the repository Node 24 runtime. The Playwright configuration starts its Next.js child with `process.execPath`, so the browser server uses the same Node executable as the test runner.

```text
npm audit
npm run typecheck
npm run format:check
npm run test:e2e
npm run test:visual
npm run build
```

`npm run build` regenerates `src/data/imageMetadata.json`; review that diff and retain only entries caused by committed public assets.

## Viewport and content matrix

Chromium fixed screenshots cover:

- 1440×1024 desktop
- 1024×768 tablet
- 390×844 mobile
- 360×800 narrow mobile
- 320×800 minimum reflow
- 200% page scale followed by 320px reflow

The baseline set includes Korean/English, light/dark work and project indexes, live reduced-motion QA-camera captures for all three scenes, mobile navigation, focus visibility, and white-paper print output. Chromium owns pixel snapshots; Chromium, Firefox, and WebKit own functional smoke coverage.

For every viewport, check H1 wrapping, grid alignment, horizontal overflow, long content, decoration removal order, visible focus, and 44px touch targets. The mobile menu must move focus inside, wrap Tab/Shift+Tab, close with Escape, restore the trigger, and remain hidden/inert when closed.

## Scene verification

- First rendered canvas differs from its first pixel by more than 1% of sampled pixels.
- The fixed QA camera produces deterministic reduced-motion snapshots.
- Desktop/tablet/mobile camera tiers and DPR caps are asserted after resize.
- High quality is desktop-only. Tablet/mobile use medium quality, lower node depth where applicable, no antialiasing, and low-power preference.
- A 2GB-device fixture, data saver, forced-static query, unsupported WebGL, render error, and context loss expose localized static fallbacks.
- Mobile project QA requests only `-mobile.avif`; desktop texture is not requested.
- Every project scene AVIF is inspected with Sharp for long-edge and 800KB limits.
- Hidden/offscreen scenes pause. Destination-aware internal navigation removes visible canvas and stops the frame counter.
- A same-realm 20-cycle test checks back-navigation reactivation, renderer/resource disposal counts, and a post-GC heap delta below 24MB.
- Modified clicks do not suspend the scene in the current tab.

The deliberate `?scene=throw` fixture logs its intentional render error before the error boundary selects a fallback. Three.js currently emits a dependency deprecation warning for `THREE.Clock`; it is not a console error and is tracked as an upstream migration risk.

## Fonts and first paint

A no-hydration fixture stores a theme preference, blocks application JavaScript chunks, and verifies that the inline head bootstrap selects the matching button style before hydration. Hydrated tests cover system/light/dark persistence.

Font QA explicitly loads Archivo Variable and IBM Plex Mono, confirms loaded `FontFace` entries, verifies at least two bundled `/_next/static/media/*.woff2` resources, and rejects cross-origin font requests.

## Privacy boundary

The policy matrix covers enabled, disabled, missing email, missing phone, non-local host, English locale, production, and Vercel runtime inputs. QA web servers explicitly disable the private gate so results do not depend on a developer's `.env.local`.

For both private routes, test:

- denied Korean and English HTML
- 404 HTML and HEAD status
- `X-Robots-Tag: noindex, nofollow, noarchive`
- non-local Host denial
- RSC noindex header and no private-copy leakage
- denied metadata title and absence of private descriptions
- production denial after build

The public portfolio print sheet is checked from both themes for white background and high-contrast dark ink.

## Build and route isolation

After production build, inspect the app build manifests and captured network requests. The acceptance condition is that work/project detail pages and all recruiting-document routes load no R3F/Three route chunks and mount no graphic scene canvas. Record the exact manifest/chunk evidence before push.

## Snapshot update policy

Update baselines only after reviewing the rendered desktop, tablet, and mobile images. A snapshot update is not a pass by itself. Re-run `npm run test:visual` without update mode and keep only reviewed images under the Playwright snapshot directory.

## Verified implementation

| Record             | Value                                      |
| ------------------ | ------------------------------------------ |
| Base SHA           | `286edec3792d4d6996219d1ce8e3c2defd2cc26c` |
| Implementation SHA | `5dec62f7cabd51dc2bd4d0e3b0cbaf79bccc0c9f` |
| Acceptance runtime | Node 24.x (`.nvmrc` and `engines.node`)    |
| Baseline tree      | `ac0246e843845246315d43686a792e696fb5da74` |

The verification below was completed against the implementation SHA before this ledger-only commit:

- `npm run format:check`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run test:e2e`: public production suite 85 passed, 32 skipped, 0 failed, and 0 retries used; private local-gate suite 4 passed.
- `npm run test:visual`: 15 passed with no update mode.
- `npm audit`: reported two high-severity findings through Next.js' nested `sharp@0.34.5`. The project-level Sharp is `0.35.3`; the only proposed automatic repair was a breaking forced downgrade to Next.js 14, so no force fix or override was applied.
- `src/data/imageMetadata.json`: the normalized staged blob remained unchanged after the final build.

The public browser suites build once and use `next start`, matching deployed route/chunk behavior. The private-enabled localhost proof uses `next dev` with an isolated `.next-private-qa` directory because private documents are intentionally unavailable after a production build.

## Verified privacy and route isolation

- Production HTML and HEAD requests to Korean and English resume/career routes returned 404 with `X-Robots-Tag: noindex, nofollow, noarchive`.
- RSC not-found transport returned 200 as permitted by Next.js, preserved the robots header, and contained no private sentinel or contact copy.
- Overview, Work, and Projects indexes each mounted one canvas and loaded their R3F route chunks.
- Work detail, project detail, and public recruiting-document routes mounted no canvas and loaded no R3F/Three route chunks.
- Normal production routes produced no console or network errors outside the explicit allowlist for local Vercel Insights endpoints and an aborted Next.js RSC prefetch.

## Verified scene evidence

- Deterministic QA cameras, first-frame nonblank pixels, responsive DPR/framing, hidden/offscreen pause, route teardown, context-loss fallback, reduced-motion pose, and renderer/resource disposal passed.
- Project texture readiness waits for explicit GPU initialization and three post-upload frames. A crop-variance assertion proves that the live canvas contains media detail rather than a flat material; the project scene repeated successfully in three consecutive non-update runs.
- Full-page static screenshots cover layout and responsive reflow. Live WebGL baselines target `.graphic-scene-canvas`, isolating renderer output from a transient fallback-opacity transition while preserving deterministic scene comparison.
- Retry support remains configured for failure artifacts, but the final accepted run used zero retries and reported zero flaky tests.
- Final manual review found no P0/P1 issue in Overview desktop/mobile or Projects desktop/mobile; Korean word wrapping, overflow, production chrome, 3D framing, project media texture, controls, and list reflow were all checked.

## Final handoff captures

The local handoff images are intentionally ignored by Git. Their SHA-256 digests are:

| Capture                           | SHA-256                                                            |
| --------------------------------- | ------------------------------------------------------------------ |
| `overview-desktop-1440x1024.png`  | `F6930E26E4F35BB965D9FB94483A5C0932E81D4102F26485214EDFC06917E5E2` |
| `overview-tablet-1024x768.png`    | `7155CEC3D05ABF8C877FBE101B62189B0CE6A4122C84E6F1BD40F11748F6F9EB` |
| `overview-mobile-390x844.png`     | `8CC219F87967EE6B5905FD2EB022995B11A73FB145ABC0355ADAA87CB9DC23EE` |
| `work-desktop-1440x1024.png`      | `E60C6E01CDF9D4396C3667E136C90F27C57F37AB5D173954FE3BE2FC89641463` |
| `projects-desktop-1440x1024.png`  | `717BEF18E9110C1B65CC8DF029349FC1DE3C8511626F97CAADF0D417CE10EEC7` |
| `projects-mobile-390x844.png`     | `0378A4A8C516B51B4308E29AE6B52333B8B7F86AEFC21A2F3398F5288C5C5C3C` |
| `profile-desktop-1440x1024.png`   | `F05A7C29CF5F06DB485AC645BE437C7410B1CB6695408139D96A5AD385D4C4B9` |
| `portfolio-desktop-1440x1024.png` | `FA7B35E4D40352E871D6FC873A970B9FA708C078598E41A4DE45A12462FCFC06` |
