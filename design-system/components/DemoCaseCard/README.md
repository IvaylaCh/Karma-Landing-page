# Demo case card

The landing page card that introduces the fictional demo patient and starts the demo with "Find trials".

## Anatomy

1. Both badges first: Fictional patient, Frozen demo.
2. Name and age (`text-heading`) with its compact source chip.
3. The diagnosis line, verbatim, with its chips.
4. Three key facts (KRAS, PD-L1, ECOG) as small label/value pairs, each with a chip.
5. "6 documents · 11 pages · in Bulgarian".
6. Primary "Find trials", secondary "See the documents".

## Rules

- Even on the landing page every value keeps its source chip.
- One primary button only.
- The badges are part of the card, not a corner ribbon.

Primary button classes: `inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-body font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed bg-action text-action-ink hover:bg-action-hover disabled:bg-disabled-fill disabled:text-disabled-ink`
