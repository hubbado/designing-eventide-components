# Rules

Each rule records a cost already paid or a decision already taken, with its
reason. Apply them when you sketch candidate models, when you write the
model, and when you walk the scenarios.

## Contents

- The parts of a design
- Streams, stores and state
  - A component never reads another component's store
  - Afferent components take commands, and efferent components coordinate them
  - A handler decides from the one thing that it writes
  - Reason about the entity, not about stream positions
  - An entity takes a recorded value from its event
  - A component holds its state in streams, not in an SQL database
  - A version-gated row takes updates from one category only
  - Every handler is idempotent, and the model says how
  - Keep each component's streams tidy
  - An entity's collections stay small for the life of its stream
- Messages
  - Name messages in plain business words
  - Say what is true now, in the words that people use
  - Name attributes within their message
  - A message carries its context
  - Give at once what is known at once
  - A command acts on the entity's current state
  - A screen action can send several commands
  - A value that is set and then changed has an Add and a Change
- Order, guards and faults
  - Accept messages in any order of arrival
  - Write from what the stream knows
  - Guard only where it is strictly necessary
  - A command's own attributes are checked by its validation
  - Stop the line on incoming data that is wrong
- Simplicity
  - Design for least surprise and solubility
  - Compensating events are a warning
  - Record every "simpler if" decision
- Keeping the documents true
  - When a term changes, change it in every current document
  - A pattern in a model is not a rule
- Patterns you will meet

## The parts of a design

- **Streams.** One stream for each entity instance. Choose the key so that
  the stream holds everything that its decisions read, and write down why.
  The command stream of a category is `<category>:command-<key>`.
- **Messages.** Commands are imperative and events are in the past tense:
  `Close` and `Closed`. When a document uses one phrase for both sides of a
  pair, such as `RefreshRequested`, give the command the imperative,
  `Refresh`, and the event a past tense. List each message's attributes, and
  mark the optional ones. Name the attribute that says who acted. A command
  for a decision that the component owns is a plain verb. A command that
  records a fact decided outside the component, such as a payment made in
  another system, starts with `Record`, because the component is not the
  authority for that fact.
- **Rejections.** A handler that refuses a command, from the entity's state,
  writes a rejection: an event that lists its reasons, so that the sender or
  the screen can react to it.
- **Domain failures.** A domain failure is an event, not an exception. When an
  action outside the store fails in a way that the business expects, such as
  an external system that refuses a stale code, the handler records it as an
  event, such as `AuthorizationFailed`, and goes on. An error of the external
  system's adapter becomes such an event. A fault of the infrastructure, such
  as a lost network or database connection, raises, and the consumer retries
  the message. A handler that raises on a domain failure stops its consumer,
  and the consumer must keep running to handle the retry that the person
  sends next. In its first test, a handler that exchanged an authorization
  code with an external system raised when the system refused a stale code,
  and its consumer stopped.
- **Handlers.** A handler reads messages, takes actions, writes messages,
  and refuses to write them. For each one, write what it reads (the message
  that it handles, and its entity), what actions it takes outside the store,
  what it writes and sends, and what it ignores. An ignore is a refusal: it
  writes nothing, and logs. A guard that nothing downstream reacts to is a
  log-and-ignore, not a rejection event. A command is ignored only when what
  it asks for is already true. One that the handler cannot do is rejected,
  because the sender waits for an answer, so no ignore applies in a state in
  which a rejection applies.

## Streams, stores and state

### A component never reads another component's store

A handler fetches only its own component's entities, and reads only its own
read models. To know something that another component owns, handle that
component's events and keep what you need in your own entity or read model.
Or send it a command and handle its reply. Within a component, each category
is projected through one store class, with one entity class.

**Why:** components are independent services with their own streams and
stores, and they communicate only through messages. A read of another
component's store couples the two, and it skips the workflow that protects the
other component's invariants.

**Why, also:** Eventide's entity cache and snapshots are not keyed by the
stream's category. The store gives the cache only the entity class and the
specifier, and the cache keeps its records by those and the id. A snapshot is
written to a stream named from the entity class's short name and the id, so an
entity class `Invoice` writes `invoice:snapshot-{id}`, whatever its component.
Two components that project the same ids into entity classes with the same
short name share that snapshot stream, and after a cache miss each restores
the other's entity data and version. Nothing fails until someone turns
snapshots on. A check that they must remember then, or a `specifier` that
they must remember to set, is not a safeguard. (Checked in evt-entity_store
2.0.4.1, evt-entity_cache 2.0.1.4 and evt-entity_snapshot-postgres 2.1.1.0.)

**In the model:** a handler decides only from the one thing that it writes
(the next rule), so no handler can read another component's store. When a
decision needs data that another component owns, a scenario must show where
that data arrived: an earlier step in which a handler of this component
received the other component's event, or a command that carries the data.

### Afferent components take commands, and efferent components coordinate them

A component's afferent couplings are the components that depend on it. Its
efferent couplings are the components that it depends on. A component depends
on another when it sends that component commands or handles its events,
because it must know that component's messages. The model shows each
coupling, in the handlers' `handles` and `sends`.

