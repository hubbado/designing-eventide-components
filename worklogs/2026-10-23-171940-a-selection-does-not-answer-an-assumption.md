# A selection does not answer an assumption (2026-10-23 17:19)

- [finding] Sam Stickland ran the bank-account design again, in a new session
  with the text of b3eb955. Its stop after the candidates followed the new
  order: the changed requirements in their words, sketches with the messages
  and handlers, walks with real amounts, the cell words explained, and what
  each rejected candidate does better.
- [finding] Its recommendation said "Two rows decide it", and one of them was
  covered, which was "one stream" in every candidate.
  - [decision] The recommendation names the rows where the candidate does
    better than the others. A row where every candidate is the same decides
    nothing.
- [finding] It rejected the ledger candidate by a design rule, and said so:
  "No requirement row rejects C." The rule did not become a row, without the
  line that was taken out on the entry of 14:04.
- [finding] At the stop after the candidates, it asked the reviewer to agree
  four assumptions, among them no overdraft and once. Sam Stickland selected a
  candidate and did not answer them. The agent then wrote the model, twelve
  scenarios and a fresh walk on them.
  - The rule "Continue on an assumption that can change the model only when
    the reviewer tells you to" was in stage 1 only, and the step that writes
    the model did not name it.
  - [decision] The model is written only when the reviewer has agreed or
    corrected each assumption that can change it. A selection does not answer
    an assumption.
- [finding] Its walks accepted a problem, sender-skips-validation: a deposit of
  -80.00 from a sender that skips the validation takes the balance below
  zero. The requirements document says "The component keeps its requirements
  whoever sends the command", and the rule "Stop the line on incoming data
  that is wrong" keeps both covered and deposit-always.
  - Stage 3's list of choices was remove, guard, correct forward or accept,
    with no stop.
  - [decision] The list has "stop the line, when the cause is wrong incoming
    data".
