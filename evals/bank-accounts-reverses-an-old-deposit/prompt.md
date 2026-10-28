---
description: A change whose decision reaches back to an old fact keeps no collection on the entity that grows for the life of its stream, however rare the act that adds an entry.
tags: [stage-2]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/, and I have reviewed it. Now a change: reversals.

Bank staff can reverse a deposit that was made by mistake, such as money
paid into the wrong account. They can do it at any time, even years after
the deposit. A reversal takes the deposit's amount back out of the account.
A deposit is reversed at most once. A reversal that the balance cannot cover
is refused, and the staff are told why.

An account has a reversal a few times in its life at most, so I think the
account can simply keep the ids of the deposits that it has reversed.

These requirements are settled. Write them into the design, then go to the
candidates. If you find another question, put it in Open and go on to the
candidates.