A component is afferent when many processes need to change its state. A
change to it can reach every component that depends on it, so it is hard to
change. Keep change in it to a minimum. It takes commands: each process that
needs it sends it commands and handles its events, so a new process needs no
change in it. It does not handle the events of the components that depend on
it. It holds no message, attribute or state that only one of the processes
that use it needs, such as an attribute that every other sender leaves empty.

A component is efferent when it depends on many components, and few or none
depend on it. It costs little to change. It tends to be a coordinating
component: it sends commands to afferent components and handles their events.
Put a process, and the state and guards that it needs, in an efferent
component, where change is cheap.

Which components are afferent is a fact of the business: how many processes
change a thing, now and later. One design's requirements often name only one
of them.

**Why:** a design put the transfer of money between two accounts in the
account stream, with no stream for the transfer. The account then had
transfer commands and events, a list of its transfers in progress, a
transfer's id on its deposit that every other deposit left empty, and a guard
so that a deposit from another sender could not end a transfer. Every other
process that moves money in or out of an account would add the same to the
account.

**In the model:** after the walks, read the couplings again, and put each
component, afferent or efferent, to the reviewer in `questions`, with the
couplings that support it.

### A handler decides from the one thing that it writes

A handler that writes events decides from one entity: the entity of the stream
that it writes, fetched with its version. A handler that upserts a read-model
row decides from that row. It reads nothing else to decide: no second entity,
and no read model. Data that the decision needs from elsewhere comes in the
message. A command carries what the screen read from a read model, and an
event handler keeps what it needs in its own entity.

**Why:** the write with `expected_version` orders the decision against every
other write to that stream. A second stream or a read model has its own order,
and nothing ties it to the write, so a decision that reads it can act on an
old view without knowing. For example, a payment handler that read a read
model to find voided documents could act on a list that had not caught up.
Instead, the command carries the amounts of the documents that the person
saw, and a void that arrives after the payment is corrected in a later
payment.

It also keeps a reader and the stream that it reads in one component. A
handler that only reads a second stream of its own component still works when
that stream is later moved into a component of its own, and it then reads
another component's store, which the previous rule forbids. A handler that
writes the stream that it decides from cannot be separated from it.

**In the model:** `reads` lists the state of that one entity or row that the
decision uses: `reads: [pending_addition_id]`. A handler that decides nothing
has no `reads`.

### Reason about the entity, not about stream positions

A handler fetches its entity as projected from the whole stream up to its
head, not up to the message that it is handling. The message is a trigger to
act. The state comes from the entity, and the entity is a record of decisions
already taken. So in a scenario walk, ask "what does the entity look like when
the handler fetches it?", not "what has the consumer seen at this position?".
Across components, ask what has arrived in your own entity or read model. That
can lag.

**Why:** a handler wrote a "complete" event when the last of three expected
documents arrived. Its consumer was stopped while all three arrivals were
written. When it started again, it handled each arrival against the entity
projected to the head of the stream, found all three documents each time, and
wrote "complete" three times. The design had assumed that only the handler of
the third arrival would see three.

### An entity takes a recorded value from its event

When an event records a value that a handler calculated, such as a total, the
projection takes the value from that event. It does not calculate it again
from other values in the stream. A projection calculates only a value that no
event records, and only until an event records it.

**Why:** the recorded value is the fact, and a second calculation can give
another result. In one design, a document's entity calculated its totals from
its lines, and did not apply the totals that its issued event recorded. For
documents whose lines were in an older event that the projection no longer
applied, the entity had totals of zero, while the issued event held the
correct totals. A void that copied the document's details from the entity
would have recorded the zeros.

**In the model:** when a handler `reads` a value that an event records, the
stream's comment names that event. For a value that no event records, the
comment says what the entity calculates it from.

### A component holds its state in streams, not in an SQL database

A component's handlers write events to the component's own streams. They do
not, as a matter of course, write what they handle into a database table. An
SQL database exists to answer queries, and a component's handlers do not
query. They fetch one entity from one stream.

There are two uses for a database, and both are queries:

- **The read side.** Screens query, so a read model is built for them, by
  consumers of the component's events. It is fed from the streams, not
  instead of them. The application that owns the screens can own the read
  model too, so a screen is not by itself a reason for the component to have
  a database.
- **A genuine query across streams.** The message store reads one stream at a
  time. When a decision needs data from two structures that cannot share a
  stream, a database is the only way: for example, items published on one
  side, and the people who subscribe to their categories on the other. That
  need is rare, and a design should try to avoid it.

**Why:** a draft model had a consumer upsert rows instead of writing events.
The design then had no stream that recorded the arrival of the upstream fact,
and nothing in the component could react to it.

