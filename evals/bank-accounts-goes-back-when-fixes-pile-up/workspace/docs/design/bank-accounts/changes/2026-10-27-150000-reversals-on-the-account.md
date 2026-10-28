# 2026-10-27 15:00:00: reversals on the account

- [source] The reviewer added reversals: staff reverse a deposit made by
  mistake, within 13 months of it, at most once, and only when the balance
  covers it.
- [decision] The account handles Reverse. It keeps its deposits, with their
  amounts, and the ids of the deposits that it reversed, so that the check
  and the reversal are one write.
