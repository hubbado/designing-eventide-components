# A breach by a sender's invalid command is the sender's (2026-10-23 17:36)

- [correction] The entry of 17:19 said that the agent's acceptance of
  sender-skips-validation, a deposit of -80.00 that takes the balance below
  zero, went against the skill. It did not. The skill supports it in three
  places:
  - The rule "A command's own attributes are checked by its validation": such
    a check is "the command's validation, at the sender, not a refusal by its
    handler… An invalid command never reaches the command stream."
  - Stage 3: "When a walk breaks only because another component broke its own
    rule, name the component that owns the rule. That is its responsibility,
    not a reason for a guard here." The agent wrote: "The sender owns its
    validation, so I put no guard in the account."
  - The rule "Stop the line on incoming data that is wrong" is for a handler
    that "cannot read a message, because a value that it needs is missing or
    in a form that it does not know". A handler can read -80.00.
- [decision] The line "stop the line, when the cause is wrong incoming data"
  is taken out of stage 3's choices again. It rested on the wrong reading, and
  it pulled against the validation rule. Sam Stickland agreed.
- [open] The requirements document says "The component keeps its
  requirements whoever sends the command". Stage 3 makes a breach that another
  component's broken rule causes that component's responsibility. A reader
  can follow either one, as the 17:19 entry did.
