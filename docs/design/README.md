# Annotated Source Manuscript

## Direction

This branch treats the portfolio as an annotated working source. Editorial
hierarchy, revision rhythm, restrained proof marks, and traceable detail pages
carry the idea while every profile field stays tied to verified engineering data.

The interface deliberately avoids stacked cards, floating panels, hover lift, and
decorative pseudo-data. Sections share one structural grid and are separated by
rules, whitespace, type scale, and content order.

## Information architecture

- `/{locale}` — INDEX
- `/{locale}/cases` and `/{locale}/cases/{slug}` — professional case studies
- `/{locale}/archive` and `/{locale}/archive/{slug}` — personal projects
- `/{locale}/profile` — public profile, skills, published career summary, activities, awards, and contact
- `/{locale}/portfolio` — public recruiting portfolio document
- `/{locale}/resume` and `/{locale}/career-brief` — existing private document
  routes with their original access restrictions

Legacy localized `work`, `projects`, and `about` routes redirect to `cases`,
`archive`, and `profile`. Locale switching keeps the current route and slug.

## Visual system

- Paper and surface are separate only where a document sheet requires it.
- `Noto Serif KR Variable` establishes editorial hierarchy.
- Pretendard remains the primary reading face.
- `JetBrains Mono Variable` is limited to metadata, controls, and source markers.
- Editor blue is an annotation color, not a large decorative fill.
- Proof marks are newly authored inline SVG primitives.
- Motion is limited to state communication; reduced-motion users receive an
  effectively static interface.

The light and dark palettes use the documented paper, ink, graphite, rule, and
editor-blue tokens. Theme preference supports `system`, `light`, and `dark` and is
stored under a branch-specific key before hydration.

## Content and media

Case studies and projects adapt the repository's existing Korean and English
records. Existing quantities and outcomes are not rewritten into new metrics.
Case source locators remain mapped to their original repository records. Project
media reuses existing portfolio screenshots under the project owner's redesign
instruction. Any third-party marks or assets visible inside those screenshots
retain their respective rights.

Project summary modals were replaced by detail routes. External WebView behavior
was reduced to normal external links. Only the image gallery remains a modal
surface, implemented as a keyboard-operable native dialog with focus return.

## Fidelity ledger

- Preserved: a single large editorial statement as the first-screen focus.
- Preserved: an open 12-column structural grid instead of nested containers.
- Preserved: mono folio labels, ruled index rows, and revision-colored marks.
- Preserved: paper-like light/dark palettes with restrained surface contrast.
- Preserved: serif display type paired with neutral body and mono metadata.
- Adapted: generated concept copy was replaced with the exact approved KO/EN
  first-screen copy.
- Adapted: decorative sample coordinates were replaced with real record indices,
  periods, roles, stack, and evidence counts.
- Adapted: dense desktop navigation becomes a full-page mobile index with 44px
  minimum controls.
- Adapted: project imagery uses real portfolio captures and an accessible gallery,
  not concept placeholders.
- Excluded: handwriting fonts, unclear reference SVG paths, 3D, hover lift, and
  fictional editorial metadata.

## Public handoff boundary

This document intentionally excludes local design-kit paths, generated concept
source paths, personal contact values, environment values, deployment credentials,
and private recruiting content.
