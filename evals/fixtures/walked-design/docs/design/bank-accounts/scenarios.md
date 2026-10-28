# Bank accounts: scenarios

The scenarios that test `event-flows.yaml` against the requirements in
`design.md`.

## 1. A customer transfers money into another customer's account

The usual case, from start to finish. Alice opens an account and pays £100
into it, and Bob opens an account. Alice transfers £30 to Bob. The transfer
withdraws the money from Alice's account, deposits it into Bob's, and
completes. It tries to break no requirement.

Walked: 27 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Open | account_id A1, customer_id Alice | user |
| 2 | Opened |  | 1 |
| 3 | Deposit | account_id A1, deposit_id D1, amount £100.00 | user |
| 4 | Deposited | balance £100.00 | 3 |
| 5 | Open | account_id B1, customer_id Bob | user |
| 6 | Opened |  | 5 |
| 7 | Transfer | transfer_id T1, source A1, destination B1, amount £30.00 | user |
| 8 | Initiated |  | 7 |
| 9 | Withdraw | account_id A1, withdrawal_id T1, amount £30.00 | 8 |
| 10 | WithdrawalSent |  | 8 |
| 11 | Withdrawn | account_id A1, balance £70.00 | 9 |
| 12 | Deposit | account_id B1, deposit_id T1, amount £30.00 | 11 |
| 13 | DepositSent |  | 11 |
| 14 | Deposited | account_id B1, balance £30.00 | 12 |
| 15 | Completed |  | 14 |

**1–6.** Each account opens empty, and holds its own balance.

**7–10.** The transfer records the request, then sends the withdrawal to the
source and records that it sent it. The withdrawal's id is the transfer's id,
so the account takes it once.

**11–13.** The source has the money, so it withdraws it. The transfer handles
Withdrawn, sends the deposit to the destination, and records that it sent it.

**14–15.** The destination takes the deposit, and the transfer completes.

## 2. A transfer that the source cannot cover is cancelled

Alice has £20, and transfers £30. The source refuses the withdrawal, and the
transfer is cancelled with the account's reason. Nothing is deposited.

Tests: no-overdraft, transfer-cancelled. Walked: 27 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Open | account_id A1, customer_id Alice | user |
| 2 | Opened |  | 1 |
| 3 | Deposit | account_id A1, deposit_id D1, amount £20.00 | user |
| 4 | Deposited | balance £20.00 | 3 |
| 5 | Open | account_id B1, customer_id Bob | user |
| 6 | Opened |  | 5 |
| 7 | Transfer | transfer_id T1, source A1, destination B1, amount £30.00 | user |
| 8 | Initiated |  | 7 |
| 9 | Withdraw | account_id A1, withdrawal_id T1, amount £30.00 | 8 |
| 10 | WithdrawalSent |  | 8 |
| 11 | WithdrawalRejected | reason insufficient_funds, data "balance £20.00" | 9 |
| 12 | Cancelled | reason insufficient_funds | 11 |

**11–12.** The account decides from its own balance. The transfer copies the
reason and the data, so that the application can show the customer why
(transfer-reason). It sends no deposit.

## 3. The destination is closed, and the money goes back

Bob closes his account before Alice's transfer reaches it. The destination
refuses the deposit, the transfer sends the money back into Alice's account,
and the transfer fails with the destination's reason.

Tests: closed-refuses, transfer-returned, transfer-whole. Walked: 27 Oct,
holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Open | account_id A1, customer_id Alice | user |
| 2 | Opened |  | 1 |
| 3 | Deposit | account_id A1, deposit_id D1, amount £100.00 | user |
| 4 | Deposited | balance £100.00 | 3 |
| 5 | Open | account_id B1, customer_id Bob | user |
| 6 | Opened |  | 5 |
| 7 | Close | account_id B1 | user |
| 8 | Closed |  | 7 |
| 9 | Transfer | transfer_id T1, source A1, destination B1, amount £30.00 | user |
| 10 | Initiated |  | 9 |
| 11 | Withdraw | account_id A1, withdrawal_id T1, amount £30.00 | 10 |
| 12 | WithdrawalSent |  | 10 |
| 13 | Withdrawn | account_id A1, balance £70.00 | 11 |
| 14 | Deposit | account_id B1, deposit_id T1, amount £30.00 | 13 |
| 15 | DepositSent |  | 13 |
| 16 | DepositRejected | account_id B1, reason closed | 14 |
| 17 | Deposit | account_id A1, deposit_id R1, amount £30.00 | 16 |
| 18 | ReturnSent | return_id R1, reason closed | 16 |
| 19 | Deposited | account_id A1, balance £100.00 | 17 |
| 20 | Failed | reason closed | 19 |

