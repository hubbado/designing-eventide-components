# Presenting a design as panels

How to show the model to the reviewer: as lane panels, drawn with Excalidraw.
Write and check the model first. Draw only when the reviewer asks.

## Why this format

A reader of streams thinks in lanes that stay where they are, with time running
from left to right. A sequence diagram was too different from how such a
reader thinks about streams. A flowchart was closer, but a tool that lays out
a diagram by itself, such as Mermaid, moves the lanes where it wants, so time
does not run from left to right. Excalidraw lets the template place each lane
and each column.

## The notation

| In the model | In the data block | On the panel |
|---|---|---|
| A stream's commands | lane with `kind: "command"` | Pale lane |
| A stream's events | lane with `kind: "entity"` | Solid lane |
| A stream's `component` | lane `component` | One colour for each component, the same in every panel |
| An `outside` thing | lane with `kind: "outside"` | Grey dashed lane |
| A step | message | A box on its lane |
| An attribute that ends in `?` | an entry in message `attrs` that ends in `?` | Grey attribute, in its place |
| An attribute in braces, a list of entries | an entry `{ name: [parts] }` in message `attrs` | The list's name over a grey box, which holds the attributes of each entry |
| An event with `reasons` | message `rejected: true` | Red title |
| A step and the earlier step whose handler writes or sends it | link, `kind: "writes"` | Solid arrow |
| A step written by a handler that handles another component's event | link, `kind: "reads"` | Dashed arrow. It points at the event that is read |
| The `when` of a `one_of` branch | link `label` | Text on the arrow |
| A note | note | Blue box, with thin arrows to what it explains |
| A scenario chosen for a panel | panel | An Excalidraw frame with the scenario's name |
| One area of the design in full, from its handlers | panel | An Excalidraw frame named "Design: <area>" |

Time runs from left to right.

## Steps

1. Copy [assets/event-flow-template.html](../assets/event-flow-template.html)
   to the design's folder as `event-flows.html`. Change its `<title>`.
2. Translate the model and the scenarios into the `window.DIAGRAM` block at
   the top of the file, with the rules below. The template's own data is the
   translation of the example in
   [examples/purchase-orders/](../examples/purchase-orders/). Compare them
   before you start. The first time, translate only the first one or two
   panels of the story. When you move a design into another form, such as the
   model into panels, say what the new form leaves out: a part that is left
   out without a word is lost.
3. Check every panel. Serve the folder with
   `python3 -m http.server 8765 --bind 127.0.0.1`, and open the page in a
   browser. A wrong lane or message id shows as a red message where the canvas
   should be. Then run
   [assets/event-flow-layout-check.js](../assets/event-flow-layout-check.js)
   in the page: paste it into the browser console, or run it with your
   agent's browser tool, if it has one. It lists boxes that overlap, arrows
   through a box, labels that a line crosses, text outside its box, and
   anything outside its panel. Every list must be empty. Then look at every
   panel once: the check cannot see whether a note sits next to the step that
   it explains. Looking alone is not enough either: the check has found
   overlaps that several rounds of looking had missed.
4. Commit the model and the page beside the design document, and add their
   links to the design document.
5. Present it: the page, the panels in reading order with one line for each,
   and the decisions that you need. The model's `questions` show under the
   canvas. Then stop, and wait for the review before you draw more panels.

## From the model to the data block

**The page.** `title` is the model's `design`. `summary` is one sentence about
the proposal. `questions` are the model's `questions`.

**Which panels.** The panels draw the design, not every scenario: the first
scenario as the overview, a panel for each area of the design that has
something to decide, and another scenario only when its walk shows something
that the area panels cannot, such as a fact that arrives before the thing it
belongs to. An area has something to decide when it has branches, refusals,
an order of arrival, or a fan-out. A read model that every event updates in
the same way is only a list of handlers. The model holds that list, and a
scenario panel shows the read model at work. The scenarios document holds
every walk. A scenario panel's `name` is the scenario's name.

**The order of the panels.** The panels tell the component as a story, from
the usual case to the details, as
[scenarios-format.md](scenarios-format.md) says. The first panel is the first
scenario, the usual case, named "Overview: <scenario>". Any other scenario
panels follow in the order of the scenarios document. A panel of one area of
the design in full, drawn from its handlers rather than from one walk, comes
after the stories that lead into that area.

**Lanes.** For each stream that the scenario's steps use, in the order of the
model's `streams`: the stream's command lane, if a step is one of its
commands, and then its event lane. Then one lane for each outside thing that a
step uses, for one of its changes. The labels are `<category>:command-<key>`,
`<category>-<key>`, or the outside thing's name. The lane's `component` is the
stream's component.

**Boxes.** One for each step that the panel shows. A scenario's table starts
from empty streams, but a panel is a display: leave out the setup steps that
the panel's point does not depend on, such as the creation of an entity and
its first settings in a panel about a later step. `title` is the class name
split into words: `AddToPurchaseOrder` becomes "Add To Purchase Order".
`attrs` are the model's attributes, in its order and as it writes them:
`"addition_id?"` for an optional one, and
`{ line_items: ["worker_id", "net_amount"] }` for a list of entries. Keep the
order, so that the parts of an entry stay together and an optional attribute
stays in its place. A step whose Data says that it is ignored gets a note
that gives the reason, if the scenario has none. The Data column, `reads` and
`owner` are not drawn; a note can quote a value from Data.

**Columns.** Take the steps in order.

