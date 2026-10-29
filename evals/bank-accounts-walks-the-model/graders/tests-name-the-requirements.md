---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/scenarios.md
pattern: "(?=[\\s\\S]*^Tests:[^.]*?\\bclose-when-empty\\b)(?=[\\s\\S]*^Tests:[^.]*?\\bclosed-refuses\\b)(?=[\\s\\S]*^Tests:[^.]*?\\bno-overdraft\\b)(?=[\\s\\S]*^Tests:[^.]*?\\bonce\\b)(?=[\\s\\S]*^Tests:[^.]*?\\btransfer-cancelled\\b)(?=[\\s\\S]*^Tests:[^.]*?\\btransfer-returned\\b)(?=[\\s\\S]*^Tests:[^.]*?\\btransfer-whole\\b)"
flags: m
---
