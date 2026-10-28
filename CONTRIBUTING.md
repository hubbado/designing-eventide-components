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

Give a new rule a case in `evals/` that fails on the skill without the rule
and passes with it. Write the case first, and run it with `bin/run-evals` to
see it fail: a case that passes before the rule does not test the rule. A run
shows what the text cannot: whether the agent loads the skill, and whether it
keeps the rule in a design. A grader written from a rule has also found an
example that broke the rule. A change that only corrects the words of a rule,
or a list such as the contents, needs no case.

A rule that holds for every Eventide design comes here, as a pull request. A
rule of one organisation goes in that organisation's own document, as the
README says.

## A new way to reduce complexity

A way that a design found to reduce complexity goes in the list under
"Compensating events are a warning" in `references/rules.md`, in the same
form as the ways already there.
