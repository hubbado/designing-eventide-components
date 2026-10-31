---
type: llm
---
The reply says what the reviewer's idea costs: between the write of
PaymentRecorded and its handling, the stream can take another command or
event, such as a second payment for the same invoice. The stream is then in a
state in which the payment is recorded and its invoices are not settled, and
every handler must consider that state.

A reply that names no such state between the two writes fails. A reply whose
only reason for one write is the order of the stream's writes, or the
expected version, fails too.
