# Page sections

The sections in page order, what each holds, and which strings are fixed. Fixed strings go into `content.json` as real text in phase 1; everything else is a placeholder of about the same length until phase 2.

| # | Section | CAP | Ground | Holds | Design system parts |
| --- | --- | --- | --- | --- | --- |
| 1 | Header | CAP-1 | light bar, floating, rounded | solid lockup, descriptor, "How it works" link, "Try the demo" | Wordmark, TextLink, Button |
| 2 | Main section | CAP-2 | dark, `brand-*` tokens, dot light | headline (`hero`), tagline, short lead, "Try the demo" | Wordmark (reversed) |
| 3 | How it works | CAP-3 | light | four numbered steps, a title and one or two sentences each | — |
| 4 | The four states | CAP-4 | light | the state legend; optional example rows (no "met" on an exclusion; the one exclusion example is "needs a clinician") | StateLegend, StatePill |
| 5 | The demo | CAP-5 | light | demo case card; the target of every "Try the demo" | DemoCaseCard, DemoBadge, SourceChip, Button |
| 6 | What Karma does not do | CAP-6 | light | three or four short statements | — |
| 7 | Closing band | CAP-7 | light | one line and "Try the demo" | Button |
| 8 | Footer | CAP-8 | light, `border-t border-line bg-surface` | the footer sentence; optional "Trials from ClinicalTrials.gov" | Footer |

## Fixed strings (real from phase 1)

| Key | Text |
| --- | --- |
| action | Try the demo |
| demo.primary | Find trials |
| demo.secondary | See the documents |
| nav.howItWorks | How it works |
| tagline | Every criterion cited. Nothing inferred. |
| badge.fictional | Fictional patient |
| badge.frozen | Frozen demo |
| state.met | met — the documents support it |
| state.notMet | not met — the documents contradict it |
| state.notFound | not found — the documents don't contain the information |
| state.clinician | needs a clinician — a judgment call Karma never makes |
| missing | not in the documents |
| footer | Karma organizes and cites documents. It does not interpret, recommend or decide. |

## Demo card contents

Badges first, then name and age with a source chip, the diagnosis verbatim (`lang="bg"`) with chips, three key facts (KRAS, PD-L1, ECOG) each with a chip, then "6 documents · 11 pages · in Bulgarian". Then "Find trials" (primary) and "See the documents" (secondary), both linking to a placeholder until the app exists. Phase 1 uses placeholder values in the same shape; phase 2 takes the values from `design-system/components/DemoCaseCard/preview.html`. A missing value reads "not in the documents".
