# Icons

Inline these as SVG in the app; never load them as images or from a CDN.

**State icons** (16px grid, fixed colours from the state tokens):

- `state-met.svg` — filled circle, `state-met-solid` with a `state-met-glyph` check.
- `state-not-met.svg` — filled square, `state-not-met-solid` with a `state-not-met-glyph` cross.
- `state-not-found.svg` — dashed ring and dash in `state-not-found-solid`, hollow.
- `state-clinician.svg` — diamond in `state-clinician-solid`, `state-clinician-edge` outline, `state-clinician-glyph` "!".

**Interface icons** (20px grid, 1.6px round stroke). As files they are drawn in `ink` `#131313`; inline, set `stroke="currentColor"` so they take the text colour.

- `document.svg` — one source document (full source chip, documents table).
- `documents.svg` — several documents (source group).
- `chevron-down.svg`, `chevron-right.svg` — expand and collapse.
- `close.svg` — a thin, unfilled × for closing the evidence panel; never filled, never coloured.
- `upload.svg` — the drop zone and "Choose files".
- `unavailable.svg` — the slashed circle for errors (not "!" and not a cross: those belong to states).
- `spinner.svg` — loading; rotate it only under `motion-safe:`.
