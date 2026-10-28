---
description: A change that copies an account's events into another stream gets copies named for the business fact with its source in front, not for their arrival.
tags: [stage-2]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/, and I have reviewed it. Now a change: monthly
statements.

At the start of each month, the bank issues a statement for each account
that was open in the month before. A statement shows the balance at the
start of the month, each deposit and each withdrawal in the month, with its
amount and time, and the balance at the end. A statement, once issued, never
changes. Statements are a component of their own, so that the account stays
as it is.

These requirements are settled. Write them into the design, then go to the
candidates. If you find another question, put it in Open and go on to the
candidates.
