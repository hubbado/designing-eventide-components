---
description: With requirements that the reviewer has settled over several rounds, the skill presents candidate models and their table, and stops before the model.
tags: [stage-2]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/. Here are my answers to your last questions.

payout-once and payout-refused are correct.

When a customer has no other open account in this bank, the staff wait until
the customer opens one. Paying money out of the bank, such as by cheque, is
out of scope.

Interest, fees, card payments and direct debits are for later designs. Keep
each question about them with its process in Other processes, so that its own
design finds it. Do not cover them now.

If you find another question, put it in Open and go on to the candidates. I
will answer it when I select one.
