---
type: llm
---
In the candidate that the reply recommends, the account component decides
whether an account's balance covers a withdrawal. The transfer component
sends Withdraw for each transfer, and does not refuse a transfer from its own
copy of an account's balance. A check of a copy that only warns the customer
early, such as in the application, and still lets the account decide,
passes. A recommended candidate in which the transfer component refuses a
transfer, or does not send Withdraw, because of its copy of the balance
fails.
