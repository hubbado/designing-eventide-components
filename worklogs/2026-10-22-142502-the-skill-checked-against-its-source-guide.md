# The skill checked against its source guide (2026-10-22 14:25)

- [finding] A heading check found a place in the skill for each of the 49
  sections of the source.
- [finding] A comparison by a fresh agent, which had not seen the rewrite,
  found 13 losses and 7 changes of meaning that the heading check could not
  see.
  - Most losses were reasons: why to record dismissed candidates, why a full
    walk needs a new session, and why a domain failure must not raise.
  - One change was an error: domain failures had been merged into rejections,
    so a failed call to an external system would have modelled as a refused
    command.
  - Three differences were deliberate, and stay: "a costly mistake",
    components that communicate "through messages", and no stated reason for
    the hand check.
- [decision] The losses were restored, and domain failures are a part of a
  design of their own again.
- [finding] The source guide gained a rule while the core was written: a
  command's own id goes through each event that the command causes.
  - The core took it the same day.
  - This is the drift that one source is meant to stop: until the source guide
    becomes an overlay, each new rule must be copied by hand.
