# Organisation overlays: rules only, and the skill does not look for one (2026-10-22 15:32)

- [decision] An organisation's own guidance is expected to matter: the first
  organisation to use the skill may use events and name attributes in other ways.
  - So an overlay must be able to replace a core rule, not only add details.
- [decision] An overlay entry is a rule in the core's form that says whether it
  narrows a core rule, replaces one, or is new.
  - [rejected] A table of settings with defaults, and a "checked against"
    version line. Sam Stickland: there is no evidence that organisations differ
    by settings. The one overlay so far is Hubbado's, and the core came from
    Hubbado's guide, so it cannot show how organisations differ.
  - More structure waits for a second organisation's overlay.
- [decision] The skill does not refer to an overlay in any form.
  - An agent told to look for an overlay looks for one, and the first person
    to try the skill will have none.
  - The organisation's agent instructions name its overlay and say that it
    decides over the skill.
  - [rejected] The skill reads an overlay installed beside it under a fixed
    name. It needs the skill to know about overlays.
- [decision] The skill gives no instruction to change itself, or a project's
  rules.
  - An agent cannot change an installed copy, and `gh skill update` overwrites
    it.
  - How to write a rule is in CONTRIBUTING.md, for people.
- [finding] Waytide, by the Eventide Project, keeps a project's own rules
  apart from installed packages, and the project's rules decide.
  - It has no organisation level: a project is one repository.
  - Its lesson taken here: an entry says whether it narrows or replaces.
