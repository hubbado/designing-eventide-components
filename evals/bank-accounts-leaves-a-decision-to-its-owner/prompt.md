---
description: A decision about a component's data stays with that component. A transfer that keeps a copy of an account's balance does not decide from it whether the balance covers a withdrawal.
tags: [stage-2]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/, and I have reviewed it. Now a change.

Customers complain that a transfer that their balance cannot cover is refused
only after a short wait. I think the transfer component can keep each
account's balance, from the account's Deposited and Withdrawn events. Then the
transfer can refuse at once a transfer that the balance cannot cover, and send
Withdraw only for a transfer that the balance covers.

Write the change into the design, then go to the candidates. If you find
another question, put it in Open and go on to the candidates. I will answer it
when I select one.
