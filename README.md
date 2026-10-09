# Karma

**Every criterion cited. Nothing inferred.**

Karma helps hospital research coordinators find recruiting clinical trials for one patient. It reads the patient's documents, builds a case card where every value names the document and page it came from, ranks recruiting trials from ClinicalTrials.gov, and shows each trial's criteria in one of four states with the evidence beside them.

Karma never decides whether a patient can join a trial. It shows its work, and a clinician decides.

## How it works

1. **Reads the documents.** A coordinator adds one patient's documents. Karma numbers them in the order they were added, so "02" always means the same file.
2. **Builds the case card.** Diagnosis, biomarkers and performance status, each value exactly as the documents give it, with the document and page it came from. What the documents leave out reads "not in the documents".
3. **Ranks recruiting trials.** Recruiting trials from ClinicalTrials.gov are listed in rank order. The rank orders the list. It is not a score.
4. **Shows every criterion.** Each inclusion and exclusion criterion appears in one of four states, with the quoted evidence and the document and page beside it.

## The four states

| State | Means |
| --- | --- |
| met | the documents support it |
| not met | the documents contradict it |
| not found | the documents don't contain the information |
| needs a clinician | a judgment call Karma never makes |

A state is always shown as colour, icon and word together, so the four stay apart in greyscale and for red-green colour blindness.

## What Karma does not do

Karma organizes and cites documents. It does not interpret, recommend or decide. Values are quoted word for word, in the language of the document. Trials are ordered, never scored. Anything that needs judgment is marked "needs a clinician".

## The demo

The demo runs on frozen data about a fictional patient: six documents, written in Bulgarian, 11 pages. A "Fictional patient" badge and a "Frozen demo" badge say so wherever they apply. This project holds no real patient data.

Built for the Crossroads AI hackathon, Sofia, 10–11 October 2026.

## Status

Early hackathon build. Install and run instructions will be added here when the app code lands.

## Design in one minute

- **Type:** Geologica (sharp) for everything. Overpass Mono only for trial IDs and compact source chips.
- **Colour:** near-black ink on white with one family of blues, spent only on meaning. The four state colours are reserved for the four states.
- **Logo:** the Twin mark, a disc with two spiral grooves. It is drawn as dots from 64px tall and as one solid shape below that.
- **Brand surfaces:** the landing page's main section sits on a soft dark ground with a light made of dots. The work screens stay light.

The working rules for contributors, and for Claude, are in [CLAUDE.md](CLAUDE.md).
