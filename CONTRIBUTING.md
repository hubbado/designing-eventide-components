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

A new rule, or a change to what a rule asks, merges on one of two kinds of
evidence:

- **A recorded failure.** A design's change note, or a walk of its scenarios,
  shows the skill going wrong without the rule, and the reviewer decided the
  rule. A session that did not write the rule has then walked the design with
  it. Link the failure and that walk in the pull request, and open a grader
  issue that links them too.
- **A grader.** A rule with no recorded failure, written before anything went
  wrong, merges only with its grader.

**Why:** a rule that a design needed, and that waited for its grader, stayed
unmerged for ten days. A later session did not find it, and made the mistake
that it prevents. A rule written in the moment can also be wrong in the
moment: one rule went through five versions in an afternoon, so a walk by a
session that did not write it comes before the merge.

A grader fails on the skill without the change and passes with it. Add it to
a case in `evals/`, or write a new case. A case that resumes a history
(`history_file`) cannot test it, because the history holds the skill's text
from when it was recorded. To run without the change, reverse its diff in a
copy of the repository. Run `bin/run-evals --case <case> --runs 3` there, and
in the repository with the change. The rule's own grader must fail in the
runs without the change and pass in the runs with it: a failure of another
grader does not count. A run shows what the text cannot: whether the agent
loads the skill, and whether it keeps the rule in a design.

A grader issue closes with its grader. When two attempts find no case that
makes the grader fail, put the rule to the reviewer in the issue: it comes
out, or it stays with the reason written in the issue. A rule that changes no
behaviour still costs every reader the context that it fills. A change that
only corrects the words of a rule, or the Contents list, needs no grader.

A rule that holds for every Eventide design comes here, as a pull request. A
rule of one organisation goes in that organisation's own document, as the
README says.

## A new way to reduce complexity

A way that a design found to reduce complexity goes in the list under
"Compensating events are a warning" in `references/rules.md`, in the same
form as the ways already there.
