# The reviewer decides before the agent builds on it (2026-10-23 11:15)

- [finding] Another session got the same request for bank accounts. Before
  its first stop it wrote the requirements, compared four candidates, wrote
  the model and nine scenarios, had a fresh session walk them (about 160k
  tokens and 17 minutes), and corrected what that walk found.
  - It followed the skill. Stage 1 said "Until the reviewer answers, write
    what you expect, and put the question in Open", and the first stop came
    after the model.
  - It wrote "Other users" from its own expectations, and that row decided
    between two candidates that the rest of the table did not.
  - It added two rules that the request did not make: only an open account
    takes deposits and withdrawals, and an account closes only when it is
    empty. The two serious findings of the fresh walk, money in no account and
    an escape hatch that recorded nothing, came from the first.
  - Four of the five questions in its Open needed no model to ask.
- [problem] The session read the work log entries of the two runs before it,
  before it was told not to. Its choice of model is not a clean result.
- [decision] The skill says that it is design with the reviewer, not for the
  reviewer: the agent does not build on a decision that the reviewer owns
  until the reviewer makes it. Sam Stickland: "the idea of this flow is to do
  augmented design, human + agent, it's not really working if the agent does
  too much up front."
- [decision] A stop after the draft requirements, before any candidate. The
  agent names each requirement that is its own assumption, and asks only the
  questions whose answers can change a stream, a component, or a requirement
  that a stream rests on: what a thing can do after it ends, what the business
  does when a step fails after an earlier step had an effect, and "Other
  users".
  - [rejected] Ask the reviewer to confirm the whole list. A reviewer skims a
    long list and says yes.
  - [rejected] An interview. A question whose answer cannot change the model
    is an assumption that the agent states and continues on.
- [decision] A stop after the candidates and their table, before the model.
  The sketches name each stream's component, and the reviewer selects the
  candidate.
  - It is a stop before the whole model, not between its parts, so it does not
    reverse the rejection of a stop before the protocols (2026-10-22 20:03).
- [decision] The agent tells the reviewer about each candidate that it would
  reject, in the conversation: its sketch, what it does better than the one
  recommended, and the row that rejects it. Sam Stickland asked for this.
  - Each shape that a walk drops is told when the model is presented.
  - The change log still records each one. It is not where the reviewer first
    learns of it.
- [rejected] Moving the fresh walk to after the reviewer's review of the model.
  With the two stops, the model that it checks rests on the reviewer's
  decisions. A judgement, not a measurement.
- [open] A headless test now stops after the requirements, and must give its
  answers in later turns.
