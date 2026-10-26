# The requirements document

Markdown, one living design document for each design: `design.md` in the
design's folder. The requirements are its core. Write them tersely, in the
style of an RFC, with short sentences. The requirements name no stream,
handler or message. The example is
[examples/purchase-orders/requirements.md](../examples/purchase-orders/requirements.md).

## Sections

In this order:

- **In brief.** About ten bullets: what the design does, from its streams to
  its read models, in plain words. The reviewer reads this first.
- **Background.** Only what the requirements rest on, in a few paragraphs. The
  detail of a neighbouring design, such as how a payment is calculated, goes
  in its own document in the same folder.
- **Terms.** Each word that the requirements use with a special meaning, in
  one line: "**Purchase order**: a client's order, with a value, one currency
  and one client".
- **Keywords.** Each requirement is a **MUST** or a **MUST NOT**: something
  that is built and checked. There is no SHOULD or MAY. An RFC needs them
  because independent implementations must still work together; a design has
  one implementation, so a requirement is built or it is not. A permission is
  written as what the system MUST let a person do. A requirement says only
  what the system can guarantee from what it knows: "MUST NOT pay a share
  whose void it has recorded" is a guard, and "a recovery MUST be owed" is a
  correction. When only a sysadmin can put a breach right, the requirement
  says so.
- **Requirements**, and later **Component** and **Application.** Until the
  model is written, the requirements are one section, Requirements, and name
  no component and no application: which one keeps a requirement is a
  decision of the model. When the model is written, they move into two
  sections, by where each requirement is built. The component keeps its
  requirements whoever sends the command. The application holds its screens,
  and the rules that it applies before it sends a command. Call such a rule an
  application rule, not a screen rule: its text says what the application
  MUST do. Inside each section, group the requirements by subject. Each one is
  a bold id and one or two sentences: "**settled-once.** An item MUST be
  settled at most once."
- **Out of scope.** What the process does not do, in one line each, and who
  or what does it instead.
- **Other users.** For each thing whose state the design changes, the other
  processes that change it now, and those that are likely to need it to act
  later, in one line each, as the reviewer knows them. The design does not
  build for them. They tell which components are afferent.
- **Prerequisites.** What must be in place before it goes live, in order, when
  there is any.
- **Open.** The questions that a requirement waits on, with the requirement's
  id.
- **Design coverage.** A table of the component requirements, each with the
  handler, branch or state of the selected model that keeps it. Write it when
  the model is written, before the walks: a requirement with nothing in its
  row is a gap in the design.
- **Problems found.** Each problem that a walk or a review found, by a bold
  id. Write out those that are accepted or open: what can go wrong, the escape
  hatch, and the requirement that records it. The reviewer must agree to
  them. Put those that are removed, guarded or corrected in a table, one line
  each: the id, the outcome, and the requirement that keeps it. The full story
  of each problem goes in the change log: where and when it was found, the
  answers to the questions of stage 3, and the decision.
- **Model selected.** What the model is, why it was chosen, and the costs
  accepted. Each shape that a walk or a review drops goes in the change log,
  with what it was, why, and when.

## Judging a design document

A design document is good when a reviewer can review it quickly and miss
nothing that they must decide. Judge it by these tests:

- **The first screen says what the design does.** "In brief" gives the whole
  design before any background.
- **What needs a decision is easy to find:** the requirements, the open
  questions, and the limitations accepted. None of them is only in a note, a
  table or the change log.
- **Each section serves the review.** History goes in the change log: how the
  design got here, what was dismissed, and the full story of each problem.
  The detail of another design goes in its own document. Nothing is deleted;
  it moves.
- **Each thing is said once.** A requirement is in its section, and other
  sections name its id. A reason is in the change log, and the document
  states the result.
- **Each sentence earns its place.** Ask of each one: would the reviewer miss
  it? If not, cut it or move it.
- **Plain words and short sentences**, as for the requirements.
- **Measure it.** Count the words in each section. A large section with
  nothing to decide is the first to move or to shorten. One design document
  had 7,600 words, of which 27% were resolved problems and 18% a calculation
  that the component no longer did. Moving them, and adding "In brief", cut
  it to 4,600.
