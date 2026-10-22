# designing-eventide-components

An Agent Skill that helps a coding agent and a human reviewer design the
messages, streams and handlers of Eventide components, before any code is
written.

The skill is in `skills/designing-eventide-components/`. Only that folder is
installed.

## Install

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

## A project's own conventions

A project adds its own conventions in an overlay: a Markdown file that the
project's agent instructions, such as `AGENTS.md` or `CLAUDE.md`, name. Where
the overlay differs from the skill, the overlay wins for that project.
