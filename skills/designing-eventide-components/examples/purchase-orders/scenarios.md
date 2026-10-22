# Purchase order assignments: scenarios

The scenarios that test the example model `event-flows.yaml`, in the format
that [scenarios-format.md](../../references/scenarios-format.md) describes.

In a step table, **Caused by** is the step whose handler writes or sends the
message, or the user who sends a command from a screen.

## 1. An assignment is added to a purchase order, and later removed

The usual case, from start to finish. A purchase order is created, and an assignment gets the same currency and client. The assignment asks the purchase order to add it, and records the answer. Later a user removes it. It tries to break no requirement.

Walked: 14 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Create | purchase_order_id PO1, client_id C1, currency GBP, value 5000.00 | user |
| 2 | Created |  | 1 |
| 3 | AddCurrency | assignment_id A1, currency GBP | user |
| 4 | CurrencyAdded |  | 3 |
| 5 | AddClient | client_id C1 | user |
| 6 | ClientAdded |  | 5 |
| 7 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X1 | user |
| 8 | AddToPurchaseOrderInitiated |  | 7 |
| 9 | AddAssignment | client_id C1, currency GBP | 8 |
| 10 | PurchaseOrderAddAssignmentSent |  | 8 |
| 11 | AssignmentAdded |  | 9 |
| 12 | AddedToPurchaseOrder |  | 11 |
| 13 | RemoveFromPurchaseOrder |  | user |
| 14 | RemoveAssignment | purchase_order_id PO1 | 13 |
| 15 | RemovedFromPurchaseOrder | purchase_order_id PO1 | 13 |
| 16 | AssignmentRemoved |  | 14 |

**1–6.** Each holds its own currency and client: the purchase order from its creation, the assignment from its own commands.

**7–10.** The assignment records that it is being added to PO1, with the addition id X1. A second handler sends the request, with the assignment's currency and client, and records that it went.

**11–12.** The currencies and the clients are the same, so PO1 adds A1. The assignment records the answer, because X1 is the addition that it waits for.

**13–16.** The command does not name the purchase order: the assignment knows that it is on PO1. It tells PO1 to remove it, and records the removal at once. It assumes that the removal succeeds, because RemoveAssignment cannot be refused.

## 2. Purchase orders refuse an assignment in another currency or for another client

A1 is in GBP for client C1. PO1 is in EUR, and refuses A1 for its currency. PO2 is for client C2, and refuses A1 for its client. Each time, the assignment records the refusal with the purchase order's reason and data, so that the screen can show why.

Tests: same-currency, same-client. Walked: 14 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Create | purchase_order_id PO1, client_id C1, currency EUR, value 5000.00 | user |
| 2 | Created |  | 1 |
| 3 | Create | purchase_order_id PO2, client_id C2, currency GBP, value 5000.00 | user |
| 4 | Created |  | 3 |
| 5 | AddCurrency | assignment_id A1, currency GBP | user |
| 6 | CurrencyAdded |  | 5 |
| 7 | AddClient | client_id C1 | user |
| 8 | ClientAdded |  | 7 |
| 9 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X1 | user |
| 10 | AddToPurchaseOrderInitiated |  | 9 |
| 11 | AddAssignment | client_id C1, currency GBP | 10 |
| 12 | PurchaseOrderAddAssignmentSent |  | 10 |
| 13 | AssignmentRejected | reason currency_mismatch, data "purchase_order_currency EUR, assignment_currency GBP" | 11 |
| 14 | AddToPurchaseOrderRejected | reason currency_mismatch | 13 |
| 15 | AddToPurchaseOrder | purchase_order_id PO2, addition_id X2 | user |
| 16 | AddToPurchaseOrderInitiated |  | 15 |
| 17 | AddAssignment | client_id C1, currency GBP | 16 |
| 18 | PurchaseOrderAddAssignmentSent |  | 16 |
| 19 | AssignmentRejected | reason client_mismatch, data "purchase_order_client_id C2, assignment_client_id C1" | 17 |
| 20 | AddToPurchaseOrderRejected | reason client_mismatch | 19 |

**11, 13.** The purchase order decides, because it holds its own currency and client. The assignment sends its own in the command. The currency is checked first.

**14.** Effect. The assignment copies the reason and the data of the refusal, and is no longer being added. The screen shows why. It reads the reason and the data, and gives a sensible message for a reason that it does not know (rejection-shown).

**15.** A1 is on no purchase order, and is being added to none, so this is a new addition, not a move.

**20.** Effect. As step 14.

## 3. The assignment answers some requests itself

The assignment refuses a request while it has no currency, and then while it has no client. When it is being added to a purchase order, or is on it, it ignores a request for the same purchase order. None of these reaches the purchase order.

