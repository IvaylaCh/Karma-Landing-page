# Source group

One chip that stands for many sources ("8 sources in 5 documents") and opens in place, so a value with eight citations stays one line tall.

## When to use

- A value with 5 or more sources.
- Any tight cell (a table column, a site-mode row) whatever the count.

## Behaviour

- Collapsed: documents icon, "8 sources", "in 5 documents", a chevron. Its accessible name lists every source ("8 sources in 5 documents: 01 p. 1, 01 p. 2 …").
- One click expands it in place: the compact chips follow on the same line and wrap. No popover, no new page, nothing to dismiss.
- Expanded state is remembered per value until the case is closed.
- `aria-expanded` on the button; the chips stay focusable in reading order.

## Recipe

```html
<button type="button" aria-expanded="false" aria-label="8 sources in 5 documents: 01 p. 1, …"
  class="inline-flex h-6 max-w-full items-center gap-1 rounded-md border px-1.5 text-small tabular-nums border-line-strong bg-surface font-medium text-ink hover:border-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
  <!-- 16px documents icon --> <span>8 sources</span>
  <span class="font-normal text-ink-secondary">in 5 documents</span> <!-- chevron, rotate-180 when open -->
</button>
```

## Rules

- The count is always visible, so a reader knows how much evidence sits behind the value before opening it.
- Never group a single source.
