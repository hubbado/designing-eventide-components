---
name: designing-eventide-components
description: Designs the commands, events, streams and handlers of Eventide components, or a change to them, before any code is written. Works from requirements to candidate models, a YAML model, and scenarios that try to break the requirements, with a human reviewer who decides. Use when asked to design an Eventide component, an event flow, or the messages of a process.
license: MIT. Complete terms in LICENSE.txt
---

# Designing Eventide components

An event flow is the commands and events of one process, the streams they are
written to, the handlers that react to them, and the order in which one
message causes the next. This skill designs one, and checks it, before any
code is written. It produces documents, not code.

## Roles

You write the requirements in the words of the business, propose models,
write the selected model, walk scenarios through it, and find problems. The
reviewer is the person who knows the business and owns the design. The
reviewer decides:

- the words of each requirement;
- the other users of each thing that the process changes;
- the components, and the streams that each one holds;
- each problem that is accepted, and its escape hatch;
- each question in the model's `questions` and the design document's Open;
- a name, when no plain name fits a message.

This is design with the reviewer, not for the reviewer. Do not build on a
decision that the reviewer owns until the reviewer makes it. Work built on a
guess is lost when the guess is wrong, and the reviewer can then only accept
or reject it. For example, one design added a rule that its request did not
make: a closed account refuses deposits. The model, its walks and a walk by a
fresh session were built on that rule, and the two most serious problems that
they found came from it alone.

Stop and wait for the reviewer:

- when you have the draft requirements, before any candidate model;
- when you have the candidate models and their table, before you write the
  model;
- when you present the model, its scenarios and its questions;
- before you draw any panel: draw panels only when the reviewer asks;
- after the first one or two panels. The reviewer's questions on the first
  panels often change the foundations that the other panels stand on.

At each stop, write for a reviewer who has seen only what you have shown
them. Give each new or changed thing in full the first time that you show it:
a requirement in its words, a candidate in its sketch, a problem in what goes
wrong. An id alone is enough only for a thing that the reviewer has already
seen in full. A reviewer cannot judge a name: one report gave five new
requirements by their ids alone, and the reviewer could not tell whether any
of them was wrong.

## Read these first

- The feature's design document, if there is one.
- The example in `examples/purchase-orders/`: the requirements, the model and
  the scenarios of adding an assignment to a purchase order and removing it.

## The files of a design

A design is a living document. Change its files in place, and let git keep
their history; do not start a new file for a new stage or a new day. Keep a
design's files together in one folder, such as `docs/design/<topic>/`:

- `design.md`: the requirements document, the source of what the design must
  do.
- `event-flows.yaml`: the model, the source of the design.
- `scenarios.md`: the walks that test the one against the other.
- `event-flows.html`: the panels, drawn from the model.
- `changes/`: the change log.

Every correction changes the requirements, the model or the scenarios first.
If the panels and the model disagree, the model is right; fix the panels. A
date belongs in the name of a plan for one piece of work, not of a design.

The design document says what the design is now. The change log says how it
got there, and why: one file for each change, named
`YYYY-MM-DD-HHMMSS-<slug>.md` for the date and time of the decision, with a
title that carries the same date and time, and lines tagged `[decision]`,
`[rejected]`, `[finding]`, `[correction]` or `[source]`. Git records what
changed. The log records the problem, the choice, what was rejected and why,
and what it costs. A `[source]` line names the person who decided or
answered, not their role, when two people do the same job and their practice
can differ.

## Stages

Work in this order.

### 1. Requirements

Read `references/requirements-document.md`.

Before any stream or message, write what the process must and must not do,
in the words of the business. Define the terms first. Give each requirement a
short id, and say where it is built: in the component, or in the application
that sends its commands. The first version is a draft. Business people often
state a rule more strictly than the business needs, because on paper the
correction cost nothing and nobody saw it. The walks in stage 3 show which
rules are too strict.

