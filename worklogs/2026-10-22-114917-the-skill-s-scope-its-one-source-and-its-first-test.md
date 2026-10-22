# The skill's scope, its one source and its first test (2026-10-22 11:49)

The skill starts from Hubbado's guide to the design of event flows, with its
presentation guide and its worked example.

- [decision] The skill is for Eventide components only, for now.
  - [rejected] Event-sourced stores in general, such as KurrentDB, Marten and
    Axon, each with an adapter file; and event-driven systems in general.
    Sam Stickland: "I am only interested in doing this for Eventide right now".
  - The Eventide mechanisms, such as `expected_version`, categories and command
    streams, stay in the core, with no adapter layer.
- [decision] One source: the core lives in this repository, and each project
  adds its local conventions in an overlay.
  - [rejected] A copy of the core, extracted once from the source guide. The
    source guide changed almost every day, so a copy would drift within weeks.
  - Each new rule gets its layer, core or overlay, when it is written.
- [decision] The skill is about design, not implementation, so the core
  describes the idempotence mechanisms in general terms.
  - The names of a project's own libraries belong in its overlay.
- [decision] The design rules in the source's component conventions move into
  the core, and its code conventions stay out.
  - The design rules: message naming, `time` and `processed_time`, justify
    each attribute, domain failures are events, fail loudly on incoming data,
    and the backfill of stored events.
- [decision] A rule that records one team's choice, not Eventide practice,
  gives its reason in the core or moves to an overlay.
  - For example: Add and Change for a value that is set and then changed,
    `Record` for a fact from outside the component, and a consumer that copies
    an upstream event under its stream's name.
- [finding] Most examples in the source guide point to one design, and to
  change log entries that a stranger cannot open.
  - Each rule in the core needs a general example and a reason from first
    principles.
- [decision] The Eventide account component stays out of the skill, so that it
  can test the skill.
  - Sam Stickland will give the agent the account component's requirements, and
    then show the design to Scott Bellware.
  - The source guide cites the account component in three rules; those
    examples get another domain.
  - The test is not clean: the account component is public on GitHub, so a
    model may know it already.
- [plan] Version 1 holds what that test needs: the stages, the rules, the three
  formats, the purchase order example, the panel template and the overlay.
  - The schema, a Ruby checker, a panel generator and tests in several agents
    wait until after the test, because the test can change the format.
- [decision] The repository is `hubbado/designing-eventide-components`, private
  until it is shown.
  - "Component" is Eventide's word. "Event flow" is a general phrase that the
    source guide uses but never defines.
  - The repository root is the skill folder, so a clone into an agent's skills
    folder works with no copy step.
- [open] The skill must define "event flow" in one line, or use Eventide's own
  words for it.
- [open] The licence, before the repository is public. Eventide uses MIT.
