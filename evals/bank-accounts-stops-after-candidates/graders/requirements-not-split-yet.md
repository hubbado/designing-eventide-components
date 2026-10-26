---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/design.md
pattern: "^#+ *(Component|Application)\\b"
flags: m
match: not_contains
---
