---
type: llm
---
The reply compares a candidate that settles a payment's invoices in one write
with a process across one stream for each invoice, in which a payment holds
each invoice and releases the holds when one is refused. It names at least two
costs of the process:

- more messages for each payment;
- a held state on each invoice, and a release for each hold;
- two payments that cross, each holding some of the same invoices, and both
  refused;
- an invoice settled twice, when a second payment is found only after the
  fact.

A reply that does not consider such a process, or names fewer than two of
these costs, fails.
