# Source chip

A small button that names the exact document and page a value came from, and opens it.

## Two forms

| Form | Shows | Use |
| --- | --- | --- |
| Full | document icon, "02 Pathology report.pdf · p. 1" | the criterion matrix, timeline, evidence panel, where the document name helps |
| Compact | "02 · p. 1" | the case card and any value with 3 or more sources |

The number is the document's number in the **Documents table**, so "02" always means the same file. The full name is in `title` and in the accessible name.

## Recipe

```html
<button type="button" title="02 Pathology report.pdf, page 1" aria-label="Open 02 Pathology report.pdf, page 1"
  class="inline-flex h-6 max-w-full items-center gap-1 rounded-md border px-1.5 text-small tabular-nums border-line-strong bg-surface-sunken text-ink-secondary hover:border-control hover:bg-surface hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
  <!-- full form only: 16px document icon -->
  <span class="truncate">02 Pathology report.pdf</span><span class="shrink-0 whitespace-nowrap">· p. 1</span>
</button>
```

Selected (its source is open in the evidence panel): swap the rest classes for `border-selected-line bg-selected-tint text-ink` and set `aria-pressed="true"`.

## Rules

- Every extracted value keeps its chips. Sources can be compact or grouped (see **Source group**), never hidden.
- How many chips to show: full form 1–2, compact 3–4, a source group from 5. In the case card, compact from the first chip.
- A long name truncates; the page number never does.
- 24px tall: the minimum target size for WCAG 2.2. Keep 4px between chips (`gap-1`).
- Clicking opens the evidence panel on that source (or the document at that page where there is no criterion).

## You provide

The document number, file name and page for each source.
