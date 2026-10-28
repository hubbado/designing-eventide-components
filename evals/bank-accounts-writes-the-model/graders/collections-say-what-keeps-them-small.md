---
type: llm
focus:
  source: file
  path: docs/design/bank-accounts/event-flows.yaml
---
For each collection that an entity keeps, such as the sums that the
suspense account still owes, a comment on its stream says what keeps the
collection small, such as each entry dropped when it is paid. A collection
whose growth ends only when a person acts can instead have a comment that
names its problem in Problems found, by its id. A collection with no such
comment fails. A model whose entities keep no collection passes.
