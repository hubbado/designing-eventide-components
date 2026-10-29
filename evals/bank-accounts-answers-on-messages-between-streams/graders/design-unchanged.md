---
type: regex
target: trace
pattern: 'name\W+(?:Write|Edit)\W+input\W+[^{}]*?file_path\W+[^"\\]*docs/design/'
match: not_contains
---