**7–8.** Bob's balance is zero, so he can close the account.

**16–18.** The destination refuses the deposit, because it is closed. The
transfer sends the money back to the source, with R1, a UUID v5 of T1, as
the deposit's id, and records that it sent it.

**19–20.** The source takes the money back, and the transfer fails with the
destination's reason, so that the application can show the customer why.

## 4. The transfer's consumer stops between sending the deposit and recording it

The transfer's consumer stops after it sends the deposit to Bob's account,
and before it writes DepositSent. When it starts again, nothing records that
it handled Withdrawn, so it handles Withdrawn again, and sends the deposit a
second time. Bob's account ignores the copy, and the money is deposited once.

Tests: once, transfer-whole. Walked: 27 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Open | account_id A1, customer_id Alice | user |
| 2 | Opened |  | 1 |
| 3 | Deposit | account_id A1, deposit_id D1, amount £100.00 | user |
| 4 | Deposited | balance £100.00 | 3 |
| 5 | Open | account_id B1, customer_id Bob | user |
| 6 | Opened |  | 5 |
| 7 | Transfer | transfer_id T1, source A1, destination B1, amount £30.00 | user |
| 8 | Initiated |  | 7 |
| 9 | Withdraw | account_id A1, withdrawal_id T1, amount £30.00 | 8 |
| 10 | WithdrawalSent |  | 8 |
| 11 | Withdrawn | account_id A1, balance £70.00 | 9 |
| 12 | Deposit | account_id B1, deposit_id T1, amount £30.00 | 11 |
| 13 | Withdrawn | handled again, after the consumer starts again | 9 |
| 14 | Deposit | account_id B1, deposit_id T1, amount £30.00; ignored: deposit_id T1 is reserved | 13 |
| 15 | DepositSent |  | 13 |
| 16 | Deposited | account_id B1, balance £30.00 | 12 |
| 17 | Completed |  | 16 |

**11–12.** The transfer sends the deposit, and its consumer stops before it
can record that it sent it.

**13–15.** Nothing in the transfer's stream records that Withdrawn was
handled, so the consumer handles it again when it starts. It sends the
deposit again, with the same deposit_id, and this time records DepositSent.
The account ignores the second Deposit, because it reserved T1 when it took
the first (deposit-sent-twice). The transfer sends first and records second:
the other order, after a stop between the two, would record a deposit that
was never sent.

**16–17.** The destination took the first deposit, and the transfer
completes.

## 5. The source closes during a transfer, and the destination refuses it

Alice transfers her whole balance to Bob, and closes her account while the
transfer is under way. Bob's account is closed too, so it refuses the
deposit. The transfer sends the money back to Alice's account, which now
refuses it, because it is closed. The money is in no account.

Tests: close-during-transfer, transfer-whole. Walked: 27 Oct, found
[money-in-no-account].

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Open | account_id A1, customer_id Alice | user |
| 2 | Opened |  | 1 |
| 3 | Deposit | account_id A1, deposit_id D1, amount £30.00 | user |
| 4 | Deposited | balance £30.00 | 3 |
| 5 | Open | account_id B1, customer_id Bob | user |
| 6 | Opened |  | 5 |
| 7 | Close | account_id B1 | user |
| 8 | Closed |  | 7 |
| 9 | Transfer | transfer_id T1, source A1, destination B1, amount £30.00 | user |
| 10 | Initiated |  | 9 |
| 11 | Withdraw | account_id A1, withdrawal_id T1, amount £30.00 | 10 |
| 12 | WithdrawalSent |  | 10 |
| 13 | Withdrawn | account_id A1, balance £0.00 | 11 |
| 14 | Close | account_id A1 | user |
| 15 | Closed |  | 14 |
| 16 | Deposit | account_id B1, deposit_id T1, amount £30.00 | 13 |
| 17 | DepositSent |  | 13 |
| 18 | DepositRejected | account_id B1, reason closed | 16 |
| 19 | Deposit | account_id A1, deposit_id R1, amount £30.00 | 18 |
| 20 | ReturnSent | return_id R1, reason closed | 18 |
| 21 | DepositRejected | account_id A1, deposit_id R1, reason closed | 19 |
| 22 | ReturnRefused | reason closed | 21 |

**14–15.** The balance is zero after the withdrawal, so Alice can close the
account (close-during-transfer).

**21–22.** The source is closed, so it refuses the return. The transfer
records that the return was refused. The money is in no account, and the
application lists the transfer for staff, who pay it out by cheque
(money-in-no-account).
