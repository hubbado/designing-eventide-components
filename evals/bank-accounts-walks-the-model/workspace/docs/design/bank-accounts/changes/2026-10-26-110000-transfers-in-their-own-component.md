# 2026-10-26 11:00:00: transfers in their own component

- [decision] The reviewer selected candidate A, transfers in their own
  component.
- The candidates:
  - **A, transfers in their own component.** `account` streams in the
    account component; `transfer` streams in a transfer component, which
    sends Withdraw and Deposit and handles the account's events.
  - **B, transfers in the account component.** The same streams, but the
    transfer's handlers are in the account component.
  - **C, transfers in the account stream.** No transfer stream. The source
    account records the transfer, and sends the Deposit to the destination.
- The table:

  | Requirement | A | B | C |
  |---|---|---|---|
  | no-overdraft: a withdrawal greater than the balance is refused | inside one stream | inside one stream | inside one stream |
  | transfer-whole: the money is in the destination, or back in the source | across streams: a workflow of 3 steps | across streams: a workflow of 3 steps | across streams: a workflow of 2 steps |
  | Other users: card payments, direct debits, interest and fees | the account needs no change | each new process adds handlers to the account component | each new process adds commands and state to the account stream |
  | not-same-account: one account is not both the source and the destination | the app only | the app only | the app only |

- [rejected] B. It keeps the handlers of a transfer next to the account, so a
  change to transfers is released with the account. Each new process that
  moves money would add its own handlers to the account component, which
  Other users makes afferent.
- [rejected] C. It needs no transfer stream, and one step less. But the
  account gets transfer commands and events, and a list of its transfers in
  progress, which no other user of the account needs.
