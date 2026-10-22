# The scenarios document

The scenarios are not in the model. They have their own document beside it,
`scenarios.md` in the design's folder, written for a person to read: a
scenario is a story first, and its table only makes the story exact. The
example is
[examples/purchase-orders/scenarios.md](../examples/purchase-orders/scenarios.md).

A scenario is one walk through the handlers. Only some scenarios become
panels; [presenting.md](presenting.md) says which.

## The scenarios tell a story

Together they explain how the component works, from the usual case to the
details. So their order is a reading order, not the order in which they were
written.

- The first scenario is the usual case from start to finish. A reader who
  reads only it knows what the component does. It is also the overview panel.
  It has no corrections, no refusals and nothing out of the usual order. It
  tries to break nothing, so it has no Tests. In the purchase order example: a
  purchase order is created, an assignment gets the same currency and client,
  the assignment is added, and later it is removed.
- Each later scenario adds what the reader needs next: first the common
  variations, then the detail of each area, the corrections, the refusals and
  the rare cases.

## A scenario

Each scenario is a section, numbered in reading order:
`## 2. Purchase orders refuse an assignment in another currency or for another client`.
It has, in this order:

- **A description.** Two to four sentences in plain words: what happens, and
  what it shows.
- **Tests and Walked**, on one line: `Tests: same-currency, same-client.
  Walked: 14 Oct, holds.`
  - Tests names the ids of the component requirements that the scenario tries
    to break, from the requirements document. A scenario that tries to break
    none, such as a plain usual case, has no Tests. An application
    requirement is not in Tests: the model does not model the screens, so no
    step can break it. A note names it where the screen acts.
  - Walked says when the scenario was last walked against the model, and what
    the walk found: `14 Oct, holds`, or `30 Sep, found [void-before-payment]`,
    with the ids from "Problems found". When a change touches a handler that
    the scenario's steps use, walk it again and update Walked. A scenario
    whose Walked is older than the last change to one of its handlers is not
    known to pass.
- **The step table**, with the columns `#`, `Message`, `Data` and `Caused by`.
  An excerpt:

  ```markdown
  | # | Message | Data | Caused by |
  |---|---|---|---|
  | 9 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X1 | user |
  | 10 | AddToPurchaseOrderInitiated |  | 9 |
  | 11 | AddAssignment | client_id C1, currency GBP | 10 |
  | 12 | PurchaseOrderAddAssignmentSent |  | 10 |
  | 13 | AssignmentRejected | reason currency_mismatch | 11 |
  ```

  - The steps are in time order. Each step is a message that is written, sent
    or received. A step left in the notes reads as missing, or as out of
    order.
  - The table starts from empty streams. Every message that the walk needs is
    a step, the setup as well as the story, such as the creation of each
    entity and its first settings. Do not leave a premise in a note because it
    seems unrelated: a premise that a step depends on unseen is a gap in the
    walk. For example, settings that are only in a note, but that a later
    command is checked against. A scenario is how you compute and reason about
    the state of the system, so it holds all of it. A panel is a display, and
    can leave the setup out.
  - Message is the class name, as in the model. The event of another
    component has its stream's category in front: `invoice.Issued`.
  - Data gives concrete values where they decide or explain what happens.
    Concrete data shows gaps that attribute names hide. A value with a comma in
    it is in quotes.
  - When a walk shows a race between consumers, the Data of each step gives
    the message's stream and the category whose consumer handles it next, so
    that two consumers that write one stream are plain to see.
  - When several branches of a `one_of` write the same message, the step names
    its branch: `reason currency_mismatch`, or `when no terms are set`.
  - A step whose handler ignores it says why:
    `ignored: the assignment is on that purchase order`. The text matches an
    entry in the handler's `ignores`.
  - Caused by is the number of the step whose handler writes or sends the
    message. A step that no handler writes names who sends it: the user at a
    screen, the operator, or the component whose event it is.
  - A change that a handler writes to an outside thing, such as a row of a
    read model, is not a message, although the model names it like an event
    so that the panels can draw it. A TitleCase name in the Message column
    reads as a message, so do not put the change there under its model name.
    Tell it in the note on the step that causes it. When a later step depends
    on it, write the step in plain words that name the outside thing, such as
    `read model Workers: the worker's row`, with its values in Data.
  - A table holds one timeline, in time order. Alternatives, such as the
    different answers to one command, or a fault that branches from the story,
    come after the timeline in the same table, under a label row that names
    them and the step that they follow:
    `| | **(a) After step 6: a stale screen sends Close** | | |`. Answers to
    the same command can share one label, and each is caused by that
    command's step. A note says what the alternatives show and where they
    branch. An alternative does not change the timeline after it; when it
    would, it is a scenario of its own. A reader takes a table without labels
    as one sequence, and then cannot follow it.
- **Notes.** One paragraph for each, which starts with the steps that it
  explains, in bold: `**11–12.** The currencies and the clients are the
  same…`. A note about an effect on the screen or on another component says so
  after the numbers: `**14.** Effect. …`. A note with no steps, such as the
  requirement that the scenario shows, starts with `**Note.**`. A note on a
  step where a walk found a problem names the problem by its id in "Problems
  found". A note can mention a dismissed approach in one line that points to
  its entry in the change log.
