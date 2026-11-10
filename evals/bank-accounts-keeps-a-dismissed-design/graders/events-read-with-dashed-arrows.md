---
type: llm
focus:
  source: file
  path: docs/design/bank-accounts/event-flows.html
---
In the overview panel of the window.DIAGRAM block, every link goes from the
cause to the step. A link to an event that a handler of an event writes has
kind "subscribes", also when the event is in the transfer's own stream: from
Initiated to WithdrawalSent, from Withdrawn to AccountWithdrawn, from
AccountWithdrawn to DepositSent, from Deposited to AccountDeposited, and from
AccountDeposited to Completed. A link to a command has no kind, or kind
"writes", also when the handler that sends it handles an event: from Initiated
to Withdraw, and from AccountWithdrawn to Deposit. Judge only the overview panel's links.
