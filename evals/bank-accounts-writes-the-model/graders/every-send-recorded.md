---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/event-flows.yaml
pattern: "^  - (?=(?:(?!^  - |^\\S)[\\s\\S])*?^\\s+sends:)(?!(?:(?!^  - |^\\S)[\\s\\S])*?^\\s+writes:)"
flags: m
match: not_contains
---
