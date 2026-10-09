---
title: 'Page scaffold and content file'
type: 'feature'
created: '2026-10-09'
status: 'done'
baseline_commit: 'aa29f5a31dc41b280198ee3d4ca866746640f919'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/specs/spec-karma-landing-page/SPEC.md'
  - '{project-root}/_bmad-output/specs/spec-karma-landing-page/page-sections.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-karma-landing-page-2026-10-09/DESIGN.md'
  - '{project-root}/CLAUDE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The landing page has no code yet, and every later story needs the same base: a build that turns `content.json` into HTML, the Karma theme, self-hosted fonts and logos, and the footer every screen ends with.

**Approach:** A small Node build script fills slots in an HTML template from `content.json` and writes a static page to `dist/`; Tailwind v4 compiles the design system's theme. This story ships an empty page shell with the footer only.

## Boundaries & Constraints

**Always:** All visible text comes from `content.json`, read at build time only. Fixed strings from `page-sections.md` are real text; everything else is a placeholder of about the real length. Fonts from `design-system/fonts/`; logos from the Twin kit, unchanged. Page `lang="en"`. Footer sentence word for word. Exact dependency versions.

**Never:** Fetch `content.json` in the browser. Google Fonts, CDNs or any network at page load. Copy in the HTML template. `design-system/tokens.css` (stale: loads Inter). Edits under `design-system/` or `docs/`. Sections other than the footer (stories 2–6).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Slot filled | template `{{footer}}`, content has `footer` | the string in the HTML | — |
| Nested key | `{{badge.fictional}}` | value of `content.badge.fictional` | — |
| Markup in a value | value contains `<` or `&` | escaped (`&lt;`, `&amp;`) | — |
| Missing key | slot with no matching key | no output written | build exits non-zero naming the key |
| Unused key | key never used in the template | page builds | none (later stories use them) |

**Decisions:**
- `dist/` is committed: the repo is the offline demo copy, opened from disk with no Node on the demo laptop.
- Placeholders are bracketed labels padded to the real length, e.g. "[How it works, step 1: about eight words]", so nobody mistakes them for final copy.

</frozen-after-approval>

## Code Map

- `design-system/assets/Code/karma-tailwind-v4-theme.css` -- the `@theme` and both `@font-face` rules; fonts expected beside the compiled CSS (`./Geologica-Sharp-Variable.woff2`). Import it; do not edit.
- `design-system/fonts/*.woff2` -- copy into `dist/` beside `styles.css`.
- `docs/karma-logo-kit.zip` -- `svg/karma-lockup-solid.svg` (footer, header), `svg/karma-lockup-reversed.svg`, `svg/karma-lockup.svg` (closing band), `svg/karma-icon.svg` (favicon). Extract once into `src/logos/`.
- `design-system/components/Footer/README.md` -- footer recipe: `border-t border-line bg-surface`, inner `mx-auto max-w-content px-5 py-4 text-small text-ink-secondary`. DESIGN.md adds the solid lockup and a divider before the sentence; column 1280px.
- `.gitignore` -- add `node_modules/`.
- `CLAUDE.md` -- "Commands" section says to list commands when code lands.

## Tasks & Acceptance

**Execution:**
- [x] `package.json` -- `"type": "module"`; devDependencies `tailwindcss` and `@tailwindcss/cli` pinned to `4.3.3`; scripts `build`, `test` -- one command builds the page.
- [x] `scripts/build.mjs` -- read `src/content.json`, fill `{{dotted.key}}` slots in `src/index.html` with escaped values, fail on a missing key, write `dist/index.html`; run the Tailwind CLI on `src/styles.css` to `dist/styles.css`; copy fonts and logos into `dist/` -- one entry point, no other runtime deps.
- [x] `scripts/fill.mjs` + `scripts/fill.test.mjs` -- the slot-filling function and `node --test` cases for every I/O matrix row.
- [x] `src/content.json` -- `meta.title`, `meta.description`, all fixed strings from `page-sections.md` as real text, and any other copy as bracketed placeholders.
- [x] `src/index.html` -- document shell (charset, viewport, title, favicon, `styles.css`), an empty `<main>`, the footer.
- [x] `src/styles.css` -- `@import "tailwindcss"`, the theme, `@source` on `src/index.html`; body `bg-page text-ink font-sans`.
- [x] `src/logos/` -- the four SVGs from the kit, byte-identical.
- [x] `.gitignore`, `CLAUDE.md` -- ignore `node_modules/` (keep `dist/` tracked); list install, build and test commands.