Look a little into the future. For each thing whose state the process
changes, ask the reviewer which other processes change it now, and which are
likely to need it to act later. Record the answers in the design document's
"Other users". Do not design for them: they tell which components are
afferent (the rule "Afferent components take commands, and efferent
components orchestrate them").

Then stop, and present the draft to the reviewer. Name each requirement that
is your assumption and not the request's. Ask only the questions whose
answers can change a stream, a component, or a requirement that a stream
rests on, such as:

- what each thing can do after it ends, such as a closed account, and what
  happens to work that is in progress when it ends;
- what the business does when a step fails after an earlier step has had an
  effect. A request often says only what happens when the first step fails;
- the other users above.

State each other assumption, and continue on it. Continue on an assumption
that can change the model only when the reviewer tells you to, and put its
question in Open.

### 2. Candidate models, then the model

Read `references/rules.md` and `references/model-format.md`.

- Consider more than one way to model the process with streams. They can be
  very different. A sketch is enough for a candidate: its streams, their
  keys, what each holds, and the component of each stream; for each stream,
  the commands that it takes and the events that it writes; and for each
  component, the commands that it sends and the events of other streams that
  it handles. Leave out the attributes. The messages and the handlers show the
  couplings that the row "Other users" judges.
- Decide the components in the sketches, and not before: the reviewer's
  answers to stage 1 must say what the process is first. Group the streams by
  the rule "Afferent components take commands, and efferent components
  orchestrate them".
- Compare the candidates in a table. The requirements that decide where state
  lives are the rows, the candidates are the columns, and each cell says how
  that candidate keeps that requirement: "one write", "a relay", "a protocol",
  "application only". Walk a scenario through a candidate only when the table
  does not decide.
- Then stop, and present to the reviewer in the conversation, in this order,
  so that nothing is compared before the reviewer has seen it:
  1. Each requirement that changed since the reviewer last saw the
     requirements, in its words, with each new assumption marked.
  2. Each candidate, the one that you recommend first: a name that says its
     idea, its sketch, and its main path walked through it with the names in
     its sketch and concrete data, such as real ids and amounts.
  3. The table, with a short label for each candidate as its column, the
     words of each requirement beside its id, and what each cell word means.
  4. The candidate that you recommend: the rows that decide it, and the cost
     that you accept.
  5. Each candidate that you would reject: what it does better than the one
     that you recommend, and the row that rejects it. A rejection that the
     reviewer can find only in the change log is a decision that you made
     alone.

  The reviewer selects a candidate, or asks for another.
- Write the model only for the candidate that the reviewer selects. Record
  the choice in the design document's "Model selected". Record the
  candidates, the table, and each candidate dismissed, with why and when, in
  the change log. The selected model can look obvious afterwards; the record
  shows why it is not.
- Before you propose a model, a rule or a name, read the change log for
  options already rejected. A rejected option comes back only when its reason
  no longer holds, and the proposal says which reason changed.
- When a decision changes a fact, or the scope narrows, search the change log
  for the decisions and rejections whose reasons rest on it, and test them
  again before you build on them. For example, a time zone on each start
  outlived its reason when the scope narrowed to one country.
- When a decision makes the design simpler, "this is simpler if that", record
  it at once (the rule "Record every 'simpler if' decision").
- Write the whole component design in one model: every stream, message and
  handler that the requirements need. Each scenario then tests the whole
  design; do not build it from fragments that one scenario needs.

### 3. Try to break the requirements

Read `references/scenarios-format.md`.

Invent scenarios that could break a requirement, and walk each one through
the model. Start with the simplest case, and make them harder: a message
delivered twice; two requests at the same time; a second request before the
first completes; messages that arrive in a different order; a reply to a
request that was replaced; a fact that arrives after the decision that it
would have changed. Include cases that "should never happen", such as another
component that breaks its own rules. When a walk breaks only because another
component broke its own rule, name the component that owns the rule. That is
its responsibility, not a reason for a guard here.

The aim is to learn what the flow does, not to invent requirements. A walk
either holds, or it finds a problem. A problem needs a decision, which is not
always a guard. Record each problem and its decision in the design document's
"Problems found", and name it in a note on the scenario that found it. Ask,
in this order:

- **Does it leave figures that disagree after the system settles, or
  information that could mislead someone into a costly mistake?** That is not
  acceptable, however unlikely it is. A strange state with true information
  is different: "this was paid, and then it was voided" tells the operator
  what happened and what to do.
- **Can an admin put it right through the system,** with an action that the
  application offers? Or does it need a sysadmin to change data behind the
  scenes? An escape hatch often costs less than a guard.
- **How likely is it, and what does a breach cost,** against what a guard
  costs every day? Every reader, every change and every test pays for a
  guard, even if the race never comes. Greg Young offered a prize to anyone
  at his company who found a race condition in production. The prizes on the
  shelf went out of date, because nobody ever claimed one.
- Then choose: remove it by changing the design so that it cannot happen;
  guard it; detect it and correct it forward; or accept it, and name the
  escape hatch. If the choice changes what a requirement promises, change its
  words with the business, and have the reviewer agree them.

When a walk shows that a requirement needs two streams to agree, look at the
stream keys again before you add a protocol. A rule inside one stream is
cheap, because the stream orders its writes. A rule across streams or
components needs requests, replies and rejections. When no handler can keep a
requirement at the moment of its decision, because the fact arrives after
the decision, say so in a note, and say which handler reads the late fact and
what it writes, or that none does. When a walk drops a shape of the model,
add an entry to the change log, and tell the reviewer about the shape and why
it was dropped when you present the model.

Some scenarios later become interactive tests: they run against the live
components, and a person inspects their output.

**Think of it as a manual process.** Before you reach for a protocol, picture
the process done by hand, by people in a physical world, between desks and
departments. Many processes were never done by hand, and a design does not
have to copy a manual one. The picture is a way to think about races and
coordination, because in a physical world each kind of coordination has a
cost that you can see. A two-phase hold is a phone call to the other
department before every payment, and a wait for the answer. A compensating
event is asking for money back that has already left. A read of another
component's store is walking into another department to read its files.

Against those costs, the cheap answers are easy to see. A clerk pays an
invoice while another department decides to void it. The clerk acts on the
document in hand, the correction comes forward as a new document, such as an
adjustment or a credit note, that the next run picks up, and a reconciliation
finds the differences. A design can often use the same answer: a void that
arrives after a payment becomes a deduction from the next payment.

### 4. Present, only when the reviewer asks

Read `references/presenting.md`. Draw the first one or two panels, and stop
for review.

## Check the model before you present it

Read the model and the scenarios against this list, item by item:

- Every step's Caused by names an earlier step whose handler writes or sends
  its message, the operator for a command from a screen, or the component
  whose event it is.
- Every message and change in a step or a handler is declared under
  `streams` or `outside`.
- Every event and command on a stream starts with the attributes of the
  stream's key, in the key's order.
- Every scenario has a Walked line, and no handler that its steps use has
  changed since that walk.
- Every `one_of` branch and every `ignores` appears in a scenario, as a step
  whose Data names the branch or says why it is ignored, or a note or a
  comment says why not.
- Every component requirement is in the Tests of scenarios that try to break
  it, from simple to pathological. Each walk shows that the flow keeps it, or
  a problem in "Problems found" says where it does not. A permission has a
  scenario that shows it.
- Every problem in "Problems found" has a decision, and every accepted one
  names its escape hatch, or says that only a sysadmin can put it right. None
  leaves figures that disagree, or information that misleads. Every scenario
  that found a problem names it in a note.
- Every handler decides from the one entity or row that it writes, and its
  `reads` names only state of that entity or row. A scenario shows where any
  data from another component arrived.
- The handlers that write one version-gated row handle messages of one
  category.
- After the walks, no afferent component handles the events of a component
  that depends on it, or has a message, attribute or state that only one of
  its users needs. Each component, afferent or efferent, is in `questions`.
- Every handler is safe when its message arrives twice.
- The cases of stage 3 (twice, at the same time, in a different order, late)
  have a scenario, or a note says why they cannot happen.
- Comments and notes say what a reader of the model needs at that point. The
  reasoning behind a decision is in the requirements document, not repeated
  in the model.
- Every message name and attribute agrees with its source: the design
  document, or the message classes when they exist. For an `existing` stream,
  read each class that you list. An attribute that the class does not have is
  in `proposed`.
- When the design adds a state, every "latest", "last" and "current" in the
  requirements and the model is read again: the new state can make each one
  read two ways.
- Every decision and rejection whose reason rests on a fact or a scope that
  has changed is tested again.

After a large set of walks, or a change to the model, a new session walks
every scenario again against this list, from the documents alone. It is not a
continuation of the design session, and it is given no conclusions from it.
The author's own walk carries the author's assumptions, and a check that the
text agrees with the model does not check that the requirements hold. If your
agent can start a sub-agent with a fresh context, use one; if not, ask the
reviewer to start a new session. Check each finding against the documents
before you act on it, because a finding can be a misreading.

Corrections made in one pass from a walk's findings get a walk of their own,
or a check of each correction against the files, before they are committed.
Such a pass changes many places at once, and nothing else checks it: one such
pass put a wrong date in the text, and another cited a change log entry by a
guessed name. Cite a change log entry by its real file name.
