# Evals for the rules and panels of PRs 15 to 22 (2026-10-28 07:54)

- [decision] Seven bank-account cases test PRs 15 to 22, from a design with
  five walked scenarios and one accepted problem.
- [finding] The written model of one run sends four commands with no …Sent
  record (PR 16), and asks the reviewer about it.
  - The history file holds the skill's text from before PR 16.
  - The example's RemoveFromPurchaseOrder records its send as
    RemovedFromPurchaseOrder, not …Sent.
- [finding] Questions about a design loaded the skill in 1 of 2 runs. The
  run without it said that two writers of one stream do not conflict.
- [finding] `claude plugin eval` refuses `..` in history_file, and exits 0
  when --case matches nothing. --case takes no brace glob.
- [finding] The harness runs a scaffold from inside its copy of evals/, so a
  shared fixture folder would work.
- [finding] The Opus judge gave the same verdicts on 30 KB panel files in
  every vote, although the harness warns that long files are noisy.
- [open] Shared fixtures and graders, built by bin/run-evals.
