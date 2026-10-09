# File drop zone

Where a coordinator adds one patient's documents; it numbers them in the order they will be cited.

## States

| State | Look |
| --- | --- |
| Idle | `rounded-xl border-2 border-dashed border-control bg-surface`, upload icon, "Drop the patient’s documents here", accepted types, secondary "Choose files" |
| Dragging over | `border-selected-line bg-selected-tint`, "Release to add 6 documents" |
| Files added | a list: number, document icon, file name, pages, ghost "Remove" |
| Can't read a file | `border-2 border-ink`, slashed-circle icon, the file name and what to do; the other files stay added |
| Disabled (frozen demo) | the zone is replaced by the demo case card |

## Rules

- The whole zone is a `<label>` for a hidden file input, so it is keyboard- and screen-reader-operable.
- Errors name the file and say what happened to the rest.
