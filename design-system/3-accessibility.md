# Accessibility checks

Every number on this page is measured from the tokens, not estimated. The work screens are light mode; the brand surfaces (landing page, title slides) add the two `brand-*` rows.

## How it was measured

- **Contrast**: WCAG 2 contrast ratio. Text needs 4.5:1; icons, control edges and focus rings need 3:1.
- **Projector model**: both colours pushed through a 10% black-level lift and 25% desaturation, a rough stand-in for a projector in a lit room. A pair at 4.5:1 on screen drops to about 3.3:1 under it; a pair at 7:1 keeps about 4.4:1. That is why the four state words aim for 7:1.
- **Colour blindness**: Machado, Oliveira and Fernandes (2009) simulation at full severity; differences in CAM02-UCS units, where about 10 is a clear difference and 20 or more is a strong one.
- **Greyscale**: CIE L* lightness, 0 black to 100 white.

## Text

| Pair | Use | Ratio | On the projector model | Needs |
| --- | --- | --- | --- | --- |
| `ink` on `surface` | Primary text | **18.58:1** | 6.74:1 | 4.5:1 |
| `ink` on `surface-sunken` | Primary text in table heads | **15.03:1** | 5.58:1 | 4.5:1 |
| `ink` on `evidence-tint` | Highlighted quote | **14.23:1** | 5.32:1 | 4.5:1 |
| `ink` on `evidence-mark` | The scan's text under the lavender mark | **9.89:1** | 3.90:1 | 4.5:1 |
| `ink-secondary` on `surface` | Labels, metadata | **8.86:1** | 4.96:1 | 4.5:1 |
| `ink-secondary` on `page` | Labels on the page ground | **8.20:1** | 4.63:1 | 4.5:1 |
| `ink-secondary` on `surface-sunken` | Table head labels | **7.17:1** | 4.11:1 | 4.5:1 |
| `ink-muted` on `surface` | Optional metadata (white only) | **5.10:1** | 3.62:1 | 4.5:1 |
| `ink-muted` on `surface-sunken` | Not allowed: below 4.5:1 | **4.12:1** | 2.99:1 | 4.5:1 |
| `action-ink` on `action` | Primary button | **18.58:1** | 6.74:1 | 4.5:1 |
| `action-ink` on `action-hover` | Primary button on hover (`navy`) | **13.38:1** | 5.98:1 | 4.5:1 |
| `link` on `surface` | Links, NCT IDs | **8.17:1** | 4.76:1 | 4.5:1 |
| `link` on `page` | Links on the page ground | **7.56:1** | 4.44:1 | 4.5:1 |
| `link` on `surface-sunken` | Links in table heads, now allowed | **6.61:1** | 3.94:1 | 4.5:1 |
| `link` on `ink` | Link against body text: below 3:1, so links in sentences are underlined | **2.27:1** | 1.42:1 | 3:1, or an underline |
| `brand-ink` on `brand-ground` | Text on the landing page and title slides | **15.03:1** | 5.58:1 | 4.5:1 |
| `brand-action-ink` on `brand-action` | The button on a brand surface | **15.03:1** | 5.58:1 | 4.5:1 |
| `fictional-ink` on `fictional-tint` | Fictional patient badge | **8.19:1** | 4.60:1 | 4.5:1 |
| `frozen-ink` on `frozen-tint` | Frozen demo badge | **9.45:1** | 4.93:1 | 4.5:1 |
| `state-met-ink` on `state-met-tint` | met word in its pill | **8.77:1** | 4.78:1 | 4.5:1 (target 7:1) |
| `state-not-met-ink` on `state-not-met-tint` | not met word in its pill | **9.16:1** | 4.86:1 | 4.5:1 (target 7:1) |
| `state-not-found-ink` on `state-not-found-tint` | not found word in its pill | **10.35:1** | 5.35:1 | 4.5:1 (target 7:1) |
| `state-clinician-ink` on `state-clinician-tint` | needs a clinician word in its pill | **8.75:1** | 4.86:1 | 4.5:1 (target 7:1) |

## Icons, edges and focus

