---
type: regex
target: trace
pattern: 'name\W+(?:Write|Edit)\W+input\W+[^{}]*?file_path\W+[^"\\]*event-flows\.yaml'
match: not_contains
---
