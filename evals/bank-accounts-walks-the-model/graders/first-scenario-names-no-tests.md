---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/scenarios.md
pattern: "^## 1\\.[^\\n]*\\n(?:(?!^## )[\\s\\S])*?^Tests:"
flags: m
match: not_contains
---
