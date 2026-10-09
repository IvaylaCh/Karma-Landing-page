# CLAUDE.md

Instructions for Claude when it works in this repo. Short on purpose: each line is here because getting it wrong would cost something.

## What this project is

Karma helps hospital research coordinators find recruiting clinical trials for one patient. It reads the patient's documents, builds a case card where every value cites its document and page, ranks recruiting trials from ClinicalTrials.gov, and shows each trial's criteria in one of four states with the evidence. It never decides whether a patient can join a trial: it shows its work and a clinician decides.

Tagline: "Every criterion cited. Nothing inferred."

Built for the Crossroads AI hackathon, Sofia, 10–11 October 2026. The demo runs on frozen data about a fictional patient. Never add real patient documents to this repo.

## How to work with me

- Explain every step in simple language and say why each function, method or pattern is used. Do not skip parts.
- Teach the architecture and the design patterns first, and the syntax second.
- Keep replies short and plain. No emojis.

## Commands

None yet. When the app code lands, list the install, run, test and lint commands here.

## Product rules (never bend)

- There are exactly four criterion states, lowercase, with fixed meanings: **met** (the documents support it), **not met** (the documents contradict it), **not found** (the documents don't contain the information), **needs a clinician** (a judgment call Karma never makes). Never add, merge or rename one.
- A state is always colour, icon and word together (circle, square, dashed ring, diamond). Never a colour-only dot, a tinted row or an icon-only column.
- No verdict words in labels, tooltips, alt text, examples, file names or exports. Never write: eligible, ineligible, fits, qualifies, or "match" as a verdict. Also avoid: passes, fails, suitable, candidate, approved, excluded (as a verdict on the patient), recommended. Say "match profile", "best-matching cohort", "the documents support it".
- Every extracted value keeps its source chip: the document and the page. Never hide sources behind hover only.
- A missing value reads "not in the documents". Never a blank, "N/A", "—", "unknown", "none" or "0".
- The interface is English, in sentence case. Values from documents stay verbatim, in their own language (often Bulgarian), inside an element with `lang="bg"` (or the document's language). Never translate, round, convert units or tidy a document's wording.
- Explanations point at the documents, not at the patient: "The labs give total bilirubin 41 µmol/L against a range of 3–21."
- Counts go number first: "6 met · 0 not met · 9 not found · 7 need a clinician", and "1 needs a clinician" for one.
- Formats: dates "14 Jan 2026", pages "p. 1", documents "02 Pathology report.pdf", quotes in “…”.
- Show **Fictional patient** next to every demo patient's name and **Frozen demo** whenever frozen data is on screen. Never shrink, hide or dismiss them. Violet is for the Fictional patient badge and nothing else.
- Every screen ends with the footer sentence, word for word: "Karma organizes and cites documents. It does not interpret, recommend or decide."
- Ranks are not scores: no percentages, stars or bars next to a rank.
- No exclamation marks, no emoji, no claims about intelligence.
- One primary button per view. On the landing page the single page-level action is "Try the demo": the header, the hero and the closing band repeat it, and it scrolls to the demo card. The card's own button, "Find trials", starts the demo (design system, DemoCaseCard).

## Look

- Font: Geologica, sharp. Overpass Mono only for NCT IDs and compact source-chip numbers; nothing else is monospace. Self-hosted, the sharpness axis is fixed at 100 inside the file; from Google Fonts, set `font-variation-settings: 'SHRP' 100`.
- 14px is the text floor, projector included. The demo is presented at 125% browser zoom.
- The only colours are these. Brand: carbon `#131313`, navy `#132774`, cobalt `#2443B8`, accent `#4965EB`, periwinkle `#818FF2`, lavender `#B2B9F7`, mist `#E7E7E7`. Support: white `#FFFFFF`, page `#F6F6F6`, fog `#DCDCDC`, cloud `#BDBDBD`, pewter `#6E6E6E`, graphite `#4A4A4A`, ice `#EFF1FE`, highlight `#DBE0FC`.
- Colour is reserved for meaning. Green, red and amber belong to the states. Never use red for an error, green for "recruiting" or "done", amber for a warning, or blue for decoration. Errors are ink text with a 2px ink border and the slashed-circle icon.
- Blue text is cobalt (links) or navy (link hover). Blues stay out of fills behind text. The primary button is carbon with a navy hover.
- The work screens are light only. Dark appears only on brand surfaces (the landing page's main section, title slides): a soft dark ground with a light made of dots. Text sits on the plain ground, never on the dots.
- The focus ring is a solid 2px accent outline, 2px off the element, always visible.
- No emoji, illustrations, icon fonts or CDN. Self-host the fonts and inline the SVG icons: the offline demo copy has no Wi-Fi. (The landing page source on the design canvas loads Geologica from Google Fonts because the canvas allows nothing else. The app must not.)
- Target sizes in the app: source chips 24px tall (the WCAG 2.2 minimum), filter chips 32px, buttons and inputs 40px. The landing page's controls are 44px tall or more.
- Controls are real `<a href>` and `<button type="button">`, never a `div` with a click handler.

## Logo

- The logo is Twin. It has two drawings of one mark: dotted from 64px tall and up, solid below that.
- Files: `karma-lockup.svg` (light ground), `karma-lockup-reversed.svg` (dark ground), `karma-lockup-solid.svg` (light header, 28px tall), `karma-lockup-solid-reversed.svg` (dark header), `karma-icon.svg` (tab and app icon), `karma-mark-mono.svg` (one colour).
- Smallest sizes: dotted mark 64px tall, solid mark 16px, solid lockup 20px, the name alone 14px.
- Use the files. Never redraw, retype, recolour, stretch, rotate or outline the logo, and never add a shadow or a glow. Clear space on every side is the height of the "k".
- On dark, use the `-reversed` files on the plain ground, never over the dot light.
- In running text write Karma with a capital K. The old A, B and C logo directions are retired.

## Landing page

- The main section is dark, with the dot light. The header is a floating, rounded light bar with the solid lockup, a short descriptor, a "How it works" link and the one primary action, "Try the demo".
- Sections follow the rules above: how it works, the four states, the demo on the fictional patient, what Karma does not do, a closing band, and the footer sentence.

## Source of truth

The Karma design system (tokens, components and the full rules) is kept in Claude Design. This file is a summary of it. If this file and the design system disagree, the design system wins; tell the maintainer. Export `tokens.json` from the design system into the repo when the app starts, so the code and the design use the same values.

## Exclusion criteria

- On the landing page, never show "met" on an exclusion row. The one exclusion example is "needs a clinician", as in the design.
- In the app, keep the trial's own wording: rewriting an exclusion as a positive statement would be interpreting. Label the row "Exclusion" and add a line saying what the state means there, such as "The documents support this exclusion". Do this for every state, because a red "not met" on an exclusion reads the wrong way too.
