# Stage 1 settles the requirements before any candidate (2026-10-26 18:18)

## The loop of questions

- [decision] Stage 1 is a loop. When the reviewer answers, the agent reads the
  answers together, asks about each case that they leave open, and stops
  again. Stage 2 starts when no such question is open, or when the reviewer
  says to leave one in Open and go on.
  - Sam Stickland: finding these gaps and asking about them is "precisely
    what I want to happen before the AI has even thought about what the
    possible structure might be".
  - [rejected] The same stop at the start of stage 2, where it was first
    written. The agent had read the rules of structure by then.
  - [rejected] Taking the stop out, which was recommended after it took three
    rounds to reach the candidates. Those rounds are the requirements work.
- [finding] Each answer can add a step with a gap of its own.
  - The return of a transfer's money, then the suspense account, then the
    payout from it: each had its own case of an account closed meanwhile.
  - With one round of answers, 0 of 3 runs reached the candidates. After a
    second round, 1 of 3 did.
- [finding] In 3 of 3 runs the agent went on when the reviewer said to leave
  a question in Open. The sentence was changed with no failing spec, because
  it contradicted the reviewer's decision.

## Other processes

- [decision] "Other users" is renamed "Other processes".
  - Sam Stickland: "users" reads as people, but these are other systems.
  - [rejected] "Other systems": a later process can be a component in the
    same system.
  - [rejected] "Other components": stage 1 names no component.
- [decision] A question that only a later process needs goes beside that
  process in Other processes, for its own design, and is not asked now.
  - One reply had asked about interest after a close, and card payments below
    zero.

## The candidates table

- [decision] Each cell starts with one of six exact phrases. "cannot keep
  it" and "does not arise" are new.
  - Sam Stickland: different words in each design make it hard for a
    reviewer to judge many components. The same phrases give clear,
    repeatable communication, and a table that is quick to scan.
  - [rejected] Short forms that the reply's legend defines, such as "one
    stream".
- [decision] A row gives its requirement's words or a short form. A
  requirement that every candidate keeps in the same way goes under the table
  by id. Each stream of a sketch has a line that starts with its name and its
  component.
- [finding] In 3 runs on the final text:
  - 2 of 3 tables varied "a workflow of N steps", as "up to 4" and "1 more
    step", where the steps depend on the path;
  - 1 of 3 gave a row by ids alone;
  - 1 of 3 gave a candidate's main path as "the same as in A".
  - [open] A phrase for a workflow whose number of steps depends on the path.

## The evals

- [decision] Opus judges every case.
  - On replies of 1,500 words or more, Sonnet failed criteria that the reply
    met, in all three votes. A Sonnet run by hand with the same prompt and
    system prompt passed them 9 of 9.
  - The cause was not found: the harness's debug log holds no answer text.
  - Opus agreed with a reading of the replies on 24 of 24 verdicts. The
    judge's cost about doubles.
- [decision] The candidates case starts from requirements settled over three
  rounds, with the reviewer's instruction to leave any other question in
  Open. With one round, it could never reach the candidates.
- [decision] The asks-again case resumes a run of the candidates case on the
  current text. The reviewer had said that they would answer the open
  question at the selection, and then selects with no answer.
- [finding] The eval's agent knows the email of the person who runs it. One
  run wrote it into a change log.
  - A transcript and its files are scrubbed of the home paths, the email and
    the name before they go into the repository. The resume still works.
- [decision] `bin/replay-graders` grades stored replies with a case's llm
  graders, for about $1.30 a reply for the twelve graders of the candidates
  case, with Opus. Each changed criterion was checked with it against replies
  whose verdict was known.
- [finding] On the final text, the other five cases passed every check in
  every run, and the candidates case scored 0.89, 0.94 and 0.94. Each FAIL
  there is a reply that broke the skill's text.
