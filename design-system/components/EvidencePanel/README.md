# Evidence panel

The right-side panel that shows why a criterion has its state: the reasoning in one line, the trial's own wording, every source as a tab, the verbatim quote and the page image with the quote highlighted.

## Anatomy, top to bottom

1. Context line: "Inclusion · criterion 1 of 22" (`text-small text-ink-secondary`).
2. Criterion: `text-heading`.
3. State pill and, when there are several, the source count ("2 sources").
4. **Why**: one or two plain sentences that point at the documents. No verdict words.
5. **Trial wording:** the criterion exactly as the trial registers it, in quotes, `text-ink-secondary`.
6. **Sources**: tabs, one per source, equal width, each with its number badge, file name and page. The counter "1 of 2" sits on the right.
7. The quote: `text-quote` (16/26), verbatim, `lang="bg"`, highlighted with `bg-evidence-tint box-decoration-clone`.
8. The page image, scaled to the panel's width and cropped around the quote, with the quote boxed in `evidence-mark` fill (with `mix-blend-multiply`, the highlighter technique: the scan's text stays visible through it) and a 2px `evidence-line` outline; a footer with the file, page and "Next source →".

## Making the second source noticeable

- The inactive tab has a visible `border-control` edge and the same size as the active one, so it reads as a peer, not as a disabled tab.
- Number badges ("1", "2") on every tab, and the "2 sources" note next to the state pill.
- "Next source →" at the foot of the page image.

## Recipe

- Panel: `w-panel border-l border-line bg-surface shadow-panel`, full height, sticky to the right edge, its own scroll.
- Active tab: `border-selected-line bg-selected-tint ring-1 ring-inset ring-selected-line`; inactive: `border-control bg-surface hover:border-control-hover hover:bg-page`.

## Keyboard and focus

- Opening moves focus to the criterion heading; Esc or the close button returns focus to the row that opened it.
- Tabs follow the ARIA tabs pattern: arrow keys move between sources, Tab moves into the quote.

## You provide

Criterion text, section, index and total, state, the "why" sentence, the trial wording, and for each source: file, page, quote, page image and the quote's box on that image.
