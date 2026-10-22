# Components are decided from the design, by their couplings (2026-10-22 20:03)

- [decision] The choice of components is part of the skill. Sam Stickland:
  only the outcomes of the design and its walks decide it. To decide the
  components or the streams before the process is understood causes problems.
- [finding] A new headless Claude Code session, with only its user's own
  instructions, designed bank accounts from a request that named no
  components: open, deposit, withdraw, close, and transfer to another account.
  - It compared four models. One was the shape of Eventide's example account
    and funds transfer components. It selected one account stream that holds
    the transfers from it, so the skill's rules decided the shape, not a
    memory of Eventide's example.
  - Its reason against a stream for the transfer rested on a requirement that
    it had drafted itself: a closed account refuses deposits.
  - The account then had transfer commands and events, a list of its
    transfers in progress, a transfer's id on its deposit, and a guard so that
    a deposit from another sender could not end a transfer.
  - It put the component choice to the reviewer as its first question.
  - The first turn cost $10 and 92 model turns, most of them in two
    fresh-context checks and the edits after them.
  - The session used the skill at 6525fd6, before the four pull requests
    merged later that day.
  - [open] One run, in one domain. A second run can choose differently.
- [decision] Rule "A component that others depend on knows none of their
  processes". Sam Stickland: use the terms afferent and efferent coupling,
  and define them.
  - The signs of a process inside a component that others use are messages,
    attributes or state that only one of its users needs.
  - [rejected] Counts of couplings and instability numbers. In a design with
    one component there is no coupling to count; the signs are in what the
    component knows.
- [decision] The model names each stream's component when it is written. The
  couplings are read again after the walks, and each boundary goes to the
  reviewer.
  - The walks need the components, to check that no component reads another
    component's store.
  - [open] Sam Stickland has not yet reviewed this placement.
- [rejected] A fixed order of design: the streams that need one write first,
  with a stop for review before the protocols. Sam Stickland: too
  prescriptive; the order follows the pressure that the requirements give.
  - In the test, the transfer changed the account's own rules: an account
    cannot close while a transfer from it is in progress. A stop after the
    account would have made it look settled when it was not.
