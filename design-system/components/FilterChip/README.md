# Filter chip

A toggle above the criterion matrix that shows only the rows in one state, with the count beside each state.

## Recipe

```html
<button type="button" aria-pressed="false"
  class="inline-flex h-8 items-center gap-1.5 rounded-full border border-control bg-surface px-3 text-small font-medium text-ink
         hover:border-control-hover hover:bg-page
         aria-pressed:border-selected-line aria-pressed:bg-selected-tint aria-pressed:ring-1 aria-pressed:ring-inset aria-pressed:ring-selected-line
         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
  <!-- 16px state icon --><span class="text-state-met-ink">met</span>
  <span class="font-semibold tabular-nums text-ink-secondary">6</span>
</button>
```

## Rules

- One chip per state plus "All". Single choice: pressing one releases the others; pressing the pressed one returns to "All".
- The state word and icon follow the State pill rules. A chip with 0 rows stays enabled and leads to the empty state.
- The pressed state is shown by border, ring and fill together, never by colour alone.
