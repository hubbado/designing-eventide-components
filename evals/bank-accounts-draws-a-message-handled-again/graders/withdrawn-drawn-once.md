---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/event-flows.html
pattern: "title:\\s*[\"']Account Withdrawn[\"'](?:(?!\\bname:)[\\s\\S])*title:\\s*[\"']Account Withdrawn[\"']"
match: not_contains
---
