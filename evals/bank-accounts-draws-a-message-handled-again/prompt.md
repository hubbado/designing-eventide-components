---
description: A panel of a message that a consumer handles twice draws it once, and puts what the second handling writes later, linked back to that one box.
tags: [stage-4]
runs: 3
max_turns: 60
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are designing bank accounts in Eventide. The design is in
docs/design/bank-accounts/. I have reviewed the model and the scenarios, and
I agree them. Draw one panel: scenario 4, where the transfer's consumer stops
between sending the deposit and recording it.
