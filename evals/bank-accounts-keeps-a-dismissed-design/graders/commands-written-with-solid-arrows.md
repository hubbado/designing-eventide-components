---
type: llm
focus:
  source: file
  path: docs/design/bank-accounts/event-flows.html
---
In the overview panel of the window.DIAGRAM block, every link from a command
to the event that its handler writes, such as from Transfer to Initiated,
from Withdraw to Withdrawn and from Deposit to Deposited, has kind "writes"
or no kind. Judge only the overview panel's links.
