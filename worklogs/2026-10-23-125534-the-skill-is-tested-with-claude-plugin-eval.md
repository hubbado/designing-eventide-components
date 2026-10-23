# The skill is tested with claude plugin eval (2026-10-23 12:55)

- [decision] The skill's evals run with `claude plugin eval` (Claude Code
  2.1.309).
  - Each run is a `claude -p` child in an empty workspace, with no CLAUDE.md,
    memory, settings or other skills. That removes the contamination of the
    bank-account runs, which read the work logs.
  - [rejected] skill-creator's eval loop. Its runs are sub-agents of the
    author's own session, so they see that session's CLAUDE.md and files, and
    the model performs the loop again each time, so the harness itself varies.
  - Two gaps: no scripted turns or simulated reviewer, and no grader that runs
    a script. The reviewer's hidden facts become a stage's grader criteria, and
    its answers become the next stage's prompt.
- [decision] `evals/` lives at the repository root, outside the skill folder,
  and the repository is not a plugin.
  - Sam Stickland: evals in the skill folder would ship with every install.
  - [rejected] A `plugin.json` at the root. It makes the whole repository,
    work logs and evals included, installable as a plugin.
  - `bin/run-evals` builds a plugin in a temporary folder for each run, with a
    copy of the skill and of `evals/`, and nothing else.
- [finding] The harness hides the eval directory. An agent told to list the
  plugin's folders saw that `evals/` exists, and `ls` gave "Operation not
  permitted" inside it. The case `eval-directory-hidden` checks this, because a
  later version of Claude Code can change it.
- [finding] The stage-1 case for bank accounts passed in 12 runs of 12 on
  every check that the skill decides: it wrote `design.md`, wrote no model and
  no scenarios, asked about closed accounts, a refused deposit and other
  users, listed its assumptions, and waited for the reviewer.
  - A run of stage 1 cost about $0.37 and 70 seconds, in 7 or 8 turns, with
    Opus 5.5 as the agent and Sonnet 5.5 as the judge. The whole trial cost
    $5.49.
- [problem] The case is not a clean test of the questions. The skill's own
  text now names a closed account twice, in the example under Roles and in the
  questions of stage 1, and the rule's Why tells of accounts and transfers.
  - [open] A stage-1 case in a domain that the skill's text does not describe.
- [finding] Three of the 60 llm verdicts failed a reply that did what the
  skill asks. Each criterion checked more than one thing, or a surface word: a
  reply that named a command in a question to the reviewer, and requirement
  ids in code format read as commands.
  - [decision] An llm criterion checks one behaviour, in the words of what the
    reviewer needs. What the files show is left to the file graders.
- [finding] `git` does not run in the eval sandbox, so a run commits nothing.
- [finding] `claude plugin eval` exits 1 when a case scores below the
  threshold. Read its exit code directly: through a pipe, the first trial
  reported 0.
- [open] A `history_file` case for stage 2. The trial did not try one; a
  stage-1 run with `--keep-temp` gives a transcript to try.
