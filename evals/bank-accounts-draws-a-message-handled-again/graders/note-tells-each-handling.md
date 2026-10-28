---
type: llm
focus:
  source: file
  path: docs/design/bank-accounts/event-flows.html
---
In the window.DIAGRAM block, a note points at the Withdrawn box and says what
happens each time that the transfer handles it: the first time it sends the
deposit, and the second time, after its consumer starts again, it sends the
deposit again and records DepositSent.
