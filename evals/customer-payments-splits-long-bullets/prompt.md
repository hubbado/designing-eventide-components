---
description: A design document written from a request with many facts on each subject keeps each bullet short. A bullet with supporting facts keeps its claim at the top and gives the facts as sub-bullets.
tags: [stage-1]
runs: 3
max_turns: 30
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Design the event flow for customer payments at a wholesaler, in Eventide. Keep the design in docs/design/customer-payments/.

The ordering system issues an invoice to a customer for each order that it ships. An invoice has an amount in pounds sterling, and a due date 30 days after it is issued. Most customers buy on credit. A few customers must pay before their goods are shipped, and their invoices are due at once.

Staff record each payment that a customer makes. A payment names the invoices that it settles, and it can settle several invoices of one customer. An invoice is settled at most once. A payment of less than the invoices that it names is refused, and staff are told why; they then contact the customer. A payment of more than its invoices is kept as credit for the customer, and staff use the credit to settle a later invoice.

Each night, a matching run reads the bank's statement, and records each payment that it can match to open invoices by their numbers. Staff record by hand the payments that the run cannot match. So the run and the staff can record a payment for the same invoice at the same time.

When an invoice is 7 days overdue, the customer is sent a reminder. When it is 30 days overdue, the customer's account is put on hold, and the ordering system refuses new orders on credit until the overdue invoices are settled. Staff can lift a hold for a customer whom they trust.

A customer can dispute an invoice. A disputed invoice gets no reminders, and does not put the account on hold, until staff resolve the dispute. Staff resolve it with a credit note for part or all of the invoice, or they reject the dispute.
