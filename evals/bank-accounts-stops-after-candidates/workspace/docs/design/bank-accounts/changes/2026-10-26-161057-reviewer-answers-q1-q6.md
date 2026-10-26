# 2026-10-26 16:10:57: the reviewer's answers to Q1 to Q6

- [source] The reviewer answered Q1 to Q6 and confirmed every
  assumption of the draft: opens-empty, positive-amount, the no-overdraft
  reading, once, transfer-reason and transfer-whole.
- [source] Q1: a closed account refuses deposits and withdrawals. An account
  can be closed only when its balance is zero. A closed account is never
  opened again. New requirements: close-empty, closed-for-good,
  closed-refuses. "Refused" now covers deposits as well as withdrawals, and
  refusal-reason with it.
- [source] Q2: when a deposit of a transfer cannot be made, the money goes
  back into the source and the transfer fails, with the reason, and the
  customer is told why. If the source cannot take it back, because it was
  closed in the meantime, the money goes into the bank's suspense account,
  and staff pay it out by hand. New terms: failed transfer, suspense account.
  New requirements: transfer-returned, transfer-suspense. transfer-reason
  and transfer-whole are reworded: the money of a transfer ends in the
  destination, the source, or the suspense account.
- [source] Q3: the bank does not stop a customer from closing an account
  while a transfer is under way. New requirement: close-during-transfer.
- [source] Q4: a transfer can go into any account in the bank. The source and
  the destination cannot be the same account; the app does not let the
  customer choose that. New requirement: not-same-account. Where it is kept
  is a decision of the model.
- [source] Q5: recorded in "Other processes".
- [source] Q6: every account is in pounds sterling. New requirement:
  sterling.
- [decision] New assumptions, marked in `design.md`: unknown-refuses,
  suspense-accepts, suspense-owed.
- [finding] Q2 leaves open whether the payout from the suspense account is
  recorded in the system, and how it is paid. If it is not recorded, the
  suspense account's balance would go on showing money that has been paid.
  Asked as Q7 before any candidate model.