Tests: currency-and-client-first. Walked: 14 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Create | purchase_order_id PO1, client_id C1, currency GBP, value 5000.00 | user |
| 2 | Created |  | 1 |
| 3 | AddToPurchaseOrder | assignment_id A1, purchase_order_id PO1, addition_id X1 | user |
| 4 | AddToPurchaseOrderRejected | reason no_currency | 3 |
| 5 | AddCurrency | currency GBP | user |
| 6 | CurrencyAdded |  | 5 |
| 7 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X2 | user |
| 8 | AddToPurchaseOrderRejected | reason no_client_id | 7 |
| 9 | AddClient | client_id C1 | user |
| 10 | ClientAdded |  | 9 |
| 11 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X3 | user |
| 12 | AddToPurchaseOrderInitiated |  | 11 |
| 13 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X4, ignored: the assignment is being added to that purchase order | user |
| 14 | AddAssignment | client_id C1, currency GBP | 12 |
| 15 | PurchaseOrderAddAssignmentSent |  | 12 |
| 16 | AssignmentAdded |  | 14 |
| 17 | AddedToPurchaseOrder |  | 16 |
| 18 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X5, ignored: the assignment is on that purchase order | user |

**3–8.** The assignment refuses at once, because it cannot send its currency and client without them. The currency is checked first. Nothing goes to PO1.

**4, 8.** Effect. The screen shows why, as in scenario 2 (rejection-shown).

**13.** A second click, with a new addition id, while X3 waits for its answer. Only one request goes to PO1.

**18.** A request from a stale screen, after A1 is on PO1.

## 4. An assignment is removed before its request is sent

A user removes A1 while it is being added, and the removal is handled before the assignment sends its request. The assignment then does not send it, so A1 ends on no purchase order, and PO1 does not hold it. This walk found remove-before-send.

Tests: remove, both-agree. Walked: 14 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Create | purchase_order_id PO1, client_id C1, currency GBP, value 5000.00 | user |
| 2 | Created |  | 1 |
| 3 | AddCurrency | assignment_id A1, currency GBP | user |
| 4 | CurrencyAdded |  | 3 |
| 5 | AddClient | client_id C1 | user |
| 6 | ClientAdded |  | 5 |
| 7 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X1 | user |
| 8 | AddToPurchaseOrderInitiated | handled after step 11, ignored: its addition_id is not the pending addition id | 7 |
| 9 | RemoveFromPurchaseOrder |  | user |
| 10 | RemoveAssignment | purchase_order_id PO1, ignored: the assignment is not on the purchase order | 9 |
| 11 | RemovedFromPurchaseOrder | purchase_order_id PO1 | 9 |

**7–8.** The handler that sends the request is in the events consumer, which runs apart from the commands consumer. It is late, or stopped, and has not yet reached step 8.

**9–11.** A1 is being added to PO1, so the assignment tells PO1 to remove A1, and records the removal, which ends the addition X1. PO1 does not hold A1, so it ignores RemoveAssignment.

**8.** Then the handler handles step 8. X1 is no longer pending, so it sends nothing (remove-before-send). If it sent AddAssignment, PO1 would add A1, the assignment would ignore the answer, and PO1 would hold an assignment that is on no purchase order.

## 5. An assignment is removed after its request is sent

A user removes A1 after its request has gone, but before the answer. The purchase order adds A1 and then removes it. The assignment ignores the late answer, because of its addition id, so A1 ends on no purchase order, and PO1 does not hold it.

Tests: remove, both-agree. Walked: 14 Oct, holds.

| # | Message | Data | Caused by |
|---|---|---|---|
| 1 | Create | purchase_order_id PO1, client_id C1, currency GBP, value 5000.00 | user |
| 2 | Created |  | 1 |
| 3 | AddCurrency | assignment_id A1, currency GBP | user |
| 4 | CurrencyAdded |  | 3 |
| 5 | AddClient | client_id C1 | user |
| 6 | ClientAdded |  | 5 |
| 7 | AddToPurchaseOrder | purchase_order_id PO1, addition_id X1 | user |
| 8 | AddToPurchaseOrderInitiated |  | 7 |
| 9 | AddAssignment | client_id C1, currency GBP | 8 |
| 10 | PurchaseOrderAddAssignmentSent |  | 8 |
| 11 | RemoveFromPurchaseOrder |  | user |
| 12 | RemoveAssignment | purchase_order_id PO1 | 11 |
| 13 | RemovedFromPurchaseOrder | purchase_order_id PO1 | 11 |
| 14 | AssignmentAdded | addition_id X1, ignored: its addition_id is not the pending addition id | 9 |
| 15 | AssignmentRemoved |  | 12 |
| 16 | RemoveFromPurchaseOrder | ignored: the assignment is not on a purchase order, nor being added to one | user |

**11–13.** The assignment does not wait for the answer. It tells PO1 to remove A1, and records the removal, which ends the addition X1.

**14–15.** PO1 takes the two commands in the order in which they were sent: it adds A1, then removes it. The assignment ignores AssignmentAdded, because X1 is no longer pending. Without the addition id, it would record that A1 is on PO1, which no longer holds it (both-agree).

**16.** A second removal, from a stale screen.
