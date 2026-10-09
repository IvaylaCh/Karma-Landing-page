- source_spec: `_bmad-output/specs/spec-karma-landing-page/stories/2-header-and-main-section.md`
  summary: Add a test that every in-page `href="#id"` in dist/index.html has a matching `id`.
  evidence: the build test skips `#` links since story 2; `#how` and `#demo` have no target until stories 3 and 5, so the check would fail today. Add it in story 7's whole-page check.
