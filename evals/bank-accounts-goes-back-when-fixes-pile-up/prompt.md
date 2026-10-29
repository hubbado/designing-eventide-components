---
description: When a third fix is needed on the same structure, the skill goes back to the candidates, and compares a new structure with the best version of the current one, not with the current one and its fixes.
tags: [stage-3]
runs: 3
max_turns: 60
timeout_seconds: 2400
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/. A fresh session walked the reversals, and found
one more case. A business account takes about 4,000 card settlements a day,
each one a Deposit. Thirteen months of them is about 1.5 million entries in
reversible_deposits, which the account's consumer keeps in memory. What do
we do?
