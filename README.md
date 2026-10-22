# designing-eventide-components

An Agent Skill that helps a coding agent and a person design the messages,
streams and handlers of Eventide components, before any code is written. The
agent proposes and checks. You decide.

## What it does

The agent works through four stages with you:

1. **Requirements.** What the process must and must not do, in the words of
   the business. No streams or messages yet.
2. **Models.** More than one way to model the process with streams, compared
   in a table. The model that is selected is written as YAML.
3. **Scenarios.** Walks that try to break the requirements: a message that
   arrives twice, late, out of order, or at the same time as another. Each
   problem that a walk finds gets a decision.
4. **Panels.** Lane diagrams of the model, drawn only when you ask for them.

## What you get

One folder for each design, such as `docs/design/<topic>/`:

- `design.md`: the requirements, the open questions, the problems found, and
  the model selected.
- `event-flows.yaml`: the model.
- `scenarios.md`: the walks, step by step.
- `event-flows.html`: the panels, when you ask for them.
- `changes/`: the change log, which says why each decision was made and what
  was rejected.

`skills/designing-eventide-components/examples/purchase-orders/` shows a
small finished design.

## Install

The skill is in `skills/designing-eventide-components/`. Only that folder is
installed.

With the GitHub CLI (`gh skill` is in preview):

```
gh skill install hubbado/designing-eventide-components designing-eventide-components --agent <agent> --scope user
```

`--agent` names your coding agent, such as `claude-code`, `codex`,
`github-copilot`, `cursor` or `gemini-cli`. The command copies the skill;
`gh skill update` brings the copy up to date.

To work on the skill, link its folder into your agent's skills folder
instead, so that each edit takes effect at once. For Claude Code:

```
ln -s "$PWD/skills/designing-eventide-components" ~/.claude/skills/designing-eventide-components
```

## Use it

Ask your agent for a design, in your own words:

> Design the event flow for a library: a member can reserve a book and cancel
> the reservation, and a reservation lapses when the book is not collected
> within three days.

The agent loads the skill when your request matches it. If it does not, name
the skill: "Use the designing-eventide-components skill to …".

- **You are the reviewer.** The agent asks you questions, and stops for you
  when it presents the model and the scenarios. You decide the words of each
  requirement, each problem that is accepted, and each name that does not fit.
- **Correct the documents, not only the conversation.** A correction changes
  the requirements, the model or the scenarios first. The documents are the
  design; the conversation is not.
- **Ask for a fresh walk after a large change.** A new session, or a
  sub-agent, walks every scenario again from the documents alone. The walk of
  the session that wrote the design carries its own assumptions.
- **Ask for panels when you want to see the design.** The agent draws the
  first one or two, and stops for your review. To look at them, serve the
  design's folder with `python3 -m http.server 8765 --bind 127.0.0.1` and open
  `event-flows.html` in a browser.

## Your organisation's own rules

An organisation can add rules of its own, or change the skill's rules, in a
document of its own. The skill does not look for such a document. The
organisation's agent instructions, such as `AGENTS.md` or `CLAUDE.md`, name it
and say that its rules decide over the skill's. Each rule in it says whether
it narrows a rule of the skill, replaces one, or is new.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The reasons behind the skill's own
decisions are in [worklogs/](worklogs/).

## Licence

MIT, copyright Hubbado Ltd. See [LICENSE](LICENSE).
