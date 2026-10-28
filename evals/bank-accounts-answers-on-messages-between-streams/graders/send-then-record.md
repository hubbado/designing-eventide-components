---
type: llm
---
The reply says that, when the consumer stops after it sends Deposit and
before it writes DepositSent, it handles Withdrawn again when it starts, and
sends Deposit again, which the account ignores because it has taken that
deposit_id. It says that the other order, the record first, would lose the
deposit when the consumer stops between the two.
