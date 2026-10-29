---
type: llm
focus:
  source: file
  path: docs/design/bank-accounts/event-flows.html
---
In the overview panel of the window.DIAGRAM block, every link from a step to
the event whose handler wrote or sent it has kind "reads", also when the
event is in the transfer's own stream: from Withdraw and from WithdrawalSent
to Initiated, from Deposit and from DepositSent to Withdrawn, and from
Completed to Deposited. Judge only the overview panel's links.
