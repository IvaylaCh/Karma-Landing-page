---
title: 'Header and main section'
type: 'feature'
created: '2026-10-09'
status: 'done'
baseline_commit: '36afe467530faba5f3a5c7b4d3d60a6526cb0348'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/specs/spec-karma-landing-page/SPEC.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-karma-landing-page-2026-10-09/DESIGN.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-karma-landing-page-2026-10-09/EXPERIENCE.md'
  - '{project-root}/CLAUDE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The page shell has no top: no header, no headline, no way into the demo, and none of the brand's one loud place.

**Approach:** Add the dark main section (`#top`) at the start of `<main>`: the floating light header bar inside it, the tagline as a two-line headline, the support line and "Try the demo", over board B's dot light with its slow sweep, built in CSS only.

## Boundaries & Constraints

**Always:** Board A for layout, board B for the dot light; grain off. DESIGN.md and EXPERIENCE.md win over either board. Text and dot light on separate layers; text never sits on visible dots; where they would meet, the light gives way. Only the dot light moves; the sweep stops and hides under `prefers-reduced-motion: reduce`. Dots `aria-hidden`, `pointer-events: none`. All visible and accessible text (including `aria-label`s) from `content.json`. Controls are `<a href>` 44px tall or more, with the 2px `accent` focus ring 2px off. Header sheds by priority: descriptor below 900px, "How it works" below 600px, the arrow below 420px; "Try the demo" always stays. Below 1024px the light becomes a low, wide band under the button.

**Never:** JavaScript for the light. Images, canvas or SVG files for the dots. Board A's swirl, corner glows or cross-fade. `xmlns` or any `http(s)` string in the page (the build stops on it). A sticky or fixed header. Sections after the main section (stories 3–6).

</frozen-after-approval>

## Code Map

