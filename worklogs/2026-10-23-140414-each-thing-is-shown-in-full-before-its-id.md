# Each thing is shown in full before its id (2026-10-23 14:04)

- [finding] In a bank-account session with the skill at 4d958db, the turn
  after the reviewer's answers opened with the comparison table. The
  candidates had labels such as "transfer stream, transfer component", but no
  sketch, the cells used "one write", "a relay" and "a protocol" with no
  meaning given, and the turn ended "I recommend A" with no reason.
  - Sam Stickland: "I don't feel like it's opening with enough information for
    me to really know what it's talking about."
  - The cause was the skill's text: it said to present "the table, the
    candidate that you recommend, and why", and it asked for a sketch only of
    the candidates rejected.
  - Four long column labels did not fit in a terminal, so each label was
    repeated on every line.
- [finding] Before the table, the same turn gave five new requirements by
  their ids alone, such as labels-only and close-final. Sam Stickland: "it gave
  me the keys for them, but it didn't say what the requirements were, even."
- [decision] At each stop, the agent writes for a reviewer who has seen only
  what it has shown, and gives each new or changed thing in full the first
  time. An id alone is enough only after that.
  - [rejected] A fix in each place where an id appeared. The same fault was in
    two places in one turn.
- [decision] The stop after the candidates has an order: the changed
  requirements in full, each candidate with its sketch and its main path
  walked with concrete data, the recommended one first, then the table with
  short column labels and its cell words explained, the recommendation with
  the rows that decide it, and each candidate rejected.
  - [rejected] One more stop after the answers to the requirements' questions.
    The candidates are cheap sketches, so the changed requirements can be
    agreed at the same stop.
- [finding] In that session, the requirement knows-no-transfers was the
  reviewer's own answer: "The account does not know about transfers." It then
  became a row of the table. Sam Stickland: the answer was a mistake.
  - [open] A line that a design rule is not a row of the table. It was
    written, then taken out before the commit, until the reviewer decides.
- [finding] A headless test of the change, with the reviewer's answers less
  that sentence, followed the order: the changed requirements with each new
  assumption marked, three candidates each walked with a transfer of 30.00,
  the cell words explained, the Other users row as the reason, and what each
  rejected candidate does better. It cost $2.73 over the two stops.
  - The table had a row for the rule "an entity's collections stay small",
    which rejected the ledger candidate: a design rule as a row again.
  - The agent cited the rule's Why about accounts: "The skill's rules contain
    an earlier design that did this, and paid for it." The bank-account test
    stays contaminated.
