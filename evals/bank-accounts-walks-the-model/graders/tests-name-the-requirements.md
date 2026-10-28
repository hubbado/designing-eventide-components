---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/scenarios.md
pattern: "(?=[\\s\\S]*^Tests:(?:(?!Walked:)[\\s\\S])*?\\bclose-when-empty\\b)(?=[\\s\\S]*^Tests:(?:(?!Walked:)[\\s\\S])*?\\bclosed-refuses\\b)(?=[\\s\\S]*^Tests:(?:(?!Walked:)[\\s\\S])*?\\bno-overdraft\\b)(?=[\\s\\S]*^Tests:(?:(?!Walked:)[\\s\\S])*?\\bonce\\b)(?=[\\s\\S]*^Tests:(?:(?!Walked:)[\\s\\S])*?\\btransfer-cancelled\\b)(?=[\\s\\S]*^Tests:(?:(?!Walked:)[\\s\\S])*?\\btransfer-returned\\b)(?=[\\s\\S]*^Tests:(?:(?!Walked:)[\\s\\S])*?\\btransfer-whole\\b)"
flags: m
---
