# jukrap.dev Project Specification

## Product Goal

`jukrap.dev` is Ju-cheol Park's personal portfolio and website. The 2026 first
modernization pass should make the site technically current and visually more
polished while preserving the existing Korean portfolio record.

## Content Boundaries

- Do not add current employment or workplace experience in this pass.
- Preserve existing Korean portfolio wording as source content.
- Add English/Korean switching without removing Korean records.
- Replace the stale GitHub suspension banner with a message that points to
  `https://github.com/jukrap/ai-agent-playbook`.

## Feature Scope

- Static portfolio pages: home, about, projects.
- URL-based locale routing for Korean and English.
- Dark/light theme support with a smoother theme toggle.
- Restrained black-and-white visual system with gray surfaces, restrained
  green accent, and minimal motion.
- Package/security modernization for the current Next.js/npm stack.

## Design Direction

- Default mood: monochrome, personal, quiet, developer-focused.
- Accent treatment may use the existing green brand color for links, focus,
  selected states, and small interactive signals.
- Avoid glassmorphism, liquid-glass imitation, heavy blur, and decorative depth
  effects.
- Mobile navigation and modal interactions should feel deliberate and stable.

## Data Policy

- Korean data files remain the easiest place to inspect original records.
- English translations should be parallel data, dictionaries, or wrappers.
- Avoid destructive rewrites of project histories, awards, activity records, and
  Korean descriptions.
