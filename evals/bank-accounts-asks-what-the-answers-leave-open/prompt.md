---
description: The reviewer's answers together leave a case that none of them settles, and the skill asks about it before it writes the model.
tags: [stage-2]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. Your draft requirements from our
last session are in docs/design/bank-accounts/design.md. Here are my answers
to your questions.

1. Closed accounts. A closed account refuses deposits and withdrawals. An
   account can be closed only when its balance is zero, so no money is left in
   it. A closed account is never opened again.
2. A deposit that cannot be made. The money goes back into the source account,
   and the transfer fails, with the reason. The customer is told why.
3. Closing during a transfer. Yes. The bank does not stop a customer from
   closing an account because a transfer is under way.
4. Who can transfer to whom. Into any account in the bank. The source and the
   destination cannot be the same account: the app does not let the customer
   choose that.
5. Other processes. Today, only the customer's own deposits, withdrawals and
   transfers. Within the year, card payments and direct debits will take money
   out of accounts, and each month the bank will add interest and take fees.
   Statements will read each account's history.
6. Currency. Every account is in pounds sterling.

Your assumptions are all correct.
