# Afferent components take commands, and efferent components orchestrate (2026-10-22 20:22)

- [decision] Afferent and efferent have Robert C. Martin's meaning: the
  components that depend on a component, and the components that it depends
  on. Not Structured Design's flows of data into and out of a central
  transform.
- [decision] Sam Stickland: an afferent component is hard to change, because
  many things depend on it, so change in it is kept to a minimum. It takes
  commands, and does not handle other components' events: otherwise each new
  process that needs it to act would change it.
  - Eventide's example account component does this: it takes Deposit and
    Withdraw, and knows nothing of the funds transfer.
- [decision] Sam Stickland: an efferent component depends on many things, and
  nothing much depends on it, so it costs little to change. It tends to be an
  orchestrator, and a process goes there.
- [correction] The rule of the entry before, "A component that others depend
  on knows none of their processes", started from a process found inside a
  component, and made the afferent coupling a result of moving it out. It
  starts instead from the fact that many processes change the component. The
  rule is now "Afferent components take commands, and efferent components
  orchestrate them".
- [decision] Sam Stickland: the design looks a little into future
  requirements, to find whether a component is likely to take commands from
  many others. The requirements document gets "Other users". The design does
  not build for them.
  - Which components are afferent is a fact of the business. The test's
    requirements named only transfers, so the walks alone could not show that
    the account is afferent.
- [decision] A new stream's component is left out of the model until the
  walks are done. Sam Stickland rejected writing it with the first model,
  which answers the open item of the entry before.
  - The walks do not need the components: a handler decides only from the one
    thing that it writes, so no handler can read another stream's store.
- [open] An afferent component may depend on a component that is more
  afferent than itself (Martin's Stable Dependencies Principle), such as
  accounts that react to a customer component that everything depends on. Not
  agreed yet, and not in the rule.
