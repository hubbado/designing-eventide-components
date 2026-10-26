# Bank accounts: requirements

Draft. Stage 1: requirements only. No model has been selected.

## In brief

- A customer opens an account, deposits money into it, withdraws money from
  it, and closes it.
- A withdrawal that the balance cannot cover is refused, and the customer is
  told why.
- A customer transfers money from one account to another: the money is
  withdrawn from the first account and deposited into the second.
- When the withdrawal of a transfer is refused, the transfer is cancelled and
  nothing is deposited.

## Terms

- **Customer**: a person who holds accounts.
- **Account**: a customer's store of money, with a balance in one currency.
- **Balance**: the money in an account: its deposits less its withdrawals.
- **Deposit**: money put into an account.
- **Withdrawal**: money taken out of an account.
- **Refused**: a withdrawal that has no effect on the balance, with a reason.
- **Closed account**: an account that its customer has closed.
- **Transfer**: money moved from one account (the source) to another (the
  destination), by a withdrawal from the source and a deposit into the
  destination.
- **Cancelled transfer**: a transfer whose withdrawal was refused. Nothing is
  deposited.

## Keywords

Each requirement is a **MUST** or a **MUST NOT**: something that is built and
checked. A permission is written as what the system MUST let a person do.

## Requirements

Marked *(assumption)*: not in the request.

### Accounts

- **open.** The system MUST let a customer open an account.
- **opens-empty.** *(assumption)* An account MUST open with a balance of zero.
- **close.** The system MUST let a customer close an account.

### Deposits and withdrawals

- **deposit.** The system MUST let a customer deposit money into an account.
- **withdraw.** The system MUST let a customer withdraw money from an account.
- **positive-amount.** *(assumption)* A deposit or a withdrawal MUST be of an
  amount greater than zero.
- **no-overdraft.** A withdrawal MUST be refused when it is greater than the
  balance. *(assumption)* A withdrawal of the whole balance is not refused;
  there is no overdraft.
- **refusal-reason.** When a withdrawal is refused, the customer MUST be told
  why.
- **once.** *(assumption)* Each deposit and each withdrawal MUST change the
  balance at most once, however often it is asked for.

### Transfers

- **transfer.** The system MUST let a customer transfer money from one account
  to another: the amount is withdrawn from the source and deposited into the
  destination.
- **transfer-cancelled.** When the withdrawal of a transfer is refused, the
  transfer MUST be cancelled, and nothing MUST be deposited into the
  destination.
- **transfer-reason.** *(assumption)* When a transfer is cancelled, the
  customer MUST be told why.
- **transfer-whole.** *(assumption)* When the flow settles, a transfer MUST
  have deposited exactly what it withdrew: all of it, or nothing.

## Other processes

To be answered by the reviewer, for the account and its balance.

## Open

- **Q1, closed account** (close, deposit, withdraw). What can happen to an
  account after it is closed? Can money still be deposited into it, or
  withdrawn from it? Can an account be closed while it holds money, and if
  so, what happens to that money?
- **Q2, transfer into an account that cannot take it** (transfer,
  transfer-whole). If the money has left the source account, and the
  destination cannot take it, for example because it was closed in the
  meantime, what does the bank do? Return the money to the source? Hold it
  somewhere? Or can a deposit never be turned away?
- **Q3, closing during a transfer** (close, transfer). Can an account be
  closed while a transfer from it or into it is still under way?
- **Q4, who can transfer** (transfer). Can a customer transfer only between
  their own accounts, or into any customer's account? Can the source and the
  destination be the same account?
- **Q5, other processes that use an account** (Other processes). Which other processes
  change an account's balance now, such as fees, interest, card payments or
  direct debits? Which are likely to need it later, such as statements or
  overdrafts?
- **Q6, currency** (Terms). Is every account in one currency, or can a
  transfer be between accounts in different currencies?
