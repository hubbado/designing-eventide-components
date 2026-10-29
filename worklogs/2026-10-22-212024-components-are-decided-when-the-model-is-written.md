# Components are decided when the model is written (2026-10-22 21:20)

- [finding] A second headless session, with the skill of this branch, got the
  same request for bank accounts as the first.
  - It recorded "Other users" as its own expectations, such as card payments,
    direct debits and interest, and asked the reviewer to confirm them.
  - It added "Other users" as a row in the comparison table: a new process
    moves money with no change to the account. That row decided between the
    candidates.
  - It chose an afferent account component and an efferent transfer component,
    and asked the reviewer whether the components were divided correctly.
  - It wrote the model, with a component on every stream, before it walked any
    scenario, although the skill then said to leave the components out until
    the walks were done.
  - Its first reply took 35 model turns.
- [problem] The test was circular. The rule's Why tells of an account that
  held transfers, and the agent rejected that design by citing the Why: "records
  this exact cost". It shows that the agent applies the rule, not that the rule
  works where its Why does not give the answer.
  - [open] A test in a domain that the Why does not describe.
- [correction] The entry before left the components out of the model until the
  walks were done. Sam Stickland: the components are decided by the time of the
  walks; his point was that the process is understood before components are
  decided and named.
  - So the components are decided when the model is written, after the
    requirements and "Other users", and the couplings are read again after the
    walks.
  - An instruction that the agent does not follow is worse than none: the
    documents then claim an order of work that did not happen.
