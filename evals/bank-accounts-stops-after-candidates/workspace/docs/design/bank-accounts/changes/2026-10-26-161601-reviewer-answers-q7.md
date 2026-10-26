# 2026-10-26 16:16:01: the reviewer's answer to Q7

- [source] The reviewer: the suspense account is kept in this system. The bank must
  know each sum in it on its own: whose it is, and which transfer it came
  from. The staff pay a sum out whole, into another account of the customer
  in this bank, and the system records that payment as a withdrawal from the
  suspense account. The suspense account is never closed and never refuses
  money. Only failed transfers put money into it.
- [source] The reviewer: a failed transfer shows in the source's history as the money
  going out and coming back.
- [source] The reviewer confirmed the assumptions unknown-refuses, suspense-accepts
  and suspense-owed.
- [decision] New requirements: suspense-kept, suspense-only-failed, payout,
  transfer-history. suspense-owed is reworded in the reviewer's words. New term:
  payout.
- [decision] New assumptions, marked in `design.md`: payout-once and
  payout-refused. payout-refused follows transfer-returned: a sum whose
  deposit is refused goes back to where it came from, and the suspense
  account never refuses. The reviewer is asked to confirm them.
