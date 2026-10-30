---
description: A technical constraint that the request gives goes in a section of its own, apart from the requirements, and says what it protects. A business rule that the constraint adds is shown to the reviewer as a trade-off.
tags: [stage-1]
runs: 3
max_turns: 30
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Design the event flow for bank accounts in Eventide. Keep the design in docs/design/bank-accounts/.

A customer opens an account. They can deposit money into it, withdraw money from it, and close it. A withdrawal that the balance cannot cover is refused, and the customer is told why.

Bank staff can reverse a deposit that was made by mistake, such as money paid into the wrong account. A reversal takes the deposit's amount back out of the account. A deposit is reversed at most once.

Our platform team has a rule for every component: no entity keeps a list that grows for the life of its stream. So the account keeps its deposits for 30 days only, and staff can reverse a deposit only within 30 days of it.