- `src/index.html` -- add `<section id="top">` as the first child of `<main>`; footer stays as is.
- `src/content.json` -- existing keys: `action`, `nav.howItWorks`, `tagline`, `header.descriptor`, `hero.support`, `logo.alt`. Add `nav.label` (the nav's `aria-label`) and the headline's two lines as their own keys (the template cannot hold a `<br>` inside a value).
- `src/styles.css` -- add landing styles here (the theme file stays untouched); `brand-*` colours and `text-hero` come from the theme.
- `src/logos/karma-lockup-solid.svg` -- header logo, 28px tall, alt from `logo.alt`.
- Board A header (canvas `Main.dc.html`, lines 59–66): bar `min-height 68px`, padding `10px 12px 10px 24px`, radius 28px, 1px white edge at 70%, gradient `page` 96% → `ice` 94%, inner top highlight, shadow `0 14px 36px` black 40%, `backdrop-filter: blur(14px)`; 1px `cloud` divider 24px tall; descriptor in `label` caps `ink-secondary`; "How it works" white, 1px `pewter` border, chevron-down; "Try the demo" `action` fill with arrow; controls 46px, radius 16px, `body` semibold. Section wrapper: max 1280px, padding `24px clamp(20px,5vw,64px) 0`, main section min-height 900px.
- Board A main section (lines 68–70): h1 `text-hero` scaled `clamp(44px, 6.6vw, 96px)`, `margin-top 68px`; support line 20/30, max-width 460px, 24px below; button 52px, padding 0 26px, radius 10px, `brand-action` fill, white on hover, 36px below.
- Board B dot light (canvas `hero-corner.dc.html`): five grids on a 10px pitch, radii 1.1/1.7/2.4/3.0/3.5px in `brand-dot-1`…`brand-dot-5` (outer to core), each with a smaller radial mask; a sixth sweep layer of 2.4px brighter dots crossing from −15% to 115% of the width, eased, about 7 s of travel in an 8.5 s cycle; a `brand-glow` radial glow at about 70% behind the dots. Anchored to the bottom edge, about the right two-thirds, strongest in the lower 40%, fading upward.
- Icons: chevron-down from `design-system/assets/Icons/chevron-down.svg`; the arrow is board A's path `M4 10h11M10.5 5.5L15 10l-4.5 4.5`. Inline, `stroke="currentColor"`, 1.6 stroke, `aria-hidden`, no `xmlns`.

## Tasks & Acceptance

**Execution:**
- [x] `src/content.json` -- add `nav.label` and the two headline-line keys -- every string comes from content.
- [x] `src/index.html` -- the main section: wrapper, header bar (logo, divider, descriptor, nav with both links), h1, support line, "Try the demo" (`href="#demo"`), and an `aria-hidden` dot-light layer as a sibling of the text, not behind it in the same box.
- [x] `src/styles.css` -- header bar, buttons, focus ring, the dot light (five layers, glow, sweep keyframes), the shedding breakpoints, the below-1024px band and the reduced-motion rule.
- [x] `dist/` -- rebuild and commit with the source.

**Acceptance Criteria:**
- Given a 1440px window, when the page loads, then the header floats as a rounded light bar inside the dark section, the headline reads in two lines, and the dots fill about the right two-thirds from the bottom without touching any text.
- Given widths of 900, 600 and 420px, when the window narrows past each, then the descriptor, then "How it works", then the arrow disappear, and "Try the demo" stays.
- Given a 360px window, then the light is a low, wide band under the button, there is no horizontal scroll, and the headline wraps at 44px.
- Given `prefers-reduced-motion: reduce`, then the sweep is gone and nothing on the page moves.
- Given keyboard focus on each link, then a 2px `accent` ring shows 2px outside it.
- Given "How it works" is activated, then the page jumps to `#how` (the target arrives in story 3; the link must not be inert).

## Implementation Notes

## Spec Change Log

## Review Triage Log

Pass 1 (blind-hunter B, edge-case-hunter E, verification-gap V). The review diff left out the minified `dist/styles.css` on purpose.

| # | Finding | Verdict | Evidence | Route |
| --- | --- | --- | --- | --- |
| V1 | committed `dist/styles.css` never compared with a fresh build | medium | the success test compares only `index.html`; a CSS-only edit committed without a rebuild passes | patch |
| B1, E1, E7 | `#how` and `#demo` have no target | false | the frozen AC says the target arrives in story 3 (and `#demo` in story 5); the links are real anchors | rejected |
| V2, E2 | nothing checks that in-page anchors resolve | medium | the asset check now skips `#` links; once stories 3–5 land, a mistyped id would pass | defer (the check fails until stories 3 and 5 add targets; story 7 runs the whole-page check) |
| B2 | placeholder copy ships | false | bracketed placeholders are the approved phase 1 decision; phase 2 (story 8) replaces them | rejected |
| B3, E3 | headline lines duplicate `tagline` | low | `hero.titleLine1/2` repeat `tagline`; an edit to one drifts from the other silently | patch (test that they match) |
| B4 | no banner landmark; vague nav label | low | `<header>` inside `<section>` is not exposed as banner; "Page" reads as "Page navigation" | patch |
| B5 | pure black and raw white in header shadow and edge | low | `rgb(0 0 0 / 0.4)` is outside the palette; CLAUDE.md lists the only colours | patch (use `carbon` and `white`) |
| B6 | sweep no brighter than the core | low | sweep uses `brand-dot-5`, as the core does; brighter over every other layer | rejected; the user judges the light at the checkpoint |
| B7 | light shorter than board B | low | the light fills the section below the button (about the lower third at 1440px), not up beside the headline; covers the right two-thirds of the width as the AC asks | rejected; raised with the user at the checkpoint |
| B8 | headline line height not from the token | false | DESIGN.md sets `lineHeight: '1.06'`; the token's 102/96 is 1.0625 | rejected |
| B9 | task boxes unticked, story file untracked | — | bookkeeping, done in step 3 and step 5 | rejected (orchestrator) |
| B10 | built CSS missing from the review diff | false | excluded on purpose as minified output; V1 adds the comparison test | rejected |
| B11 | chevron suggests a menu | false | board A's choice, approved by the user | rejected |
| E4 | header bar has no background without `color-mix` | low | the compiled CSS wraps the gradient in `@supports (color: color-mix(...))`; without support the bar is transparent and its ink text sits on carbon | patch (solid `page` fallback first) |
| E5 | media range syntax unsupported in old Safari | false | the compiled CSS uses `min-width` and `not all and (min-width…)` | rejected |
| E6 | header wraps between 900 and 1024px | false | screenshot at 920px: one row with the placeholder; real copy is phase 2 | rejected |

## Design Notes

The light is CSS backgrounds: each layer a `radial-gradient` dot tiled at 10px, masked by its own `radial-gradient` ellipse anchored low on the right. The sweep layer is masked by a narrow moving `linear-gradient` band animated on `mask-position`. Keeping the layer a positioned sibling of the text column, with the column on top, makes "text never on the dots" structural; the masks fade the light to nothing in the top 60%, where the headline sits.

## Verification

**Commands:**
- `npm run build` -- expected: exit 0 (the build's own URL check passes).
- `npm test` -- expected: all pass, including the committed-`dist/` comparison.

**Manual checks (if no CLI):**
- Screenshots of `dist/index.html` at 1440, 1024, 600, 420 and 360px wide, and at 1440 with reduced motion: compare against board A's layout and board B's light; no dot under any text.
