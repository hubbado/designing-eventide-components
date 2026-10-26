# Evals for stages 2 and 3 of the bank-account design (2026-10-26 14:53)

- [decision] Four cases test stages 2 and 3. Each starts from a design that an
  earlier session wrote.
  - bank-accounts-asks-what-the-answers-leave-open: the stage-1 draft, with
    the reviewer's answers as the prompt.
  - bank-accounts-stops-after-candidates: the same, with one more answer that
    settles the case that the other answers leave open.
  - bank-accounts-asks-again-before-the-model: a resumed session that stopped
    after the candidates. The reviewer selects A and answers nothing else.
  - bank-accounts-walks-the-model: a selected model, with a comment that says
    that the return of a transfer's money to the source cannot be refused.
- [finding] A case can start at a later stage in two ways.
  - `context.scaffold_script` copies files into the workspace. The harness
    runs it only with `--scaffold`, which `bin/run-evals` now passes.
  - `context.history_file` resumes a saved transcript, and the case's prompt
    is the next turn. The transcript holds the skill's text as it was when it
    ran, and the PATH of the machine that ran it.
  - [decision] A history file only where the state is in the conversation and
    not in a file: the candidates exist only in the conversation until the
    reviewer selects one.
  - [rejected] A history file for every case. Each case would test the
    skill's old text until its transcript is made again.
- [finding] `file_exists` sees only the files that the run created, not the
  files that the scaffold put in place or that the run changed.
- [finding] The harness's judge answers in one word, with no reasoning.
  - On long files and long replies, it failed outputs that met the criterion,
    in all three votes. A Sonnet judge that gave its reason passed them.
  - [decision] A check of a long file that a pattern can make is a regex
    grader: first-scenario-names-no-tests and components-put-to-the-reviewer.
  - Words of place failed again, as on 26 Oct (13:15): "stops there" and "or
    after it" were read as places in the reply.
  - A replay case, in which Haiku sends a stored reply word for word, tests a
    criterion against the real judges for about $0.10 a reply.
- [finding] In 6 of 6 runs whose answers allowed it, the skill found from the
  answers alone that a transfer's money can end in no account. The source is
  closed, empty, after the withdrawal, and then the destination refuses the
  deposit.
  - 5 of the 6 runs asked about it before any candidate. The other showed
    the candidates with the question, and its table said of the ledger
    candidate "Q7 cannot happen".
  - [open] Whether the skill says to ask a new question that can change a
    stream before any candidate, as in stage 1. The entry of 23 Oct (14:04)
    rejected one more stop for the changed requirements. This is a new
    question, not a changed requirement.
- [finding] At the stop after the candidates, in 4 of 4 replies:
  - some rows of the table give only an id, although the same reply gave the
    requirement's words above the table;
  - the sketch of a candidate with one component names no component.
  - [open] Whether a row of the table needs the words beside its id when the
    same reply gives them above it.
- [finding] The cell words have no word for a candidate that cannot keep a
  requirement, or in which the requirement does not arise. Each reply made
  its own, such as "breaks one of them", "never needed" and "does not arise".
  - [open] Two more cell words, or free words for such cells.
- [finding] The stage-3 case found the money in no account in 4 of 4 runs,
  recorded it in Problems found, and told the reviewer in full.
  - Each run had a sub-agent walk the scenarios again. The Agent tool needs no
    grant in the harness.
  - The walks also found two faults in the fixture that were not planted: a
    Close of an account that was never opened, and a transfer of £0.00.
- [finding] A stage-2 run cost $0.50 to $1.40, a resumed run $0.25, and a
  stage-3 run $2.60 to $3.70 in 10 to 12 minutes. The work cost about $31.
- [open] Stage 4, the panels, has no case.
