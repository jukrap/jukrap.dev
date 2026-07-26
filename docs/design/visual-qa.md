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
