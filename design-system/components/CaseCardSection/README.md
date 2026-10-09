# Case card section

A titled group of field rows on the case card, with compact forms for sections the documents say little or nothing about.

## Sections, in this order

Patient · Diagnosis · Pathology · Stage · Markers · Surgery · Prior therapy · Labs · Imaging · Status

## Three forms

| Form | When | What it shows |
| --- | --- | --- |
| Full | every field has a value | one field row per field |
| Partly empty | some fields are missing | the found fields, then one row: "not in the documents: ALT, AST, LDH, eGFR" |
| Empty | no field has a value | one row: "not in the documents", the field count and names, and "Show fields" to expand to one row per field |

## Recipe

- Card: `rounded-2xl border border-line bg-surface p-5`.
- Section title: `text-label uppercase text-ink-secondary` (14px, the floor).
- Sections inside one card are divided by `border-t border-line-strong pt-5 mt-4`.

## Rules

- Never drop an empty section. Ten rows of "not in the documents" collapse into one row that still says so, and still names the fields.
- Missing fields go last in their section, in the order the section defines.
- Section titles stay English; the values below them stay in the document's language.