**Acceptance Criteria:**
- Given a fresh clone, when `npm install` then `npm run build` run, then `dist/index.html` opens from disk with Wi-Fi off and shows Geologica text and the footer sentence word for word.
- Given the built page, when its HTML and CSS are searched, then no `http://` or `https://` resource URL and no `fonts.googleapis` appear.
- Given `src/index.html`, when searched for visible text outside `{{…}}` slots, then none is found.

## Implementation Notes

- Tailwind's `/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */` banner is kept, with only its URL removed in `build.mjs`, so the `https?://` grep stays clean.
- `@import "tailwindcss" source(none)` plus `@source "./index.html"` stops Tailwind scanning the whole repo.
- The theme's font `url(./…)` is not rebased by the CLI, so the fonts load from beside `dist/styles.css` as intended.
- `src/styles.css` adds two landing tokens from DESIGN.md in its own `@theme`: `--container-landing: 1280px` (`max-w-landing`) and `--spacing-side` (`px-side`). The footer uses them instead of the recipe's `max-w-content px-5` so it lines up with later sections.
- The footer lockup is decorative (`alt=""`), since the sentence beside it starts with "Karma"; `logo.alt` stays in content.json for the header.
- `npm audit` reports a high-severity `braces` advisory via `@tailwindcss/cli` -> `@parcel/watcher` (dev-only, watch mode); left as is because the versions are pinned.
- Matrix audit: added `scripts/build.test.mjs`, which runs the real build in a temp copy with `footer` removed and checks exit code, message and that no `dist/` is written; `npm test` now runs both files (7 pass).

## Spec Change Log

## Review Triage Log

Pass 1 (blind-hunter B, edge-case-hunter E, verification-gap V). The review diff left out `package-lock.json`, `dist/styles.css`, fonts and SVGs on purpose.

| # | Finding | Verdict | Evidence | Route |
| --- | --- | --- | --- | --- |
| B1 | `dist/` incomplete (only index.html) | false | `dist/` holds all 8 files; the diff excluded binaries and minified CSS | rejected |
| B2 | `src/logos/` missing | false | four SVGs present in `src/logos/`, excluded from the diff | rejected |
| B3 | `package-lock.json` not in change | false | present on disk, untracked until commit; excluded from the diff | rejected |
| B4, E7 | no `engines` field | low | `Object.hasOwn` and `node --test` with a file list need a modern Node; an old laptop gets cryptic errors | patch |
| B5, E3 | Tailwind failure after `dist/` is wiped | medium | `build.mjs` removes `dist/` before Tailwind runs; without `npm install` the committed demo copy is left with only `index.html` | patch |
| B6, E6 | missing CLI gives an unclear failure | low | spawn of a missing `node_modules` path prints a module error, then "Tailwind failed" with no cause | patch |
| B7, E5, V1 | success path untested: URL strip, font and logo copy | medium | `build.test.mjs` stops at fill; a banner change or a font filter typo ships with exit 0 | patch |
| B8 | build test never had a `dist/` to preserve | low | real repo has a committed `dist/`; the test cannot show it survives a failed build | patch |
| B9, E2 | empty or whitespace value renders blank | medium | verified: `fill('<p>{{a}}</p>', {a:'  '})` returns `<p>  </p>`; product rules forbid blanks | patch |
| B10 | Verification text says only fill tests | — | fix is to edit this build's spec | rejected |
| B11 | no focus ring in base styles | false | this story ships no focusable element; stories 2–6 add controls and their ring | rejected |
| B12 | 14px floor unconfirmed | false | theme line 124: `--text-small: 14px` | rejected |
| B13 | footer logo alt doubles "Karma" for screen readers | low | `alt="Karma"` precedes a sentence starting "Karma" | patch |
| B14, E4 | fonts copied by pattern, logos unchecked | low | a stray or missing font passes silently | patch |
| E1, V2 | malformed slot ships as raw `{{…}}` | medium | verified: `{{nav.how-it}}` survives `fill` and the build succeeds | patch |
| V3 | committed `dist/` can go stale | low | an edit to `src/` committed without a rebuild leaves the demo copy old; covered by comparing a fresh build with `dist/index.html` in the success-path test | patch |

## Verification

**Commands:**
- `npm test` -- expected: all fill tests pass.
- `npm run build` -- expected: exit 0; `dist/` holds `index.html`, `styles.css`, two `.woff2`, four `.svg`.
- `grep -E "https?://|googleapis" dist/index.html dist/styles.css` -- expected: no matches.

**Manual checks (if no CLI):**
- Open `dist/index.html` from disk: page ground `#F6F6F6`, white footer with hairline top, solid lockup, sentence in Geologica, 14px.
