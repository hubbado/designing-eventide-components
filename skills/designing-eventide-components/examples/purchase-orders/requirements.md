# Purchase order assignments: requirements

The requirements behind the example model `event-flows.yaml`. The example
covers adding an
assignment to a purchase order and removing it. It leaves out how a purchase
order gets its reference number, moving an assignment to another purchase
order, and changing a currency or a client.

## In brief

- An assignment gets its currency and its client before it can be added to a
  purchase order.
- The assignment asks the purchase order to add it. The purchase order
  decides, because it holds its own currency and client, and the assignment
  records the answer.
- The purchase order adds an assignment only when their currencies and their
  clients are the same.
- An assignment can be removed from its purchase order, also while it is
  still being added. The assignment records the removal at once, and tells
  the purchase order.
- When the flow settles, the assignment and the purchase order agree on
  whether the assignment is on it.

## Terms

- **Purchase order**: a client's order, with a value, one currency and one
  client.
- **Assignment**: work for a client that can be billed against a purchase
  order.
- **Being added**: the assignment has asked a purchase order to add it, and
  has no answer yet. Each request has its own addition id. The model calls
  the addition pending.

## Keywords

Each requirement is a **MUST** or a **MUST NOT**: something that is built and
checked. A permission is written as what the system MUST let a person do.

## Component

### Adding

- **currency-and-client-first.** An assignment MUST NOT be added to a
  purchase order before it has a currency and a client.
- **same-currency.** An assignment MUST be added only to a purchase order that
  has the same currency.
- **same-client.** An assignment MUST be added only to a purchase order that
  has the same client.

### Removing

- **remove.** The component MUST let a user remove an assignment from its
  purchase order, also while it is still being added.
- **both-agree.** When the flow settles, an assignment MUST be on a purchase
  order exactly when that purchase order holds the assignment.

## Application

- **rejection-shown.** When adding an assignment is rejected, the screen MUST
  show why, also for a reason that it does not know.

## Design coverage

| Requirement | Kept by |
|---|---|
| currency-and-client-first | AddToPurchaseOrder: rejected with no_currency or no_client_id |
| same-currency | AddAssignment: rejected with currency_mismatch |
| same-client | AddAssignment: rejected with client_mismatch |
| remove | RemoveFromPurchaseOrder, for the purchase order that the assignment is on or is being added to |
| both-agree | The addition id: the handlers of AddToPurchaseOrderInitiated, AssignmentAdded and AssignmentRejected ignore an addition that is no longer pending |

## Problems found

### Removed, guarded or corrected

| Problem | Outcome | Kept by |
|---|---|---|
| remove-before-send | Corrected: the handler of AddToPurchaseOrderInitiated ignores an addition that is no longer pending, so nothing is sent. Found by scenario 4 | both-agree |

## Model selected

Not recorded. The example shows only the selected model.
