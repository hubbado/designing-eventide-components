# The skill moves into its own folder under skills/ (2026-10-22 12:35)

- [decision] The skill lives in `skills/designing-eventide-components/`, not at
  the repository root.
  - It reverses the decision of 11:49, that the repository root is the skill
    folder.
  - The work log and the README now stay out of an install.
- [finding] `gh skill install` finds skills by the convention
  `skills/*/SKILL.md`.
  - It accepts a `SKILL.md` at the root, but then it copies the whole
    repository. A local test copied `.git`, `worklogs/` and `README.md` into
    the agent's skills folder.
- [finding] `gh skill` (GitHub CLI 2.101.0, in preview) installs a skill for
  about 48 agents, as a copy, at user or project scope.
  - At project scope, Codex, Copilot, Cursor, Gemini CLI and others share
    `.agents/skills/`.
  - `gh skill publish --dry-run` validates a skill against the specification.
    It accepts this skill, and warns that it has no `license` field.
- [finding] An agent reads a skill's references and examples as plain files,
  with its own file tools, at paths relative to the skill's folder.
  - So the agent must be able to read the folder where the skill is installed.
  - Not known for each agent: how it resolves a relative path, and whether its
    sandbox lets it read a skills folder in the home directory. The tests in
    several agents will show.
- [plan] Work on the skill uses a symlink into the agent's skills folder, not
  an install, so that each edit takes effect at once.