| Pair | Use | Ratio | On the projector model | Needs |
| --- | --- | --- | --- | --- |
| `state-met-glyph` on `state-met-solid` | Check inside the met circle | **7.58:1** | 4.57:1 | 3:1 (we hold 4.5:1) |
| `state-not-met-glyph` on `state-not-met-solid` | Cross inside the not met square | **4.81:1** | 3.48:1 | 3:1 (we hold 4.5:1) |
| `state-clinician-glyph` on `state-clinician-solid` | "!" inside the diamond (today: white on amber, 2.15:1) | **8.97:1** | 3.99:1 | 3:1 (we hold 4.5:1) |
| `state-met-solid` on `surface` | met icon on white | **7.58:1** | 4.57:1 | 3:1 |
| `state-not-met-solid` on `surface` | not met icon on white | **4.81:1** | 3.48:1 | 3:1 |
| `state-not-found-solid` on `surface` | not found ring on white | **4.76:1** | 3.46:1 | 3:1 |
| `state-clinician-edge` on `surface` | needs a clinician edge on white | **7.09:1** | 4.41:1 | 3:1 |
| `control` on `surface` | Input and button edges | **5.10:1** | 3.62:1 | 3:1 |
| `control` on `page` | Input and button edges on the page ground | **4.72:1** | 3.37:1 | 3:1 |
| `focus-ring` on `surface` | Focus ring | **4.83:1** | 3.49:1 | 3:1 |
| `focus-ring` on `page` | Focus ring on the page ground | **4.47:1** | 3.26:1 | 3:1 |
| `focus-ring` on `surface-sunken` | Focus ring on grey | **3.91:1** | 2.89:1 | 3:1 |
| `selected-line` on `surface` | Edge of the selected chip, tab or row | **4.83:1** | 3.49:1 | 3:1 |

## Telling the four states apart

The icon colours alone, before shape, glyph and word are counted. Shapes then add a second cue (circle, square, dashed ring, diamond) that survives every condition below, and the word adds a third.

**Now**: met L* 36, not met L* 48, not found L* 48, needs a clinician L* 81

| Pair | Normal | Protanopia | Deuteranopia | Tritanopia | Projector | Greyscale gap (ΔL*) |
| --- | --- | --- | --- | --- | --- | --- |
| met / not met | 57 | 21 | 37 | 64 | 34 | 12 |
| met / not found | 21 | 16 | 15 | 15 | 12 | 13 |
| met / needs a clinician | 62 | 52 | 61 | 58 | 42 | 45 |
| not met / not found | 49 | 34 | 39 | 55 | 29 | 0 |
| not met / needs a clinician | 43 | 41 | 30 | 35 | 30 | 33 |
| not found / needs a clinician | 55 | 53 | 56 | 44 | 37 | 32 |

**Today's palette, for comparison**: met L* 55, not met L* 48, not found L* 48, needs a clinician L* 72

| Pair | Normal | Protanopia | Deuteranopia | Tritanopia | Projector | Greyscale gap (ΔL*) |
| --- | --- | --- | --- | --- | --- | --- |
| met / not met | 60 | 21 | 18 | 66 | 38 | 7 |
| met / not found | 28 | 25 | 20 | 14 | 18 | 7 |
| met / needs a clinician | 46 | 22 | 33 | 52 | 31 | 17 |
| not met / not found | 50 | 31 | 38 | 56 | 31 | 0 |
| not met / needs a clinician | 35 | 33 | 23 | 24 | 23 | 24 |
| not found / needs a clinician | 52 | 46 | 52 | 46 | 33 | 24 |

Weakest pairs by colour alone: **met / not found** (closer than before under colour blindness) and **not met / not found** (the same lightness, before and now). Both lean on form instead: not found is the only hollow, dashed icon and the only pill with a dashed border, which holds in greyscale, for every colour vision and on the projector.

What changed: met moved to a darker, bluer teal, so met and not met now differ in lightness and sit on opposite sides of the blue-yellow axis that red-green colour-blind viewers keep; the not met red moved slightly warmer to hold protanopia; needs a clinician moved to a light amber with a dark glyph and a dark edge, so it is the one light icon; not found became a hollow dashed ring.

## Sizes

- **Text floor 14px** everywhere, including pills, badges, chips and section labels (today's 12px labels move up).
- **Projector**: present at 125% browser zoom, which makes the floor 17.5px on screen and keeps the 1400px column inside a 1536 CSS px page.
- **Targets**: source chips are 24px tall (WCAG 2.2 minimum), filter chips 32px, buttons and inputs 40px.

## Other checks

- **Focus**: a solid 2px `focus-ring` outline 2px outside every focusable element (inset by 4px on full-height header links), at least 3.9:1 on every ground (it needs 3:1).
- **Motion on brand surfaces**: any movement in the light made of dots stops under `prefers-reduced-motion: reduce`, and the dots are `aria-hidden`.
- **Language**: verbatim values carry `lang="bg"` (or their language), so screen readers switch voice and fonts use the right forms.
- **Screen readers**: state and UI icons are `aria-hidden`; the state word is the text. Source chips name the full document and page ("Open 02 Pathology report.pdf, page 1"). The source group lists every source in its name. Evidence tabs follow the ARIA tabs pattern.
- **Motion**: skeletons pulse and spinners turn only under `motion-safe:`.
- **Colour is never alone**: every state has a word and a shape; links in sentences are underlined; pressed filter chips show a border and a ring as well as a tint; form errors use a 2px ink border, an icon and a sentence.
