# Customer payments: requirements

Draft. No candidate model yet.

## In brief

- The ordering system issues an invoice to a customer for each order that it
  ships. This system records each invoice.
- Staff record each payment that a customer makes. Each night, a matching
  run records the payments that it matches on the bank's statement.
- A payment names the invoices that it settles. It settles all of them, or
  none of them.
- An invoice is settled at most once.
- When a payment is refused, staff are told why.

## Background

Most customers have a few open invoices. The largest customers have up to
5,000 open invoices at a time, and pay up to 200 of them in one payment.

The matching run and the staff can record a payment for the same invoice at
the same time. For example, the run matches a payment on the statement while
a member of staff records the same payment from the customer's remittance
advice.

## Terms

- **Customer**: a business that orders goods on credit.
- **Invoice**: a request for payment for one order, issued by the ordering
  system to one customer, with an amount in pounds sterling.
- **Open invoice**: an invoice that no payment has settled.
- **Payment**: money that a customer has paid into the bank, recorded with
  the invoices that it settles.
- **Settled**: an invoice that a payment has paid.
- **Matching run**: the nightly job that reads the bank's statement and
  records each payment that it can match to open invoices.

## Keywords

Each requirement is a **MUST** or a **MUST NOT**: something that is built and
checked. A permission is written as what the system MUST let a person do.

## Requirements

### Invoices

- **record-invoice.** The system MUST record each invoice that the ordering
  system issues.

### Payments

- **record-payment.** The system MUST let staff record a payment that names
  the invoices that it settles.
- **matched-payment.** The system MUST let the matching run record a payment
  that it has matched.
- **several-invoices.** A payment MUST be able to settle several invoices of
  one customer.
- **one-customer.** A payment MUST settle invoices of one customer only.
- **exact-amount.** A payment's amount MUST equal the sum of the invoices
  that it names.
- **settled-once.** An invoice MUST be settled at most once.
- **all-or-none.** A payment MUST settle all of the invoices that it names, or
  none of them.
- **refused-whole.** A payment that names an invoice that is already settled,
  or that the system has not recorded, MUST be refused whole, with the reason
  for each such invoice.
- **refusal-shown.** When a payment is refused, staff MUST be told why.

## Out of scope

- Part payments. A payment of less than its invoices is refused by
  exact-amount, and staff contact the customer.
- Refunds of a payment.
- Other currencies. Every invoice and payment is in pounds sterling.

## Other processes

For the invoice:

- Today: the ordering system issues it, and a payment settles it.
- Later: credit notes, which reduce what an invoice owes.
- Later: write-offs, which close an invoice that will never be paid.
- Later: reminders, which read the open invoices of each customer.

For the customer:

- Later: statements, which read each customer's invoices and payments.

## Open

None.
