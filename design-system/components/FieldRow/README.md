# Field row

One line of the case card: a label, the value exactly as the documents give it, and its sources; or "not in the documents".

## Anatomy

- Label: `text-small font-medium text-ink-secondary`, English, sentence case ("Histology", "Bilirubin, total").
- Value: `text-body text-ink`, verbatim, in the document's language, inside an element with `lang="bg"` (or the document's language) so screen readers and fonts treat it as Bulgarian.
- Sources: compact chips under the value (`mt-1.5 flex flex-wrap gap-1`), a source group from 5 sources.
- Layout: `grid grid-cols-[10rem_1fr] gap-x-4 py-3`, rows divided by `border-line`.

## The missing value

The value cell reads **not in the documents**, with the dashed-ring icon of the not found state, in `text-state-not-found-ink`. Never a blank cell, never "N/A", "—", "unknown" or "none".

## Rules

- Keep the document's units, decimal separator and punctuation ("41 µmol/L (реф. 3–21)", "3.1 × 10⁹/L"). Don't convert or round.
- Long values wrap; they are never truncated, because a truncated value is an altered value.
- A value without a source is not shown. A missing value has no source, so it shows no chips.

## You provide

`label`, `value` (or nothing, for the missing variant), `lang`, and the list of sources.
