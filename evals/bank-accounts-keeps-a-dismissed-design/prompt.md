---
description: Asked to keep a dismissed candidate as a panel, the skill writes its model in dismissed/ first, draws it after the overview, and draws a dashed arrow for every handler of an event.
tags: [stage-4]
runs: 3
max_turns: 60
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/. I have reviewed the model and the scenarios, and
I agree them. Draw the overview panel. Also keep candidate C, transfers in
the account stream, as a panel, so that a later reader can see why we did
not choose it.
