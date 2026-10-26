---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/design.md
pattern: "^## Other processes\\n(?=(?:(?!^## )[\\s\\S])*?[Cc]ard)(?=(?:(?!^## )[\\s\\S])*?[Dd]irect debit)(?=(?:(?!^## )[\\s\\S])*?[Ii]nterest)(?=(?:(?!^## )[\\s\\S])*?[Ff]ee)"
flags: m
---