- The first step goes in column 0.
- A step that no other step causes (one sent by a user, or another
  component's event) starts a new column to the right of every column used so
  far, because it happens later.
- A step caused by another step goes in its cause's column if it can, and
  otherwise in the first column to the right where it can. It can when its
  lane has no box in that column, and its box would not sit on a straight
  arrow that already passes through that column. If it is on another lane in
  its cause's column, no box can stand between the two in that column.
- When one handler writes or sends several steps, list first the step that
  continues the flow onto other lanes. That step gets the straight arrow, and
  the others move to the right.

These rules give exactly the columns of every panel in the template.

**Links.** One for each step that another step causes.

- When the step's handler handles an event of another component, the link has
  `kind: "reads"`, goes `from` the step `to` its cause, and points at the event
  that is read.
- Otherwise the link has `kind: "writes"` (the default) and goes `from` the
  cause `to` the step.
- When the handler has `one_of`, the link's `label` is the branch's `when`.
  When the step's Data names a branch, use that branch's `when`. A branch with
  no `when`, a command's success, has no label.
- A step that is ignored has no link out, because its handler writes nothing.

**Notes.** One for each note in the scenario. Number the notes in the order in
which they are to be read, which is the order of the first step that each one
explains: "1. The assignment records that it is being added…", "2. The
currencies and the clients are the same…". Notes on alternatives, which are
read side by side, share a number and have a letter: "3a.", "3b.". Do not copy
the scenario's step numbers: the reader of a panel does not have the
scenario's table, so the step numbers tell them nothing. A note without steps
goes at the top of the panel, with no number. So do the requirements in the
scenario's Tests, each with its id and its text from the requirements
document. Each step that a note explains becomes one of the note's `points`.

A note uses general words, not the scenario's example values, because the
panel's point does not depend on them: "the worker", not "worker A"; "the
invoice's issue date", not "5 Oct"; and no amounts or terms. Keep a relation
between two values when the point depends on it: "from a date in the past, on
or before the invoice's issue date". Write names in full, not the scenario's
short forms. A letter only tells apart two streams of one kind on the same
panel, such as worker A and worker B.

A note has one subject. When one note explains two things, such as the start
and the terms, or a command and its refusals, make it two notes. Write the
model's terms in plain words: "the agreement has not started", not "no active
start"; "the current start", not "the latest active start". Write a rule with
several refusals as a list, one refusal to a line. A note that shows a
mechanism says why it exists.

## Layout by hand

The model fixes lanes, columns and links. You choose the heights and the note
positions:

- Keep 250 to 300 pixels between lane centres, and more where notes sit
  between two lanes. When a note sits above the first lane, put that lane's
  centre about 300 pixels down. A box grows by about 17 pixels for each
  attribute, and by 20 more for each list.
- `reads` arrows pass under the lowest lane. Put the notes for the lowest lane
  about 240 pixels below its centre, so that they sit below those arrows.
- Put each note in the gap next to the step it explains. Keep notes off
  arrows: move a note by a fraction of a column, or move an arrow's end with
  `fromAt`.
- If an arrow still crosses a box, move the step one column to the right.
- A label that is wider than its arrow's horizontal run always has a line
  through it. Move the step to the right until the run is wider than the
  label. A line break in the label does not help: the template lifts a label
  by one line only.

## The data block

```js
window.DIAGRAM = {
  title: "Purchase order assignments",
  summary: "One sentence on what the proposal is.",
  questions: ["One stream for the order and its lines, or two?"],
  panels: [{ name, lanes, messages, links, notes, columnWidth }]
};
```

**Lane**: `{ id, label, component, kind, y }`. `kind` is `"command"`,
`"entity"` or `"outside"`. `y` is the lane's centre in pixels, from the top of
the panel.

**Message**: `{ id, lane, column, title, attrs, rejected }`. `column` counts
from 0. Titles wrap by themselves; attributes show one on each line.

**Link**: `{ from, to, kind, label, fromSide, fromAt, toSide, toAt, bend }`.
Only `from` and `to` are necessary. A `writes` link runs straight when the two
messages line up, and bends once when they do not. A `reads` link runs below
the lowest lane of the panel; each one runs a little lower than the one before,
so they do not overlap. `fromAt` and `toAt` (0 to 1, default 0.5) move an end
along its side. `bend` sets the height of the horizontal run in pixels.

**Note**: `{ id, column, y, width, text, align, points }`. `column` is the
note's centre and can be a fraction, such as `2.6`. `y` is its top edge. A
blank line in `text` starts a new paragraph. `align: "left"` suits a long
note. `points` is a list of `{ to, fromSide, fromAt, toSide, toAt }`; an arrow
leaves the side of the note that faces its target unless you say otherwise.

## Taking feedback

- Change the model first, then the data block, then the page. The data block
  repeats a message in every panel that shows it, so a correction made only
  there must be copied by hand, and the copies drift without anyone seeing.
- The reviewer can drag boxes and write in the editor, but those edits are
  lost when the page reloads, and the reviewer should know that. "Copy as
  .excalidraw file" puts the edited scene on the clipboard, so that the
  reviewer can keep a hand-edited copy in Excalidraw.

## Limits

- Excalidraw has no bold and no italic. Titles use a larger size, and optional
  attributes are grey.
- The text is Helvetica, because Excalidraw's own fonts do not load in every
  host that serves the page.
- The editor's save and export do not work in every host, so the template
  hides them and gives copy buttons instead. Pasting into excalidraw.com has
  not been tested.
- The template has no `<!doctype>` and no character set of its own, because
  the host that it was first written for added them. It has been checked only
  in Chrome, served as step 3 says.
- The template loads Excalidraw 0.17.6 from unpkg and React 18.3.1 from
  cdnjs. Excalidraw is pinned on purpose (30 Sep 2026). 0.17.6 is a browser
  build that sets a global and carries its own CSS. 0.18 is ESM only and ships
  its CSS as a separate `index.css`, which a host that loads stylesheets only
  from some origins cannot load. Nobody has tried 0.18. If a later release
  runs in the hosts that serve the page, move to it and check that the
  template still draws.
