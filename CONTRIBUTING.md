# Contributing

## A new rule

A rule records a cost already paid or a decision already taken, with its
reason. Write it in the form that `references/rules.md` uses: the rule,
**Why**, and **In the model**. Write it for a reader who designs another
component and has never seen the design that taught it. Use general nouns,
such as an entity, a document or a start time, or explain each noun in its
sentence. Give no source that a reader outside your organisation cannot open.

Give the **Why** one example of the problem that the rule prevents, told in
general nouns. A reader, a person or an agent, applies a rule better when it
knows what goes wrong without it. Keep the example within the rule's scope,
give it one lesson, and leave out the details of its fix: a second lesson
reads as a second rule.

A rule that holds for every Eventide design comes here, as a pull request. A
rule of one organisation goes in that organisation's own document, as the
README says.

## A new way to reduce complexity

A way that a design found to reduce complexity goes in the list under
"Compensating events are a warning" in `references/rules.md`, in the same
form as the ways already there.
