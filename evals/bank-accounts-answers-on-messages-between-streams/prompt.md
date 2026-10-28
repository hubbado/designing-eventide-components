---
description: Asked about messages between streams, the skill says that a send is recorded after it is made, that a subscriber cannot undo an event, and that two writers of one stream conflict and retry.
tags: [stage-3]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/. Before I review it, I have three questions. Answer
them; do not change the design.

1. The transfer sends Deposit and then writes DepositSent. Why in that order?
   What happens when its consumer stops between the two?
2. Can the transfer component refuse the account's Withdrawn event, as the
   account refuses a Withdraw command?
3. Statements will come later. Say a statement component copies each
   account's Deposited into a statement stream, and staff can also send a
   command to that stream to add a note. What happens when the copy and the
   note are written to the same statement stream at the same moment? Does
   the design need a guard for it?
