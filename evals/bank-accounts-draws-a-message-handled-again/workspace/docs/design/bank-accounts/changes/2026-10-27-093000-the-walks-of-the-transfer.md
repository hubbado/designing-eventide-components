# 2026-10-27 09:30:00: the walks of the transfer

- [finding] Scenario 5: a customer closes the source after the transfer's
  withdrawal, the destination refuses the deposit, and the closed source then
  refuses the return. The money is in no account.
- [source] The reviewer accepted it: staff pay the money out by cheque,
  outside the system. Card payments and direct debits will make it rarer
  still, because a customer seldom closes an account that they use.
- [decision] The transfer writes ReturnRefused when the source refuses the
  return, and the application lists such transfers for staff.
  transfer-whole now names a return that the source refused, and
  refused-returns-listed is new.
- [rejected] A suspense account inside the system, to hold the money until
  staff pay it out. It adds a stream and a payout flow for a case that the
  bank expects a few times a year.
- [finding] Scenario 4: the transfer's consumer stops after it sends the
  deposit, and before it writes DepositSent. It handles Withdrawn again, and
  sends the deposit again. The account ignores the copy, because its
  deposit_id is reserved (deposit-sent-twice).
- [finding] A fresh session walked every scenario again from the documents
  alone, and found nothing more.
