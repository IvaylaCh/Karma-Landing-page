---
name: Karma landing page
description: The one public page for Karma. Inherits the Karma design system; this file records only the landing page's delta.
status: final
updated: 2026-10-09
sources:
  - ../../../specs/spec-karma-landing-page/SPEC.md
  - ../../../specs/spec-karma-landing-page/page-sections.md
  - ../../../../design-system/README.md
  - ../../../../design-system/tokens.json
colors:
  brand-ground: '#131313'
  brand-glow: '#132774'
  brand-ink: '#E7E7E7'
  brand-action: '#E7E7E7'
  brand-action-ink: '#131313'
  brand-dot-1: '#2443B8'
  brand-dot-2: '#4965EB'
  brand-dot-3: '#818FF2'
  brand-dot-4: '#B2B9F7'
  brand-dot-5: '#E7E7E7'
  header-tint: '#EFF1FE'
typography:
  hero:
    fontFamily: Geologica
    fontSize: clamp(44px, 6.6vw, 96px)
    fontWeight: '700'
    lineHeight: '1.06'
    letterSpacing: -0.035em
  section-title:
    fontFamily: Geologica
    fontSize: clamp(30px, 4vw, 40px)
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  lead:
    fontFamily: Geologica
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 30px
rounded:
  header-bar: 28px
  header-control: 16px
  hero-button: 10px
spacing:
  content-max: 1280px
  side: clamp(20px, 5vw, 64px)
  section-y: clamp(56px, 8vw, 104px)
  dot-pitch: 10px
components:
  header-bar:
    background: 'linear-gradient(180deg, page at 96% opacity, {colors.header-tint} at 94% opacity)'
    rounded: '{rounded.header-bar}'
    minHeight: 68px
    controlHeight: 46px
  hero-button:
    background: '{colors.brand-action}'
    textColor: '{colors.brand-action-ink}'
    height: 52px
    rounded: '{rounded.hero-button}'
  closing-button:
    background: action
    textColor: action-ink
    height: 52px
    rounded: '{rounded.hero-button}'
  dot-light:
    layers: 5
    dotRadii: 1.1px, 1.7px, 2.4px, 3.0px, 3.5px
    pitch: '{spacing.dot-pitch}'
---

# Karma landing page — Design

Inherits the Karma design system in `design-system/` (tokens, components, Do's and don'ts). Token names without a value here (`action`, `line`, `page`, `state-*`, `fictional-*`) are the system's. Layout base: board A of the [design canvas](https://claude.ai/artifact/DSHAWHc1qm5mNFJskRzNK7); main-section background: board B. This spine wins on conflict with either board.

## Brand & Style

Calm, exact, accountable: a well-set clinical document, not a product pitch. Near-black ink on white, one family of blues, hairline rules. The evidence is the loudest thing; colour is spent only on meaning. The dark main section is the one loud place, and the dot light is the only decoration, a nod to Boruto's Karma.

## Colors

- The main section uses only the `brand-*` tokens above; every other section is light (`surface`, `page`) and uses the system's semantic tokens.
- `brand-glow` sits behind the dot light as a soft radial glow, about 70% opacity, never behind text.
- `header-tint` (the system's `ice`) shades the bottom of the floating header bar; it is a ground, never text.
- Sections alternate `surface` and `page` grounds with `line` hairlines between them, as in board A.
- Green, red and amber appear only inside state pills and icons; violet only on the Fictional patient badge.

## Typography

- `{typography.hero}` is the tagline as headline, two lines, on the dark ground only.
- `{typography.section-title}` for each section's h2; above it a `label` eyebrow numbered "01 / How it works".
- `{typography.lead}` for the support line under the headline and the lead beside the demo card.
- Everything else uses the system's `body`, `small`, `label`, `quote` and `trial-id` styles. 14px floor.

## Layout & Spacing

- Content column `{spacing.content-max}` (narrower than the app's 1400px, for reading line length), side padding `{spacing.side}`, section padding `{spacing.section-y}`.
- Main section: at least 900px tall on desktop. One left-aligned column; the dot light is a separate layer anchored to the bottom edge, covering about the right two-thirds, strongest in the lower 40% and fading upward.
- How it works: an ordered list of four rows with `line` hairlines; number and title on the left, one sentence on the right; rows wrap at about 300px.
- The four states: the state legend, then a criteria card (`radius-2xl`, `line` border) holding a 5-row table: section, criterion, state, evidence, document and page.
- The demo: text column at least 340px, card up to 576px to its right; below tablet width the card drops under at full width.
- What Karma does not do: three columns, each topped by a 1px `ink` rule; they stack below about 260px each.
- Closing band: centred; dotted lockup 72px tall, tagline as h2, button.
- Phone (about 360px): one column in the same order; side padding 20px; headline 44px and wrapping.

## Elevation & Depth

- Flat, as in the system: white cards on `page` with a `line` border.
- The header bar is the one raised element: a 1px white edge at 70% opacity, an inner top highlight, a 0 14px 36px shadow at 40% black, and a 14px backdrop blur over the dark ground.

## Shapes

- Header bar `{rounded.header-bar}`; its two controls `{rounded.header-control}`.
- Main and closing buttons `{rounded.hero-button}`; card buttons keep the system's `radius-lg`.
- Cards `radius-2xl`, badges and chips `radius-md`, pills `radius-full`, as in the system.

## Components

- **Header bar.** Solid lockup 28px tall; a 1px `line-strong` divider; the descriptor in `label` caps; then, right-aligned, "How it works" (secondary: white fill, `control` border, down chevron) and "Try the demo" (`action` fill, arrow). Controls 46px tall.
- **Dot light.** Board B's: five dot grids on one 10px pitch, stacked; each layer has a bigger, paler dot (`brand-dot-1` outer to `brand-dot-5` core) and a smaller radial mask, so dots grow and pale toward the core. One extra layer carries the sweep of brighter dots. `aria-hidden`. [ASSUMPTION] Board B's grain lever is off: the notes make the dot light the only decoration.
- **Main-section button.** `{components.hero-button}`: mist fill, carbon text, 52px; white fill on hover.
- **Closing button.** `{components.closing-button}`: `action` fill, `action-hover` (navy) on hover, 52px.
- **Criteria card.** Fictional patient badge and Frozen demo badge, the trial line and the four count pills, then the table scrolling sideways in its own focusable region (min-width 900px). State pills are the system's `StatePill`.
- **Demo card.** The system's `DemoCaseCard`: badges first, name with chip, diagnosis verbatim (`lang="bg"`), KRAS, PD-L1, ECOG each with a chip, "Find trials" (primary) and "See the documents" (secondary), both 44px.
- **Footer.** The system's `Footer`, preceded by the solid lockup and a divider.

## Do's and Don'ts

- Do keep text and dot light on separate layers; if they meet, the light gives way.
- Don't use board A's swirl image, its two corner glows or its 20 s cross-fade.
- Don't add glow, sparkles, stock photos, illustrations, green ticks, big percentages, stars, traffic lights or a verdict banner.
- Don't place the dotted lockup or any text over the dots; use the `-reversed` lockups on the dark ground.
- Don't load fonts from Google Fonts in the built page (board A does, because the canvas requires it); use `design-system/fonts/`.
