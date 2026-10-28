# 2026-10-26 00:00:00: draft requirements

- [source] The request: a customer opens an account, deposits, withdraws and
  closes it. A withdrawal that the balance cannot cover is refused, and the
  customer is told why. A transfer withdraws from one account and deposits
  into another. If the withdrawal is refused, the transfer is cancelled and
  nothing is deposited.
- [decision] Draft requirements written in `design.md`. Requirements not in
  the request are marked as assumptions: opens-empty, positive-amount, the
  no-overdraft reading, once, transfer-reason and transfer-whole.
- [decision] No rule for closed accounts is assumed. The request does not say
  what a closed account refuses; that is Q1.
