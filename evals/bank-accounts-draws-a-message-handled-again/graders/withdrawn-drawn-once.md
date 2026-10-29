---
type: regex
target:
  source: file
  path: docs/design/bank-accounts/event-flows.html
pattern: "title:\\s*[\"']Withdrawn[\"'](?:(?!\\bname:)[\\s\\S])*title:\\s*[\"']Withdrawn[\"']"
match: not_contains
---
