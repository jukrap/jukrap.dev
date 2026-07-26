# Restrained Graphic Realism

This branch rebuilds the portfolio around a restrained technical-image language: dense information, one deliberate visual focus, exposed rules, and a small cobalt signal. It does not reproduce a third-party logo, character, screen, phrase, or artwork. Reference material informed only the principles of contrast, hierarchy, and operational feedback.

## Information architecture

| Route                                        | Purpose                                  | Interactive scene                 |
| -------------------------------------------- | ---------------------------------------- | --------------------------------- |
| `/{locale}`                                  | Overview and selected work entry         | Procedural signal lattice         |
| `/{locale}/work`                             | Verified case-study selector             | Case-linked boundary field        |
| `/{locale}/work/{slug}`                      | Full case study                          | None                              |
| `/{locale}/projects`                         | Public-project selector                  | Approved-media artifact turntable |
| `/{locale}/projects/{slug}`                  | Full project record and image dialog     | None                              |
| `/{locale}/profile`                          | Profile, experience, skills, and contact | None                              |
| `/{locale}/portfolio`                        | Existing public recruiting document      | None                              |
| `/{locale}/resume`, `/{locale}/career-brief` | Existing private local-only documents    | None                              |

`/{locale}/about` redirects to `/{locale}/profile`. Root `/about`, `/work`, and `/profile` entries retain locale-aware redirects. Locale switching keeps the corresponding route.

The contracted first-screen copy is:

- Korean: `복잡한 경계를, 작동하는 화면으로.`
- English: `Complex boundaries, made operable.`
- Role: `Web & Mobile Frontend Engineer`

## Visual system

| Token   | Dark      | Light     |
| ------- | --------- | --------- |
| Canvas  | `#0b0d0f` | `#e8e9e4` |
| Surface | `#15191c` | `#f5f5f1` |
| Ink     | `#f2f3ee` | `#101315` |
| Muted   | `#9ca4a8` | `#5b6367` |
| Rule    | `#343a3e` | `#b8bdbb` |
| Cobalt  | `#5875ee` | `#2f49b8` |

Cobalt is an orientation signal, not a general surface color. Olive and danger colors are reserved for real state. High-chroma area should remain between 2–5% and never exceed 8% of a screen. Layout depth comes from spacing, rules, crop, and scale rather than glass panels, nested decorative cards, large shadows, or hover lift.

Archivo Variable and IBM Plex Mono are bundled through the Fontsource packages and emitted as same-origin WOFF2 files. Archivo is Copyright 2020 The Archivo Project Authors; IBM Plex Mono is Copyright 2017 IBM Corp. Both use the SIL Open Font License 1.1, whose public copy is shipped at `/fonts/documents/OFL-1.1.txt`; package license files are also retained in the dependency tree. Pretendard remains the Korean body face. No remote font service is contacted.

## Scene contracts

All copy, links, selection state, and keyboard controls remain in the DOM. Canvas is decorative and `aria-hidden`.

### Overview: signal lattice

- One seeded 3×3×3 lattice is the desktop focal point.
- Medium quality uses two depth planes, disables antialiasing, and requests low-power rendering.
- Pointer movement is bounded and does not move DOM controls.
- Reduced motion fixes the QA camera and a static pose.

### Work: boundary field

- Verified case selection determines the visible boundary categories and connections.
- Case title, role, evidence, and navigation remain DOM content.
- Medium quality reduces renderer cost while preserving every meaningful connection.
- The static fallback adds the selected case label over a generic field image.

### Projects: artifact turntable

- A DOM button advances a bounded rotation step; the canvas has no undocumented drag interaction.
- The screen texture is an approved existing public project capture.
- Scene-specific AVIF variants cap the long edge at 1600px for desktop and 1024px for mobile, with an 800KB hard budget. The current generated set is substantially below the cap.
- Mobile media selection is independent of the fixed QA camera, so a mobile QA run never fetches the desktop texture first.
- The static fallback uses the same responsive approved-media variant.

Each index route owns one lazily loaded renderer. Detail and document routes do not import or mount R3F. Scenes cap DPR at 1.75 desktop, 1.5 tablet, and 1.25 mobile. A device reporting 2GB or less, data-saver mode, unsupported WebGL, shader/asset failure, or repeated context loss receives the static AVIF path.

Visibility, offscreen state, and route ownership pause animation. Internal navigation dispatches a destination-aware leave signal before router transition, synchronously unmounting the renderer so Next.js route caching cannot preserve a running loop. Renderer lists/context and route-owned geometry, material, and texture resources are disposed. Back navigation reactivates the cached route with a fresh renderer.

## Content and asset policy

Case-study statements and metrics come from the existing verified Korean records; English content remains parallel data. The redesign does not add fabricated results, decorative coordinates, or unverified claims.

Project scene media is limited to repository-owner-approved public captures. Captures with unitemized third-party asset rights are excluded from the scene allowlist. The committed AVIF variants are generated by `npm run generate-graphic-fallbacks`; original screenshots remain detail-page evidence, not scene textures. Every public media record carries localized alt text, dimensions, focal point, provenance, and a rights note.

Private recruiting documents remain gated by all of the following: non-production runtime, no Vercel runtime marker, `PRIVATE_DOCUMENTS_ENABLED=true`, Korean locale, localhost/loopback host, and both contact environment values. Denied HTML and HEAD responses are 404 with `X-Robots-Tag`; RSC not-found transport may use 200 or 404 but is tested for the same noindex header and absence of private copy. Print styles force white paper and dark ink in both themes.

## Known intentional deviation

The existing public recruiting document has verified Korean data only. `/en/portfolio` therefore redirects to `/ko/portfolio` instead of presenting unverified English copy. The URL remains valid, but true parallel English document content is deferred until owner-approved translation data exists.
