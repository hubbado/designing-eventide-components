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

An organisation can add rules of its own, or change the skill's rules, in a
document of its own. The skill does not look for such a document. The
organisation's agent instructions, such as `AGENTS.md` or `CLAUDE.md`, name it
and say that its rules decide over the skill's. Each rule in it says whether
it narrows a rule of the skill, replaces one, or is new.
