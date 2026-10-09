# Empty, loading and error

How every list in Karma looks when it has nothing to show, is still working, or could not get its data.

## Patterns

- **Empty**: a section label, a heading that says what is empty, one sentence that says why or what was searched, one secondary action.
- **Loading**: a live status line ("Reading documents · 4 of 6") with a spinner, over skeleton rows in `bg-surface-sunken`. Animate only with `motion-safe:`. `aria-busy="true"` on the list, `role="status"` on the line.
- **Error**: the slashed-circle icon (never "!" or a cross: those belong to states), what went wrong, what is unaffected, one action ("Try again").

## Copy for each list

| List | Empty | Loading | Error |
| --- | --- | --- | --- |
| Ranked trials | No recruiting trials for these search terms | Searching ClinicalTrials.gov | ClinicalTrials.gov didn’t answer |
| Criterion matrix | No criteria are [state] for this trial (when filtered) | Reading the trial’s criteria · 12 of 22 | The criteria couldn’t be read |
| Case card | No documents yet. Add the patient’s documents to start. | Reading documents · 4 of 6 | A document couldn’t be read (names it) |
| Documents | No documents yet | Adding 6 documents | “scan_0042.heic” can’t be read |
| Timeline | No dated events in the documents | Building the timeline | The timeline couldn’t be built |
| Site mode | No patients added to this trial yet | Checking 3 patients | One patient couldn’t be checked (names them) |
| Cohorts | This trial lists no cohorts | Reading cohorts | The cohorts couldn’t be read |

## Rules

- Empty is not an error: no slashed circle, no alarm.
- Errors say what is still safe ("The case card and documents are unaffected").
- Offline: say that the frozen demo works without a network.
