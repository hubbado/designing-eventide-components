---
description: With a selected candidate and every question answered, the skill writes a model in which each handler that sends a command writes a record of the send, each collection says what keeps it small, and no event is named for its arrival, such as …Received.
tags: [stage-2]
runs: 3
max_turns: 60
timeout_seconds: 2400
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

On payout: the staff's screen offers only the customer's open accounts, as
for not-same-account, so the system does not check it. Write the model, and
stop before the scenarios.
