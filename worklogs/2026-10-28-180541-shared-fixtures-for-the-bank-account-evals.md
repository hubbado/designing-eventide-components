# Shared fixtures for the bank-account evals (2026-10-28 18:05)

- [decision] Eight bank-account cases take their design from one of two
  shared fixtures in `evals/fixtures/`.
  - `walked-design`: six cases, the five that start from the walked design
    and goes-back-when-fixes-pile-up.
  - `requirements-answered`: writes-the-model and asks-again-before-the-model.
  - goes-back-when-fixes-pile-up keeps only what it adds: two later changes,
    and its own design.md and event-flows.yaml. Its scaffold copies them
    after the fixture.
- [finding] A scaffold that copies `../fixtures/<name>` works in the harness.
  - The harness runs the scaffold from inside its copy of `evals/`.
  - One run each of reverses-an-old-deposit, goes-back-when-fixes-pile-up
    and writes-the-model read their designs.
- [rejected] Shared graders by relative symlinks.
  - Sam Stickland: "I'd rather not introduce symlinks without careful
    thought."
  - [open] Shared graders. `evals-hidden.md` has 12 identical copies and
    `skill-used.md` has 10.
- [finding] walks-the-model, stops-after-candidates and
  asks-what-the-answers-leave-open keep their own workspaces.
  - They share some change notes with the fixtures, but each has a design of
    its own.
- [problem] every-send-recorded failed on writes-the-model.
  - It is the first run since the grader accepts the outcome event in place
    of `…Sent`.
  - The cause was not found: the run's files were not kept.
  - [open] A run with `--keep-temp`, to tell a model that sends with no
    record from a wrong regex.
- [problem] more-than-one-candidate failed on reverses-an-old-deposit, with
  FAIL in all three votes. It passed in the 07:34 run.
  - The reply says that it gives three ways to model reversals.
  - The cause was not found: the stored evidence stops before the candidates.
