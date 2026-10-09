# State legend

Says what the four states mean, in the product's own words, wherever states first appear on a screen.

## When to use

- Above the criterion matrix (four columns) and on the landing page.
- Stacked in the evidence panel or any column narrower than about 600px.

## Copy (fixed)

| State | Definition |
| --- | --- |
| met | the documents support it |
| not met | the documents contradict it |
| not found | the documents don't contain the information |
| needs a clinician | a judgment call Karma never makes |

## Recipe

Each item: the 16px state icon, the word in `font-semibold text-state-…-ink`, the definition in `text-ink-secondary`, all `text-small`. Mark the group up as a list with `aria-label="What the four states mean"`.

## Rules

- One legend per screen is enough. Don't repeat it in every card.
- Never shorten a definition to a single word; the definition is the promise.
