# The stage-1 eval runs with the tool grant and the Sonnet judge (2026-10-26 13:15)

- [finding] `bin/run-evals` passed no `--allow-tools`, so no run could write `design.md`, and requirements-written failed in every run.
- [finding] The harness's default judge is Haiku, which failed replies that met their criteria in 6 of 9 runs.
  - The trial of 23 Oct (12:55) passed `--model claude-opus-5-5 --judge-model claude-sonnet-5-5`, but its entry did not record the flags.
  - With Sonnet, every check except the two below passed in 24 of 24 runs.
- [decision] `bin/run-evals` grants Write, Edit and Bash, judges with `sonnet`, and runs no ablation arm.
  - `sonnet` is an alias, so the judge floats; it resolved to claude-sonnet-5-5.
  - [rejected] The ablation arm, which runs each case with no skill too. It takes twice the runs, and no criterion compares the two arms.
  - [rejected] A fixed agent model. The default was Opus 5.5, and the skill is used with whatever model its user runs.
- [finding] waits-for-the-reviewer still checked two behaviours, one of them the place of a sentence: "The reply ends by asking…".
  - The judges failed 3 of 12 replies that asked for the answers, but ended with a promise or a note on git.
  - One verdict for both parts hid which part failed, until a separate judge was asked for its reason.
- [decision] waits-for-the-reviewer checks only that the reply asks, in any place; no-candidates-yet checks that it presents no candidate model.
  - Both were checked against 19 replies whose verdict was known.
  - A promise that named the candidates passed, until the criterion said "if it names none of them".
- [open] Claude Code is now 2.1.310, and the trial ran on 2.1.309, so the harness's judge prompt can have changed.