**In the model:** a consumer of another component's event writes that event
to a stream of this component, under the event's name with its stream's name
in front: `invoice.Issued` becomes `InvoiceIssued`. It is a plain copy: the
attributes of the stream's key first, then every attribute of the upstream
event. The consumer chooses only the streams. It does not choose parts of the
event or calculate, so that its one job stays simple; anything that follows is
a handler of the copy. The consumer that writes the copy is then one of
several that write the stream, beside the stream's own consumers of its
commands and events. Now and then two of them write with the same expected
version, and one write fails. Its consumer retries the message ("Every
handler is idempotent"), so such a conflict is expected, and is not a fault in
the design. An `outside` read model is written only by handlers of
this component's own events, or it is a genuine query across streams, with a
note that says why.

### A version-gated row takes updates from one category only

A read-model row whose version is the global position of the message that
last wrote it ignores a message whose position is not newer. Messages of one
category reach their consumer in the order of their positions, but messages
of two categories do not. So when two consumers update the same row, an
update that arrives late carries a lower position than one already applied,
and it is lost without an error.

**Why:** a draft model had a second consumer write a flag onto a row that the
first consumer also updates. A correction that arrived after the flag would
have been dropped.

**In the model:** the handlers that write one row handle messages of one
category. When another category must add to that row, give it a row of its
own.

### Every handler is idempotent, and the model says how

Messages are delivered at least once. A handler cannot tell from its stream
position that it did the work before ("Reason about the entity"), so its
idempotence must be explicit. These are the mechanisms.

- **A sequence check**, the usual default. The entity records, for each
  source, the global position of the last message that it applied. The
  handler first checks the message's position against it, and logs and
  ignores a message that it has already processed. This works only while the
  positions of the messages that cause the events in a stream never go down:
  an event that follows an older message lowers the recorded position, and
  messages already handled are then handled again. It is also not safe for a
  consumer that may be replayed from an earlier position to pick up what it
  skipped, when the position is kept for each source category: the skipped
  message is now below the recorded position, and it is ignored as
  processed. Such a consumer keeps, beside the category's sequence, a
  position for each source stream that the replay must bring in. A position
  for every source stream would be a collection that grows ("An entity's
  collections stay small").
- **A reservation.** This is for a command that carries its own idempotence
  key. The handler first writes a copy of the command, with `write.initial`,
  to a stream keyed by the original ids plus the key. A second copy finds
  that stream and is ignored. The handler's block runs each time it handles
  the copy, as on a consumer replay, so the block still starts with the
  sequence check. A command takes the reservation when it can be sent again
  out of order and sets a state that another command can reverse, such as a
  start that can be cancelled, or terms that can change back. Once the state
  has come back, a check of the entity cannot tell a copy from a new command;
  only the id can. A command whose state never comes back, such as the
  closing of something that cannot reopen, is ignored by state and needs no
  id.
- **A version-gated upsert.** A read-model row written with the message's
  global position as its version ignores a version that is older or equal.
- **Ids that stay the same on a retry:** an id that the client supplies, or
  a deterministic UUID v5 of the ids that make the request unique.
- **A state guard.** A transition that is already done, such as a second
  set-up, is logged and ignored.

Optimistic concurrency is not idempotence, but it goes with it. The handler
fetches with `include: :version` and writes with `expected_version`. On a
conflict the consumer retries the message: it fetches again and decides
again. Fetch, decide, write and retry are one unit.

**Why:** a notification handler recorded nothing about the documents that it
had notified. Only its consumer's position kept it away from them. When the
handler moved to a consumer with a new position, that consumer read the
category from the start and sent the notifications for every old document
again.

**In the model:** a handler that does not use the sequence check says which
mechanism it uses, in `idempotence`.

### Keep each component's streams tidy

A handler does not write a message again when it can know that it already
wrote it, even when the reader of the message would ignore the copy.
Idempotence stops a copy from doing harm. Tidiness keeps the copy out of the
stream.

The usual case is a command sent to another component. The handler that sends
it also records, in its own stream, that it sent it (`…Sent`). When a restart
or a replay makes it handle the cause again, it finds that record and sends
nothing. Send first, then record: a restart between the two sends the command
again, which the receiver ignores by the command's id, but the other order
would lose the command. So the receiver's idempotence is still needed.

**Why:** a reader of a stream takes each message in it as something that
happened. For example, a component sends AddItem to another component, and
its consumer restarts and handles the cause again. Without a record of the
send, it sends AddItem a second time. The receiver ignores the copy, so no
figure is wrong. But its command stream now holds two AddItem commands for one
addition, and the next person who reads that stream to find a fault must
first find out which one acted.

**In the model:** a handler that `sends` a command also `writes` its `…Sent`
event, and its `idempotence` says how it finds that record. Usually that is
the sequence check: the `…Sent` event follows the cause, so the cause's
position is recorded.

### An entity's collections stay small for the life of its stream

A consumer keeps each entity that it fetches in memory, whole, for as long as
it runs: Eventide's entity cache keeps the entities in a hash, and nothing
takes one out. So a consumer's memory is the number of entities that it has
handled times their size. A collection on an entity, such as a list of start
dates or a set of the documents that it has recorded, grows each time a
message adds an entry. When the stream lives for years and the entries come
with volume, the entity grows for years.

Any collection that can grow for the life of the stream is a defect, however
rare the event that adds an entry. A rare event still adds an entry that the
entity must project and keep, and a design that allows one such collection
soon has several. Keep only what a decision that is often made needs, and drop
each entry when no such decision reads it again. A sequence kept for each
source stream, for idempotence ("Every handler is idempotent"), is such a
collection too. Two ways do most of the work:

- **A stream of its own.** When a decision that is often made needs a fact
  that a small key finds, the fact goes in a stream of its own, keyed by that
  key: each person's part of a document, keyed by the person and the
  document, or a claim on each period, keyed by the period. Such a stream
  holds one thing, so it stays small. It records a fact that it owns, once,
  or it holds a claim that a release frees, as the command reservation holds
  a key that nothing frees. A state that other decisions change, such as
  whether a part is paid, stays in the stream that makes those decisions:
  moved out, each decision on several parts would become a protocol between
  streams.
- **A read of the stream that the handler writes.** A rare command that
  needs an old fact, such as undoing a payment made months ago, reads it from
  the stream that its handler writes, up to the version that its write
  expects. It uses the message store's plain read, not the entity store,
  whose cache would keep what it reads. One reader gives the state of the
  parts that a command asks about, and makes no decision. Keep such reads
  unusual: a decision that is made often decides from the entity.

Growth that ends only when a person acts, such as the parts of someone whom
nobody has set up yet, is a problem for the reviewer to accept or refuse, with
its escape hatch ("Problems found").

**Why:** an entity that grows shows no fault in the tests or at go-live. Its
cost shows years later, as a consumer whose memory grows until it is stopped,
and in an event-sourced system such a defect is very hard to fix after the
fact. Snapshots make a fetch shorter, but the entity in memory is the same
size. An earlier version of this rule allowed a collection whose entries came
with a rare business act. A design built that way soon had several, because
the information has to be projected and stored however rare the event.

**In the model:** a handler's `reads` names what the entity keeps. For each
collection in it, the stream's comment says what keeps it small. A read of
the stream that the handler writes is in `reads`, and a comment says why the
path is unusual.

## Messages

### Name messages in plain business words

Command and event names avoid technical words, so that someone who knows the
business can read a stream and understand it. It is not always possible, but
it is the aim. A command named `VoidAgreementEnd` was correct, but nobody in
the business would say it. `Reopen` then read as opening something again,
once the design had another thing that opens and closes. `RemoveEndDate`, the
words that its screen shows, fitted. A plain word can still mislead when the
same design uses it for something else. A command's name is also the label
that the screen shows for it: if the screen would not show it, it is the
wrong name.

When no name fits at all, the problem is usually in the design, not in the
words: the message is not clear about what it does or, more often, it
combines two or more things that should be separate. For example, an event
that both moved an entity's start time earlier and said that the messages
missed since then must be replayed had no name that fitted, because it
combined a fact about the entity with an operation. Apart, the fact had a
plain name, and the replay needed no message at all.

An event about the whole entity is a bare verb, and an event about a part of
it names the part. A purchase order is `Created`, `Closed` and `Reopened`,
but has an `EndDateAdded`; an invoice is `Issued` and `Voided`, but has a
`DueDateCorrected`. The command follows its event: `Close`, but
`AddEndDate`. Before you drop the entity's name, check that the event is
about the whole entity. A command that cancels only the latest start of an
agreement cancels a part of it, so its event is `StartCancelled`: a bare
`Cancelled` would say that the whole agreement was cancelled. Its screen can
still say "Cancel agreement": this rule wins over the rule that a command's
name is its screen label, because a reader of the stream must see that only a
start was cancelled.

**In the model:** read each command and event name aloud, as the operator
would say it. If it needs explaining, look for the word that the business
uses. If no plain word fits, keep the name, and say why in a comment. If no
name fits at all, look at the design first: separate what the message
combines, or make clear what it does. When one round of names fails, do not
offer another. Say that no name fits, and ask what the message combines.

### Say what is true now, in the words that people use

A design reads its streams as records, and its words drift into the words of
records: "a start", "an end", "the agreement has a start that is not
cancelled". Then a word such as *started* has two meanings: that the stream
holds a `Started` event, and that the thing is running now. People use it only
in the second meaning. An engine that was started and then turned off is not
started, and nobody refuses to start it because it is "already started". So an
agreement that has ended is not started.

- A word for a state, such as started, ended, in force, open or closed, means
  the state now.
- A rule that depends on history says so, with words for history: "has been
  started", "was in force on 3 Oct", "has never started".
- A refusal reason says what stands in the way, as you would say it to the
  person who sent the command: `already_started`, `already_ended`,
  `not_after_last_end_date`. A negation is correct when it is what a person
  says. A reason is not the model's condition made shorter: one design's
  refusal `not_ended` was "the latest active start has no end" made shorter,
  and it became `already_started`.
- The `when` conditions use the same words, because the reasons, the code and
  the screens are written from them.

**Why:** a word with two meanings makes each reader choose one. The code, the
screens and the messages that a person sees are then written from different
meanings, and nobody notices until a reader asks what the word means.

**In the model:** read each condition, ignore and reason aloud, as you would
say it to the operator about the thing now. Where a word for a state means
"the stream holds this event", say the state, or mark the history.

### Name attributes within their message

An attribute is named within the scope of its message. The message's name
says what the fact is, so the attribute does not repeat it: an `Opened` event
has `time`, the time from which the thing is open, not `open_time`, and a
`PaymentTimeCorrected` has `time` for the corrected payment time. An id keeps
the name of the entity that it identifies, such as `invoice_id`, never a bare
`id`.

`time` is the time of the message's own fact, and an event copies it from its
command. Most commands do not need it. A command carries `time` when the
fact's time differs from the time at which it is processed and a consumer of
the event needs it: an import of history written today for actions taken
months ago, or an effective date that a back office enters later. Say why in
a comment on the command. `processed_time` is the time at which the handler
wrote the event, from the
clock, and an event carries it only when the business needs to know it.
Message DB records when it wrote each message in any case.

**Why:** a void event carried a bare `date`, copied from the event that made
the charge. Later, nobody could tell if it was the date of the charge or the
date from which the void applied. In the same way, three components set `time`
to the moment at which the handler wrote the event, while other events used
`time` for the time of their fact, so a reader could not tell which time an
event held.

**In the model:** read each attribute with its message's name in front of it.
If the attribute repeats the message's name, remove the repeat.

### A message carries its context

An event carries the context that a consumer needs to act on it alone: the
parties, the kind of thing, the amounts and the lines, as the event that
created the thing carried them. Do not cut an event down to an id because the
other facts are in an earlier event. Add the context of the thing that
changed, not the parameters that one consumer needs. An attribute shaped for
one consumer is the same narrow message from the other side.

The attributes of the message's own fact are another matter: each one needs a
reader. Ask what reads it. If nothing does, it does not exist yet. Ask it also
of each attribute that a design document proposes, before you copy it: a
free-text `reason` on a command that nothing reads is an audit string, and it
goes; a `reason` that names a value of the domain, which a handler reads,
stays. The context of the thing that changed comes whole, also the parts that
no reader uses today: a `Voided` carries all the attributes of the `Issued`
before it.

The same holds for a value that an entity or event copies from somewhere else.
Ask: when the source changes, must the copy change too? If it must, it is one
fact in two places, and it must be kept up to date. If it must not, it is a
fact of the decision: what was agreed, when. Copy it, and never update it. The
terms that a payment used stay as they were when the terms change later. A
teacher's limit of 25 students for this term's class stays 25 when it rises
to 30 next term.

A command that carries its own id names a process with it. Each event that the
command causes, a refusal too, carries that id, so that a reader can follow the
process from the command to each of its events. In the purchase order example,
`addition_id` goes through `AddToPurchaseOrderInitiated`,
`PurchaseOrderAddAssignmentSent`, the purchase order's `AssignmentAdded`, and
`AddedToPurchaseOrder`.

**Why:** a message that carries only an id acts as the parameters of one call.
A consumer that cannot act on it alone must keep a copy of the earlier event's
state, or read another component's store. One model kept a stream for each
document only so that a `Voided` that carried just the document id could
reach the stream that needed it. With the context on the upstream events,
that stream and the handlers that passed the void on went. A reply on the
Eventide Slack put it this way: "Messages aren't subject to normalization.
They're subject to contextualization."

**In the model:** when the design needs context that an existing upstream
event does not carry, change the upstream event. Do not add a stream to work
around it. Mark the attributes that it adds as `proposed`. An event has one
schema: if the schema is wrong, change it everywhere, stored events
included, so that no consumer has to handle old versions of an event. Stored
events are backfilled with the context, and a handler does not accept an
event without it: a handler that tolerates missing context hides bad data.

### Give at once what is known at once

When the information for an act is known at one time, one message carries all
of it. Do not split it into a message that starts a thing and more messages
that add its parts, such as a command that opens a document and a command for
each of its lines. A large and complex schema is not a fault when it holds
what the handler needs to act. The lines of one document are one fact ("A
screen action can send several commands").

Use separate messages only for parts that become known at different times,
such as a due date that is corrected after issue ("A value that is set and
then changed has an Add and a Change").

**Why:** a thing given in pieces cannot be checked or calculated as a whole
until its last piece arrives, so the work that needs the whole moves to a
later message or into the projection. In one design, a document was opened by
one command, and each line was added by a command of its own. The opening
event could not hold the totals, because no line existed yet, so the entity
added up the totals as each line was applied. When the lines later moved into
the opening command, the totals stayed in the projection, where the old shape
had put them, and no event recorded them until the document was issued.

**In the model:** a command that starts a thing carries all that the sender
knows at that time. For a command that adds a part of a thing, name the
requirement in which the part becomes known later than the thing. If there is
none, put the part on the command that starts the thing.

### A command acts on the entity's current state

The stream names the entity, and the handler decides from its current state
which part a command means: the latest start, the latest end, the open
request. Do not give a command a key that picks out a part of the entity,
unless a requirement needs to act on a part that is not the current one. An
event can still carry that value as context, so that a reader sees what
happened: an agreement's `EndDateRemoved` carries the end date that no longer
applies.

**Why:** a key on a command is database-update thinking: an `UPDATE` needs the
row's key. It also tends to serve an improbable case, such as cancelling an
older start of an agreement while a later one stands, and every message then
carries it. "A message carries its context" is about events telling a reader
what happened, not about commands choosing a target.

**In the model:** for each command attribute that selects part of the entity,
name the requirement that needs it. If there is none, remove it.

### A screen action can send several commands

What seems to happen on a screen does not have to map one-to-one to the
commands that the screen sends. When a user selects five items and applies
one action to all of them, the screen can send five commands, one for each
item. Shape a command around what its handler decides, not around the
screen.

**Why:** a command that takes a list must decide what happens when one item
of it cannot be done, and the screen then needs a partial answer. A list
belongs on a command only when the list is one fact: one payment that
settles several invoices, with one calculation, is one fact, so its command
names them all.

**In the model:** for a command that takes a list, say why the list is one
fact. If it is only what the screen shows together, take one item.

### A value that is set and then changed has an Add and a Change

When a value is set once and can change later, such as an assignment's client
or a worker's terms, give it two commands and two events:

- `Add<Value>` and `<Value>Added` for the first value.
- `Change<Value>` and `<Value>Changed` for a business change from then on.
- `Correct<Value>` and `<Value>Corrected` only when a requirement must put
  right an error in the past. A change applies from now on; a correction says
  that the old value was wrong.

One handler takes both commands. It decides from the entity's current state,
not from the command's name:

- no value yet: write `<Value>Added`;
- the same value: ignore, and log that it is not changed;
- another value: write `<Value>Changed`.

The command says what the sender meant. The event says what happened to the
entity. So the order of arrival does not matter: a `Change` that arrives
before the `Add` writes `Added`, and the `Add` that arrives after it writes
`Changed` when the values differ. Nothing is refused, and nothing is lost. The
cost: the command that is handled last sets the value, even when it was sent
first. The screen shows the value as it is, so a person can see it and change
it again.

A command expresses intent, and an event records what was decided, so one
command can lead to different events. One command is enough when the sender
means the same thing in every state of the entity. For example, an `Open`
command that means "open from this time" can write `Opened` the first time,
`OpenedEarlier` when a later `Open` gives an earlier time, and nothing when it
gives the same or a later time. Use two commands when the first value and a
later change mean different things to the sender.

Do not use a `Change` command for the first value. One design's `ChangeTerms`
had to be sent before anything else could happen, and the first time it was
sent, it changed nothing.

**In the model:** list both commands and both events, and give each command
its own handler entry with the same branches. Walk a scenario in which the
`Change` arrives before the `Add`.

## Order, guards and faults

### Accept messages in any order of arrival

In a distributed system, messages can arrive in any order, above all those
from different components. They are delayed, sent again, and overtake each
other: the network is not reliable, and latency is not zero. A component that
accepts them in any order is less coupled to its senders, which need not send
in a set order, and is more reliable than one that waits for the expected
order or refuses another. Record what arrives, and deal later with a state
that the expected order would not have made.

For example, a component that records shipments can receive a shipment for an
order before the order itself, because the order comes from a slower system.
A shipment for an unknown order looks wrong. But if the shipment is recorded,
the fact is kept whether the order arrives or not, and something can deal
later with a shipment for an order that never arrived.

A command handler also tries to accept commands in any order. It balances
that against two costs: the entity's own state must stay correct, and the
complexity must stay low. Accept where it is cheap: a fact that only adds to
the entity, and changes nothing else, can come before the fact that it seems
to follow. Refuse, with an answer, where to accept would need the entity to
hold or pair messages that have not arrived, or would break a rule that the
entity keeps, such as a booking checked against the seats left when it
arrives. A command sent again is the usual case, and its own id makes it
cheap: see "Every handler is idempotent".

**In the model:** a handler of another component's event, or of a command
from another system, records what arrives, whatever has or has not arrived
before it. Walk the orders that two consumers or two components can produce:
a credit note recorded before its invoice, for example, which the screen
marks until the invoice arrives. A command handler that refuses a command
because of what has or has not arrived before it says why, in the model:
what accepting it would cost.

### Write from what the stream knows

Write each requirement, condition and note from what is known: the messages
that have arrived on the stream. A fact that another component owns exists
for this stream only from the moment it arrives. Never describe a state that
the stream cannot see, such as a void "in flight", "pending" or "not yet
arrived", and never a gap measured from outside, such as "the consumer's
lag". A condition about another component's fact names what the stream has
recorded: "the worker's stream has recorded a void for the document".

**Why:** in a distributed system with no two-phase commit, a component always
finds out about another component's facts later, and it can never know that
something is on its way. A rule written from outside promises what no handler
can check, so it seems to disagree with the scenarios that show the later
arrival, and a reviewer stops trusting the list. A rule "a voided document is
not paid" read as broken by the scenario in which a void arrives after the
payment.

**In the requirements and the model:** a requirement about another
component's fact says what the system has recorded: "the system MUST NOT pay
a share whose void it has recorded". A handler's condition or a note names
what the stream has recorded. What happens when the fact arrives after a
decision is a separate scenario, written as an arrival: "a void that arrives
after the payment".

### Guard only where it is strictly necessary

A stream gets a message from another stream in two ways: it subscribes to
the other stream's events, or the other stream sends it a command. Nothing
else is sent to a stream. A handler can refuse either, but the refusal means
a different thing:

- **A command** asks the stream to decide, so the stream is always free to
  refuse it. Keep the refusals to those that are strictly necessary, and
  leave the rest to the application or to a correction. A design is often
  simpler when it is organised so that a command is never refused, because
  then no sender has to plan for a refusal. A check that completes a set of
  checks on the same command may stay for consistency ("Design for least
  surprise and solubility").
- **An event** is a fact in the stream that owns it. A subscriber can decline
  to process it, but it cannot undo it: the fact stays in its own stream,
  whatever the subscriber does. So a subscriber records the fact and corrects
  forward.

A command that records an action already taken in another system shows both
sides. When the money that it records moves only later, it can still refuse:
it refuses an item that has since been cancelled, and the person corrects the
other system before the money moves. It need not check a date that only a
stale screen could get wrong, when the check would make the component turn
times into dates and add guards to other commands. It can check a date that
every command able to break it writes to the same stream: that guard needs
nothing new, and the stream keeps it in every order of arrival.

**Why:** every guard costs a rejection, a reason, and often another guard to
keep it true. One design's date check would have made the component turn
times into dates, and needed refusals on two other commands that existed only
to keep it true.

**In the model:** a refusal is a branch of a handler of a command, never of a
subscribed event. For each one, say why it is strictly necessary. If nothing
needs it, move the check to the application, or let the command through and
correct forward. Before you propose a refusal, check it against the other
rules here: a blank attribute is the command's validation, and a message can
arrive in any order.

### A command's own attributes are checked by its validation

A check that needs nothing but the command's own attributes is the command's
validation, at the sender, not a refusal by its handler: a required attribute
is present and not blank, an id is a UUID, a revision is an integer, a time
is in ISO 8601. An invalid command never reaches the command stream. For
example, a `Void` is refused there when its `reason` is blank.

So a missing or blank attribute is never a rejection reason or an ignore. A
handler's rejections and ignores are decisions from the entity's state. A
condition that depends on state is not validation either: when a note is
required only for some approvals, the application requires it.

**Why:** a rejection for a blank attribute adds a reason, a branch and a walk
for a check that the sender already makes, and that the handler never sees
fail.

**In the model:** on a command, an attribute without `?` is required, and its
validation refuses it missing or blank. Do not list that as a reason or an
ignore. When a requirement says that a command carries something, such as
"with a note", its row in Design coverage names the validation.

### Stop the line on incoming data that is wrong

A handler that cannot read a message, because a value that it needs is
missing or in a form that it does not know, raises an error and stops. It
does not skip the message, guess a value, or log the message and go on. The
component host reports the error, and the consumer starts again at the same
message and fails again, until the fault is corrected where it is:

- a fault in the handler is corrected by a release that reads the message;
- a fault in the message is corrected in the component that wrote it, and a
  sysadmin corrects the stored message from that component's own records.

Nobody moves a consumer past a message. This is "stop the line": the fault is
fixed when it is found, not carried forward.

A stop is not a guard. A guard refuses a fact for a business reason, which
"Guard only where it is strictly necessary" forbids for a subscribed event. A
stop says that the data is not yet a fact that the handler can record. It is
also not a domain failure: a domain failure is an outcome that the business
expects, so it is recorded as an event; wrong incoming data is a fault, so it
stops the line.

**Why:** a message that is skipped or read with a guessed value loses or
changes a fact, and nobody knows. The result is found later, if at all, far
from its cause. A stop is loud, and its cost is a wait: every message behind
it in the category waits until the fault is corrected.

**In the model:** no `ignores` entry covers a message that the handler cannot
read. The requirements say what stops and how it is corrected, and the design
accepts the wait as a problem with its own id.

## Simplicity

### Design for least surprise and solubility

A component should do what a reader expects of it: the principle of least
surprise. Its process should also be easy for an engineer to understand: its
solubility. When two designs are equally correct, choose the one that
surprises less and reads more easily.

One result: a check that is one of a set on the same command may stay for
consistency, even when it is not strictly necessary, because a gap in the set
reads as a mistake. A refusal of a payment with nothing to pay can stay beside
the other checks on a payment, even when the screen would stop it anyway.

**In the model:** when two choices are close, say which one surprises less,
and record that reason with the decision.

### Compensating events are a warning

When a design keeps adding events that take back, undo or apply again what
other events did, to deal with one scenario after another, stop and raise it
as a concern. Each one is a new path for the walks to cover, and together
they usually patch a shape that is wrong. Look for ways to reduce the
complexity before you add the next one, and start with the list below.

For example, a component recorded incoming documents from a start time, and
each customer's agreement decided which recorded documents were paid. When the
change-over to the new system had to happen later, the first design moved the
recording start time later. That needed an event to take records back out, an
event to put them back if the time moved again, and a rule for records that
had already been paid. The simplification: an agreement may not start before
the recording start time. A later change-over is then a later start of the
agreements, the documents recorded before an agreement's start are never paid
through it, and nothing recorded is ever taken back.

**In the model:** when a handler only takes back or applies again what another
handler wrote, say so in the model's `questions`, and record the concern in
the design document's Open.

**Ways that complexity has been reduced:**

- **Let the entity that acts be bounded by what is recorded.** Record facts
  generously, and let a later decision, made by the entity that acts, choose
  which of them count, with the rule that it may not reach back before the
  recording starts. A change to what is acted on is then a change to that
  entity, not to the records, and no record is ever taken back. The recording
  start then only needs to move earlier, which only adds records.
- **Look for a rule or a command that already covers the case.** Read the
  requirements and the commands before you add a message: a constraint may
  already stop the case from happening, and a command may already carry what
  it needs. In the proposal, name the nearest one and say why it is not
  enough. If a second new message is needed to patch the first, look again
  for a simpler shape.
- **Keep operations off the stream.** A replay or a backfill is a step that a
  person or a tool does, not a fact about the entity. A message that combines
  a fact with an operation cannot be named ("Name messages in plain business
  words").
- **Correct forward with a new fact, not with a compensation.** Record what
  happened next, such as "paid, then cancelled: money is owed back", instead
  of undoing what happened. A compensation is often impossible once money or
  goods have moved, and it adds coupling.
- **Follow the real process, not states added for it.** Ask how people do the
  work before you model a pause in it. When they do it in one sitting, a held
  or prepared state, with its discard and its ageing, is not needed.
- **Do not lock where a person is on every path.** A lock protects a step that
  a machine does with no person in it. Where a person decides each step, a
  missed correction can be put right in the next one.
- **Decide in one place, and record in the other.** When two places would
  calculate the same thing, let one calculate, and let the other record the
  result and check the inputs that it started from. Otherwise the two
  calculations must stay the same, or correct work is refused.
- **Accept a rare limitation that leaves true information.** A guard or an
  event that costs more than the breach is not needed ("Guard only where it is
  strictly necessary"). Write the limitation down, so that the reviewer can
  agree to it.

### Record every "simpler if" decision

When a decision makes the design simpler, "this is simpler if that", write it
down at once: the decision, what it removes, and what it costs. For example, a
stream that holds the one agreement between two parties, with its terms and
all of its starts and ends, removes three questions: a calculation uses the
terms as they are, one payment can hold items from two periods, and a restart
is a new start of the same agreement. The cost: an item is calculated with
the terms as they are when it is paid, not as they were when it was issued.

**Why:** these decisions are the easiest to lose. Afterwards the simple design
looks obvious, and nobody can see the questions that it removed. A reviewer
then opens them again, and nobody can show that the answer was not easy to
find.

**In the requirements and the model:** record it in the design document's
"Model selected", and as an entry in the change log, with what it replaced. A
scenario note can point to it, but a note is not the record.

## Keeping the documents true

### When a term changes, change it in every current document

A term is a word that the design gives a special meaning: an entry in the
design document's Terms, a requirement id, or the name of a message, an
attribute or a rejection reason. When a decision changes a term, change it in
the same commit in every document that says what is true now: the design's
own files, the model and its panels included, and the project's guides. Do
not leave it for a later rewrite. Leave history as it is: the
change log, any work log, and each document with a date in its name, such as
a plan for one piece of work. Each records what was true on its date. A
quotation, or an account of what happened, keeps the words of its time.

When the decision that renames a message also changes its attributes or what
its handler does, put the whole decision into the model in the same commit,
so that the model never shows a new name with an old shape.

**Why:** a reader takes each word in a current document as current. A design
document kept an old term for a later rewrite, after a decision had replaced
it. The next reader used the old term in a proposal to the reviewer, who had
to correct it. A question asked in an old term can also get an answer about
the old thing. A design that kept a renamed command's old name in its model
also hid the reason for the rename: the new name gave the command's undo a
noun.

**In the requirements and the model:** before you commit a decision that
changes a term, search the design's folder and the project's guides for the
old term in each of its forms, such as the verb, the past tense and the noun.
Change each use outside the history.

### A pattern in a model is not a rule

When an existing model does something that this skill does not allow, follow
the skill and raise the pattern as a question. Do not copy it to new places.

**Why:** a pattern copied from a model looks agreed, and it spreads a
mistake. In one design, a handler listed its idempotence ignore in `ignores`,
and that pattern was copied to six more handlers, although the model format
says not to list the idempotence ignores.

**In the model:** put the pattern in the design document's Open until the
reviewer decides.

## Patterns you will meet

From the purchase order example and the designs before it:

- **A request to another component.** Record the intent (`…Initiated`). Send
  the command and record that it went (`…Sent`). Then record the reply
  (`…Added` or `…Rejected`). From the `…Initiated` to the reply, the request
  is in progress.
- **A correlation id.** Put an id on the request (`addition_id`, a UUID v5 of
  the target's id and the command's id) and copy it onto the reply. The
  requester ignores a reply whose id is not the one that it waits for.
  Without it, requests to A, then B, then A again can make the requester act
  on the reply to the first A.
- **Cancel by clearing the pending id.** To abandon a request in flight, clear
  the pending id. The late reply is then ignored. The handler that sends the
  request checks the pending id too, so a request that is not yet sent is
  never sent. Without that check, a cancel handled before the send leaves the
  target holding what the requester has abandoned (the example's scenario 4).
- **Undo early.** When a new request replaces one that is still in flight,
  send the undo, such as `RemoveAssignment`, at once, and assume that it
  succeeds. The purchase order design chose this over rejecting the second
  request.
- **Pass a rejection through.** The requester's rejection copies the reasons
  of the reply. The screen must show a sensible message for a reason that it
  does not know.
- **One stream before a workflow.** When an invariant fits in one stream, keep
  it there. One design rejected a stream for each payment with two-phase
  holds, and compensating events, because its invariant fitted in one stream
  and a person's action in an outside system sat inside the window.
- **Select by query, not by reaction.** Things that a person chooses from are
  shown from a read model built from this component's events, with their
  states computed at query time. Nothing gets stuck when messages arrive out
  of order.
