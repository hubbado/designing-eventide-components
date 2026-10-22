# Each rule gives one example of the problem that it prevents (2026-10-22 17:10)

- [decision] Each rule's **Why** gives one example of a problem that the rule
  prevents, told in general nouns. Sam Stickland: an agent works better when
  it understands the reasons behind an instruction.
  - The check against the source guide found that most of its 13 losses were
    reasons, and that a change of meaning came in where a reason had gone:
    domain failures had been merged into rejections.
  - [open] This is not measured. No test compares the designs that the skill
    makes with and without the examples.
- [problem] An example can also mislead an agent, in four ways:
  - a second lesson in it reads as a second rule that nobody agreed;
  - when it is wider or narrower than its rule, the agent follows its limits,
    not the rule's;
  - when it repeats what the Why already says, it only costs context, in a
    file of more than 800 lines;
  - the details of its fix are copied where they do not apply.
- [decision] So each rule gets one example, within the rule's scope, with one
  lesson and without the details of its fix. CONTRIBUTING.md says so.
- [decision] An example comes from a problem that a source records: a work
  log, a design's change log or a plan. None is invented. A proposal that a
  review stopped is not added when the Why already says what it shows.
- [decision] Four rules gained an example: "Reason about the entity", "Every
  handler is idempotent", "Name attributes within their message", and domain
  failures. The "complete" example lost the sentence that said how the
  handler was fixed.
- [decision] The two rules added the same day were trimmed by the same test.
  "An entity takes a recorded value from its event" lost the details of how
  the older streams were shaped. "Give at once what is known at once" kept the
  totals that stayed in the projection, and lost a second case: a cancel that
  arrived between a line and the issue.
- [rejected] Examples for "A screen action can send several commands" and "A
  command's own attributes are checked by its validation". Both were
  proposals that a review stopped, and each Why already says what they show.
- [rejected] An example for "Stop the line on incoming data that is wrong".
  Its data could be read but was wrong, which is outside the rule, and it
  could lead an agent to guard incoming events.
- [rejected] A second example for the idempotence rule, a state check that a
  void made blind. It is the lesson of the reservation, already in the rule.
- [rejected] A sentence in the attribute-naming example saying that a copied
  value is named for its fact. It is a rule hidden in a Why.
- [open] "A screen action can send several commands", the validation rule and
  "Stop the line" have no recorded problem yet. Add one when one happens.
