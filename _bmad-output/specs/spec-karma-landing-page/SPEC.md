---
id: SPEC-karma-landing-page
companions:
  - page-sections.md
  - ../../planning-artifacts/ux-designs/ux-karma-landing-page-2026-10-09/DESIGN.md
  - ../../planning-artifacts/ux-designs/ux-karma-landing-page-2026-10-09/EXPERIENCE.md
  - ../../../CLAUDE.md
  - ../../../design-system/README.md
  - ../../../design-system/1-dos-and-donts.md
  - ../../../design-system/2-tailwind.md
  - ../../../design-system/3-accessibility.md
sources:
  - ../../../README.md
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability — consult them only if you need narrative rationale or prose color this contract intentionally omits.

# Karma landing page

## Why

A vision to realize under a deadline: Karma is shown at the Crossroads AI hackathon, Sofia, 10–11 October 2026, and the landing page is the first thing judges and hospital research coordinators see. It must state the promise ("Every criterion cited. Nothing inferred.") and lead to the demo on a fictional patient. It is built in two phases so layout and copy can be reviewed separately: phase 1 builds every section with placeholder text, phase 2 replaces only the text.

## Capabilities

- **CAP-1**
  - **intent:** A visitor sees a floating, rounded light header with the solid lockup, a short descriptor, a "How it works" link and "Try the demo".
  - **success:** The header shows on load; "How it works" moves focus and view to that section; both controls work by keyboard with the visible focus ring.
- **CAP-2**
  - **intent:** A visitor sees the main section: dark ground, the light made of dots, the tagline as the headline, one support line and "Try the demo".
  - **success:** No text sits on the dots; the dots are `aria-hidden`; any movement stops under `prefers-reduced-motion: reduce`.
- **CAP-3**
  - **intent:** A visitor learns how Karma works in four steps: reads the documents, builds the case card, ranks recruiting trials, shows every criterion.
  - **success:** Four ordered steps render, in that order, as an ordered list.
- **CAP-4**
  - **intent:** A visitor learns the four criterion states and their fixed meanings.
  - **success:** Each state shows its icon, colour and word together with the fixed definition from `page-sections.md`; no "met" on an exclusion row, and the one exclusion example is "needs a clinician".
- **CAP-5**
  - **intent:** A visitor meets the fictional demo patient on a demo case card and can start the demo from it with "Find trials", or open "See the documents".
  - **success:** The card shows "Fictional patient" and "Frozen demo" first, every value on it carries a visible source chip (document and page), and "Find trials" is the card's one primary button. Until the app exists, both card buttons link to a placeholder.
- **CAP-6**
  - **intent:** A visitor reads what Karma does not do.
  - **success:** The section states that Karma does not interpret, recommend or decide, that values are verbatim, trials ordered not scored, and judgment calls marked "needs a clinician".
- **CAP-7**
  - **intent:** A visitor reaching the end finds a closing band with "Try the demo".
  - **success:** The band renders above the footer with the same action as the header and main section.
- **CAP-8**
  - **intent:** Every visitor sees the footer sentence.
  - **success:** The footer reads, word for word: "Karma organizes and cites documents. It does not interpret, recommend or decide."
- **CAP-9**
  - **intent:** An editor changes all visible text by editing one content file, `content.json`, without touching markup.
  - **success:** Editing `content.json` and re-running the build changes every visible string; a search of the markup templates finds no copy. Phase 1 placeholders are within about 20% of the real text's length; fixed strings in `page-sections.md` are real from phase 1.

## Constraints

- Plain HTML with the design system's Tailwind v4 theme, no framework. A small build script reads `content.json` and writes the HTML; the browser never fetches `content.json`, so the page works opened from a file.
- Works fully offline: fonts self-hosted from `design-system/fonts/`, icons as inline SVG, no CDN or Google Fonts.
- Colours only from the palette and tokens in `design-system/tokens.json`; green, red and amber appear only as state colours; violet only on the Fictional patient badge.
- Dark only in the main section (`brand-*` tokens); every other section is light.
- One page-level action, "Try the demo", repeated in the header, main section and closing band; it scrolls to the demo card. The card's own primary, "Find trials", starts the demo. No other primary buttons.
- Demo values come from the demo card as designed (`design-system/components/DemoCaseCard/preview.html`); if the app gains a frozen dataset, the page reads that file instead.
- Landing page controls are 44px tall or more (overrides the app's 40px button recipe).
- Text is 14px or larger; layout holds at 125% browser zoom on a 1920×1080 screen.
- Logo only from the Twin files: solid lockup in the light header, `-reversed` files on the dark ground and never over the dots.
- Controls are real `<a href>` or `<button type="button">`.
- No verdict words, no exclamation marks, no emoji, no claims about intelligence, sentence case, ranks never shown as scores (full list in `CLAUDE.md`).
- No real patient documents or values; only the fictional patient.

## Non-goals

- Final copy in phase 1 (phase 2 only, and phase 2 changes `content.json` only).
- The app's work screens (case card, trial list, criterion matrix, evidence panel) beyond the one demo case card.
- Live data: no ClinicalTrials.gov calls, no document upload, no backend.
- A light/dark toggle or translations of the interface.

## Success signal

- With Wi-Fi off, at 125% zoom on a 1920×1080 screen, the page renders every section top to bottom with placeholder text, "Try the demo" appears three times, and the footer sentence is exact. Swapping in a `content.json` with the real copy changes the text with no markup edit and no section breaking its layout.

## Assumptions

- The page also works at phone width (16px gutter, no horizontal scroll); the inputs set no breakpoints.
- Logo SVGs come from `docs/karma-logo-kit.zip`; `design-system/assets/Logos/` holds only its README.
