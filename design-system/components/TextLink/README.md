# Text link

Links in the bright blue accent (`link`, an alias of `accent`): underlined inside sentences, plain where their place makes them obvious (NCT IDs, "Open the criterion matrix →").

## Recipes

- In a sentence: `text-link underline underline-offset-2 hover:text-link-hover` (the accent is only 2.3:1 against `ink`, so in running text the underline is what marks a link).
- NCT ID: `font-mono text-small font-medium text-link hover:text-link-hover hover:underline`.
- Standalone action: `inline-flex items-center gap-1 text-body font-semibold text-link hover:text-link-hover hover:underline`, with "→" marked `aria-hidden`.
- All links: `rounded-sm` and the focus ring `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring`.

## Rules

- The accent blue means "go there", "you are here" and "this is the cited text". Its one brand use, the pulled line in the logo, means the cited line too. Nothing else is blue.
- Links to ClinicalTrials.gov say so in the text or the accessible name.
