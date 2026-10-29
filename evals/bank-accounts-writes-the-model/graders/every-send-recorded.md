---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/event-flows.yaml
pattern: "^( *)- (?=(?:[^\\n]*?\\bsends:|[^\\n]*(?:\\n(?:\\1  [^\\n]*|[ \\t]*(?=\\n)))*?\\n\\1  [^\\n]*?\\bsends:))(?!(?:[^\\n]*?\\bwrites:|[^\\n]*(?:\\n(?:\\1  [^\\n]*|[ \\t]*(?=\\n)))*?\\n\\1  [^\\n]*?\\bwrites:))"
flags: m
match: not_contains
---
