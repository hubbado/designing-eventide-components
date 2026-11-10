---
type: llm
focus:
  source: file
  path: docs/design/bank-accounts/event-flows.html
---
In the overview panel of the window.DIAGRAM block, every link goes from the
cause to the step. A link to an event that a handler of an event writes has
kind "subscribes", also when the event is in the transfer's own stream: from
Initiated to WithdrawalSent, from Withdrawn to DepositSent, and from Deposited
to Completed. A link to a command has no kind, or kind "writes", also when the
handler that sends it handles an event: from Initiated to Withdraw, and from
Withdrawn to Deposit. Judge only the overview panel's links.
