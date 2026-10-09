---
name: Karma landing page
status: final
updated: 2026-10-09
sources:
  - ../../../specs/spec-karma-landing-page/SPEC.md
  - ../../../specs/spec-karma-landing-page/page-sections.md
  - ../../../../CLAUDE.md
  - ../../../../design-system/README.md
---

# Karma landing page — Experience

## Foundation

One static web page, plain HTML with the design system's Tailwind v4 theme, built from `content.json` by a small script. It must work offline and opened from a file. Desktop and projector first (1920×1080 at 125% zoom), down to 360px. UI system: the Karma design system in `design-system/`; this spine records only the page's behaviour. `DESIGN.md` owns the look.

## Information Architecture

One page, eight sections in this order. Anchors are the only navigation.

| # | Section | Anchor | Reached from |
| --- | --- | --- | --- |
| 1 | Header | — | always at the top of the main section |
| 2 | Main section | `#top` | page load |
| 3 | How it works | `#how` | header "How it works" |
| 4 | The four states | `#states` | scrolling |
| 5 | The demo | `#demo` | every "Try the demo" |
| 6 | What Karma does not do | `#limits` | scrolling |
| 7 | Closing band | — | scrolling |
| 8 | Footer | — | end of page |

"Find trials" and "See the documents" lead out of the page to the app; until it exists they link to a placeholder.

## Voice and Tone

Microcopy follows CLAUDE.md's product rules. Phase 1 text is placeholder of about the real length, except the fixed strings in `page-sections.md`.

| Do | Don't |
| --- | --- |
| "Try the demo" | "Get started!", "See the magic" |
| "The documents support it" | "Eligible", "qualifies", "match" as a verdict |
| "6 met · 0 not met · 9 not found · 7 need a clinician" | "68% match", stars, a score next to a rank |
| "not in the documents" | blank, "N/A", "—", "unknown" |

[ASSUMPTION] The support line and header descriptor "Clinical-trial matching…" stay as placeholders and are reviewed in phase 2: "matching" is not a verdict, but it is the first sentence under the tagline.

## Component Patterns

| Component | Behaviour |
| --- | --- |
| Header "How it works" | `<a href="#how">`; jumps to the section and moves focus to its heading. |
| Every "Try the demo" | `<a href="#demo">`; jumps to the demo section and moves focus to its heading. |
| "Find trials", "See the documents" | Real links to a placeholder target; never inert `div`s. |
| Criteria table | Its own scroll region (`role="region"`, `tabindex="0"`, labelled); scrolls sideways by keyboard and touch; the page never scrolls sideways. |
| Source chips | Visible on every cited value; on the landing page they do not open documents. [ASSUMPTION] |
| Badges | Fictional patient and Frozen demo never hide, shrink or truncate at any width. |

## State Patterns

The page has no loading, empty or error states: all content is built in at build time. A missing demo value reads "not in the documents".

## Interaction Primitives

- Hover and focus change colour only, plus the system's 2px `focus-ring` outline 2px off every focusable element.
- In-page jumps are instant under `prefers-reduced-motion: reduce`; [ASSUMPTION] smooth otherwise.
- Only the dot light moves: one slow sweep of brighter dots, about 8.5 s per pass. Nothing else moves: no scroll-in effects, no counters, nothing near the state pills or the criteria card. Why: decoration may move, information must not; motion beside a state reads as a status change, and fade-ins leave blank areas on a projector or in a screenshot.

## Accessibility Floor

- The dot light is `aria-hidden` and stops completely under `prefers-reduced-motion: reduce`.
- Headings: one h1 (the tagline), an h2 per section; the demo card's name is an h3.
- Verbatim Bulgarian values sit in `lang="bg"`.
- Controls are 44px tall or more; every control is a real `<a href>` or `<button type="button">`.
- State icons are `aria-hidden`; the state word is the text.

## Responsive & Platform

- Header sheds by priority: the descriptor below 900px, "How it works" below 600px, the arrow on "Try the demo" below 420px. "Try the demo" always stays.
- Below 1024px the dot light changes shape: a low, wide band under the button, not a tall strip stretched from percentages.
- Below tablet width the demo card drops under its heading at full width; the three "does not" columns stack.
- Reflow text, scroll data: the criteria table keeps its columns and scrolls in its box rather than squeezing under 14px or turning into cards.

## Key Flows

[ASSUMPTION] Protagonists not named by the user.

**Elena, hackathon judge, watching the projector in Sofia.**
1. The page opens at 125% zoom; the tagline reads from the back of the room.
2. The presenter scrolls through how it works and the four states.
3. **Climax:** the criteria card shows real state pills with Bulgarian quotes and page numbers; Elena sees every state cited.
4. "Try the demo" lands on the demo card; "Find trials" starts the demo.

**Petar, research coordinator, opening the link on a laptop after the event.**
1. He reads the tagline and the support line.
2. He opens "How it works" from the header.
3. **Climax:** the "does not" section tells him Karma never decides; the clinician does.
4. He presses "Try the demo" and reaches the fictional patient's card.
