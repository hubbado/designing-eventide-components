# Each rule gives one example of the problem that it prevents (2026-10-22 17:10)

- [decision] Each rule's **Why** gives one example of the problem that the
  rule prevents, in general nouns. Sam Stickland: an agent works better when
  it understands the reasons behind an instruction.
  - The check against the source guide found that most of its losses were
    reasons, and a change of meaning came in where a reason had gone.
- [decision] An example stays within the rule's scope, has one lesson, and
  leaves out the details of its fix. A second lesson reads as a second rule.
  CONTRIBUTING.md says so.
- [decision] Four rules gained an example from a recorded problem: "Reason
  about the entity", "Every handler is idempotent", "Name attributes within
  their message", and domain failures.
- [rejected] Examples for "A screen action can send several commands" and "A
  command's own attributes are checked by its validation". Both were
  proposals that a review stopped, and each Why already says what they show.
- [rejected] An example for "Stop the line on incoming data that is wrong".
  Its data could be read but was wrong, which is outside the rule, and it
  could lead an agent to guard incoming events.
- [rejected] A second example for the idempotence rule, a state check that a
  void made blind. It is the lesson of the reservation, already in the rule.
- [rejected] A sentence in the attribute-naming example that a copied value is
  named for its fact. It is a rule hidden in a Why.
- [open] "A screen action can send several commands", the validation rule and
  "Stop the line" have no recorded problem yet. Add one when one happens.
