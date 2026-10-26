# Bank accounts: requirements

Draft. No candidate model yet.

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
  source, and the transfer fails. If the source refuses it too, the money goes
  into the bank's suspense account.
- The bank's staff pay each sum out of the suspense account, whole, into
  another account of the customer in this bank.
- A customer can close an account while a transfer from it or into it is
  under way.

## Terms

- **Customer**: a person who holds accounts.
- **Account**: a customer's store of money, with a balance in pounds sterling.
- **Balance**: the money in an account: its deposits less its withdrawals.
- **Deposit**: money put into an account.
- **Withdrawal**: money taken out of an account.
- **Refused**: a deposit or a withdrawal that has no effect on the balance,
  with a reason.
- **Closed account**: an account that its customer has closed. It is closed
  for good.
- **Transfer**: money moved from one account (the source) to another (the
  destination), by a withdrawal from the source and a deposit into the
  destination.
- **Cancelled transfer**: a transfer whose withdrawal was refused. Nothing is
  deposited.
- **Failed transfer**: a transfer whose deposit was refused. Its money goes
  back into the source, or into the suspense account.
- **Suspense account**: the bank's own account for the money of failed
  transfers that the source refused to take back. It holds each such sum on
  its own.
- **Payout**: the bank's staff paying one sum out of the suspense account,
  whole, into another account of the customer in this bank.

## Keywords

Each requirement is a **MUST** or a **MUST NOT**: something that is built and
checked. A permission is written as what the system MUST let a person do.

## Requirements

Marked *(assumption)*: not in the request or the reviewer's answers.

### Accounts

- **open.** The system MUST let a customer open an account.
- **opens-empty.** An account MUST open with a balance of zero.
- **sterling.** Every account, deposit, withdrawal and transfer MUST be in
  pounds sterling.
- **close.** The system MUST let a customer close an account.
- **close-empty.** An account MUST NOT be closed while its balance is not
  zero.
- **close-during-transfer.** The system MUST let a customer close an account
  while a transfer from it or into it is under way.
- **closed-for-good.** A closed account MUST NOT be opened again.
- **closed-refuses.** A closed account MUST refuse deposits and withdrawals.
- **unknown-refuses.** *(assumption)* An account that was never opened MUST
  refuse deposits and withdrawals, as a closed account does.

### Deposits and withdrawals

- **deposit.** The system MUST let a customer deposit money into an account.
- **withdraw.** The system MUST let a customer withdraw money from an account.
- **positive-amount.** A deposit or a withdrawal MUST be of an amount greater
  than zero.
- **no-overdraft.** A withdrawal MUST be refused when it is greater than the
  balance. A withdrawal of the whole balance is not refused; there is no
  overdraft.
- **refusal-reason.** When a deposit or a withdrawal is refused, the customer
  MUST be told why.
- **once.** Each deposit and each withdrawal MUST change the balance at most
  once, however often it is asked for.

### Transfers

- **transfer.** The system MUST let a customer transfer money from one of
  their accounts into any account in the bank: the amount is withdrawn from
  the source and deposited into the destination.
- **not-same-account.** The source and the destination of a transfer MUST NOT
  be the same account. The reviewer: the app does not let the customer choose
  it.
- **transfer-cancelled.** When the withdrawal of a transfer is refused, the
  transfer MUST be cancelled, and nothing MUST be deposited into the
  destination.
- **transfer-returned.** When the deposit of a transfer is refused, its money
  MUST be deposited back into the source, and the transfer MUST fail.
- **transfer-suspense.** When the source refuses the money of a failed
  transfer, the money MUST be put into the suspense account.
- **transfer-reason.** When a transfer is cancelled or fails, the customer
  MUST be told why. When its money is put into the suspense account, the
  customer MUST be told that the bank's staff will pay it out.
- **transfer-whole.** When the flow settles, the money of a transfer MUST be
  in exactly one place: the destination, the source, or the suspense account.
- **transfer-history.** A failed transfer MUST show in the source's history
  as the money going out and coming back.

### Suspense account

- **suspense-kept.** The suspense account MUST be kept in this system.
- **suspense-only-failed.** Only the money of failed transfers MUST go into
  the suspense account.
- **suspense-accepts.** The suspense account MUST NOT refuse money, and MUST
  NOT be closed.
- **suspense-owed.** The system MUST know each sum in the suspense account on
  its own: the customer whose it is, and the transfer that it came from.
- **payout.** The system MUST let the bank's staff pay a sum out of the
  suspense account, whole, into another account of the customer in this bank.
  The payout MUST be recorded as a withdrawal from the suspense account.
- **payout-once.** *(assumption)* Each sum MUST be paid out at most once.
- **payout-refused.** *(assumption)* When the account that the staff chose
  refuses a payout, the sum MUST stay in the suspense account, still owed,
  and the staff MUST be told why.

## Out of scope

- Card payments, direct debits, interest and fees: later processes, below.
- Statements: a later reader of each account's history.
- Overdrafts and other currencies.

## Other processes

For an account and its balance, as the reviewer knows them:

- Now: only the customer's own deposits, withdrawals and transfers.
- Within the year: card payments and direct debits will take money out.
- Within the year: each month, the bank will add interest and take fees.
- Within the year: statements will read each account's history.

## Open

- **Assumptions to confirm**: payout-once, payout-refused.
