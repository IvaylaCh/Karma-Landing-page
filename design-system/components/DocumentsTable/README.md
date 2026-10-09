# Documents table

The list of the case's documents, numbered in the order they were added; the numbers are the ones every compact source chip uses.

## Columns

`#` (01, 02 …) · Document (icon + file name, opens the document) · Pages · Values cited (how many values on the case card cite it).

## Recipe

- Container: `overflow-hidden rounded-2xl border border-line bg-surface`.
- Head: `bg-surface-sunken text-small font-semibold text-ink-secondary`, cells `px-4 py-2.5`.
- Rows: `divide-y divide-line`, cells `px-4 py-3`, `hover:bg-page`. Numbers right-aligned with `tabular-nums`.

## Rules

- Numbers never change once given, even if a document is removed (its number is retired, not reused).
- File names show as uploaded, including the extension.
