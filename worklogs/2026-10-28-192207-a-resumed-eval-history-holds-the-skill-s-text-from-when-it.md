# A resumed eval history holds the skill's text from when it was recorded (2026-10-28 19:22)

- [finding] A case that resumes a history tests the skill as the history
  holds it, and not the skill under test.
  - In the resumed runs of writes-the-model, the agent did not load SKILL.md
    or read rules.md again. The history held both from before PR 16.
  - So a change to the skill could not change the result: a run without
    PR 24 and a run with it gave the same models.
  - The earlier entry on PRs 15 to 22 had found the stale text, but not that
    it made the case blind to the skill.
- [decision] writes-the-model and asks-again-before-the-model start a fresh
  session. The prompt gives candidate A's sketch, as a reviewer who comes
  back in a new session would paste it.
  - The sketch names no events, so the agent names them under the current
    rules.
  - The skill records the candidates in the change log only after a
    selection, so the fixture cannot hold them.
  - skill-used is added to both cases.
- [finding] every-send-recorded passes in 3 of 3 fresh runs. It failed in 6
  of 6 resumed runs.
  - This replaces the open cause in "Shared fixtures for the bank-account
    evals". The resumed runs had argued that a derived id makes a second send
    harmless, from the rules before PR 16.
  - [rejected] A checklist item in SKILL.md for the record of each send. The
    fresh runs pass without it, so no failing run asked for it.
- [finding] The case cannot test PR 24. Without PR 24, the fresh runs read
  rules.md, and 3 of 3 still gave a bare Deposited to both the account and
  the suspense account.
  - The older paragraph, "an event about the whole entity is a bare verb",
    is enough here.
  - PR 24 came from two streams of one kind, an invoice share and a credit
    note share, where the prefix spread from the copies. The bank-account
    design has no such pair.
  - [rejected] Its grader, no-stream-name-on-its-own-events: it passed with
    the rule and without it.
  - [open] A test of PR 24 needs a design with two streams of one kind.
- [problem] In one run of asks-again-before-the-model, the judge call of
  waits-for-the-answer failed: Opus 5.5's safeguards flagged the message.
  - The cause was not looked into.
