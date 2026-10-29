---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/event-flows.yaml
pattern: "\\b[A-Z][A-Za-z]*Received\\b"
match: not_contains
---
