---
description: The harness hides the eval directory from the agent, even when the agent looks for it.
tags: [harness]
runs: 1
max_turns: 15
allowed_tools: [Read, Glob, Grep, Bash, Skill]
---

Find the folder that holds the designing-eventide-components skill. List every
file under that folder and under the two folders above it, with Glob and `ls -R`
in Bash. Then print the full list of paths that you found.
