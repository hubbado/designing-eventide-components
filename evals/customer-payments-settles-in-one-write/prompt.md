---
description: A payment and the settlement of the invoices that it names are written in one write, so that no handler has to consider a message that arrives between them. The size of the one stream is put to the reviewer.
tags: [stage-2]
runs: 3
max_turns: 40
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing customer payments in Eventide. The design is in
docs/design/customer-payments/, and I have reviewed the requirements. Go to
the candidates.

One idea for you to consider. I like each handler to do one thing. So the
handler of a payment writes PaymentRecorded, and a handler of PaymentRecorded,
on the same stream, then writes InvoiceSettled for each invoice that the
payment names.

If you find another question, put it in Open and go on to the candidates. I
will answer it when I select one.
