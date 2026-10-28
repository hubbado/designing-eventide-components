# 2026-10-27 17:00:00: the account's lists of deposits

- [finding] A walk of an account that takes a salary each month: the list of
  deposits grows for the life of the account (reversible-deposits-grow).
- [decision] The projection drops each deposit older than 13 months.
- [finding] A second walk: the ids of the reversed deposits grow in the same
  way (reversed-ids-grow).
- [decision] The projection drops a reversed id 13 months after its deposit.
  A Reverse of an older deposit is refused as unknown_deposit.
