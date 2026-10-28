---
description: When the reviewer selects a candidate and leaves a question or an assumption that can change the model unanswered, the skill asks again, and writes no model.
tags: [stage-2]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

I select A, from the candidates that you gave me in our last session. This
is its sketch:

- `account-{account_id}`, in account_component: holds the balance, and
  whether the account is open or closed. Takes Open, Deposit, Withdraw and
  Close. Handles no events of other streams.
- `transfer-{transfer_id}`, in transfer_component: holds the stage of one
  transfer. Takes Transfer. Sends Withdraw and Deposit to `account`, and
  Deposit to `suspenseAccount`. Handles the account's replies to its
  commands.
- `suspenseAccount-{bank}`, in transfer_component: holds the suspense
  account's balance and each sum still owed. Takes Deposit and PayOut. Sends
  Deposit to `account`, and handles that account's replies.
