# Bank accounts: requirements

## In brief

- A customer opens an account, deposits money into it, withdraws money from
  it, and closes it.
- An account refuses a withdrawal that its balance cannot cover, and the
  customer is told why. There is no overdraft.
- An account can be closed only when its balance is zero. A closed account
  refuses deposits and withdrawals, and is never opened again.
- A customer transfers money from one of their accounts into any account in
  the bank. The money is withdrawn from the source and deposited into the
  destination.
- When the withdrawal of a transfer is refused, the transfer is cancelled,
  and nothing is deposited.
- When the deposit of a transfer is refused, the money goes back into the
  source, and the transfer fails with the reason.
- Transfers are in a component of their own. The account takes deposits and
  withdrawals from any sender, and knows nothing of transfers, because card
  payments, direct debits, interest and fees will change balances within the
  year.

## Terms

- **Customer**: a person who holds accounts.
- **Account**: a customer's store of money, with a balance in pounds
  sterling.
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
- **Failed transfer**: a transfer whose deposit was refused after its
  withdrawal. The money goes back into the source.

## Keywords

Each requirement is a **MUST** or a **MUST NOT**: something that is built and
checked. A permission is written as what the system MUST let a person do.

## Component

### Accounts

- **open.** The system MUST let a customer open an account.
- **opens-empty.** An account MUST open with a balance of zero.
- **close.** The system MUST let a customer close an account.
- **close-when-empty.** An account MUST be closed only when its balance is
  zero.
- **closed-final.** A closed account MUST NOT be opened again.
- **closed-refuses.** A closed account MUST refuse deposits and withdrawals.
- **close-during-transfer.** The system MUST let a customer close an account
  while a transfer from it or into it is under way.

### Deposits and withdrawals

- **deposit.** The system MUST let a customer deposit money into an account.
- **withdraw.** The system MUST let a customer withdraw money from an
  account.
- **positive-amount.** A deposit or a withdrawal MUST be of an amount greater
  than zero.
- **no-overdraft.** A withdrawal MUST be refused when it is greater than the
  balance. A withdrawal of the whole balance is not refused.
- **once.** Each deposit and each withdrawal MUST change the balance at most
  once, however often it is asked for.

### Transfers

- **transfer.** The system MUST let a customer transfer money from one of
  their accounts into any account in the bank: the amount is withdrawn from
  the source and deposited into the destination.
- **transfer-cancelled.** When the withdrawal of a transfer is refused, the
  transfer MUST be cancelled, and nothing MUST be deposited into the
  destination.
- **transfer-returned.** When the deposit of a transfer is refused after its
  withdrawal, the money MUST go back into the source, and the transfer MUST
  fail with the reason.
- **transfer-whole.** When the flow settles, all the money of a transfer MUST
  be in the destination, or back in the source.

## Application

- **refusal-reason.** When a withdrawal is refused, the application MUST show
  the customer why.
- **transfer-reason.** When a transfer is cancelled or fails, the application
  MUST show the customer why.
- **not-same-account.** The application MUST NOT let a customer choose one
  account as both the source and the destination of a transfer.

## Out of scope

- Overdrafts. No account goes below zero.
- Other currencies. Every account is in pounds sterling.
- Card payments, direct debits, interest and fees. They come later, as other
  processes (Other users).
- Statements. They come later, and read each account's history.

## Other users

For the account and its balance:

- Today: the customer's own deposits, withdrawals and transfers.
- Within the year: card payments and direct debits, which take money out.
- Each month, later: interest, which the bank adds, and fees, which it takes.
- Later: statements, which read each account's history.

## Open

None.

## Design coverage

| Requirement | Kept by |
|---|---|
| open | Open: Opened |
| opens-empty | Opened: the account's balance starts at zero |
| close | Close: Closed |
| close-when-empty | Close: rejected with balance_not_zero |
| closed-final | Open: an account id is opened once (state guard) |
| closed-refuses | Deposit and Withdraw: rejected with closed |
| close-during-transfer | Close does not read transfers |
| deposit | Deposit: Deposited |
| withdraw | Withdraw: Withdrawn |
| positive-amount | The validation of Deposit and Withdraw |
| no-overdraft | Withdraw: rejected with insufficient_funds |
| once | Deposit and Withdraw: the reservation of deposit_id and withdrawal_id |
| transfer | Transfer, then Withdraw on the source and Deposit on the destination |
| transfer-cancelled | WithdrawalRejected: the transfer writes Cancelled, and sends no Deposit |
| transfer-returned | DepositRejected: the transfer sends the return Deposit to the source, then writes Failed |
| transfer-whole | Completed when the destination's deposit is made; ReturnSent and Failed when it is refused |

## Problems found

None yet. The scenarios are not yet walked.

## Model selected

Transfers in their own component. The account component holds one stream for
each account, which holds its balance and whether it is closed, so that each
check and its result are one write. It takes Deposit and Withdraw from any
sender. The transfer component holds one stream for each transfer, and
coordinates the transfer as a workflow: a withdrawal from the source, then a
deposit into the destination, or the return of the money to the source. It
was chosen because the account is afferent: card payments, direct debits,
interest and fees will change balances within the year, and none of them
needs the account to change.

The cost accepted: between the withdrawal and the deposit, the money is in
neither account. The transfer's stream records where it is.
