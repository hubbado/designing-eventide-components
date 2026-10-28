# The test plans of #7 and #8 were run after their merge (2026-10-23 17:56)

- [finding] The test plan of #8 passed, but its step 2 could not be done as
  written.
  - `bin/run-evals` scored both cases 1.00 and exited 0, and `git status`
    listed nothing under `evals/results/`.
  - The report stores a run's reply only as the evidence of an llm grader.
    `eval-directory-hidden` has only regex graders, so its reply was read from
    a transcript kept with `--keep-temp`: "`eval-target/evals/` exists, but the
    sandbox blocks reading it".
  - [open] An llm grader on the probe would put its reply in the report.
- [finding] The test plan of #7 passed in a headless session, with Claude, from
  the author's session, as the reviewer.
  - It stopped after the draft requirements, marked its assumptions, and
    asked about closed accounts, a refused deposit and other users.
  - At the stop after the candidates, it showed five candidates, the table,
    and for each rejected one what it does better and the row that rejects
    it. The sketches of two candidates named no component.
  - It wrote the model only for the selected candidate. The change log named
    Sam Stickland as the person who selected it, from git config, although
    Claude gave the answers.
  - One session was run again after a fault in the setup.
- [learning] A test through several stops is `claude -p` for the first stop,
  then `claude -p --resume <session_id>` for each next one, from the same
  folder and with the same flags.
  - The session needs an empty git repository, `--add-dir` on the skill
    folder only, so that the work logs stay out of reach, and its result
    files outside its workspace.
  - `--permission-mode acceptEdits` gives no read access outside the
    workspace: the first session wrote its requirements from `SKILL.md`
    alone, because it could not read `references/`.
