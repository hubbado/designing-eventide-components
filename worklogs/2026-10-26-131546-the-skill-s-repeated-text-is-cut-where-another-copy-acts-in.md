# The skill's repeated text is cut where another copy acts in time (2026-10-26 13:15)

- [decision] A copy of an instruction is cut when another copy says all of it, and the agent has that copy loaded at the same time or earlier.
  - A copy in a file that loads after the moment of action cannot act: rules.md, read at stage 2, told the agent to ask about "Other users", which stage 1 asks.
  - The cut is 259 words, about 1.2%: most repeats put an instruction in the file that is loaded when the agent acts.
- [rejected] Cutting the stops that Roles and each stage repeat. The entries of 23 Oct (11:15 and 17:19) show that the stops are where sessions fail.
- [rejected] Cutting the checklist items that repeat rules. A checklist works because it is in one place, and the fresh walk checks against it.
- [rejected] Cutting the void example from requirements-document.md. The requirements are written at stage 1, before rules.md is read.
- [rejected] Cutting the snapshot "Why, also" of "A component never reads another component's store". No other place records that hazard.
- [decision] No rule heading is renamed or merged, because an organisation's own rules name the skill's rules by their headings.
- [open] Reading each example file at the stage that uses it, not all of them before stage 1, would load about 2,300 fewer words at stage 1.
  - It changes what the agent sees first, so it waits for an eval.
- [open] No valid eval of the cuts exists yet: the comparison with master ran with the Haiku judge ("The stage-1 eval runs with the tool grant and the Sonnet judge").
