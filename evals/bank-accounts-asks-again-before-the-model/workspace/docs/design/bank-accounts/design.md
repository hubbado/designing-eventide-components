# Bank accounts: requirements

Draft. Stage 2: the reviewer has answered Q1 to Q6. Candidate models are
proposed; none is selected. Q7 is open.

## In brief

- A customer opens an account, deposits money into it, withdraws money from
  it, and closes it. Every account is in pounds sterling.
- A withdrawal that the balance cannot cover is refused, and the customer is
  told why.
- An account can be closed only when its balance is zero. A closed account
  refuses deposits and withdrawals, and is never opened again.
- A customer transfers money from one of their accounts into any account in
  the bank: the money is withdrawn from the source and deposited into the
  destination.
- When the withdrawal of a transfer is refused, the transfer is cancelled and
  nothing is deposited.
- When the deposit of a transfer is refused, the money goes back into the
  source, and the transfer fails. The customer is told why.
- A transfer does not stop a customer from closing either account.

## Terms

- **Customer**: a person who holds accounts.
- **Account**: a customer's store of money, with a balance in pounds sterling.
- **Balance**: the money in an account: its deposits less its withdrawals.
- **Deposit**: money put into an account.
- **Withdrawal**: money taken out of an account.
- **Refused**: a deposit, a withdrawal or a closing that has no effect, with a
  reason.
- **Open account**: an account that has been opened and is not closed.
- **Closed account**: an account that its customer has closed. It is never
  opened again.
- **Transfer**: money moved from one account (the source) to another (the
  destination), by a withdrawal from the source and a deposit into the
  destination.
- **Under way**: a transfer that has been asked for and is not yet completed,
  cancelled or failed.
- **Cancelled transfer**: a transfer whose withdrawal was refused. Nothing is
  deposited.
- **Failed transfer**: a transfer whose deposit was refused. The money is
  deposited back into the source.

## Keywords

Each requirement is a **MUST** or a **MUST NOT**: something that is built and
checked. A permission is written as what the system MUST let a person do.

## Requirements

Marked *(assumption)*: not in the request or the reviewer's answers.

### Accounts

- **open.** The system MUST let a customer open an account.
- **opens-empty.** An account MUST open with a balance of zero.
- **close.** The system MUST let a customer close an open account whose
  balance is zero.
- **close-empty.** An account MUST NOT be closed while its balance is not
  zero. *(assumption)* The customer MUST be told why.
- **closed-final.** A closed account MUST NOT be opened again.
- **close-during-transfer.** The system MUST let a customer close an account
  while a transfer from it or into it is under way.

### Deposits and withdrawals

- **deposit.** The system MUST let a customer deposit money into an open
  account.
- **withdraw.** The system MUST let a customer withdraw money from an open
  account.
- **positive-amount.** A deposit or a withdrawal MUST be of an amount greater
  than zero.
- **no-overdraft.** A withdrawal MUST be refused when it is greater than the
  balance. A withdrawal of the whole balance is not refused; there is no
  overdraft.
- **closed-refuses.** A deposit into a closed account, or a withdrawal from
  it, MUST be refused.
- **not-opened-refuses.** *(assumption)* A deposit into an account that has
  not been opened, or a withdrawal from it, MUST be refused.
- **refusal-reason.** When a deposit or a withdrawal is refused, the customer
  MUST be told why. *(assumption: the request said this of withdrawals only;
  deposits can now be refused too.)*
- **once.** Each deposit and each withdrawal MUST change the balance at most
  once, however often it is asked for.

### Transfers

- **transfer.** The system MUST let a customer transfer money from one of
  their accounts into any account in the bank: the amount is withdrawn from
  the source and deposited into the destination.
- **transfer-distinct.** The source and the destination of a transfer MUST
  NOT be the same account. The app does not let the customer choose that.
- **transfer-cancelled.** When the withdrawal of a transfer is refused, the
  transfer MUST be cancelled, and nothing MUST be deposited into the
  destination.
- **transfer-failed.** When the deposit of a transfer is refused, the amount
  MUST be deposited back into the source, and the transfer MUST fail.
- **transfer-reason.** When a transfer is cancelled or fails, the customer
  MUST be told why.
- **transfer-whole.** When the flow settles, a transfer MUST have deposited
  into the destination exactly what it withdrew from the source, or deposited
  all of it back into the source. Q7 waits on this.

## Out of scope

- Other currencies: every account is in pounds sterling.
- Overdrafts.
- Card payments, direct debits, interest, fees and statements: later
  processes (Other users).

## Other users

Of the account and its balance, as the reviewer knows them on 2026-10-26:

- Now: only the customer's own deposits, withdrawals and transfers.
- Within the year: card payments and direct debits take money out.
- Within the year: each month the bank adds interest and takes fees.
- Within the year: statements read each account's history.

## Open

- **Q7, money that cannot go back** (transfer-failed, transfer-whole,
  closed-refuses, close-during-transfer). A customer transfers the whole £120
  of account 1001 into account 2002. The balance of 1001 is now zero, so the
  customer closes it, as close-during-transfer allows. Account 2002 was closed
  in the meantime, so the deposit is refused, and the £120 must go back into
  1001 (transfer-failed). But 1001 is closed, and a closed account refuses
  deposits (closed-refuses). Where does the £120 go, and what is the customer
  told? For example: the closed account takes it back, and then holds money;
  or the bank holds it for the customer and contacts them; or something else.
