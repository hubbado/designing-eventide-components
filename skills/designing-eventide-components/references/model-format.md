# The model format

YAML, one file for each design, beside its design document:
`event-flows.yaml` in the design's folder. It is the intermediate format for
the design's decisions, from which the panels are drawn. It models the
component only. It holds no requirements, and no link from a requirement to a
handler that enforces it, such as `enforced_by`: a handler only reads, acts,
writes and refuses to write, so the walks, not a link, show that the flow
keeps a requirement. The application's requirements are not modelled in it;
they are tested when they are built, by specs and interactive tests. The
example is
[examples/purchase-orders/event-flows.yaml](../examples/purchase-orders/event-flows.yaml).

The top level:

```yaml
design: <name>
requirements: <path of the requirements document>
scenarios: <path of the scenarios document>
sources: [<documents and code that the model is taken from>]
streams: {}
outside: {}
handlers: []
questions: []
```

Do not use `on`, `off`, `yes` or `no` as keys. YAML 1.1 parsers, Ruby's
included, read them as booleans.

## streams

Keyed by Eventide category, in camelCase:

```yaml
streams:
  purchaseOrder:
    component: purchase_order_component
    entity: Purchase Order
    key: "{id}"
    why: Holds its currency, its client and its assignments, so the check and the addition are one write.
    commands:
      AddAssignment: [purchase_order_id, assignment_id, addition_id, client_id, currency, user_id?]
    events:
      AssignmentAdded: [purchase_order_id, assignment_id, addition_id, client_id, currency, user_id?]
      AssignmentRejected:
        attributes: [purchase_order_id, assignment_id, addition_id, reason, data, user_id?]
        reasons: [currency_mismatch, client_mismatch]
```

- Message names are the class names, so that you can check them against the
  code.
- An attribute that ends in `?` is optional. On a command, every other
  attribute is required, and the command's validation refuses it missing or
  blank ("A command's own attributes are checked by its validation" in
  [rules.md](rules.md)).
- The attribute that names who acted is required, unless the system can also
  send the command. Then it is optional. The example names it `user_id`.
- An attribute in braces is a list of entries, and each entry has the parts
  in brackets: `{ documents: [document_id, net_amount] }`. A list of ids alone
  is a plain attribute named for them, such as `budget_ids`.
- List `time` on a message whose fact has a time of its own, such as
  `Opened`, and `processed_time` only where the business needs to know when
  the handler wrote the event ("Name attributes within their message").
- An event with `reasons` is a rejection.
- A compound key joins its parts with `+`: `"{supplier_id}+{worker_id}"`.
- Every event on a stream, and every command on its command stream, starts
  with the attributes of the stream's key, in the key's order, because they
  say which entity the message belongs to. A copy of another component's
  event puts them in front of the upstream attributes, even when an upstream
  attribute holds the same value.
- For a stream that you do not design, such as an `invoice` stream of another
  component, add `existing: true`. List only the messages that you use, and
  only the attributes that the design reads. Its events come from outside, so
  a step that is one of them needs no cause.
- An event of an `existing` stream that the design changes uses the map form.
  `proposed` names the attributes that the message class does not have yet:

  ```yaml
  Voided:
    attributes: [invoice_id, supplier_id, { line_items: [worker_id, net_amount] }, user_id]
    proposed: [supplier_id, line_items]
  ```
- `component` names the component that holds the stream. For a new stream,
  leave it out until the walks are done, and then decide it ("Afferent
  components take commands, and efferent components orchestrate them" in
  [rules.md](rules.md)). An `existing` stream has its component from the
  start.
- The order of `streams` is the order of the lanes in every panel. Put the
  stream that starts the flow first. When the components are decided, keep
  each component's streams together.
- Refer to a message by its name. Where two streams have a message with the
  same name, such as `Issued` on `invoice` and on `creditNote`, write
  `invoice.Issued`.

## outside

Things outside the message store that the flow touches: a read model, the
application's screens, or an external system.

```yaml
outside:
  Open items:
    kind: read model
    owner: web application
    changes:
      ItemRecorded: [document_id, worker_id, net_amount, due_date]
```

- `owner` is the component or application that owns a read model or a record
  store. A read model for the application's screens can be the application's
  ("A component holds its state in streams, not in an SQL database").
- `changes` are what handlers write. They are named like events, so that
  handlers can write them and panels can draw them. They are not messages,
  and a step table does not show them as messages
  ([scenarios-format.md](scenarios-format.md)).
- What a person does in an outside system, such as typing figures into
  another company's system, is not a message: no handler writes it or reads
  it. Tell it in the note on the command that follows, not as a step.

## handlers

```yaml
handlers:
  - component: purchase_order_component
    handles: AddAssignment
    reads: [currency, client_id, assignments]
    one_of:
      - writes: [AssignmentAdded]
      - when: currency differs
        writes: [AssignmentRejected]
        reason: currency_mismatch
      - when: client differs
        writes: [AssignmentRejected]
        reason: client_mismatch
    ignores: [the assignment is on the purchase order]

  - component: assignment_component
    handles: AssignmentAdded
    reads: [pending_addition_id]
    writes: [AddedToPurchaseOrder]
    ignores: [its addition_id is not the pending addition id]
```

A handler reads messages, takes actions, writes messages, and refuses to
write them. The fields say which:

- `handles`: the message that the handler receives. It is a command to this
  component, or an event of this component or of another component.
- `reads`: the state that the handler's decision uses, when it has `one_of`
  or `ignores`. It is state of the one entity or row that the handler writes.
- `writes`: events on this component's streams, or `changes` of an outside
  thing. A change of an outside thing is an action.
- `sends`: commands to another stream's command stream.
- `one_of`: the outcomes, when they depend on state. Each branch has `when`,
  a condition of a few words that becomes the label on the arrow. A branch
  that writes a rejection writes it because something reacts to it. Put
  longer reasoning in a note.
- A command handler accepts by default: the sender's validation refuses a
  command that is not valid before it is written, and the handler's
  rejections are the exceptions. So the branch that writes the command's
  event, when no rejection applies, has no `when`, and its arrow has no
  label. Write only the conditions of the rejections.
- `ignores`: the business conditions in which the handler refuses: it writes
  nothing, and logs. Do not list the idempotence ignores ("already
  processed"); `idempotence` covers them.
- `idempotence`: only when it is not the sequence check: `reservation`,
  `upsert-version`, `state-guard`, or a sentence.
- `component`: as for a stream, left out of a new handler until the walks are
  done.
- One entry for each pair of component and message. Two components can handle
  the same event.

## questions

The decisions about the model that you need from the reviewer, one line each.
Questions about a requirement go in the requirements document's Open. A
question about a message's shape names the exact message, and shows its
attributes where the choices differ. A loose noun, such as "the copy", can be
read as a neighbouring message, and the answer then lands on the wrong one: in
one review, "each worker's copy" was read as a different event.
