---
type: llm
focus:
  source: file
  path: docs/design/bank-accounts/design.md
---
The Problems found section records that the money of a transfer can end in no
account: the source is closed after the transfer's withdrawal, the
destination refuses the deposit, and the source then refuses the return of
the money, because it is closed.
