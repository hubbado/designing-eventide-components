---
description: The skill stops after the draft requirements, names its assumptions, and asks only what can change the model.
tags: [stage-1]
runs: 3
max_turns: 30
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Design the event flow for bank accounts in Eventide.

A customer opens an account. They can deposit money into it, withdraw money from it, and close it. A withdrawal that the balance cannot cover is refused, and the customer is told why.

A customer can transfer money from one account to another. The money is withdrawn from the first account and deposited into the second. If the withdrawal is refused, the transfer is cancelled, and nothing is deposited.
