---
type: regex
target:
  source: file
  path: docs/design/customer-payments/design.md
pattern: "^( *)(?:[-*]|\\d+\\.) (?:[^\\n]|\\n(?=\\1  +(?![-*] |\\d+\\. )\\S)){450,}"
flags: m
match: not_contains
---
