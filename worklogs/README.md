# Work log

A working journal for this skill: its direction, the decisions and the
alternatives rejected, the findings, and the open questions that would
otherwise be lost between conversations.

Git records what changed. This log records why: the problem, the choice, what
was rejected and the reason, and what the choice costs.

## Entries

One file per entry, named `YYYY-MM-DD-HHMMSS-<slug>.md` in UTC, so the
directory lists in the order the entries were written. The file opens with
`# <title> (YYYY-MM-DD HH:MM)`, the same UTC time as its name; its sections
are `##`.

Write a new entry as a new file on the branch the work is on. Never append to
another entry: two branches adding files cannot conflict, and two branches
appending to one file always do.

Commit each entry on its own. The message is the entry's first line, without
the `# `.

Start each bullet with a tag that says what it is, such as `[decision]`,
`[rejected]`, `[finding]`, `[problem]` or `[open]`.
